<cfcomponent accessors="true">

    <cffunction name="init" access="public" output="no">
        <cfreturn this>
    </cffunction>
<!--- 
    <cffunction name="login" access="remote" returntype="ANY" output="false" returnformat="JSON">
        <cfargument name="username" type="string" required="yes">
        <cfargument name="password" type="string" required="yes">

        <cfreturn true>
    </cffunction>
 --->
    <cffunction name="getMenus" access="remote" output="yes" returntype="query">
    <!--- <cffunction name="getMenus" access="public" returntype="ANY" output="false" returnformat="JSON"> --->

        <!--- <cfset LOCAL.utilitySvc = APPLICATION.beanFactory.getBean( "utilityService" )> --->

        <cfquery name="LOCAL.q_Menus" datasource="#APPLICATION.datasource#">
        SELECT
            a.MenuID,
            a.Menu,
            a.SortID,
            a.Active
        FROM
            Menu a            
        WHERE
            1 = 1
            AND a.Active = 1
        ORDER BY
            a.SortID ASC
        </cfquery>

<!--- <cfdump var="#LOCAL.q_Menus#"> --->
        <!--- <cfreturn SerializeJSON(LOCAL.utilitySvc.queryToArray(LOCAL.q_Menus))> --->
        <cfreturn LOCAL.q_Menus>
    </cffunction>

    <cffunction name="getMenuCategories" access="remote" returntype="ANY" output="false" returnformat="JSON">
        <cfset LOCAL.utilitySvc = APPLICATION.beanFactory.getBean( "utilityService" )>

        <cfquery name="LOCAL.q_Categories" datasource="#APPLICATION.datasource#">
        SELECT
            a.MenuCategoryID,
            a.MenuID,
            a.MenuCategory,
            a.SortID,
            a.Active
        FROM
            MenuCategory a            
        WHERE
            1 = 1
            AND a.Active = 1
        ORDER BY
            a.SortID ASC
        </cfquery>
        
        <cfreturn LOCAL.q_Categories>
        <!--- <cfreturn SerializeJSON(LOCAL.utilitySvc.queryToArray(LOCAL.q_Categories))> --->
    </cffunction>

    <cffunction name="getMenuItem" access="remote" returntype="ANY" output="false" returnformat="JSON">
        <cfargument name="menuItemID" type="numeric" required="no" default="0">

        <cfset LOCAL.utilitySvc = APPLICATION.beanFactory.getBean( "utilityService" )>

        <cfquery name="LOCAL.q_Items" datasource="#APPLICATION.datasource#">
        SELECT
            a.MenuItemID,
            a.MenuCategoryID,
            a.MenuItem,
            a.Description,
            a.Price,
            a.SortID,
            a.Active,
            b.MenuCategory,
            c.MenuID,
            c.Menu
        FROM
            MenuItem a,
            MenuCategory b,
            Menu c
        WHERE
            1 = 1
            AND a.MenuCategoryID = b.MenuCategoryID
            AND b.MenuID = c.MenuID
            <cfif ARGUMENTS.menuItemID GT 0>
                AND a.MenuItemID = <cfqueryparam cfsqltype="cf_sql_numeric" value="#ARGUMENTS.menuItemID#">
            </cfif>
        ORDER BY
            a.SortID ASC
        </cfquery>
        
        <cfreturn LOCAL.q_Items>
        <!--- <cfreturn SerializeJSON(LOCAL.utilitySvc.queryToArray(LOCAL.q_Items))> --->
    </cffunction>    

    <cffunction name="updateMenuItem" access="remote" returntype="ANY" output="false" returnformat="JSON">
        <cfargument name="menuItemID" type="numeric" required="yes">
        <cfargument name="menuCategoryID" type="numeric" required="yes">
        <cfargument name="menuItem" type="string" required="yes">
        <cfargument name="description" type="string" required="yes">
        <cfargument name="price" type="string" required="yes">
        <cfargument name="sortID" type="numeric" required="yes">
        <cfargument name="active" type="boolean" required="yes">

        <cfif ARGUMENTS.menuItemID EQ 0>
            <cfset LOCAL.menuSvc = APPLICATION.beanFactory.getBean( "menuService" )>

            <cfset LOCAL.o_Item = EntityNew('MenuItem')>
            <cfset LOCAL.o_Item.setSortID(LOCAL.menuSvc.getHighestCategorySortID(ARGUMENTS.menuCategoryID))>
        <cfelse>
            <cfset LOCAL.o_Item = EntityLoad('MenuItem', ARGUMENTS.menuItemID, true)>
        </cfif>
        <cfset o_Item.setMenuCategory(EntityLoad('MenuCategory', ARGUMENTS.menuCategoryID, true))>
        <cfset o_Item.setMenuItem(ARGUMENTS.menuItem)>
        <cfset o_Item.setDescription(ARGUMENTS.description)>
        <cfset o_Item.setPrice(ARGUMENTS.price)>
        <cfset o_Item.setSortID(ARGUMENTS.sortID)>
        <cfset o_Item.setDateTime(Now())>
        <cfset o_Item.setActive(ARGUMENTS.active)>

        <cfset EntitySave(o_Item)>
        <cfset ormFlush()>

        <cfreturn getMenuItem(menuItemID = LOCAL.o_Item.getID())>
    </cffunction>    
</cfcomponent>