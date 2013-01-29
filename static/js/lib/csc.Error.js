;
var csc = csc || {};
define(function () {

/**
 * Provides a wrapper for standard JavaScript exception handling
 * 	- Supports centralized error codes as well as literal text errors
 */
csc.Error = (function () {
	
	var messages = {
		'001: invalidCallback' : 'Invalid callback function passed to %1',
		'002: wrongObjectType' : 'Argument %1 to %2 has the wrong argument type. Expecting %3.',
		'003: invalidTemplate' : 'Invalid template provided to loader (id: %1)'
	};

	/**
	 * Create a new Error to throw
	 * @param	messageID	string		The message ID to throw
	 * @param	args		array		An array of arguments to use in the string,
	 *									as required by the error message.
	 */
	var Error = function (messageID, args) {
		//Get the text of the message
		var message = messages[messageID];
		if(typeof message == 'undefined') {
			message = messageID;
			this.messageID = '';
		} else {
			this.messageID = messageID;
		}
		//Set this Error's content
		this.messageID
		this.message = message;
		this.args = args;
	};

	/**
	 * Create an error message using the base text and arguments
	 */
	Error.prototype.getMessage = function () {
		var message = this.message;
		for(var i=1; i<=this.args.length; i++) {
			message = message.replace('%' + i, '[' + this.args[i-1] + ']');
		}
		if(this.messageID.length > 0) {
			return this.messageID + ' -- ' + message;
		} else {
			return message;
		}
	};

	/**
	 * Throw an Error, constructing an appropriate error message
	 * @param	error	csc.Error	The Error to throw
	 */
	Error.throw = function (error) {
		throw error.getMessage();
	};

	return Error;

})();

return csc.Error;
//End module
});