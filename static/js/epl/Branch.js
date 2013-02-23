;
define(['epl', 'epl/Settings', 'lib/csc/Error', 'lib/knockout', 'epl/Environment'], function (epl, Settings, Error, ko, Environment) {

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
	console.log("Testhere"); 
	$('#BranchView').css('background-image', 'url(\'' + floorPlan + '\')');
	$('#BranchView').css('width', '444px').css('height', '328px'),
	$('#video').html("JS test") 
	//	this.data.stories(userData);
	//	this.data.image(floorPlan); 
	//update image 
	};
	Branch.prototype.showPin = function (pin) { 
	 for (var i = 0; i<objects.length; i++) { 
           if(this.object[i].id == pin.id) {
	     if(this.displayed[i] == "false") {
	       this.displayed[i] = "true"
	       Branch.update();
	       return; 
	       }
	    }
	} 
	this.object[object.length] = pin
	this.displayed[displayed.length] = "true" 
	Branch.update()
	};
	Branch.prototype.hidePin = function (pin) { 
	// hide the given element
	for (var i = 0; i<this.object.length;i++) {
	  if(this.object[i].id == pin.id) { 
	    if(displayed[i] == "true") { 
	      displayed[i] = "false"; 
	      Branch.update() 
	    }
	  }
	}
	}; 
	/**
	 * Make static methods like this
	 */
	Branch.update = function () {
	var count = Branch.count("video") 
	if(count ==0) { 
	  $('#video').css("visibility", "hidden")
	}
	else {
	  $('#video').css("visibility", "visible") 
	  $('#video').html(count) 
	}
	count = Branch.count("audio") 
        if(count ==0) {
          $('#audio').css("visibility", "hidden")
        }
        else {
          $('#audio').css("visibility", "visible")
          $('#audio').html(count) 
        }
	count = Branch.count("image")
	if(count ==0) {
          $('#image').css("visibility", "hidden")
        }
        else {
          $('#image').css("visibility", "visible")
          $('#image').html(count) 
        }
	count = Branch.count("text")
        if(count ==0) {
          $('#text').css("visibility", "hidden")
        }
        else {
          $('#text').css("visibility", "visible")
          $('#text').html(count) 
        }	
	count = Branch.count("link")
        if(count ==0) {
          $('#link').css("visibility", "hidden")
        }
        else {
          $('#link').css("visibility", "visible")
          $('#link').html(count) 
        }
	count = Branch.count("pdf")
        if(count ==0) {
          $('#pdf').css("visibility", "hidden")
        }
        else {
          $('#pdf').css("visibility", "visible")
          $('#pdf').html(count) 
        }
	};
	Branch.count = function(value) { 
	var count = 0; 
	for(var i = 0; i<this.object.length; i++) {
	  if(this.object[i].type == value && this.displayed[i]=="true") {
	    count++; 
	  }
	}
	return count; 
	};
	return Branch;

})();

//End module
});
