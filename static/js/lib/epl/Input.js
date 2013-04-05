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
						onchange : {
							callback : function () {},

							//Text input properties
							//-------------------------------------------------------------
							//Interval after which to notify a listener if the text has 
							//changed
							//Listener format: 	function (element, currentText, 
							//					previousText, event)
							// 'blur' 	: 	The listener will be notified when the element 
							//				is burred, if the text has changed since focus
							// 100 		: 	The listener will be notified every 100ms if 
							//				the text has changed since the last alert or 
							//				focus
							interval : 200 	//interval in ms
							//-------------------------------------------------------------
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
				config = Utils.mergeObjects(userConfig, config);
				var tagName = typeof input.prop('tagName') == 'string' ? input.prop('tagName').toLowerCase() : '';
				switch(tagName) {
					case 'input':
						switch(input.attr('type')) {
							case 'text':
								initText();
							break;
							case 'password':
								initPassword();
							break;
						}
					break;
					case 'select':
						initSelect();
					break;
					case 'div':
						initSelect();
					break;
					default:
						initText();
				}
			}

			function initSelect () {

				var inputOpen = false,
					//TODO: Set this properly
					selectedItem = null,
					divInput = $('<div>');

				//Copy attributes to the new object
				$.each(input.prop("attributes"), function () {
					divInput.attr(this.name, this.value);
				});
				
				createInput();

				function createInput () {
					input.find('option').each(function (index, element) {
						var newOption = $('<div>'),
							optionContents = $('<div>'),
							element = $(element);

						if(element.attr('selected') == 'selected') {
							addOption(divInput, {
								className: 'option option-selected',
								'data-value': element.attr('value'),
								'data-text': element.html()
							}, 'front');
						}

						addOption(divInput, {
							className: 'option',
							'data-value': element.attr('value'),
							'data-text': element.html()
						});

					});

					input.after(divInput);
					input.css('display', 'none');
				}

				function addOption (element, options, position) {
					var newOption = $('<div>'),
						optionContents = $('<div>');

					newOption.addClass(options.className);
					newOption.attr('data-value', options['data-value']);
					newOption.attr('data-text', options['data-text']);

					optionContents.addClass('option-contents');
					optionContents.html(options['data-text']);

					newOption.append(optionContents);

					switch(position) {
						case 'front':
							element.prepend(newOption);
						break;
						default:
							element.append(newOption);
					}

				}

				/**
				 * Opens the input, showing the available options
				 */
				function open () {
					inputOpen = true;
					divInput.addClass('select-active');
				}

				/**
				 * Closes the divInput 
				 */
				function close () {
					inputOpen = false;
					divInput.removeClass('select-active');
				}
				
				/**
				 * Selects an item, setting the "selected" text
				 * and firing any bound events
				 * @param	element		jQuery		The selected element
				 */
				function selectItem (element) {
					var html = '',
						optionElement = null;

					selectedItem = element;

					//Get the actual option element, regardless of the click source
					if(element.hasClass('option-contents')) {
						optionElement = element.parent();
					} else {
						optionElement = element;
					}

					divInput.find('.option-selected').find('.option-contents').html(optionElement.attr('data-text'));
					divInput.find('.option-selected').find('.option-contents').attr('data-value', optionElement.attr('data-value'));
					config.events.onchange.callback({
						currentValue: optionElement.attr('data-value')
					});
				}

				// ------------------- //
				// EVENT CONFIGURATION //
				// ------------------- //

				divInput.find('.option:not(.option-selected)').click(function (e) {
					selectItem($(e.target));
					if(inputOpen) {
						close();
						//If we're closing it, don't allow the main element
						//to trigger an open again
						e.stopPropagation();
					}
				}).mousedown(function (e) { e.stopPropagation(); })

				divInput.click(function (e) {
					if(!inputOpen) {
						open();
						//If we're opening it, don't allow the event to
						//bubble to the document and trigger a close
						e.stopPropagation();
					}
					return false;
				}).mousedown(function (e) { e.stopPropagation(); })

				//Catch all other clicks and close the divInput
				$(document).mousedown(function () {
					close();
				});
			}

			function initPassword () {
				if(input.attr('data-default-text')) {
					togglePasswordInput();
					input.val(input.attr('data-default-text'));
				}
				input.focus(function () {
					togglePasswordInput(true);
					input.val('');
				});
			}

			function togglePasswordInput (focus) {
				var newType = '',
					newInput = $('<input>');
				//Get the new type
				if(input.attr('type') == 'password') {
					newType = 'text';
				} else {
					newType = 'password';
				}
				//Copy attributes to the new object
				$.each(input.prop("attributes"), function () {
					if(this.name == 'type') {
						newInput.attr('type', newType);
					} else {
						newInput.attr(this.name, this.value);
					}
				});

				input.replaceWith(newInput);
				input = newInput;
				if(focus) input.focus();
				//TODO: Get toggling back to text working, when the input is empty on blur
			}

			/**
			 * Initialize a text input element
			 */
			function initText () {
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
					//Store the initial value for the "onchange" event
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

					if(blurValue != storage.initialValue && config.events.onchange.interval == 'blur') {
						//If the value changed, invoke the supplied callback
						config.events.onchange.callback({
							element: input,
							currentValue: blurValue,
							initialValue: storage.initialValue,
							event: e
						});
					}
				});

				//Handle custom textChange events
				if(typeof config.events.onchange.interval == 'string' && config.events.onchange.interval != 'blur') {
					input.bind(config.events.onchange.interval, function (e) {
						config.events.onchange.callback({
							element: input, 
							currentValue: input.val(), 
							initialValue: storage.initialValue, 
							event: e
						});
						storage.initialValue = input.val();
					});
				}

				//If time intervals were requested for onchange, set up that handler sequence
				if(typeof config.events.onchange.interval == 'number') {
					input.bind('keydown', '', function (e) {
						if(storage.timeout == null) {
							storage.initialValue = input.val();
							//Set a timeout for the specified interval
							storage.timeout = window.setTimeout(function () {
								//If the value changed, invoke the supplied callback
								if(storage.initialValue != input.val()) {
									var value = storage.textEntered ? input.val() : '';
									config.events.onchange.callback({
										element: input, 
										currentValue: value, 
										initialValue: storage.initialValue, 
										interval: config.events.onchange.interval,
										event: e
									});
								}
								storage.timeout = null;
							}, config.events.onchange.interval);
						} else {
						}
					});
				}
			}
			return input;
		};
	})( jQuery );
});