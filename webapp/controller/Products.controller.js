sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sofigate/products/Products/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, formatter,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("com.sofigate.products.Products.controller.Products", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sofigate.products.Products.view.Products
		 */
		formatter: formatter,
		onInit: function () {
			// get router			
			var oRouter = this.getOwnerComponent().getRouter();
			// get route for current page by Route name from manifest.json - taskDetail
			var oRoute = oRouter.getRoute('Products');
			if (oRoute !== undefined) {
				//attach function similar to PBO
				oRoute.attachPatternMatched(jQuery.proxy(this._onRouteMatched), this);
			}
		},
		backToCat:function(){
			this.backtoPrd();
			window.history.go(-1);
		},
		onSearchProduct: function (e) {
			// var query=e.getParameter('value');
			// var oList = this.oView.byId("listProducts");
			// var oBinding = oList.getBinding("items");
			// var oFilter=[new Filter('',FilterOperator.Contains,query)]
		},
		navToProductSuppiers:function(e){
			debugger;
			var obj=e.getSource().getBindingContext().getObject();
			this.oView.getModel('PRD').setData(obj);
			this.oView.byId('navCon').to(this.oView.byId('navCon').getPages()[1]);
		},
		backtoPrd:function(e){
			this.oView.byId('navCon').back();
		},
		_onRouteMatched: function (e) {
			// take the parameter called arguements in which you can find the inputs to the page oArgs['TaskId']
			var oArgs = e.getParameter("arguments");
			this.oView = this.getView();

			// attach current View to the new context of the path
			//var path=
			this.oView.bindElement({
				path: '/Categories(' + oArgs.CategoryName + ')',
				events: {
					//change: this._onBindingChange.bind(this), //to route to not found view
					dataRequested: jQuery.proxy(function (oEvent) {
						this.oView.setBusy(true);
					}, this),
					dataReceived: jQuery.proxy(function (oEvent) {
						this.oView.setBusy(false);
					}, this)
				}
			});

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sofigate.products.Products.view.Products
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sofigate.products.Products.view.Products
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sofigate.products.Products.view.Products
		 */
		//	onExit: function() {
		//
		//	}

	});

});