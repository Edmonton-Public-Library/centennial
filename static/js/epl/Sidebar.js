;
define(['lib/knockout', 'lib/csc/Utils', 'epl/Environment'], function (ko, Utils, Environment) {

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
				title__icontains: ''
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
			console.log(data);
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
				searchResults : ko.observable([])
			};

			//TODO: REMOVE! THIS IS FOR EXPERIMENTING ONLY!
			$('.search-box').eplInput({
				events: {
					onchange: {
						callback: function (e) {
							sidebar.search(new Criteria({
								'keyword' : e.currentValue,
								'title__icontains' : e.currentValue
							}));
						},

						interval: 400
					}
				}
			});

			$(document).bind('keyup', function(e) {
				if(catchKey) {
					var character = String.fromCharCode(e.which).toLowerCase();
					console.log(character);
					if(e.shiftKey) character = character.toUpperCase();
					if (/[a-zA-Z0-9-_\.]/.test(character)) {
						sidebar.tab('search');
						sidebar.search(character, true);
					}
				}
			});

			$('input[type=text], textarea').bind('focus', function () {
				catchKey = false;
			}).bind('blur', function () {
				catchKey = true;
			});

			this.viewport.find('.tab').bind('click', function (e) {
				sidebar.tab($(e.target).attr('data-tab'));
			});

			ko.applyBindings(this.data, viewport[0]);
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
				});
			} else {
				self.data.searchResults([]);
			}

			if(fillTextbox == true) {
				self.viewport.find('[data-tab=search]').find('.search-box').focus().val(criteria);
			}
		};

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