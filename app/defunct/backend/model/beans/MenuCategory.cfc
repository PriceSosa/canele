<cfcomponent persistent="true" table="MenuCategory">
    <cfproperty name="id" column = "MenuCategoryID" generator="increment"> 
	<cfproperty name="MenuCategory" type="string">
	<cfproperty name="SortID" type="numeric">
	<cfproperty name="DateTime" type="string">
    <cfproperty name="Active" type="boolean">

    <cfproperty 
        name="Menu" 
        fieldtype="many-to-one" 
        cfc="Menu" 
        fkcolumn="MenuID"> 

</cfcomponent>