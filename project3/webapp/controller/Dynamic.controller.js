sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/Token"
], function (Controller, Filter, FilterOperator, JSONModel, Token) {

    "use strict";

    return Controller.extend("project3.controller.Dynamic", {

        onInit: function () {

            this.loadedCityCountryData();

            // Company MultiInput - default tokens
            var oCompanyInput = this.byId("CompanyInput");

            oCompanyInput.addToken(new Token({
                key: "ALFKI",
                text: "Alfreds Futterkiste"
            }));

            oCompanyInput.addToken(new Token({
                key: "ANATR",
                text: "Ana Trujillo Emparedados y helados"
            }));

            oCompanyInput.addToken(new Token({
                key: "AROUT",
                text: "Around the Horn"
            }));

            // Address MultiInput - default tokens
            var oAddressInput = this.byId("AddressInput");

            oAddressInput.addToken(new Token({
                key: "ALFKI",
                text: "Obere Str. 57"
            }));

            oAddressInput.addToken(new Token({
                key: "ANATR",
                text: "Avda. de la Constitución 2222"
            }));

            oAddressInput.addToken(new Token({
                key: "AROUT",
                text: "Mataderos 2312"
            }));
        },


        onSearch: function () {

            var aFilters = [];

            var oCustomerInput = this.byId("customerInput");
            var oCompanyInput = this.byId("CompanyInput");
            var oCityCombo = this.byId("CityCombo");
            var oCountryCombo = this.byId("CountryCombo");
            var oAddressInput = this.byId("AddressInput");


            // 1. Customer MultiInput filter
            var aCustomerTokens = oCustomerInput.getTokens();

            var aCustomers = aCustomerTokens.map(function (oToken) {
                return oToken.getKey();
            });

            var aCustomerFilters = aCustomers.map(function (sCustomerId) {
                return new Filter(
                    "CustomerID",
                    FilterOperator.EQ,
                    sCustomerId
                );
            });

            if (aCustomerFilters.length > 0) {
                aFilters.push(new Filter({
                    filters: aCustomerFilters,
                    and: false
                }));
            }


            // 2. Company MultiInput filter
            var aCompanyTokens = oCompanyInput.getTokens();

            var aCompanyIds = aCompanyTokens.map(function (oToken) {
                return oToken.getKey();
            });

            var aCompanyFilters = aCompanyIds.map(function (sCustomerId) {
                return new Filter(
                    "CustomerID",
                    FilterOperator.EQ,
                    sCustomerId
                );
            });

            if (aCompanyFilters.length > 0) {
                aFilters.push(new Filter({
                    filters: aCompanyFilters,
                    and: false
                }));
            }


            // 3. Address MultiInput filter
            var aAddressTokens = oAddressInput.getTokens();

            var aAddresses = aAddressTokens.map(function (oToken) {
                return oToken.getKey();
            });

            var aAddressFilters = aAddresses.map(function (sCustomerId) {
                return new Filter(
                    "CustomerID",
                    FilterOperator.EQ,
                    sCustomerId
                );
            });

            if (aAddressFilters.length > 0) {
                aFilters.push(new Filter({
                    filters: aAddressFilters,
                    and: false
                }));
            }


            // 4. City filter
            var aCities = oCityCombo.getSelectedKeys();

            if (aCities.length > 0) {

                var aCityFilters = aCities.map(function (sCity) {
                    return new Filter(
                        "City",
                        FilterOperator.EQ,
                        sCity
                    );
                });

                aFilters.push(new Filter({
                    filters: aCityFilters,
                    and: false
                }));
            }


            // 5. Country filter
            var aCountries = oCountryCombo.getSelectedKeys();

            if (aCountries.length > 0) {

                var aCountryFilters = aCountries.map(function (sCountry) {
                    return new Filter(
                        "Country",
                        FilterOperator.EQ,
                        sCountry
                    );
                });

                aFilters.push(new Filter({
                    filters: aCountryFilters,
                    and: false
                }));
            }


            // Apply all filters to the Customers table
            this.byId("Customers")
                .getBinding("items")
                .filter(aFilters);
        },


        // Load unique city and country values
        loadedCityCountryData: function () {

            var oModel = this.getOwnerComponent().getModel();

            oModel.read("/Customers", {

                success: function (oData) {

                    var aCities = [];
                    var aCountries = [];

                    oData.results.forEach(function (oCustomer) {

                        if (
                            oCustomer.City &&
                            aCities.indexOf(oCustomer.City) === -1
                        ) {
                            aCities.push(oCustomer.City);
                        }

                        if (
                            oCustomer.Country &&
                            aCountries.indexOf(oCustomer.Country) === -1
                        ) {
                            aCountries.push(oCustomer.Country);
                        }
                    });


                    var aCityItems = aCities.map(function (sCity) {
                        return {
                            City: sCity
                        };
                    });

                    var aCountryItems = aCountries.map(function (sCountry) {
                        return {
                            Country: sCountry
                        };
                    });


                    var oCityModel = new JSONModel({
                        Cities: aCityItems,
                        Countries: aCountryItems
                    });

                    this.getView().setModel(oCityModel, "cityModel");

                }.bind(this),

                error: function (oError) {
                    console.error("Failed to load cities and countries:", oError);
                }
            });
        },


        // Customer suggestion selection
        onSuggestionItemSelected: function (oEvent) {

            var oSelectedItem = oEvent.getParameter("selectedItem");

            if (!oSelectedItem) {
                return;
            }

            console.log("CustomerID:", oSelectedItem.getKey());
            console.log("Company Name:", oSelectedItem.getText());
        },


        // Company suggestion selection
        onSuggestionCompanysItemSelected: function (oEvent) {

            var oSelectedItem = oEvent.getParameter("selectedItem");

            if (!oSelectedItem) {
                return;
            }

            console.log("CustomerID:", oSelectedItem.getKey());
            console.log("Company Name:", oSelectedItem.getText());
        },
        onSuggestionAddressItemSelected: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");

            if (!oSelectedItem) {
                return;
            }

            console.log("CustomerID:", oSelectedItem.getKey());
            console.log("Address:",oSelectedItem.getText());

        },


        // Navigate to customer details
        onCustomerPress: function (oEvent) {

            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();
            var oCustomer = oContext.getObject();

            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteCustomerDetails", {
                    customerId: oCustomer.CustomerID
                });
        }

    });
});