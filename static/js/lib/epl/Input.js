;
/**
 * A small library for handling common input field functionality, as well as
 * for creating custom select fields
 */
define(['lib/csc/Utils', 'lib/jquery.hotkeys'], function (Utils) {
	(function( $ ) {
		$.fn.eplInput = function (userConfig, params) {

			var input = this,
				config = {
					textToggle : true,
					escapeClear : true,
					textEnteredClass : 'text-entered',
					events : {
						textChanged : {
							callback : function () {},
							//Interval after which to notify a listener if the text has changed
							//Listener format: function (element, currentText, previousText, event)
							// 'blur' 	: The listener will be notified when the element is burred, if the text has changed since focus
							// 100 		: The listener will be notified every 100ms if the text has changed since the last alert or focus
							interval : 200 //use a number in ms for an alert every x ms if the text has changed
						}
					}
				},
				storage = {
					defaultValue : input.attr('data-default-text'),
					textEntered : false,
					initialValue : '',
					timeout : null
				};

			//Event invokers for invoking events on the bound element
			//through the jQuery object
			// ex. $('').eplInput('clear')
			var invokers = {
				//Clear the element's text
				clear : function ()	{
					this.val('');
				}
			};

			//Decide what to do with the userConfig object based on its form
			switch (typeof userConfig) {
				//Set initialize the element if a config object is passed
				case 'object' :
					init();
				break;
				//Otherwise start an event invoker
				case 'string' :
					invokers[userConfig].apply(input, params);
				break;
				//In any other case, just assume the first arg is a config
				//object and try to initialize the element
				default:
					init();
			};

			/**
			 * Determine which type of element is being initialized, and run
			 * the appropriate init function
			 */
			function init () {
				switch(input.prop('tagName').toLowerCase()) {
					case 'input':
						switch(input.attr('type')) {
							case 'text':
								initText();
							break;
						}
					break;
				}
			}

			/**
			 * Initialize a text input element
			 */
			function initText () {
				config = Utils.mergeObjects(userConfig, config);

				//Enable clearing the field with escape
				if(config.escapeClear) {
					input.bind('keydown.esc', function () {
						input.val('');
					});
				}

				//Enable text toggling when requested
				if(config.textToggle) {
					input.val(storage.defaultValue);
				}

				// ------------------- //
				// EVENT CONFIGURATION //
				// ------------------- //

				//Focusing on the element should remove default text if present
				//and turn the input's mode into text-entered
				input.focus(function () {
					if(config.textToggle && !storage.textEntered) {
						input.val('');
						input.addClass(config.textEnteredClass);
						storage.textEntered = true;
					}
					//Store the initial value for the "textChanged" event
					storage.initialValue = input.val();
				});

				//Blurring from the element should re-insert default text if the 
				//field is empty, and take the element out of text-entered mode
				input.blur(function (e) {
					var blurValue = input.val();

					if(config.textToggle && blurValue == '') {
						input.val(storage.defaultValue);
						input.removeClass(config.textEnteredClass);
						storage.textEntered = false;
					}

					if(blurValue != storage.initialValue && config.events.textChanged.interval == 'blur') {
						//If the value changed, invoke the supplied callback
						config.events.textChanged.callback(input, input.val(), storage.initialValue, e);
					}
				});

				//Handle custom textChange events
				if(typeof config.events.textChanged.interval == 'string' && config.events.textChanged.interval != 'blur') {
					input.bind(config.events.textChanged.interval, function (e) {
						config.events.textChanged.callback(input, input.val(), storage.initialValue, e);
						storage.initialValue = input.val();
					});
				}

				//If time intervals were requested for textChanged, set up that handler sequence
				if(typeof config.events.textChanged.interval == 'number') {
					input.bind('keydown', '', function () {
						if(storage.timeout == null) {
							storage.initialValue = input.val();
							//Set a timeout for the specified interval
							storage.timeout = window.setTimeout(function () {
								//If the value changed, invoke the supplied callback
								if(storage.initialValue != input.val())
									config.events.textChanged.callback(input, input.val(), storage.initialValue, config.events.textChanged.interval);
								storage.timeout = null;
							}, config.events.textChanged.interval);
						} else {
						}
					});
				}
			}
			return input;
		};
	})( jQuery );
});