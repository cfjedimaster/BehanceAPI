Behance API
===

This is a simple JavaScript wrapper for the Behance API. To use this, you will need to register with Behance to get your own key.

Features
---

`getProject(x)` : Retrieve project details.

`getProjectsByColor(color, cb)` : Search for projects by color. `color` is the color value and `cb` is your callback.

`getProjectsForUser(user, cb)` : Search for projects by user. `user` is the color value and `cb` is your callback.

`renderProjects(user, displayId, templateId)` : Allows you to build a template DOM to dynamically render projects for a particular user. Create a div with a particular ID (`displayId`) that will store the rendered projects. Then create a template (and use the id specified by `templateId`) and place tokens for each dynamic aspect of the project you want to render. Tokens are surrounded by {{ and }}. Valid project tokens are:

  * id
  * name
  * url
  * covers_115
  * covers_202
  * covers_404
  * created
  * modified
  * fields
  * appreciations
  * comments (the number of comments)
  * views


History
---

4/11/2014 Initial GitHub Release