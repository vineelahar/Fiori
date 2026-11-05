sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], (Controller, Button) => {
    "use strict";

    return Controller.extend("project3.controller.view1", {
        // onButtonPress: function (oEvent) {
        //     console.log("Button clicked");
        // }

        // get the text in the button
        // onButtonPress: function (oEvent) {
        //     var oButton = oEvent.getSource();
        //     var sText = oButton.getText()
        //     console.log("Button text:",sText);
        // }
       
        // get the input text
        // onGetName: function(){
        //     var nameInput =  this.byId("nameInput")
        //     // This gets the Input control using its XML ID.
        //     var oButton = nameInput.getValue()
        //     // This gets the value entered in the Input.
        //     console.log("Name:",oButton)
        // }


        // Task 4 — selectionChange
        // onSelectionChange:function(oEvent){
        //     var aItems = oEvent.getParameter("listItems");
           
        //     console.log("number of selected rows:",aItems.length)

        // }

        // Task 5-selectionrow
        // onSelectionChange:function(oEvent){
        //     var aItems = oEvent.getParameter("listItems")
        //     var oItem = aItems[0];
        //     var aCells = oItem.getCells()
        //     var oNameCell = aCells[0];
        //     var sName = oNameCell.getText()
        //     console.log("Selected:",sName)
        // }

         // Task 6-selecting multiple rows
        // onSelectionChange: function(oEvent){
        //     var aItems = oEvent.getParameter("listItems")
        //     var oItem = aItems[0];
        //     var aCells = oItem.getCells()
        //     var oNameCell = aCells[0];
        //     var oAgeCell = aCells[1];
        //     var sName = oNameCell.getText();
        //     var sAge = oAgeCell.getText();
        //     console.log("Name:",sName)
        //     console.log("Age:",sAge)
        // }


        // Task 7 — Delete selected row
        onSelectionChange: function(oEvent) {

            var aItems = oEvent.getParameter("listItems");

            this._oSelectedItem = aItems[0];

        },

        onDelete: function(oEvent) {

            var oTable = this.byId("myTable");

            oTable.removeItem(this._oSelectedItem);

        }

         
    });
});