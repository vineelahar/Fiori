
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.Pagnation", {

        onInit: function () {
            this.iPageSize = 1000;
            this.iSkip = 0;

            this.getView().setModel(new JSONModel({
                    currentPage:1,
                    hasPrevious: false,
                    hasNext: true
                }),
                "pagination"
            );

            this.getView().setModel(
                new JSONModel({ results: [] }),
                "pageData"
            );

            this.loadPage();
        },

        loadPage: function () {
            var oModel = this.getOwnerComponent()
                .getModel("ZAK_SO_SRV");

            var oTable = this.byId("salesorderSet");
                    oTable.setBusy(true);

            oModel.read("/salesorderSet", {
                urlParameters: {
                    "$top": String(this.iPageSize),
                    "$skip": String(this.iSkip)
                },

                success: function (oData) {
                    this.getView().getModel("pageData")
                        .setProperty("/results", oData.results);
                    
                    

                    var oPagination =
                        this.getView().getModel("pagination");

                    oPagination.setProperty(
                        "/hasPrevious",
                        this.iSkip > 0
                    );

                    oPagination.setProperty(
                        "/hasNext",
                        oData.results.length === this.iPageSize
                    );
                    oTable.setBusy(false);
                }.bind(this),

                error: function (oError) {
                    console.error(" failed to load records:", oError);
                    oTable.setBusy(false);
                }.bind(this)
            });
        },

        onNext: function () {
            var oPagination =
                this.getView().getModel("pagination");

            if (oPagination.getProperty("/hasNext")) {
                this.iSkip += this.iPageSize;
                
                oPagination.setProperty("/currentPage",
                    this.iSkip/this.iPageSize+1
                );
                this.loadPage();
            }
        },

        
        onPrevious: function () {
            if (this.iSkip >= this.iPageSize) {
                this.iSkip -= this.iPageSize;

                var oPagination =
                    this.getView().getModel("pagination");

                oPagination.setProperty(
                    "/currentPage",
                    this.iSkip / this.iPageSize + 1
                );

                this.loadPage();
            }
        }


    });
});
