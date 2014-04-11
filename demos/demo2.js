/* global $,console,document,behanceAPI */
var behancekey = "replace";

$(document).ready(function() {
	
	//Set my key
	behanceAPI.setKey(behancekey);
	
	//Now get my projects
	behanceAPI.renderProjects("gwilson", "projects", "projectTemplate");

	//cache for projects
	var projects = {};
	$("body").on("mouseenter", "div.project", function(e) {
		var pid = $(this).data("projectid");
		var that = this;
		if(projects[pid]) return;
		behanceAPI.getProject(pid, function(p) {
			console.dir(p);
			projects[pid] = p;
			$(that).attr("title", p.description);
		});
		console.log(pid);
	});

});