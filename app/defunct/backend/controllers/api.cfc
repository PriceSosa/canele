<cfcomponent accessors="true" displayname="Menu">

    <cfproperty name="apiService">
    <cfproperty name="utilityService">

    <cffunction name="init" access="public" output="no">
        <cfargument name="fw">

        <cfset variables.fw = fw>
        <cfreturn this>
    </cffunction>
    
    <cffunction name="getMenus" access="remote" returntype="ANY" output="true">
        <cfargument name="rc" type="struct" required="true">

        <!--- <cfreturn variables.fw.renderData('json', variables.apiapiService.getMenus())> --->
        <cfreturn variables.fw.renderData('json', variables.utilityService.queryToArray(variables.apiService.getMenus()))>
    </cffunction>

    <cffunction name="getMenuCategories" access="remote" returntype="ANY" output="true">
        <cfargument name="rc" type="struct" required="true">

        <!--- <cfreturn variables.fw.renderData('json', variables.apiapiService.getMenus())> --->
        <cfreturn variables.fw.renderData('json', variables.utilityService.queryToArray(variables.apiService.getMenuCategories()))>
    </cffunction>

    <cffunction name="getMenuItems" access="remote" returntype="ANY" output="true">
        <cfargument name="rc" type="struct" required="true">

        <!--- <cfreturn variables.fw.renderData('json', variables.apiapiService.getMenus())> --->
        <cfreturn variables.fw.renderData('json', variables.utilityService.queryToArray(variables.apiService.getMenuItem()))>
    </cffunction>
</cfcomponent>