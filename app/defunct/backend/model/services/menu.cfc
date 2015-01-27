<cfcomponent>

    <cffunction name="init" access="public" output="no">
        <cfreturn this>
    </cffunction>
    
    <cffunction name="getHighestCategorySortID" access="remote" output="no">
        <cfargument name="menuCategoryID" type="numeric" required="yes">

        <cfquery name="LOCAL.q_sort" datasource="#APPLICATION.datasource#">
        SELECT
            a.SortID
        FROM
            MenuItem a
        WHERE
            1 = 1
            AND a.MenuCategoryID = <cfqueryparam cfsqltype="cf_sql_numeric" value="#ARGUMENTS.menuCategoryID#">
        ORDER BY
            a.SortID DESC
        </cfquery>

        <cfif LOCAL.q_sort.RecordCount GT 0>
            <cfreturn LOCAL.q_sort["SortID"][1] + 1>
        <cfelse>
            <cfreturn 1>
        </cfif>
    </cffunction>
</cfcomponent>