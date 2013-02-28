;
define(['epl', 'epl/Settings', 'lib/csc/Error', 'lib/knockout', 'epl/Environment', 'epl/map/StoryPin'], function (epl, Settings, Error, ko, Environment, StoryPin) {

return (function () {

	/**
	 * This is the class object. Put private things in here.
	 */
	var Branch = function (viewport, url) {
	  this.object = new Array(); 
	  this.displayed = new Array();
	  this.setBackground(url)  
	};

	/**
	 * Make instance methods like this
	 */
	Branch.prototype.setBackground = function (floorPlan) {
	$('#BranchView').css('background-image', 'url(\'' + floorPlan + '\')');
	$('#BranchView').css('width', '444px').css('height', '328px')
	$('#video').html("JS Test")
	};
	Branch.prototype.showPin = function (pin) { 
	 for (var i = 0; i<this.object.length; i++) { 
           if(this.object[i].id == pin.id) {
	     if(this.displayed[i] == "false") {
	       this.displayed[i] = "true"
	       this.update();
	       return; 
	       }
	    }
	} 
	this.object[this.object.length] = pin
	this.displayed[this.displayed.length] = "true" 
	console.log(this.object.length); 
	this.update();
	};
	Branch.prototype.hidePin = function (pin) { 
	// hide the given element
	for (var i = 0; i<this.object.length;i++) {
	  if(this.object[i].id == pin.id) { 
	    if(displayed[i] == "true") { 
	      displayed[i] = "false"; 
	      this.update() 
	    }
	  }
	}
	}; 
	Branch.prototype.update = function () {
	var count = this.count("video") 
	console.log(count); 
	if(count ==0) { 
	  $('#video').css("visibility", "hidden")
	}
	else {
	  $('#video').css("visibility", "visible")
	  $('#video').html(count) 
	}
	count = this.count("audio") 
        if(count ==0) {
          $('#audio').css("visibility", "hidden")
        }
        else {
          $('#audio').css("visibility", "visible")
          $('#audio').html(count) 
        }
	count = this.count("image")
	if(count ==0) {
          $('#image').css("visibility", "hidden")
        }
        else {
          $('#image').css("visibility", "visible")
          $('#image').html(count) 
        }
	count = this.count("text")
        if(count ==0) {
          $('#text').css("visibility", "hidden")
        }
        else {
          $('#text').css("visibility", "visible")
          $('#text').html(count) 
        }	
	count = this.count("link")
        if(count ==0) {
          $('#link').css("visibility", "hidden")
        }
        else {
          $('#link').css("visibility", "visible")
          $('#link').html(count) 
        }
	count = this.count("pdf")
        if(count ==0) {
          $('#pdf').css("visibility", "hidden")
        }
        else {
          $('#pdf').css("visibility", "visible")
          $('#pdf').html(count) 
        }
	};
	Branch.prototype.count = function(value) { 
	var count = 0;
	console.log(this.object[0].type);  
	for(var i = 0; i<this.object.length; i++) {
	  if((this.object[i].type == value) && (this.displayed[i]=="true")) {
	    count++; 
	  }
	}
	return count; 
	};
	return Branch;

})();

//End module
});
