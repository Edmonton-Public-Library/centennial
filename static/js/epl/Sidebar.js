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

			this.data = Utils.mergeObjects(data, this.defaultData);
			this.string = '';
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

			var sidebar = this;

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

			ko.applyBindings(this.data, viewport[0]);
		};

		/**
		 * Performs a search based on the provided Criteria, and updates
		 * all required views
		 * @param	criteria	Criteria	The Criteria to use when filtering results
		 */
		Sidebar.prototype.search = function (criteria) {
			var self = this;
			console.log(Environment.routes.apiBase + '/story/?format=json' + criteria);
			$.get(Environment.routes.apiBase + '/story/?format=json' + criteria, function (data) {
				self.data.searchResults(data.objects);
			});
		};

		return Sidebar;

	})();
});