;
define(['lib/knockout', 'lib/csc/Utils', 'timemap/Environment', 'lib/epl/Input'], function (ko, Utils, Environment) {

	/**
	 * Contains and builds search criteria
	 */
	var Criteria = (function () {

		/**
		 * Constructs a Criteria object
		 * @param	data	Object		An object with any of the fields in 
		 *								this.defaultData specified. These will override defaults
		 */
		var Criteria = function (data) {
			this.defaultData = {
				keyword : '',
				title__icontains: '',
				year__gte: '',
				year__lte: ''
			};
			this.data = { };
			this.string = '';

			//Allow criteria creation with a single string
			if(typeof data == 'string') {
				//Set all of the fields to the same string
				for(field in this.defaultData) {
					this.data[field] = data;
				}
			} else {
				this.data = Utils.mergeObjects(data, this.defaultData);
			}
		};

		/**
		 * Set a criterion value
		 * @param	type	String			The criterion to set (from this.defaultData)
		 * @param	value	String/Number	The value of the criterion
		 */
		Criteria.prototype.setCriterion = function (type, value) {
			this.data[type] = value;
		};

		/**
		 * Unsets a criterion, reverting it to its default value
		 * @param	type	String		The criterion to unset (from this.defaultData)
		 */
		Criteria.prototype.unsetCriterion = function (type) {
			this.data[type] = this.defaultData[type];
		};

		/**
		 * Converts this Criteria into a URI-encoded string that can be used as a filtering string
		 * in a Timemap API endpoint URL
		 * @return	String	URI-encoded string
		 */
		Criteria.prototype.toString = function () {
			this.string = '';

			for(criterion in this.data) {
				if(this.data[criterion] != null) {
					//Strings need to be split into multiple components with the same criterion identifier
					if(typeof this.data[criterion] == 'string') {
						var components = this.data[criterion].split(' ');
						for(component in components) {
							var text = components[component];
							if(text != null && text.length > 0)
								this.string += '&' + criterion + '=' + components[component];
						}
					//Otherwise just place the value in the string
					} else {
						this.string += '&' + criterion + '=' + this.data[criterion];
					}
				}
			}

			return this.string;
		};

		return Criteria;

	})();

	return (function () {

		var Sidebar = function (viewport) {

			var sidebar = this,
				catchKey = true;
			this.viewport = $(viewport);

			this.data = {
				featuredStories : ko.observable([]),
				searchResults : ko.observable([]),
				searchHeight : ko.computed(function () {
					//-170 for search stuff on top
					return Environment.display.height() - Environment.display.topBarHeight() - 170;
				}),
				featuredHeight : ko.computed(function () {
					//-114 for search stuff on top
					return Environment.display.height() - Environment.display.topBarHeight() - 53;
				}),
				//React to clicking on a featured story
				featuredClick : function (data) {
					document.location = '#viewStory/' + data.story.id;
				},
				//React to clicking on a search resultClick
				resultClick : function (data) {
					console.log(data);
					document.location = '#viewStory/' + data.id;
				},
				Environment: Environment
			};

			$('.search-box').eplInput({
				events: {
					onchange: {
						callback: function (e) {
							criteria = sidebar.createCriteria();
							sidebar.search(criteria);
						},
						interval: 400
					}
				}
			});

			$('.search-box-year-start').eplInput({
				events: {
					onchange: {
						callback: function (e) {
							criteria = sidebar.createCriteria();
							sidebar.search(criteria);
						},

						interval: 400
					}
				}
			});

			$('.search-box-year-end').eplInput({
				events: {
					onchange: {
						callback: function (e) {
							criteria = sidebar.createCriteria();
							sidebar.search(criteria);
						},

						interval: 400
					}
				}
			});

			$(document).bind('keyup', function(e) {
				if(catchKey) {
					var character = String.fromCharCode(e.which).toLowerCase();
					if(e.shiftKey) character = character.toUpperCase();
					if (/[a-zA-Z0-9-_\.]/.test(character)) {
						sidebar.tab('search');
						sidebar.search(character, true);
					}
				}
			});

			$('input[type=text], textarea, input[type=password]').live('focus', function () {
				//Simile steals focus; prevent this from happening
				if(!$(this).parent().hasClass('timeline-band-input')) {
					catchKey = false;
				}
			}).live('blur', function () {
				catchKey = true;
			});

			this.viewport.find('.tab').bind('click', function (e) {
				sidebar.tab($(e.target).attr('data-tab'));
			});

			ko.applyBindings(this.data, viewport[0]);
		};

		Sidebar.prototype.setFeaturedStoriesSource = function (type, branch) {
			var self = this,
				endpointURL = Environment.routes.apiBase + '/featured/?format=json';
			if (type == 'branch' && typeof branch != 'undefined') {
				endpointURL += '&story__branch=' + branch;
			}
			$.ajax(endpointURL, {
				type : 'get',
				contentType : 'json',
				success : function (data) {
					self.data.featuredStories(data.objects);
				}
			})
		};

		/**
		 * Performs a search based on the provided Criteria, and updates
		 * all required views
		 * @param	criteria	Criteria	The Criteria to use when filtering results
		 */
		Sidebar.prototype.search = function (criteria, fillTextbox) {
			var self = this;
			//Don't run empty queries
			if(criteria.toString().length > 0) {
				$.get(Environment.routes.apiBase + '/story/?format=json' + criteria, function (data) {
					self.data.searchResults(data.objects);
					console.log(data.objects);
				});
			} else {
				self.data.searchResults([]);
			}

			if(fillTextbox == true) {
				self.viewport.find('[data-tab=search]').find('.search-box').focus().val(criteria);
			}
		};

		Sidebar.prototype.createCriteria = function () {
			var textInput = $('#search-box-text').val();
			var useTextInput = textInput != "Start typing to search...";
			var yearStartInput = $('#search-year-start').val();
			var useStartYear = yearStartInput.length == 4 && yearStartInput != "Min Year";
			var yearEndInput = $('#search-year-end').val();
			var useEndYear = yearEndInput.length == 4 && yearEndInput != "Max Year";
			criteria = new Criteria({
				'keyword' : useTextInput ? textInput : "",
				'title__icontains' : useTextInput ? textInput : "",
				'year__gte' : useStartYear ? yearStartInput : "",
				'year__lte' : useEndYear ? yearEndInput : ""
			})
			return criteria;
		}

		/**
		 * Set the currently-displayed tab in the sidebar
		 * @param	id		String		The ID of the tab that should be displayed
		 *								(this ID matches the "data-tab" attribute of
		 *								the tab element that should be displayed)
		 */
		Sidebar.prototype.tab = function (id) {
			this.viewport.find('.tab').add('.tab-contents').removeClass('active');
			this.viewport.find('.tab[data-tab=' + id + ']').add('.tab-contents[data-tab=' + id + ']').addClass('active');
		};

		return Sidebar;

	})();
});