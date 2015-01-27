<cfcomponent persistent="true" table="MenuItem">
    <cfproperty name="id" column = "MenuItemID" generator="increment"> 
	<cfproperty name="MenuItem" type="string">
	<cfproperty name="Description" type="string">
	<cfproperty name="Price" type="string">
	<cfproperty name="SortID" type="numeric">
	<cfproperty name="DateTime" type="string">
    <cfproperty name="Active" type="boolean">

    <cfproperty 
        name="MenuCategory" 
        fieldtype="many-to-one" 
        cfc="MenuCategory" 
        fkcolumn="MenuCategoryID"> 

</cfcomponent>