// <!-- <mvc:View
    controllerName="project1.controller.SalesOrderItems"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    // xmlns:form="sap.ui.layout.form">

    // <Page
    //     id="salesorderItems"
    //     title="Sales Order Details">
    //     <content>

    //         <Table
    //             id="SalesOrderItems"
    //             mode="MultiSelect"
    //             items="{API_SALES_ORDER_SRV>/A_SalesOrderItem}"
    //             >

    //             <columns>
    //                 <Column>
    //                     <Text text="Material"/>
    //                 </Column>

    //                 <Column>
    //                     <Text text="Quantity"/>
    //                 </Column>

    //                 <Column>
    //                     <Text text="Unit"/>
    //                 </Column>


    //                 <Column>
    //                     <Text text="Plant"/>
    //                 </Column>

    //                 <Column>
    //                     <Text text="Storage Location"/>
    //                 </Column>

    //             </columns>

    //             <items>
    //                 <ColumnListItem >
    //                     <cells>
    //                         <Text text="{API_SALES_ORDER_SRV>Material}"/>
    //                         <!-- <Input value="{API_SALES_ORDER_SRV>Material}" /> -->
    //                         <!-- <Text text="{API_SALES_ORDER_SRV>RequestedQuantity}"/> -->
    //                         <Input value="{API_SALES_ORDER_SRV>RequestedQuantity}" editable="{ui>/isEditMode}"/>
    //                         <Text text="{API_SALES_ORDER_SRV>RequestedQuantityUnit}"/>
    //                         <Text text="{API_SALES_ORDER_SRV>ProductionPlant}"/>
    //                         <Text text="{API_SALES_ORDER_SRV>StorageLocation}"/>
                        
    //                     </cells>
    //                 </ColumnListItem>
    //             </items>
    //         </Table>


    //     </content>

    // </Page>

// </mvc:View> -->



sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project1.controller.SalesOrder", {
        
        onInit: function () {
            var oModel = this.getOwnerComponent().getModel("API_SALES_ORDER_SRV");
            this.getView().setModel(oModel, "salesOrderModel");

            var oUIModel = new sap.ui.model.json.JSONModel({
                isEditMode:false
            });
            this.getView().setModel(oUIModel,"ui");
        },

        onSalesOrderPress: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("API_SALES_ORDER_SRV");
            var sSalesOrder = oContext.getProperty("SalesOrder");

            this.getOwnerComponent().getRouter().navTo(
                "SalesOrderItems",
                {
                    SalesOrder: sSalesOrder
                }
            );
        },

        // Combined Create Operation using Deep Insert
        
        onOpenCreateHeader: function () {
            var oModel = this.getView().getModel("API_SALES_ORDER_SRV");

            var oPayload = {
                SalesOrderType: "OR",
                SalesOrganization: "1710",
                DistributionChannel: "10",
                OrganizationDivision: "00",
                SoldToParty: "USCU_L10",
                PurchaseOrderByCustomer: "PO-1001",

                to_Item: [
                    {
                        SalesOrderItem: "10",
                        Material: "TG11",
                        RequestedQuantity: "2",
                        RequestedQuantityUnit: "PC"
                    }
                ]
            };

            oModel.create("/A_SalesOrder", oPayload, {
                success: function (oData) {
                    sap.m.MessageToast.show(
                        "Sales Order " + oData.SalesOrder + " created successfully"
                    );

                    console.log("Created Sales Order:", oData.SalesOrder);
                    oModel.refresh(true);
                },

                error: function (oError) {
                    console.error("Creation failed:", oError.responseText);
                    sap.m.MessageBox.error("Sales Order creation failed");
                }
            });
        },
        onEdit: function () {
            this.getView().getModel("ui").setProperty("/isEditMode", true);
        },

        onCancel: function () {
            var oModel = this.getView().getModel("API_SALES_ORDER_SRV");

            oModel.resetChanges();
            this.getView().getModel("ui").setProperty("/isEditMode", false);
        },

        onSave: function () {
            var oModel = this.getView().getModel("API_SALES_ORDER_SRV");
            var oUIModel = this.getView().getModel("ui");

            if (!oModel.hasPendingChanges()) {
                sap.m.MessageToast.show("No changes to save");
                return;
            }

            oModel.submitChanges({
                success: function () {
                    sap.m.MessageToast.show("Changes saved successfully");
                    oUIModel.setProperty("/isEditMode", false);
                    oModel.refresh(true);
                },
                error: function () {
                    sap.m.MessageToast.show("Failed to save changes");
                }
            });
        }
    });
});





