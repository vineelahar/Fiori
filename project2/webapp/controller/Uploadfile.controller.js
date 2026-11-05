sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {

    "use strict";

    return Controller.extend(
        "project2.controller.Uploadfile",
        {

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

                var oButton = oEvent.getSource();

                var oContext = oButton.getBindingContext();

                if (!oContext) {
                    MessageToast.show("No file selected");
                    return;
                }

                var oFile = oContext.getObject();

                MessageToast.show("Editing: " + oFile.name);

                console.log("Edit file:", oFile);
            },


            onDelete: function (oEvent) {

                var oContext =
                    oEvent.getSource().getBindingContext();

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
           

        }
    );

});