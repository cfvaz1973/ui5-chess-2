/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ui5futureview/ui5-chess-2/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
