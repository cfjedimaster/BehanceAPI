/* global $,console,document,behanceAPI */
var behancekey = "replace";

$(document).ready(function() {
	
	//Set my key
	behanceAPI.setKey(behancekey);
	
	//Now get my projects
	behanceAPI.getProjectsForUser("gwilson", function(p) {

		//Manually draw them out	
		console.dir(p);
		var s = "";
		for(var i=0; i<p.length; i++) {
			var proj = p[i];
			s += "<h2>" + proj.name + "</h2>";
			s += "<p>";
			s += "<a href='" + proj.url + "'><img src='" + proj.covers[404] + "'></a>";
			s += "</p>";
		}
		$("#projects").html(s);
	});

});