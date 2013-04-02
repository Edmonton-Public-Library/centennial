;
define(function () {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	//TODO: Need to keep these paths in either Settings **OR** Environment. Not both.
	siteUrl : 'http://localhost:8000',
	apiBaseUrl : '/api/v1/',
	apiBranchUrl : '/api/v1/branch/',
	apiStoryUrl : '/api/v1/story/',
	apiAccountUrl : '/account/',
	apiQuestBaseUrl : '/game/complete/',
	apiQuestUrl : '/game/complete/timemap',
	apiCodeUrl : '/game/complete/code',
	apiQuestSetsUrl : '/game/questsets',
	apiQuestsUrl : '/api/v1/quest',
	viewDirectory : function () { return '/static/views'; },
	imageDirectory : '/static/images',
	mediaDirectory : '/media',

	//API Keys
	apiKeys : {
		google : {
			maps : 'AIzaSyA59Z_Kym_voRl--cHJzYkep3Cs-_71'
		},
		facebook : {
			connect : '150662938425048'
		}
	}
};

//End module
});
