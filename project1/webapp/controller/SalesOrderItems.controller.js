
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (
    Controller,
    JSONModel,
    Filter,
    FilterOperator,
    MessageToast
) {
    "use strict";

    return Controller.extend("project1.controller.SalesOrderItems", {

        onInit: function () {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("SalesOrderItems")
                .attachPatternMatched(
                    this._onRouteMatched,
                    this
                );

            this.getView().setModel(
                new JSONModel({
                    header: {},
                    items: [],
                    isEditMode: false,
                    hasSelectedItems: false
                }),
                "itemsModel"
            );
        },

        _onRouteMatched: function (oEvent) {
            var sSalesOrder =
                oEvent.getParameter("arguments").SalesOrder;

            var oModel = this.getOwnerComponent()
                .getModel("API_SALES_ORDER_SRV");

            var oDetailsModel =
                this.getView().getModel("itemsModel");

            var aFilters = [
                new Filter(
                    "SalesOrder",
                    FilterOperator.EQ,
                    sSalesOrder
                )
            ];

            // Read header
            oModel.read("/A_SalesOrder", {
                filters: aFilters,

                success: function (oData) {
                    oDetailsModel.setProperty(
                        "/header",
                        oData.results[0] || {}
                    );
                },

                error: function () {
                    MessageToast.show("Failed to load header");
                }
            });

            // Read related items
            oModel.read("/A_SalesOrderItem", {
                filters: aFilters,

                success: function (oData) {
                    oDetailsModel.setProperty(
                        "/items",
                        oData.results || []
                    );
                },

                error: function () {
                    MessageToast.show("Failed to load items");
                }
            });

            oDetailsModel.setProperty("/isEditMode", false);
        },

        onEdit: function () {
            var oDetailsModel =
                this.getView().getModel("itemsModel");

            // Save original data for Cancel
            this._oOriginalData = JSON.parse(
                JSON.stringify(oDetailsModel.getData())
            );

            oDetailsModel.setProperty("/isEditMode", true);
        },

        onCancel: function () {
            var oDetailsModel =
                this.getView().getModel("itemsModel");

            // Restore the original header and items
            oDetailsModel.setData(this._oOriginalData);

            oDetailsModel.setProperty("/isEditMode", false);

            MessageToast.show("Changes cancelled");
        },


        onSave: function () {
            var oModel = this.getOwnerComponent()
                .getModel("API_SALES_ORDER_SRV");

            var oDetailsModel = this.getView()
                .getModel("itemsModel");

            var oData = oDetailsModel.getData();
            var oOriginal = this._oOriginalData;

            var sSalesOrder = oData.header.SalesOrder;
            var aItems = oData.items || [];
            var aRequests = [];

            function normalizeDate(vDate) {
                if (!vDate) {
                    return "";
                }

                // Date object
                if (vDate instanceof Date) {
                    return [
                        vDate.getFullYear(),
                        String(vDate.getMonth() + 1).padStart(2, "0"),
                        String(vDate.getDate()).padStart(2, "0")
                    ].join("-");
                }

                var sDate = String(vDate);

                // ISO date or ISO datetime string
                if (/^\d{4}-\d{2}-\d{2}/.test(sDate)) {
                    return sDate.substring(0, 10);
                }

                // OData date format: /Date(milliseconds)/
                var aMatch = sDate.match(/^\/Date\((-?\d+)\)\/$/);

                if (aMatch) {
                    var oDate = new Date(Number(aMatch[1]));

                    return [
                        oDate.getUTCFullYear(),
                        String(oDate.getUTCMonth() + 1).padStart(2, "0"),
                        String(oDate.getUTCDate()).padStart(2, "0")
                    ].join("-");
                }

                return sDate;
            }

            function isChanged(vOld, vNew) {
                return String(vOld == null ? "" : vOld) !==
                    String(vNew == null ? "" : vNew);
            }

            // 1. Check header changes
            // 1. Check header changes
            var bHeaderChanged = isChanged(
                normalizeDate(oOriginal.header.RequestedDeliveryDate),
                normalizeDate(oData.header.RequestedDeliveryDate)
            );

            if (bHeaderChanged) {
                aRequests.push({
                    path: oModel.createKey("/A_SalesOrder", {
                        SalesOrder: sSalesOrder
                    }),
                    data: {
                        RequestedDeliveryDate:
                            oData.header.RequestedDeliveryDate
                    },
                    type: "header"
                });
            }

            // 2. Check item changes
            var bItemsChanged = false;

            aItems.forEach(function (oItem, iIndex) {
                var oOldItem = oOriginal.items[iIndex];

                if (!oOldItem) {
                    return;
                }

                var oChangedFields = {};

                if (isChanged(
                    oOldItem.RequestedQuantity,
                    oItem.RequestedQuantity
                )) {
                    oChangedFields.RequestedQuantity =
                        oItem.RequestedQuantity;
                }

                if (isChanged(
                    oOldItem.ProductionPlant,
                    oItem.ProductionPlant
                )) {
                    oChangedFields.ProductionPlant =
                        oItem.ProductionPlant;
                }

                if (isChanged(
                    oOldItem.StorageLocation,
                    oItem.StorageLocation
                )) {
                    oChangedFields.StorageLocation =
                        oItem.StorageLocation;
                }

                if (Object.keys(oChangedFields).length > 0) {
                    bItemsChanged = true;

                    aRequests.push({
                        path: oModel.createKey("/A_SalesOrderItem", {
                            SalesOrder: sSalesOrder,
                            SalesOrderItem: oItem.SalesOrderItem
                        }),
                        data: oChangedFields,
                        type: "item"
                    });
                }
            });

            // 3. Nothing changed
            if (aRequests.length === 0) {
                oDetailsModel.setProperty("/isEditMode", false);
                MessageToast.show("No changes to save");
                return;
            }

            // 4. Send updates and track success
            var iCompleted = 0;
            var bFailed = false;

            function onRequestComplete(bSuccess) {
                iCompleted++;

                if (!bSuccess) {
                    bFailed = true;
                }

                if (iCompleted === aRequests.length) {
                    if (bFailed) {
                        MessageToast.show(
                            "Some updates failed. Please check the data."
                        );
                        return;
                    }

                    oDetailsModel.setProperty("/isEditMode", false);

                  if (bHeaderChanged && bItemsChanged) {
                        MessageToast.show(
                            "Header and items updated successfully"
                        );
                    } else if (bHeaderChanged) {
                        MessageToast.show(
                            "Header updated successfully"
                        );
                    } else if (bItemsChanged) {
                        MessageToast.show(
                            "Items updated successfully"
                        );
                    }
                }
            }

            aRequests.forEach(function (oRequest) {
                oModel.update(
                    oRequest.path,
                    oRequest.data,
                    {
                        success: function () {
                            onRequestComplete(true);
                        },
                        error: function (oError) {
                            console.error("Update failed", oError);
                            onRequestComplete(false);
                        }
                    }
                );
            });
        },
        // onItemSelectionChange: function () {
        //     var oTable = this.byId("itemsTable1");
        //     var bHasSelectedItems = oTable.getSelectedItems().length > 0;

        //     this.getView().getModel("itemsModel").setProperty(
        //         "/hasSelectedItems",
               
        //     );
        // },



        onNavBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("SalesOrder");
        }
    });
});