// <mvc:View
//     controllerName="project1.controller.SalesOrder"
//     xmlns:mvc="sap.ui.core.mvc"
//     xmlns="sap.m"
//     xmlns:f="sap.f">

//     <f:DynamicPage
//         id="salesorderpage"
//         headerExpanded="true"
//         toggleHeaderOnTitleClick="false">

//         <!-- Dynamic Page Title -->
//         <f:title>
//             <f:DynamicPageTitle>

//                 <f:heading>
//                     <Title text="Sales Order Details"/>
//                 </f:heading>

//                 <f:actions>
//                     <Button
//                         text="Create"
//                         icon="sap-icon://add"
//                         type="Emphasized"
//                         press=".onOpenCreateHeader"/>

                
//                     <Button text="Edit"
//                         press=".onEdit"
//                         visible="{= !${ui>/isEditMode} }"/>

//                     <Button text="Save"
//                         press=".onSave"
//                         visible="{ui>/isEditMode}"/>

//                         <Button text="Cancel"
//                          press=".onCancel"
//                          visible="{ui>/isEditMode}"/>
                

//                     <Button
//                         text="Delete"
//                         icon="sap-icon://delete"
//                         press=".onDeleteHeader"/>

//                     <!-- <Button
//                         text="Refresh"
//                         icon="sap-icon://refresh"
//                         press=".onRefreshHeader"/> -->
//                 </f:actions>

//             </f:DynamicPageTitle>
//         </f:title>

//         <!-- Dynamic Page Header -->
//         <f:header>
//             <f:DynamicPageHeader>
//                 <Text text="Manage your Sales Order Header records."/>
//             </f:DynamicPageHeader>
//         </f:header>

//         <!-- Main Content -->
//         <f:content>

//             <Table
//                 id="SalesOrderHeader"
//                 mode="MultiSelect"
//                 items="{API_SALES_ORDER_SRV>/A_SalesOrder}">

//                 <columns>
//                     <Column>
//                         <Text text="Sales Order"/>
//                     </Column>

//                     <Column>
//                         <Text text="Order Type"/>
//                     </Column>

//                     <Column>
//                         <Text text="Sales Organization"/>
//                     </Column>

//                     <Column>
//                         <Text text="Distribution Channel"/>
//                     </Column>

//                     <Column>
//                         <Text text="Division"/>
//                     </Column>

//                     <Column>
//                         <Text text="Sold To Party"/>
//                     </Column>

//                     <Column>
//                         <Text text="Delivery Date"/>
//                     </Column>
//                 </columns>

//                 <items>
//                     <ColumnListItem
//                         type="Active"
//                         press=".onSalesOrderPress">

//                         <cells>
//                             <Text text="{API_SALES_ORDER_SRV>SalesOrder}"/>
//                             <!-- <Text text="{API_SALES_ORDER_SRV>SalesOrderType}"/> -->
//                             <Input value="{API_SALES_ORDER_SRV>SalesOrderType}" editable="{ui>/isEditMode}" />
//                             <!-- <Text text="{API_SALES_ORDER_SRV>SalesOrganization}"/> -->
//                             <Input value="{API_SALES_ORDER_SRV>SalesOrganization}" editable="{ui>/isEditMode}"/>
//                             <Text text="{API_SALES_ORDER_SRV>DistributionChannel}"/>
//                             <Text text="{API_SALES_ORDER_SRV>OrganizationDivision}"/>
//                             <Text text="{API_SALES_ORDER_SRV>SoldToParty}"/>
//                             <Text text="{API_SALES_ORDER_SRV>RequestedDeliveryDate}"/>
//                         </cells>

//                     </ColumnListItem>
//                 </items>

//             </Table>

//         </f:content>

//     </f:DynamicPage>

// </mvc:View>

