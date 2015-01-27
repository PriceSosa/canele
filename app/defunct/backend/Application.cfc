<cfcomponent extends="lib.framework" accessors="true">

	<cfscript>
	variables.framework = {
	    // home = "family.search",
	    trace = false
	};
	</cfscript>

	<CFSET THIS.datasource = "caneledb">
	<CFSET THIS.name = "Canele">
	<CFSET THIS.ormsettings.cfclocation = "/caneleroot/backend/model/beans">

	<CFIF IsDefined("CGI.SERVER_NAME") AND CGI.SERVER_NAME EQ "localhost">
		<CFSET THIS.ormsettings.cfclocation = "/caneleroot/app/backend/model/beans">
	</CFIF>

	<CFSET this.ormenabled = "true"> 
	<CFSET this.ormsettings.logSQL = "false">  
	<CFSET this.ormSettings.dbCreate = "none" />
<!--- 	<CFSET this.scriptprotect="all">
	<CFSET this.setClientCookies=false>

	<CFSET This.Sessiontimeout = "#createtimespan(0,0,15,0)#">
	<CFSET This.Sessionmanagement = true> --->

	<!--- <CFSET DATASOURCE = 'caneledb'> --->

	<cffunction name="setupApplication">
		<cfscript>
	        APPLICATION.beanFactory = new lib.ioc("/caneleroot/app/backend/model"); 
	        setBeanFactory(APPLICATION.beanFactory);
	        APPLICATION.datasource = 'caneledb';
	    </cfscript>
	</cffunction>

</CFCOMPONENT>
