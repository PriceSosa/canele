<CFCOMPONENT>

    <cffunction name="init" access="public" output="no">
        <cfreturn this>
    </cffunction>
    
    <CFFUNCTION name="getCustomerInvoicePeriod" access="public" returntype="numeric">
		<CFARGUMENT name="customerID" type="numeric" required="yes">
    	
        <CFRETURN 2><!--- For now we're hard-coding 2 months as the period.  Can be customer specific later if desired --->
    </CFFUNCTION>
    
	<CFFUNCTION name="generateFormName" access="public" returntype="string">
		<CFARGUMENT name="title" type="string" required="yes">
		<CFARGUMENT name="feeTypeID" type="numeric" required="no" default="0">
		<CFARGUMENT name="dayID" type="numeric" required="no" default="0">

		<CFSWITCH expression="#ARGUMENTS.title#">
		<CFCASE value="feeRecurringType,numberOfPayments,feeDueDate,feeDueDateType">
			<CFSET formName = "#ARGUMENTS.title#_#feeTypeID#">
        </CFCASE>
        <CFCASE value="active">
			<CFSET formName = "#ARGUMENTS.title#_#dayID#">
        </CFCASE>
        <CFCASE value="fee">
			<CFSET formName = "#ARGUMENTS.title#_#feeTypeID#_#dayID#">
        </CFCASE>
        </CFSWITCH>
		
        <CFRETURN formName>
	</CFFUNCTION>
    
	<CFFUNCTION name="deconstructFormName" access="public" returntype="string">
		<CFARGUMENT name="formName" type="string" required="yes">

		<CFSWITCH expression="#ARGUMENTS.formName#">
		<CFCASE value="feeRecurringType,numberOfPayments,feeDueDate,feeDueDateType">
			<CFSET formName = "#ARGUMENTS.title#_#feeTypeID#">
        </CFCASE>
        <CFCASE value="active">
			<CFSET formName = "#ARGUMENTS.title#_#dayID#">
        </CFCASE>
        <CFCASE value="fee">
			<CFSET formName = "#ARGUMENTS.title#_#feeTypeID#_#dayID#">
        </CFCASE>
        </CFSWITCH>
		
        <CFRETURN formName>
	</CFFUNCTION>

	<CFFUNCTION name="removeListDuplicates" access="public" returntype="string" output="yes">
    	<CFARGUMENT name="theList" type="string" required="yes">

		<CFSET VAR removeDupList = StructNew()>
        <CFSET VAR returnList = "">
        <CFSET VAR thisItem = "">
                
        <CFLOOP index="thisItem" list="#ARGUMENTS.theList#">
        	<CFSET removeDupList[thisItem] = "">
        </CFLOOP>
		<CFSET returnList = StructKeyList(removeDupList) />

        <CFRETURN returnList>
    </CFFUNCTION>

	<CFFUNCTION name="selectCommonListItems" access="public" returntype="string" output="yes">
    	<CFARGUMENT name="aList" type="string" required="yes">
    	<CFARGUMENT name="bList" type="string" required="yes">

		<CFSET commonList = "">
        <CFLOOP index="aItem" list="#ARGUMENTS.aList#">
			<CFIF ListContains(bList, aItem)>
				<CFSET commonList = ListAppend(commonList, aItem)>
            </CFIF>
        </CFLOOP>

        <CFRETURN removeListDuplicates(commonList)>
    </CFFUNCTION>
        
    <!--- Ben Nadel --->
    <cffunction name="QueryToArray" access="public" returntype="array" output="false"
        hint="This turns a query into an array of structures.">

        <!--- Define arguments. --->
        <cfargument name="Data" type="query" required="yes" />

        <cfscript>

            // Define the local scope.
            var LOCAL = StructNew();

            // Get the column names as an array.
            LOCAL.Columns = ListToArray( arguments.Data.ColumnList );

            // Create an array that will hold the query equivalent.
            LOCAL.QueryArray = ArrayNew( 1 );

            // Loop over the query.
            for (LOCAL.RowIndex = 1 ; LOCAL.RowIndex LTE arguments.Data.RecordCount ; LOCAL.RowIndex = (LOCAL.RowIndex + 1)){

                // Create a row structure.
                LOCAL.Row = StructNew();

                // Loop over the columns in this row.
                for (LOCAL.ColumnIndex = 1 ; LOCAL.ColumnIndex LTE ArrayLen( LOCAL.Columns ) ; LOCAL.ColumnIndex = (LOCAL.ColumnIndex + 1)){

                    // Get a reference to the query column.
                    LOCAL.ColumnName = LOCAL.Columns[ LOCAL.ColumnIndex ];

                    // Store the query cell value into the struct by key.
                    LOCAL.Row[ LOCAL.ColumnName ] = arguments.Data[ LOCAL.ColumnName ][ LOCAL.RowIndex ];

                }

                // Add the structure to the query array.
                ArrayAppend( LOCAL.QueryArray, LOCAL.Row );

            }

            // Return the array equivalent.
            return( LOCAL.QueryArray );

        </cfscript>
    </cffunction>
            
    <cffunction name="ReplaceEOL" access="public" output="false" returntype="string" hint="Replaces EOL codes with other characters">
        <cfargument name="String" required="true" type="string">
        <cfargument name="ReplaceWith" required="true" type="string">

        <cfreturn REReplace(Arguments.String, "\r\n|\n\r|\n|\r", Arguments.ReplaceWith, "all")>
    </cffunction>

</CFCOMPONENT>