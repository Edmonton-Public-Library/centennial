/* Timeline API 2.3.0
 *  Copyright Massachusetts Institute of Technology 
 *  and Contributors 2006-2009 ~ Some rights reserved 
 *  Timeline is open source software and is licensed 
 *  under the BSD license.
 *  http://www.simile-widgets.org/timeline/
 * 	MODIFIED IN ANNOTATED LOCATIONS TO IMPROVE MAINTAINABILITY
 *		- 	Removed references to Timeline.urlPrefix and replaced them with 
 *			Environment.imageDirectory references
 */;
define(['timemap/Environment'], function (Environment) {
	(function () {
		var Timeline, SimileAjax;
		var loadMe = function () {
			Timeline = window.Timeline = new Object();
			Timeline.DateTime = window.SimileAjax.DateTime;
			// ** REMOVED BY BRAEDEN PETRUK TO AVOID FILENAME DEPENDENCY **
			// try {
			// 	(function () {
			// 		if (typeof Timeline_urlPrefix == "string") {
			// 			Timeline.urlPrefix = Timeline_urlPrefix;
			// 			if (typeof Timeline_parameters == "string") {
			// 				SimileAjax.parseURLParameters(Timeline_parameters)
			// 			}
			// 		} else {
			// 			var heads = document.documentElement.getElementsByTagName("head");
			// 			for (var h = 0; h < heads.length; h++) {
			// 				var scripts = heads[h].getElementsByTagName("script");
			// 				for (var s = 0; s < scripts.length; s++) {
			// 					var url = scripts[s].src;
			// 					var i = url.indexOf("timeline-2.3.0.js");
			// 					if (i >= 0) {
			// 						Timeline.urlPrefix = url.substr(0, i);
			// 						var q = url.indexOf("?");
			// 						if (q > 0) {
			// 							SimileAjax.parseURLParameters(url.substr(q + 1))
			// 						}
			// 						return
			// 					}
			// 				}
			// 			}
			// 			throw new Error("Failed to derive URL prefix for Timeline API code files")
			// 		}
			// 	})();
			// 	var includeCssFiles = function (urlPrefix, filenames) {
			// 		SimileAjax.includeCssFiles(document, urlPrefix, filenames)
			// 	};
			// 	includeCssFiles(Timeline.urlPrefix, ["timeline-2.3.0.css"]);
			// 	Timeline.serverLocale = "en";
			// 	Timeline.clientLocale = "en"
			// } catch (e) {
			// 	alert(e)
			// }
			// ** END REMOVAL **
		};
		if (typeof SimileAjax == "undefined") {
			var SimileAjax = window.SimileAjax = {
				loaded: false,
				loadingScriptsCount: 0,
				error: null,
				params: {
					bundle: "true"
				}
			};
			SimileAjax.Platform = new Object();
			var getHead = function (doc) {
				return doc.getElementsByTagName("head")[0]
			};
			SimileAjax.findScript = function (doc, substring) {
				var heads = doc.documentElement.getElementsByTagName("head");
				for (var h = 0; h < heads.length; h++) {
					var node = heads[h].firstChild;
					while (node != null) {
						if (node.nodeType == 1 && node.tagName.toLowerCase() == "script") {
							var url = node.src;
							var i = url.indexOf(substring);
							if (i >= 0) {
								return url
							}
						}
						node = node.nextSibling
					}
				}
				return null
			};
			SimileAjax.includeJavascriptFile = function (doc, url, onerror, charset) {
				onerror = onerror || "";
				if (doc.body == null) {
					try {
						var q = "'" + onerror.replace(/'/g, "&apos") + "'";
						doc.write("<script src='" + url + "' onerror=" + q + (charset ? " charset='" + charset + "'" : "") + " type='text/javascript'>" + onerror + "<\/script>");
						return
					} catch (e) {}
				}
				var script = doc.createElement("script");
				if (onerror) {
					try {
						script.innerHTML = onerror
					} catch (e) {}
					script.setAttribute("onerror", onerror)
				}
				if (charset) {
					script.setAttribute("charset", charset)
				}
				script.type = "text/javascript";
				script.language = "JavaScript";
				script.src = url;
				return getHead(doc).appendChild(script)
			};
			SimileAjax.includeCssFile = function (doc, url) {
				if (doc.body == null) {
					try {
						doc.write("<link rel='stylesheet' href='" + url + "' type='text/css'/>");
						return
					} catch (e) {}
				}
				var link = doc.createElement("link");
				link.setAttribute("rel", "stylesheet");
				link.setAttribute("type", "text/css");
				link.setAttribute("href", url);
				getHead(doc).appendChild(link)
			};
			SimileAjax.includeCssFiles = function (doc, urlPrefix, filenames) {
				for (var i = 0; i < filenames.length; i++) {
					SimileAjax.includeCssFile(doc, urlPrefix + filenames[i])
				}
			};
			SimileAjax.prefixURLs = function (urls, urlPrefix, suffixes) {
				for (var i = 0; i < suffixes.length; i++) {
					urls.push(urlPrefix + suffixes[i])
				}
			};
			SimileAjax.parseURLParameters = function (url, to, types) {
				to = to || {};
				types = types || {};
				if (typeof url == "undefined") {
					url = location.href
				}
				var q = url.indexOf("?");
				if (q < 0) {
					return to
				}
				url = (url + "#").slice(q + 1, url.indexOf("#"));
				var params = url.split("&"),
					param, parsed = {};
				var decode = window.decodeURIComponent || unescape;
				for (var i = 0; param = params[i]; i++) {
					var eq = param.indexOf("=");
					var name = decode(param.slice(0, eq));
					var old = parsed[name];
					if (typeof old == "undefined") {
						old = []
					} else {
						if (!(old instanceof Array)) {
							old = [old]
						}
					}
					parsed[name] = old.concat(decode(param.slice(eq + 1)))
				}
				for (var i in parsed) {
					if (!parsed.hasOwnProperty(i)) {
						continue
					}
					var type = types[i] || String;
					var data = parsed[i];
					if (!(data instanceof Array)) {
						data = [data]
					}
					if (type === Boolean && data[0] == "false") {
						to[i] = false
					} else {
						to[i] = type.apply(this, data)
					}
				}
				return to
			};
			SimileAjax.loaded = true
		}
		SimileAjax.version = "pre 2.3.0";
		SimileAjax.jQuery = jQuery;
		SimileAjax.Platform.os = {
			isMac: false,
			isWin: false,
			isWin32: false,
			isUnix: false
		};
		SimileAjax.Platform.browser = {
			isIE: false,
			isNetscape: false,
			isMozilla: false,
			isFirefox: false,
			isOpera: false,
			isSafari: false,
			majorVersion: 0,
			minorVersion: 0
		};
		(function () {
			var C = navigator.appName.toLowerCase();
			var A = navigator.userAgent.toLowerCase();
			SimileAjax.Platform.os.isMac = (A.indexOf("mac") != -1);
			SimileAjax.Platform.os.isWin = (A.indexOf("win") != -1);
			SimileAjax.Platform.os.isWin32 = SimileAjax.Platform.isWin && (A.indexOf("95") != -1 || A.indexOf("98") != -1 || A.indexOf("nt") != -1 || A.indexOf("win32") != -1 || A.indexOf("32bit") != -1);
			SimileAjax.Platform.os.isUnix = (A.indexOf("x11") != -1);
			SimileAjax.Platform.browser.isIE = (C.indexOf("microsoft") != -1);
			SimileAjax.Platform.browser.isNetscape = (C.indexOf("netscape") != -1);
			SimileAjax.Platform.browser.isMozilla = (A.indexOf("mozilla") != -1);
			SimileAjax.Platform.browser.isFirefox = (A.indexOf("firefox") != -1);
			SimileAjax.Platform.browser.isOpera = (C.indexOf("opera") != -1);
			SimileAjax.Platform.browser.isSafari = (C.indexOf("safari") != -1);
			var E = function (G) {
				var F = G.split(".");
				SimileAjax.Platform.browser.majorVersion = parseInt(F[0]);
				SimileAjax.Platform.browser.minorVersion = parseInt(F[1])
			};
			var B = function (H, G, I) {
				var F = H.indexOf(G, I);
				return F >= 0 ? F : H.length
			};
			if (SimileAjax.Platform.browser.isMozilla) {
				var D = A.indexOf("mozilla/");
				if (D >= 0) {
					E(A.substring(D + 8, B(A, " ", D)))
				}
			}
			if (SimileAjax.Platform.browser.isIE) {
				var D = A.indexOf("msie ");
				if (D >= 0) {
					E(A.substring(D + 5, B(A, ";", D)))
				}
			}
			if (SimileAjax.Platform.browser.isNetscape) {
				var D = A.indexOf("rv:");
				if (D >= 0) {
					E(A.substring(D + 3, B(A, ")", D)))
				}
			}
			if (SimileAjax.Platform.browser.isFirefox) {
				var D = A.indexOf("firefox/");
				if (D >= 0) {
					E(A.substring(D + 8, B(A, " ", D)))
				}
			}
			if (!("localeCompare" in String.prototype)) {
				String.prototype.localeCompare = function (F) {
					if (this < F) {
						return -1
					} else {
						if (this > F) {
							return 1
						} else {
							return 0
						}
					}
				}
			}
		})();
		SimileAjax.Platform.getDefaultLocale = function () {
			return SimileAjax.Platform.clientLocale
		};
		SimileAjax.ListenerQueue = function (A) {
			this._listeners = [];
			this._wildcardHandlerName = A
		};
		SimileAjax.ListenerQueue.prototype.add = function (A) {
			this._listeners.push(A)
		};
		SimileAjax.ListenerQueue.prototype.remove = function (C) {
			var A = this._listeners;
			for (var B = 0; B < A.length; B++) {
				if (A[B] == C) {
					A.splice(B, 1);
					break
				}
			}
		};
		SimileAjax.ListenerQueue.prototype.fire = function (C, B) {
			var A = [].concat(this._listeners);
			for (var D = 0; D < A.length; D++) {
				var E = A[D];
				if (C in E) {
					try {
						E[C].apply(E, B)
					} catch (F) {
						SimileAjax.Debug.exception("Error firing event of name " + C, F)
					}
				} else {
					if (this._wildcardHandlerName != null && this._wildcardHandlerName in E) {
						try {
							E[this._wildcardHandlerName].apply(E, [C])
						} catch (F) {
							SimileAjax.Debug.exception("Error firing event of name " + C + " to wildcard handler", F)
						}
					}
				}
			}
		};
		SimileAjax.Set = function (A) {
			this._hash = {};
			this._count = 0;
			if (A instanceof Array) {
				for (var B = 0; B < A.length; B++) {
					this.add(A[B])
				}
			} else {
				if (A instanceof SimileAjax.Set) {
					this.addSet(A)
				}
			}
		};
		SimileAjax.Set.prototype.add = function (A) {
			if (!(A in this._hash)) {
				this._hash[A] = true;
				this._count++;
				return true
			}
			return false
		};
		SimileAjax.Set.prototype.addSet = function (B) {
			for (var A in B._hash) {
				this.add(A)
			}
		};
		SimileAjax.Set.prototype.remove = function (A) {
			if (A in this._hash) {
				delete this._hash[A];
				this._count--;
				return true
			}
			return false
		};
		SimileAjax.Set.prototype.removeSet = function (B) {
			for (var A in B._hash) {
				this.remove(A)
			}
		};
		SimileAjax.Set.prototype.retainSet = function (B) {
			for (var A in this._hash) {
				if (!B.contains(A)) {
					delete this._hash[A];
					this._count--
				}
			}
		};
		SimileAjax.Set.prototype.contains = function (A) {
			return (A in this._hash)
		};
		SimileAjax.Set.prototype.size = function () {
			return this._count
		};
		SimileAjax.Set.prototype.toArray = function () {
			var A = [];
			for (var B in this._hash) {
				A.push(B)
			}
			return A
		};
		SimileAjax.Set.prototype.visit = function (A) {
			for (var B in this._hash) {
				if (A(B) == true) {
					break
				}
			}
		};
		SimileAjax.SortedArray = function (B, A) {
			this._a = (A instanceof Array) ? A : [];
			this._compare = B
		};
		SimileAjax.SortedArray.prototype.add = function (C) {
			var A = this;
			var B = this.find(function (D) {
				return A._compare(D, C)
			});
			if (B < this._a.length) {
				this._a.splice(B, 0, C)
			} else {
				this._a.push(C)
			}
		};
		SimileAjax.SortedArray.prototype.remove = function (C) {
			var A = this;
			var B = this.find(function (D) {
				return A._compare(D, C)
			});
			while (B < this._a.length && this._compare(this._a[B], C) == 0) {
				if (this._a[B] == C) {
					this._a.splice(B, 1);
					return true
				} else {
					B++
				}
			}
			return false
		};
		SimileAjax.SortedArray.prototype.removeAll = function () {
			this._a = []
		};
		SimileAjax.SortedArray.prototype.elementAt = function (A) {
			return this._a[A]
		};
		SimileAjax.SortedArray.prototype.length = function () {
			return this._a.length
		};
		SimileAjax.SortedArray.prototype.find = function (D) {
			var B = 0;
			var A = this._a.length;
			while (B < A) {
				var C = Math.floor((B + A) / 2);
				var E = D(this._a[C]);
				if (C == B) {
					return E < 0 ? B + 1 : B
				} else {
					if (E < 0) {
						B = C
					} else {
						A = C
					}
				}
			}
			return B
		};
		SimileAjax.SortedArray.prototype.getFirst = function () {
			return (this._a.length > 0) ? this._a[0] : null
		};
		SimileAjax.SortedArray.prototype.getLast = function () {
			return (this._a.length > 0) ? this._a[this._a.length - 1] : null
		};
		SimileAjax.EventIndex = function (B) {
			var A = this;
			this._unit = (B != null) ? B : SimileAjax.NativeDateUnit;
			this._events = new SimileAjax.SortedArray(function (C, D) {
				return A._unit.compare(C.getStart(), D.getStart())
			});
			this._idToEvent = {};
			this._indexed = true
		};
		SimileAjax.EventIndex.prototype.getUnit = function () {
			return this._unit
		};
		SimileAjax.EventIndex.prototype.getEvent = function (A) {
			return this._idToEvent[A]
		};
		SimileAjax.EventIndex.prototype.add = function (A) {
			this._events.add(A);
			this._idToEvent[A.getID()] = A;
			this._indexed = false
		};
		SimileAjax.EventIndex.prototype.removeAll = function () {
			this._events.removeAll();
			this._idToEvent = {};
			this._indexed = false
		};
		SimileAjax.EventIndex.prototype.getCount = function () {
			return this._events.length()
		};
		SimileAjax.EventIndex.prototype.getIterator = function (A, B) {
			if (!this._indexed) {
				this._index()
			}
			return new SimileAjax.EventIndex._Iterator(this._events, A, B, this._unit)
		};
		SimileAjax.EventIndex.prototype.getReverseIterator = function (A, B) {
			if (!this._indexed) {
				this._index()
			}
			return new SimileAjax.EventIndex._ReverseIterator(this._events, A, B, this._unit)
		};
		SimileAjax.EventIndex.prototype.getAllIterator = function () {
			return new SimileAjax.EventIndex._AllIterator(this._events)
		};
		SimileAjax.EventIndex.prototype.getEarliestDate = function () {
			var A = this._events.getFirst();
			return (A == null) ? null : A.getStart()
		};
		SimileAjax.EventIndex.prototype.getLatestDate = function () {
			var A = this._events.getLast();
			if (A == null) {
				return null
			}
			if (!this._indexed) {
				this._index()
			}
			var C = A._earliestOverlapIndex;
			var B = this._events.elementAt(C).getEnd();
			for (var D = C + 1; D < this._events.length(); D++) {
				B = this._unit.later(B, this._events.elementAt(D).getEnd())
			}
			return B
		};
		SimileAjax.EventIndex.prototype._index = function () {
			var E = this._events.length();
			for (var F = 0; F < E; F++) {
				var D = this._events.elementAt(F);
				D._earliestOverlapIndex = F
			}
			var G = 1;
			for (var F = 0; F < E; F++) {
				var D = this._events.elementAt(F);
				var C = D.getEnd();
				G = Math.max(G, F + 1);
				while (G < E) {
					var A = this._events.elementAt(G);
					var B = A.getStart();
					if (this._unit.compare(B, C) < 0) {
						A._earliestOverlapIndex = F;
						G++
					} else {
						break
					}
				}
			}
			this._indexed = true
		};
		SimileAjax.EventIndex._Iterator = function (A, C, D, B) {
			this._events = A;
			this._startDate = C;
			this._endDate = D;
			this._unit = B;
			this._currentIndex = A.find(function (E) {
				return B.compare(E.getStart(), C)
			});
			if (this._currentIndex - 1 >= 0) {
				this._currentIndex = this._events.elementAt(this._currentIndex - 1)._earliestOverlapIndex
			}
			this._currentIndex--;
			this._maxIndex = A.find(function (E) {
				return B.compare(E.getStart(), D)
			});
			this._hasNext = false;
			this._next = null;
			this._findNext()
		};
		SimileAjax.EventIndex._Iterator.prototype = {
			hasNext: function () {
				return this._hasNext
			},
			next: function () {
				if (this._hasNext) {
					var A = this._next;
					this._findNext();
					return A
				} else {
					return null
				}
			},
			_findNext: function () {
				var B = this._unit;
				while ((++this._currentIndex) < this._maxIndex) {
					var A = this._events.elementAt(this._currentIndex);
					if (B.compare(A.getStart(), this._endDate) < 0 && B.compare(A.getEnd(), this._startDate) > 0) {
						this._next = A;
						this._hasNext = true;
						return
					}
				}
				this._next = null;
				this._hasNext = false
			}
		};
		SimileAjax.EventIndex._ReverseIterator = function (A, C, D, B) {
			this._events = A;
			this._startDate = C;
			this._endDate = D;
			this._unit = B;
			this._minIndex = A.find(function (E) {
				return B.compare(E.getStart(), C)
			});
			if (this._minIndex - 1 >= 0) {
				this._minIndex = this._events.elementAt(this._minIndex - 1)._earliestOverlapIndex
			}
			this._maxIndex = A.find(function (E) {
				return B.compare(E.getStart(), D)
			});
			this._currentIndex = this._maxIndex;
			this._hasNext = false;
			this._next = null;
			this._findNext()
		};
		SimileAjax.EventIndex._ReverseIterator.prototype = {
			hasNext: function () {
				return this._hasNext
			},
			next: function () {
				if (this._hasNext) {
					var A = this._next;
					this._findNext();
					return A
				} else {
					return null
				}
			},
			_findNext: function () {
				var B = this._unit;
				while ((--this._currentIndex) >= this._minIndex) {
					var A = this._events.elementAt(this._currentIndex);
					if (B.compare(A.getStart(), this._endDate) < 0 && B.compare(A.getEnd(), this._startDate) > 0) {
						this._next = A;
						this._hasNext = true;
						return
					}
				}
				this._next = null;
				this._hasNext = false
			}
		};
		SimileAjax.EventIndex._AllIterator = function (A) {
			this._events = A;
			this._index = 0
		};
		SimileAjax.EventIndex._AllIterator.prototype = {
			hasNext: function () {
				return this._index < this._events.length()
			},
			next: function () {
				return this._index < this._events.length() ? this._events.elementAt(this._index++) : null
			}
		};
		SimileAjax.DateTime = new Object();
		SimileAjax.DateTime.MILLISECOND = 0;
		SimileAjax.DateTime.SECOND = 1;
		SimileAjax.DateTime.MINUTE = 2;
		SimileAjax.DateTime.HOUR = 3;
		SimileAjax.DateTime.DAY = 4;
		SimileAjax.DateTime.WEEK = 5;
		SimileAjax.DateTime.MONTH = 6;
		SimileAjax.DateTime.YEAR = 7;
		SimileAjax.DateTime.DECADE = 8;
		SimileAjax.DateTime.CENTURY = 9;
		SimileAjax.DateTime.MILLENNIUM = 10;
		SimileAjax.DateTime.EPOCH = -1;
		SimileAjax.DateTime.ERA = -2;
		SimileAjax.DateTime.FIVEYEAR = 11;
		SimileAjax.DateTime.gregorianUnitLengths = [];
		(function () {
			var B = SimileAjax.DateTime;
			var A = B.gregorianUnitLengths;
			A[B.MILLISECOND] = 1;
			A[B.SECOND] = 1000;
			A[B.MINUTE] = A[B.SECOND] * 60;
			A[B.HOUR] = A[B.MINUTE] * 60;
			A[B.DAY] = A[B.HOUR] * 24;
			A[B.WEEK] = A[B.DAY] * 7;
			A[B.MONTH] = A[B.DAY] * 31;
			A[B.YEAR] = A[B.DAY] * 365;
			A[B.DECADE] = A[B.YEAR] * 10;
			A[B.CENTURY] = A[B.YEAR] * 100;
			A[B.MILLENNIUM] = A[B.YEAR] * 1000;
			A[B.FIVEYEAR] = A[B.YEAR] * 5
		})();
		SimileAjax.DateTime._dateRegexp = new RegExp("^(-?)([0-9]{4})(" + ["(-?([0-9]{2})(-?([0-9]{2}))?)", "(-?([0-9]{3}))", "(-?W([0-9]{2})(-?([1-7]))?)"].join("|") + ")?$");
		SimileAjax.DateTime._timezoneRegexp = new RegExp("Z|(([-+])([0-9]{2})(:?([0-9]{2}))?)$");
		SimileAjax.DateTime._timeRegexp = new RegExp("^([0-9]{2})(:?([0-9]{2})(:?([0-9]{2})(.([0-9]+))?)?)?$");
		SimileAjax.DateTime.setIso8601Date = function (G, C) {
			var I = C.match(SimileAjax.DateTime._dateRegexp);
			if (!I) {
				throw new Error("Invalid date string: " + C)
			}
			var B = (I[1] == "-") ? -1 : 1;
			var J = B * I[2];
			var H = I[5];
			var D = I[7];
			var F = I[9];
			var A = I[11];
			var M = (I[13]) ? I[13] : 1;
			G.setUTCFullYear(J);
			if (F) {
				G.setUTCMonth(0);
				G.setUTCDate(Number(F))
			} else {
				if (A) {
					G.setUTCMonth(0);
					G.setUTCDate(1);
					var L = G.getUTCDay();
					var K = (L) ? L : 7;
					var E = Number(M) + (7 * Number(A));
					if (K <= 4) {
						G.setUTCDate(E + 1 - K)
					} else {
						G.setUTCDate(E + 8 - K)
					}
				} else {
					if (H) {
						G.setUTCDate(1);
						G.setUTCMonth(H - 1)
					}
					if (D) {
						G.setUTCDate(D)
					}
				}
			}
			return G
		};
		SimileAjax.DateTime.setIso8601Time = function (F, D) {
			var G = D.match(SimileAjax.DateTime._timeRegexp);
			if (!G) {
				SimileAjax.Debug.warn("Invalid time string: " + D);
				return false
			}
			var A = G[1];
			var E = Number((G[3]) ? G[3] : 0);
			var C = (G[5]) ? G[5] : 0;
			var B = G[7] ? (Number("0." + G[7]) * 1000) : 0;
			F.setUTCHours(A);
			F.setUTCMinutes(E);
			F.setUTCSeconds(C);
			F.setUTCMilliseconds(B);
			return F
		};
		SimileAjax.DateTime.timezoneOffset = new Date().getTimezoneOffset();
		SimileAjax.DateTime.setIso8601 = function (B, A) {
			var D = null;
			var E = (A.indexOf("T") == -1) ? A.split(" ") : A.split("T");
			SimileAjax.DateTime.setIso8601Date(B, E[0]);
			if (E.length == 2) {
				var C = E[1].match(SimileAjax.DateTime._timezoneRegexp);
				if (C) {
					if (C[0] == "Z") {
						D = 0
					} else {
						D = (Number(C[3]) * 60) + Number(C[5]);
						D *= ((C[2] == "-") ? 1 : -1)
					}
					E[1] = E[1].substr(0, E[1].length - C[0].length)
				}
				SimileAjax.DateTime.setIso8601Time(B, E[1])
			}
			if (D == null) {
				D = B.getTimezoneOffset()
			}
			B.setTime(B.getTime() + D * 60000);
			return B
		};
		SimileAjax.DateTime.parseIso8601DateTime = function (A) {
			try {
				return SimileAjax.DateTime.setIso8601(new Date(0), A)
			} catch (B) {
				return null
			}
		};
		SimileAjax.DateTime.parseGregorianDateTime = function (F) {
			if (F == null) {
				return null
			} else {
				if (F instanceof Date) {
					return F
				}
			}
			var B = F.toString();
			if (B.length > 0 && B.length < 8) {
				var C = B.indexOf(" ");
				if (C > 0) {
					var A = parseInt(B.substr(0, C));
					var G = B.substr(C + 1);
					if (G.toLowerCase() == "bc") {
						A = 1 - A
					}
				} else {
					var A = parseInt(B)
				}
				var E = new Date(0);
				E.setUTCFullYear(A);
				return E
			}
			try {
				return new Date(Date.parse(B))
			} catch (D) {
				return null
			}
		};
		SimileAjax.DateTime.roundDownToInterval = function (E, B, I, K, A) {
			var F = I * SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.HOUR];
			var J = new Date(E.getTime() + F);
			var C = function (L) {
				L.setUTCMilliseconds(0);
				L.setUTCSeconds(0);
				L.setUTCMinutes(0);
				L.setUTCHours(0)
			};
			var D = function (L) {
				C(L);
				L.setUTCDate(1);
				L.setUTCMonth(0)
			};
			switch (B) {
				case SimileAjax.DateTime.MILLISECOND:
					var H = J.getUTCMilliseconds();
					J.setUTCMilliseconds(H - (H % K));
					break;
				case SimileAjax.DateTime.SECOND:
					J.setUTCMilliseconds(0);
					var H = J.getUTCSeconds();
					J.setUTCSeconds(H - (H % K));
					break;
				case SimileAjax.DateTime.MINUTE:
					J.setUTCMilliseconds(0);
					J.setUTCSeconds(0);
					var H = J.getUTCMinutes();
					J.setTime(J.getTime() - (H % K) * SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.MINUTE]);
					break;
				case SimileAjax.DateTime.HOUR:
					J.setUTCMilliseconds(0);
					J.setUTCSeconds(0);
					J.setUTCMinutes(0);
					var H = J.getUTCHours();
					J.setUTCHours(H - (H % K));
					break;
				case SimileAjax.DateTime.DAY:
					C(J);
					break;
				case SimileAjax.DateTime.WEEK:
					C(J);
					var G = (J.getUTCDay() + 7 - A) % 7;
					J.setTime(J.getTime() - G * SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.DAY]);
					break;
				case SimileAjax.DateTime.MONTH:
					C(J);
					J.setUTCDate(1);
					var H = J.getUTCMonth();
					J.setUTCMonth(H - (H % K));
					break;
				case SimileAjax.DateTime.YEAR:
					D(J);
					var H = J.getUTCFullYear();
					J.setUTCFullYear(H - (H % K));
					break;
				case SimileAjax.DateTime.DECADE:
					D(J);
					J.setUTCFullYear(Math.floor(J.getUTCFullYear() / 10) * 10);
					break;
				case SimileAjax.DateTime.FIVEYEAR:
					D(J);
					J.setUTCFullYear(Math.floor(J.getUTCFullYear() / 5) * 5);
					break;
				case SimileAjax.DateTime.CENTURY:
					D(J);
					J.setUTCFullYear(Math.floor(J.getUTCFullYear() / 100) * 100);
					break;
				case SimileAjax.DateTime.MILLENNIUM:
					D(J);
					J.setUTCFullYear(Math.floor(J.getUTCFullYear() / 1000) * 1000);
					break
			}
			E.setTime(J.getTime() - F)
		};
		SimileAjax.DateTime.roundUpToInterval = function (C, F, D, A, B) {
			var E = C.getTime();
			SimileAjax.DateTime.roundDownToInterval(C, F, D, A, B);
			if (C.getTime() < E) {
				C.setTime(C.getTime() + SimileAjax.DateTime.gregorianUnitLengths[F] * A)
			}
		};
		SimileAjax.DateTime.incrementByInterval = function (A, D, B) {
			B = (typeof B == "undefined") ? 0 : B;
			var E = B * SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.HOUR];
			var C = new Date(A.getTime() + E);
			switch (D) {
				case SimileAjax.DateTime.MILLISECOND:
					C.setTime(C.getTime() + 1);
					break;
				case SimileAjax.DateTime.SECOND:
					C.setTime(C.getTime() + 1000);
					break;
				case SimileAjax.DateTime.MINUTE:
					C.setTime(C.getTime() + SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.MINUTE]);
					break;
				case SimileAjax.DateTime.HOUR:
					C.setTime(C.getTime() + SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.HOUR]);
					break;
				case SimileAjax.DateTime.DAY:
					C.setUTCDate(C.getUTCDate() + 1);
					break;
				case SimileAjax.DateTime.WEEK:
					C.setUTCDate(C.getUTCDate() + 7);
					break;
				case SimileAjax.DateTime.MONTH:
					C.setUTCMonth(C.getUTCMonth() + 1);
					break;
				case SimileAjax.DateTime.YEAR:
					C.setUTCFullYear(C.getUTCFullYear() + 1);
					break;
				case SimileAjax.DateTime.DECADE:
					C.setUTCFullYear(C.getUTCFullYear() + 10);
					break;
				case SimileAjax.DateTime.FIVEYEAR:
					C.setUTCFullYear(C.getUTCFullYear() + 5);
					break;
				case SimileAjax.DateTime.CENTURY:
					C.setUTCFullYear(C.getUTCFullYear() + 100);
					break;
				case SimileAjax.DateTime.MILLENNIUM:
					C.setUTCFullYear(C.getUTCFullYear() + 1000);
					break
			}
			A.setTime(C.getTime() - E)
		};
		SimileAjax.DateTime.removeTimeZoneOffset = function (A, B) {
			return new Date(A.getTime() + B * SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.HOUR])
		};
		SimileAjax.DateTime.getTimezone = function () {
			var A = new Date().getTimezoneOffset();
			return A / -60
		};
		SimileAjax.Debug = {
			silent: false
		};
		SimileAjax.Debug.log = function (B) {
			var A;
			if ("console" in window && "log" in window.console) {
				A = function (C) {
					console.log(C)
				}
			} else {
				A = function (C) {
					if (!SimileAjax.Debug.silent) {
						alert(C)
					}
				}
			}
			SimileAjax.Debug.log = A;
			A(B)
		};
		SimileAjax.Debug.warn = function (B) {
			var A;
			if ("console" in window && "warn" in window.console) {
				A = function (C) {
					console.warn(C)
				}
			} else {
				A = function (C) {
					if (!SimileAjax.Debug.silent) {
						alert(C)
					}
				}
			}
			SimileAjax.Debug.warn = A;
			A(B)
		};
		SimileAjax.Debug.exception = function (B, D) {
			var A, C = SimileAjax.parseURLParameters();
			if (C.errors == "throw" || SimileAjax.params.errors == "throw") {
				A = function (F, E) {
					throw (F)
				}
			} else {
				if ("console" in window && "error" in window.console) {
					A = function (F, E) {
						if (E != null) {
							console.error(E + " %o", F)
						} else {
							console.error(F)
						}
						throw (F)
					}
				} else {
					A = function (F, E) {
						if (!SimileAjax.Debug.silent) {
							alert("Caught exception: " + E + "\n\nDetails: " + ("description" in F ? F.description : F))
						}
						throw (F)
					}
				}
			}
			SimileAjax.Debug.exception = A;
			A(B, D)
		};
		SimileAjax.Debug.objectToString = function (A) {
			return SimileAjax.Debug._objectToString(A, "")
		};
		SimileAjax.Debug._objectToString = function (D, C) {
			var B = C + " ";
			if (typeof D == "object") {
				var A = "{";
				for (E in D) {
					A += B + E + ": " + SimileAjax.Debug._objectToString(D[E], B) + "\n"
				}
				A += C + "}";
				return A
			} else {
				if (typeof D == "array") {
					var A = "[";
					for (var E = 0; E < D.length; E++) {
						A += SimileAjax.Debug._objectToString(D[E], B) + "\n"
					}
					A += C + "]";
					return A
				} else {
					return D
				}
			}
		};
		SimileAjax.DOM = new Object();
		SimileAjax.DOM.registerEventWithObject = function (C, A, D, B) {
			SimileAjax.DOM.registerEvent(C, A, function (F, E, G) {
				return D[B].call(D, F, E, G)
			})
		};
		SimileAjax.DOM.registerEvent = function (C, B, D) {
			var A = function (E) {
				E = (E) ? E : ((event) ? event : null);
				if (E) {
					var F = (E.target) ? E.target : ((E.srcElement) ? E.srcElement : null);
					if (F) {
						F = (F.nodeType == 1 || F.nodeType == 9) ? F : F.parentNode
					}
					return D(C, E, F)
				}
				return true
			};
			if (SimileAjax.Platform.browser.isIE) {
				C.attachEvent("on" + B, A)
			} else {
				C.addEventListener(B, A, false)
			}
		};
		SimileAjax.DOM.getPageCoordinates = function (B) {
			var E = 0;
			var D = 0;
			if (B.nodeType != 1) {
				B = B.parentNode
			}
			var C = B;
			while (C != null) {
				E += C.offsetLeft;
				D += C.offsetTop;
				C = C.offsetParent
			}
			var A = document.body;
			while (B != null && B != A) {
				if ("scrollLeft" in B) {
					E -= B.scrollLeft;
					D -= B.scrollTop
				}
				B = B.parentNode
			}
			return {
				left: E,
				top: D
			}
		};
		SimileAjax.DOM.getSize = function (B) {
			var A = this.getStyle(B, "width");
			var C = this.getStyle(B, "height");
			if (A.indexOf("px") > -1) {
				A = A.replace("px", "")
			}
			if (C.indexOf("px") > -1) {
				C = C.replace("px", "")
			}
			return {
				w: A,
				h: C
			}
		};
		SimileAjax.DOM.getStyle = function (B, A) {
			if (B.currentStyle) {
				var C = B.currentStyle[A]
			} else {
				if (window.getComputedStyle) {
					var C = document.defaultView.getComputedStyle(B, null).getPropertyValue(A)
				} else {
					var C = ""
				}
			}
			return C
		};
		SimileAjax.DOM.getEventRelativeCoordinates = function (B, C) {
			if (SimileAjax.Platform.browser.isIE) {
				if (B.type == "mousewheel") {
					var A = SimileAjax.DOM.getPageCoordinates(C);
					return {
						x: B.clientX - A.left,
						y: B.clientY - A.top
					}
				} else {
					return {
						x: B.offsetX,
						y: B.offsetY
					}
				}
			} else {
				var A = SimileAjax.DOM.getPageCoordinates(C);
				if ((B.type == "DOMMouseScroll") && SimileAjax.Platform.browser.isFirefox && (SimileAjax.Platform.browser.majorVersion == 2)) {
					return {
						x: B.screenX - A.left,
						y: B.screenY - A.top
					}
				} else {
					return {
						x: B.pageX - A.left,
						y: B.pageY - A.top
					}
				}
			}
		};
		SimileAjax.DOM.getEventPageCoordinates = function (A) {
			if (SimileAjax.Platform.browser.isIE) {
				return {
					x: A.clientX + document.body.scrollLeft,
					y: A.clientY + document.body.scrollTop
				}
			} else {
				return {
					x: A.pageX,
					y: A.pageY
				}
			}
		};
		SimileAjax.DOM.hittest = function (A, C, B) {
			return SimileAjax.DOM._hittest(document.body, A, C, B)
		};
		SimileAjax.DOM._hittest = function (C, L, K, A) {
			var M = C.childNodes;
			outer: for (var G = 0; G < M.length; G++) {
				var H = M[G];
				for (var F = 0; F < A.length; F++) {
					if (H == A[F]) {
						continue outer
					}
				}
				if (H.offsetWidth == 0 && H.offsetHeight == 0) {
					var B = SimileAjax.DOM._hittest(H, L, K, A);
					if (B != H) {
						return B
					}
				} else {
					var J = 0;
					var E = 0;
					var D = H;
					while (D) {
						J += D.offsetTop;
						E += D.offsetLeft;
						D = D.offsetParent
					}
					if (E <= L && J <= K && (L - E) < H.offsetWidth && (K - J) < H.offsetHeight) {
						return SimileAjax.DOM._hittest(H, L, K, A)
					} else {
						if (H.nodeType == 1 && H.tagName == "TR") {
							var I = SimileAjax.DOM._hittest(H, L, K, A);
							if (I != H) {
								return I
							}
						}
					}
				}
			}
			return C
		};
		SimileAjax.DOM.cancelEvent = function (A) {
			A.returnValue = false;
			A.cancelBubble = true;
			if ("preventDefault" in A) {
				A.preventDefault()
			}
		};
		SimileAjax.DOM.appendClassName = function (D, A) {
			var C = D.className.split(" ");
			for (var B = 0; B < C.length; B++) {
				if (C[B] == A) {
					return
				}
			}
			C.push(A);
			D.className = C.join(" ")
		};
		SimileAjax.DOM.createInputElement = function (A) {
			var B = document.createElement("div");
			B.innerHTML = "<input type='" + A + "' />";
			return B.firstChild
		};
		SimileAjax.DOM.createDOMFromTemplate = function (A) {
			var B = {};
			B.elmt = SimileAjax.DOM._createDOMFromTemplate(A, B, null);
			return B
		};
		SimileAjax.DOM._createDOMFromTemplate = function (F, G, D) {
			if (F == null) {
				return null
			} else {
				if (typeof F != "object") {
					var C = document.createTextNode(F);
					if (D != null) {
						D.appendChild(C)
					}
					return C
				} else {
					var A = null;
					if ("tag" in F) {
						var J = F.tag;
						if (D != null) {
							if (J == "tr") {
								A = D.insertRow(D.rows.length)
							} else {
								if (J == "td") {
									A = D.insertCell(D.cells.length)
								}
							}
						}
						if (A == null) {
							A = J == "input" ? SimileAjax.DOM.createInputElement(F.type) : document.createElement(J);
							if (D != null) {
								D.appendChild(A)
							}
						}
					} else {
						A = F.elmt;
						if (D != null) {
							D.appendChild(A)
						}
					}
					for (var B in F) {
						var H = F[B];
						if (B == "field") {
							G[H] = A
						} else {
							if (B == "className") {
								A.className = H
							} else {
								if (B == "id") {
									A.id = H
								} else {
									if (B == "title") {
										A.title = H
									} else {
										if (B == "type" && A.tagName == "input") {} else {
											if (B == "style") {
												for (n in H) {
													var I = H[n];
													if (n == "float") {
														n = SimileAjax.Platform.browser.isIE ? "styleFloat" : "cssFloat"
													}
													A.style[n] = I
												}
											} else {
												if (B == "children") {
													for (var E = 0; E < H.length; E++) {
														SimileAjax.DOM._createDOMFromTemplate(H[E], G, A)
													}
												} else {
													if (B != "tag" && B != "elmt") {
														A.setAttribute(B, H)
													}
												}
											}
										}
									}
								}
							}
						}
					}
					return A
				}
			}
		};
		SimileAjax.DOM._cachedParent = null;
		SimileAjax.DOM.createElementFromString = function (A) {
			if (SimileAjax.DOM._cachedParent == null) {
				SimileAjax.DOM._cachedParent = document.createElement("div")
			}
			SimileAjax.DOM._cachedParent.innerHTML = A;
			return SimileAjax.DOM._cachedParent.firstChild
		};
		SimileAjax.DOM.createDOMFromString = function (A, C, D) {
			var B = typeof A == "string" ? document.createElement(A) : A;
			B.innerHTML = C;
			var E = {
				elmt: B
			};
			SimileAjax.DOM._processDOMChildrenConstructedFromString(E, B, D != null ? D : {});
			return E
		};
		SimileAjax.DOM._processDOMConstructedFromString = function (D, A, B) {
			var E = A.id;
			if (E != null && E.length > 0) {
				A.removeAttribute("id");
				if (E in B) {
					var C = A.parentNode;
					C.insertBefore(B[E], A);
					C.removeChild(A);
					D[E] = B[E];
					return
				} else {
					D[E] = A
				}
			}
			if (A.hasChildNodes()) {
				SimileAjax.DOM._processDOMChildrenConstructedFromString(D, A, B)
			}
		};
		SimileAjax.DOM._processDOMChildrenConstructedFromString = function (E, B, D) {
			var C = B.firstChild;
			while (C != null) {
				var A = C.nextSibling;
				if (C.nodeType == 1) {
					SimileAjax.DOM._processDOMConstructedFromString(E, C, D)
				}
				C = A
			}
		};
		SimileAjax.Graphics = new Object();
		SimileAjax.Graphics.pngIsTranslucent = (!SimileAjax.Platform.browser.isIE) || (SimileAjax.Platform.browser.majorVersion > 6);
		if (!SimileAjax.Graphics.pngIsTranslucent) {
			SimileAjax.includeCssFile(document, Environment.routes.styleDirectory + "/graphics-ie6.css")
		}
		SimileAjax.Graphics._createTranslucentImage1 = function (A, C) {
			var B = document.createElement("img");
			B.setAttribute("src", A);
			if (C != null) {
				B.style.verticalAlign = C
			}
			return B
		};
		SimileAjax.Graphics._createTranslucentImage2 = function (A, C) {
			var B = document.createElement("img");
			B.style.width = "1px";
			B.style.height = "1px";
			B.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + A + "', sizingMethod='image')";
			B.style.verticalAlign = (C != null) ? C : "middle";
			return B
		};
		SimileAjax.Graphics.createTranslucentImage = SimileAjax.Graphics.pngIsTranslucent ? SimileAjax.Graphics._createTranslucentImage1 : SimileAjax.Graphics._createTranslucentImage2;
		SimileAjax.Graphics._createTranslucentImageHTML1 = function (A, B) {
			return '<img src="' + A + '"' + (B != null ? ' style="vertical-align: ' + B + ';"' : "") + " />"
		};
		SimileAjax.Graphics._createTranslucentImageHTML2 = function (A, C) {
			var B = "width: 1px; height: 1px; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + A + "', sizingMethod='image');" + (C != null ? " vertical-align: " + C + ";" : "");
			return "<img src='" + A + "' style=\"" + B + '" />'
		};
		SimileAjax.Graphics.createTranslucentImageHTML = SimileAjax.Graphics.pngIsTranslucent ? SimileAjax.Graphics._createTranslucentImageHTML1 : SimileAjax.Graphics._createTranslucentImageHTML2;
		SimileAjax.Graphics.setOpacity = function (B, A) {
			if (SimileAjax.Platform.browser.isIE) {
				B.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Style=0,Opacity=" + A + ")"
			} else {
				var C = (A / 100).toString();
				B.style.opacity = C;
				B.style.MozOpacity = C
			}
		};
		SimileAjax.Graphics.bubbleConfig = {
			containerCSSClass: "simileAjax-bubble-container",
			innerContainerCSSClass: "simileAjax-bubble-innerContainer",
			contentContainerCSSClass: "simileAjax-bubble-contentContainer",
			borderGraphicSize: 50,
			borderGraphicCSSClassPrefix: "simileAjax-bubble-border-",
			arrowGraphicTargetOffset: 33,
			arrowGraphicLength: 100,
			arrowGraphicWidth: 49,
			arrowGraphicCSSClassPrefix: "simileAjax-bubble-arrow-",
			closeGraphicCSSClass: "simileAjax-bubble-close",
			extraPadding: 20
		};
		SimileAjax.Graphics.createBubbleForContentAndPoint = function (F, E, C, B, D, A) {
			if (typeof B != "number") {
				B = 300
			}
			if (typeof A != "number") {
				A = 0
			}
			F.style.position = "absolute";
			F.style.left = "-5000px";
			F.style.top = "0px";
			F.style.width = B + "px";
			document.body.appendChild(F);
			window.setTimeout(function () {
				var H = F.scrollWidth + 10;
				var J = F.scrollHeight + 10;
				var G = 0;
				if (A > 0 && J > A) {
					J = A;
					G = H - 25
				}
				var I = SimileAjax.Graphics.createBubbleForPoint(E, C, H, J, D);
				document.body.removeChild(F);
				F.style.position = "static";
				F.style.left = "";
				F.style.top = "";
				if (G > 0) {
					var K = document.createElement("div");
					F.style.width = "";
					K.style.width = G + "px";
					K.appendChild(F);
					I.content.appendChild(K)
				} else {
					F.style.width = H + "px";
					I.content.appendChild(F)
				}
			}, 200)
		};
		SimileAjax.Graphics.createBubbleForPoint = function (B, A, J, N, F) {
			J = parseInt(J, 10);
			N = parseInt(N, 10);
			var E = SimileAjax.Graphics.bubbleConfig;
			var M = SimileAjax.Graphics.pngIsTranslucent ? "pngTranslucent" : "pngNotTranslucent";
			var L = J + 2 * E.borderGraphicSize;
			var O = N + 2 * E.borderGraphicSize;
			var K = function (S) {
				return S + " " + S + "-" + M
			};
			var H = document.createElement("div");
			H.className = K(E.containerCSSClass);
			H.style.width = J + "px";
			H.style.height = N + "px";
			var D = document.createElement("div");
			D.className = K(E.innerContainerCSSClass);
			H.appendChild(D);
			var I = function () {
				if (!Q._closed) {
					document.body.removeChild(Q._div);
					Q._doc = null;
					Q._div = null;
					Q._content = null;
					Q._closed = true
				}
			};
			var Q = {
				_closed: false
			};
			var R = SimileAjax.WindowManager.pushLayer(I, true, H);
			Q._div = H;
			Q.close = function () {
				SimileAjax.WindowManager.popLayer(R)
			};
			var G = function (T) {
				var S = document.createElement("div");
				S.className = K(E.borderGraphicCSSClassPrefix + T);
				D.appendChild(S)
			};
			G("top-left");
			G("top-right");
			G("bottom-left");
			G("bottom-right");
			G("left");
			G("right");
			G("top");
			G("bottom");
			var C = document.createElement("div");
			C.className = K(E.contentContainerCSSClass);
			D.appendChild(C);
			Q.content = C;
			var P = document.createElement("div");
			P.className = K(E.closeGraphicCSSClass);
			D.appendChild(P);
			SimileAjax.WindowManager.registerEventWithObject(P, "click", Q, "close");
			(function () {
				var Y = SimileAjax.Graphics.getWindowDimensions();
				var T = Y.w;
				var U = Y.h;
				var V = Math.ceil(E.arrowGraphicWidth / 2);
				var Z = function (b) {
					var a = document.createElement("div");
					a.className = K(E.arrowGraphicCSSClassPrefix + "point-" + b);
					D.appendChild(a);
					return a
				};
				if (B - V - E.borderGraphicSize - E.extraPadding > 0 && B + V + E.borderGraphicSize + E.extraPadding < T) {
					var X = B - Math.round(J / 2);
					X = B < (T / 2) ? Math.max(X, E.extraPadding + E.borderGraphicSize) : Math.min(X, T - E.extraPadding - E.borderGraphicSize - J);
					if ((F && F == "top") || (!F && (A - E.arrowGraphicTargetOffset - N - E.borderGraphicSize - E.extraPadding > 0))) {
						var S = Z("down");
						S.style.left = (B - V - X) + "px";
						H.style.left = X + "px";
						H.style.top = (A - E.arrowGraphicTargetOffset - N) + "px";
						return
					} else {
						if ((F && F == "bottom") || (!F && (A + E.arrowGraphicTargetOffset + N + E.borderGraphicSize + E.extraPadding < U))) {
							var S = Z("up");
							S.style.left = (B - V - X) + "px";
							H.style.left = X + "px";
							H.style.top = (A + E.arrowGraphicTargetOffset) + "px";
							return
						}
					}
				}
				var W = A - Math.round(N / 2);
				W = A < (U / 2) ? Math.max(W, E.extraPadding + E.borderGraphicSize) : Math.min(W, U - E.extraPadding - E.borderGraphicSize - N);
				if ((F && F == "left") || (!F && (B - E.arrowGraphicTargetOffset - J - E.borderGraphicSize - E.extraPadding > 0))) {
					var S = Z("right");
					S.style.top = (A - V - W) + "px";
					H.style.top = W + "px";
					H.style.left = (B - E.arrowGraphicTargetOffset - J) + "px"
				} else {
					var S = Z("left");
					S.style.top = (A - V - W) + "px";
					H.style.top = W + "px";
					H.style.left = (B + E.arrowGraphicTargetOffset) + "px"
				}
			})();
			document.body.appendChild(H);
			return Q
		};
		SimileAjax.Graphics.getWindowDimensions = function () {
			if (typeof window.innerHeight == "number") {
				return {
					w: window.innerWidth,
					h: window.innerHeight
				}
			} else {
				if (document.documentElement && document.documentElement.clientHeight) {
					return {
						w: document.documentElement.clientWidth,
						h: document.documentElement.clientHeight
					}
				} else {
					if (document.body && document.body.clientHeight) {
						return {
							w: document.body.clientWidth,
							h: document.body.clientHeight
						}
					}
				}
			}
		};
		SimileAjax.Graphics.createMessageBubble = function (H) {
			var G = H.createElement("div");
			if (SimileAjax.Graphics.pngIsTranslucent) {
				var I = H.createElement("div");
				I.style.height = "33px";
				I.style.background = "url(" + Environment.routes.imageDirectory + "/message-top-left.png) top left no-repeat";
				I.style.paddingLeft = "44px";
				G.appendChild(I);
				var D = H.createElement("div");
				D.style.height = "33px";
				D.style.background = "url(" + Environment.routes.imageDirectory + "/message-top-right.png) top right no-repeat";
				I.appendChild(D);
				var F = H.createElement("div");
				F.style.background = "url(" + Environment.routes.imageDirectory + "/message-left.png) top left repeat-y";
				F.style.paddingLeft = "44px";
				G.appendChild(F);
				var B = H.createElement("div");
				B.style.background = "url(" + Environment.routes.imageDirectory + "/message-right.png) top right repeat-y";
				B.style.paddingRight = "44px";
				F.appendChild(B);
				var C = H.createElement("div");
				B.appendChild(C);
				var E = H.createElement("div");
				E.style.height = "55px";
				E.style.background = "url(" + Environment.routes.imageDirectory + "/message-bottom-left.png) bottom left no-repeat";
				E.style.paddingLeft = "44px";
				G.appendChild(E);
				var A = H.createElement("div");
				A.style.height = "55px";
				A.style.background = "url(" + Environment.routes.imageDirectory + "/message-bottom-right.png) bottom right no-repeat";
				E.appendChild(A)
			} else {
				G.style.border = "2px solid #7777AA";
				G.style.padding = "20px";
				G.style.background = "white";
				SimileAjax.Graphics.setOpacity(G, 90);
				var C = H.createElement("div");
				G.appendChild(C)
			}
			return {
				containerDiv: G,
				contentDiv: C
			}
		};
		SimileAjax.Graphics.createAnimation = function (B, E, D, C, A) {
			return new SimileAjax.Graphics._Animation(B, E, D, C, A)
		};
		SimileAjax.Graphics._Animation = function (B, E, D, C, A) {
			this.f = B;
			this.cont = (typeof A == "function") ? A : function () {};
			this.from = E;
			this.to = D;
			this.current = E;
			this.duration = C;
			this.start = new Date().getTime();
			this.timePassed = 0
		};
		SimileAjax.Graphics._Animation.prototype.run = function () {
			var A = this;
			window.setTimeout(function () {
				A.step()
			}, 50)
		};
		SimileAjax.Graphics._Animation.prototype.step = function () {
			this.timePassed += 50;
			var A = this.timePassed / this.duration;
			var B = -Math.cos(A * Math.PI) / 2 + 0.5;
			var D = B * (this.to - this.from) + this.from;
			try {
				this.f(D, D - this.current)
			} catch (C) {}
			this.current = D;
			if (this.timePassed < this.duration) {
				this.run()
			} else {
				this.f(this.to, 0);
				this["cont"]()
			}
		};
		SimileAjax.Graphics.createStructuredDataCopyButton = function (F, B, D, E) {
			var G = document.createElement("div");
			G.style.position = "relative";
			G.style.display = "inline";
			G.style.width = B + "px";
			G.style.height = D + "px";
			G.style.overflow = "hidden";
			G.style.margin = "2px";
			if (SimileAjax.Graphics.pngIsTranslucent) {
				G.style.background = "url(" + F + ") no-repeat"
			} else {
				G.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + F + "', sizingMethod='image')"
			}
			var A;
			if (SimileAjax.Platform.browser.isIE) {
				A = "filter:alpha(opacity=0)"
			} else {
				A = "opacity: 0"
			}
			G.innerHTML = "<textarea rows='1' autocomplete='off' value='none' style='" + A + "' />";
			var C = G.firstChild;
			C.style.width = B + "px";
			C.style.height = D + "px";
			C.onmousedown = function (H) {
				H = (H) ? H : ((event) ? event : null);
				if (H.button == 2) {
					C.value = E();
					C.select()
				}
			};
			return G
		};
		SimileAjax.Graphics.getWidthHeight = function (C) {
			var A, B;
			if (C.getBoundingClientRect == null) {
				A = C.offsetWidth;
				B = C.offsetHeight
			} else {
				var D = C.getBoundingClientRect();
				A = Math.ceil(D.right - D.left);
				B = Math.ceil(D.bottom - D.top)
			}
			return {
				width: A,
				height: B
			}
		};
		SimileAjax.Graphics.getFontRenderingContext = function (A, B) {
			return new SimileAjax.Graphics._FontRenderingContext(A, B)
		};
		SimileAjax.Graphics._FontRenderingContext = function (A, B) {
			this._elmt = A;
			this._elmt.style.visibility = "hidden";
			if (typeof B == "string") {
				this._elmt.style.width = B
			} else {
				if (typeof B == "number") {
					this._elmt.style.width = B + "px"
				}
			}
		};
		SimileAjax.Graphics._FontRenderingContext.prototype.dispose = function () {
			this._elmt = null
		};
		SimileAjax.Graphics._FontRenderingContext.prototype.update = function () {
			this._elmt.innerHTML = "A";
			this._lineHeight = this._elmt.offsetHeight
		};
		SimileAjax.Graphics._FontRenderingContext.prototype.computeSize = function (D, B) {
			var C = this._elmt;
			C.innerHTML = D;
			C.className = B === undefined ? "" : B;
			var A = SimileAjax.Graphics.getWidthHeight(C);
			C.className = "";
			return A
		};
		SimileAjax.Graphics._FontRenderingContext.prototype.getLineHeight = function () {
			return this._lineHeight
		};
		SimileAjax.History = {
			maxHistoryLength: 10,
			historyFile: "__history__.html",
			enabled: true,
			_initialized: false,
			_listeners: new SimileAjax.ListenerQueue(),
			_actions: [],
			_baseIndex: 0,
			_currentIndex: 0,
			_plainDocumentTitle: document.title
		};
		SimileAjax.History.formatHistoryEntryTitle = function (A) {
			return SimileAjax.History._plainDocumentTitle + " {" + A + "}"
		};
		SimileAjax.History.initialize = function () {
			if (SimileAjax.History._initialized) {
				return
			}
			/*if (SimileAjax.History.enabled) {
				var A = document.createElement("iframe");
				A.id = "simile-ajax-history";
				A.style.position = "absolute";
				A.style.width = "10px";
				A.style.height = "10px";
				A.style.top = "0px";
				A.style.left = "0px";
				A.style.visibility = "hidden";
				A.src = SimileAjax.History.historyFile + "?0";
				document.body.appendChild(A);
				SimileAjax.DOM.registerEvent(A, "load", SimileAjax.History._handleIFrameOnLoad);
				SimileAjax.History._iframe = A
			}*/
			SimileAjax.History._initialized = true
		};
		SimileAjax.History.addListener = function (A) {
			SimileAjax.History.initialize();
			SimileAjax.History._listeners.add(A)
		};
		SimileAjax.History.removeListener = function (A) {
			SimileAjax.History.initialize();
			SimileAjax.History._listeners.remove(A)
		};
		SimileAjax.History.addAction = function (A) {
			SimileAjax.History.initialize();
			SimileAjax.History._listeners.fire("onBeforePerform", [A]);
			window.setTimeout(function () {
				try {
					A.perform();
					SimileAjax.History._listeners.fire("onAfterPerform", [A]);
					if (SimileAjax.History.enabled) {
						SimileAjax.History._actions = SimileAjax.History._actions.slice(0, SimileAjax.History._currentIndex - SimileAjax.History._baseIndex);
						SimileAjax.History._actions.push(A);
						SimileAjax.History._currentIndex++;
						var C = SimileAjax.History._actions.length - SimileAjax.History.maxHistoryLength;
						if (C > 0) {
							SimileAjax.History._actions = SimileAjax.History._actions.slice(C);
							SimileAjax.History._baseIndex += C
						}
						try {
							SimileAjax.History._iframe.contentWindow.location.search = "?" + SimileAjax.History._currentIndex
						} catch (B) {
							var D = SimileAjax.History.formatHistoryEntryTitle(A.label);
							document.title = D
						}
					}
				} catch (B) {
					SimileAjax.Debug.exception(B, "Error adding action {" + A.label + "} to history")
				}
			}, 0)
		};
		SimileAjax.History.addLengthyAction = function (B, A, C) {
			SimileAjax.History.addAction({
				perform: B,
				undo: A,
				label: C,
				uiLayer: SimileAjax.WindowManager.getBaseLayer(),
				lengthy: true
			})
		};
		SimileAjax.History._handleIFrameOnLoad = function () {
			try {
				var B = SimileAjax.History._iframe.contentWindow.location.search;
				var F = (B.length == 0) ? 0 : Math.max(0, parseInt(B.substr(1)));
				var D = function () {
					var G = F - SimileAjax.History._currentIndex;
					SimileAjax.History._currentIndex += G;
					SimileAjax.History._baseIndex += G;
					SimileAjax.History._iframe.contentWindow.location.search = "?" + F
				};
				if (F < SimileAjax.History._currentIndex) {
					SimileAjax.History._listeners.fire("onBeforeUndoSeveral", []);
					window.setTimeout(function () {
						while (SimileAjax.History._currentIndex > F && SimileAjax.History._currentIndex > SimileAjax.History._baseIndex) {
							SimileAjax.History._currentIndex--;
							var G = SimileAjax.History._actions[SimileAjax.History._currentIndex - SimileAjax.History._baseIndex];
							try {
								G.undo()
							} catch (H) {
								SimileAjax.Debug.exception(H, "History: Failed to undo action {" + G.label + "}")
							}
						}
						SimileAjax.History._listeners.fire("onAfterUndoSeveral", []);
						D()
					}, 0)
				} else {
					if (F > SimileAjax.History._currentIndex) {
						SimileAjax.History._listeners.fire("onBeforeRedoSeveral", []);
						window.setTimeout(function () {
							while (SimileAjax.History._currentIndex < F && SimileAjax.History._currentIndex - SimileAjax.History._baseIndex < SimileAjax.History._actions.length) {
								var G = SimileAjax.History._actions[SimileAjax.History._currentIndex - SimileAjax.History._baseIndex];
								try {
									G.perform()
								} catch (H) {
									SimileAjax.Debug.exception(H, "History: Failed to redo action {" + G.label + "}")
								}
								SimileAjax.History._currentIndex++
							}
							SimileAjax.History._listeners.fire("onAfterRedoSeveral", []);
							D()
						}, 0)
					} else {
						var A = SimileAjax.History._currentIndex - SimileAjax.History._baseIndex - 1;
						var E = (A >= 0 && A < SimileAjax.History._actions.length) ? SimileAjax.History.formatHistoryEntryTitle(SimileAjax.History._actions[A].label) : SimileAjax.History._plainDocumentTitle;
						SimileAjax.History._iframe.contentWindow.document.title = E;
						document.title = E
					}
				}
			} catch (C) {}
		};
		SimileAjax.History.getNextUndoAction = function () {
			try {
				var A = SimileAjax.History._currentIndex - SimileAjax.History._baseIndex - 1;
				return SimileAjax.History._actions[A]
			} catch (B) {
				return null
			}
		};
		SimileAjax.History.getNextRedoAction = function () {
			try {
				var A = SimileAjax.History._currentIndex - SimileAjax.History._baseIndex;
				return SimileAjax.History._actions[A]
			} catch (B) {
				return null
			}
		};
		SimileAjax.HTML = new Object();
		SimileAjax.HTML._e2uHash = {};
		(function () {
			var A = SimileAjax.HTML._e2uHash;
			A.nbsp = "\u00A0[space]";
			A.iexcl = "\u00A1";
			A.cent = "\u00A2";
			A.pound = "\u00A3";
			A.curren = "\u00A4";
			A.yen = "\u00A5";
			A.brvbar = "\u00A6";
			A.sect = "\u00A7";
			A.uml = "\u00A8";
			A.copy = "\u00A9";
			A.ordf = "\u00AA";
			A.laquo = "\u00AB";
			A.not = "\u00AC";
			A.shy = "\u00AD";
			A.reg = "\u00AE";
			A.macr = "\u00AF";
			A.deg = "\u00B0";
			A.plusmn = "\u00B1";
			A.sup2 = "\u00B2";
			A.sup3 = "\u00B3";
			A.acute = "\u00B4";
			A.micro = "\u00B5";
			A.para = "\u00B6";
			A.middot = "\u00B7";
			A.cedil = "\u00B8";
			A.sup1 = "\u00B9";
			A.ordm = "\u00BA";
			A.raquo = "\u00BB";
			A.frac14 = "\u00BC";
			A.frac12 = "\u00BD";
			A.frac34 = "\u00BE";
			A.iquest = "\u00BF";
			A.Agrave = "\u00C0";
			A.Aacute = "\u00C1";
			A.Acirc = "\u00C2";
			A.Atilde = "\u00C3";
			A.Auml = "\u00C4";
			A.Aring = "\u00C5";
			A.AElig = "\u00C6";
			A.Ccedil = "\u00C7";
			A.Egrave = "\u00C8";
			A.Eacute = "\u00C9";
			A.Ecirc = "\u00CA";
			A.Euml = "\u00CB";
			A.Igrave = "\u00CC";
			A.Iacute = "\u00CD";
			A.Icirc = "\u00CE";
			A.Iuml = "\u00CF";
			A.ETH = "\u00D0";
			A.Ntilde = "\u00D1";
			A.Ograve = "\u00D2";
			A.Oacute = "\u00D3";
			A.Ocirc = "\u00D4";
			A.Otilde = "\u00D5";
			A.Ouml = "\u00D6";
			A.times = "\u00D7";
			A.Oslash = "\u00D8";
			A.Ugrave = "\u00D9";
			A.Uacute = "\u00DA";
			A.Ucirc = "\u00DB";
			A.Uuml = "\u00DC";
			A.Yacute = "\u00DD";
			A.THORN = "\u00DE";
			A.szlig = "\u00DF";
			A.agrave = "\u00E0";
			A.aacute = "\u00E1";
			A.acirc = "\u00E2";
			A.atilde = "\u00E3";
			A.auml = "\u00E4";
			A.aring = "\u00E5";
			A.aelig = "\u00E6";
			A.ccedil = "\u00E7";
			A.egrave = "\u00E8";
			A.eacute = "\u00E9";
			A.ecirc = "\u00EA";
			A.euml = "\u00EB";
			A.igrave = "\u00EC";
			A.iacute = "\u00ED";
			A.icirc = "\u00EE";
			A.iuml = "\u00EF";
			A.eth = "\u00F0";
			A.ntilde = "\u00F1";
			A.ograve = "\u00F2";
			A.oacute = "\u00F3";
			A.ocirc = "\u00F4";
			A.otilde = "\u00F5";
			A.ouml = "\u00F6";
			A.divide = "\u00F7";
			A.oslash = "\u00F8";
			A.ugrave = "\u00F9";
			A.uacute = "\u00FA";
			A.ucirc = "\u00FB";
			A.uuml = "\u00FC";
			A.yacute = "\u00FD";
			A.thorn = "\u00FE";
			A.yuml = "\u00FF";
			A.quot = "\u0022";
			A.amp = "\u0026";
			A.lt = "\u003C";
			A.gt = "\u003E";
			A.OElig = "";
			A.oelig = "\u0153";
			A.Scaron = "\u0160";
			A.scaron = "\u0161";
			A.Yuml = "\u0178";
			A.circ = "\u02C6";
			A.tilde = "\u02DC";
			A.ensp = "\u2002";
			A.emsp = "\u2003";
			A.thinsp = "\u2009";
			A.zwnj = "\u200C";
			A.zwj = "\u200D";
			A.lrm = "\u200E";
			A.rlm = "\u200F";
			A.ndash = "\u2013";
			A.mdash = "\u2014";
			A.lsquo = "\u2018";
			A.rsquo = "\u2019";
			A.sbquo = "\u201A";
			A.ldquo = "\u201C";
			A.rdquo = "\u201D";
			A.bdquo = "\u201E";
			A.dagger = "\u2020";
			A.Dagger = "\u2021";
			A.permil = "\u2030";
			A.lsaquo = "\u2039";
			A.rsaquo = "\u203A";
			A.euro = "\u20AC";
			A.fnof = "\u0192";
			A.Alpha = "\u0391";
			A.Beta = "\u0392";
			A.Gamma = "\u0393";
			A.Delta = "\u0394";
			A.Epsilon = "\u0395";
			A.Zeta = "\u0396";
			A.Eta = "\u0397";
			A.Theta = "\u0398";
			A.Iota = "\u0399";
			A.Kappa = "\u039A";
			A.Lambda = "\u039B";
			A.Mu = "\u039C";
			A.Nu = "\u039D";
			A.Xi = "\u039E";
			A.Omicron = "\u039F";
			A.Pi = "\u03A0";
			A.Rho = "\u03A1";
			A.Sigma = "\u03A3";
			A.Tau = "\u03A4";
			A.Upsilon = "\u03A5";
			A.Phi = "\u03A6";
			A.Chi = "\u03A7";
			A.Psi = "\u03A8";
			A.Omega = "\u03A9";
			A.alpha = "\u03B1";
			A.beta = "\u03B2";
			A.gamma = "\u03B3";
			A.delta = "\u03B4";
			A.epsilon = "\u03B5";
			A.zeta = "\u03B6";
			A.eta = "\u03B7";
			A.theta = "\u03B8";
			A.iota = "\u03B9";
			A.kappa = "\u03BA";
			A.lambda = "\u03BB";
			A.mu = "\u03BC";
			A.nu = "\u03BD";
			A.xi = "\u03BE";
			A.omicron = "\u03BF";
			A.pi = "\u03C0";
			A.rho = "\u03C1";
			A.sigmaf = "\u03C2";
			A.sigma = "\u03C3";
			A.tau = "\u03C4";
			A.upsilon = "\u03C5";
			A.phi = "\u03C6";
			A.chi = "\u03C7";
			A.psi = "\u03C8";
			A.omega = "\u03C9";
			A.thetasym = "\u03D1";
			A.upsih = "\u03D2";
			A.piv = "\u03D6";
			A.bull = "\u2022";
			A.hellip = "\u2026";
			A.prime = "\u2032";
			A.Prime = "\u2033";
			A.oline = "\u203E";
			A.frasl = "\u2044";
			A.weierp = "\u2118";
			A.image = "\u2111";
			A.real = "\u211C";
			A.trade = "\u2122";
			A.alefsym = "\u2135";
			A.larr = "\u2190";
			A.uarr = "\u2191";
			A.rarr = "\u2192";
			A.darr = "\u2193";
			A.harr = "\u2194";
			A.crarr = "\u21B5";
			A.lArr = "\u21D0";
			A.uArr = "\u21D1";
			A.rArr = "\u21D2";
			A.dArr = "\u21D3";
			A.hArr = "\u21D4";
			A.forall = "\u2200";
			A.part = "\u2202";
			A.exist = "\u2203";
			A.empty = "\u2205";
			A.nabla = "\u2207";
			A.isin = "\u2208";
			A.notin = "\u2209";
			A.ni = "\u220B";
			A.prod = "\u220F";
			A.sum = "\u2211";
			A.minus = "\u2212";
			A.lowast = "\u2217";
			A.radic = "\u221A";
			A.prop = "\u221D";
			A.infin = "\u221E";
			A.ang = "\u2220";
			A.and = "\u2227";
			A.or = "\u2228";
			A.cap = "\u2229";
			A.cup = "\u222A";
			A["int"] = "\u222B";
			A.there4 = "\u2234";
			A.sim = "\u223C";
			A.cong = "\u2245";
			A.asymp = "\u2248";
			A.ne = "\u2260";
			A.equiv = "\u2261";
			A.le = "\u2264";
			A.ge = "\u2265";
			A.sub = "\u2282";
			A.sup = "\u2283";
			A.nsub = "\u2284";
			A.sube = "\u2286";
			A.supe = "\u2287";
			A.oplus = "\u2295";
			A.otimes = "\u2297";
			A.perp = "\u22A5";
			A.sdot = "\u22C5";
			A.lceil = "\u2308";
			A.rceil = "\u2309";
			A.lfloor = "\u230A";
			A.rfloor = "\u230B";
			A.lang = "\u2329";
			A.rang = "\u232A";
			A.loz = "\u25CA";
			A.spades = "\u2660";
			A.clubs = "\u2663";
			A.hearts = "\u2665";
			A.diams = "\u2666"
		})();
		SimileAjax.HTML.deEntify = function (C) {
			var D = SimileAjax.HTML._e2uHash;
			var B = /&(\w+?);/;
			while (B.test(C)) {
				var A = C.match(B);
				C = C.replace(B, D[A[1]])
			}
			return C
		};
		SimileAjax.JSON = new Object();
		(function () {
			var m = {
				"\b": "\\b",
				"\t": "\\t",
				"\n": "\\n",
				"\f": "\\f",
				"\r": "\\r",
				'"': '\\"',
				"\\": "\\\\"
			};
			var s = {
				array: function (x) {
					var a = ["["],
						b, f, i, l = x.length,
						v;
					for (i = 0; i < l; i += 1) {
						v = x[i];
						f = s[typeof v];
						if (f) {
							v = f(v);
							if (typeof v == "string") {
								if (b) {
									a[a.length] = ","
								}
								a[a.length] = v;
								b = true
							}
						}
					}
					a[a.length] = "]";
					return a.join("")
				},
				"boolean": function (x) {
					return String(x)
				},
				"null": function (x) {
					return "null"
				},
				number: function (x) {
					return isFinite(x) ? String(x) : "null"
				},
				object: function (x) {
					if (x) {
						if (x instanceof Array) {
							return s.array(x)
						}
						var a = ["{"],
							b, f, i, v;
						for (i in x) {
							v = x[i];
							f = s[typeof v];
							if (f) {
								v = f(v);
								if (typeof v == "string") {
									if (b) {
										a[a.length] = ","
									}
									a.push(s.string(i), ":", v);
									b = true
								}
							}
						}
						a[a.length] = "}";
						return a.join("")
					}
					return "null"
				},
				string: function (x) {
					if (/["\\\x00-\x1f]/.test(x)) {
						x = x.replace(/([\x00-\x1f\\"])/g, function (a, b) {
							var c = m[b];
							if (c) {
								return c
							}
							c = b.charCodeAt();
							return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
						})
					}
					return '"' + x + '"'
				}
			};
			SimileAjax.JSON.toJSONString = function (o) {
				if (o instanceof Object) {
					return s.object(o)
				} else {
					if (o instanceof Array) {
						return s.array(o)
					} else {
						return o.toString()
					}
				}
			};
			SimileAjax.JSON.parseJSON = function () {
				try {
					return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(this.replace(/"(\\.|[^"\\])*"/g, ""))) && eval("(" + this + ")")
				} catch (e) {
					return false
				}
			}
		})();
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g, "")
		};
		String.prototype.startsWith = function (A) {
			return this.length >= A.length && this.substr(0, A.length) == A
		};
		String.prototype.endsWith = function (A) {
			return this.length >= A.length && this.substr(this.length - A.length) == A
		};
		String.substitute = function (C, A) {
			var D = "";
			var F = 0;
			while (F < C.length - 1) {
				var B = C.indexOf("%", F);
				if (B < 0 || B == C.length - 1) {
					break
				} else {
					if (B > F && C.charAt(B - 1) == "\\") {
						D += C.substring(F, B - 1) + "%";
						F = B + 1
					} else {
						var E = parseInt(C.charAt(B + 1));
						if (isNaN(E) || E >= A.length) {
							D += C.substring(F, B + 2)
						} else {
							D += C.substring(F, B) + A[E].toString()
						}
						F = B + 2
					}
				}
			}
			if (F < C.length) {
				D += C.substring(F)
			}
			return D
		};
		SimileAjax.NativeDateUnit = new Object();
		SimileAjax.NativeDateUnit.makeDefaultValue = function () {
			return new Date()
		};
		SimileAjax.NativeDateUnit.cloneValue = function (A) {
			return new Date(A.getTime())
		};
		SimileAjax.NativeDateUnit.getParser = function (A) {
			if (typeof A == "string") {
				A = A.toLowerCase()
			}
			return (A == "iso8601" || A == "iso 8601") ? SimileAjax.DateTime.parseIso8601DateTime : SimileAjax.DateTime.parseGregorianDateTime
		};
		SimileAjax.NativeDateUnit.parseFromObject = function (A) {
			return SimileAjax.DateTime.parseGregorianDateTime(A)
		};
		SimileAjax.NativeDateUnit.toNumber = function (A) {
			return A.getTime()
		};
		SimileAjax.NativeDateUnit.fromNumber = function (A) {
			return new Date(A)
		};
		SimileAjax.NativeDateUnit.compare = function (D, C) {
			var B, A;
			if (typeof D == "object") {
				B = D.getTime()
			} else {
				B = Number(D)
			}
			if (typeof C == "object") {
				A = C.getTime()
			} else {
				A = Number(C)
			}
			return B - A
		};
		SimileAjax.NativeDateUnit.earlier = function (B, A) {
			return SimileAjax.NativeDateUnit.compare(B, A) < 0 ? B : A
		};
		SimileAjax.NativeDateUnit.later = function (B, A) {
			return SimileAjax.NativeDateUnit.compare(B, A) > 0 ? B : A
		};
		SimileAjax.NativeDateUnit.change = function (A, B) {
			return new Date(A.getTime() + B)
		};
		SimileAjax.WindowManager = {
			_initialized: false,
			_listeners: [],
			_draggedElement: null,
			_draggedElementCallback: null,
			_dropTargetHighlightElement: null,
			_lastCoords: null,
			_ghostCoords: null,
			_draggingMode: "",
			_dragging: false,
			_layers: []
		};
		SimileAjax.WindowManager.initialize = function () {
			if (SimileAjax.WindowManager._initialized) {
				return
			}
			SimileAjax.DOM.registerEvent(document.body, "mousedown", SimileAjax.WindowManager._onBodyMouseDown);
			SimileAjax.DOM.registerEvent(document.body, "mousemove", SimileAjax.WindowManager._onBodyMouseMove);
			SimileAjax.DOM.registerEvent(document.body, "mouseup", SimileAjax.WindowManager._onBodyMouseUp);
			SimileAjax.DOM.registerEvent(document, "keydown", SimileAjax.WindowManager._onBodyKeyDown);
			SimileAjax.DOM.registerEvent(document, "keyup", SimileAjax.WindowManager._onBodyKeyUp);
			SimileAjax.WindowManager._layers.push({
				index: 0
			});
			SimileAjax.WindowManager._historyListener = {
				onBeforeUndoSeveral: function () {},
				onAfterUndoSeveral: function () {},
				onBeforeUndo: function () {},
				onAfterUndo: function () {},
				onBeforeRedoSeveral: function () {},
				onAfterRedoSeveral: function () {},
				onBeforeRedo: function () {},
				onAfterRedo: function () {}
			};
			SimileAjax.History.addListener(SimileAjax.WindowManager._historyListener);
			SimileAjax.WindowManager._initialized = true
		};
		SimileAjax.WindowManager.getBaseLayer = function () {
			SimileAjax.WindowManager.initialize();
			return SimileAjax.WindowManager._layers[0]
		};
		SimileAjax.WindowManager.getHighestLayer = function () {
			SimileAjax.WindowManager.initialize();
			return SimileAjax.WindowManager._layers[SimileAjax.WindowManager._layers.length - 1]
		};
		SimileAjax.WindowManager.registerEventWithObject = function (D, A, E, B, C) {
			SimileAjax.WindowManager.registerEvent(D, A, function (G, F, H) {
				return E[B].call(E, G, F, H)
			}, C)
		};
		SimileAjax.WindowManager.registerEvent = function (D, B, E, C) {
			if (C == null) {
				C = SimileAjax.WindowManager.getHighestLayer()
			}
			var A = function (G, F, I) {
				if (SimileAjax.WindowManager._canProcessEventAtLayer(C)) {
					SimileAjax.WindowManager._popToLayer(C.index);
					try {
						E(G, F, I)
					} catch (H) {
						SimileAjax.Debug.exception(H)
					}
				}
				SimileAjax.DOM.cancelEvent(F);
				return false
			};
			SimileAjax.DOM.registerEvent(D, B, A)
		};
		SimileAjax.WindowManager.pushLayer = function (C, D, B) {
			var A = {
				onPop: C,
				index: SimileAjax.WindowManager._layers.length,
				ephemeral: (D),
				elmt: B
			};
			SimileAjax.WindowManager._layers.push(A);
			return A
		};
		SimileAjax.WindowManager.popLayer = function (B) {
			for (var A = 1; A < SimileAjax.WindowManager._layers.length; A++) {
				if (SimileAjax.WindowManager._layers[A] == B) {
					SimileAjax.WindowManager._popToLayer(A - 1);
					break
				}
			}
		};
		SimileAjax.WindowManager.popAllLayers = function () {
			SimileAjax.WindowManager._popToLayer(0)
		};
		SimileAjax.WindowManager.registerForDragging = function (B, C, A) {
			SimileAjax.WindowManager.registerEvent(B, "mousedown", function (E, D, F) {
				SimileAjax.WindowManager._handleMouseDown(E, D, C)
			}, A)
		};
		SimileAjax.WindowManager._popToLayer = function (C) {
			while (C + 1 < SimileAjax.WindowManager._layers.length) {
				try {
					var A = SimileAjax.WindowManager._layers.pop();
					if (A.onPop != null) {
						A.onPop()
					}
				} catch (B) {}
			}
		};
		SimileAjax.WindowManager._canProcessEventAtLayer = function (B) {
			if (B.index == (SimileAjax.WindowManager._layers.length - 1)) {
				return true
			}
			for (var A = B.index + 1; A < SimileAjax.WindowManager._layers.length; A++) {
				if (!SimileAjax.WindowManager._layers[A].ephemeral) {
					return false
				}
			}
			return true
		};
		SimileAjax.WindowManager.cancelPopups = function (A) {
			var F = (A) ? SimileAjax.DOM.getEventPageCoordinates(A) : {
				x: -1,
				y: -1
			};
			var E = SimileAjax.WindowManager._layers.length - 1;
			while (E > 0 && SimileAjax.WindowManager._layers[E].ephemeral) {
				var D = SimileAjax.WindowManager._layers[E];
				if (D.elmt != null) {
					var C = D.elmt;
					var B = SimileAjax.DOM.getPageCoordinates(C);
					if (F.x >= B.left && F.x < (B.left + C.offsetWidth) && F.y >= B.top && F.y < (B.top + C.offsetHeight)) {
						break
					}
				}
				E--
			}
			SimileAjax.WindowManager._popToLayer(E)
		};
		SimileAjax.WindowManager._onBodyMouseDown = function (B, A, C) {
			if (!("eventPhase" in A) || A.eventPhase == A.BUBBLING_PHASE) {
				SimileAjax.WindowManager.cancelPopups(A)
			}
		};
		SimileAjax.WindowManager._handleMouseDown = function (B, A, C) {
			SimileAjax.WindowManager._draggedElement = B;
			SimileAjax.WindowManager._draggedElementCallback = C;
			SimileAjax.WindowManager._lastCoords = {
				x: A.clientX,
				y: A.clientY
			};
			SimileAjax.DOM.cancelEvent(A);
			return false
		};
		SimileAjax.WindowManager._onBodyKeyDown = function (C, A, D) {
			if (SimileAjax.WindowManager._dragging) {
				if (A.keyCode == 27) {
					SimileAjax.WindowManager._cancelDragging()
				} else {
					if ((A.keyCode == 17 || A.keyCode == 16) && SimileAjax.WindowManager._draggingMode != "copy") {
						SimileAjax.WindowManager._draggingMode = "copy";
						var B = SimileAjax.Graphics.createTranslucentImage(Environment.routes.imageDirectory + "/copy.png");
						B.style.position = "absolute";
						B.style.left = (SimileAjax.WindowManager._ghostCoords.left - 16) + "px";
						B.style.top = (SimileAjax.WindowManager._ghostCoords.top) + "px";
						document.body.appendChild(B);
						SimileAjax.WindowManager._draggingModeIndicatorElmt = B
					}
				}
			}
		};
		SimileAjax.WindowManager._onBodyKeyUp = function (B, A, C) {
			if (SimileAjax.WindowManager._dragging) {
				if (A.keyCode == 17 || A.keyCode == 16) {
					SimileAjax.WindowManager._draggingMode = "";
					if (SimileAjax.WindowManager._draggingModeIndicatorElmt != null) {
						document.body.removeChild(SimileAjax.WindowManager._draggingModeIndicatorElmt);
						SimileAjax.WindowManager._draggingModeIndicatorElmt = null
					}
				}
			}
		};
		SimileAjax.WindowManager._onBodyMouseMove = function (C, M, B) {
			if (SimileAjax.WindowManager._draggedElement != null) {
				var L = SimileAjax.WindowManager._draggedElementCallback;
				var G = SimileAjax.WindowManager._lastCoords;
				var J = M.clientX - G.x;
				var I = M.clientY - G.y;
				if (!SimileAjax.WindowManager._dragging) {
					if (Math.abs(J) > 5 || Math.abs(I) > 5) {
						try {
							if ("onDragStart" in L) {
								L.onDragStart()
							}
							if ("ghost" in L && L.ghost) {
								var P = SimileAjax.WindowManager._draggedElement;
								SimileAjax.WindowManager._ghostCoords = SimileAjax.DOM.getPageCoordinates(P);
								SimileAjax.WindowManager._ghostCoords.left += J;
								SimileAjax.WindowManager._ghostCoords.top += I;
								var K = P.cloneNode(true);
								K.style.position = "absolute";
								K.style.left = SimileAjax.WindowManager._ghostCoords.left + "px";
								K.style.top = SimileAjax.WindowManager._ghostCoords.top + "px";
								K.style.zIndex = 1000;
								SimileAjax.Graphics.setOpacity(K, 50);
								document.body.appendChild(K);
								L._ghostElmt = K
							}
							SimileAjax.WindowManager._dragging = true;
							SimileAjax.WindowManager._lastCoords = {
								x: M.clientX,
								y: M.clientY
							};
							document.body.focus()
						} catch (H) {
							SimileAjax.Debug.exception("WindowManager: Error handling mouse down", H);
							SimileAjax.WindowManager._cancelDragging()
						}
					}
				} else {
					try {
						SimileAjax.WindowManager._lastCoords = {
							x: M.clientX,
							y: M.clientY
						};
						if ("onDragBy" in L) {
							L.onDragBy(J, I)
						}
						if ("_ghostElmt" in L) {
							var K = L._ghostElmt;
							SimileAjax.WindowManager._ghostCoords.left += J;
							SimileAjax.WindowManager._ghostCoords.top += I;
							K.style.left = SimileAjax.WindowManager._ghostCoords.left + "px";
							K.style.top = SimileAjax.WindowManager._ghostCoords.top + "px";
							if (SimileAjax.WindowManager._draggingModeIndicatorElmt != null) {
								var O = SimileAjax.WindowManager._draggingModeIndicatorElmt;
								O.style.left = (SimileAjax.WindowManager._ghostCoords.left - 16) + "px";
								O.style.top = SimileAjax.WindowManager._ghostCoords.top + "px"
							}
							if ("droppable" in L && L.droppable) {
								var N = SimileAjax.DOM.getEventPageCoordinates(M);
								var B = SimileAjax.DOM.hittest(N.x, N.y, [SimileAjax.WindowManager._ghostElmt, SimileAjax.WindowManager._dropTargetHighlightElement]);
								B = SimileAjax.WindowManager._findDropTarget(B);
								if (B != SimileAjax.WindowManager._potentialDropTarget) {
									if (SimileAjax.WindowManager._dropTargetHighlightElement != null) {
										document.body.removeChild(SimileAjax.WindowManager._dropTargetHighlightElement);
										SimileAjax.WindowManager._dropTargetHighlightElement = null;
										SimileAjax.WindowManager._potentialDropTarget = null
									}
									var A = false;
									if (B != null) {
										if ((!("canDropOn" in L) || L.canDropOn(B)) && (!("canDrop" in B) || B.canDrop(SimileAjax.WindowManager._draggedElement))) {
											A = true
										}
									}
									if (A) {
										var E = 4;
										var D = SimileAjax.DOM.getPageCoordinates(B);
										var F = document.createElement("div");
										F.style.border = E + "px solid yellow";
										F.style.backgroundColor = "yellow";
										F.style.position = "absolute";
										F.style.left = D.left + "px";
										F.style.top = D.top + "px";
										F.style.width = (B.offsetWidth - E * 2) + "px";
										F.style.height = (B.offsetHeight - E * 2) + "px";
										SimileAjax.Graphics.setOpacity(F, 30);
										document.body.appendChild(F);
										SimileAjax.WindowManager._potentialDropTarget = B;
										SimileAjax.WindowManager._dropTargetHighlightElement = F
									}
								}
							}
						}
					} catch (H) {
						SimileAjax.Debug.exception("WindowManager: Error handling mouse move", H);
						SimileAjax.WindowManager._cancelDragging()
					}
				}
				SimileAjax.DOM.cancelEvent(M);
				return false
			}
		};
		SimileAjax.WindowManager._onBodyMouseUp = function (B, A, E) {
			if (SimileAjax.WindowManager._draggedElement != null) {
				try {
					if (SimileAjax.WindowManager._dragging) {
						var C = SimileAjax.WindowManager._draggedElementCallback;
						if ("onDragEnd" in C) {
							C.onDragEnd()
						}
						if ("droppable" in C && C.droppable) {
							var D = false;
							var E = SimileAjax.WindowManager._potentialDropTarget;
							if (E != null) {
								if ((!("canDropOn" in C) || C.canDropOn(E)) && (!("canDrop" in E) || E.canDrop(SimileAjax.WindowManager._draggedElement))) {
									if ("onDropOn" in C) {
										C.onDropOn(E)
									}
									E.ondrop(SimileAjax.WindowManager._draggedElement, SimileAjax.WindowManager._draggingMode);
									D = true
								}
							}
							if (!D) {}
						}
					}
				} finally {
					SimileAjax.WindowManager._cancelDragging()
				}
				SimileAjax.DOM.cancelEvent(A);
				return false
			}
		};
		SimileAjax.WindowManager._cancelDragging = function () {
			var A = SimileAjax.WindowManager._draggedElementCallback;
			if ("_ghostElmt" in A) {
				var B = A._ghostElmt;
				document.body.removeChild(B);
				delete A._ghostElmt
			}
			if (SimileAjax.WindowManager._dropTargetHighlightElement != null) {
				document.body.removeChild(SimileAjax.WindowManager._dropTargetHighlightElement);
				SimileAjax.WindowManager._dropTargetHighlightElement = null
			}
			if (SimileAjax.WindowManager._draggingModeIndicatorElmt != null) {
				document.body.removeChild(SimileAjax.WindowManager._draggingModeIndicatorElmt);
				SimileAjax.WindowManager._draggingModeIndicatorElmt = null
			}
			SimileAjax.WindowManager._draggedElement = null;
			SimileAjax.WindowManager._draggedElementCallback = null;
			SimileAjax.WindowManager._potentialDropTarget = null;
			SimileAjax.WindowManager._dropTargetHighlightElement = null;
			SimileAjax.WindowManager._lastCoords = null;
			SimileAjax.WindowManager._ghostCoords = null;
			SimileAjax.WindowManager._draggingMode = "";
			SimileAjax.WindowManager._dragging = false
		};
		SimileAjax.WindowManager._findDropTarget = function (A) {
			while (A != null) {
				if ("ondrop" in A && (typeof A.ondrop) == "function") {
					break
				}
				A = A.parentNode
			}
			return A
		};
		SimileAjax.XmlHttp = new Object();
		SimileAjax.XmlHttp._onReadyStateChange = function (A, D, B) {
			switch (A.readyState) {
				case 4:
					try {
						if (A.status == 0 || A.status == 200) {
							if (B) {
								B(A)
							}
						} else {
							if (D) {
								D(A.statusText, A.status, A)
							}
						}
					} catch (C) {
						SimileAjax.Debug.exception("XmlHttp: Error handling onReadyStateChange", C)
					}
					break
			}
		};
		SimileAjax.XmlHttp._createRequest = function () {
			if (SimileAjax.Platform.browser.isIE) {
				var B = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
				for (var C = 0; C < B.length; C++) {
					try {
						var A = B[C];
						var D = function () {
							return new ActiveXObject(A)
						};
						var F = D();
						SimileAjax.XmlHttp._createRequest = D;
						return F
					} catch (E) {}
				}
			}
			try {
				var D = function () {
					return new XMLHttpRequest()
				};
				var F = D();
				SimileAjax.XmlHttp._createRequest = D;
				return F
			} catch (E) {
				throw new Error("Failed to create an XMLHttpRequest object")
			}
		};
		SimileAjax.XmlHttp.get = function (B, D, C) {
			var A = SimileAjax.XmlHttp._createRequest();
			A.open("GET", B, true);
			A.onreadystatechange = function () {
				SimileAjax.XmlHttp._onReadyStateChange(A, D, C)
			};
			A.send(null)
		};
		SimileAjax.XmlHttp.post = function (C, A, E, D) {
			var B = SimileAjax.XmlHttp._createRequest();
			B.open("POST", C, true);
			B.onreadystatechange = function () {
				SimileAjax.XmlHttp._onReadyStateChange(B, E, D)
			};
			B.send(A)
		};
		SimileAjax.XmlHttp._forceXML = function (A) {
			try {
				A.overrideMimeType("text/xml")
			} catch (B) {
				A.setrequestheader("Content-Type", "text/xml")
			}
		};
		loadMe();
		Timeline._Band = function (B, G, C) {
			if (B.autoWidth && typeof G.width == "string") {
				G.width = G.width.indexOf("%") > -1 ? 0 : parseInt(G.width)
			}
			this._timeline = B;
			this._bandInfo = G;
			this._index = C;
			this._locale = ("locale" in G) ? G.locale : Timeline.getDefaultLocale();
			this._timeZone = ("timeZone" in G) ? G.timeZone : 0;
			this._labeller = ("labeller" in G) ? G.labeller : (("createLabeller" in B.getUnit()) ? B.getUnit().createLabeller(this._locale, this._timeZone) : new Timeline.GregorianDateLabeller(this._locale, this._timeZone));
			this._theme = G.theme;
			this._zoomIndex = ("zoomIndex" in G) ? G.zoomIndex : 0;
			this._zoomSteps = ("zoomSteps" in G) ? G.zoomSteps : null;
			this._dragging = false;
			this._changing = false;
			this._originalScrollSpeed = 5;
			this._scrollSpeed = this._originalScrollSpeed;
			this._onScrollListeners = [];
			var A = this;
			this._syncWithBand = null;
			this._syncWithBandHandler = function (H) {
				A._onHighlightBandScroll()
			};
			this._selectorListener = function (H) {
				A._onHighlightBandScroll()
			};
			var E = this._timeline.getDocument().createElement("div");
			E.className = "timeline-band-input";
			this._timeline.addDiv(E);
			this._keyboardInput = document.createElement("input");
			this._keyboardInput.type = "text";
			E.appendChild(this._keyboardInput);
			SimileAjax.DOM.registerEventWithObject(this._keyboardInput, "keydown", this, "_onKeyDown");
			SimileAjax.DOM.registerEventWithObject(this._keyboardInput, "keyup", this, "_onKeyUp");
			this._div = this._timeline.getDocument().createElement("div");
			this._div.id = "timeline-band-" + C;
			this._div.className = "timeline-band timeline-band-" + C;
			this._timeline.addDiv(this._div);
			SimileAjax.DOM.registerEventWithObject(this._div, "mousedown", this, "_onMouseDown");
			SimileAjax.DOM.registerEventWithObject(this._div, "mousemove", this, "_onMouseMove");
			SimileAjax.DOM.registerEventWithObject(this._div, "mouseup", this, "_onMouseUp");
			SimileAjax.DOM.registerEventWithObject(this._div, "mouseout", this, "_onMouseOut");
			SimileAjax.DOM.registerEventWithObject(this._div, "dblclick", this, "_onDblClick");
			var F = this._theme != null ? this._theme.mouseWheel : "scroll";
			if (F === "zoom" || F === "scroll" || this._zoomSteps) {
				if (SimileAjax.Platform.browser.isFirefox) {
					SimileAjax.DOM.registerEventWithObject(this._div, "DOMMouseScroll", this, "_onMouseScroll")
				} else {
					SimileAjax.DOM.registerEventWithObject(this._div, "mousewheel", this, "_onMouseScroll")
				}
			}
			this._innerDiv = this._timeline.getDocument().createElement("div");
			this._innerDiv.className = "timeline-band-inner";
			this._div.appendChild(this._innerDiv);
			this._ether = G.ether;
			G.ether.initialize(this, B);
			this._etherPainter = G.etherPainter;
			G.etherPainter.initialize(this, B);
			this._eventSource = G.eventSource;
			if (this._eventSource) {
				this._eventListener = {
					onAddMany: function () {
						A._onAddMany()
					},
					onClear: function () {
						A._onClear()
					}
				};
				this._eventSource.addListener(this._eventListener)
			}
			this._eventPainter = G.eventPainter;
			this._eventTracksNeeded = 0;
			this._eventTrackIncrement = 0;
			G.eventPainter.initialize(this, B);
			this._decorators = ("decorators" in G) ? G.decorators : [];
			for (var D = 0; D < this._decorators.length; D++) {
				this._decorators[D].initialize(this, B)
			}
		};
		Timeline._Band.SCROLL_MULTIPLES = 5;
		Timeline._Band.prototype.dispose = function () {
			this.closeBubble();
			if (this._eventSource) {
				this._eventSource.removeListener(this._eventListener);
				this._eventListener = null;
				this._eventSource = null
			}
			this._timeline = null;
			this._bandInfo = null;
			this._labeller = null;
			this._ether = null;
			this._etherPainter = null;
			this._eventPainter = null;
			this._decorators = null;
			this._onScrollListeners = null;
			this._syncWithBandHandler = null;
			this._selectorListener = null;
			this._div = null;
			this._innerDiv = null;
			this._keyboardInput = null
		};
		Timeline._Band.prototype.addOnScrollListener = function (A) {
			this._onScrollListeners.push(A)
		};
		Timeline._Band.prototype.removeOnScrollListener = function (B) {
			for (var A = 0; A < this._onScrollListeners.length; A++) {
				if (this._onScrollListeners[A] == B) {
					this._onScrollListeners.splice(A, 1);
					break
				}
			}
		};
		Timeline._Band.prototype.setSyncWithBand = function (B, A) {
			if (this._syncWithBand) {
				this._syncWithBand.removeOnScrollListener(this._syncWithBandHandler)
			}
			this._syncWithBand = B;
			this._syncWithBand.addOnScrollListener(this._syncWithBandHandler);
			this._highlight = A;
			this._positionHighlight()
		};
		Timeline._Band.prototype.getLocale = function () {
			return this._locale
		};
		Timeline._Band.prototype.getTimeZone = function () {
			return this._timeZone
		};
		Timeline._Band.prototype.getLabeller = function () {
			return this._labeller
		};
		Timeline._Band.prototype.getIndex = function () {
			return this._index
		};
		Timeline._Band.prototype.getEther = function () {
			return this._ether
		};
		Timeline._Band.prototype.getEtherPainter = function () {
			return this._etherPainter
		};
		Timeline._Band.prototype.getEventSource = function () {
			return this._eventSource
		};
		Timeline._Band.prototype.getEventPainter = function () {
			return this._eventPainter
		};
		Timeline._Band.prototype.getTimeline = function () {
			return this._timeline
		};
		Timeline._Band.prototype.updateEventTrackInfo = function (A, B) {
			this._eventTrackIncrement = B;
			if (A > this._eventTracksNeeded) {
				this._eventTracksNeeded = A
			}
		};
		Timeline._Band.prototype.checkAutoWidth = function () {
			if (!this._timeline.autoWidth) {
				return
			}
			var C = this._eventPainter.getType() == "overview";
			var A = C ? this._theme.event.overviewTrack.autoWidthMargin : this._theme.event.track.autoWidthMargin;
			var B = Math.ceil((this._eventTracksNeeded + A) * this._eventTrackIncrement);
			B += C ? this._theme.event.overviewTrack.offset : this._theme.event.track.offset;
			var D = this._bandInfo;
			if (B != D.width) {
				D.width = B
			}
		};
		Timeline._Band.prototype.layout = function () {
			this.paint()
		};
		Timeline._Band.prototype.paint = function () {
			this._etherPainter.paint();
			this._paintDecorators();
			this._paintEvents()
		};
		Timeline._Band.prototype.softLayout = function () {
			this.softPaint()
		};
		Timeline._Band.prototype.softPaint = function () {
			this._etherPainter.softPaint();
			this._softPaintDecorators();
			this._softPaintEvents()
		};
		Timeline._Band.prototype.setBandShiftAndWidth = function (A, D) {
			var C = this._keyboardInput.parentNode;
			var B = A + Math.floor(D / 2);
			if (this._timeline.isHorizontal()) {
				this._div.style.top = A + "px";
				this._div.style.height = D + "px";
				C.style.top = B + "px";
				C.style.left = "-1em"
			} else {
				this._div.style.left = A + "px";
				this._div.style.width = D + "px";
				C.style.left = B + "px";
				C.style.top = "-1em"
			}
		};
		Timeline._Band.prototype.getViewWidth = function () {
			if (this._timeline.isHorizontal()) {
				return this._div.offsetHeight
			} else {
				return this._div.offsetWidth
			}
		};
		Timeline._Band.prototype.setViewLength = function (A) {
			this._viewLength = A;
			this._recenterDiv();
			this._onChanging()
		};
		Timeline._Band.prototype.getViewLength = function () {
			return this._viewLength
		};
		Timeline._Band.prototype.getTotalViewLength = function () {
			return Timeline._Band.SCROLL_MULTIPLES * this._viewLength
		};
		Timeline._Band.prototype.getViewOffset = function () {
			return this._viewOffset
		};
		Timeline._Band.prototype.getMinDate = function () {
			return this._ether.pixelOffsetToDate(this._viewOffset)
		};
		Timeline._Band.prototype.getMaxDate = function () {
			return this._ether.pixelOffsetToDate(this._viewOffset + Timeline._Band.SCROLL_MULTIPLES * this._viewLength)
		};
		Timeline._Band.prototype.getMinVisibleDate = function () {
			return this._ether.pixelOffsetToDate(0)
		};
		Timeline._Band.prototype.getMinVisibleDateAfterDelta = function (A) {
			return this._ether.pixelOffsetToDate(A)
		};
		Timeline._Band.prototype.getMaxVisibleDate = function () {
			return this._ether.pixelOffsetToDate(this._viewLength)
		};
		Timeline._Band.prototype.getMaxVisibleDateAfterDelta = function (A) {
			return this._ether.pixelOffsetToDate(this._viewLength + A)
		};
		Timeline._Band.prototype.getCenterVisibleDate = function () {
			return this._ether.pixelOffsetToDate(this._viewLength / 2)
		};
		Timeline._Band.prototype.setMinVisibleDate = function (A) {
			if (!this._changing) {
				this._moveEther(Math.round(-this._ether.dateToPixelOffset(A)))
			}
		};
		Timeline._Band.prototype.setMaxVisibleDate = function (A) {
			if (!this._changing) {
				this._moveEther(Math.round(this._viewLength - this._ether.dateToPixelOffset(A)))
			}
		};
		Timeline._Band.prototype.setCenterVisibleDate = function (A) {
			if (!this._changing) {
				this._moveEther(Math.round(this._viewLength / 2 - this._ether.dateToPixelOffset(A)))
			}
		};
		Timeline._Band.prototype.dateToPixelOffset = function (A) {
			return this._ether.dateToPixelOffset(A) - this._viewOffset
		};
		Timeline._Band.prototype.pixelOffsetToDate = function (A) {
			return this._ether.pixelOffsetToDate(A + this._viewOffset)
		};
		Timeline._Band.prototype.createLayerDiv = function (C, A) {
			var D = this._timeline.getDocument().createElement("div");
			D.className = "timeline-band-layer" + (typeof A == "string" ? (" " + A) : "");
			D.style.zIndex = C;
			this._innerDiv.appendChild(D);
			var B = this._timeline.getDocument().createElement("div");
			B.className = "timeline-band-layer-inner";
			if (SimileAjax.Platform.browser.isIE) {
				B.style.cursor = "move"
			} else {
				B.style.cursor = "-moz-grab"
			}
			D.appendChild(B);
			return B
		};
		Timeline._Band.prototype.removeLayerDiv = function (A) {
			this._innerDiv.removeChild(A.parentNode)
		};
		Timeline._Band.prototype.scrollToCenter = function (A, C) {
			var B = this._ether.dateToPixelOffset(A);
			if (B < -this._viewLength / 2) {
				this.setCenterVisibleDate(this.pixelOffsetToDate(B + this._viewLength))
			} else {
				if (B > 3 * this._viewLength / 2) {
					this.setCenterVisibleDate(this.pixelOffsetToDate(B - this._viewLength))
				}
			}
			this._autoScroll(Math.round(this._viewLength / 2 - this._ether.dateToPixelOffset(A)), C)
		};
		Timeline._Band.prototype.showBubbleForEvent = function (C) {
			var A = this.getEventSource().getEvent(C);
			if (A) {
				var B = this;
				this.scrollToCenter(A.getStart(), function () {
					B._eventPainter.showBubble(A)
				})
			}
		};
		Timeline._Band.prototype.zoom = function (C, A, F, E) {
			if (!this._zoomSteps) {
				return
			}
			A += this._viewOffset;
			var D = this._ether.pixelOffsetToDate(A);
			var B = this._ether.zoom(C);
			this._etherPainter.zoom(B);
			this._moveEther(Math.round(-this._ether.dateToPixelOffset(D)));
			this._moveEther(A)
		};
		Timeline._Band.prototype._onMouseDown = function (B, A, C) {
			this.closeBubble();
			this._dragging = true;
			this._dragX = A.clientX;
			this._dragY = A.clientY
		};
		Timeline._Band.prototype._onMouseMove = function (D, A, E) {
			if (this._dragging) {
				var C = A.clientX - this._dragX;
				var B = A.clientY - this._dragY;
				this._dragX = A.clientX;
				this._dragY = A.clientY;
				this._moveEther(this._timeline.isHorizontal() ? C : B);
				this._positionHighlight()
			}
		};
		Timeline._Band.prototype._onMouseUp = function (B, A, C) {
			this._dragging = false;
			this._keyboardInput.focus()
		};
		Timeline._Band.prototype._onMouseOut = function (C, B, D) {
			var A = SimileAjax.DOM.getEventRelativeCoordinates(B, C);
			A.x += this._viewOffset;
			if (A.x < 0 || A.x > C.offsetWidth || A.y < 0 || A.y > C.offsetHeight) {
				this._dragging = false
			}
		};
		Timeline._Band.prototype._onMouseScroll = function (G, H, B) {
			var A = new Date();
			A = A.getTime();
			if (!this._lastScrollTime || ((A - this._lastScrollTime) > 50)) {
				this._lastScrollTime = A;
				var I = 0;
				if (H.wheelDelta) {
					I = H.wheelDelta / 120
				} else {
					if (H.detail) {
						I = -H.detail / 3
					}
				}
				var F = this._theme.mouseWheel;
				if (this._zoomSteps || F === "zoom") {
					var E = SimileAjax.DOM.getEventRelativeCoordinates(H, G);
					if (I != 0) {
						var D;
						if (I > 0) {
							D = true
						}
						if (I < 0) {
							D = false
						}
						this._timeline.zoom(D, E.x, E.y, G)
					}
				} else {
					if (F === "scroll") {
						var C = 50 * (I < 0 ? -1 : 1);
						this._moveEther(C)
					}
				}
			}
			if (H.stopPropagation) {
				H.stopPropagation()
			}
			H.cancelBubble = true;
			if (H.preventDefault) {
				H.preventDefault()
			}
			H.returnValue = false
		};
		Timeline._Band.prototype._onDblClick = function (C, B, E) {
			var A = SimileAjax.DOM.getEventRelativeCoordinates(B, C);
			var D = A.x - (this._viewLength / 2 - this._viewOffset);
			this._autoScroll(-D)
		};
		Timeline._Band.prototype._onKeyDown = function (B, A, C) {
			if (!this._dragging) {
				switch (A.keyCode) {
					case 27:
						break;
					case 37:
					case 38:
						this._scrollSpeed = Math.min(50, Math.abs(this._scrollSpeed * 1.05));
						this._moveEther(this._scrollSpeed);
						break;
					case 39:
					case 40:
						this._scrollSpeed = -Math.min(50, Math.abs(this._scrollSpeed * 1.05));
						this._moveEther(this._scrollSpeed);
						break;
					default:
						return true
				}
				this.closeBubble();
				SimileAjax.DOM.cancelEvent(A);
				return false
			}
			return true
		};
		Timeline._Band.prototype._onKeyUp = function (B, A, C) {
			if (!this._dragging) {
				this._scrollSpeed = this._originalScrollSpeed;
				switch (A.keyCode) {
					case 35:
						this.setCenterVisibleDate(this._eventSource.getLatestDate());
						break;
					case 36:
						this.setCenterVisibleDate(this._eventSource.getEarliestDate());
						break;
					case 33:
						this._autoScroll(this._timeline.getPixelLength());
						break;
					case 34:
						this._autoScroll(-this._timeline.getPixelLength());
						break;
					default:
						return true
				}
				this.closeBubble();
				SimileAjax.DOM.cancelEvent(A);
				return false
			}
			return true
		};
		Timeline._Band.prototype._autoScroll = function (D, C) {
			var A = this;
			var B = SimileAjax.Graphics.createAnimation(function (E, F) {
				A._moveEther(F)
			}, 0, D, 1000, C);
			B.run()
		};
		Timeline._Band.prototype._moveEther = function (A) {
			this.closeBubble();
			if (!this._timeline.shiftOK(this._index, A)) {
				return
			}
			this._viewOffset += A;
			this._ether.shiftPixels(-A);
			if (this._timeline.isHorizontal()) {
				this._div.style.left = this._viewOffset + "px"
			} else {
				this._div.style.top = this._viewOffset + "px"
			}
			if (this._viewOffset > -this._viewLength * 0.5 || this._viewOffset < -this._viewLength * (Timeline._Band.SCROLL_MULTIPLES - 1.5)) {
				this._recenterDiv()
			} else {
				this.softLayout()
			}
			this._onChanging()
		};
		Timeline._Band.prototype._onChanging = function () {
			this._changing = true;
			this._fireOnScroll();
			this._setSyncWithBandDate();
			this._changing = false
		};
		Timeline._Band.prototype.busy = function () {
			return (this._changing)
		};
		Timeline._Band.prototype._fireOnScroll = function () {
			for (var A = 0; A < this._onScrollListeners.length; A++) {
				this._onScrollListeners[A](this)
			}
		};
		Timeline._Band.prototype._setSyncWithBandDate = function () {
			if (this._syncWithBand) {
				var A = this._ether.pixelOffsetToDate(this.getViewLength() / 2);
				this._syncWithBand.setCenterVisibleDate(A)
			}
		};
		Timeline._Band.prototype._onHighlightBandScroll = function () {
			if (this._syncWithBand) {
				var A = this._syncWithBand.getCenterVisibleDate();
				var B = this._ether.dateToPixelOffset(A);
				this._moveEther(Math.round(this._viewLength / 2 - B));
				if (this._highlight) {
					this._etherPainter.setHighlight(this._syncWithBand.getMinVisibleDate(), this._syncWithBand.getMaxVisibleDate())
				}
			}
		};
		Timeline._Band.prototype._onAddMany = function () {
			this._paintEvents()
		};
		Timeline._Band.prototype._onClear = function () {
			this._paintEvents()
		};
		Timeline._Band.prototype._positionHighlight = function () {
			if (this._syncWithBand) {
				var A = this._syncWithBand.getMinVisibleDate();
				var B = this._syncWithBand.getMaxVisibleDate();
				if (this._highlight) {
					this._etherPainter.setHighlight(A, B)
				}
			}
		};
		Timeline._Band.prototype._recenterDiv = function () {
			this._viewOffset = -this._viewLength * (Timeline._Band.SCROLL_MULTIPLES - 1) / 2;
			if (this._timeline.isHorizontal()) {
				this._div.style.left = this._viewOffset + "px";
				this._div.style.width = (Timeline._Band.SCROLL_MULTIPLES * this._viewLength) + "px"
			} else {
				this._div.style.top = this._viewOffset + "px";
				this._div.style.height = (Timeline._Band.SCROLL_MULTIPLES * this._viewLength) + "px"
			}
			this.layout()
		};
		Timeline._Band.prototype._paintEvents = function () {
			this._eventPainter.paint()
		};
		Timeline._Band.prototype._softPaintEvents = function () {
			this._eventPainter.softPaint()
		};
		Timeline._Band.prototype._paintDecorators = function () {
			for (var A = 0; A < this._decorators.length; A++) {
				this._decorators[A].paint()
			}
		};
		Timeline._Band.prototype._softPaintDecorators = function () {
			for (var A = 0; A < this._decorators.length; A++) {
				this._decorators[A].softPaint()
			}
		};
		Timeline._Band.prototype.closeBubble = function () {
			SimileAjax.WindowManager.cancelPopups()
		};
		Timeline.CompactEventPainter = function (A) {
			this._params = A;
			this._onSelectListeners = [];
			this._filterMatcher = null;
			this._highlightMatcher = null;
			this._frc = null;
			this._eventIdToElmt = {}
		};
		Timeline.CompactEventPainter.prototype.initialize = function (B, A) {
			this._band = B;
			this._timeline = A;
			this._backLayer = null;
			this._eventLayer = null;
			this._lineLayer = null;
			this._highlightLayer = null;
			this._eventIdToElmt = null
		};
		Timeline.CompactEventPainter.prototype.addOnSelectListener = function (A) {
			this._onSelectListeners.push(A)
		};
		Timeline.CompactEventPainter.prototype.removeOnSelectListener = function (B) {
			for (var A = 0; A < this._onSelectListeners.length; A++) {
				if (this._onSelectListeners[A] == B) {
					this._onSelectListeners.splice(A, 1);
					break
				}
			}
		};
		Timeline.CompactEventPainter.prototype.getFilterMatcher = function () {
			return this._filterMatcher
		};
		Timeline.CompactEventPainter.prototype.setFilterMatcher = function (A) {
			this._filterMatcher = A
		};
		Timeline.CompactEventPainter.prototype.getHighlightMatcher = function () {
			return this._highlightMatcher
		};
		Timeline.CompactEventPainter.prototype.setHighlightMatcher = function (A) {
			this._highlightMatcher = A
		};
		Timeline.CompactEventPainter.prototype.paint = function () {
			var N = this._band.getEventSource();
			if (N == null) {
				return
			}
			this._eventIdToElmt = {};
			this._prepareForPainting();
			var O = this._params.theme;
			var L = O.event;
			var G = {
				trackOffset: "trackOffset" in this._params ? this._params.trackOffset : 10,
				trackHeight: "trackHeight" in this._params ? this._params.trackHeight : 10,
				tapeHeight: O.event.tape.height,
				tapeBottomMargin: "tapeBottomMargin" in this._params ? this._params.tapeBottomMargin : 2,
				labelBottomMargin: "labelBottomMargin" in this._params ? this._params.labelBottomMargin : 5,
				labelRightMargin: "labelRightMargin" in this._params ? this._params.labelRightMargin : 5,
				defaultIcon: L.instant.icon,
				defaultIconWidth: L.instant.iconWidth,
				defaultIconHeight: L.instant.iconHeight,
				customIconWidth: "iconWidth" in this._params ? this._params.iconWidth : L.instant.iconWidth,
				customIconHeight: "iconHeight" in this._params ? this._params.iconHeight : L.instant.iconHeight,
				iconLabelGap: "iconLabelGap" in this._params ? this._params.iconLabelGap : 2,
				iconBottomMargin: "iconBottomMargin" in this._params ? this._params.iconBottomMargin : 2
			};
			if ("compositeIcon" in this._params) {
				G.compositeIcon = this._params.compositeIcon;
				G.compositeIconWidth = this._params.compositeIconWidth || G.customIconWidth;
				G.compositeIconHeight = this._params.compositeIconHeight || G.customIconHeight
			} else {
				G.compositeIcon = G.defaultIcon;
				G.compositeIconWidth = G.defaultIconWidth;
				G.compositeIconHeight = G.defaultIconHeight
			}
			G.defaultStackIcon = "icon" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.icon : G.defaultIcon;
			G.defaultStackIconWidth = "iconWidth" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.iconWidth : G.defaultIconWidth;
			G.defaultStackIconHeight = "iconHeight" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.iconHeight : G.defaultIconHeight;
			var B = this._band.getMinDate();
			var D = this._band.getMaxDate();
			var R = (this._filterMatcher != null) ? this._filterMatcher : function (S) {
					return true
				};
			var Q = (this._highlightMatcher != null) ? this._highlightMatcher : function (S) {
					return -1
				};
			var F = N.getEventIterator(B, D);
			var H = "stackConcurrentPreciseInstantEvents" in this._params && typeof this._params.stackConcurrentPreciseInstantEvents == "object";
			var P = "collapseConcurrentPreciseInstantEvents" in this._params && this._params.collapseConcurrentPreciseInstantEvents;
			if (P || H) {
				var M = [];
				var A = null;
				while (F.hasNext()) {
					var E = F.next();
					if (R(E)) {
						if (!E.isInstant() || E.isImprecise()) {
							this.paintEvent(E, G, this._params.theme, Q(E))
						} else {
							if (A != null && A.getStart().getTime() == E.getStart().getTime()) {
								M[M.length - 1].push(E)
							} else {
								M.push([E]);
								A = E
							}
						}
					}
				}
				for (var J = 0; J < M.length; J++) {
					var K = M[J];
					if (K.length == 1) {
						this.paintEvent(K[0], G, this._params.theme, Q(E))
					} else {
						var C = -1;
						for (var I = 0; C < 0 && I < K.length; I++) {
							C = Q(K[I])
						}
						if (H) {
							this.paintStackedPreciseInstantEvents(K, G, this._params.theme, C)
						} else {
							this.paintCompositePreciseInstantEvents(K, G, this._params.theme, C)
						}
					}
				}
			} else {
				while (F.hasNext()) {
					var E = F.next();
					if (R(E)) {
						this.paintEvent(E, G, this._params.theme, Q(E))
					}
				}
			}
			this._highlightLayer.style.display = "block";
			this._lineLayer.style.display = "block";
			this._eventLayer.style.display = "block"
		};
		Timeline.CompactEventPainter.prototype.softPaint = function () {};
		Timeline.CompactEventPainter.prototype._prepareForPainting = function () {
			var B = this._band;
			if (this._backLayer == null) {
				this._backLayer = this._band.createLayerDiv(0, "timeline-band-events");
				this._backLayer.style.visibility = "hidden";
				var A = document.createElement("span");
				A.className = "timeline-event-label";
				this._backLayer.appendChild(A);
				this._frc = SimileAjax.Graphics.getFontRenderingContext(A)
			}
			this._frc.update();
			this._tracks = [];
			if (this._highlightLayer != null) {
				B.removeLayerDiv(this._highlightLayer)
			}
			this._highlightLayer = B.createLayerDiv(105, "timeline-band-highlights");
			this._highlightLayer.style.display = "none";
			if (this._lineLayer != null) {
				B.removeLayerDiv(this._lineLayer)
			}
			this._lineLayer = B.createLayerDiv(110, "timeline-band-lines");
			this._lineLayer.style.display = "none";
			if (this._eventLayer != null) {
				B.removeLayerDiv(this._eventLayer)
			}
			this._eventLayer = B.createLayerDiv(115, "timeline-band-events");
			this._eventLayer.style.display = "none"
		};
		Timeline.CompactEventPainter.prototype.paintEvent = function (B, C, D, A) {
			if (B.isInstant()) {
				this.paintInstantEvent(B, C, D, A)
			} else {
				this.paintDurationEvent(B, C, D, A)
			}
		};
		Timeline.CompactEventPainter.prototype.paintInstantEvent = function (B, C, D, A) {
			if (B.isImprecise()) {
				this.paintImpreciseInstantEvent(B, C, D, A)
			} else {
				this.paintPreciseInstantEvent(B, C, D, A)
			}
		};
		Timeline.CompactEventPainter.prototype.paintDurationEvent = function (B, C, D, A) {
			if (B.isImprecise()) {
				this.paintImpreciseDurationEvent(B, C, D, A)
			} else {
				this.paintPreciseDurationEvent(B, C, D, A)
			}
		};
		Timeline.CompactEventPainter.prototype.paintPreciseInstantEvent = function (H, F, B, A) {
			var C = {
				tooltip: H.getProperty("tooltip") || H.getText()
			};
			var E = {
				url: H.getIcon()
			};
			if (E.url == null) {
				E.url = F.defaultIcon;
				E.width = F.defaultIconWidth;
				E.height = F.defaultIconHeight;
				E.className = "timeline-event-icon-default"
			} else {
				E.width = H.getProperty("iconWidth") || F.customIconWidth;
				E.height = H.getProperty("iconHeight") || F.customIconHeight
			}
			var J = {
				text: H.getText(),
				color: H.getTextColor() || H.getColor(),
				className: H.getClassName()
			};
			var G = this.paintTapeIconLabel(H.getStart(), C, null, E, J, F, B, A);
			var I = this;
			var D = function (L, K, M) {
				return I._onClickInstantEvent(G.iconElmtData.elmt, K, H)
			};
			SimileAjax.DOM.registerEvent(G.iconElmtData.elmt, "mousedown", D);
			SimileAjax.DOM.registerEvent(G.labelElmtData.elmt, "mousedown", D);
			this._eventIdToElmt[H.getID()] = G.iconElmtData.elmt
		};
		Timeline.CompactEventPainter.prototype.paintCompositePreciseInstantEvents = function (J, H, D, B) {
			var K = J[0];
			var A = [];
			for (var C = 0; C < J.length; C++) {
				A.push(J[C].getProperty("tooltip") || J[C].getText())
			}
			var E = {
				tooltip: A.join("; ")
			};
			var G = {
				url: H.compositeIcon,
				width: H.compositeIconWidth,
				height: H.compositeIconHeight,
				className: "timeline-event-icon-composite"
			};
			var M = {
				text: String.substitute(this._params.compositeEventLabelTemplate, [J.length])
			};
			var I = this.paintTapeIconLabel(K.getStart(), E, null, G, M, H, D, B);
			var L = this;
			var F = function (O, N, P) {
				return L._onClickMultiplePreciseInstantEvent(I.iconElmtData.elmt, N, J)
			};
			SimileAjax.DOM.registerEvent(I.iconElmtData.elmt, "mousedown", F);
			SimileAjax.DOM.registerEvent(I.labelElmtData.elmt, "mousedown", F);
			for (var C = 0; C < J.length; C++) {
				this._eventIdToElmt[J[C].getID()] = I.iconElmtData.elmt
			}
		};
		Timeline.CompactEventPainter.prototype.paintStackedPreciseInstantEvents = function (T, j, c, E) {
			var S = "limit" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.limit : 10;
			var G = "moreMessageTemplate" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.moreMessageTemplate : "%0 More Events";
			var Q = S <= T.length - 2;
			var B = this._band;
			var L = function (i) {
				return Math.round(B.dateToPixelOffset(i))
			};
			var O = function (i) {
				var r = {
					url: i.getIcon()
				};
				if (r.url == null) {
					r.url = j.defaultStackIcon;
					r.width = j.defaultStackIconWidth;
					r.height = j.defaultStackIconHeight;
					r.className = "timeline-event-icon-stack timeline-event-icon-default"
				} else {
					r.width = i.getProperty("iconWidth") || j.customIconWidth;
					r.height = i.getProperty("iconHeight") || j.customIconHeight;
					r.className = "timeline-event-icon-stack"
				}
				return r
			};
			var C = O(T[0]);
			var V = 5;
			var D = 0;
			var g = 0;
			var p = 0;
			var U = 0;
			var l = [];
			for (var n = 0; n < T.length && (!Q || n < S); n++) {
				var b = T[n];
				var a = b.getText();
				var X = O(b);
				var W = this._frc.computeSize(a);
				var K = {
					text: a,
					iconData: X,
					labelSize: W,
					iconLeft: C.width + n * V - X.width
				};
				K.labelLeft = C.width + n * V + j.iconLabelGap;
				K.top = p;
				l.push(K);
				D = Math.min(D, K.iconLeft);
				p += W.height;
				g = Math.max(g, K.labelLeft + W.width);
				U = Math.max(U, K.top + X.height)
			}
			if (Q) {
				var e = String.substitute(G, [T.length - S]);
				var H = this._frc.computeSize(e);
				var J = C.width + (S - 1) * V + j.iconLabelGap;
				var m = p;
				p += H.height;
				g = Math.max(g, J + H.width)
			}
			g += j.labelRightMargin;
			p += j.labelBottomMargin;
			U += j.iconBottomMargin;
			var F = L(T[0].getStart());
			var Y = [];
			var N = Math.ceil(Math.max(U, p) / j.trackHeight);
			var M = C.width + (T.length - 1) * V;
			for (var n = 0; n < N; n++) {
				Y.push({
					start: D,
					end: M
				})
			}
			var f = Math.ceil(p / j.trackHeight);
			for (var n = 0; n < f; n++) {
				var P = Y[n];
				P.end = Math.max(P.end, g)
			}
			var k = this._fitTracks(F, Y);
			var Z = k * j.trackHeight + j.trackOffset;
			var q = this._timeline.getDocument().createElement("div");
			q.className = "timeline-event-icon-stack";
			q.style.position = "absolute";
			q.style.overflow = "visible";
			q.style.left = F + "px";
			q.style.top = Z + "px";
			q.style.width = M + "px";
			q.style.height = U + "px";
			q.innerHTML = "<div style='position: relative'></div>";
			this._eventLayer.appendChild(q);
			var I = this;
			var R = function (r) {
				try {
					var w = parseInt(this.getAttribute("index"));
					var u = q.firstChild.childNodes;
					for (var s = 0; s < u.length; s++) {
						var v = u[s];
						if (s == w) {
							v.style.zIndex = u.length
						} else {
							v.style.zIndex = u.length - s
						}
					}
				} catch (t) {}
			};
			var d = function (u) {
				var w = l[u];
				var r = T[u];
				var i = r.getProperty("tooltip") || r.getText();
				var v = I._paintEventLabel({
					tooltip: i
				}, {
					text: w.text
				}, F + w.labelLeft, Z + w.top, w.labelSize.width, w.labelSize.height, c);
				v.elmt.setAttribute("index", u);
				v.elmt.onmouseover = R;
				var t = SimileAjax.Graphics.createTranslucentImage(w.iconData.url);
				var s = I._timeline.getDocument().createElement("div");
				s.className = "timeline-event-icon" + ("className" in w.iconData ? (" " + w.iconData.className) : "");
				s.style.left = w.iconLeft + "px";
				s.style.top = w.top + "px";
				s.style.zIndex = (l.length - u);
				s.appendChild(t);
				s.setAttribute("index", u);
				s.onmouseover = R;
				q.firstChild.appendChild(s);
				var x = function (z, y, AA) {
					return I._onClickInstantEvent(v.elmt, y, r)
				};
				SimileAjax.DOM.registerEvent(s, "mousedown", x);
				SimileAjax.DOM.registerEvent(v.elmt, "mousedown", x);
				I._eventIdToElmt[r.getID()] = s
			};
			for (var n = 0; n < l.length; n++) {
				d(n)
			}
			if (Q) {
				var o = T.slice(S);
				var A = this._paintEventLabel({
					tooltip: e
				}, {
					text: e
				}, F + J, Z + m, H.width, H.height, c);
				var h = function (r, i, s) {
					return I._onClickMultiplePreciseInstantEvent(A.elmt, i, o)
				};
				SimileAjax.DOM.registerEvent(A.elmt, "mousedown", h);
				for (var n = 0; n < o.length; n++) {
					this._eventIdToElmt[o[n].getID()] = A.elmt
				}
			}
		};
		Timeline.CompactEventPainter.prototype.paintImpreciseInstantEvent = function (I, G, B, A) {
			var C = {
				tooltip: I.getProperty("tooltip") || I.getText()
			};
			var E = {
				start: I.getStart(),
				end: I.getEnd(),
				latestStart: I.getLatestStart(),
				earliestEnd: I.getEarliestEnd(),
				isInstant: true
			};
			var F = {
				url: I.getIcon()
			};
			if (F.url == null) {
				F = null
			} else {
				F.width = I.getProperty("iconWidth") || G.customIconWidth;
				F.height = I.getProperty("iconHeight") || G.customIconHeight
			}
			var K = {
				text: I.getText(),
				color: I.getTextColor() || I.getColor(),
				className: I.getClassName()
			};
			var H = this.paintTapeIconLabel(I.getStart(), C, E, F, K, G, B, A);
			var J = this;
			var D = F != null ? function (M, L, N) {
					return J._onClickInstantEvent(H.iconElmtData.elmt, L, I)
				} : function (M, L, N) {
					return J._onClickInstantEvent(H.labelElmtData.elmt, L, I)
				};
			SimileAjax.DOM.registerEvent(H.labelElmtData.elmt, "mousedown", D);
			SimileAjax.DOM.registerEvent(H.impreciseTapeElmtData.elmt, "mousedown", D);
			if (F != null) {
				SimileAjax.DOM.registerEvent(H.iconElmtData.elmt, "mousedown", D);
				this._eventIdToElmt[I.getID()] = H.iconElmtData.elmt
			} else {
				this._eventIdToElmt[I.getID()] = H.labelElmtData.elmt
			}
		};
		Timeline.CompactEventPainter.prototype.paintPreciseDurationEvent = function (I, G, B, A) {
			var C = {
				tooltip: I.getProperty("tooltip") || I.getText()
			};
			var E = {
				start: I.getStart(),
				end: I.getEnd(),
				isInstant: false
			};
			var F = {
				url: I.getIcon()
			};
			if (F.url == null) {
				F = null
			} else {
				F.width = I.getProperty("iconWidth") || G.customIconWidth;
				F.height = I.getProperty("iconHeight") || G.customIconHeight
			}
			var K = {
				text: I.getText(),
				color: I.getTextColor() || I.getColor(),
				className: I.getClassName()
			};
			var H = this.paintTapeIconLabel(I.getLatestStart(), C, E, F, K, G, B, A);
			var J = this;
			var D = F != null ? function (M, L, N) {
					return J._onClickInstantEvent(H.iconElmtData.elmt, L, I)
				} : function (M, L, N) {
					return J._onClickInstantEvent(H.labelElmtData.elmt, L, I)
				};
			SimileAjax.DOM.registerEvent(H.labelElmtData.elmt, "mousedown", D);
			SimileAjax.DOM.registerEvent(H.tapeElmtData.elmt, "mousedown", D);
			if (F != null) {
				SimileAjax.DOM.registerEvent(H.iconElmtData.elmt, "mousedown", D);
				this._eventIdToElmt[I.getID()] = H.iconElmtData.elmt
			} else {
				this._eventIdToElmt[I.getID()] = H.labelElmtData.elmt
			}
		};
		Timeline.CompactEventPainter.prototype.paintImpreciseDurationEvent = function (I, G, B, A) {
			var C = {
				tooltip: I.getProperty("tooltip") || I.getText()
			};
			var E = {
				start: I.getStart(),
				end: I.getEnd(),
				latestStart: I.getLatestStart(),
				earliestEnd: I.getEarliestEnd(),
				isInstant: false
			};
			var F = {
				url: I.getIcon()
			};
			if (F.url == null) {
				F = null
			} else {
				F.width = I.getProperty("iconWidth") || G.customIconWidth;
				F.height = I.getProperty("iconHeight") || G.customIconHeight
			}
			var K = {
				text: I.getText(),
				color: I.getTextColor() || I.getColor(),
				className: I.getClassName()
			};
			var H = this.paintTapeIconLabel(I.getLatestStart(), C, E, F, K, G, B, A);
			var J = this;
			var D = F != null ? function (M, L, N) {
					return J._onClickInstantEvent(H.iconElmtData.elmt, L, I)
				} : function (M, L, N) {
					return J._onClickInstantEvent(H.labelElmtData.elmt, L, I)
				};
			SimileAjax.DOM.registerEvent(H.labelElmtData.elmt, "mousedown", D);
			SimileAjax.DOM.registerEvent(H.tapeElmtData.elmt, "mousedown", D);
			if (F != null) {
				SimileAjax.DOM.registerEvent(H.iconElmtData.elmt, "mousedown", D);
				this._eventIdToElmt[I.getID()] = H.iconElmtData.elmt
			} else {
				this._eventIdToElmt[I.getID()] = H.labelElmtData.elmt
			}
		};
		Timeline.CompactEventPainter.prototype.paintTapeIconLabel = function (V, O, S, I, a, X, c, Z) {
			var R = this._band;
			var F = function (e) {
				return Math.round(R.dateToPixelOffset(e))
			};
			var d = F(V);
			var W = [];
			var b = 0;
			var B = 0;
			var C = 0;
			if (S != null) {
				b = X.tapeHeight + X.tapeBottomMargin;
				B = Math.ceil(X.tapeHeight / X.trackHeight);
				var A = F(S.end) - d;
				var L = F(S.start) - d;
				for (var Q = 0; Q < B; Q++) {
					W.push({
						start: L,
						end: A
					})
				}
				C = X.trackHeight - (b % X.tapeHeight)
			}
			var N = 0;
			var U = 0;
			if (I != null) {
				if ("iconAlign" in I && I.iconAlign == "center") {
					N = -Math.floor(I.width / 2)
				}
				U = N + I.width + X.iconLabelGap;
				if (B > 0) {
					W[B - 1].end = Math.max(W[B - 1].end, U)
				}
				var E = I.height + X.iconBottomMargin + C;
				while (E > 0) {
					W.push({
						start: N,
						end: U
					});
					E -= X.trackHeight
				}
			}
			var P = a.text;
			var H = this._frc.computeSize(P);
			var M = H.height + X.labelBottomMargin + C;
			var J = U + H.width + X.labelRightMargin;
			if (B > 0) {
				W[B - 1].end = Math.max(W[B - 1].end, J)
			}
			for (var Y = 0; M > 0; Y++) {
				if (B + Y < W.length) {
					var T = W[B + Y];
					T.end = J
				} else {
					W.push({
						start: 0,
						end: J
					})
				}
				M -= X.trackHeight
			}
			var G = this._fitTracks(d, W);
			var K = G * X.trackHeight + X.trackOffset;
			var D = {};
			D.labelElmtData = this._paintEventLabel(O, a, d + U, K + b, H.width, H.height, c);
			if (S != null) {
				if ("latestStart" in S || "earliestEnd" in S) {
					D.impreciseTapeElmtData = this._paintEventTape(O, S, X.tapeHeight, K, F(S.start), F(S.end), c.event.duration.impreciseColor, c.event.duration.impreciseOpacity, X, c)
				}
				if (!S.isInstant && "start" in S && "end" in S) {
					D.tapeElmtData = this._paintEventTape(O, S, X.tapeHeight, K, d, F("earliestEnd" in S ? S.earliestEnd : S.end), S.color, 100, X, c)
				}
			}
			if (I != null) {
				D.iconElmtData = this._paintEventIcon(O, I, K + b, d + N, X, c)
			}
			return D
		};
		Timeline.CompactEventPainter.prototype._fitTracks = function (F, C) {
			var H;
			for (H = 0; H < this._tracks.length; H++) {
				var E = true;
				for (var B = 0; B < C.length && (H + B) < this._tracks.length; B++) {
					var G = this._tracks[H + B];
					var A = C[B];
					if (F + A.start < G) {
						E = false;
						break
					}
				}
				if (E) {
					break
				}
			}
			for (var D = 0; D < C.length; D++) {
				this._tracks[H + D] = F + C[D].end
			}
			return H
		};
		Timeline.CompactEventPainter.prototype._paintEventIcon = function (C, D, H, G, E, F) {
			var B = SimileAjax.Graphics.createTranslucentImage(D.url);
			var A = this._timeline.getDocument().createElement("div");
			A.className = "timeline-event-icon" + ("className" in D ? (" " + D.className) : "");
			A.style.left = G + "px";
			A.style.top = H + "px";
			A.appendChild(B);
			if ("tooltip" in C && typeof C.tooltip == "string") {
				A.title = C.tooltip
			}
			this._eventLayer.appendChild(A);
			return {
				left: G,
				top: H,
				width: E.iconWidth,
				height: E.iconHeight,
				elmt: A
			}
		};
		Timeline.CompactEventPainter.prototype._paintEventLabel = function (E, I, C, F, A, G, D) {
			var H = this._timeline.getDocument();
			var B = H.createElement("div");
			B.className = "timeline-event-label";
			B.style.left = C + "px";
			B.style.width = (A + 1) + "px";
			B.style.top = F + "px";
			B.innerHTML = I.text;
			if ("tooltip" in E && typeof E.tooltip == "string") {
				B.title = E.tooltip
			}
			if ("color" in I && typeof I.color == "string") {
				B.style.color = I.color
			}
			if ("className" in I && typeof I.className == "string") {
				B.className += " " + I.className
			}
			this._eventLayer.appendChild(B);
			return {
				left: C,
				top: F,
				width: A,
				height: G,
				elmt: B
			}
		};
		Timeline.CompactEventPainter.prototype._paintEventTape = function (G, H, K, J, D, A, E, C, I, F) {
			var B = A - D;
			var L = this._timeline.getDocument().createElement("div");
			L.className = "timeline-event-tape";
			L.style.left = D + "px";
			L.style.top = J + "px";
			L.style.width = B + "px";
			L.style.height = K + "px";
			if ("tooltip" in G && typeof G.tooltip == "string") {
				L.title = G.tooltip
			}
			if (E != null && typeof H.color == "string") {
				L.style.backgroundColor = E
			}
			if ("backgroundImage" in H && typeof H.backgroundImage == "string") {
				L.style.backgroundImage = "url(" + backgroundImage + ")";
				L.style.backgroundRepeat = ("backgroundRepeat" in H && typeof H.backgroundRepeat == "string") ? H.backgroundRepeat : "repeat"
			}
			SimileAjax.Graphics.setOpacity(L, C);
			if ("className" in H && typeof H.className == "string") {
				L.className += " " + H.className
			}
			this._eventLayer.appendChild(L);
			return {
				left: D,
				top: J,
				width: B,
				height: K,
				elmt: L
			}
		};
		Timeline.CompactEventPainter.prototype._createHighlightDiv = function (A, C, E) {
			if (A >= 0) {
				var D = this._timeline.getDocument();
				var G = E.event;
				var B = G.highlightColors[Math.min(A, G.highlightColors.length - 1)];
				var F = D.createElement("div");
				F.style.position = "absolute";
				F.style.overflow = "hidden";
				F.style.left = (C.left - 2) + "px";
				F.style.width = (C.width + 4) + "px";
				F.style.top = (C.top - 2) + "px";
				F.style.height = (C.height + 4) + "px";
				this._highlightLayer.appendChild(F)
			}
		};
		Timeline.CompactEventPainter.prototype._onClickMultiplePreciseInstantEvent = function (E, A, B) {
			var F = SimileAjax.DOM.getPageCoordinates(E);
			this._showBubble(F.left + Math.ceil(E.offsetWidth / 2), F.top + Math.ceil(E.offsetHeight / 2), B);
			var D = [];
			for (var C = 0; C < B.length; C++) {
				D.push(B[C].getID())
			}
			this._fireOnSelect(D);
			A.cancelBubble = true;
			SimileAjax.DOM.cancelEvent(A);
			return false
		};
		Timeline.CompactEventPainter.prototype._onClickInstantEvent = function (C, A, B) {
			var D = SimileAjax.DOM.getPageCoordinates(C);
			this._showBubble(D.left + Math.ceil(C.offsetWidth / 2), D.top + Math.ceil(C.offsetHeight / 2), [B]);
			this._fireOnSelect([B.getID()]);
			A.cancelBubble = true;
			SimileAjax.DOM.cancelEvent(A);
			return false
		};
		Timeline.CompactEventPainter.prototype._onClickDurationEvent = function (F, B, C) {
			if ("pageX" in B) {
				var A = B.pageX;
				var E = B.pageY
			} else {
				var D = SimileAjax.DOM.getPageCoordinates(F);
				var A = B.offsetX + D.left;
				var E = B.offsetY + D.top
			}
			this._showBubble(A, E, [C]);
			this._fireOnSelect([C.getID()]);
			B.cancelBubble = true;
			SimileAjax.DOM.cancelEvent(B);
			return false
		};
		Timeline.CompactEventPainter.prototype.showBubble = function (A) {
			var B = this._eventIdToElmt[A.getID()];
			if (B) {
				var C = SimileAjax.DOM.getPageCoordinates(B);
				this._showBubble(C.left + B.offsetWidth / 2, C.top + B.offsetHeight / 2, [A])
			}
		};
		Timeline.CompactEventPainter.prototype._showBubble = function (A, F, B) {
			var E = document.createElement("div");
			B = ("fillInfoBubble" in B) ? [B] : B;
			for (var D = 0; D < B.length; D++) {
				var C = document.createElement("div");
				E.appendChild(C);
				B[D].fillInfoBubble(C, this._params.theme, this._band.getLabeller())
			}
			SimileAjax.WindowManager.cancelPopups();
			SimileAjax.Graphics.createBubbleForContentAndPoint(E, A, F, this._params.theme.event.bubble.width)
		};
		Timeline.CompactEventPainter.prototype._fireOnSelect = function (B) {
			for (var A = 0; A < this._onSelectListeners.length; A++) {
				this._onSelectListeners[A](B)
			}
		};
		Timeline.SpanHighlightDecorator = function (A) {
			this._unit = A.unit != null ? A.unit : SimileAjax.NativeDateUnit;
			this._startDate = (typeof A.startDate == "string") ? this._unit.parseFromObject(A.startDate) : A.startDate;
			this._endDate = (typeof A.endDate == "string") ? this._unit.parseFromObject(A.endDate) : A.endDate;
			this._startLabel = A.startLabel != null ? A.startLabel : "";
			this._endLabel = A.endLabel != null ? A.endLabel : "";
			this._color = A.color;
			this._cssClass = A.cssClass != null ? A.cssClass : null;
			this._opacity = A.opacity != null ? A.opacity : 100;
			this._zIndex = (A.inFront != null && A.inFront) ? 113 : 10
		};
		Timeline.SpanHighlightDecorator.prototype.initialize = function (B, A) {
			this._band = B;
			this._timeline = A;
			this._layerDiv = null
		};
		Timeline.SpanHighlightDecorator.prototype.paint = function () {
			if (this._layerDiv != null) {
				this._band.removeLayerDiv(this._layerDiv)
			}
			this._layerDiv = this._band.createLayerDiv(this._zIndex);
			this._layerDiv.setAttribute("name", "span-highlight-decorator");
			this._layerDiv.style.display = "none";
			var E = this._band.getMinDate();
			var A = this._band.getMaxDate();
			if (this._unit.compare(this._startDate, A) < 0 && this._unit.compare(this._endDate, E) > 0) {
				E = this._unit.later(E, this._startDate);
				A = this._unit.earlier(A, this._endDate);
				var F = this._band.dateToPixelOffset(E);
				var I = this._band.dateToPixelOffset(A);
				var H = this._timeline.getDocument();
				var K = function () {
					var L = H.createElement("table");
					L.insertRow(0).insertCell(0);
					return L
				};
				var B = H.createElement("div");
				B.className = "timeline-highlight-decorator";
				if (this._cssClass) {
					B.className += " " + this._cssClass
				}
				if (this._color != null) {
					B.style.backgroundColor = this._color
				}
				if (this._opacity < 100) {
					SimileAjax.Graphics.setOpacity(B, this._opacity)
				}
				this._layerDiv.appendChild(B);
				var J = K();
				J.className = "timeline-highlight-label timeline-highlight-label-start";
				var C = J.rows[0].cells[0];
				C.innerHTML = this._startLabel;
				if (this._cssClass) {
					C.className = "label_" + this._cssClass
				}
				this._layerDiv.appendChild(J);
				var G = K();
				G.className = "timeline-highlight-label timeline-highlight-label-end";
				var D = G.rows[0].cells[0];
				D.innerHTML = this._endLabel;
				if (this._cssClass) {
					D.className = "label_" + this._cssClass
				}
				this._layerDiv.appendChild(G);
				if (this._timeline.isHorizontal()) {
					B.style.left = F + "px";
					B.style.width = (I - F) + "px";
					J.style.right = (this._band.getTotalViewLength() - F) + "px";
					J.style.width = (this._startLabel.length) + "em";
					G.style.left = I + "px";
					G.style.width = (this._endLabel.length) + "em"
				} else {
					B.style.top = F + "px";
					B.style.height = (I - F) + "px";
					J.style.bottom = F + "px";
					J.style.height = "1.5px";
					G.style.top = I + "px";
					G.style.height = "1.5px"
				}
			}
			this._layerDiv.style.display = "block"
		};
		Timeline.SpanHighlightDecorator.prototype.softPaint = function () {};
		Timeline.PointHighlightDecorator = function (A) {
			this._unit = A.unit != null ? A.unit : SimileAjax.NativeDateUnit;
			this._date = (typeof A.date == "string") ? this._unit.parseFromObject(A.date) : A.date;
			this._width = A.width != null ? A.width : 10;
			this._color = A.color;
			this._cssClass = A.cssClass != null ? A.cssClass : "";
			this._opacity = A.opacity != null ? A.opacity : 100
		};
		Timeline.PointHighlightDecorator.prototype.initialize = function (B, A) {
			this._band = B;
			this._timeline = A;
			this._layerDiv = null
		};
		Timeline.PointHighlightDecorator.prototype.paint = function () {
			if (this._layerDiv != null) {
				this._band.removeLayerDiv(this._layerDiv)
			}
			this._layerDiv = this._band.createLayerDiv(10);
			this._layerDiv.setAttribute("name", "span-highlight-decorator");
			this._layerDiv.style.display = "none";
			var C = this._band.getMinDate();
			var E = this._band.getMaxDate();
			if (this._unit.compare(this._date, E) < 0 && this._unit.compare(this._date, C) > 0) {
				var A = this._band.dateToPixelOffset(this._date);
				var B = A - Math.round(this._width / 2);
				var D = this._timeline.getDocument();
				var F = D.createElement("div");
				F.className = "timeline-highlight-point-decorator";
				F.className += " " + this._cssClass;
				if (this._color != null) {
					F.style.backgroundColor = this._color
				}
				if (this._opacity < 100) {
					SimileAjax.Graphics.setOpacity(F, this._opacity)
				}
				this._layerDiv.appendChild(F);
				if (this._timeline.isHorizontal()) {
					F.style.left = B + "px";
					F.style.width = this._width
				} else {
					F.style.top = B + "px";
					F.style.height = this._width
				}
			}
			this._layerDiv.style.display = "block"
		};
		Timeline.PointHighlightDecorator.prototype.softPaint = function () {};
		Timeline.DetailedEventPainter = function (A) {
			this._params = A;
			this._onSelectListeners = [];
			this._filterMatcher = null;
			this._highlightMatcher = null;
			this._frc = null;
			this._eventIdToElmt = {}
		};
		Timeline.DetailedEventPainter.prototype.initialize = function (B, A) {
			this._band = B;
			this._timeline = A;
			this._backLayer = null;
			this._eventLayer = null;
			this._lineLayer = null;
			this._highlightLayer = null;
			this._eventIdToElmt = null
		};
		Timeline.DetailedEventPainter.prototype.getType = function () {
			return "detailed"
		};
		Timeline.DetailedEventPainter.prototype.addOnSelectListener = function (A) {
			this._onSelectListeners.push(A)
		};
		Timeline.DetailedEventPainter.prototype.removeOnSelectListener = function (B) {
			for (var A = 0; A < this._onSelectListeners.length; A++) {
				if (this._onSelectListeners[A] == B) {
					this._onSelectListeners.splice(A, 1);
					break
				}
			}
		};
		Timeline.DetailedEventPainter.prototype.getFilterMatcher = function () {
			return this._filterMatcher
		};
		Timeline.DetailedEventPainter.prototype.setFilterMatcher = function (A) {
			this._filterMatcher = A
		};
		Timeline.DetailedEventPainter.prototype.getHighlightMatcher = function () {
			return this._highlightMatcher
		};
		Timeline.DetailedEventPainter.prototype.setHighlightMatcher = function (A) {
			this._highlightMatcher = A
		};
		Timeline.DetailedEventPainter.prototype.paint = function () {
			var C = this._band.getEventSource();
			if (C == null) {
				return
			}
			this._eventIdToElmt = {};
			this._prepareForPainting();
			var I = this._params.theme.event;
			var G = Math.max(I.track.height, this._frc.getLineHeight());
			var F = {
				trackOffset: Math.round(this._band.getViewWidth() / 2 - G / 2),
				trackHeight: G,
				trackGap: I.track.gap,
				trackIncrement: G + I.track.gap,
				icon: I.instant.icon,
				iconWidth: I.instant.iconWidth,
				iconHeight: I.instant.iconHeight,
				labelWidth: I.label.width
			};
			var D = this._band.getMinDate();
			var B = this._band.getMaxDate();
			var J = (this._filterMatcher != null) ? this._filterMatcher : function (K) {
					return true
				};
			var A = (this._highlightMatcher != null) ? this._highlightMatcher : function (K) {
					return -1
				};
			var E = C.getEventReverseIterator(D, B);
			while (E.hasNext()) {
				var H = E.next();
				if (J(H)) {
					this.paintEvent(H, F, this._params.theme, A(H))
				}
			}
			this._highlightLayer.style.display = "block";
			this._lineLayer.style.display = "block";
			this._eventLayer.style.display = "block";
			this._band.updateEventTrackInfo(this._lowerTracks.length + this._upperTracks.length, F.trackIncrement)
		};
		Timeline.DetailedEventPainter.prototype.softPaint = function () {};
		Timeline.DetailedEventPainter.prototype._prepareForPainting = function () {
			var B = this._band;
			if (this._backLayer == null) {
				this._backLayer = this._band.createLayerDiv(0, "timeline-band-events");
				this._backLayer.style.visibility = "hidden";
				var A = document.createElement("span");
				A.className = "timeline-event-label";
				this._backLayer.appendChild(A);
				this._frc = SimileAjax.Graphics.getFontRenderingContext(A)
			}
			this._frc.update();
			this._lowerTracks = [];
			this._upperTracks = [];
			if (this._highlightLayer != null) {
				B.removeLayerDiv(this._highlightLayer)
			}
			this._highlightLayer = B.createLayerDiv(105, "timeline-band-highlights");
			this._highlightLayer.style.display = "none";
			if (this._lineLayer != null) {
				B.removeLayerDiv(this._lineLayer)
			}
			this._lineLayer = B.createLayerDiv(110, "timeline-band-lines");
			this._lineLayer.style.display = "none";
			if (this._eventLayer != null) {
				B.removeLayerDiv(this._eventLayer)
			}
			this._eventLayer = B.createLayerDiv(110, "timeline-band-events");
			this._eventLayer.style.display = "none"
		};
		Timeline.DetailedEventPainter.prototype.paintEvent = function (B, C, D, A) {
			if (B.isInstant()) {
				this.paintInstantEvent(B, C, D, A)
			} else {
				this.paintDurationEvent(B, C, D, A)
			}
		};
		Timeline.DetailedEventPainter.prototype.paintInstantEvent = function (B, C, D, A) {
			if (B.isImprecise()) {
				this.paintImpreciseInstantEvent(B, C, D, A)
			} else {
				this.paintPreciseInstantEvent(B, C, D, A)
			}
		};
		Timeline.DetailedEventPainter.prototype.paintDurationEvent = function (B, C, D, A) {
			if (B.isImprecise()) {
				this.paintImpreciseDurationEvent(B, C, D, A)
			} else {
				this.paintPreciseDurationEvent(B, C, D, A)
			}
		};
		Timeline.DetailedEventPainter.prototype.paintPreciseInstantEvent = function (L, P, S, Q) {
			var T = this._timeline.getDocument();
			var J = L.getText();
			var G = L.getStart();
			var H = Math.round(this._band.dateToPixelOffset(G));
			var A = Math.round(H + P.iconWidth / 2);
			var C = Math.round(H - P.iconWidth / 2);
			var E = this._frc.computeSize(J);
			var F = this._findFreeTrackForSolid(A, H);
			var B = this._paintEventIcon(L, F, C, P, S);
			var K = A + S.event.label.offsetFromLine;
			var O = F;
			var D = this._getTrackData(F);
			if (Math.min(D.solid, D.text) >= K + E.width) {
				D.solid = C;
				D.text = K
			} else {
				D.solid = C;
				K = H + S.event.label.offsetFromLine;
				O = this._findFreeTrackForText(F, K + E.width, function (U) {
					U.line = H - 2
				});
				this._getTrackData(O).text = C;
				this._paintEventLine(L, H, F, O, P, S)
			}
			var N = Math.round(P.trackOffset + O * P.trackIncrement + P.trackHeight / 2 - E.height / 2);
			var R = this._paintEventLabel(L, J, K, N, E.width, E.height, S);
			var M = this;
			var I = function (V, U, W) {
				return M._onClickInstantEvent(B.elmt, U, L)
			};
			SimileAjax.DOM.registerEvent(B.elmt, "mousedown", I);
			SimileAjax.DOM.registerEvent(R.elmt, "mousedown", I);
			this._createHighlightDiv(Q, B, S);
			this._eventIdToElmt[L.getID()] = B.elmt
		};
		Timeline.DetailedEventPainter.prototype.paintImpreciseInstantEvent = function (O, S, W, T) {
			var X = this._timeline.getDocument();
			var M = O.getText();
			var I = O.getStart();
			var U = O.getEnd();
			var K = Math.round(this._band.dateToPixelOffset(I));
			var B = Math.round(this._band.dateToPixelOffset(U));
			var A = Math.round(K + S.iconWidth / 2);
			var D = Math.round(K - S.iconWidth / 2);
			var G = this._frc.computeSize(M);
			var H = this._findFreeTrackForSolid(B, K);
			var E = this._paintEventTape(O, H, K, B, W.event.instant.impreciseColor, W.event.instant.impreciseOpacity, S, W);
			var C = this._paintEventIcon(O, H, D, S, W);
			var F = this._getTrackData(H);
			F.solid = D;
			var N = A + W.event.label.offsetFromLine;
			var J = N + G.width;
			var R;
			if (J < B) {
				R = H
			} else {
				N = K + W.event.label.offsetFromLine;
				J = N + G.width;
				R = this._findFreeTrackForText(H, J, function (Y) {
					Y.line = K - 2
				});
				this._getTrackData(R).text = D;
				this._paintEventLine(O, K, H, R, S, W)
			}
			var Q = Math.round(S.trackOffset + R * S.trackIncrement + S.trackHeight / 2 - G.height / 2);
			var V = this._paintEventLabel(O, M, N, Q, G.width, G.height, W);
			var P = this;
			var L = function (Z, Y, a) {
				return P._onClickInstantEvent(C.elmt, Y, O)
			};
			SimileAjax.DOM.registerEvent(C.elmt, "mousedown", L);
			SimileAjax.DOM.registerEvent(E.elmt, "mousedown", L);
			SimileAjax.DOM.registerEvent(V.elmt, "mousedown", L);
			this._createHighlightDiv(T, C, W);
			this._eventIdToElmt[O.getID()] = C.elmt
		};
		Timeline.DetailedEventPainter.prototype.paintPreciseDurationEvent = function (K, O, T, Q) {
			var U = this._timeline.getDocument();
			var I = K.getText();
			var E = K.getStart();
			var R = K.getEnd();
			var F = Math.round(this._band.dateToPixelOffset(E));
			var A = Math.round(this._band.dateToPixelOffset(R));
			var C = this._frc.computeSize(I);
			var D = this._findFreeTrackForSolid(A);
			var P = K.getColor();
			P = P != null ? P : T.event.duration.color;
			var B = this._paintEventTape(K, D, F, A, P, 100, O, T);
			var H = this._getTrackData(D);
			H.solid = F;
			var J = F + T.event.label.offsetFromLine;
			var N = this._findFreeTrackForText(D, J + C.width, function (V) {
				V.line = F - 2
			});
			this._getTrackData(N).text = F - 2;
			this._paintEventLine(K, F, D, N, O, T);
			var M = Math.round(O.trackOffset + N * O.trackIncrement + O.trackHeight / 2 - C.height / 2);
			var S = this._paintEventLabel(K, I, J, M, C.width, C.height, T);
			var L = this;
			var G = function (W, V, X) {
				return L._onClickDurationEvent(B.elmt, V, K)
			};
			SimileAjax.DOM.registerEvent(B.elmt, "mousedown", G);
			SimileAjax.DOM.registerEvent(S.elmt, "mousedown", G);
			this._createHighlightDiv(Q, B, T);
			this._eventIdToElmt[K.getID()] = B.elmt
		};
		Timeline.DetailedEventPainter.prototype.paintImpreciseDurationEvent = function (M, T, Y, V) {
			var Z = this._timeline.getDocument();
			var K = M.getText();
			var G = M.getStart();
			var S = M.getLatestStart();
			var W = M.getEnd();
			var O = M.getEarliestEnd();
			var H = Math.round(this._band.dateToPixelOffset(G));
			var E = Math.round(this._band.dateToPixelOffset(S));
			var A = Math.round(this._band.dateToPixelOffset(W));
			var F = Math.round(this._band.dateToPixelOffset(O));
			var C = this._frc.computeSize(K);
			var D = this._findFreeTrackForSolid(A);
			var U = M.getColor();
			U = U != null ? U : Y.event.duration.color;
			var R = this._paintEventTape(M, D, H, A, Y.event.duration.impreciseColor, Y.event.duration.impreciseOpacity, T, Y);
			var B = this._paintEventTape(M, D, E, F, U, 100, T, Y);
			var J = this._getTrackData(D);
			J.solid = H;
			var L = E + Y.event.label.offsetFromLine;
			var Q = this._findFreeTrackForText(D, L + C.width, function (a) {
				a.line = E - 2
			});
			this._getTrackData(Q).text = E - 2;
			this._paintEventLine(M, E, D, Q, T, Y);
			var P = Math.round(T.trackOffset + Q * T.trackIncrement + T.trackHeight / 2 - C.height / 2);
			var X = this._paintEventLabel(M, K, L, P, C.width, C.height, Y);
			var N = this;
			var I = function (b, a, c) {
				return N._onClickDurationEvent(B.elmt, a, M)
			};
			SimileAjax.DOM.registerEvent(B.elmt, "mousedown", I);
			SimileAjax.DOM.registerEvent(X.elmt, "mousedown", I);
			this._createHighlightDiv(V, B, Y);
			this._eventIdToElmt[M.getID()] = B.elmt
		};
		Timeline.DetailedEventPainter.prototype._findFreeTrackForSolid = function (D, A) {
			for (var C = 0; true; C++) {
				if (C < this._lowerTracks.length) {
					var B = this._lowerTracks[C];
					if (Math.min(B.solid, B.text) > D && (!(A) || B.line > A)) {
						return C
					}
				} else {
					this._lowerTracks.push({
						solid: Number.POSITIVE_INFINITY,
						text: Number.POSITIVE_INFINITY,
						line: Number.POSITIVE_INFINITY
					});
					return C
				}
				if (C < this._upperTracks.length) {
					var B = this._upperTracks[C];
					if (Math.min(B.solid, B.text) > D && (!(A) || B.line > A)) {
						return -1 - C
					}
				} else {
					this._upperTracks.push({
						solid: Number.POSITIVE_INFINITY,
						text: Number.POSITIVE_INFINITY,
						line: Number.POSITIVE_INFINITY
					});
					return -1 - C
				}
			}
		};
		Timeline.DetailedEventPainter.prototype._findFreeTrackForText = function (C, A, I) {
			var B;
			var E;
			var F;
			var H;
			if (C < 0) {
				B = true;
				F = -C;
				E = this._findFreeUpperTrackForText(F, A);
				H = -1 - E
			} else {
				if (C > 0) {
					B = false;
					F = C + 1;
					E = this._findFreeLowerTrackForText(F, A);
					H = E
				} else {
					var G = this._findFreeUpperTrackForText(0, A);
					var J = this._findFreeLowerTrackForText(1, A);
					if (J - 1 <= G) {
						B = false;
						F = 1;
						E = J;
						H = E
					} else {
						B = true;
						F = 0;
						E = G;
						H = -1 - E
					}
				}
			}
			if (B) {
				if (E == this._upperTracks.length) {
					this._upperTracks.push({
						solid: Number.POSITIVE_INFINITY,
						text: Number.POSITIVE_INFINITY,
						line: Number.POSITIVE_INFINITY
					})
				}
				for (var D = F; D < E; D++) {
					I(this._upperTracks[D])
				}
			} else {
				if (E == this._lowerTracks.length) {
					this._lowerTracks.push({
						solid: Number.POSITIVE_INFINITY,
						text: Number.POSITIVE_INFINITY,
						line: Number.POSITIVE_INFINITY
					})
				}
				for (var D = F; D < E; D++) {
					I(this._lowerTracks[D])
				}
			}
			return H
		};
		Timeline.DetailedEventPainter.prototype._findFreeLowerTrackForText = function (A, C) {
			for (; A < this._lowerTracks.length; A++) {
				var B = this._lowerTracks[A];
				if (Math.min(B.solid, B.text) >= C) {
					break
				}
			}
			return A
		};
		Timeline.DetailedEventPainter.prototype._findFreeUpperTrackForText = function (A, C) {
			for (; A < this._upperTracks.length; A++) {
				var B = this._upperTracks[A];
				if (Math.min(B.solid, B.text) >= C) {
					break
				}
			}
			return A
		};
		Timeline.DetailedEventPainter.prototype._getTrackData = function (A) {
			return (A < 0) ? this._upperTracks[-A - 1] : this._lowerTracks[A]
		};
		Timeline.DetailedEventPainter.prototype._paintEventLine = function (J, E, D, A, G, F) {
			var H = Math.round(G.trackOffset + D * G.trackIncrement + G.trackHeight / 2);
			var I = Math.round(Math.abs(A - D) * G.trackIncrement);
			var C = "1px solid " + F.event.label.lineColor;
			var B = this._timeline.getDocument().createElement("div");
			B.style.position = "absolute";
			B.style.left = E + "px";
			B.style.width = F.event.label.offsetFromLine + "px";
			B.style.height = I + "px";
			if (D > A) {
				B.style.top = (H - I) + "px";
				B.style.borderTop = C
			} else {
				B.style.top = H + "px";
				B.style.borderBottom = C
			}
			B.style.borderLeft = C;
			this._lineLayer.appendChild(B)
		};
		Timeline.DetailedEventPainter.prototype._paintEventIcon = function (J, B, C, F, E) {
			var H = J.getIcon();
			H = H != null ? H : F.icon;
			var G = F.trackOffset + B * F.trackIncrement + F.trackHeight / 2;
			var I = Math.round(G - F.iconHeight / 2);
			var D = SimileAjax.Graphics.createTranslucentImage(H);
			var A = this._timeline.getDocument().createElement("div");
			A.style.position = "absolute";
			A.style.left = C + "px";
			A.style.top = I + "px";
			A.appendChild(D);
			A.style.cursor = "pointer";
			if (J._title != null) {
				A.title = J._title
			}
			this._eventLayer.appendChild(A);
			return {
				left: C,
				top: I,
				width: F.iconWidth,
				height: F.iconHeight,
				elmt: A
			}
		};
		Timeline.DetailedEventPainter.prototype._paintEventLabel = function (I, J, C, F, A, G, E) {
			var H = this._timeline.getDocument();
			var K = H.createElement("div");
			K.style.position = "absolute";
			K.style.left = C + "px";
			K.style.width = A + "px";
			K.style.top = F + "px";
			K.style.height = G + "px";
			K.style.backgroundColor = E.event.label.backgroundColor;
			SimileAjax.Graphics.setOpacity(K, E.event.label.backgroundOpacity);
			this._eventLayer.appendChild(K);
			var B = H.createElement("div");
			B.style.position = "absolute";
			B.style.left = C + "px";
			B.style.width = A + "px";
			B.style.top = F + "px";
			B.innerHTML = J;
			B.style.cursor = "pointer";
			if (I._title != null) {
				B.title = I._title
			}
			var D = I.getTextColor();
			if (D == null) {
				D = I.getColor()
			}
			if (D != null) {
				B.style.color = D
			}
			this._eventLayer.appendChild(B);
			return {
				left: C,
				top: F,
				width: A,
				height: G,
				elmt: B
			}
		};
		Timeline.DetailedEventPainter.prototype._paintEventTape = function (L, B, D, A, G, C, I, H) {
			var F = A - D;
			var E = H.event.tape.height;
			var K = I.trackOffset + B * I.trackIncrement + I.trackHeight / 2;
			var J = Math.round(K - E / 2);
			var M = this._timeline.getDocument().createElement("div");
			M.style.position = "absolute";
			M.style.left = D + "px";
			M.style.width = F + "px";
			M.style.top = J + "px";
			M.style.height = E + "px";
			M.style.backgroundColor = G;
			M.style.overflow = "hidden";
			M.style.cursor = "pointer";
			if (L._title != null) {
				M.title = L._title
			}
			SimileAjax.Graphics.setOpacity(M, C);
			this._eventLayer.appendChild(M);
			return {
				left: D,
				top: J,
				width: F,
				height: E,
				elmt: M
			}
		};
		Timeline.DetailedEventPainter.prototype._createHighlightDiv = function (A, C, E) {
			if (A >= 0) {
				var D = this._timeline.getDocument();
				var G = E.event;
				var B = G.highlightColors[Math.min(A, G.highlightColors.length - 1)];
				var F = D.createElement("div");
				F.style.position = "absolute";
				F.style.overflow = "hidden";
				F.style.left = (C.left - 2) + "px";
				F.style.width = (C.width + 4) + "px";
				F.style.top = (C.top - 2) + "px";
				F.style.height = (C.height + 4) + "px";
				F.style.background = B;
				this._highlightLayer.appendChild(F)
			}
		};
		Timeline.DetailedEventPainter.prototype._onClickInstantEvent = function (C, A, B) {
			var D = SimileAjax.DOM.getPageCoordinates(C);
			this._showBubble(D.left + Math.ceil(C.offsetWidth / 2), D.top + Math.ceil(C.offsetHeight / 2), B);
			this._fireOnSelect(B.getID());
			A.cancelBubble = true;
			SimileAjax.DOM.cancelEvent(A);
			return false
		};
		Timeline.DetailedEventPainter.prototype._onClickDurationEvent = function (F, B, C) {
			if ("pageX" in B) {
				var A = B.pageX;
				var E = B.pageY
			} else {
				var D = SimileAjax.DOM.getPageCoordinates(F);
				var A = B.offsetX + D.left;
				var E = B.offsetY + D.top
			}
			this._showBubble(A, E, C);
			this._fireOnSelect(C.getID());
			B.cancelBubble = true;
			SimileAjax.DOM.cancelEvent(B);
			return false
		};
		Timeline.DetailedEventPainter.prototype.showBubble = function (A) {
			var B = this._eventIdToElmt[A.getID()];
			if (B) {
				var C = SimileAjax.DOM.getPageCoordinates(B);
				this._showBubble(C.left + B.offsetWidth / 2, C.top + B.offsetHeight / 2, A)
			}
		};
		Timeline.DetailedEventPainter.prototype._showBubble = function (B, E, C) {
			var D = document.createElement("div");
			var A = this._params.theme.event.bubble;
			C.fillInfoBubble(D, this._params.theme, this._band.getLabeller());
			SimileAjax.WindowManager.cancelPopups();
			SimileAjax.Graphics.createBubbleForContentAndPoint(D, B, E, A.width, null, A.maxHeight)
		};
		Timeline.DetailedEventPainter.prototype._fireOnSelect = function (A) {
			for (var B = 0; B < this._onSelectListeners.length; B++) {
				this._onSelectListeners[B](A)
			}
		};
		Timeline.GregorianEtherPainter = function (A) {
			this._params = A;
			this._theme = A.theme;
			this._unit = A.unit;
			this._multiple = ("multiple" in A) ? A.multiple : 1
		};
		Timeline.GregorianEtherPainter.prototype.initialize = function (C, B) {
			this._band = C;
			this._timeline = B;
			this._backgroundLayer = C.createLayerDiv(0);
			this._backgroundLayer.setAttribute("name", "ether-background");
			this._backgroundLayer.className = "timeline-ether-bg";
			this._markerLayer = null;
			this._lineLayer = null;
			var D = ("align" in this._params && this._params.align != undefined) ? this._params.align : this._theme.ether.interval.marker[B.isHorizontal() ? "hAlign" : "vAlign"];
			var A = ("showLine" in this._params) ? this._params.showLine : this._theme.ether.interval.line.show;
			this._intervalMarkerLayout = new Timeline.EtherIntervalMarkerLayout(this._timeline, this._band, this._theme, D, A);
			this._highlight = new Timeline.EtherHighlight(this._timeline, this._band, this._theme, this._backgroundLayer)
		};
		Timeline.GregorianEtherPainter.prototype.setHighlight = function (A, B) {
			this._highlight.position(A, B)
		};
		Timeline.GregorianEtherPainter.prototype.paint = function () {
			if (this._markerLayer) {
				this._band.removeLayerDiv(this._markerLayer)
			}
			this._markerLayer = this._band.createLayerDiv(100);
			this._markerLayer.setAttribute("name", "ether-markers");
			this._markerLayer.style.display = "none";
			if (this._lineLayer) {
				this._band.removeLayerDiv(this._lineLayer)
			}
			this._lineLayer = this._band.createLayerDiv(1);
			this._lineLayer.setAttribute("name", "ether-lines");
			this._lineLayer.style.display = "none";
			var C = this._band.getMinDate();
			var F = this._band.getMaxDate();
			var A = this._band.getTimeZone();
			var E = this._band.getLabeller();
			SimileAjax.DateTime.roundDownToInterval(C, this._unit, A, this._multiple, this._theme.firstDayOfWeek);
			var D = this;
			var B = function (G) {
				for (var H = 0; H < D._multiple; H++) {
					SimileAjax.DateTime.incrementByInterval(G, D._unit)
				}
			};
			while (C.getTime() < F.getTime()) {
				this._intervalMarkerLayout.createIntervalMarker(C, E, this._unit, this._markerLayer, this._lineLayer);
				B(C)
			}
			this._markerLayer.style.display = "block";
			this._lineLayer.style.display = "block"
		};
		Timeline.GregorianEtherPainter.prototype.softPaint = function () {};
		Timeline.GregorianEtherPainter.prototype.zoom = function (A) {
			if (A != 0) {
				this._unit += A
			}
		};
		Timeline.HotZoneGregorianEtherPainter = function (G) {
			this._params = G;
			this._theme = G.theme;
			this._zones = [{
				startTime: Number.NEGATIVE_INFINITY,
				endTime: Number.POSITIVE_INFINITY,
				unit: G.unit,
				multiple: 1
			}];
			for (var F = 0; F < G.zones.length; F++) {
				var C = G.zones[F];
				var E = SimileAjax.DateTime.parseGregorianDateTime(C.start).getTime();
				var B = SimileAjax.DateTime.parseGregorianDateTime(C.end).getTime();
				for (var D = 0; D < this._zones.length && B > E; D++) {
					var A = this._zones[D];
					if (E < A.endTime) {
						if (E > A.startTime) {
							this._zones.splice(D, 0, {
								startTime: A.startTime,
								endTime: E,
								unit: A.unit,
								multiple: A.multiple
							});
							D++;
							A.startTime = E
						}
						if (B < A.endTime) {
							this._zones.splice(D, 0, {
								startTime: E,
								endTime: B,
								unit: C.unit,
								multiple: (C.multiple) ? C.multiple : 1
							});
							D++;
							A.startTime = B;
							E = B
						} else {
							A.multiple = C.multiple;
							A.unit = C.unit;
							E = A.endTime
						}
					}
				}
			}
		};
		Timeline.HotZoneGregorianEtherPainter.prototype.initialize = function (C, B) {
			this._band = C;
			this._timeline = B;
			this._backgroundLayer = C.createLayerDiv(0);
			this._backgroundLayer.setAttribute("name", "ether-background");
			this._backgroundLayer.className = "timeline-ether-bg";
			this._markerLayer = null;
			this._lineLayer = null;
			var D = ("align" in this._params && this._params.align != undefined) ? this._params.align : this._theme.ether.interval.marker[B.isHorizontal() ? "hAlign" : "vAlign"];
			var A = ("showLine" in this._params) ? this._params.showLine : this._theme.ether.interval.line.show;
			this._intervalMarkerLayout = new Timeline.EtherIntervalMarkerLayout(this._timeline, this._band, this._theme, D, A);
			this._highlight = new Timeline.EtherHighlight(this._timeline, this._band, this._theme, this._backgroundLayer)
		};
		Timeline.HotZoneGregorianEtherPainter.prototype.setHighlight = function (A, B) {
			this._highlight.position(A, B)
		};
		Timeline.HotZoneGregorianEtherPainter.prototype.paint = function () {
			if (this._markerLayer) {
				this._band.removeLayerDiv(this._markerLayer)
			}
			this._markerLayer = this._band.createLayerDiv(100);
			this._markerLayer.setAttribute("name", "ether-markers");
			this._markerLayer.style.display = "none";
			if (this._lineLayer) {
				this._band.removeLayerDiv(this._lineLayer)
			}
			this._lineLayer = this._band.createLayerDiv(1);
			this._lineLayer.setAttribute("name", "ether-lines");
			this._lineLayer.style.display = "none";
			var C = this._band.getMinDate();
			var A = this._band.getMaxDate();
			var I = this._band.getTimeZone();
			var L = this._band.getLabeller();
			var B = this;
			var J = function (N, M) {
				for (var O = 0; O < M.multiple; O++) {
					SimileAjax.DateTime.incrementByInterval(N, M.unit)
				}
			};
			var D = 0;
			while (D < this._zones.length) {
				if (C.getTime() < this._zones[D].endTime) {
					break
				}
				D++
			}
			var E = this._zones.length - 1;
			while (E >= 0) {
				if (A.getTime() > this._zones[E].startTime) {
					break
				}
				E--
			}
			for (var H = D; H <= E; H++) {
				var G = this._zones[H];
				var K = new Date(Math.max(C.getTime(), G.startTime));
				var F = new Date(Math.min(A.getTime(), G.endTime));
				SimileAjax.DateTime.roundDownToInterval(K, G.unit, I, G.multiple, this._theme.firstDayOfWeek);
				SimileAjax.DateTime.roundUpToInterval(F, G.unit, I, G.multiple, this._theme.firstDayOfWeek);
				while (K.getTime() < F.getTime()) {
					this._intervalMarkerLayout.createIntervalMarker(K, L, G.unit, this._markerLayer, this._lineLayer);
					J(K, G)
				}
			}
			this._markerLayer.style.display = "block";
			this._lineLayer.style.display = "block"
		};
		Timeline.HotZoneGregorianEtherPainter.prototype.softPaint = function () {};
		Timeline.HotZoneGregorianEtherPainter.prototype.zoom = function (A) {
			if (A != 0) {
				for (var B = 0; B < this._zones.length; ++B) {
					if (this._zones[B]) {
						this._zones[B].unit += A
					}
				}
			}
		};
		Timeline.YearCountEtherPainter = function (A) {
			this._params = A;
			this._theme = A.theme;
			this._startDate = SimileAjax.DateTime.parseGregorianDateTime(A.startDate);
			this._multiple = ("multiple" in A) ? A.multiple : 1
		};
		Timeline.YearCountEtherPainter.prototype.initialize = function (C, B) {
			this._band = C;
			this._timeline = B;
			this._backgroundLayer = C.createLayerDiv(0);
			this._backgroundLayer.setAttribute("name", "ether-background");
			this._backgroundLayer.className = "timeline-ether-bg";
			this._markerLayer = null;
			this._lineLayer = null;
			var D = ("align" in this._params) ? this._params.align : this._theme.ether.interval.marker[B.isHorizontal() ? "hAlign" : "vAlign"];
			var A = ("showLine" in this._params) ? this._params.showLine : this._theme.ether.interval.line.show;
			this._intervalMarkerLayout = new Timeline.EtherIntervalMarkerLayout(this._timeline, this._band, this._theme, D, A);
			this._highlight = new Timeline.EtherHighlight(this._timeline, this._band, this._theme, this._backgroundLayer)
		};
		Timeline.YearCountEtherPainter.prototype.setHighlight = function (A, B) {
			this._highlight.position(A, B)
		};
		Timeline.YearCountEtherPainter.prototype.paint = function () {
			if (this._markerLayer) {
				this._band.removeLayerDiv(this._markerLayer)
			}
			this._markerLayer = this._band.createLayerDiv(100);
			this._markerLayer.setAttribute("name", "ether-markers");
			this._markerLayer.style.display = "none";
			if (this._lineLayer) {
				this._band.removeLayerDiv(this._lineLayer)
			}
			this._lineLayer = this._band.createLayerDiv(1);
			this._lineLayer.setAttribute("name", "ether-lines");
			this._lineLayer.style.display = "none";
			var B = new Date(this._startDate.getTime());
			var F = this._band.getMaxDate();
			var E = this._band.getMinDate().getUTCFullYear() - this._startDate.getUTCFullYear();
			B.setUTCFullYear(this._band.getMinDate().getUTCFullYear() - E % this._multiple);
			var C = this;
			var A = function (G) {
				for (var H = 0; H < C._multiple; H++) {
					SimileAjax.DateTime.incrementByInterval(G, SimileAjax.DateTime.YEAR)
				}
			};
			var D = {
				labelInterval: function (G, I) {
					var H = G.getUTCFullYear() - C._startDate.getUTCFullYear();
					return {
						text: H,
						emphasized: H == 0
					}
				}
			};
			while (B.getTime() < F.getTime()) {
				this._intervalMarkerLayout.createIntervalMarker(B, D, SimileAjax.DateTime.YEAR, this._markerLayer, this._lineLayer);
				A(B)
			}
			this._markerLayer.style.display = "block";
			this._lineLayer.style.display = "block"
		};
		Timeline.YearCountEtherPainter.prototype.softPaint = function () {};
		Timeline.QuarterlyEtherPainter = function (A) {
			this._params = A;
			this._theme = A.theme;
			this._startDate = SimileAjax.DateTime.parseGregorianDateTime(A.startDate)
		};
		Timeline.QuarterlyEtherPainter.prototype.initialize = function (C, B) {
			this._band = C;
			this._timeline = B;
			this._backgroundLayer = C.createLayerDiv(0);
			this._backgroundLayer.setAttribute("name", "ether-background");
			this._backgroundLayer.className = "timeline-ether-bg";
			this._markerLayer = null;
			this._lineLayer = null;
			var D = ("align" in this._params) ? this._params.align : this._theme.ether.interval.marker[B.isHorizontal() ? "hAlign" : "vAlign"];
			var A = ("showLine" in this._params) ? this._params.showLine : this._theme.ether.interval.line.show;
			this._intervalMarkerLayout = new Timeline.EtherIntervalMarkerLayout(this._timeline, this._band, this._theme, D, A);
			this._highlight = new Timeline.EtherHighlight(this._timeline, this._band, this._theme, this._backgroundLayer)
		};
		Timeline.QuarterlyEtherPainter.prototype.setHighlight = function (A, B) {
			this._highlight.position(A, B)
		};
		Timeline.QuarterlyEtherPainter.prototype.paint = function () {
			if (this._markerLayer) {
				this._band.removeLayerDiv(this._markerLayer)
			}
			this._markerLayer = this._band.createLayerDiv(100);
			this._markerLayer.setAttribute("name", "ether-markers");
			this._markerLayer.style.display = "none";
			if (this._lineLayer) {
				this._band.removeLayerDiv(this._lineLayer)
			}
			this._lineLayer = this._band.createLayerDiv(1);
			this._lineLayer.setAttribute("name", "ether-lines");
			this._lineLayer.style.display = "none";
			var B = new Date(0);
			var E = this._band.getMaxDate();
			B.setUTCFullYear(Math.max(this._startDate.getUTCFullYear(), this._band.getMinDate().getUTCFullYear()));
			B.setUTCMonth(this._startDate.getUTCMonth());
			var C = this;
			var A = function (F) {
				F.setUTCMonth(F.getUTCMonth() + 3)
			};
			var D = {
				labelInterval: function (G, H) {
					var F = (4 + (G.getUTCMonth() - C._startDate.getUTCMonth()) / 3) % 4;
					if (F != 0) {
						return {
							text: "Q" + (F + 1),
							emphasized: false
						}
					} else {
						return {
							text: "Y" + (G.getUTCFullYear() - C._startDate.getUTCFullYear() + 1),
							emphasized: true
						}
					}
				}
			};
			while (B.getTime() < E.getTime()) {
				this._intervalMarkerLayout.createIntervalMarker(B, D, SimileAjax.DateTime.YEAR, this._markerLayer, this._lineLayer);
				A(B)
			}
			this._markerLayer.style.display = "block";
			this._lineLayer.style.display = "block"
		};
		Timeline.QuarterlyEtherPainter.prototype.softPaint = function () {};
		Timeline.EtherIntervalMarkerLayout = function (I, L, C, E, M) {
			var A = I.isHorizontal();
			if (A) {
				if (E == "Top") {
					this.positionDiv = function (O, N) {
						O.style.left = N + "px";
						O.style.top = "0px"
					}
				} else {
					this.positionDiv = function (O, N) {
						O.style.left = N + "px";
						O.style.bottom = "0px"
					}
				}
			} else {
				if (E == "Left") {
					this.positionDiv = function (O, N) {
						O.style.top = N + "px";
						O.style.left = "0px"
					}
				} else {
					this.positionDiv = function (O, N) {
						O.style.top = N + "px";
						O.style.right = "0px"
					}
				}
			}
			var D = C.ether.interval.marker;
			var K = C.ether.interval.line;
			var B = C.ether.interval.weekend;
			var H = (A ? "h" : "v") + E;
			var G = D[H + "Styler"];
			var J = D[H + "EmphasizedStyler"];
			var F = SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.DAY];
			this.createIntervalMarker = function (T, c, a, Y, P) {
				var U = Math.round(L.dateToPixelOffset(T));
				if (M && a != SimileAjax.DateTime.WEEK) {
					var V = I.getDocument().createElement("div");
					V.className = "timeline-ether-lines";
					if (K.opacity < 100) {
						SimileAjax.Graphics.setOpacity(V, K.opacity)
					}
					if (A) {
						V.style.left = U + "px"
					} else {
						V.style.top = U + "px"
					}
					P.appendChild(V)
				}
				if (a == SimileAjax.DateTime.WEEK) {
					var N = C.firstDayOfWeek;
					var R = new Date(T.getTime() + (6 - N - 7) * F);
					var b = new Date(R.getTime() + 2 * F);
					var Q = Math.round(L.dateToPixelOffset(R));
					var S = Math.round(L.dateToPixelOffset(b));
					var W = Math.max(1, S - Q);
					var X = I.getDocument().createElement("div");
					X.className = "timeline-ether-weekends";
					if (B.opacity < 100) {
						SimileAjax.Graphics.setOpacity(X, B.opacity)
					}
					if (A) {
						X.style.left = Q + "px";
						X.style.width = W + "px"
					} else {
						X.style.top = Q + "px";
						X.style.height = W + "px"
					}
					P.appendChild(X)
				}
				var Z = c.labelInterval(T, a);
				var O = I.getDocument().createElement("div");
				O.innerHTML = Z.text;
				O.className = "timeline-date-label";
				if (Z.emphasized) {
					O.className += " timeline-date-label-em"
				}
				this.positionDiv(O, U);
				Y.appendChild(O);
				return O
			}
		};
		Timeline.EtherHighlight = function (B, E, D, C) {
			var A = B.isHorizontal();
			this._highlightDiv = null;
			this._createHighlightDiv = function () {
				if (this._highlightDiv == null) {
					this._highlightDiv = B.getDocument().createElement("div");
					this._highlightDiv.setAttribute("name", "ether-highlight");
					this._highlightDiv.className = "timeline-ether-highlight";
					var F = D.ether.highlightOpacity;
					if (F < 100) {
						SimileAjax.Graphics.setOpacity(this._highlightDiv, F)
					}
					C.appendChild(this._highlightDiv)
				}
			};
			this.position = function (H, J) {
				this._createHighlightDiv();
				var I = Math.round(E.dateToPixelOffset(H));
				var G = Math.round(E.dateToPixelOffset(J));
				var F = Math.max(G - I, 3);
				if (A) {
					this._highlightDiv.style.left = I + "px";
					this._highlightDiv.style.width = F + "px";
					this._highlightDiv.style.height = (E.getViewWidth() - 4) + "px"
				} else {
					this._highlightDiv.style.top = I + "px";
					this._highlightDiv.style.height = F + "px";
					this._highlightDiv.style.width = (E.getViewWidth() - 4) + "px"
				}
			}
		};
		Timeline.LinearEther = function (A) {
			this._params = A;
			this._interval = A.interval;
			this._pixelsPerInterval = A.pixelsPerInterval
		};
		Timeline.LinearEther.prototype.initialize = function (B, A) {
			this._band = B;
			this._timeline = A;
			this._unit = A.getUnit();
			if ("startsOn" in this._params) {
				this._start = this._unit.parseFromObject(this._params.startsOn)
			} else {
				if ("endsOn" in this._params) {
					this._start = this._unit.parseFromObject(this._params.endsOn);
					this.shiftPixels(-this._timeline.getPixelLength())
				} else {
					if ("centersOn" in this._params) {
						this._start = this._unit.parseFromObject(this._params.centersOn);
						this.shiftPixels(-this._timeline.getPixelLength() / 2)
					} else {
						this._start = this._unit.makeDefaultValue();
						this.shiftPixels(-this._timeline.getPixelLength() / 2)
					}
				}
			}
		};
		Timeline.LinearEther.prototype.setDate = function (A) {
			this._start = this._unit.cloneValue(A)
		};
		Timeline.LinearEther.prototype.shiftPixels = function (B) {
			var A = this._interval * B / this._pixelsPerInterval;
			this._start = this._unit.change(this._start, A)
		};
		Timeline.LinearEther.prototype.dateToPixelOffset = function (B) {
			var A = this._unit.compare(B, this._start);
			return this._pixelsPerInterval * A / this._interval
		};
		Timeline.LinearEther.prototype.pixelOffsetToDate = function (B) {
			var A = B * this._interval / this._pixelsPerInterval;
			return this._unit.change(this._start, A)
		};
		Timeline.LinearEther.prototype.zoom = function (D) {
			var A = 0;
			var B = this._band._zoomIndex;
			var C = B;
			if (D && (B > 0)) {
				C = B - 1
			}
			if (!D && (B < (this._band._zoomSteps.length - 1))) {
				C = B + 1
			}
			this._band._zoomIndex = C;
			this._interval = SimileAjax.DateTime.gregorianUnitLengths[this._band._zoomSteps[C].unit];
			this._pixelsPerInterval = this._band._zoomSteps[C].pixelsPerInterval;
			A = this._band._zoomSteps[C].unit - this._band._zoomSteps[B].unit;
			return A
		};
		Timeline.HotZoneEther = function (A) {
			this._params = A;
			this._interval = A.interval;
			this._pixelsPerInterval = A.pixelsPerInterval;
			this._theme = A.theme
		};
		Timeline.HotZoneEther.prototype.initialize = function (I, H) {
			this._band = I;
			this._timeline = H;
			this._unit = H.getUnit();
			this._zones = [{
				startTime: Number.NEGATIVE_INFINITY,
				endTime: Number.POSITIVE_INFINITY,
				magnify: 1
			}];
			var D = this._params;
			for (var E = 0; E < D.zones.length; E++) {
				var G = D.zones[E];
				var F = this._unit.parseFromObject(G.start);
				var B = this._unit.parseFromObject(G.end);
				for (var C = 0; C < this._zones.length && this._unit.compare(B, F) > 0; C++) {
					var A = this._zones[C];
					if (this._unit.compare(F, A.endTime) < 0) {
						if (this._unit.compare(F, A.startTime) > 0) {
							this._zones.splice(C, 0, {
								startTime: A.startTime,
								endTime: F,
								magnify: A.magnify
							});
							C++;
							A.startTime = F
						}
						if (this._unit.compare(B, A.endTime) < 0) {
							this._zones.splice(C, 0, {
								startTime: F,
								endTime: B,
								magnify: G.magnify * A.magnify
							});
							C++;
							A.startTime = B;
							F = B
						} else {
							A.magnify *= G.magnify;
							F = A.endTime
						}
					}
				}
			}
			if ("startsOn" in this._params) {
				this._start = this._unit.parseFromObject(this._params.startsOn)
			} else {
				if ("endsOn" in this._params) {
					this._start = this._unit.parseFromObject(this._params.endsOn);
					this.shiftPixels(-this._timeline.getPixelLength())
				} else {
					if ("centersOn" in this._params) {
						this._start = this._unit.parseFromObject(this._params.centersOn);
						this.shiftPixels(-this._timeline.getPixelLength() / 2)
					} else {
						this._start = this._unit.makeDefaultValue();
						this.shiftPixels(-this._timeline.getPixelLength() / 2)
					}
				}
			}
		};
		Timeline.HotZoneEther.prototype.setDate = function (A) {
			this._start = this._unit.cloneValue(A)
		};
		Timeline.HotZoneEther.prototype.shiftPixels = function (A) {
			this._start = this.pixelOffsetToDate(A)
		};
		Timeline.HotZoneEther.prototype.dateToPixelOffset = function (A) {
			return this._dateDiffToPixelOffset(this._start, A)
		};
		Timeline.HotZoneEther.prototype.pixelOffsetToDate = function (A) {
			return this._pixelOffsetToDate(A, this._start)
		};
		Timeline.HotZoneEther.prototype.zoom = function (D) {
			var A = 0;
			var B = this._band._zoomIndex;
			var C = B;
			if (D && (B > 0)) {
				C = B - 1
			}
			if (!D && (B < (this._band._zoomSteps.length - 1))) {
				C = B + 1
			}
			this._band._zoomIndex = C;
			this._interval = SimileAjax.DateTime.gregorianUnitLengths[this._band._zoomSteps[C].unit];
			this._pixelsPerInterval = this._band._zoomSteps[C].pixelsPerInterval;
			A = this._band._zoomSteps[C].unit - this._band._zoomSteps[B].unit;
			return A
		};
		Timeline.HotZoneEther.prototype._dateDiffToPixelOffset = function (H, C) {
			var D = this._getScale();
			var I = H;
			var B = C;
			var E = 0;
			if (this._unit.compare(I, B) < 0) {
				var G = 0;
				while (G < this._zones.length) {
					if (this._unit.compare(I, this._zones[G].endTime) < 0) {
						break
					}
					G++
				}
				while (this._unit.compare(I, B) < 0) {
					var F = this._zones[G];
					var A = this._unit.earlier(B, F.endTime);
					E += (this._unit.compare(A, I) / (D / F.magnify));
					I = A;
					G++
				}
			} else {
				var G = this._zones.length - 1;
				while (G >= 0) {
					if (this._unit.compare(I, this._zones[G].startTime) > 0) {
						break
					}
					G--
				}
				while (this._unit.compare(I, B) > 0) {
					var F = this._zones[G];
					var A = this._unit.later(B, F.startTime);
					E += (this._unit.compare(A, I) / (D / F.magnify));
					I = A;
					G--
				}
			}
			return E
		};
		Timeline.HotZoneEther.prototype._pixelOffsetToDate = function (E, B) {
			var G = this._getScale();
			var D = B;
			if (E > 0) {
				var F = 0;
				while (F < this._zones.length) {
					if (this._unit.compare(D, this._zones[F].endTime) < 0) {
						break
					}
					F++
				}
				while (E > 0) {
					var A = this._zones[F];
					var H = G / A.magnify;
					if (A.endTime == Number.POSITIVE_INFINITY) {
						D = this._unit.change(D, E * H);
						E = 0
					} else {
						var C = this._unit.compare(A.endTime, D) / H;
						if (C > E) {
							D = this._unit.change(D, E * H);
							E = 0
						} else {
							D = A.endTime;
							E -= C
						}
					}
					F++
				}
			} else {
				var F = this._zones.length - 1;
				while (F >= 0) {
					if (this._unit.compare(D, this._zones[F].startTime) > 0) {
						break
					}
					F--
				}
				E = -E;
				while (E > 0) {
					var A = this._zones[F];
					var H = G / A.magnify;
					if (A.startTime == Number.NEGATIVE_INFINITY) {
						D = this._unit.change(D, -E * H);
						E = 0
					} else {
						var C = this._unit.compare(D, A.startTime) / H;
						if (C > E) {
							D = this._unit.change(D, -E * H);
							E = 0
						} else {
							D = A.startTime;
							E -= C
						}
					}
					F--
				}
			}
			return D
		};
		Timeline.HotZoneEther.prototype._getScale = function () {
			return this._interval / this._pixelsPerInterval
		};
		Timeline.EventUtils = {};
		Timeline.EventUtils.getNewEventID = function () {
			if (this._lastEventID == null) {
				this._lastEventID = 0
			}
			this._lastEventID += 1;
			return "e" + this._lastEventID
		};
		Timeline.EventUtils.decodeEventElID = function (C) {
			var D = C.split("-");
			if (D[1] != "tl") {
				alert("Internal Timeline problem 101, please consult support");
				return {
					band: null,
					evt: null
				}
			}
			var B = Timeline.getTimelineFromID(D[2]);
			var E = B.getBand(D[3]);
			var A = E.getEventSource.getEvent(D[4]);
			return {
				band: E,
				evt: A
			}
		};
		Timeline.EventUtils.encodeEventElID = function (B, D, C, A) {
			return C + "-tl-" + B.timelineID + "-" + D.getIndex() + "-" + A.getID()
		};
		Timeline.GregorianDateLabeller = function (B, A) {
			this._locale = B;
			this._timeZone = A
		};
		Timeline.GregorianDateLabeller.monthNames = [];
		Timeline.GregorianDateLabeller.dayNames = [];
		Timeline.GregorianDateLabeller.labelIntervalFunctions = [];
		Timeline.GregorianDateLabeller.getMonthName = function (B, A) {
			return Timeline.GregorianDateLabeller.monthNames[A][B]
		};
		Timeline.GregorianDateLabeller.prototype.labelInterval = function (A, C) {
			var B = Timeline.GregorianDateLabeller.labelIntervalFunctions[this._locale];
			if (B == null) {
				B = Timeline.GregorianDateLabeller.prototype.defaultLabelInterval
			}
			return B.call(this, A, C)
		};
		Timeline.GregorianDateLabeller.prototype.labelPrecise = function (A) {
			return SimileAjax.DateTime.removeTimeZoneOffset(A, this._timeZone).toUTCString()
		};
		Timeline.GregorianDateLabeller.prototype.defaultLabelInterval = function (B, C) {
			var D;
			var F = false;
			B = SimileAjax.DateTime.removeTimeZoneOffset(B, this._timeZone);
			switch (C) {
				case SimileAjax.DateTime.MILLISECOND:
					D = B.getUTCMilliseconds();
					break;
				case SimileAjax.DateTime.SECOND:
					D = B.getUTCSeconds();
					break;
				case SimileAjax.DateTime.MINUTE:
					var A = B.getUTCMinutes();
					if (A == 0) {
						D = B.getUTCHours() + ":00";
						F = true
					} else {
						D = A
					}
					break;
				case SimileAjax.DateTime.HOUR:
					D = B.getUTCHours() + "hr";
					break;
				case SimileAjax.DateTime.DAY:
					D = Timeline.GregorianDateLabeller.getMonthName(B.getUTCMonth(), this._locale) + " " + B.getUTCDate();
					break;
				case SimileAjax.DateTime.WEEK:
					D = Timeline.GregorianDateLabeller.getMonthName(B.getUTCMonth(), this._locale) + " " + B.getUTCDate();
					break;
				case SimileAjax.DateTime.MONTH:
					var A = B.getUTCMonth();
					if (A != 0) {
						D = Timeline.GregorianDateLabeller.getMonthName(A, this._locale);
						break
					}
				case SimileAjax.DateTime.YEAR:
				case SimileAjax.DateTime.DECADE:
				case SimileAjax.DateTime.FIVEYEAR:
				case SimileAjax.DateTime.CENTURY:
				case SimileAjax.DateTime.MILLENNIUM:
					var E = B.getUTCFullYear();
					if (E > 0) {
						D = B.getUTCFullYear()
					} else {
						D = (1 - E) + "BC"
					}
					F = (C == SimileAjax.DateTime.MONTH) || (C == SimileAjax.DateTime.DECADE && E % 100 == 0) || (C == SimileAjax.DateTime.CENTURY && E % 1000 == 0);
					break;
				default:
					D = B.toUTCString()
			}
			return {
				text: D,
				emphasized: F
			}
		};
		Timeline.OriginalEventPainter = function (A) {
			this._params = A;
			this._onSelectListeners = [];
			this._eventPaintListeners = [];
			this._filterMatcher = null;
			this._highlightMatcher = null;
			this._frc = null;
			this._eventIdToElmt = {}
		};
		Timeline.OriginalEventPainter.prototype.initialize = function (B, A) {
			this._band = B;
			this._timeline = A;
			this._backLayer = null;
			this._eventLayer = null;
			this._lineLayer = null;
			this._highlightLayer = null;
			this._eventIdToElmt = null
		};
		Timeline.OriginalEventPainter.prototype.getType = function () {
			return "original"
		};
		Timeline.OriginalEventPainter.prototype.addOnSelectListener = function (A) {
			this._onSelectListeners.push(A)
		};
		Timeline.OriginalEventPainter.prototype.removeOnSelectListener = function (B) {
			for (var A = 0; A < this._onSelectListeners.length; A++) {
				if (this._onSelectListeners[A] == B) {
					this._onSelectListeners.splice(A, 1);
					break
				}
			}
		};
		Timeline.OriginalEventPainter.prototype.addEventPaintListener = function (A) {
			this._eventPaintListeners.push(A)
		};
		Timeline.OriginalEventPainter.prototype.removeEventPaintListener = function (B) {
			for (var A = 0; A < this._eventPaintListeners.length; A++) {
				if (this._eventPaintListeners[A] == B) {
					this._eventPaintListeners.splice(A, 1);
					break
				}
			}
		};
		Timeline.OriginalEventPainter.prototype.getFilterMatcher = function () {
			return this._filterMatcher
		};
		Timeline.OriginalEventPainter.prototype.setFilterMatcher = function (A) {
			this._filterMatcher = A
		};
		Timeline.OriginalEventPainter.prototype.getHighlightMatcher = function () {
			return this._highlightMatcher
		};
		Timeline.OriginalEventPainter.prototype.setHighlightMatcher = function (A) {
			this._highlightMatcher = A
		};
		Timeline.OriginalEventPainter.prototype.paint = function () {
			var C = this._band.getEventSource();
			if (C == null) {
				return
			}
			this._eventIdToElmt = {};
			this._fireEventPaintListeners("paintStarting", null, null);
			this._prepareForPainting();
			var I = this._params.theme.event;
			var G = Math.max(I.track.height, I.tape.height + this._frc.getLineHeight());
			var F = {
				trackOffset: I.track.offset,
				trackHeight: G,
				trackGap: I.track.gap,
				trackIncrement: G + I.track.gap,
				icon: I.instant.icon,
				iconWidth: I.instant.iconWidth,
				iconHeight: I.instant.iconHeight,
				labelWidth: I.label.width,
				maxLabelChar: I.label.maxLabelChar,
				impreciseIconMargin: I.instant.impreciseIconMargin
			};
			var D = this._band.getMinDate();
			var B = this._band.getMaxDate();
			var J = (this._filterMatcher != null) ? this._filterMatcher : function (K) {
					return true
				};
			var A = (this._highlightMatcher != null) ? this._highlightMatcher : function (K) {
					return -1
				};
			var E = C.getEventReverseIterator(D, B);
			while (E.hasNext()) {
				var H = E.next();
				if (J(H)) {
					this.paintEvent(H, F, this._params.theme, A(H))
				}
			}
			this._highlightLayer.style.display = "block";
			this._lineLayer.style.display = "block";
			this._eventLayer.style.display = "block";
			this._band.updateEventTrackInfo(this._tracks.length, F.trackIncrement);
			this._fireEventPaintListeners("paintEnded", null, null)
		};
		Timeline.OriginalEventPainter.prototype.softPaint = function () {};
		Timeline.OriginalEventPainter.prototype._prepareForPainting = function () {
			var B = this._band;
			if (this._backLayer == null) {
				this._backLayer = this._band.createLayerDiv(0, "timeline-band-events");
				this._backLayer.style.visibility = "hidden";
				var A = document.createElement("span");
				A.className = "timeline-event-label";
				this._backLayer.appendChild(A);
				this._frc = SimileAjax.Graphics.getFontRenderingContext(A)
			}
			this._frc.update();
			this._tracks = [];
			if (this._highlightLayer != null) {
				B.removeLayerDiv(this._highlightLayer)
			}
			this._highlightLayer = B.createLayerDiv(105, "timeline-band-highlights");
			this._highlightLayer.style.display = "none";
			if (this._lineLayer != null) {
				B.removeLayerDiv(this._lineLayer)
			}
			this._lineLayer = B.createLayerDiv(110, "timeline-band-lines");
			this._lineLayer.style.display = "none";
			if (this._eventLayer != null) {
				B.removeLayerDiv(this._eventLayer)
			}
			this._eventLayer = B.createLayerDiv(115, "timeline-band-events");
			this._eventLayer.style.display = "none"
		};
		Timeline.OriginalEventPainter.prototype.paintEvent = function (B, C, D, A) {
			if (B.isInstant()) {
				this.paintInstantEvent(B, C, D, A)
			} else {
				this.paintDurationEvent(B, C, D, A)
			}
		};
		Timeline.OriginalEventPainter.prototype.paintInstantEvent = function (B, C, D, A) {
			if (B.isImprecise()) {
				this.paintImpreciseInstantEvent(B, C, D, A)
			} else {
				this.paintPreciseInstantEvent(B, C, D, A)
			}
		};
		Timeline.OriginalEventPainter.prototype.paintDurationEvent = function (B, C, D, A) {
			if (B.isImprecise()) {
				this.paintImpreciseDurationEvent(B, C, D, A)
			} else {
				this.paintPreciseDurationEvent(B, C, D, A)
			}
		};
		Timeline.OriginalEventPainter.prototype.paintPreciseInstantEvent = function (N, S, V, T) {
			var W = this._timeline.getDocument();
			var L = N.getText();
			var H = N.getStart();
			var I = Math.round(this._band.dateToPixelOffset(H));
			var A = Math.round(I + S.iconWidth / 2);
			var C = Math.round(I - S.iconWidth / 2);
			var F = this._getLabelDivClassName(N);
			var D = this._frc.computeSize(L, F);
			var M = A + V.event.label.offsetFromLine;
			var J = M + D.width;
			var Q = J;
			var P = this._findFreeTrack(N, Q);
			var R = Math.round(S.trackOffset + P * S.trackIncrement + S.trackHeight / 2 - D.height / 2);
			var B = this._paintEventIcon(N, P, C, S, V, 0);
			var U = this._paintEventLabel(N, L, M, R, D.width, D.height, V, F, T);
			var E = [B.elmt, U.elmt];
			var O = this;
			var K = function (Y, X, Z) {
				return O._onClickInstantEvent(B.elmt, X, N)
			};
			SimileAjax.DOM.registerEvent(B.elmt, "mousedown", K);
			SimileAjax.DOM.registerEvent(U.elmt, "mousedown", K);
			var G = this._createHighlightDiv(T, B, V, N);
			if (G != null) {
				E.push(G)
			}
			this._fireEventPaintListeners("paintedEvent", N, E);
			this._eventIdToElmt[N.getID()] = B.elmt;
			this._tracks[P] = C
		};
		Timeline.OriginalEventPainter.prototype.paintImpreciseInstantEvent = function (P, U, Z, W) {
			var b = this._timeline.getDocument();
			var N = P.getText();
			var J = P.getStart();
			var X = P.getEnd();
			var K = Math.round(this._band.dateToPixelOffset(J));
			var B = Math.round(this._band.dateToPixelOffset(X));
			var A = Math.round(K + U.iconWidth / 2);
			var D = Math.round(K - U.iconWidth / 2);
			var H = this._getLabelDivClassName(P);
			var F = this._frc.computeSize(N, H);
			var O = A + Z.event.label.offsetFromLine;
			var L = O + F.width;
			var S = Math.max(L, B);
			var R = this._findFreeTrack(P, S);
			var a = Z.event.tape.height;
			var T = Math.round(U.trackOffset + R * U.trackIncrement + a);
			var C = this._paintEventIcon(P, R, D, U, Z, a);
			var Y = this._paintEventLabel(P, N, O, T, F.width, F.height, Z, H, W);
			var V = P.getColor();
			V = V != null ? V : Z.event.instant.impreciseColor;
			var E = this._paintEventTape(P, R, K, B, V, Z.event.instant.impreciseOpacity, U, Z, 0);
			var G = [C.elmt, Y.elmt, E.elmt];
			var Q = this;
			var M = function (d, c, e) {
				return Q._onClickInstantEvent(C.elmt, c, P)
			};
			SimileAjax.DOM.registerEvent(C.elmt, "mousedown", M);
			SimileAjax.DOM.registerEvent(E.elmt, "mousedown", M);
			SimileAjax.DOM.registerEvent(Y.elmt, "mousedown", M);
			var I = this._createHighlightDiv(W, C, Z, P);
			if (I != null) {
				G.push(I)
			}
			this._fireEventPaintListeners("paintedEvent", P, G);
			this._eventIdToElmt[P.getID()] = C.elmt;
			this._tracks[R] = D
		};
		Timeline.OriginalEventPainter.prototype.paintPreciseDurationEvent = function (M, R, W, T) {
			var X = this._timeline.getDocument();
			var K = M.getText();
			var G = M.getStart();
			var U = M.getEnd();
			var H = Math.round(this._band.dateToPixelOffset(G));
			var A = Math.round(this._band.dateToPixelOffset(U));
			var E = this._getLabelDivClassName(M);
			var C = this._frc.computeSize(K, E);
			var L = H;
			var I = L + C.width;
			var P = Math.max(I, A);
			var O = this._findFreeTrack(M, P);
			var Q = Math.round(R.trackOffset + O * R.trackIncrement + W.event.tape.height);
			var S = M.getColor();
			S = S != null ? S : W.event.duration.color;
			var B = this._paintEventTape(M, O, H, A, S, 100, R, W, 0);
			var V = this._paintEventLabel(M, K, L, Q, C.width, C.height, W, E, T);
			var D = [B.elmt, V.elmt];
			var N = this;
			var J = function (Z, Y, a) {
				return N._onClickDurationEvent(B.elmt, Y, M)
			};
			SimileAjax.DOM.registerEvent(B.elmt, "mousedown", J);
			SimileAjax.DOM.registerEvent(V.elmt, "mousedown", J);
			var F = this._createHighlightDiv(T, B, W, M);
			if (F != null) {
				D.push(F)
			}
			this._fireEventPaintListeners("paintedEvent", M, D);
			this._eventIdToElmt[M.getID()] = B.elmt;
			this._tracks[O] = H
		};
		Timeline.OriginalEventPainter.prototype.paintImpreciseDurationEvent = function (O, W, b, Y) {
			var c = this._timeline.getDocument();
			var M = O.getText();
			var I = O.getStart();
			var V = O.getLatestStart();
			var Z = O.getEnd();
			var Q = O.getEarliestEnd();
			var K = Math.round(this._band.dateToPixelOffset(I));
			var F = Math.round(this._band.dateToPixelOffset(V));
			var A = Math.round(this._band.dateToPixelOffset(Z));
			var G = Math.round(this._band.dateToPixelOffset(Q));
			var E = this._getLabelDivClassName(O);
			var C = this._frc.computeSize(M, E);
			var N = F;
			var J = N + C.width;
			var S = Math.max(J, A);
			var R = this._findFreeTrack(O, S);
			var T = Math.round(W.trackOffset + R * W.trackIncrement + b.event.tape.height);
			var X = O.getColor();
			X = X != null ? X : b.event.duration.color;
			var U = this._paintEventTape(O, R, K, A, b.event.duration.impreciseColor, b.event.duration.impreciseOpacity, W, b, 0);
			var B = this._paintEventTape(O, R, F, G, X, 100, W, b, 1);
			var a = this._paintEventLabel(O, M, N, T, C.width, C.height, b, E, Y);
			var D = [U.elmt, B.elmt, a.elmt];
			var P = this;
			var L = function (e, d, f) {
				return P._onClickDurationEvent(B.elmt, d, O)
			};
			SimileAjax.DOM.registerEvent(B.elmt, "mousedown", L);
			SimileAjax.DOM.registerEvent(a.elmt, "mousedown", L);
			var H = this._createHighlightDiv(Y, B, b, O);
			if (H != null) {
				D.push(H)
			}
			this._fireEventPaintListeners("paintedEvent", O, D);
			this._eventIdToElmt[O.getID()] = B.elmt;
			this._tracks[R] = K
		};
		Timeline.OriginalEventPainter.prototype._encodeEventElID = function (B, A) {
			return Timeline.EventUtils.encodeEventElID(this._timeline, this._band, B, A)
		};
		Timeline.OriginalEventPainter.prototype._findFreeTrack = function (E, D) {
			var A = E.getTrackNum();
			if (A != null) {
				return A
			}
			for (var C = 0; C < this._tracks.length; C++) {
				var B = this._tracks[C];
				if (B > D) {
					break
				}
			}
			return C
		};
		Timeline.OriginalEventPainter.prototype._paintEventIcon = function (K, B, C, G, F, D) {
			var I = K.getIcon();
			I = I != null ? I : G.icon;
			var J;
			if (D > 0) {
				J = G.trackOffset + B * G.trackIncrement + D + G.impreciseIconMargin
			} else {
				var H = G.trackOffset + B * G.trackIncrement + G.trackHeight / 2;
				J = Math.round(H - G.iconHeight / 2)
			}
			var E = SimileAjax.Graphics.createTranslucentImage(I);
			var A = this._timeline.getDocument().createElement("div");
			A.className = this._getElClassName("timeline-event-icon", K, "icon");
			A.id = this._encodeEventElID("icon", K);
			A.style.left = C + "px";
			A.style.top = J + "px";
			A.appendChild(E);
			if (K._title != null) {
				A.title = K._title
			}
			this._eventLayer.appendChild(A);
			return {
				left: C,
				top: J,
				width: G.iconWidth,
				height: G.iconHeight,
				elmt: A
			}
		};
		Timeline.OriginalEventPainter.prototype._paintEventLabel = function (K, L, D, H, A, J, G, E, C) {
			var I = this._timeline.getDocument();
			var B = I.createElement("div");
			B.className = E;
			B.id = this._encodeEventElID("label", K);
			B.style.left = D + "px";
			B.style.width = A + "px";
			B.style.top = H + "px";
			B.innerHTML = L;
			if (K._title != null) {
				B.title = K._title
			}
			var F = K.getTextColor();
			if (F == null) {
				F = K.getColor()
			}
			if (F != null) {
				B.style.color = F
			}
			if (G.event.highlightLabelBackground && C >= 0) {
				B.style.background = this._getHighlightColor(C, G)
			}
			this._eventLayer.appendChild(B);
			return {
				left: D,
				top: H,
				width: A,
				height: J,
				elmt: B
			}
		};
		Timeline.OriginalEventPainter.prototype._paintEventTape = function (N, B, D, A, G, C, J, I, M) {
			var F = A - D;
			var E = I.event.tape.height;
			var K = J.trackOffset + B * J.trackIncrement;
			var O = this._timeline.getDocument().createElement("div");
			O.className = this._getElClassName("timeline-event-tape", N, "tape");
			O.id = this._encodeEventElID("tape" + M, N);
			O.style.left = D + "px";
			O.style.width = F + "px";
			O.style.height = E + "px";
			O.style.top = K + "px";
			if (N._title != null) {
				O.title = N._title
			}
			if (G != null) {
				O.style.backgroundColor = G
			}
			var L = N.getTapeImage();
			var H = N.getTapeRepeat();
			H = H != null ? H : "repeat";
			if (L != null) {
				O.style.backgroundImage = "url(" + L + ")";
				O.style.backgroundRepeat = H
			}
			SimileAjax.Graphics.setOpacity(O, C);
			this._eventLayer.appendChild(O);
			return {
				left: D,
				top: K,
				width: F,
				height: E,
				elmt: O
			}
		};
		Timeline.OriginalEventPainter.prototype._getLabelDivClassName = function (A) {
			return this._getElClassName("timeline-event-label", A, "label")
		};
		Timeline.OriginalEventPainter.prototype._getElClassName = function (D, C, A) {
			var E = C.getClassName(),
				B = [];
			if (E) {
				if (A) {
					B.push(A + "-" + E + " ")
				}
				B.push(E + " ")
			}
			B.push(D);
			return (B.join(""))
		};
		Timeline.OriginalEventPainter.prototype._getHighlightColor = function (A, B) {
			var C = B.event.highlightColors;
			return C[Math.min(A, C.length - 1)]
		};
		Timeline.OriginalEventPainter.prototype._createHighlightDiv = function (A, D, F, B) {
			var G = null;
			if (A >= 0) {
				var E = this._timeline.getDocument();
				var C = this._getHighlightColor(A, F);
				G = E.createElement("div");
				G.className = this._getElClassName("timeline-event-highlight", B, "highlight");
				G.id = this._encodeEventElID("highlight0", B);
				G.style.position = "absolute";
				G.style.overflow = "hidden";
				G.style.left = (D.left - 2) + "px";
				G.style.width = (D.width + 4) + "px";
				G.style.top = (D.top - 2) + "px";
				G.style.height = (D.height + 4) + "px";
				G.style.background = C;
				this._highlightLayer.appendChild(G)
			}
			return G
		};
		Timeline.OriginalEventPainter.prototype._onClickInstantEvent = function (C, A, B) {
			var D = SimileAjax.DOM.getPageCoordinates(C);
			this._showBubble(D.left + Math.ceil(C.offsetWidth / 2), D.top + Math.ceil(C.offsetHeight / 2), B);
			this._fireOnSelect(B.getID());
			A.cancelBubble = true;
			SimileAjax.DOM.cancelEvent(A);
			return false
		};
		Timeline.OriginalEventPainter.prototype._onClickDurationEvent = function (F, B, C) {
			if ("pageX" in B) {
				var A = B.pageX;
				var E = B.pageY
			} else {
				var D = SimileAjax.DOM.getPageCoordinates(F);
				var A = B.offsetX + D.left;
				var E = B.offsetY + D.top
			}
			this._showBubble(A, E, C);
			this._fireOnSelect(C.getID());
			B.cancelBubble = true;
			SimileAjax.DOM.cancelEvent(B);
			return false
		};
		Timeline.OriginalEventPainter.prototype.showBubble = function (A) {
			var B = this._eventIdToElmt[A.getID()];
			if (B) {
				var C = SimileAjax.DOM.getPageCoordinates(B);
				this._showBubble(C.left + B.offsetWidth / 2, C.top + B.offsetHeight / 2, A)
			}
		};
		Timeline.OriginalEventPainter.prototype._showBubble = function (B, E, C) {
			var D = document.createElement("div");
			var A = this._params.theme.event.bubble;
			C.fillInfoBubble(D, this._params.theme, this._band.getLabeller());
			SimileAjax.WindowManager.cancelPopups();
			SimileAjax.Graphics.createBubbleForContentAndPoint(D, B, E, A.width, null, A.maxHeight)
		};
		Timeline.OriginalEventPainter.prototype._fireOnSelect = function (A) {
			for (var B = 0; B < this._onSelectListeners.length; B++) {
				this._onSelectListeners[B](A)
			}
		};
		Timeline.OriginalEventPainter.prototype._fireEventPaintListeners = function (D, A, C) {
			for (var B = 0; B < this._eventPaintListeners.length; B++) {
				this._eventPaintListeners[B](this._band, D, A, C)
			}
		};
		Timeline.OverviewEventPainter = function (A) {
			this._params = A;
			this._onSelectListeners = [];
			this._filterMatcher = null;
			this._highlightMatcher = null
		};
		Timeline.OverviewEventPainter.prototype.initialize = function (B, A) {
			this._band = B;
			this._timeline = A;
			this._eventLayer = null;
			this._highlightLayer = null
		};
		Timeline.OverviewEventPainter.prototype.getType = function () {
			return "overview"
		};
		Timeline.OverviewEventPainter.prototype.addOnSelectListener = function (A) {
			this._onSelectListeners.push(A)
		};
		Timeline.OverviewEventPainter.prototype.removeOnSelectListener = function (B) {
			for (var A = 0; A < this._onSelectListeners.length; A++) {
				if (this._onSelectListeners[A] == B) {
					this._onSelectListeners.splice(A, 1);
					break
				}
			}
		};
		Timeline.OverviewEventPainter.prototype.getFilterMatcher = function () {
			return this._filterMatcher
		};
		Timeline.OverviewEventPainter.prototype.setFilterMatcher = function (A) {
			this._filterMatcher = A
		};
		Timeline.OverviewEventPainter.prototype.getHighlightMatcher = function () {
			return this._highlightMatcher
		};
		Timeline.OverviewEventPainter.prototype.setHighlightMatcher = function (A) {
			this._highlightMatcher = A
		};
		Timeline.OverviewEventPainter.prototype.paint = function () {
			var C = this._band.getEventSource();
			if (C == null) {
				return
			}
			this._prepareForPainting();
			var H = this._params.theme.event;
			var F = {
				trackOffset: H.overviewTrack.offset,
				trackHeight: H.overviewTrack.height,
				trackGap: H.overviewTrack.gap,
				trackIncrement: H.overviewTrack.height + H.overviewTrack.gap
			};
			var D = this._band.getMinDate();
			var B = this._band.getMaxDate();
			var I = (this._filterMatcher != null) ? this._filterMatcher : function (J) {
					return true
				};
			var A = (this._highlightMatcher != null) ? this._highlightMatcher : function (J) {
					return -1
				};
			var E = C.getEventReverseIterator(D, B);
			while (E.hasNext()) {
				var G = E.next();
				if (I(G)) {
					this.paintEvent(G, F, this._params.theme, A(G))
				}
			}
			this._highlightLayer.style.display = "block";
			this._eventLayer.style.display = "block";
			this._band.updateEventTrackInfo(this._tracks.length, F.trackIncrement)
		};
		Timeline.OverviewEventPainter.prototype.softPaint = function () {};
		Timeline.OverviewEventPainter.prototype._prepareForPainting = function () {
			var A = this._band;
			this._tracks = [];
			if (this._highlightLayer != null) {
				A.removeLayerDiv(this._highlightLayer)
			}
			this._highlightLayer = A.createLayerDiv(105, "timeline-band-highlights");
			this._highlightLayer.style.display = "none";
			if (this._eventLayer != null) {
				A.removeLayerDiv(this._eventLayer)
			}
			this._eventLayer = A.createLayerDiv(110, "timeline-band-events");
			this._eventLayer.style.display = "none"
		};
		Timeline.OverviewEventPainter.prototype.paintEvent = function (B, C, D, A) {
			if (B.isInstant()) {
				this.paintInstantEvent(B, C, D, A)
			} else {
				this.paintDurationEvent(B, C, D, A)
			}
		};
		Timeline.OverviewEventPainter.prototype.paintInstantEvent = function (I, H, E, A) {
			var F = I.getStart();
			var B = Math.round(this._band.dateToPixelOffset(F));
			var C = I.getColor(),
				D = I.getClassName();
			if (D) {
				C = null
			} else {
				C = C != null ? C : E.event.duration.color
			}
			var G = this._paintEventTick(I, B, C, 100, H, E);
			this._createHighlightDiv(A, G, E)
		};
		Timeline.OverviewEventPainter.prototype.paintDurationEvent = function (L, K, H, B) {
			var A = L.getLatestStart();
			var I = L.getEarliestEnd();
			var J = Math.round(this._band.dateToPixelOffset(A));
			var C = Math.round(this._band.dateToPixelOffset(I));
			var F = 0;
			for (; F < this._tracks.length; F++) {
				if (C < this._tracks[F]) {
					break
				}
			}
			this._tracks[F] = C;
			var E = L.getColor(),
				G = L.getClassName();
			if (G) {
				E = null
			} else {
				E = E != null ? E : H.event.duration.color
			}
			var D = this._paintEventTape(L, F, J, C, E, 100, K, H, G);
			this._createHighlightDiv(B, D, H)
		};
		Timeline.OverviewEventPainter.prototype._paintEventTape = function (K, B, D, L, E, C, H, G, F) {
			var I = H.trackOffset + B * H.trackIncrement;
			var A = L - D;
			var J = H.trackHeight;
			var M = this._timeline.getDocument().createElement("div");
			M.className = "timeline-small-event-tape";
			if (F) {
				M.className += " small-" + F
			}
			M.style.left = D + "px";
			M.style.width = A + "px";
			M.style.top = I + "px";
			M.style.height = J + "px";
			if (E) {
				M.style.backgroundColor = E
			}
			if (C < 100) {
				SimileAjax.Graphics.setOpacity(M, C)
			}
			this._eventLayer.appendChild(M);
			return {
				left: D,
				top: I,
				width: A,
				height: J,
				elmt: M
			}
		};
		Timeline.OverviewEventPainter.prototype._paintEventTick = function (J, C, D, B, G, F) {
			var I = F.event.overviewTrack.tickHeight;
			var H = G.trackOffset - I;
			var A = 1;
			var K = this._timeline.getDocument().createElement("div");
			K.className = "timeline-small-event-icon";
			K.style.left = C + "px";
			K.style.top = H + "px";
			$(K).css('backgroundColor', D);
			var E = J.getClassName();
			if (E) {
				K.className += " small-" + E
			}
			if (B < 100) {
				SimileAjax.Graphics.setOpacity(K, B)
			}
			this._eventLayer.appendChild(K);
			return {
				left: C,
				top: H,
				width: A,
				height: I,
				elmt: K
			}
		};
		Timeline.OverviewEventPainter.prototype._createHighlightDiv = function (A, C, E) {
			if (A >= 0) {
				var D = this._timeline.getDocument();
				var G = E.event;
				var B = G.highlightColors[Math.min(A, G.highlightColors.length - 1)];
				var F = D.createElement("div");
				F.style.position = "absolute";
				F.style.overflow = "hidden";
				F.style.left = (C.left - 1) + "px";
				F.style.width = (C.width + 2) + "px";
				F.style.top = (C.top - 1) + "px";
				F.style.height = (C.height + 2) + "px";
				F.style.background = B;
				this._highlightLayer.appendChild(F)
			}
		};
		Timeline.OverviewEventPainter.prototype.showBubble = function (A) {};
		Timeline.DefaultEventSource = function (A) {
			this._events = (A instanceof Object) ? A : new SimileAjax.EventIndex();
			this._listeners = []
		};
		Timeline.DefaultEventSource.prototype.addListener = function (A) {
			this._listeners.push(A)
		};
		Timeline.DefaultEventSource.prototype.removeListener = function (B) {
			for (var A = 0; A < this._listeners.length; A++) {
				if (this._listeners[A] == B) {
					this._listeners.splice(A, 1);
					break
				}
			}
		};
		Timeline.DefaultEventSource.prototype.loadXML = function (G, A) {
			var C = this._getBaseURL(A);
			var H = G.documentElement.getAttribute("wiki-url");
			var J = G.documentElement.getAttribute("wiki-section");
			var F = G.documentElement.getAttribute("date-time-format");
			var E = this._events.getUnit().getParser(F);
			var D = G.documentElement.firstChild;
			var I = false;
			while (D != null) {
				if (D.nodeType == 1) {
					var L = "";
					if (D.firstChild != null && D.firstChild.nodeType == 3) {
						L = D.firstChild.nodeValue
					}
					var B = (D.getAttribute("isDuration") === null && D.getAttribute("durationEvent") === null) || D.getAttribute("isDuration") == "false" || D.getAttribute("durationEvent") == "false";
					var K = new Timeline.DefaultEventSource.Event({
						id: D.getAttribute("id"),
						start: E(D.getAttribute("start")),
						end: E(D.getAttribute("end")),
						latestStart: E(D.getAttribute("latestStart")),
						earliestEnd: E(D.getAttribute("earliestEnd")),
						instant: B,
						text: D.getAttribute("title"),
						description: L,
						image: this._resolveRelativeURL(D.getAttribute("image"), C),
						link: this._resolveRelativeURL(D.getAttribute("link"), C),
						icon: this._resolveRelativeURL(D.getAttribute("icon"), C),
						color: D.getAttribute("color"),
						textColor: D.getAttribute("textColor"),
						hoverText: D.getAttribute("hoverText"),
						classname: D.getAttribute("classname"),
						tapeImage: D.getAttribute("tapeImage"),
						tapeRepeat: D.getAttribute("tapeRepeat"),
						caption: D.getAttribute("caption"),
						eventID: D.getAttribute("eventID"),
						trackNum: D.getAttribute("trackNum")
					});
					K._node = D;
					K.getProperty = function (M) {
						return this._node.getAttribute(M)
					};
					K.setWikiInfo(H, J);
					this._events.add(K);
					I = true
				}
				D = D.nextSibling
			}
			if (I) {
				this._fire("onAddMany", [])
			}
		};
		Timeline.DefaultEventSource.prototype.loadJSON = function (H, B) {
			var D = this._getBaseURL(B);
			var J = false;
			if (H && H.events) {
				var I = ("wikiURL" in H) ? H.wikiURL : null;
				var K = ("wikiSection" in H) ? H.wikiSection : null;
				var F = ("dateTimeFormat" in H) ? H.dateTimeFormat : null;
				var E = this._events.getUnit().getParser(F);
				for (var G = 0; G < H.events.length; G++) {
					var A = H.events[G];
					var C = A.isDuration || (A.durationEvent != null && !A.durationEvent);
					var L = new Timeline.DefaultEventSource.Event({
						id: ("id" in A) ? A.id : undefined,
						start: E(A.start),
						end: E(A.end),
						latestStart: E(A.latestStart),
						earliestEnd: E(A.earliestEnd),
						instant: C,
						text: A.title,
						description: A.description,
						image: this._resolveRelativeURL(A.image, D),
						link: this._resolveRelativeURL(A.link, D),
						icon: this._resolveRelativeURL(A.icon, D),
						color: A.color,
						textColor: A.textColor,
						hoverText: A.hoverText,
						classname: A.classname,
						tapeImage: A.tapeImage,
						tapeRepeat: A.tapeRepeat,
						caption: A.caption,
						eventID: A.eventID,
						trackNum: A.trackNum
					});
					L._obj = A;
					L.getProperty = function (M) {
						return this._obj[M]
					};
					L.setWikiInfo(I, K);
					this._events.add(L);
					J = true
				}
			}
			if (J) {
				this._fire("onAddMany", [])
			}
		};
		Timeline.DefaultEventSource.prototype.loadSPARQL = function (I, B) {
			var E = this._getBaseURL(B);
			var H = "iso8601";
			var G = this._events.getUnit().getParser(H);
			if (I == null) {
				return
			}
			var F = I.documentElement.firstChild;
			while (F != null && (F.nodeType != 1 || F.nodeName != "results")) {
				F = F.nextSibling
			}
			var J = null;
			var L = null;
			if (F != null) {
				J = F.getAttribute("wiki-url");
				L = F.getAttribute("wiki-section");
				F = F.firstChild
			}
			var K = false;
			while (F != null) {
				if (F.nodeType == 1) {
					var D = {};
					var A = F.firstChild;
					while (A != null) {
						if (A.nodeType == 1 && A.firstChild != null && A.firstChild.nodeType == 1 && A.firstChild.firstChild != null && A.firstChild.firstChild.nodeType == 3) {
							D[A.getAttribute("name")] = A.firstChild.firstChild.nodeValue
						}
						A = A.nextSibling
					}
					if (D.start == null && D.date != null) {
						D.start = D.date
					}
					var C = (D.isDuration === null && D.durationEvent === null) || D.isDuration == "false" || D.durationEvent == "false";
					var M = new Timeline.DefaultEventSource.Event({
						id: D.id,
						start: G(D.start),
						end: G(D.end),
						latestStart: G(D.latestStart),
						earliestEnd: G(D.earliestEnd),
						instant: C,
						text: D.title,
						description: D.description,
						image: this._resolveRelativeURL(D.image, E),
						link: this._resolveRelativeURL(D.link, E),
						icon: this._resolveRelativeURL(D.icon, E),
						color: D.color,
						textColor: D.textColor,
						hoverText: D.hoverText,
						caption: D.caption,
						classname: D.classname,
						tapeImage: D.tapeImage,
						tapeRepeat: D.tapeRepeat,
						eventID: D.eventID,
						trackNum: D.trackNum
					});
					M._bindings = D;
					M.getProperty = function (N) {
						return this._bindings[N]
					};
					M.setWikiInfo(J, L);
					this._events.add(M);
					K = true
				}
				F = F.nextSibling
			}
			if (K) {
				this._fire("onAddMany", [])
			}
		};
		Timeline.DefaultEventSource.prototype.add = function (A) {
			this._events.add(A);
			this._fire("onAddOne", [A])
		};
		Timeline.DefaultEventSource.prototype.addMany = function (A) {
			for (var B = 0; B < A.length; B++) {
				this._events.add(A[B])
			}
			this._fire("onAddMany", [])
		};
		Timeline.DefaultEventSource.prototype.clear = function () {
			this._events.removeAll();
			this._fire("onClear", [])
		};
		Timeline.DefaultEventSource.prototype.getEvent = function (A) {
			return this._events.getEvent(A)
		};
		Timeline.DefaultEventSource.prototype.getEventIterator = function (A, B) {
			return this._events.getIterator(A, B)
		};
		Timeline.DefaultEventSource.prototype.getEventReverseIterator = function (A, B) {
			return this._events.getReverseIterator(A, B)
		};
		Timeline.DefaultEventSource.prototype.getAllEventIterator = function () {
			return this._events.getAllIterator()
		};
		Timeline.DefaultEventSource.prototype.getCount = function () {
			return this._events.getCount()
		};
		Timeline.DefaultEventSource.prototype.getEarliestDate = function () {
			return this._events.getEarliestDate()
		};
		Timeline.DefaultEventSource.prototype.getLatestDate = function () {
			return this._events.getLatestDate()
		};
		Timeline.DefaultEventSource.prototype._fire = function (B, A) {
			for (var C = 0; C < this._listeners.length; C++) {
				var D = this._listeners[C];
				if (B in D) {
					try {
						D[B].apply(D, A)
					} catch (E) {
						SimileAjax.Debug.exception(E)
					}
				}
			}
		};
		Timeline.DefaultEventSource.prototype._getBaseURL = function (A) {
			if (A.indexOf("://") < 0) {
				var C = this._getBaseURL(document.location.href);
				if (A.substr(0, 1) == "/") {
					A = C.substr(0, C.indexOf("/", C.indexOf("://") + 3)) + A
				} else {
					A = C + A
				}
			}
			var B = A.lastIndexOf("/");
			if (B < 0) {
				return ""
			} else {
				return A.substr(0, B + 1)
			}
		};
		Timeline.DefaultEventSource.prototype._resolveRelativeURL = function (A, B) {
			if (A == null || A == "") {
				return A
			} else {
				if (A.indexOf("://") > 0) {
					return A
				} else {
					if (A.substr(0, 1) == "/") {
						return B.substr(0, B.indexOf("/", B.indexOf("://") + 3)) + A
					} else {
						return B + A
					}
				}
			}
		};
		Timeline.DefaultEventSource.Event = function (A) {
			function D(E) {
				return (A[E] != null && A[E] != "") ? A[E] : null
			}
			var C = A.id ? A.id.trim() : "";
			this._id = C.length > 0 ? C : Timeline.EventUtils.getNewEventID();
			this._instant = A.instant || (A.end == null);
			this._start = A.start;
			this._end = (A.end != null) ? A.end : A.start;
			this._latestStart = (A.latestStart != null) ? A.latestStart : (A.instant ? this._end : this._start);
			this._earliestEnd = (A.earliestEnd != null) ? A.earliestEnd : this._end;
			var B = [];
			if (this._start > this._latestStart) {
				this._latestStart = this._start;
				B.push("start is > latestStart")
			}
			if (this._start > this._earliestEnd) {
				this._earliestEnd = this._latestStart;
				B.push("start is > earliestEnd")
			}
			if (this._start > this._end) {
				this._end = this._earliestEnd;
				B.push("start is > end")
			}
			if (this._latestStart > this._earliestEnd) {
				this._earliestEnd = this._latestStart;
				B.push("latestStart is > earliestEnd")
			}
			if (this._latestStart > this._end) {
				this._end = this._earliestEnd;
				B.push("latestStart is > end")
			}
			if (this._earliestEnd > this._end) {
				this._end = this._earliestEnd;
				B.push("earliestEnd is > end")
			}
			this._eventID = D("eventID");
			this._text = (A.text != null) ? SimileAjax.HTML.deEntify(A.text) : "";
			if (B.length > 0) {
				this._text += " PROBLEM: " + B.join(", ")
			}
			this._description = SimileAjax.HTML.deEntify(A.description);
			this._image = D("image");
			this._link = D("link");
			this._title = D("hoverText");
			this._title = D("caption");
			this._icon = D("icon");
			this._color = D("color");
			this._textColor = D("textColor");
			this._classname = D("classname");
			this._tapeImage = D("tapeImage");
			this._tapeRepeat = D("tapeRepeat");
			this._trackNum = D("trackNum");
			if (this._trackNum != null) {
				this._trackNum = parseInt(this._trackNum)
			}
			this._wikiURL = null;
			this._wikiSection = null
		};
		Timeline.DefaultEventSource.Event.prototype = {
			getID: function () {
				return this._id
			},
			isInstant: function () {
				return this._instant
			},
			isImprecise: function () {
				return this._start != this._latestStart || this._end != this._earliestEnd
			},
			getStart: function () {
				return this._start
			},
			getEnd: function () {
				return this._end
			},
			getLatestStart: function () {
				return this._latestStart
			},
			getEarliestEnd: function () {
				return this._earliestEnd
			},
			getEventID: function () {
				return this._eventID
			},
			getText: function () {
				return this._text
			},
			getDescription: function () {
				return this._description
			},
			getImage: function () {
				return this._image
			},
			getLink: function () {
				return this._link
			},
			getIcon: function () {
				return this._icon
			},
			getColor: function () {
				return this._color
			},
			getTextColor: function () {
				return this._textColor
			},
			getClassName: function () {
				return this._classname
			},
			getTapeImage: function () {
				return this._tapeImage
			},
			getTapeRepeat: function () {
				return this._tapeRepeat
			},
			getTrackNum: function () {
				return this._trackNum
			},
			getProperty: function (A) {
				return null
			},
			getWikiURL: function () {
				return this._wikiURL
			},
			getWikiSection: function () {
				return this._wikiSection
			},
			setWikiInfo: function (B, A) {
				this._wikiURL = B;
				this._wikiSection = A
			},
			fillDescription: function (A) {
				A.innerHTML = this._description
			},
			fillWikiInfo: function (D) {
				D.style.display = "none";
				if (this._wikiURL == null || this._wikiSection == null) {
					return
				}
				var C = this.getProperty("wikiID");
				if (C == null || C.length == 0) {
					C = this.getText()
				}
				if (C == null || C.length == 0) {
					return
				}
				D.style.display = "inline";
				C = C.replace(/\s/g, "_");
				var B = this._wikiURL + this._wikiSection.replace(/\s/g, "_") + "/" + C;
				var A = document.createElement("a");
				A.href = B;
				A.target = "new";
				A.innerHTML = Timeline.strings[Timeline.clientLocale].wikiLinkLabel;
				D.appendChild(document.createTextNode("["));
				D.appendChild(A);
				D.appendChild(document.createTextNode("]"))
			},
			fillTime: function (A, B) {
				if (this._instant) {
					if (this.isImprecise()) {
						A.appendChild(A.ownerDocument.createTextNode(B.labelPrecise(this._start)));
						A.appendChild(A.ownerDocument.createElement("br"));
						A.appendChild(A.ownerDocument.createTextNode(B.labelPrecise(this._end)))
					} else {
						A.appendChild(A.ownerDocument.createTextNode(B.labelPrecise(this._start)))
					}
				} else {
					if (this.isImprecise()) {
						A.appendChild(A.ownerDocument.createTextNode(B.labelPrecise(this._start) + " ~ " + B.labelPrecise(this._latestStart)));
						A.appendChild(A.ownerDocument.createElement("br"));
						A.appendChild(A.ownerDocument.createTextNode(B.labelPrecise(this._earliestEnd) + " ~ " + B.labelPrecise(this._end)))
					} else {
						A.appendChild(A.ownerDocument.createTextNode(B.labelPrecise(this._start)));
						A.appendChild(A.ownerDocument.createElement("br"));
						A.appendChild(A.ownerDocument.createTextNode(B.labelPrecise(this._end)))
					}
				}
			},
			fillInfoBubble: function (A, E, M) {
				var K = A.ownerDocument;
				var J = this.getText();
				var H = this.getLink();
				var B = this.getImage();
				if (B != null) {
					var D = K.createElement("img");
					D.src = B;
					E.event.bubble.imageStyler(D);
					A.appendChild(D)
				}
				var L = K.createElement("div");
				var C = K.createTextNode(J);
				if (H != null) {
					var I = K.createElement("a");
					I.href = H;
					I.appendChild(C);
					L.appendChild(I)
				} else {
					L.appendChild(C)
				}
				E.event.bubble.titleStyler(L);
				A.appendChild(L);
				var N = K.createElement("div");
				this.fillDescription(N);
				E.event.bubble.bodyStyler(N);
				A.appendChild(N);
				var G = K.createElement("div");
				this.fillTime(G, M);
				E.event.bubble.timeStyler(G);
				A.appendChild(G);
				var F = K.createElement("div");
				this.fillWikiInfo(F);
				E.event.bubble.wikiStyler(F);
				A.appendChild(F)
			}
		};
		Timeline.ClassicTheme = new Object();
		Timeline.ClassicTheme.implementations = [];
		Timeline.ClassicTheme.create = function (B) {
			if (B == null) {
				B = Timeline.getDefaultLocale()
			}
			var A = Timeline.ClassicTheme.implementations[B];
			if (A == null) {
				A = Timeline.ClassicTheme._Impl
			}
			return new A()
		};
		Timeline.ClassicTheme._Impl = function () {
			this.firstDayOfWeek = 0;
			this.autoWidth = false;
			this.autoWidthAnimationTime = 500;
			this.timeline_start = null;
			this.timeline_stop = null;
			this.ether = {
				backgroundColors: [],
				highlightOpacity: 50,
				interval: {
					line: {
						show: true,
						opacity: 25
					},
					weekend: {
						opacity: 30
					},
					marker: {
						hAlign: "Bottom",
						vAlign: "Right"
					}
				}
			};
			this.event = {
				track: {
					height: 10,
					gap: 2,
					offset: 2,
					autoWidthMargin: 1.5
				},
				overviewTrack: {
					offset: 20,
					tickHeight: 6,
					height: 2,
					gap: 1,
					autoWidthMargin: 5
				},
				tape: {
					height: 4
				},
				instant: {
					// **MODIFIED BY BRAEDEN PETRUK **
					icon: Environment.routes.imageDirectory + "/dull-blue-circle.png",
					// ** END MODIFICATION **
					iconWidth: 10,
					iconHeight: 10,
					impreciseOpacity: 20,
					impreciseIconMargin: 3
				},
				duration: {
					impreciseOpacity: 20
				},
				label: {
					backgroundOpacity: 50,
					offsetFromLine: 3
				},
				highlightColors: ["#FFFF00", "#FFC000", "#FF0000", "#0000FF"],
				highlightLabelBackground: false,
				bubble: {
					width: 250,
					maxHeight: 0,
					titleStyler: function (A) {
						A.className = "timeline-event-bubble-title"
					},
					bodyStyler: function (A) {
						A.className = "timeline-event-bubble-body"
					},
					imageStyler: function (A) {
						A.className = "timeline-event-bubble-image"
					},
					wikiStyler: function (A) {
						A.className = "timeline-event-bubble-wiki"
					},
					timeStyler: function (A) {
						A.className = "timeline-event-bubble-time"
					}
				}
			};
			this.mouseWheel = "scroll"
		};
		Timeline.version = "2.3.0";
		Timeline.ajax_lib_version = SimileAjax.version;
		Timeline.display_version = Timeline.version + " (with Ajax lib " + Timeline.ajax_lib_version + ")";
		Timeline.strings = {};
		Timeline.HORIZONTAL = 0;
		Timeline.VERTICAL = 1;
		Timeline._defaultTheme = null;
		Timeline.getDefaultLocale = function () {
			return Timeline.clientLocale
		};
		Timeline.create = function (D, C, E, F) {
			if (Timeline.timelines == null) {
				Timeline.timelines = []
			}
			var B = Timeline.timelines.length;
			Timeline.timelines[B] = null;
			var A = new Timeline._Impl(D, C, E, F, B);
			Timeline.timelines[B] = A;
			return A
		};
		Timeline.createBandInfo = function (F) {
			var G = ("theme" in F) ? F.theme : Timeline.getDefaultTheme();
			var D = ("eventSource" in F) ? F.eventSource : null;
			var H = new Timeline.LinearEther({
				centersOn: ("date" in F) ? F.date : new Date(),
				interval: SimileAjax.DateTime.gregorianUnitLengths[F.intervalUnit],
				pixelsPerInterval: F.intervalPixels,
				theme: G
			});
			var C = new Timeline.GregorianEtherPainter({
				unit: F.intervalUnit,
				multiple: ("multiple" in F) ? F.multiple : 1,
				theme: G,
				align: ("align" in F) ? F.align : undefined
			});
			var I = {
				showText: ("showEventText" in F) ? F.showEventText : true,
				theme: G
			};
			if ("eventPainterParams" in F) {
				for (var A in F.eventPainterParams) {
					I[A] = F.eventPainterParams[A]
				}
			}
			if ("trackHeight" in F) {
				I.trackHeight = F.trackHeight
			}
			if ("trackGap" in F) {
				I.trackGap = F.trackGap
			}
			var B = ("overview" in F && F.overview) ? "overview" : ("layout" in F ? F.layout : "original");
			var E;
			if ("eventPainter" in F) {
				E = new F.eventPainter(I)
			} else {
				switch (B) {
					case "overview":
						E = new Timeline.OverviewEventPainter(I);
						break;
					case "detailed":
						E = new Timeline.DetailedEventPainter(I);
						break;
					default:
						E = new Timeline.OriginalEventPainter(I)
				}
			}
			return {
				width: F.width,
				eventSource: D,
				timeZone: ("timeZone" in F) ? F.timeZone : 0,
				ether: H,
				etherPainter: C,
				eventPainter: E,
				theme: G,
				zoomIndex: ("zoomIndex" in F) ? F.zoomIndex : 0,
				zoomSteps: ("zoomSteps" in F) ? F.zoomSteps : null
			}
		};
		Timeline.createHotZoneBandInfo = function (F) {
			var G = ("theme" in F) ? F.theme : Timeline.getDefaultTheme();
			var D = ("eventSource" in F) ? F.eventSource : null;
			var H = new Timeline.HotZoneEther({
				centersOn: ("date" in F) ? F.date : new Date(),
				interval: SimileAjax.DateTime.gregorianUnitLengths[F.intervalUnit],
				pixelsPerInterval: F.intervalPixels,
				zones: F.zones,
				theme: G
			});
			var C = new Timeline.HotZoneGregorianEtherPainter({
				unit: F.intervalUnit,
				zones: F.zones,
				theme: G,
				align: ("align" in F) ? F.align : undefined
			});
			var I = {
				showText: ("showEventText" in F) ? F.showEventText : true,
				theme: G
			};
			if ("eventPainterParams" in F) {
				for (var A in F.eventPainterParams) {
					I[A] = F.eventPainterParams[A]
				}
			}
			if ("trackHeight" in F) {
				I.trackHeight = F.trackHeight
			}
			if ("trackGap" in F) {
				I.trackGap = F.trackGap
			}
			var B = ("overview" in F && F.overview) ? "overview" : ("layout" in F ? F.layout : "original");
			var E;
			if ("eventPainter" in F) {
				E = new F.eventPainter(I)
			} else {
				switch (B) {
					case "overview":
						E = new Timeline.OverviewEventPainter(I);
						break;
					case "detailed":
						E = new Timeline.DetailedEventPainter(I);
						break;
					default:
						E = new Timeline.OriginalEventPainter(I)
				}
			}
			return {
				width: F.width,
				eventSource: D,
				timeZone: ("timeZone" in F) ? F.timeZone : 0,
				ether: H,
				etherPainter: C,
				eventPainter: E,
				theme: G,
				zoomIndex: ("zoomIndex" in F) ? F.zoomIndex : 0,
				zoomSteps: ("zoomSteps" in F) ? F.zoomSteps : null
			}
		};
		Timeline.getDefaultTheme = function () {
			if (Timeline._defaultTheme == null) {
				Timeline._defaultTheme = Timeline.ClassicTheme.create(Timeline.getDefaultLocale())
			}
			return Timeline._defaultTheme
		};
		Timeline.setDefaultTheme = function (A) {
			Timeline._defaultTheme = A
		};
		Timeline.loadXML = function (A, C) {
			var D = function (G, F, E) {
				alert("Failed to load data xml from " + A + "\n" + G)
			};
			var B = function (F) {
				var E = F.responseXML;
				if (!E.documentElement && F.responseStream) {
					E.load(F.responseStream)
				}
				C(E, A)
			};
			SimileAjax.XmlHttp.get(A, D, B)
		};
		Timeline.loadJSON = function (url, f) {
			var fError = function (statusText, status, xmlhttp) {
				alert("Failed to load json data from " + url + "\n" + statusText)
			};
			var fDone = function (xmlhttp) {
				f(eval("(" + xmlhttp.responseText + ")"), url)
			};
			SimileAjax.XmlHttp.get(url, fError, fDone)
		};
		Timeline.getTimelineFromID = function (A) {
			return Timeline.timelines[A]
		};
		Timeline.writeVersion = function (A) {
			document.getElementById(A).innerHTML = this.display_version
		};
		Timeline._Impl = function (C, B, D, E, A) {
			SimileAjax.WindowManager.initialize();
			this._containerDiv = C;
			this._bandInfos = B;
			this._orientation = D == null ? Timeline.HORIZONTAL : D;
			this._unit = (E != null) ? E : SimileAjax.NativeDateUnit;
			this._starting = true;
			this._autoResizing = false;
			this.autoWidth = B && B[0] && B[0].theme && B[0].theme.autoWidth;
			this.autoWidthAnimationTime = B && B[0] && B[0].theme && B[0].theme.autoWidthAnimationTime;
			this.timelineID = A;
			this.timeline_start = B && B[0] && B[0].theme && B[0].theme.timeline_start;
			this.timeline_stop = B && B[0] && B[0].theme && B[0].theme.timeline_stop;
			this.timeline_at_start = false;
			this.timeline_at_stop = false;
			this._initialize()
		};
		Timeline._Impl.prototype.dispose = function () {
			for (var A = 0; A < this._bands.length; A++) {
				this._bands[A].dispose()
			}
			this._bands = null;
			this._bandInfos = null;
			this._containerDiv.innerHTML = "";
			Timeline.timelines[this.timelineID] = null
		};
		Timeline._Impl.prototype.getBandCount = function () {
			return this._bands.length
		};
		Timeline._Impl.prototype.getBand = function (A) {
			return this._bands[A]
		};
		Timeline._Impl.prototype.finishedEventLoading = function () {
			this._autoWidthCheck(true);
			this._starting = false
		};
		Timeline._Impl.prototype.layout = function () {
			this._autoWidthCheck(true);
			this._distributeWidths()
		};
		Timeline._Impl.prototype.paint = function () {
			for (var A = 0; A < this._bands.length; A++) {
				this._bands[A].paint()
			}
		};
		Timeline._Impl.prototype.getDocument = function () {
			return this._containerDiv.ownerDocument
		};
		Timeline._Impl.prototype.addDiv = function (A) {
			this._containerDiv.appendChild(A)
		};
		Timeline._Impl.prototype.removeDiv = function (A) {
			this._containerDiv.removeChild(A)
		};
		Timeline._Impl.prototype.isHorizontal = function () {
			return this._orientation == Timeline.HORIZONTAL
		};
		Timeline._Impl.prototype.isVertical = function () {
			return this._orientation == Timeline.VERTICAL
		};
		Timeline._Impl.prototype.getPixelLength = function () {
			return this._orientation == Timeline.HORIZONTAL ? this._containerDiv.offsetWidth : this._containerDiv.offsetHeight
		};
		Timeline._Impl.prototype.getPixelWidth = function () {
			return this._orientation == Timeline.VERTICAL ? this._containerDiv.offsetWidth : this._containerDiv.offsetHeight
		};
		Timeline._Impl.prototype.getUnit = function () {
			return this._unit
		};
		Timeline._Impl.prototype.getWidthStyle = function () {
			return this._orientation == Timeline.HORIZONTAL ? "height" : "width"
		};
		Timeline._Impl.prototype.loadXML = function (B, D) {
			var A = this;
			var E = function (H, G, F) {
				alert("Failed to load data xml from " + B + "\n" + H);
				A.hideLoadingMessage()
			};
			var C = function (G) {
				try {
					var F = G.responseXML;
					if (!F.documentElement && G.responseStream) {
						F.load(G.responseStream)
					}
					D(F, B)
				} finally {
					A.hideLoadingMessage()
				}
			};
			this.showLoadingMessage();
			window.setTimeout(function () {
				SimileAjax.XmlHttp.get(B, E, C)
			}, 0)
		};
		Timeline._Impl.prototype.loadJSON = function (url, f) {
			var tl = this;
			var fError = function (statusText, status, xmlhttp) {
				alert("Failed to load json data from " + url + "\n" + statusText);
				tl.hideLoadingMessage()
			};
			var fDone = function (xmlhttp) {
				try {
					f(eval("(" + xmlhttp.responseText + ")"), url)
				} finally {
					tl.hideLoadingMessage()
				}
			};
			this.showLoadingMessage();
			window.setTimeout(function () {
				SimileAjax.XmlHttp.get(url, fError, fDone)
			}, 0)
		};
		Timeline._Impl.prototype._autoWidthScrollListener = function (A) {
			A.getTimeline()._autoWidthCheck(false)
		};
		Timeline._Impl.prototype._autoWidthCheck = function (C) {
			var A = this;
			var B = A._starting;
			var D = 0;

			function E() {
				var G = A.getWidthStyle();
				if (B) {
					A._containerDiv.style[G] = D + "px"
				} else {
					A._autoResizing = true;
					var H = {};
					H[G] = D + "px";
					SimileAjax.jQuery(A._containerDiv).animate(H, A.autoWidthAnimationTime, "linear", function () {
						A._autoResizing = false
					})
				}
			}
			function F() {
				var H = 0;
				var G = A.getPixelWidth();
				if (A._autoResizing) {
					return
				}
				for (var I = 0; I < A._bands.length; I++) {
					A._bands[I].checkAutoWidth();
					H += A._bandInfos[I].width
				}
				if (H > G || C) {
					D = H;
					E();
					A._distributeWidths()
				}
			}
			if (!A.autoWidth) {
				return
			}
			F()
		};
		Timeline._Impl.prototype._initialize = function () {
			var H = this._containerDiv;
			var E = H.ownerDocument;
			H.className = H.className.split(" ").concat("timeline-container").join(" ");
			var C = (this.isHorizontal()) ? "horizontal" : "vertical";
			H.className += " timeline-" + C;
			while (H.firstChild) {
				H.removeChild(H.firstChild)
			}
			var A = SimileAjax.Graphics.createTranslucentImage("http://static.simile.mit.edu/timeline/api/images/copyright-vertical.png");
			A.className = "timeline-copyright";
			A.title = "Timeline copyright SIMILE - www.code.google.com/p/simile-widgets/";
			SimileAjax.DOM.registerEvent(A, "click", function () {
				window.location = "http://code.google.com/p/simile-widgets/"
			});
			H.appendChild(A);
			this._bands = [];
			for (var B = 0; B < this._bandInfos.length; B++) {
				var G = new Timeline._Band(this, this._bandInfos[B], B);
				this._bands.push(G)
			}
			this._distributeWidths();
			for (var B = 0; B < this._bandInfos.length; B++) {
				var F = this._bandInfos[B];
				if ("syncWith" in F) {
					this._bands[B].setSyncWithBand(this._bands[F.syncWith], ("highlight" in F) ? F.highlight : false)
				}
			}
			if (this.autoWidth) {
				for (var B = 0; B < this._bands.length; B++) {
					this._bands[B].addOnScrollListener(this._autoWidthScrollListener)
				}
			}
			var D = SimileAjax.Graphics.createMessageBubble(E);
			D.containerDiv.className = "timeline-message-container";
			H.appendChild(D.containerDiv);
			D.contentDiv.className = "timeline-message";
			// ** MODIFIED BY BRAEDEN PETRUK **
			// D.contentDiv.innerHTML = "<img src='" + Environment.routes.imageDirectory + "/progress-running.gif' /> Loading...";
			// ** END MODIFICATION **
			this.showLoadingMessage = function () {
				D.containerDiv.style.display = "block"
			};
			this.hideLoadingMessage = function () {
				D.containerDiv.style.display = "none"
			}
		};
		Timeline._Impl.prototype._distributeWidths = function () {
			var G = this.getPixelLength();
			var B = this.getPixelWidth();
			var C = 0;
			for (var F = 0; F < this._bands.length; F++) {
				var J = this._bands[F];
				var I = this._bandInfos[F];
				var E = I.width;
				var D;
				if (typeof E == "string") {
					var H = E.indexOf("%");
					if (H > 0) {
						var A = parseInt(E.substr(0, H));
						D = Math.round(A * B / 100)
					} else {
						D = parseInt(E)
					}
				} else {
					D = E
				}
				J.setBandShiftAndWidth(C, D);
				J.setViewLength(G);
				C += D
			}
		};
		Timeline._Impl.prototype.shiftOK = function (C, B) {
			var F = B > 0,
				A = B < 0;
			if ((F && this.timeline_start == null) || (A && this.timeline_stop == null) || (B == 0)) {
				return (true)
			}
			var H = false;
			for (var E = 0; E < this._bands.length && !H; E++) {
				H = this._bands[E].busy()
			}
			if (H) {
				return (true)
			}
			if ((F && this.timeline_at_start) || (A && this.timeline_at_stop)) {
				return (false)
			}
			var D = false;
			for (var E = 0; E < this._bands.length && !D; E++) {
				var G = this._bands[E];
				if (F) {
					D = (E == C ? G.getMinVisibleDateAfterDelta(B) : G.getMinVisibleDate()) >= this.timeline_start
				} else {
					D = (E == C ? G.getMaxVisibleDateAfterDelta(B) : G.getMaxVisibleDate()) <= this.timeline_stop
				}
			}
			if (F) {
				this.timeline_at_start = !D;
				this.timeline_at_stop = false
			} else {
				this.timeline_at_stop = !D;
				this.timeline_at_start = false
			}
			return (D)
		};
		Timeline._Impl.prototype.zoom = function (D, A, G, F) {
			var C = new RegExp("^timeline-band-([0-9]+)$");
			var E = null;
			var B = C.exec(F.id);
			if (B) {
				E = parseInt(B[1])
			}
			if (E != null) {
				this._bands[E].zoom(D, A, G, F)
			}
			this.paint()
		};
		Timeline.NativeDateUnit = new Object();
		Timeline.NativeDateUnit.createLabeller = function (B, A) {
			return new Timeline.GregorianDateLabeller(B, A)
		};
		Timeline.NativeDateUnit.makeDefaultValue = function () {
			return new Date()
		};
		Timeline.NativeDateUnit.cloneValue = function (A) {
			return new Date(A.getTime())
		};
		Timeline.NativeDateUnit.getParser = function (A) {
			if (typeof A == "string") {
				A = A.toLowerCase()
			}
			return (A == "iso8601" || A == "iso 8601") ? Timeline.DateTime.parseIso8601DateTime : Timeline.DateTime.parseGregorianDateTime
		};
		Timeline.NativeDateUnit.parseFromObject = function (A) {
			return Timeline.DateTime.parseGregorianDateTime(A)
		};
		Timeline.NativeDateUnit.toNumber = function (A) {
			return A.getTime()
		};
		Timeline.NativeDateUnit.fromNumber = function (A) {
			return new Date(A)
		};
		Timeline.NativeDateUnit.compare = function (D, C) {
			var B, A;
			if (typeof D == "object") {
				B = D.getTime()
			} else {
				B = Number(D)
			}
			if (typeof C == "object") {
				A = C.getTime()
			} else {
				A = Number(C)
			}
			return B - A
		};
		Timeline.NativeDateUnit.earlier = function (B, A) {
			return Timeline.NativeDateUnit.compare(B, A) < 0 ? B : A
		};
		Timeline.NativeDateUnit.later = function (B, A) {
			return Timeline.NativeDateUnit.compare(B, A) > 0 ? B : A
		};
		Timeline.NativeDateUnit.change = function (A, B) {
			return new Date(A.getTime() + B)
		};
		Timeline.GregorianDateLabeller.monthNames.en = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		Timeline.GregorianDateLabeller.dayNames.en = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		Timeline.strings.en = {
			wikiLinkLabel: "Discuss"
		}
	})();
	return Timeline;
});