sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller,JSONModel,Dialog,Input,Button,MessageToast,MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.Excel", {

        onInit: function () {
            // Model used by the table
            var oExcelModel = new JSONModel({
                results: [],
                isMassVisible: false
            });

            this.getView().setModel(oExcelModel, "excelModel");

            // Model used for Edit / Save / Cancel
            var oViewModel = new JSONModel({
                editMode: false
            });

            this.getView().setModel(oViewModel, "viewModel");
            this.loadBackendData();
        },

        onExcelUpload: function (oEvent) {
            var aFiles = oEvent.getParameter("files") || [];

            this._oSelectedFile = aFiles.length ? aFiles[0] : null;

            if (this._oSelectedFile) {
                this._readExcelFile(this._oSelectedFile);
            }
        },
        
        
        onUploadPress: function () {
            var oModel = this.getView().getModel("excelModel");
            var aResults = oModel.getProperty("/results") || [];

            if (!this._oSelectedFile) {
                sap.m.MessageToast.show("Please select an Excel file first");
                return;
            }

            if (aResults.length === 0) {
                sap.m.MessageToast.show("No Excel data to upload");
                return;
            }

            this.onSendToBackend();
        },

        
        onUploadToBackend: function () {
            var oModel = this.getView().getModel("excelModel");
            var aResults = oModel.getProperty("/results") || [];

            if (aResults.length === 0) {
                sap.m.MessageToast.show("Please select an Excel file first");
                return;
            }

            this.onSendToBackend();
        },
        
        _readExcelFile: function (oFile) {
            var oReader = new FileReader();

            oReader.onload = function (oEvent) {
                try {
                    var oWorkbook = XLSX.read(oEvent.target.result, {
                        type: "array"
                    });

                    var sSheetName = oWorkbook.SheetNames[0];
                    var oWorksheet = oWorkbook.Sheets[sSheetName];

                    var aResults = XLSX.utils.sheet_to_json(oWorksheet, {
                        defval: ""
                    });
                    var oExcelModel = this.getView().getModel("excelModel");

                    if (!oExcelModel) {
                        sap.m.MessageToast.show("Excel model not found");
                        return;
                    }

                    oExcelModel.setProperty("/results", aResults);

                    sap.m.MessageToast.show("Excel data displayed in table");
                   
                } catch (error) {
                    console.error("Excel reading error:", error);
                    sap.m.MessageToast.show("Unable to read Excel file");
                }
            }.bind(this);

            oReader.readAsArrayBuffer(oFile);
        },



       
        onSendToBackend: function () {
            var oExcelModel = this.getView().getModel("excelModel");

            if (!oExcelModel) {
                MessageToast.show("Please upload Excel data first");
                return;
            }

            var aResults = oExcelModel.getProperty("/results") || [];

            if (aResults.length === 0) {
                MessageToast.show("No Excel records to send");
                return;
            }

            // Prepare the payload
            var oPayload = {
                JsonData: JSON.stringify(aResults)
            };

            // Use the named model if it is configured in manifest.json
            var oODataModel =
                this.getOwnerComponent().getModel("ZEXCEL_API_SRV");

            if (!oODataModel) {
                MessageToast.show("OData model not found");
                return;
            }

            console.log("Records to send:", aResults.length);
            console.log("Payload:", oPayload);

            // POST request to SAP Gateway
            oODataModel.create("/ExcelheadSet", oPayload, {
                success: function (oResponse) {
                    console.log("Backend response:", oResponse);
                    MessageToast.show("Data sent successfully");
                },

                error: function (oError) {
                    console.error("POST failed:", oError);
                    MessageToast.show("Failed to send data to backend");
                }
            });
        },


        
        onSelectionChange: function (oEvent) {
            var oTable = oEvent.getSource();

            // Get all selected rows
            var aSelectedItems = oTable.getSelectedItems();

            // Count selected rows
            var iSelectedCount = aSelectedItems.length;

            // Get Excel model
            var oModel = this.getView().getModel("excelModel");

            // Show button when at least 2 rows are selected
            oModel.setProperty("/isMassVisible", iSelectedCount >= 2);

            console.log("Selected count:", iSelectedCount);
            console.log("Mass Update visible:", iSelectedCount >= 2);
        },

        onChooseField: function (oEvent) {
            var oMenuItem = oEvent.getSource();

            // Store the selected column
            this._selectedField = oMenuItem.getText();

            var oInput = new Input({
                placeholder: "Enter new " + this._selectedField
            });

            this._oMassDialog = new Dialog({
                title: "Update " + this._selectedField,
                content: [oInput],

                beginButton: new Button({
                    text: "Apply",
                    type: "Emphasized",
                    press: function () {
                        this.onMassUpdate(oInput.getValue());
                    }.bind(this)
                }),

                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        this._oMassDialog.close();
                    }.bind(this)
                })
            });

            this._oMassDialog.open();
        },
                
        
        // onDownloadExcel:function () {
        //     // oModel:used to view the Excelmodel
        //     var oModel = this.getView("excelModel").getModel("excelModel")
        //     // we can get data using excel model
        //     var aData = oModel.getProperty("/results")

        //     var oWorksheet = XLSX.utils.json_to_sheet(aData)
        //     var oWorkbook = XLSX.utils.book_new()
        //     // workbook:it is normal book,woeksheet:pages in side book

        //     XLSX.utils.book_append_sheet(
        //         oWorkbook,
        //         oWorksheet,
        //         "Student"
        //     )
        //     XLSX.writeFile(oWorkbook, "Student_Data.xlsx");
        // },

        onExport: function () {
            this._exportExcel("Student_Data");
        },

        onExportAs: function () {
            var oFileNameInput = new Input({
                value: "Student_Data",
                placeholder: "Enter file name",
                width: "100%"
            });

            var oDialog = new Dialog({
                title: "Export As",
                contentWidth: "320px",
                content: [
                    new sap.m.Label({
                        text: "File Name"
                    }),
                    oFileNameInput
                ],
                beginButton: new Button({
                    text: "Export",
                    type: "Emphasized",
                    press: function () {
                        var sFileName = oFileNameInput.getValue().trim();

                        if (!sFileName) {
                            MessageToast.show("Enter a file name");
                            return;
                        }

                        // Remove extension if user entered it
                        sFileName = sFileName.replace(/\.xlsx$/i, "");

                        oDialog.close();
                        this._exportExcel(sFileName);
                    }.bind(this)
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });

            oDialog.open();
        },

        _exportExcel: function (sFileName) {
            var oModel = this.getView().getModel("excelModel");

            if (!oModel) {
                MessageToast.show("Please upload Excel data first");
                return;
            }

            var aData = oModel.getProperty("/results") || [];

            if (aData.length === 0) {
                MessageToast.show("No data to export");
                return;
            }

            // Create worksheet and workbook
            var oWorksheet = XLSX.utils.json_to_sheet(aData);
            var oWorkbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                oWorkbook,
                oWorksheet,
                "Students"
            );

            // Download the Excel file
            XLSX.writeFile(oWorkbook, sFileName + ".xlsx");

            MessageToast.show("Excel file exported successfully");
        },

        onMassUpdate: function (sValue) {
            var oModel = this.getView().getModel("excelModel");
            var oTable = this.byId("excelTable");
            var aResults = oModel.getProperty("/results") || [];
            var sField = this._selectedField;

            // Get selected rows from checkboxes
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select at least one row");
                return;
            }

            if (!sField || !sValue || !sValue.trim()) {
                MessageToast.show("Choose a column and enter a value");
                return;
            }

            // Validate numeric fields
            if (sField === "FEE" || sField === "WEIGHT") {
                sValue = Number(sValue);

                if (!Number.isFinite(sValue) || sValue < 0) {
                    MessageToast.show("Enter a valid number");
                    return;
                }
            }

            // Update only the checked rows
            aSelectedItems.forEach(function (oItem) {
                var oContext = oItem.getBindingContext("excelModel");
                var sPath = oContext.getPath();

                oModel.setProperty(sPath + "/" + sField, sValue);
            });

            this._oMassDialog.close();

            MessageToast.show(
                sField + " updated for " + aSelectedItems.length + " selected rows"
            );
        }, 

        onStudentNamePress: function (oEvent) {
            var oContext = oEvent.getSource()
                .getBindingContext("excelModel");

            var oStudent = oContext.getObject();

            var oEditModel = new JSONModel(
                Object.assign({}, oStudent)
            );

            this.getView().setModel(oEditModel, "editModel");

            this.byId("studentEditDialog").open();
        },
        onSaveStudent: function () {
            var oEditModel = this.getView().getModel("editModel");
            var oStudent = oEditModel.getData();

            var oExcelModel = this.getView().getModel("excelModel");
            var aResults = oExcelModel.getProperty("/results");

            var oTable = this.byId("excelTable");
            var oSelectedContext = this._selectedStudentContext;

            if (!oSelectedContext) {
                sap.m.MessageToast.show("Student record not found");
                return;
            }

            var iIndex = aResults.indexOf(oSelectedContext.getObject());

            if (iIndex === -1) {
                sap.m.MessageToast.show("Student record not found");
                return;
            }

            oExcelModel.setProperty("/results/" + iIndex, oStudent);

            this.byId("studentEditDialog").close();

            sap.m.MessageToast.show("Student details updated");
        },
        onCancelStudentEdit: function () {
            this.byId("studentEditDialog").close();
        },
        
        // onEdit: function () {
        //     var oModel = this.getView().getModel("excelModel");

        //     // Keep a copy for Cancel
        //     this._originalData = JSON.parse(
        //         JSON.stringify(oModel.getProperty("/results"))
        //     );

        //     oModel.setProperty("/isEditing", true);
        // },
        onEdit: function () {
            this.getView().getModel("viewModel").setProperty("/editMode", true);
        },
        

        onSave: function () {
            var oExcelModel = this.getView().getModel("excelModel");
            var aResults = oExcelModel.getProperty("/results") || [];

            var oODataModel =
                this.getOwnerComponent().getModel("ZEXCEL_API_SRV");

            if (!oODataModel) {
                MessageToast.show("OData model not found");
                return;
            }

            if (aResults.length === 0) {
                MessageToast.show("No records to update");
                return;
            }

            // Update the selected record
            var oTable = this.byId("excelTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length !== 1) {
                MessageToast.show("Please select one record to update");
                return;
            }

            var oContext = aSelectedItems[0].getBindingContext("excelModel");
            var oStudent = oContext.getObject();

            // The backend entity key
            var sPath = "/ExcelheadSet(StdId='" + oStudent.STD_ID + "')";
            oStudent.FEES = oStudent.FEE;
            oStudent.FEE_CURRENCY = oStudent.FEE_CURRENCY;
            // Your backend entity has a JsonData property
            var oPayload = {
                JsonData: JSON.stringify([oStudent])
            };

            oODataModel.update(sPath, oPayload, {
                success: function () {
                    MessageToast.show("Record updated successfully");
                    this.getView().getModel("viewModel")
                        .setProperty("/editMode", false);
                }.bind(this),

                error: function (oError) {
                    console.error("Update failed:", oError);
                    MessageToast.show("Update failed. Check the backend response.");
                }
            });
        },


       


        onCancel: function () {
            var oModel = this.getView().getModel("viewModel").setProperty("/editMode", false);

            // if (this._originalData) {
            //     oModel.setProperty("/results", this._originalData);
            // }

            // oModel.setProperty("/isEditing", false);
            // this._originalData = null;

            // MessageToast.show("Changes cancelled");
        },
 



       
        onDelete: function () {
            var oTable = this.byId("excelTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length !== 1) {
                MessageToast.show("Please select one student to delete.");
                return;
            }

            var oContext =
                aSelectedItems[0].getBindingContext("excelModel");

            var oStudent = oContext.getObject();
            var sStudentId = oStudent.STD_ID;

            var oModel =
                this.getOwnerComponent().getModel("ZEXCEL_API_SRV");

            var that = this;

            MessageBox.confirm(
                "Are you sure you want to delete " + sStudentId + "?",
                {
                    title: "Confirm Deletion",
                    actions: [
                        MessageBox.Action.OK,
                        MessageBox.Action.CANCEL
                    ],
                    emphasizedAction: MessageBox.Action.OK,

                    onClose: function (sAction) {
                        if (sAction !== MessageBox.Action.OK) {
                            return;
                        }

                        // Delete the selected student from the backend
                        var sPath =
                            "/ExcelheadSet(StdId='" + sStudentId + "')";

                        oModel.remove(sPath, {
                            success: function () {
                                MessageToast.show(
                                    "Student deleted successfully."
                                );

                                oTable.removeSelections(true);

                                // Reload the latest backend data
                                that.loadBackendData();
                            },

                            error: function (oError) {
                                console.error("Delete failed:", oError);

                                MessageBox.error(
                                    "Unable to delete student. Check the API response."
                                );
                            }
                        });
                    }
                }
            );
        },




        loadBackendData: function () {
            var oODataModel = this.getOwnerComponent().getModel("ZEXCEL_API_SRV");
            var oExcelModel = this.getView().getModel("excelModel");
            if (!oODataModel) {
                sap.m.MessageToast.show("OData model not found");
                return;
            }
            
            oODataModel.read("/ExcelheadSet", {
                success: function (oData) {
                    try {
                        var aEntries = Array.isArray(oData.results) ? oData.results : (oData ? [oData] : []);
                        if (aEntries.length === 0) {
                            return;
                        }
                        
                        // Parse from the first active payload wrapper available
                        var sJsonData = aEntries[0].JsonData;
                        var aStudents = JSON.parse(sJsonData || "[]");
                        
                        aStudents = aStudents.map(function (oStudent) {
                            oStudent.MOTHER_NAME = oStudent.CMOTHER_NAME;
                            oStudent.FEE = oStudent.FEES;
                            return oStudent;
                        });
                        
                        oExcelModel.setProperty("/results", aStudents);
                        sap.m.MessageToast.show(aStudents.length + " records loaded successfully");
                    } catch (oError) {
                        console.error("Error parsing GET data:", oError);
                        sap.m.MessageToast.show("Unable to process backend data format");
                    }
                },
                error: function (oError) {
                    console.error("GET API failed:", oError);
                    sap.m.MessageToast.show("Unable to retrieve backend data");
                }
            });
        }






        

       


        


    });
});
