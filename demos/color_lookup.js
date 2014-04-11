/* global $,console,document,behanceAPI,window */
var behancekey = "replace";
var imgDom;
var resultsDom;

$(document).ready(function() {
	
	//Set my key
	behanceAPI.setKey(behancekey);
	
	imgDom = $("#droppedImage");
	resultsDom = $("#results");
	
	$(document).on("drop", dropHandler);
	$(document).on("dragover", dragOverHandler);

});

//I simply validate the type
function validFile(s) {
	if(s.match("image/*")) return true;
	return false;
}

function dragOverHandler(e) {
	e.preventDefault();
}

function dropHandler(e) {
	e.stopPropagation();
	e.preventDefault();
	 
	if(!e.originalEvent.dataTransfer.files) return;
	var files = e.originalEvent.dataTransfer.files;
	var count = files.length;
	if(!count) return;
	 
	//Only one file allowed
	if(count > 1) {
		window.alert("You may only drop one file.");
		return;
	}

	var file = files[0];
	
	if(!validFile(file.type)) {
		window.alert("You must drop an image.");
		return;
	}
	
	var reader = new window.FileReader();
	reader.onload = function (e) {
		imgDom.attr("src",e.target.result);
		imgDom.on("load", function(e) {
			doColor();
		});
	};
	reader.readAsDataURL(file);

}

function doColor() {
	var imageResults = [];
	
	console.log("do color");	
	var colorThief = new ColorThief();
	//dominantColor = getDominantColor(imgDom);
	var dom = colorThief.getColor(imgDom[0]);

	var rgb = dom[0].toString(16) + dom[1].toString(16) + dom[2].toString(16);
	
	resultsDom.html("<i>Searching Behance for stuff like this - prepare for teh awesome...</i>");
	
	//Ok, now search by color
	behanceAPI.getProjectsByColor(rgb, function(p) {
		console.log("back from the api");
		//gather up the biggest images possible (nah, just check 2 biggest
		for(var i=0;i<p.length;i++) {
			if(p[i].covers[404]) {
				imageResults.push(p[i].covers[404]);	
			} else if(p[i].covers[230]) {
				imageResults.push(p[i].covers[230]);				
			}
		}

		var html = "";
		for(var i=0;i<imageResults.length;i++) {
			html += "<img src='" + imageResults[i] + "'><br/>";
		}
		resultsDom.html(html);
	});
	
}