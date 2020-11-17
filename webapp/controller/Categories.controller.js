sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sofigate.products.Products.controller.Categories", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sofigate.products.Products.view.Categories
		 */
		onInit: function () {

		},
		viewMaterials:function(e){
				var cName=  e.getSource().getBindingContext('CAT').getObject().CategoryID;
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo('Products',{"CategoryName":cName});
				
				
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sofigate.products.Products.view.Categories
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sofigate.products.Products.view.Categories
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sofigate.products.Products.view.Categories
		 */
		//	onExit: function() {
		//
		//	}

	});

});