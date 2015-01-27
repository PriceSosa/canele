<cfcomponent accessors="true" displayname="Note">

<!---     <cfproperty name="noteService">
    <cfproperty name="utilityService">
 --->
    <cffunction name="init" access="public" output="no">
        <cfargument name="fw">

        <cfset variables.fw = fw>
        <cfreturn this>
    </cffunction>
    
    <cffunction name="error" access="remote" returntype="ANY" output="true">
        <cfargument name="rc" type="struct" required="true">

<!---         <cfset emailSubject="Error on XstremeMD">
        <cfmail 
            type="html" 
            subject="#emailSubject#" 
            from="tderouen@polosgroup.com" 
            to="tderouen@polosgroup.com" 
            cc="jonathan@imakethissound.com" 
            server="secure.emailsrvr.com"  
            username="tderouen@polosgroup.com" 
            password="Carlisle_1" 
            useSSL="true" 
            port="465" 
            mailerid="#CreateUUID()#@xstrememd.com"
            wraptext="74">
            An unexpected error occurred.
            Error Event: #request.exception#
            Failed Action: #request.failedAction#
            Error details:
            <cfdump var="#request.exception#">
            Form details:
            <cfdump var="#FORM#">
            <!--- Session details: --->
            <!--- <cfdump var="#SESSION#"> --->
        </CFMAIL> --->

    </cffunction>

</cfcomponent>