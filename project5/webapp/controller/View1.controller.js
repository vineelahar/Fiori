sap.ui.define([
    "sap/ui/core/mvc/Controller",
     
     "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project5.controller.View1", {
        onInit: function () {
            var oGroupingModel = new JSONModel();
            oGroupingModel.loadData(
                sap.ui.require.toUrl("project5/model/groupings.json")
            );
            oGroupingModel.attachRequestCompleted(function () {
                console.log("groupings data:", oGroupingModel.getData());
            });
            
            var oCountryModel = new sap.ui.model.json.JSONModel(
                sap.ui.require.toUrl("project5/model/countries.json")
            );
              var oCompanyModel = new sap.ui.model.json.JSONModel(
                sap.ui.require.toUrl("project5/model/Company.json")
            );
           this.getView().setModel(oGroupingModel, "groupings");
            this.getView().setModel(oCountryModel, "countries");
            this.getView().setModel(oCompanyModel, "Company");
        },
        // onLanguageValueHelp: function (oEvent) {
        //     console.log("Language Value Help clicked");
        // },
        // onGroupingValueHelp: function (oEvent) {

        //     var oInput = oEvent.getSource();

        //     // 1. Create table
        //     var oTable = new sap.m.Table({
        //         columns: [
        //             new sap.m.Column({
        //                 header: new sap.m.Text({
        //                     text: "Key"
        //                 })
        //             }),
        //             new sap.m.Column({
        //                 header: new sap.m.Text({
        //                     text: "Name"
        //                 })
        //             })
        //         ]
        //     });
        //     oTable.setModel(
        //         this.getView().getModel("groupings")
        //     );

        //     // 2. Bind groupings model to table
        //     oTable.bindItems({
        //         path: "/groupings",
        //         template: new sap.m.ColumnListItem({
        //             cells: [
        //                 new sap.m.Text({
        //                     text: "{key}"
        //                 }),
        //                 new sap.m.Text({
        //                     text: "{name}"
        //                 })
        //             ]
        //         })
        //     });

        //     // 3. Create ValueHelpDialog
        //     var oDialog = new ValueHelpDialog({
        //         title: "Grouping",

        //         ok: function (oEvent) {

        //             var aTokens = oEvent.getParameter("tokens");

        //             if (aTokens.length > 0) {
        //                 oInput.setValue(aTokens[0].getText());
        //             }

        //             oDialog.close();
        //         },

        //         cancel: function () {
        //             oDialog.close();
        //         }
        //     });

        //     // 4. Put table inside ValueHelpDialog
        //     oDialog.setTable(oTable);

        //     // 5. Open dialog
        //     oDialog.open();
        // },
        onGroupingValueHelp:function(oEvent){
            // onGroupingValueHelp():Opens the Fragment
            this._oGroupingInput = oEvent.getSource();
            if (!this._oGroupingDialog) {
                this._oGroupingDialog = sap.ui.xmlfragment(
                    "project5.view.GroupingValueHelp",this
                );
                this.getView().addDependent(this._oGroupingDialog);
            }
            this._oGroupingDialog.open()
           
        },
        onGroupingSelect: function (oEvent) {
            // onGroupingSelect():Handles the row click and puts the selected value into the Inpu

            var oItem = oEvent.getParameter("listItem");

            var oData = oItem.getBindingContext("groupings").getObject();

            this._oGroupingInput.setValue(oData.name);

            this._oGroupingDialog.close();
        },

        onLanguageValueHelp: function(oEvent){
            this._oLanguageInput = oEvent.getSource();
            if (!this._oLanguageDialog) {
                this._oLanguageDialog = sap.ui.xmlfragment(
                    "project5.view.LanguageValueHelp",this
                );
                this.getView().addDependent(this._oLanguageDialog)
            }
            this._oLanguageDialog.open()
        },
        onLanguageSelect: function(oEvent){
            var oItem = oEvent.getParameter("listItem");
            var oData = oItem.getBindingContext("groupings").getObject()
            this._oLanguageInput.setValue(oData.name);
            this._oLanguageDialog.close();
        },
        oncompanyValueHelp: function(oEvent){
            this.oCompanyInput = oEvent.getSource();
            if (!this._oCompanyDialog) {
                this._oCompanyDialog = sap.ui.xmlfragment(
                    "project5.view.CompanyValueHelp",this
                );
                this.getView().setModel(oCompanyModel, "Company")
            }
            this._oCompanyDialog.open()
        },
        onCompanySelect: function(oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var oData = oItem.getBindingContext("Company").getObject()
            this._oCompanyInput.setValue(oData.name);
            this._oComapanyDialog.close()
        },

        onTabSelect:function (oEvent){
            var skey = oEvent.getParameter("key")
            var oTargets = {
                general: "generalDataInformation",
                Compny : "companyCodeSelection"
            }
            var oTarget =this.byId(oTargets[sKey]);
            
            if (oTarget) {
                oTarget.getDomRef().scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });
            }
        },
        onAddRow: function () {
            var oTable = this.byId("bankTable");

            var oRow = new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Input(),

                    new sap.m.Select({
                        items: {
                            path: "countries>/countries",
                            template: new sap.ui.core.Item({
                                key: "{countries>key}",
                                text: "{countries>name}"
                            })
                        }
                    }),

                    new sap.m.Input({
                        showValueHelp: true
                    }),

                    new sap.m.Input(),

                    new sap.m.Input(),

                    new sap.m.Input(),

                    new sap.m.CheckBox()
                ]
            });

            oTable.addItem(oRow);

            console.log("Rows:", oTable.getItems().length);
        },
        

           

        onSelectionChange: function (oEvent) {
            var aSelectedItems = oEvent.getParameter("listItems");

            console.log("Selected:", aSelectedItems.length);
        },

       onDeleteRow: function () {
            var oTable = this.byId("bankTable");
            var aSelectedItems = oTable.getSelectedItems();

            console.log("Selected rows:", aSelectedItems.length);

            aSelectedItems.forEach(function (oItem) {
                oTable.removeItem(oItem);
            });

            oTable.removeSelections();
        },

        // ---------->Identification numbers----->
        
        onAddIdentificationRow: function () {
            var oTable = this.byId("identificationNumbersTable");

            var oRow = new sap.m.ColumnListItem({
                cells: [

                    
                    new sap.m.Input({
                        showValueHelp: true
                    }),

                    
                    new sap.m.Input(),

                    new sap.m.Input(),

                    new sap.m.DatePicker({
                        displayFormat: "yyyy-MM-dd"
                    }),

                    new sap.m.DatePicker({
                        displayFormat: "yyyy-MM-dd"
                    }),

                    new sap.m.DatePicker({
                        displayFormat: "yyyy-MM-dd"
                    }),


                    new sap.m.Input({
                        showValueHelp: true
                    }),

                    new sap.m.Input()
                ]
            });

            oTable.addItem(oRow);

            console.log("Rows:", oTable.getItems().length);
        },

        onDeleteIdentificationRow: function () {
            var oTable = this.byId("identificationNumbersTable");
            var aSelectedItems = oTable.getSelectedItems();

            console.log("Selected rows:", aSelectedItems.length);

            aSelectedItems.forEach(function (oItem) {
                oTable.removeItem(oItem);
            });

            oTable.removeSelections();
        },

        onIdentificationSelectionChange: function (oEvent) {
            var aItems = oEvent.getParameter("listItems")
                // listItems is related to the items selected in a ListBase control, such as sap.m.List or sap.m.Table 
            console.log("Selection event fires");
            // it is used for debugging ex:console.log("Event:", oEvent);
            console.log("Selected:",aItems.length);
                
            
        },
        
    });
});