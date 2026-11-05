sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/SelectDialog",
    "sap/m/StandardListItem",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, MessageBox, SelectDialog, StandardListItem, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project1.controller.CreateOrder", {

        onInit: function () {
            
            var oCreateModel = new JSONModel({
                header: {
                    SalesOrderType: "TA",
                    SalesOrganization: "1710",
                    DistributionChannel: "10",
                    OrganizationDivision: "00",
                    SoldToParty: "USCU_S01",
                    PurchaseOrderByCustomer: "4500054962",
                    RequestedDeliveryDate: new Date(2026, 10, 4)
                },
                items: []
            });

            this.getView().setModel(oCreateModel, "createModel");
            this.onLoadMaterials();
        },

        // Add a new item row
        onAddItem: function () {
            var oModel = this.getView().getModel("createModel");
            var aItems = oModel.getProperty("/items");

            aItems.push({
                Material: "MZ-FG-C900",
                RequestedQuantity: "20",
                RequestedQuantityUnit: "EA",
                ProductionPlant: "1710",
                StorageLocation: ""
            });

            oModel.setProperty("/items", aItems);
        },

        onLoadMaterials: function () {
            var oODataModel = this.getOwnerComponent()
                .getModel("API_SALES_ORDER_SRV");

            oODataModel.read("/A_SalesOrderItem", {
                success: function (oData) {
                    var oUniqueMaterials = {};

                    var aMaterials = oData.results
                        .filter(function (oItem) {
                            return oItem.Material &&
                                !oUniqueMaterials[oItem.Material] &&
                                (oUniqueMaterials[oItem.Material] = true);
                        })
                        .map(function (oItem) {
                            return {
                                Material: oItem.Material
                            };
                        });

                    var oMaterialsModel = new JSONModel({
                        results: aMaterials
                    });

                    this.getView().setModel(
                        oMaterialsModel,
                        "materialsModel"
                    );

                    console.log("Materials loaded:", aMaterials);
                }.bind(this),

                error: function (oError) {
                    console.error("Failed to load materials:", oError);
                    MessageBox.error("Could not load materials.");
                }
            });
        },

      
        
        onMaterialValueHelp: function (oEvent) {
            var oMaterialsModel = this.getView()
                .getModel("materialsModel");

            if (!oMaterialsModel) {
                MessageToast.show("Materials are still loading.");
                return;
            }

            var oInput = oEvent.getSource();
            var oContext = oInput.getBindingContext("createModel");

            this._sMaterialPath = oContext.getPath();

            if (!this._oMaterialDialog) {
                this._oMaterialDialog = new SelectDialog({
                    title: "Select Material",

                    search: function (oEvent) {
                        var sQuery = oEvent.getParameter("value");
                        var oBinding = this._oMaterialDialog
                            .getBinding("items");

                        if (oBinding) {
                            var oFilter = new Filter(
                                "Material",
                                FilterOperator.Contains,
                                sQuery
                            );

                            oBinding.filter(sQuery ? [oFilter] : []);
                        }
                    }.bind(this),

                    confirm: function (oEvent) {
                        var oSelectedItem =
                            oEvent.getParameter("selectedItem");

                        if (oSelectedItem) {
                            var sMaterial = oSelectedItem
                                .getBindingContext("materialsModel")
                                .getProperty("Material");

                            this.getView()
                                .getModel("createModel")
                                .setProperty(
                                    this._sMaterialPath + "/Material",
                                    sMaterial
                                );
                        }
                    }.bind(this)
                });

                this._oMaterialDialog.bindAggregation("items", {
                    path: "materialsModel>/results",
                    template: new StandardListItem({
                        title: "{materialsModel>Material}"
                    })
                });

                this.getView().addDependent(this._oMaterialDialog);
            }

            this._oMaterialDialog.setModel(
                oMaterialsModel,
                "materialsModel"
            );

            this._oMaterialDialog.open();
        },


        onDeleteItem: function (oEvent) {
            var oModel = this.getView().getModel("createModel");

            var oContext = oEvent.getSource()
                .getBindingContext("createModel");

            var sPath = oContext.getPath();
            var iIndex = parseInt(sPath.split("/").pop(), 10);

            var aItems = oModel.getProperty("/items");

            aItems.splice(iIndex, 1);

            oModel.setProperty("/items", aItems);
        },

        onCancel: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("SalesOrder");
        },

        // Save header and items together
        onSave: function () {
            var oCreateModel = this.getView()
                .getModel("createModel");

            var oData = oCreateModel.getData();

            // Validate header
            if (!oData.header.SoldToParty) {
                MessageToast.show("Please enter a customer");
                return;
            }

            // Validate items
            if (oData.items.length === 0) {
                MessageToast.show("Please add at least one item");
                return;
            }

            var bInvalidItem = oData.items.some(function (oItem) {
                return !oItem.Material ||
                    !oItem.RequestedQuantity ||
                    Number(oItem.RequestedQuantity) <= 0;
            });

            if (bInvalidItem) {
                MessageToast.show(
                    "Enter a material and valid quantity for every item"
                );
                return;
            }

            // Prepare complete Sales Order payload
            var oPayload = {
                SalesOrderType: oData.header.SalesOrderType,
                SalesOrganization: oData.header.SalesOrganization,
                DistributionChannel: oData.header.DistributionChannel,
                OrganizationDivision: oData.header.OrganizationDivision,
                SoldToParty: oData.header.SoldToParty,
                PurchaseOrderByCustomer: oData.header.PurchaseOrderByCustomer,
                RequestedDeliveryDate: oData.header.RequestedDeliveryDate,

                // to_Partner: [
                //     {
                //         PartnerFunction: "AG",
                //         Customer:"USCU_S01"
                //     },
                //     {
                //         PartnerFunction: "WE",
                //         Customer: "USCU_S01"
                //     }
                // ],

                to_Item: oData.items.map(function (oItem) {
                    return {
                        ItemNumber:oItem.ItemNumber,
                        Material: oItem.Material,
                        RequestedQuantity: oItem.RequestedQuantity,
                        // RequestedQuantityUnit: oItem.RequestedQuantityUnit,
                        ProductionPlant: oItem.ProductionPlant,
                        StorageLocation: oItem.StorageLocation

                        
                    };
                })
            };

            console.log("Sales Order Payload:", oPayload);

            var oODataModel = this.getOwnerComponent()
                .getModel("API_SALES_ORDER_SRV");

            if (!oODataModel) {
                MessageBox.error(
                    "Sales Order OData model is not configured"
                );
                return;
            }

            // POST header and nested items
            oODataModel.create("/A_SalesOrder", oPayload, {
                
                success: function (oData) {
                    var sSalesOrder = oData.SalesOrder;
                    MessageToast.show(
                        "Sales Order " + sSalesOrder + "created successfully"
                    );

                    console.log("Created Sales Order", sSalesOrder);
                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("SalesOrder");
                }.bind(this),

                error: function (oError) {
                    console.error("Sales Order POST error:", oError);

                    var sMessage = "Sales Order creation failed.";

                    try {
                        var oResponse = JSON.parse(oError.responseText);
                        var oErrorDetails = oResponse.error;

                        sMessage = oErrorDetails.message.value ||
                            oErrorDetails.message ||
                            sMessage;

                    } catch (e) {
                        console.error("Could not parse error response:", e);
                    }

                    MessageBox.error(sMessage);
                }
            });
        }
    });
});