sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (
    Controller,
    JSONModel,
    MessageToast
) {

    "use strict";

    return Controller.extend("project2.controller.Table", {

      
        // INITIAL LOAD
      

        onInit: function () {

            var oData = {

                editMode: false,

                // This is the data displayed by the table
                customers: [],

                // Customer data for each language
                languages: {

                    
                    // ENGLISH
                   
                    en: [
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
                            Name: "John",
                            City: "London",
                            Country: "UK"
                        },
                        {
                            CustomerID: "C004",
                            Name: "David",
                            City: "New York",
                            Country: "USA"
                        }
                    ],

                    // TELUGU
            
                    te: [
                        {
                            CustomerID: "C001",
                            Name: "వినీల",
                            City: "హైదరాబాద్",
                            Country: "భారతదేశం"
                        },
                        {
                            CustomerID: "C002",
                            Name: "హరీష్",
                            City: "బెంగళూరు",
                            Country: "భారతదేశం"
                        },
                        {
                            CustomerID: "C003",
                            Name: "జాన్",
                            City: "లండన్",
                            Country: "యునైటెడ్ కింగ్‌డమ్"
                        },
                        {
                            CustomerID: "C004",
                            Name: "డేవిడ్",
                            City: "న్యూయార్క్",
                            Country: "అమెరికా"
                        }
                    ],

                    // HINDI
                    
                    hi: [
                        {
                            CustomerID: "C001",
                            Name: "विनीला",
                            City: "हैदराबाद",
                            Country: "भारत"
                        },
                        {
                            CustomerID: "C002",
                            Name: "हरीश",
                            City: "बैंगलोर",
                            Country: "भारत"
                        },
                        {
                            CustomerID: "C003",
                            Name: "जॉन",
                            City: "लंदन",
                            Country: "यूनाइटेड किंगडम"
                        },
                        {
                            CustomerID: "C004",
                            Name: "डेविड",
                            City: "न्यूयॉर्क",
                            Country: "अमेरिका"
                        }
                    ],

                    
                    // GERMAN
                    
                    de: [
                        {
                            CustomerID: "C001",
                            Name: "Vineela",
                            City: "Hyderabad",
                            Country: "Indien"
                        },
                        {
                            CustomerID: "C002",
                            Name: "Harish",
                            City: "Bangalore",
                            Country: "Indien"
                        },
                        {
                            CustomerID: "C003",
                            Name: "John",
                            City: "London",
                            Country: "Vereinigtes Königreich"
                        },
                        {
                            CustomerID: "C004",
                            Name: "David",
                            City: "New York",
                            Country: "USA"
                        }
                    ]

                },

                // Used when editing a customer
                selectedCustomer: {}

            };

            // Create JSON model
            var oModel = new JSONModel(oData);

            // Set model to the View
            this.getView().setModel(oModel);

            // Initially display English customers
            oModel.setProperty(
                "/customers",
                oData.languages.en
            );

        },


        // ROW SELECTION
    

        onRowSelect: function (oEvent) {

            this._oSelectedItem =
                oEvent.getParameter("listItem");

            console.log("ROW SELECTED");

        },


        // EDIT
        
        onEdit: function () {

            var oBundle =
                this.getView()
                    .getModel("i18n")
                    .getResourceBundle();

            // Check whether customer is selected
            if (!this._oSelectedItem) {

                MessageToast.show(
                    oBundle.getText("selectCustomer")
                );

                return;
            }

            // Get selected row context
            var oContext =
                this._oSelectedItem.getBindingContext();

            // Get customer object
            var oCustomer =
                oContext.getObject();

            // Get JSON model
            var oModel =
                this.getView().getModel();

            // Create a copy of selected customer
            oModel.setProperty(
                "/selectedCustomer",
                Object.assign({}, oCustomer)
            );

            // Enter edit mode
            oModel.setProperty(
                "/editMode",
                true
            );

        },


    
        // SAVE
        
        onSave: function () {

            var oBundle =
                this.getView()
                    .getModel("i18n")
                    .getResourceBundle();

            var oModel =
                this.getView().getModel();

            // Get selected row
            var oContext =
                this._oSelectedItem.getBindingContext();

            // Get path of selected customer
            var sPath =
                oContext.getPath();

            // Get edited customer
            var oEditedCustomer =
                oModel.getProperty(
                    "/selectedCustomer"
                );

            // Update customer in table
            oModel.setProperty(
                sPath,
                oEditedCustomer
            );

            // Exit edit mode
            oModel.setProperty(
                "/editMode",
                false
            );

            MessageToast.show(
                oBundle.getText("saveSuccess")
            );

        },

        // CANCEL

        onCancel: function () {

            var oBundle =
                this.getView()
                    .getModel("i18n")
                    .getResourceBundle();

            var oModel =
                this.getView().getModel();

            // Exit edit mode
            oModel.setProperty(
                "/editMode",
                false
            );

            MessageToast.show(
                oBundle.getText("cancelMessage")
            );

        },


        // LANGUAGE CHANGE
        

        onLanguageChange: function (oEvent) {

            // Get selected language
            var sLanguage =
                oEvent
                    .getParameter("selectedItem")
                    .getKey();

            console.log("Selected language:", sLanguage);

            var oModel =
                this.getView().getModel();

            // 1. Change UI language
        

            sap.ui.getCore()
                .getConfiguration()
                .setLanguage(sLanguage);


            // 2. Get customer data for selected language
           

            var aCustomers =
                oModel.getProperty(
                    "/languages/" + sLanguage
                );

            console.log(
                "Translated customers:",
                aCustomers
            );


            // 3. Put translated data into /customers
     

            oModel.setProperty(
                "/customers",
                aCustomers
            );

        }

    });

});