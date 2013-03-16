;
define(function () {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	//TODO: Need to keep these paths in either Settings **OR** Environment. Not both.
	siteUrl : 'http://localhost:8000',
	apiBranchUrl : '/api/v1/branch/',
	apiStoryUrl : '/api/v1/story/',
	apiAccountUrl : '/account/',
	viewDirectory : function () { return '/static/views'; },
	imageDirectory : '/static/images',

	//API Keys
	apiKeys : {
		google : {
			maps : 'AIzaSyA59Z_Kym_voRl--cHJzYkep3Cs-_71'
		},
		facebook : {
			connect : '150662938425048'
		}
	},
};

//End module
});
