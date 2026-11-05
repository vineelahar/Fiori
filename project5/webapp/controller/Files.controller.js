sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/SelectDialog",
    "sap/m/StandardListItem",
    "sap/m/MessageToast",
    "project5/Utlities/ExcelUtils"
], function (Controller, JSONModel, SelectDialog, StandardListItem, MessageToast, ExcelUtils) {
    "use strict";

    // Plant-to-Request mapping
    var oPlantRequestMap = {
        "1001": "AB",
        "1002": "AC",
        "1003": "AD"
    };

    return Controller.extend("project5.controller.Files", {

        onInit: function () {
            var oViewModel = new JSONModel({
                plant: "",
                request: "",
                isFilledDataVisible: false
            });

            this.getView().setModel(oViewModel, "viewModel");
            var oTable = new JSONModel({
                selectedTable: "BOM",
                options:[
                    {key: "BOM", text: "BOM Table"},
                    {key: "Routing", text: "Routing Table"}
                ]
            });
            this.getView().setModel(oTable, "tableModel")

            var oBOMModel = new JSONModel({
                results: []
            });
            this.getView().setModel(oBOMModel, "bomModel");

            var oRoutingModel = new JSONModel ({
                results: []
            });
            this.getView().setModel(oRoutingModel, "routingModel")
        },

        onPlantValueHelp: function () {
            var aPlants = [
                { Plant: "1001" },
                { Plant: "1002" },
                { Plant: "1003" }
            ];

            this._openValueHelp(
                "Select Plant",
                aPlants,
                "Plant",
                "plantInput"
            );
        },
        onRequestValueHelp: function () {
            var aRequests = [
                { Request: "AB" },
                { Request: "AC" },
                { Request: "AD" }
            ];

            this._openValueHelp(
                "Select Request",
                aRequests,
                "Request",
                "requestInput"
            );
        },

        _openValueHelp: function (sTitle, aData, sProperty, sInputId) {
            var oDialog = new SelectDialog({
                title: sTitle,

                items: {
                    path: "/",
                    template: new StandardListItem({
                        title: "{" + sProperty + "}"
                    })
                },

                confirm: function (oEvent) {
                    var oSelectedItem = oEvent.getParameter("selectedItem");

                    if (oSelectedItem) {
                        var sValue = oSelectedItem.getTitle();

                        this.byId(sInputId).setValue(sValue);

                        var oViewModel = this.getView().getModel("viewModel");

                        if (sInputId === "plantInput") {
                            oViewModel.setProperty("/plant", sValue);
                        }

                        if (sInputId === "requestInput") {
                            oViewModel.setProperty("/request", sValue);

                            var sTableKey;
                                if (sValue === "AB") {
                                    sTableKey = "BOM";
                                    // sTableKey = "Routing";
                                } else if (sValue === "AC") {
                                    sTableKey = "BOM";
                                }else if (sValue === "AD") {
                                    sTableKey = "Routing";
                                }

                                this.byId("fileTabBar").setSelectedKey(sTableKey);
                        }
                    }

                    oDialog.destroy();
                }.bind(this),

                cancel: function () {
                    oDialog.destroy();
                }
            });

            oDialog.setModel(new JSONModel(aData));
            oDialog.open();
        },
        onTableSelectionChange: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("item").getKey();
            this.getView().getModel("tableModel").setProperty("/selectedTable", sSelectedKey)
        },

        onDownloadBOM: function () {
            ExcelUtils.downloadBOM();
        },

        onDownloadrouting: function () {
            ExcelUtils.downloadRouting();
        },

        onUpload: function () {
            MessageToast.show("Upload functionality will be added next.");
        },
        onUploadBOM: function (oEvent) {
            var oFile = oEvent.getParameter("files")[0];

            if (!oFile) {
                return;
            }
            var oReader = new FileReader();

            oReader.onload = function (oLoadEvent) {
                var oWorkbook = XLSX.read(oLoadEvent.target.result,{
                    type:"array"
                });

                var sSheetName = oWorkbook.SheetNames[0];
                var oSheet = oWorkbook.Sheets[sSheetName];

                var aRows = XLSX.utils.sheet_to_json(oSheet, {
                    defval: ""
                });
                console.log("Excel rows:", aRows);
                console.log("Excel headers:", Object.keys(aRows[0] || {}));
                
                this.getView().getModel("bomModel").setProperty("/results", aRows);
                this.getView().getModel("viewModel").setProperty("/isFilledDataVisible", aRows.length > 0)
            }.bind(this)

            oReader.readAsArrayBuffer(oFile);

        },
        onUploadRouting: function (oEvent) {
            var oFile = oEvent.getParameter("files")[0];

            if (!oFile) {
                return
            }

            var oReader = new FileReader();

            oReader.onload = function (oLoadEvent) {
                var oWorkbook = XLSX.read(oLoadEvent.target.result,{
                    type:"array"
                });

                var sSheetName = oWorkbook.SheetNames[0];
                var oSheet = oWorkbook.Sheets[sSheetName];

                var aRows = XLSX.utils.sheet_to_json(oSheet, {
                    defval: ""
                });
                 console.log("Excel rows:", aRows);
                console.log("Excel headers:", Object.keys(aRows[0] || {}));
                
                this.getView().getModel("routingModel").setProperty("/results", aRows);
                this.getView().getModel("viewModel").setProperty("/isFilledDataVisible", aRows.length > 0);
            }.bind(this)

            oReader.readAsArrayBuffer(oFile);

        },
        onDownloadBOMTemplate: function () {
            ExcelUtils.downloadBOM();
        },

        onDownloadBOM: function () {
            var aRows = this.getView()
                .getModel("bomModel")
                .getProperty("/results") || [];

            if (!aRows.length) {
                MessageToast.show("No BOM data is download.");
                return
            }

            var aHeaders = Object.keys(aRows[0]);

            ExcelUtils.createExcel(
                aHeaders,
                aRows,
                "BOM",
                "BOM_Data.xlsx"
            );
        },

        onDownloadRoutingTemplate: function () {
            ExcelUtils.downloadRouting();
        },
        onDownloadRouting: function () {
            var aRows = this.getView()
                .getModel("routingModel")
                .getProperty("/results") || [];

            if (!aRows.length) {
                MessageToast.show("No Routing data to download");
                    return;
            }

            var aHeaders = Object.keys(aRows[0]);

            ExcelUtils.createExcel(
                aHeaders,
                aRows,
                "Routing",
                "Routing_Data.xlsx"
            );
        }
    });
});