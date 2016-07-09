'use strict';

(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      templateUrl: 'templates/appComponent.tpl.html'
    })
    .Class({
      constructor: testFunction
    });

    function testFunction(){
    	return {test : "world"}
    }



})(window.app || (window.app = {}));