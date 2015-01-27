<cfcomponent persistent="true" table="Menu">
    <cfproperty name="id" column = "MenuID" generator="increment"> 
	<cfproperty name="Menu" type="string">
	<cfproperty name="SortID" type="numeric">
	<cfproperty name="DateTime" type="string">
    <cfproperty name="Active" type="boolean">
</cfcomponent>