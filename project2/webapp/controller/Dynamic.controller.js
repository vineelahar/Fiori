sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, MessageToast) {

    "use strict";

    return Controller.extend("project2.controller.Dynamic", {

        onInit: function () {

            var oData = {

                Products: [

                    {
                        ProductName: "Flat XL",
                        ProductId: "HT-1040",
                        Quantity: 10,
                        Status: "Available",
                        Price: 5000,
                        Supplier: "HP",
                        Available: true,
                        Category: "Electronics",
                        DeliveryDate: "30-09-2026",
                        Image: "https://latam.tscprinters.com/sites/latam.tscprinters.com/files/styles/product_slider/public/2021-03/alpha-3r.png?itok=oG9nGE-B"
                    },

                    {
                        ProductName: "Laser Professional",
                        ProductId: "HT-1041",
                        Quantity: 20,
                        Status: "Available",
                        Price: 350,
                        Supplier: "Oxynum",
                        Available: true,
                        Category: "Grocery",
                        DeliveryDate: "02-10-2026",
                        Image: "https://www.datecs.ro/assets/img/o/media/produse/alpha-300/imprimanta-etichete-datecs-alpha-300dpi-1.1727984117.jpg"
                    },

                    {
                        ProductName: "Laser Basic",
                        ProductId: "HT-1042",
                        Quantity: 5,
                        Status: "Low Stock",
                        Price: 50,
                        Supplier: "Local Supplier",
                        Available: true,
                        Category: "Printer for All",
                        DeliveryDate: "05-10-2026",
                        Image: "https://usca.tscprinters.com/sites/usca.tscprinters.com/files/styles/large/public/2022-06/alpha-30r_front_500x500px.jpeg?itok=mEu1_U7r"
                    },

                    {
                        ProductName: "Laser Allround",
                        ProductId: "HT-1043",
                        Quantity: 0,
                        Status: "Out of Stock",
                        Price: 150,
                        Supplier: "Fortune",
                        Available: false,
                        Category: "Technocom",
                        DeliveryDate: "07-10-2026",
                        Image: "https://usca.tscprinters.com/sites/usca.tscprinters.com/files/styles/large/public/2022-06/alpha-30r_front_500x500px.jpeg?itok=mEu1_U7r"
                    }

                ]

            };

            var oModel = new JSONModel(oData);

            this.getView().setModel(oModel);

        },
        // onGenericTagPress:function(oEvent){
           
        //     MessageToast.show("Clicked")

        // },
        onGenericTagPress: function (oEvent) {

            var oView = this.getView();

            if (!this._oPopover) {

                this._oPopover = sap.ui.xmlfragment(
                    oView.getId(),
                    "project2.view.Popover",
                    this
                );

                oView.addDependent(this._oPopover);
            }

            this._oPopover.openBy(oEvent.getSource());
        },
        onImagePress: function (oEvent) {

            var oImage = oEvent.getSource();

            var sImage = oImage.getSrc();

            console.log("Clicked image:", sImage);

            window.open(sImage, "_blank");
        },
        
        onShowImage: function (oEvent) {
            var oButton = oEvent.getSource();
            var sImage = oButton.getIcon();
            console.log("Clicked image:",sImage);
            window.open(sImage,"_blank")
            // MessageToast.show("BUTTON CLICKED");
            // console.log("BUTTON CLICKED");
        },
        onDetailsPress:function(oEvent){
            var ocontext = oEvent.getSource().getBindingContext();
            var sProductId = ocontext.getProperty("ProductId")
            MessageToast.show("Details for product with id " + sProductId)
        }

    });

});