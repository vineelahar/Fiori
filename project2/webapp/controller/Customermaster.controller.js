sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",  
    "sap/m/Input",   
    "sap/m/Button"  
], function (Controller, MessageToast, JSONModel, Dialog, Input, Button) {

    "use strict";

    return Controller.extend("project2.controller.Customermaster", {

        onInit: function () {

            var oModel = new JSONModel({
                files: []
            });

            this.getView().setModel(oModel);
        },


        onFileSelected: function (oEvent) {

            var oFile = oEvent.getParameter("files")[0];

            if (!oFile) {
                return;
            }

            var oModel = this.getView().getModel();

            var aFiles = oModel.getProperty("/files");

            aFiles.push({
                name: oFile.name,
                file: oFile
            });

            oModel.setProperty("/files", aFiles);

            MessageToast.show(
                "File selected: " + oFile.name
            );
        },


        onEdit: function (oEvent) {

            var oContext = oEvent.getSource().getBindingContext();

            var oFile = oContext.getObject();

            var oInput = new Input({
                value: oFile.name
            });

            var oDialog = new Dialog({
                title: "Edit File Name",

                content: [
                    oInput
                ],

                beginButton: new Button({
                    text: "Save",

                    press: function () {

                        oFile.name = oInput.getValue();

                        oContext.getModel().refresh(true);

                        oDialog.close();

                        MessageToast.show("File name updated");
                    }
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


        onDelete: function (oEvent) {

            var oContext =
                oEvent.getSource().getBindingContext();

            if (!oContext) {
                MessageToast.show("No file selected");
                return;
            }

            var sPath =
                oContext.getPath();

            var iIndex =
                parseInt(sPath.split("/").pop());

            var oModel =
                this.getView().getModel();

            var aFiles =
                oModel.getProperty("/files");

            aFiles.splice(iIndex, 1);

            oModel.setProperty("/files", aFiles);

            MessageToast.show("File deleted");
        },


        onDownload: function (oEvent) {

            var oContext =
                oEvent.getSource().getBindingContext();

            if (!oContext) {
                MessageToast.show("No file selected");
                return;
            }

            var oFileData =
                oContext.getObject();

            var oFile =
                oFileData.file;

            if (!oFile) {
                MessageToast.show("File not available");
                return;
            }

            var sUrl =
                URL.createObjectURL(oFile);

            var oLink =
                document.createElement("a");

            oLink.href = sUrl;

            oLink.download =
                oFile.name;

            document.body.appendChild(oLink);

            oLink.click();

            document.body.removeChild(oLink);

            URL.revokeObjectURL(sUrl);

            MessageToast.show(
                "File downloaded"
            );
        }

    });

});