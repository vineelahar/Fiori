sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller) => {
    "use strict";

    return Controller.extend("project2.controller.Excel", {
        onInit:function (){
               var aCustomers = [

                {
                    CustomerID: "C001",
                    Name: "Vineela",
                    City: "Hyderabad",
                    Country: "India" 
                },
                {
                    CustomerID: "C002",
                    Name: "Harish",
                    City: "Bangalore",
                    Country: "India" 
                },
                {
                    CustomerID: "C003",
                    Name: "Ram",
                    City: "London",
                    Country: "Uk" 
                },
                {
                    CustomerID: "C004",
                    Name: "Davu",
                    City: "New York",
                    Country: "USA" 
                },

               ];
               var oModel = new sap.ui.model.json.JSONModel({
                    customers: aCustomers
               })
               this.getView().setModel(oModel, "customerModel")
           
        }
    });
});