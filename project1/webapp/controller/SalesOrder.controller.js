sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

], function (Controller, Filter, FilterOperator, JSONModel, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.SalesOrder", {

        onPressCreate: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("CreateOrder");
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");

            var oBinding = this.byId("salesOrderTable")
                .getBinding("items");

            if (sQuery) {
                var oFilter = new Filter({
                    filters: [
                        new Filter(
                            "SalesOrder",
                            FilterOperator.Contains,
                            sQuery
                        ),
                        new Filter(
                            "SoldToParty",
                            FilterOperator.Contains,
                            sQuery
                        )
                    ],
                    and: false
                });

                oBinding.filter([oFilter]);
            } else {
                oBinding.filter([]);
            }
        },
        onInit: function () {
            // Model to display the selected order's items
            var oItemsModel = new JSONModel({
                results: []
            });

            this.getView().setModel(oItemsModel, "itemsModel");
        },

        onSalesOrderPress: function (oEvent) {
            var oContext = oEvent.getSource()
                .getBindingContext("API_SALES_ORDER_SRV");

            var sSalesOrder = oContext.getProperty("SalesOrder");

            this.getOwnerComponent()
                .getRouter()
                .navTo("SalesOrderItems", {
                    SalesOrder: sSalesOrder
                });
        },
        onSalesOrderSelectionChange: function () {
            var oTable = this.byId("salesOrderTable");
            console.log("Table:",oTable);
           
            var oDeleteButton = this.byId("deleteSalesOrderButton");
            console.log("Delete button:", oDeleteButton);

            var bHasSelectedOrder = oTable.getSelectedItems().length > 0;

            if (oDeleteButton) {
                oDeleteButton.setEnabled(bHasSelectedOrder);
            }
            
        },
        onDeleteSalesOrder: function () {
            var oTable = this.byId("salesOrderTable");
            var aSelectedItems = oTable.getSelectedItems();
            var oModel = this.getView().getModel("API_SALES_ORDER_SRV");

            if (aSelectedItems.length === 0) {
                return;
            }

            MessageBox.confirm(
                "Are you sure you want to delete the selected sales orders?",
                {
                    onClose: function (sAction) {
                        if (sAction !== MessageBox.Action.OK) {
                            return;
                        }

                        var iPending = aSelectedItems.length;
                        var bHasError = false;

                        aSelectedItems.forEach(function (oItem) {
                            var oContext = oItem.getBindingContext("API_SALES_ORDER_SRV");
                            var sSalesOrder = oContext.getProperty("SalesOrder");

                            var sPath = oModel.createKey("/A_SalesOrder", {
                                SalesOrder: sSalesOrder
                            });

                            console.log("Deleting:", sPath);

                            oModel.remove(sPath, {
                                success: function () {
                                    iPending--;
                                    checkComplete();
                                },
                                error: function (oError) {
                                    bHasError = true;
                                    iPending--;
                                    console.error("Sales order deletion failed:", oError);
                                    checkComplete();
                                }
                            });
                        });

                        function checkComplete() {
                            if (iPending !== 0) {
                                return;
                            }

                            if (bHasError) {
                                MessageBox.error(
                                    "Some sales orders could not be deleted. Please refresh and check."
                                );
                            } else {
                                MessageToast.show(
                                    "Selected sales orders deleted successfully."
                                );
                            }

                            oTable.removeSelections(true);
                            oModel.refresh(true);
                        }
                    }
                }
            );
        }
    });
});