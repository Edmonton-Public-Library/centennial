;
define(['epl', 'epl/Settings', 'lib/csc/Error', 'lib/knockout', 'epl/Environment', 'epl/map/StoryPin'], function (epl, Settings, Error, ko, Environment, StoryPin) {

return (function () {

	/**
	 * This is the class object. Put private things in here.
	 */
	var Branch = function (viewport, url) {
	  this.videoIcon = "\<img src=\"/static/Video.png\" width=\"60\" alt=\"Click to view Videos\"\>"; 
	//more coming
	  this.object = new Array(); 
	  this.displayed = new Array();
	  this.width = 888;
          this.height = 800;
	  this.setBackground(url)
	  var elementSize = 292;
	  var spaceWidth = (this.width -elementSize*3)/4;
	  var spaceHeight = (this.height-elementSize*2)/3
	  $('#video').css('background-image', 'url(\'/static/images/video_icon_disabled.png\')').css('width', elementSize + 'px').css('height', elementSize + 'px').css('position', 'fixed').css('top', spaceHeight + 'px').css('left', spaceWidth + 'px');  
	$('#audio').css('background-image', 'url(\'/static/images/audio_icon_disabled.png\')').css('width', elementSize + 'px').css('height', elementSize + 'px').css('position', 'fixed').css('top', spaceHeight + 'px').css('left', spaceWidth*2+elementSize + 'px');

	$('#image').css('background-image', 'url(\'/static/images/image_icon_disabled.png\')').css('width', elementSize + 'px').css('height', elementSize + 'px').css('position', 'fixed').css('top', spaceHeight + 'px').css('left', spaceWidth*3+elementSize*2 + 'px');

	$('#text').css('background-image', 'url(\'/static/images/text_icon_disabled.png\')').css('width', elementSize + 'px').css('height', elementSize + 'px').css('position', 'fixed').css('top', spaceHeight*2+elementSize + 'px').css('left', spaceWidth + 'px');

	$('#link').css('background-image', 'url(\'/static/images/link_icon_disabled.png\')').css('width', elementSize + 'px').css('height', elementSize + 'px').css('position', 'fixed').css('top', spaceHeight*2+elementSize + 'px').css('left', spaceWidth*2+elementSize + 'px');

	$('#pdf').css('background-image', 'url(\'/static/images/pdf_icon_disabled.png\')').css('width', elementSize + 'px').css('height', elementSize + 'px').css('position', 'fixed').css('top', spaceHeight*2+elementSize + 'px').css('left', spaceWidth*3+elementSize*2 + 'px');	  

	};

	/**
	 * Make instance methods like this
	 */
	Branch.prototype.setBackground = function (floorPlan) {
	$('#BranchView').css('background-image', 'url(\'' + floorPlan + '\')');
	$('#BranchView').css('position', 'reletive').css('width', this.width + 'px').css('height', this.height + 'px')
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
	console.log("Video " + count); 
	if(count ==0) {
	  $('#video').css('background-image', 'url(\'/static/images/video_icon_disabled.png\')') 
	}
	if(count ==1) {
	  $('#video').css('background-image', 'url(\'/static/images/video_icon.png\')')
          $('#video').css("visibility", "visible")
          var index = this.find("video"); 
          $('#video').html(this.object[index].title)
        }
	if(count >=2) {
	    $('#video').css('background-image', 'url(\'/static/images/video_icon_stacked.png\')')
	    $('#video').css("visibility", "visible")
	    $('#video').html("Video " + count) 
	}
	count = this.count("audio") 
	if(count ==0) {  
 	  $('#audio').css('background-image', 'url(\'/static/images/audio_icon_disabled.png\')')
	}
        if(count ==1) {
$('#audio').css('background-image', 'url(\'/static/images/audio_icon.png\')')
          $('#audio').css("visibility", "visible")
          var index = this.find("audio");
          $('#audio').html(this.object[index].title)
        }	
	if (count >=2) {
	  $('#audio').css('background-image', 'url(\'/static/images/audio_icon_stacked.png\')')
          $('#audio').css("visibility", "visible")
          $('#audio').html("Audio " + count) 
	}
	
	count = this.count("image");
	if(count ==0) {
          $('#image').css('background-image', 'url(\'/static/images/image_icon_disabled.png\')')
	}
        if(count ==1) {
	  $('#image').css('background-image', 'url(\'/static/images/image_icon.png\')')
          $('#image').css("visibility", "visible")
          var index = this.find("image");
          $('#image').html(this.object[index].title)
        }        
	if(count >=2) {
	  $('#image').css('background-image', 'url(\'/static/images/image_icon_stacked.png\')')
          $('#image').css("visibility", "visible")
          $('#image').html("Image " + count) 
        }
	count = this.count("text")
        if(count ==0) {
          $('#text').css('background-image', 'url(\'/static/images/text_icon_disabled.png\')')
	}
        if(count ==1) {
	  $('#text').css('background-image', 'url(\'/static/images/text_icon.png\')')
          $('#text').css("visibility", "visible")
          var index = this.find("text");
          $('#text').html(this.object[index].title)
        }
        if(count >=2) {
	  $('#text').css('background-image', 'url(\'/static/images/text_icon_stacked.png\')')
          $('#text').css("visibility", "visible")
          $('#text').html("Text " + count) 
        }	
	count = this.count("link")
        if(count ==0) {
          $('#link').css('background-image', 'url(\'/static/images/link_icon_disabled.png\')')
	}
        if(count ==1) {
	  $('#link').css('background-image', 'url(\'/static/images/link_icon.png\')')
          $('#link').css("visibility", "visible")
          var index = this.find("link");
          $('#link').html(this.object[index].title)
        }
        if(count >= 2) {
          $('#link').css('background-image', 'url(\'/static/images/link_icon_stacked.png\')')
	  $('#link').css("visibility", "visible")
          $('#link').html("Link" + count) 
        }
	count = this.count("pdf")
	console.log("count pdf " + count); 
        if(count ==0) {
          $('#pdf').css('background-image', 'url(\'/static/images/pdf_icon_disabled.png\')')
	}
        if(count ==1) {
	  $('#pdf').css('background-image', 'url(\'/static/images/pdf_icon.png\')')
          $('#pdf').css("visibility", "visible")
          var index = this.find("pdf");
          $('#pdf').html(this.object[index].title)
        }
        if(count >=2) {
	  $('#pdf').css('background-image', 'url(\'/static/images/pdf_icon_stacked.png\')')
          $('#pdf').css("visibility", "visible")
          $('#pdf').html("PDF " + count) 
        }
	};

	Branch.prototype.find = function(value) { 
	for(var i =0; i<this.object.length; i++) { 
	  if(this.object[i].type == value) { 
	    return i; 
	    }
	  }
	}

	Branch.prototype.count = function(value) { 
	var count = 0;
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
