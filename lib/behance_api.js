/* global console,$ */
var behanceAPI = function() {
	var key;
	var baseURL = "http://www.behance.net/v2/";
	
	function _toDateStr(d) {
		return new Date(d*1000).toString();	
	}
	
	function _renderTemplate(p, template) {
		var result = template;
		//console.dir(p);
		result = result.replace(/{{id}}/gi, p.id);
		result = result.replace(/{{name}}/gi, p.name);
		result = result.replace(/{{url}}/gi, p.url);
		if(p.covers[115]) result = result.replace(/{{covers_115}}/gi, p.covers[115]);
		if(p.covers[202]) result = result.replace(/{{covers_202}}/gi, p.covers[202]);
		if(p.covers[230]) result = result.replace(/{{covers_230}}/gi, p.covers[230]);
		if(p.covers[404]) result = result.replace(/{{covers_404}}/gi, p.covers[404]);
		
		var created = _toDateStr(p.created_on);
		result = result.replace(/{{created}}/gi, created);

		var modified = _toDateStr(p.modified_on);
		result = result.replace(/{{modified}}/gi, modified);

		result = result.replace(/{{fields}}/gi, p.fields.join(", "));

		result = result.replace(/{{appreciations}}/gi, p.stats.appreciations);
		result = result.replace(/{{comments}}/gi, p.stats.comments);
		result = result.replace(/{{views}}/gi, p.stats.views);
		
		return result;
	}
	
	function setKey(k) {
		key = k;	
	}
	
	function getProject(id, cb) {
		var url = baseURL + "projects/" + id +"?api_key=" + key;
		$.get(url, {}, function(res, code) {
			cb(res.project);
		}, "JSONP");
		
	}
	
	function getProjectsByColor(color, cb) {
		var url = baseURL + "projects/?api_key=" + key + "&color_hex=" + escape(color) + "&callback=";
		$.get(url, {}, function(res, code) {
			cb(res.projects);
		}, "JSONP");
		
	}
	
	function getProjectsForUser(user, cb) {
		var url = baseURL + "users/" + user + "/projects?api_key=" + key + "&callback=";
		$.get(url, {}, function(res, code) {
			cb(res.projects);
		}, "JSONP");
	}
	
	function renderProjects(user, displayId, templateId) {
		var templateOb = $("#" + templateId);
		var renderDom = $("#" + displayId);
		
		if(templateOb.length === 0 || renderDom.length === 0) {
			//Throw an error?
			return;
		}

		var template = $.trim(templateOb.html());
		getProjectsForUser(user, function(p) {
			var s = "";
			for(var i=0; i<p.length; i++) {
				s += _renderTemplate(p[i], template);	
			}
			renderDom.html(s);
		});
	}
	
	return {
		setKey: setKey,
		getProject: getProject,
		getProjectsByColor: getProjectsByColor,
		getProjectsForUser: getProjectsForUser,
		renderProjects: renderProjects
	};
	
}();