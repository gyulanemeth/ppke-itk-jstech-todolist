requirejs.config({
    baseUrl:	".",
    paths: {
        "jquery":		"lib/jquery-1.9.1",
        "ko":			"lib/knockout-2.2.1.debug",
        "sammy":		"lib/sammy",
        "trafficCop":	"lib/TrafficCop",
        "infuser":		"lib/infuser-amd",
        "koExternal":	"lib/koExternalTemplateEngine-amd",
        "bootstrap":	"lib/bootstrap/js/bootstrap",
        "bootbox":		"lib/bootbox"
    },
    shim: {
    	"bootbox": {
    		deps: ["bootstrap"]
    	}
    }
});
require(["jquery", "ko"], function($, ko) {
	require(["infuser", "koExternal", "viewModels/SinglePageAppVM"], function (infuser, koExt, singlePageAppVM) {
		infuser.defaults.templateUrl = "templates";
		$(document).ready (function () {
			ko.applyBindings (singlePageAppVM());
		});
	});
});