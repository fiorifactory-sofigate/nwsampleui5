sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sofigate/products/Products/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/vk/ContentResource"
], function (Controller, formatter, Filter, FilterOperator, ContentResource) {
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
		backToCat: function () {
			this.backtoPrd();
			window.history.go(-1);
		},
		onSearchProduct: function (e) {
			var query = e.getParameter('query');
			var oList = this.oView.byId("listProducts");
			var oBinding = oList.getBinding("items");
			var oFilters = []; //oBinding.getFilters();
			debugger;
			if (query !== null && query !== undefined && query !== '') {
				oFilters.push(new Filter('CategoryID', FilterOperator.EQ, this.categoryID));
				oFilters.push(new Filter('ProductName', FilterOperator.Contains, query));
			} else {
				oFilters.push(new Filter('CategoryID', FilterOperator.EQ, this.categoryID))
			}
			oBinding.filter(oFilters);

		},
		navToProductSuppiers: function (e) {
			var obj = e.getSource().getBindingContext().getObject();
			this.oView.getModel('PRD').setData(obj);
			this.oView.byId('navCon').to(this.oView.byId('navCon').getPages()[1]);
			var url= this.oView.getModel('IMG').getProperty('/' + this.oView.getModel('PRD').getProperty('/ProductID')); 
			var prd=this.oView.getModel('PRD').getProperty('/ProductID');
			this.loadModelIntoViewer(
				this.oView.byId('viewer'), url.toString(), prd===13||prd===16?"VDS":"JPG", false);
			this.oView.getModel().read(e.getSource().getBindingContext().getPath() + '/Supplier', {
				success: jQuery.proxy(function (a, b) {
					this.oView.getModel('SUP').setData(a);
				}, this),

				error: jQuery.proxy(function (e) {

				}, this)

			});

		},
		backtoPrd: function (e) {
			this.oView.byId('navCon').back();
		},
		loadURL: function (e) {
			var url = 'https://sapui5.hana.ondemand.com/test-resources/sap/ui/vk/demokit/tutorial/VIT/06/src/models/cooper.vds';
			var viewer = this.oView.byId('viewer');
			this.loadModelIntoViewer(viewer, url, "jpg", true);

		},
		loadModelIntoViewer: function (viewer, remoteUrl, sourceType, localFile) {
			// what is currently loaded in the view is destroyed
			viewer.destroyContentResources();

			var source = remoteUrl || localFile;

			if (source) {
				// content of viewer is replaced with new data
				var contentResource = new ContentResource({
					source: source,
					sourceType: sourceType,
					sourceId: "abc"
				});

				// content: chosen path. content added to the view
				viewer.addContentResource(contentResource);
			}
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
			var listProducts = this.oView.byId('listProducts');
			var oBinding = listProducts.getBinding('items');
			this.categoryID = oArgs.CategoryName;
			if (oArgs.CategoryName !== undefined && oArgs.CategoryName !== '' && oArgs.CategoryName !== null) {
				var oFilter = [new Filter('CategoryID', FilterOperator.EQ, oArgs.CategoryName)];
				oBinding.filter(oFilter);
			} else {
				this.backToCat();
			}
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