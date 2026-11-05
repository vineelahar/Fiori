sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/comp/valuehelpdialog/ValueHelpDialog",
    "sap/ui/table/Table",
    "sap/ui/table/Column",
    "sap/m/Label",
    "sap/m/Text"
], function (Controller, Filter, FilterOperator, ValueHelpDialog, Table, Column, Label, Text) {
    "use strict";

    return Controller.extend("project3.controller.SmartTable", {

    //    onInit: function () {
    //         var oFilterBar = this.byId("customerFilterBar");

    //         oFilterBar.attachInitialise(function () {
    //             var oFilterItem =
    //                 oFilterBar.determineFilterItemByName("CustomerID");

    //             if (oFilterItem) {
    //                 var oControl = oFilterItem.getControl();
    //                     console.log("CustomerID control", oControl);
    //                     console.log("Control type:", oControl.getMetadata().getName());
    //                     console.log("Value-help event:",typeof oControl.attachValueHelpRequest);

    //                 if (oControl && oControl.attachValueHelpRequest) {
    //                     oControl.attachValueHelpRequest(function (){
    //                         this.onOpenCustomerValueHelp();
                            
    //                     },this);
                    
                            
                        
    //                 }
    //             }
    //         }, this);
    //     },

       
        
                
        onOpenCustomerValueHelp: function () {
            if (!this._oCustomerValueHelp) {
                var oModel = this.getOwnerComponent().getModel();

                // 1. Create the customer table
                var oTable = new Table({
                    visibleRowCount: 8,
                    selectionMode: "MultiToggle",
                    columns: [
                        new Column({
                            label: new Label({ text: "Customer ID" }),
                            template: new Text({ text: "{CustomerID}" })
                        }),
                        new Column({
                            label: new Label({ text: "Company Name" }),
                            template: new Text({ text: "{CompanyName}" })
                        }),
                        new Column({
                            label: new Label({ text: "City" }),
                            template: new Text({ text: "{City}" })
                        }),
                        new Column({
                            label: new Label({ text: "Country" }),
                            template: new Text({ text: "{Country}" })
                        })
                    ]
                });

                // 2. Load customer data from Northwind
                oTable.setModel(oModel);
                oTable.bindRows("/Customers");

                // 3. Create a single Value Help dialog
                this._oCustomerValueHelp = new ValueHelpDialog({
                    title: "Select Customer",
                    supportMultiselect: true,
                    supportRanges: true,
                    key: "CustomerID",
                    descriptionKey: "CompanyName",

                    // 4. Handle OK
                    ok: function (oEvent) {
                        var aTokens = oEvent.getParameter("tokens") || [];
                        var aFilters = [];

                        aTokens.forEach(function (oToken) {
                            var oRange = oToken.data("range");

                            if (oRange) {
                                // Condition entered in Define Conditions
                                var mOperators = {
                                    "EQ": FilterOperator.EQ,
                                    "NE": FilterOperator.NE,
                                    "BT": FilterOperator.BT,
                                    "Contains": FilterOperator.Contains,
                                    "StartsWith": FilterOperator.StartsWith,
                                    "EndsWith": FilterOperator.EndsWith,
                                    "GE": FilterOperator.GE,
                                    "GT": FilterOperator.GT,
                                    "LE": FilterOperator.LE,
                                    "LT": FilterOperator.LT
                                };

                                var sOperator =
                                    mOperators[oRange.operation];

                                if (
                                    oRange.keyField &&
                                    sOperator &&
                                    oRange.value1 !== undefined &&
                                    oRange.value1 !== ""
                                ) {
                                    aFilters.push(
                                        new Filter(
                                            oRange.keyField,
                                            sOperator,
                                            oRange.value1,
                                            oRange.value2
                                        )
                                    );
                                }
                            } else if (oToken.getKey()) {
                                // Customer selected in Search and Select
                                aFilters.push(
                                    new Filter(
                                        "CustomerID",
                                        FilterOperator.EQ,
                                        oToken.getKey()
                                    )
                                );
                            }
                        });

                        // 5. Display selected tokens in CustomerID
                        var oInput = this.byId("customerIdInput");
                        oInput.setTokens(aTokens);

                        // 6. Access the SmartTable
                        var oSmartTable =
                            this.byId("customerSmartTable");

                        var oInnerTable = oSmartTable.getTable();
                        var oBinding = oInnerTable.getBinding("items");

                        if (oBinding) {
                            if (aFilters.length > 0) {
                                oBinding.filter([
                                    new Filter({
                                        filters: aFilters,
                                        and: false
                                    })
                                ]);
                            } else {
                                oBinding.filter([]);
                            }
                        }

                        this._oCustomerValueHelp.close();
                    }.bind(this),

                    // Cancel without applying changes
                    cancel: function () {
                        this._oCustomerValueHelp.close();
                    }.bind(this)
                });

                // 7. Allow conditions on Country and CustomerID
                this._oCustomerValueHelp.setRangeKeyFields([
                    {
                        key: "Country",
                        label: "Country"
                    },
                    {
                        key: "CustomerID",
                        label: "Customer ID"
                    }
                ]);

                // 8. Connect the table and model
                this._oCustomerValueHelp.setTable(oTable);
                this._oCustomerValueHelp.setModel(oModel);

                this.getView().addDependent(
                    this._oCustomerValueHelp
                );
            }

            this._oCustomerValueHelp.open();
        },




        // onOpenCustomerDialog: function(){
        //     this.byId("customerDialog").open();
            
        // },
        // onCustomerConfirm:function (){
        //     var oSelectionTable = this.byId("customerSelectionTable");
        //     var aSelectedItems = oSelectionTable.getSelectedItems();
        //     var aFilters = aSelectedItems.map(function(oItem){
        //         var oContext = oItem.getBindingContext();
        //         var sCustomerID = oContext.getProperty("CustomerID");
        //         return new Filter("CustomerID", FilterOperator.EQ, sCustomerID

        //         );
        //     });
        //     var oSmartTable = this.byId("customerSmartTable");
        //     var oInnerTable = oSmartTable.getTable();
        //     var oBinding = oInnerTable.getBinding("items");

        //     if(aFilters.length > 0 && oBinding) {
        //         oBinding.filter([
        //             new Filter({
        //                 filters: aFilters,
        //                 and: false
        //              })
        //         ])
        //     }
        //     this.byId("customerDialog").close();
        // },
        // onCustomerCancel:function(){
        //     this.byId("customerDialog").close()
        // },
        // onCustomerSearch: function (oEvent) {
        //     var sQuery = oEvent.getParameter("newValue");
        //     var oBinding = this.byId("customerSelectionTable")
        //         .getBinding("items");

        //     var aFilters = [];

        //     if (sQuery) {
        //         aFilters.push(new Filter({
        //             filters: [
        //                 new Filter("CustomerID", FilterOperator.Contains, sQuery),
        //                 new Filter("CompanyName", FilterOperator.Contains, sQuery),
        //                 new Filter("City", FilterOperator.Contains, sQuery)
        //             ],
        //             and: false
        //         }));
        //     }

        //     oBinding.filter(aFilters);
        // }
    });
});
