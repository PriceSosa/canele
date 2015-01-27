<cfcomponent accessors="true">
	<!--- <cfproperty name="activityService"> --->


    <cffunction name="init" access="public" output="no">
        <!--- <cfargument name="dsn" type="string" required="false"> --->

        <cfreturn this>
    </cffunction>


	<cffunction name="isWebsiteInMaintenance" access="public" output="no" returntype="boolean">
        <cfquery name="LOCAL.isWebsiteInMaintenance" datasource="#REQUEST.dsn#">
        SELECT
            *
        FROM
            MaintenanceMode
        </cfquery>
        
        <cfreturn LOCAL.isWebsiteInMaintenance.MaintenanceMode>
    </cffunction>
            
    <cffunction name="userNameExists" access="private" output="no" returntype="string">
		<cfargument name="userName" type="string" required="yes">

		<cfquery name="LOCAL.q_userExists" datasource="xmdfwlocaldevdb">
        SELECT
        	*
        FROM
        	Users
        WHERE
        	UserName = '#arguments.userName#'
        </cfquery>
        
        <cfif LOCAL.q_userExists.RecordCount NEQ 0>
        	<cfreturn true>
        </cfif>
        
        <cfreturn false>
	</cffunction>
    
	<cffunction name="generateUserName" access="public" output="no" returntype="string">
		<cfargument name="firstName" type="string" required="yes">
        <cfargument name="lastName" type="string" required="yes">
        
        <cfset LOCAL.baseUserName = LCase(Left(arguments.firstName, 1)) & LCase(arguments.lastName)>
        <cfset LOCAL.newUserName = LCase(Left(arguments.firstName, 1)) & LCase(arguments.lastName)>
		<cfset LOCAL.nameExists = userNameExists(LOCAL.newUserName)>
        <cfset LOCAL.nameEnding = 1>
        
		<cfloop condition="LOCAL.nameExists EQ true">
	        <cfset LOCAL.newUserName = LOCAL.baseUserName & '#LOCAL.nameEnding#'>
			<cfset LOCAL.nameExists = userNameExists(LOCAL.newUserName)>
            <cfset LOCAL.nameEnding = LOCAL.nameEnding + 1>
		</cfloop>
        
        <cfreturn LOCAL.newUserName>
    </cffunction>
    
	<cffunction name="generatePassword" access="public" output="no" returntype="string">
    
		<cfset LOCAL.alphaList="A,B,C,D,E,F,G,H,J,K,M,N,P,Q,R,S,T,U,V,W,X,Y,Z">
        <cfset LOCAL.newPwd="">
        
        <cfloop from="1" to="7" index="LOCAL.j">
            <cfif j EQ 1 OR j EQ 4  OR j EQ 6>
                <cfset LOCAL.r = RandRange(1, 23, "SHA1PRNG")>
                <cfset LOCAL.randChar = ListGetAt(LOCAL.alphaList, LOCAL.r)>
            <cfelse>
                <cfset LOCAL.randChar = RandRange(1, 9, "SHA1PRNG")>
            </cfif>
            <cfset LOCAL.newPwd = LOCAL.newPwd & LOCAL.randChar>
        </cfloop>
        
        <cfreturn LOCAL.newPwd>
    </cffunction>
    
    <cffunction name="logout" access="public" output="false">
        <cfset StructDelete(Session, "User")>
        <cfset StructDelete(Session, "UserID")>
        <cfset StructDelete(Session, "Environment")>
        <cfset StructDelete(Session, "LocationID")>
        <cfset StructDelete(Session, "Cart")>
        <cfset StructDelete(Session, "loggedIn")>
            
        <cfreturn true>
    </cffunction>
            
    <cffunction name="isLoggedIn" access="public" output="false">
        
        <cfif 
            StructKeyExists(SESSION, "UserID") 
            AND StructKeyExists(SESSION, "loggedIn") 
            AND SESSION.UserID NEQ "">
            
            <cfreturn true>
        </cfif>
        
        <cfreturn false>
    </cffunction>

	<cffunction name="loginUser" access="public" output="no" returnformat="JSON">
    	<cfargument name="userName" type="string" required="yes">
        <cfargument name="password" type="string" required="yes">
        
        <!--- <cfreturn "JOJOIJOIJIOJIJ"> --->
        <cfset LOCAL.ret = {'result':'error'}>

        <cfquery datasource="#REQUEST.dsn#" name="LOCAL.q_User">
        SELECT
            a.UserName,
            a.ContactID
        FROM
        	Users a
        WHERE
        	1 = 1
        	AND a.UserName = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.userName#">
        	AND a.Active = 1
        	AND (
            	a.Password = <cfqueryparam cfsqltype="cf_sql_varchar" value="#Hash(arguments.password, 'SHA')#">
            	OR a.TempPassword = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.password#">
       		)
        </cfquery>
        
        <cfif LOCAL.q_User.RecordCount EQ 1>
    		<cfset LOCAL.o_User = EntityLoad("User", LOCAL.q_User.ContactID, true)>
            
            <cfset LOCAL.o_Token = createToken(LOCAL.q_User.ContactID)>

            <cfset LOCAL.userLogin = EntityNew("UserLogin")>
            <cfset LOCAL.userLogin.setUser(LOCAL.o_User)>
            <cfset LOCAL.userLogin.setDateTime(Now())>
            <cfset EntitySave(LOCAL.userLogin)>
            
            <cfset SESSION.loggedIn = true>
            <cfset SESSION.User = LOCAL.o_User>
            <cfset SESSION.UserID = LOCAL.o_User.getID()>
            <cfif LOCAL.o_User.hasLocation()>
                <cfset SESSION.LocationID = LOCAL.o_User.getLocation().getID()>
            </cfif>
            <cfset SESSION.Environment = "#APPLICATION.environmentName#">

            <cfset LOCAL.ret = {'result':'SUCCESS','accessToken':'#LOCAL.o_Token#'}>
        </cfif>

        <cfreturn LOCAL.ret>
    </cffunction>

	<cffunction name="isUserRestricted" access="public" output="no" returntype="boolean">
    	<cfargument name="user"  type="model.beans.User" required="yes">
        <cfargument name="restriction" type="string" required="yes">

		<!--- XstremeMD people get no restrictions of any type --->
		<cfif UCase(arguments.User.getCustomer().getCompanyName()) EQ "XSTREMEMD">
            <cfreturn false>
        </cfif>
		<cfif UCase(arguments.restriction) EQ "LOCATION">
        	<cfif NOT arguments.User.hasLocation()>
            	<cfreturn false>
            </cfif>
        </cfif>
        
		<cfreturn true>
	</cffunction>
    
	<cffunction name="isUserAllowed" access="public" output="no" returntype="boolean">
    	<cfargument name="user"  type="model.beans.User" required="yes">
        <cfargument name="action" type="string" required="yes">
        <cfargument name="object" type="string" required="yes">

	    <cfset LOCAL.o_CurrentUser = EntityLoad("User", arguments.User.getID(), true)>
		<cfset LOCAL.privs = o_CurrentUser.getPrivileges()>
	
    	<cfloop from="1" to="#ArrayLen(LOCAL.privs)#" index="i">
        	<cfif (UCase(LOCAL.privs[i].getAction()) EQ UCase(arguments.action) OR arguments.action EQ "ANY") 
					AND UCase(LOCAL.privs[i].getObject()) EQ UCase(arguments.object)>
            	<cfreturn true>
            </cfif>
        </cfloop>
                
        <cfreturn false>
	</cffunction>
    
    <cffunction name="createToken" access="public" output="no" returntype="boolean">
        <cfargument name="userID" type="string" required="yes">

        <cfreturn "BOGUSTOKEN">
    </cffunction>

    <cffunction name="validateToken" access="public" output="no" returntype="boolean">
        <cfargument name="token" type="string" required="yes">

<!---         <cfif NOT StructKeyExists(SESSION, "User")>
            <cfreturn false>
        </cfif>
 --->
        <!--- REPLACE WITH DB CALL --->
        <cfif ARGUMENTS.token EQ "BOGUSTOKEN">
            <cfreturn true>
        </cfif>

        <cfreturn false>
    </cffunction>

    <!--- WHY IS THIS IN HERE --->
	<cffunction name="convertDateToLocal" access="public" output="no" returntype="date">
		<cfargument name="serverDateTime" type="date" required="yes">
        
        <cfset LOCAL.newDateTime = DateAdd("h", SESSION.TimeOffset, arguments.serverDateTime)>
        
        <cfreturn LOCAL.newDateTime>
    </cffunction>

</cfcomponent>