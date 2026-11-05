sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Token"
], (Controller, JSONModel, Token) => {
    "use strict";

    return Controller.extend("project3.controller.Multiinput", {
        onInit : function (){
            var oModel = new JSONModel("model/Products.json")
            this.getView().setModel(oModel);
            console.log(oModel.getData());

            var oMultiInput1 = this.byId("multiInput1");
            oMultiInput1.setTokens([
                new Token({text:"Token 1",key:"01"}),
                new Token({text:"Token 2",key:"02"}),
                new Token({text:"Token 2",key:"03"})
            ])

            var oMultiInput2 = this.byId("multiInput2")
            oMultiInput2.setTokens([
                new Token({text:"very long long long token",key:"LongToken"})
            ])
            var fnValidator = function (args) {

                var sText = args.text;

                if (sText) {
                    return new Token({
                        text: sText,
                        key: sText
                    }); 
                }

                return null;
            };

            this.byId("multiInput1").addValidator(fnValidator);
        }

    });
});