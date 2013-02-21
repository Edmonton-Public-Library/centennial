/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);


















/*d3.v2.js*/

(function(){if (!Date.now) Date.now = function() {
  return +new Date;
};
try {
  document.createElement("div").style.setProperty("opacity", 0, "");
} catch (error) {
  var d3_style_prototype = CSSStyleDeclaration.prototype,
      d3_style_setProperty = d3_style_prototype.setProperty;
  d3_style_prototype.setProperty = function(name, value, priority) {
    d3_style_setProperty.call(this, name, value + "", priority);
  };
}
d3 = {version: "2.9.2"}; // semver
function d3_class(ctor, properties) {
  try {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  } catch (e) {
    ctor.prototype = properties;
  }
}
var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(pseudoarray) {
  var i = -1, n = pseudoarray.length, array = [];
  while (++i < n) array.push(pseudoarray[i]);
  return array;
}

function d3_arraySlice(pseudoarray) {
  return Array.prototype.slice.call(pseudoarray);
}

try {
  d3_array(document.documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = d3_arrayCopy;
}

var d3_arraySubclass = [].__proto__?

// Until ECMAScript supports array subclassing, prototype injection works well.
function(array, prototype) {
  array.__proto__ = prototype;
}:

// And if your browser doesn't support __proto__, we'll use direct extension.
function(array, prototype) {
  for (var property in prototype) array[property] = prototype[property];
};
d3.map = function(object) {
  var map = new d3_Map;
  for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {}

d3_class(d3_Map, {
  has: function(key) {
    return d3_map_prefix + key in this;
  },
  get: function(key) {
    return this[d3_map_prefix + key];
  },
  set: function(key, value) {
    return this[d3_map_prefix + key] = value;
  },
  remove: function(key) {
    key = d3_map_prefix + key;
    return key in this && delete this[key];
  },
  keys: function() {
    var keys = [];
    this.forEach(function(key) { keys.push(key); });
    return keys;
  },
  values: function() {
    var values = [];
    this.forEach(function(key, value) { values.push(value); });
    return values;
  },
  entries: function() {
    var entries = [];
    this.forEach(function(key, value) { entries.push({key: key, value: value}); });
    return entries;
  },
  forEach: function(f) {
    for (var key in this) {
      if (key.charCodeAt(0) === d3_map_prefixCode) {
        f.call(this, key.substring(1), this[key]);
      }
    }
  }
});

var d3_map_prefix = "\0", // prevent collision with built-ins
    d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
function d3_identity(d) {
  return d;
}
function d3_this() {
  return this;
}
function d3_true() {
  return true;
}
function d3_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
}

d3.functor = d3_functor;
// Copies a variable number of methods from source to target.
d3.rebind = function(target, source) {
  var i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
};

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target, source, method) {
  return function() {
    var value = method.apply(source, arguments);
    return arguments.length ? target : value;
  };
}
d3.ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};
d3.descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
d3.mean = function(array, f) {
  var n = array.length,
      a,
      m = 0,
      i = -1,
      j = 0;
  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
  } else {
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
  }
  return j ? m : undefined;
};
d3.median = function(array, f) {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
};
d3.min = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
  }
  return a;
};
d3.max = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
  }
  return a;
};
d3.extent = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b,
      c;
  if (arguments.length === 1) {
    while (++i < n && ((a = c = array[i]) == null || a != a)) a = c = undefined;
    while (++i < n) if ((b = array[i]) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  } else {
    while (++i < n && ((a = c = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  }
  return [a, c];
};
d3.random = {
  normal: function(mean, deviation) {
    if (arguments.length < 2) deviation = 1;
    if (arguments.length < 1) mean = 0;
    return function() {
      var x, y, r;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
      return mean + deviation * x * Math.sqrt(-2 * Math.log(r) / r);
    };
  }
};
function d3_number(x) {
  return x != null && !isNaN(x);
}
d3.sum = function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = +array[i])) s += a;
  } else {
    while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
  }

  return s;
};
// R-7 per <http://en.wikipedia.org/wiki/Quantile>
d3.quantile = function(values, p) {
  var H = (values.length - 1) * p + 1,
      h = Math.floor(H),
      v = values[h - 1],
      e = H - h;
  return e ? v + e * (values[h] - v) : v;
};
d3.transpose = function(matrix) {
  return d3.zip.apply(d3, matrix);
};
d3.zip = function() {
  if (!(n = arguments.length)) return [];
  for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
    for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
      zip[j] = arguments[j][i];
    }
  }
  return zips;
};

function d3_zipLength(d) {
  return d.length;
}
d3.bisector = function(f) {
  return {
    left: function(a, x, lo, hi) {
      if (arguments.length < 3) lo = 0;
      if (arguments.length < 4) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >> 1;
        if (f.call(a, a[mid], mid) < x) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (arguments.length < 3) lo = 0;
      if (arguments.length < 4) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >> 1;
        if (x < f.call(a, a[mid], mid)) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
};

var d3_bisector = d3.bisector(function(d) { return d; });
d3.bisectLeft = d3_bisector.left;
d3.bisect = d3.bisectRight = d3_bisector.right;
d3.first = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) > 0) {
      a = b;
    }
  }
  return a;
};
d3.last = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) <= 0) {
      a = b;
    }
  }
  return a;
};
d3.nest = function() {
  var nest = {},
      keys = [],
      sortKeys = [],
      sortValues,
      rollup;

  function map(array, depth) {
    if (depth >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        object,
        valuesByKey = new d3_Map,
        values,
        o = {};

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
        values.push(object);
      } else {
        valuesByKey.set(keyValue, [object]);
      }
    }

    valuesByKey.forEach(function(keyValue) {
      o[keyValue] = map(valuesByKey.get(keyValue), depth);
    });

    return o;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var a = [],
        sortKey = sortKeys[depth++],
        key;

    for (key in map) {
      a.push({key: key, values: entries(map[key], depth)});
    }

    if (sortKey) a.sort(function(a, b) {
      return sortKey(a.key, b.key);
    });

    return a;
  }

  nest.map = function(array) {
    return map(array, 0);
  };

  nest.entries = function(array) {
    return entries(map(array, 0), 0);
  };

  nest.key = function(d) {
    keys.push(d);
    return nest;
  };

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  nest.sortKeys = function(order) {
    sortKeys[keys.length - 1] = order;
    return nest;
  };

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  nest.sortValues = function(order) {
    sortValues = order;
    return nest;
  };

  nest.rollup = function(f) {
    rollup = f;
    return nest;
  };

  return nest;
};
d3.keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};
d3.values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};
d3.entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};
d3.permute = function(array, indexes) {
  var permutes = [],
      i = -1,
      n = indexes.length;
  while (++i < n) permutes[i] = array[indexes[i]];
  return permutes;
};
d3.merge = function(arrays) {
  return Array.prototype.concat.apply([], arrays);
};
d3.split = function(array, f) {
  var arrays = [],
      values = [],
      value,
      i = -1,
      n = array.length;
  if (arguments.length < 2) f = d3_splitter;
  while (++i < n) {
    if (f.call(values, value = array[i], i)) {
      values = [];
    } else {
      if (!values.length) arrays.push(values);
      values.push(value);
    }
  }
  return arrays;
};

function d3_splitter(d) {
  return d == null;
}
function d3_collapse(s) {
  return s.replace(/(^\s+)|(\s+$)/g, "").replace(/\s+/g, " ");
}
d3.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step === Infinity) {
	throw new Error("infinite range");
  }
  var range = [],
       k = d3_range_integerScale(Math.abs(step)),
       i = -1,
       j;
  start *= k, stop *= k, step *= k;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);
  else while ((j = start + step * ++i) < stop) range.push(j / k);
  return range;
};

function d3_range_integerScale(x) {
  var k = 1;
  while (x * k % 1) k *= 10;
  return k;
}
d3.requote = function(s) {
  return s.replace(d3_requote_re, "\\$&");
};

var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
d3.round = function(x, n) {
  return n
      ? Math.round(x * (n = Math.pow(10, n))) / n
      : Math.round(x);
};
d3.xhr = function(url, mime, callback) {
  var req = new XMLHttpRequest;
  if (arguments.length < 3) callback = mime, mime = null;
  else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
  req.open("GET", url, true);
  if (mime) req.setRequestHeader("Accept", mime);
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      var s = req.status;
      callback(req);
    }
  };
  req.send(null);
};
d3.text = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseText);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
d3.json = function(url, callback) {
  d3.text(url, "application/json", function(text) {
    callback(text ? JSON.parse(text) : null);
  });
};
d3.html = function(url, callback) {
  d3.text(url, "text/html", function(text) {
    if (text != null) { // Treat empty string as valid HTML.
      var range = document.createRange();
      range.selectNode(document.body);
      text = range.createContextualFragment(text);
    }
    callback(text);
  });
};
d3.xml = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseXML);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
var d3_nsPrefix = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

d3.ns = {
  prefix: d3_nsPrefix,
  qualify: function(name) {
    var i = name.indexOf(":"),
        prefix = name;
    if (i >= 0) {
      prefix = name.substring(0, i);
      name = name.substring(i + 1);
    }
    return d3_nsPrefix.hasOwnProperty(prefix)
        ? {space: d3_nsPrefix[prefix], local: name}
        : name;
  }
};
d3.dispatch = function() {
  var dispatch = new d3_dispatch,
      i = -1,
      n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
  return dispatch;
};

function d3_dispatch() {}

d3_dispatch.prototype.on = function(type, listener) {
  var i = type.indexOf("."),
      name = "";

  // Extract optional namespace, e.g., "click.foo"
  if (i > 0) {
    name = type.substring(i + 1);
    type = type.substring(0, i);
  }

  return arguments.length < 2
      ? this[type].on(name)
      : this[type].on(name, listener);
};

function d3_dispatch_event(dispatch) {
  var listeners = [],
      listenerByName = new d3_Map;

  function event() {
    var z = listeners, // defensive reference
        i = -1,
        n = z.length,
        l;
    while (++i < n) if (l = z[i].on) l.apply(this, arguments);
    return dispatch;
  }

  event.on = function(name, listener) {
    var l = listenerByName.get(name),
        i;

    // return the current listener, if any
    if (arguments.length < 2) return l && l.on;

    // remove the old listener, if any (with copy-on-write)
    if (l) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      listenerByName.remove(name);
    }

    // add the new listener, if any
    if (listener) listeners.push(listenerByName.set(name, {on: listener}));

    return dispatch;
  };

  return event;
}
// TODO align
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      sign = match[3] || "",
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9],
      scale = 1,
      suffix = "",
      integer = false;

  if (precision) precision = +precision.substring(1);

  if (zfill) {
    fill = "0"; // TODO align = "=";
    if (comma) width -= Math.floor((width - 1) / 4);
  }

  switch (type) {
    case "n": comma = true; type = "g"; break;
    case "%": scale = 100; suffix = "%"; type = "f"; break;
    case "p": scale = 100; suffix = "%"; type = "r"; break;
    case "d": integer = true; precision = 0; break;
    case "s": scale = -1; type = "r"; break;
  }

  // If no precision is specified for r, fallback to general notation.
  if (type == "r" && !precision) type = "g";

  type = d3_format_types.get(type) || d3_format_typeDefault;

  return function(value) {

    // Return the empty string for floats formatted as ints.
    if (integer && (value % 1)) return "";

    // Convert negative to positive, and record the sign prefix.
    var negative = (value < 0) && (value = -value) ? "\u2212" : sign;

    // Apply the scale, computing it from the value's exponent for si format.
    if (scale < 0) {
      var prefix = d3.formatPrefix(value, precision);
      value = prefix.scale(value);
      suffix = prefix.symbol;
    } else {
      value *= scale;
    }

    // Convert to the desired precision.
    value = type(value, precision);

    // If the fill character is 0, the sign and group is applied after the fill.
    if (zfill) {
      var length = value.length + negative.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
      if (comma) value = d3_format_group(value);
      value = negative + value;
    }

    // Otherwise (e.g., space-filling), the sign and group is applied before.
    else {
      if (comma) value = d3_format_group(value);
      value = negative + value;
      var length = value.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
    }

    return value + suffix;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;

var d3_format_types = d3.map({
  g: function(x, p) { return x.toPrecision(p); },
  e: function(x, p) { return x.toExponential(p); },
  f: function(x, p) { return x.toFixed(p); },
  r: function(x, p) { return d3.round(x, p = d3_format_precision(x, p)).toFixed(Math.max(0, Math.min(20, p))); }
});

function d3_format_precision(x, p) {
  return p - (x ? 1 + Math.floor(Math.log(x + Math.pow(10, 1 + Math.floor(Math.log(x) / Math.LN10) - p)) / Math.LN10) : 1);
}

function d3_format_typeDefault(x) {
  return x + "";
}

// Apply comma grouping for thousands.
function d3_format_group(value) {
  var i = value.lastIndexOf("."),
      f = i >= 0 ? value.substring(i) : (i = value.length, ""),
      t = [];
  while (i > 0) t.push(value.substring(i -= 3, i + 3));
  return t.reverse().join(",") + f;
}
var d3_formatPrefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"].map(d3_formatPrefix);

d3.formatPrefix = function(value, precision) {
  var i = 0;
  if (value) {
    if (value < 0) value *= -1;
    if (precision) value = d3.round(value, d3_format_precision(value, precision));
    i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
    i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
  }
  return d3_formatPrefixes[8 + i / 3];
};

function d3_formatPrefix(d, i) {
  var k = Math.pow(10, Math.abs(8 - i) * 3);
  return {
    scale: i > 8 ? function(d) { return d / k; } : function(d) { return d * k; },
    symbol: d
  };
}
/*
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var d3_ease_quad = d3_ease_poly(2),
    d3_ease_cubic = d3_ease_poly(3),
    d3_ease_default = function() { return d3_ease_identity; };

var d3_ease = d3.map({
  linear: d3_ease_default,
  poly: d3_ease_poly,
  quad: function() { return d3_ease_quad; },
  cubic: function() { return d3_ease_cubic; },
  sin: function() { return d3_ease_sin; },
  exp: function() { return d3_ease_exp; },
  circle: function() { return d3_ease_circle; },
  elastic: d3_ease_elastic,
  back: d3_ease_back,
  bounce: function() { return d3_ease_bounce; }
});

var d3_ease_mode = d3.map({
  "in": d3_ease_identity,
  "out": d3_ease_reverse,
  "in-out": d3_ease_reflect,
  "out-in": function(f) { return d3_ease_reflect(d3_ease_reverse(f)); }
});

d3.ease = function(name) {
  var i = name.indexOf("-"),
      t = i >= 0 ? name.substring(0, i) : name,
      m = i >= 0 ? name.substring(i + 1) : "in";
  t = d3_ease.get(t) || d3_ease_default;
  m = d3_ease_mode.get(m) || d3_ease_identity;
  return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
};

function d3_ease_clamp(f) {
  return function(t) {
    return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
  };
}

function d3_ease_reverse(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
}

function d3_ease_reflect(f) {
  return function(t) {
    return .5 * (t < .5 ? f(2 * t) : (2 - f(2 - 2 * t)));
  };
}

function d3_ease_identity(t) {
  return t;
}

function d3_ease_poly(e) {
  return function(t) {
    return Math.pow(t, e);
  };
}

function d3_ease_sin(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}

function d3_ease_exp(t) {
  return Math.pow(2, 10 * (t - 1));
}

function d3_ease_circle(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function d3_ease_elastic(a, p) {
  var s;
  if (arguments.length < 2) p = 0.45;
  if (arguments.length < 1) { a = 1; s = p / 4; }
  else s = p / (2 * Math.PI) * Math.asin(1 / a);
  return function(t) {
    return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
  };
}

function d3_ease_back(s) {
  if (!s) s = 1.70158;
  return function(t) {
    return t * t * ((s + 1) * t - s);
  };
}

function d3_ease_bounce(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t
      : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75
      : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375
      : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
}
d3.event = null;

function d3_eventCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}

function d3_eventSource() {
  var e = d3.event, s;
  while (s = e.sourceEvent) e = s;
  return e;
}

// Like d3.dispatch, but for custom events abstracting native UI events. These
// events have a target component (such as a brush), a target element (such as
// the svg:g element containing the brush) and the standard arguments `d` (the
// target element's data) and `i` (the selection index of the target element).
function d3_eventDispatch(target) {
  var dispatch = new d3_dispatch,
      i = 0,
      n = arguments.length;

  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);

  // Creates a dispatch context for the specified `thiz` (typically, the target
  // DOM element that received the source event) and `argumentz` (typically, the
  // data `d` and index `i` of the target element). The returned function can be
  // used to dispatch an event to any registered listeners; the function takes a
  // single argument as input, being the event to dispatch. The event must have
  // a "type" attribute which corresponds to a type registered in the
  // constructor. This context will automatically populate the "sourceEvent" and
  // "target" attributes of the event, as well as setting the `d3.event` global
  // for the duration of the notification.
  dispatch.of = function(thiz, argumentz) {
    return function(e1) {
      try {
        var e0 =
        e1.sourceEvent = d3.event;
        e1.target = target;
        d3.event = e1;
        dispatch[e1.type].apply(thiz, argumentz);
      } finally {
        d3.event = e0;
      }
    };
  };

  return dispatch;
}
d3.interpolate = function(a, b) {
  var i = d3.interpolators.length, f;
  while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
  return f;
};

d3.interpolateNumber = function(a, b) {
  b -= a;
  return function(t) { return a + b * t; };
};

d3.interpolateRound = function(a, b) {
  b -= a;
  return function(t) { return Math.round(a + b * t); };
};

d3.interpolateString = function(a, b) {
  var m, // current match
      i, // current index
      j, // current index (for coallescing)
      s0 = 0, // start index of current string prefix
      s1 = 0, // end index of current string prefix
      s = [], // string constants and placeholders
      q = [], // number interpolators
      n, // q.length
      o;

  // Reset our regular expression!
  d3_interpolate_number.lastIndex = 0;

  // Find all numbers in b.
  for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
    if (m.index) s.push(b.substring(s0, s1 = m.index));
    q.push({i: s.length, x: m[0]});
    s.push(null);
    s0 = d3_interpolate_number.lastIndex;
  }
  if (s0 < b.length) s.push(b.substring(s0));

  // Find all numbers in a.
  for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
    o = q[i];
    if (o.x == m[0]) { // The numbers match, so coallesce.
      if (o.i) {
        if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i - 1] += o.x;
          s.splice(o.i, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i - 1] += o.x + s[o.i + 1];
          s.splice(o.i, 2);
          for (j = i + 1; j < n; ++j) q[j].i -= 2;
        }
      } else {
          if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i] = o.x;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i] = o.x + s[o.i + 1];
          s.splice(o.i + 1, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        }
      }
      q.splice(i, 1);
      n--;
      i--;
    } else {
      o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
    }
  }

  // Remove any numbers in b not found in a.
  while (i < n) {
    o = q.pop();
    if (s[o.i + 1] == null) { // This match is followed by another number.
      s[o.i] = o.x;
    } else { // This match is followed by a string, so coallesce twice.
      s[o.i] = o.x + s[o.i + 1];
      s.splice(o.i + 1, 1);
    }
    n--;
  }

  // Special optimization for only a single match.
  if (s.length === 1) {
    return s[0] == null ? q[0].x : function() { return b; };
  }

  // Otherwise, interpolate each of the numbers and rejoin the string.
  return function(t) {
    for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateTransform = function(a, b) {
  var s = [], // string constants and placeholders
      q = [], // number interpolators
      n,
      A = d3.transform(a),
      B = d3.transform(b),
      ta = A.translate,
      tb = B.translate,
      ra = A.rotate,
      rb = B.rotate,
      wa = A.skew,
      wb = B.skew,
      ka = A.scale,
      kb = B.scale;

  if (ta[0] != tb[0] || ta[1] != tb[1]) {
    s.push("translate(", null, ",", null, ")");
    q.push({i: 1, x: d3.interpolateNumber(ta[0], tb[0])}, {i: 3, x: d3.interpolateNumber(ta[1], tb[1])});
  } else if (tb[0] || tb[1]) {
    s.push("translate(" + tb + ")");
  } else {
    s.push("");
  }

  if (ra != rb) {
    q.push({i: s.push(s.pop() + "rotate(", null, ")") - 2, x: d3.interpolateNumber(ra, rb)});
  } else if (rb) {
    s.push(s.pop() + "rotate(" + rb + ")");
  }

  if (wa != wb) {
    q.push({i: s.push(s.pop() + "skewX(", null, ")") - 2, x: d3.interpolateNumber(wa, wb)});
  } else if (wb) {
    s.push(s.pop() + "skewX(" + wb + ")");
  }

  if (ka[0] != kb[0] || ka[1] != kb[1]) {
    n = s.push(s.pop() + "scale(", null, ",", null, ")");
    q.push({i: n - 4, x: d3.interpolateNumber(ka[0], kb[0])}, {i: n - 2, x: d3.interpolateNumber(ka[1], kb[1])});
  } else if (kb[0] != 1 || kb[1] != 1) {
    s.push(s.pop() + "scale(" + kb + ")");
  }

  n = q.length;
  return function(t) {
    var i = -1, o;
    while (++i < n) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateRgb = function(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    return "#"
        + d3_rgb_hex(Math.round(ar + br * t))
        + d3_rgb_hex(Math.round(ag + bg * t))
        + d3_rgb_hex(Math.round(ab + bb * t));
  };
};

// interpolates HSL space, but outputs RGB string (for compatibility)
d3.interpolateHsl = function(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var h0 = a.h,
      s0 = a.s,
      l0 = a.l,
      h1 = b.h - h0,
      s1 = b.s - s0,
      l1 = b.l - l0;
  return function(t) {
    return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t).toString();
  };
};

d3.interpolateArray = function(a, b) {
  var x = [],
      c = [],
      na = a.length,
      nb = b.length,
      n0 = Math.min(a.length, b.length),
      i;
  for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
  for (; i < na; ++i) c[i] = a[i];
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < n0; ++i) c[i] = x[i](t);
    return c;
  };
};

d3.interpolateObject = function(a, b) {
  var i = {},
      c = {},
      k;
  for (k in a) {
    if (k in b) {
      i[k] = d3_interpolateByName(k)(a[k], b[k]);
    } else {
      c[k] = a[k];
    }
  }
  for (k in b) {
    if (!(k in a)) {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;

function d3_interpolateByName(n) {
  return n == "transform"
      ? d3.interpolateTransform
      : d3.interpolate;
}

d3.interpolators = [
  d3.interpolateObject,
  function(a, b) { return (b instanceof Array) && d3.interpolateArray(a, b); },
  function(a, b) { return (typeof a === "string" || typeof b === "string") && d3.interpolateString(a + "", b + ""); },
  function(a, b) { return (typeof b === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Rgb || b instanceof d3_Hsl) && d3.interpolateRgb(a, b); },
  function(a, b) { return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b); }
];
function d3_uninterpolateNumber(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return (x - a) * b; };
}

function d3_uninterpolateClamp(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return Math.max(0, Math.min(1, (x - a) * b)); };
}
d3.rgb = function(r, g, b) {
  return arguments.length === 1
      ? (r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b)
      : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb))
      : d3_rgb(~~r, ~~g, ~~b);
};

function d3_rgb(r, g, b) {
  return new d3_Rgb(r, g, b);
}

function d3_Rgb(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

d3_Rgb.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  var r = this.r,
      g = this.g,
      b = this.b,
      i = 30;
  if (!r && !g && !b) return d3_rgb(i, i, i);
  if (r && r < i) r = i;
  if (g && g < i) g = i;
  if (b && b < i) b = i;
  return d3_rgb(
      Math.min(255, Math.floor(r / k)),
      Math.min(255, Math.floor(g / k)),
      Math.min(255, Math.floor(b / k)));
};

d3_Rgb.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_rgb(
      Math.floor(k * this.r),
      Math.floor(k * this.g),
      Math.floor(k * this.b));
};

d3_Rgb.prototype.hsl = function() {
  return d3_rgb_hsl(this.r, this.g, this.b);
};

d3_Rgb.prototype.toString = function() {
  return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
};

function d3_rgb_hex(v) {
  return v < 0x10
      ? "0" + Math.max(0, v).toString(16)
      : Math.min(255, v).toString(16);
}

function d3_rgb_parse(format, rgb, hsl) {
  var r = 0, // red channel; int in [0, 255]
      g = 0, // green channel; int in [0, 255]
      b = 0, // blue channel; int in [0, 255]
      m1, // CSS color specification match
      m2, // CSS color specification type (e.g., rgb)
      name;

  /* Handle hsl, rgb. */
  m1 = /([a-z]+)\((.*)\)/i.exec(format);
  if (m1) {
    m2 = m1[2].split(",");
    switch (m1[1]) {
      case "hsl": {
        return hsl(
          parseFloat(m2[0]), // degrees
          parseFloat(m2[1]) / 100, // percentage
          parseFloat(m2[2]) / 100 // percentage
        );
      }
      case "rgb": {
        return rgb(
          d3_rgb_parseNumber(m2[0]),
          d3_rgb_parseNumber(m2[1]),
          d3_rgb_parseNumber(m2[2])
        );
      }
    }
  }

  /* Named colors. */
  if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format != null && format.charAt(0) === "#") {
    if (format.length === 4) {
      r = format.charAt(1); r += r;
      g = format.charAt(2); g += g;
      b = format.charAt(3); b += b;
    } else if (format.length === 7) {
      r = format.substring(1, 3);
      g = format.substring(3, 5);
      b = format.substring(5, 7);
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
  }

  return rgb(r, g, b);
}

function d3_rgb_hsl(r, g, b) {
  var min = Math.min(r /= 255, g /= 255, b /= 255),
      max = Math.max(r, g, b),
      d = max - min,
      h,
      s,
      l = (max + min) / 2;
  if (d) {
    s = l < .5 ? d / (max + min) : d / (2 - max - min);
    if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
    else if (g == max) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  } else {
    s = h = 0;
  }
  return d3_hsl(h, s, l);
}

function d3_rgb_parseNumber(c) { // either integer or percentage
  var f = parseFloat(c);
  return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
}

var d3_rgb_names = d3.map({
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
});

d3_rgb_names.forEach(function(key, value) {
  d3_rgb_names.set(key, d3_rgb_parse(value, d3_rgb, d3_hsl_rgb));
});
d3.hsl = function(h, s, l) {
  return arguments.length === 1
      ? (h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l)
      : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl))
      : d3_hsl(+h, +s, +l);
};

function d3_hsl(h, s, l) {
  return new d3_Hsl(h, s, l);
}

function d3_Hsl(h, s, l) {
  this.h = h;
  this.s = s;
  this.l = l;
}

d3_Hsl.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, this.l / k);
};

d3_Hsl.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, k * this.l);
};

d3_Hsl.prototype.rgb = function() {
  return d3_hsl_rgb(this.h, this.s, this.l);
};

d3_Hsl.prototype.toString = function() {
  return this.rgb().toString();
};

function d3_hsl_rgb(h, s, l) {
  var m1,
      m2;

  /* Some simple corrections for h, s and l. */
  h = h % 360; if (h < 0) h += 360;
  s = s < 0 ? 0 : s > 1 ? 1 : s;
  l = l < 0 ? 0 : l > 1 ? 1 : l;

  /* From FvD 13.37, CSS Color Module Level 3 */
  m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
  m1 = 2 * l - m2;

  function v(h) {
    if (h > 360) h -= 360;
    else if (h < 0) h += 360;
    if (h < 60) return m1 + (m2 - m1) * h / 60;
    if (h < 180) return m2;
    if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
    return m1;
  }

  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
}
function d3_selection(groups) {
  d3_arraySubclass(groups, d3_selectionPrototype);
  return groups;
}

var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return n.querySelectorAll(s); },
    d3_selectRoot = document.documentElement,
    d3_selectMatcher = d3_selectRoot.matchesSelector || d3_selectRoot.webkitMatchesSelector || d3_selectRoot.mozMatchesSelector || d3_selectRoot.msMatchesSelector || d3_selectRoot.oMatchesSelector,
    d3_selectMatches = function(n, s) { return d3_selectMatcher.call(n, s); };

// Prefer Sizzle, if available.
if (typeof Sizzle === "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0]; };
  d3_selectAll = function(s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
  d3_selectMatches = Sizzle.matchesSelector;
}

var d3_selectionPrototype = [];

d3.selection = function() {
  return d3_selectionRoot;
};

d3.selection.prototype = d3_selectionPrototype;
d3_selectionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      group,
      node;

  if (typeof selector !== "function") selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(subnode = selector.call(node, node.__data__, i));
        if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selector(selector) {
  return function() {
    return d3_select(selector, this);
  };
}
d3_selectionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i)));
        subgroup.parentNode = node;
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selectorAll(selector) {
  return function() {
    return d3_selectAll(selector, this);
  };
}
d3_selectionPrototype.attr = function(name, value) {
  name = d3.ns.qualify(name);

  // If no value is specified, return the first value.
  if (arguments.length < 2) {
    var node = this.node();
    return name.local
        ? node.getAttributeNS(name.space, name.local)
        : node.getAttribute(name);
  }

  function attrNull() {
    this.removeAttribute(name);
  }

  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  function attrConstant() {
    this.setAttribute(name, value);
  }

  function attrConstantNS() {
    this.setAttributeNS(name.space, name.local, value);
  }

  function attrFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttribute(name);
    else this.setAttribute(name, x);
  }

  function attrFunctionNS() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttributeNS(name.space, name.local);
    else this.setAttributeNS(name.space, name.local, x);
  }

  return this.each(value == null
      ? (name.local ? attrNullNS : attrNull) : (typeof value === "function"
      ? (name.local ? attrFunctionNS : attrFunction)
      : (name.local ? attrConstantNS : attrConstant)));
};
d3_selectionPrototype.classed = function(name, value) {
  var names = name.split(d3_selection_classedWhitespace),
      n = names.length,
      i = -1;
  if (arguments.length > 1) {
    while (++i < n) d3_selection_classed.call(this, names[i], value);
    return this;
  } else {
    while (++i < n) if (!d3_selection_classed.call(this, names[i])) return false;
    return true;
  }
};

var d3_selection_classedWhitespace = /\s+/g;

function d3_selection_classed(name, value) {
  var re = new RegExp("(^|\\s+)" + d3.requote(name) + "(\\s+|$)", "g");

  // If no value is specified, return the first value.
  if (arguments.length < 2) {
    var node = this.node();
    if (c = node.classList) return c.contains(name);
    var c = node.className;
    re.lastIndex = 0;
    return re.test(c.baseVal != null ? c.baseVal : c);
  }

  function classedAdd() {
    if (c = this.classList) return c.add(name);
    var c = this.className,
        cb = c.baseVal != null,
        cv = cb ? c.baseVal : c;
    re.lastIndex = 0;
    if (!re.test(cv)) {
      cv = d3_collapse(cv + " " + name);
      if (cb) c.baseVal = cv;
      else this.className = cv;
    }
  }

  function classedRemove() {
    if (c = this.classList) return c.remove(name);
    var c = this.className,
        cb = c.baseVal != null,
        cv = cb ? c.baseVal : c;
    cv = d3_collapse(cv.replace(re, " "));
    if (cb) c.baseVal = cv;
    else this.className = cv;
  }

  function classedFunction() {
    (value.apply(this, arguments)
        ? classedAdd
        : classedRemove).call(this);
  }

  return this.each(typeof value === "function"
      ? classedFunction : value
      ? classedAdd
      : classedRemove);
}
d3_selectionPrototype.style = function(name, value, priority) {
  if (arguments.length < 3) priority = "";

  // If no value is specified, return the first value.
  if (arguments.length < 2) return window
      .getComputedStyle(this.node(), null)
      .getPropertyValue(name);

  function styleNull() {
    this.style.removeProperty(name);
  }

  function styleConstant() {
    this.style.setProperty(name, value, priority);
  }

  function styleFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.style.removeProperty(name);
    else this.style.setProperty(name, x, priority);
  }

  return this.each(value == null
      ? styleNull : (typeof value === "function"
      ? styleFunction : styleConstant));
};
d3_selectionPrototype.property = function(name, value) {

  // If no value is specified, return the first value.
  if (arguments.length < 2) return this.node()[name];

  function propertyNull() {
    delete this[name];
  }

  function propertyConstant() {
    this[name] = value;
  }

  function propertyFunction() {
    var x = value.apply(this, arguments);
    if (x == null) delete this[name];
    else this[name] = x;
  }

  return this.each(value == null
      ? propertyNull : (typeof value === "function"
      ? propertyFunction : propertyConstant));
};
d3_selectionPrototype.text = function(value) {
  return arguments.length < 1
      ? this.node().textContent : this.each(typeof value === "function"
      ? function() { var v = value.apply(this, arguments); this.textContent = v == null ? "" : v; } : value == null
      ? function() { this.textContent = ""; }
      : function() { this.textContent = value; });
};
d3_selectionPrototype.html = function(value) {
  return arguments.length < 1
      ? this.node().innerHTML : this.each(typeof value === "function"
      ? function() { var v = value.apply(this, arguments); this.innerHTML = v == null ? "" : v; } : value == null
      ? function() { this.innerHTML = ""; }
      : function() { this.innerHTML = value; });
};
// TODO append(node)?
// TODO append(function)?
d3_selectionPrototype.append = function(name) {
  name = d3.ns.qualify(name);

  function append() {
    return this.appendChild(document.createElementNS(this.namespaceURI, name));
  }

  function appendNS() {
    return this.appendChild(document.createElementNS(name.space, name.local));
  }

  return this.select(name.local ? appendNS : append);
};
// TODO insert(node, function)?
// TODO insert(function, string)?
// TODO insert(function, function)?
d3_selectionPrototype.insert = function(name, before) {
  name = d3.ns.qualify(name);

  function insert() {
    return this.insertBefore(
        document.createElementNS(this.namespaceURI, name),
        d3_select(before, this));
  }

  function insertNS() {
    return this.insertBefore(
        document.createElementNS(name.space, name.local),
        d3_select(before, this));
  }

  return this.select(name.local ? insertNS : insert);
};
// TODO remove(selector)?
// TODO remove(node)?
// TODO remove(function)?
d3_selectionPrototype.remove = function() {
  return this.each(function() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  });
};
d3_selectionPrototype.data = function(value, key) {
  var i = -1,
      n = this.length,
      group,
      node;

  // If no value is specified, return the first value.
  if (!arguments.length) {
    value = new Array(n = (group = this[0]).length);
    while (++i < n) {
      if (node = group[i]) {
        value[i] = node.__data__;
      }
    }
    return value;
  }

  function bind(group, groupData) {
    var i,
        n = group.length,
        m = groupData.length,
        n0 = Math.min(n, m),
        n1 = Math.max(n, m),
        updateNodes = [],
        enterNodes = [],
        exitNodes = [],
        node,
        nodeData;

    if (key) {
      var nodeByKeyValue = new d3_Map,
          keyValues = [],
          keyValue,
          j = groupData.length;

      for (i = -1; ++i < n;) {
        keyValue = key.call(node = group[i], node.__data__, i);
        if (nodeByKeyValue.has(keyValue)) {
          exitNodes[j++] = node; // duplicate key
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
        keyValues.push(keyValue);
      }

      for (i = -1; ++i < m;) {
        keyValue = key.call(groupData, nodeData = groupData[i], i)
        if (nodeByKeyValue.has(keyValue)) {
          updateNodes[i] = node = nodeByKeyValue.get(keyValue);
          node.__data__ = nodeData;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
        nodeByKeyValue.remove(keyValue);
      }

      for (i = -1; ++i < n;) {
        if (nodeByKeyValue.has(keyValues[i])) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0;) {
        node = group[i];
        nodeData = groupData[i];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
      }
      for (; i < m; ++i) {
        enterNodes[i] = d3_selection_dataNode(groupData[i]);
        updateNodes[i] = exitNodes[i] = null;
      }
      for (; i < n1; ++i) {
        exitNodes[i] = group[i];
        enterNodes[i] = updateNodes[i] = null;
      }
    }

    enterNodes.update
        = updateNodes;

    enterNodes.parentNode
        = updateNodes.parentNode
        = exitNodes.parentNode
        = group.parentNode;

    enter.push(enterNodes);
    update.push(updateNodes);
    exit.push(exitNodes);
  }

  var enter = d3_selection_enter([]),
      update = d3_selection([]),
      exit = d3_selection([]);

  if (typeof value === "function") {
    while (++i < n) {
      bind(group = this[i], value.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bind(group = this[i], value);
    }
  }

  update.enter = function() { return enter; };
  update.exit = function() { return exit; };
  return update;
};

function d3_selection_dataNode(data) {
  return {__data__: data};
}
d3_selectionPrototype.datum =
d3_selectionPrototype.map = function(value) {
  return arguments.length < 1
      ? this.property("__data__")
      : this.property("__data__", value);
};
d3_selectionPrototype.filter = function(filter) {
  var subgroups = [],
      subgroup,
      group,
      node;

  if (typeof filter !== "function") filter = d3_selection_filter(filter);

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && filter.call(node, node.__data__, i)) {
        subgroup.push(node);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_filter(selector) {
  return function() {
    return d3_selectMatches(this, selector);
  };
}
d3_selectionPrototype.order = function() {
  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
};
d3_selectionPrototype.sort = function(comparator) {
  comparator = d3_selection_sortComparator.apply(this, arguments);
  for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);
  return this.order();
};

function d3_selection_sortComparator(comparator) {
  if (!arguments.length) comparator = d3.ascending;
  return function(a, b) {
    return comparator(a && a.__data__, b && b.__data__);
  };
}
// type can be namespaced, e.g., "click.foo"
// listener can be null for removal
d3_selectionPrototype.on = function(type, listener, capture) {
  if (arguments.length < 3) capture = false;

  // parse the type specifier
  var name = "__on" + type, i = type.indexOf(".");
  if (i > 0) type = type.substring(0, i);

  // if called with only one argument, return the current listener
  if (arguments.length < 2) return (i = this.node()[name]) && i._;

  // remove the old event listener, and add the new event listener
  return this.each(function(d, i) {
    var node = this,
        o = node[name];

    // remove the old listener, if any (using the previously-set capture)
    if (o) {
      node.removeEventListener(type, o, o.$);
      delete node[name];
    }

    // add the new listener, if any (remembering the capture flag)
    if (listener) {
      node.addEventListener(type, node[name] = l, l.$ = capture);
      l._ = listener; // stash the unwrapped listener for get
    }

    // wrapped event listener that preserves i
    function l(e) {
      var o = d3.event; // Events can be reentrant (e.g., focus).
      d3.event = e;
      try {
        listener.call(node, node.__data__, i);
      } finally {
        d3.event = o;
      }
    }
  });
};
d3_selectionPrototype.each = function(callback) {
  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      var node = group[i];
      if (node) callback.call(node, node.__data__, i, j);
    }
  }
  return this;
};
//
// Note: assigning to the arguments array simultaneously changes the value of
// the corresponding argument!
//
// TODO The `this` argument probably shouldn't be the first argument to the
// callback, anyway, since it's redundant. However, that will require a major
// version bump due to backwards compatibility, so I'm not changing it right
// away.
//
d3_selectionPrototype.call = function(callback) {
  callback.apply(this, (arguments[0] = this, arguments));
  return this;
};
d3_selectionPrototype.empty = function() {
  return !this.node();
};
d3_selectionPrototype.node = function(callback) {
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
};
d3_selectionPrototype.transition = function() {
  var subgroups = [],
      subgroup,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      subgroup.push((node = group[i]) ? {node: node, delay: d3_transitionDelay, duration: d3_transitionDuration} : null);
    }
  }

  return d3_transition(subgroups, d3_transitionId || ++d3_transitionNextId, Date.now());
};
var d3_selectionRoot = d3_selection([[document]]);

d3_selectionRoot[0].parentNode = d3_selectRoot;

// TODO fast singleton implementation!
// TODO select(function)
d3.select = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.select(selector)
      : d3_selection([[selector]]); // assume node
};

// TODO selectAll(function)
d3.selectAll = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.selectAll(selector)
      : d3_selection([d3_array(selector)]); // assume node[]
};
function d3_selection_enter(selection) {
  d3_arraySubclass(selection, d3_selection_enterPrototype);
  return selection;
}

var d3_selection_enterPrototype = [];

d3.selection.enter = d3_selection_enter;
d3.selection.enter.prototype = d3_selection_enterPrototype;

d3_selection_enterPrototype.append = d3_selectionPrototype.append;
d3_selection_enterPrototype.insert = d3_selectionPrototype.insert;
d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
d3_selection_enterPrototype.node = d3_selectionPrototype.node;
d3_selection_enterPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      upgroup,
      group,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    upgroup = (group = this[j]).update;
    subgroups.push(subgroup = []);
    subgroup.parentNode = group.parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i));
        subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};
function d3_transition(groups, id, time) {
  d3_arraySubclass(groups, d3_transitionPrototype);

  var tweens = new d3_Map,
      event = d3.dispatch("start", "end"),
      ease = d3_transitionEase;

  groups.id = id;

  groups.time = time;

  groups.tween = function(name, tween) {
    if (arguments.length < 2) return tweens.get(name);
    if (tween == null) tweens.remove(name);
    else tweens.set(name, tween);
    return groups;
  };

  groups.ease = function(value) {
    if (!arguments.length) return ease;
    ease = typeof value === "function" ? value : d3.ease.apply(d3, arguments);
    return groups;
  };

  groups.each = function(type, listener) {
    if (arguments.length < 2) return d3_transition_each.call(groups, type);
    event.on(type, listener);
    return groups;
  };

  d3.timer(function(elapsed) {
    groups.each(function(d, i, j) {
      var tweened = [],
          node = this,
          delay = groups[j][i].delay,
          duration = groups[j][i].duration,
          lock = node.__transition__ || (node.__transition__ = {active: 0, count: 0});

      ++lock.count;

      delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time);

      function start(elapsed) {
        if (lock.active > id) return stop();
        lock.active = id;

        tweens.forEach(function(key, value) {
          if (value = value.call(node, d, i)) {
            tweened.push(value);
          }
        });

        event.start.call(node, d, i);
        if (!tick(elapsed)) d3.timer(tick, 0, time);
        return 1;
      }

      function tick(elapsed) {
        if (lock.active !== id) return stop();

        var t = (elapsed - delay) / duration,
            e = ease(t),
            n = tweened.length;

        while (n > 0) {
          tweened[--n].call(node, e);
        }

        if (t >= 1) {
          stop();
          d3_transitionId = id;
          event.end.call(node, d, i);
          d3_transitionId = 0;
          return 1;
        }
      }

      function stop() {
        if (!--lock.count) delete node.__transition__;
        return 1;
      }
    });
    return 1;
  }, 0, time);

  return groups;
}

var d3_transitionRemove = {};

function d3_transitionNull(d, i, a) {
  return a != "" && d3_transitionRemove;
}

function d3_transitionTween(name, b) {
  var interpolate = d3_interpolateByName(name);

  function transitionFunction(d, i, a) {
    var v = b.call(this, d, i);
    return v == null
        ? a != "" && d3_transitionRemove
        : a != v && interpolate(a, v);
  }

  function transitionString(d, i, a) {
    return a != b && interpolate(a, b);
  }

  return typeof b === "function" ? transitionFunction
      : b == null ? d3_transitionNull
      : (b += "", transitionString);
}

var d3_transitionPrototype = [],
    d3_transitionNextId = 0,
    d3_transitionId = 0,
    d3_transitionDefaultDelay = 0,
    d3_transitionDefaultDuration = 250,
    d3_transitionDefaultEase = d3.ease("cubic-in-out"),
    d3_transitionDelay = d3_transitionDefaultDelay,
    d3_transitionDuration = d3_transitionDefaultDuration,
    d3_transitionEase = d3_transitionDefaultEase;

d3_transitionPrototype.call = d3_selectionPrototype.call;

d3.transition = function(selection) {
  return arguments.length
      ? (d3_transitionId ? selection.transition() : selection)
      : d3_selectionRoot.transition();
};

d3.transition.prototype = d3_transitionPrototype;
d3_transitionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      node;

  if (typeof selector !== "function") selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if ((node = group[i]) && (subnode = selector.call(node.node, node.node.__data__, i))) {
        if ("__data__" in node.node) subnode.__data__ = node.node.__data__;
        subgroup.push({node: subnode, delay: node.delay, duration: node.duration});
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      subnodes,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subnodes = selector.call(node.node, node.node.__data__, i);
        subgroups.push(subgroup = []);
        for (var k = -1, o = subnodes.length; ++k < o;) {
          subgroup.push({node: subnodes[k], delay: node.delay, duration: node.duration});
        }
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.attr = function(name, value) {
  return this.attrTween(name, d3_transitionTween(name, value));
};

d3_transitionPrototype.attrTween = function(nameNS, tween) {
  var name = d3.ns.qualify(nameNS);

  function attrTween(d, i) {
    var f = tween.call(this, d, i, this.getAttribute(name));
    return f === d3_transitionRemove
        ? (this.removeAttribute(name), null)
        : f && function(t) { this.setAttribute(name, f(t)); };
  }

  function attrTweenNS(d, i) {
    var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
    return f === d3_transitionRemove
        ? (this.removeAttributeNS(name.space, name.local), null)
        : f && function(t) { this.setAttributeNS(name.space, name.local, f(t)); };
  }

  return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
};
d3_transitionPrototype.style = function(name, value, priority) {
  if (arguments.length < 3) priority = "";
  return this.styleTween(name, d3_transitionTween(name, value), priority);
};

d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
    return f === d3_transitionRemove
        ? (this.style.removeProperty(name), null)
        : f && function(t) { this.style.setProperty(name, f(t), priority); };
  });
};
d3_transitionPrototype.text = function(value) {
  return this.tween("text", function(d, i) {
    this.textContent = typeof value === "function"
        ? value.call(this, d, i)
        : value;
  });
};
d3_transitionPrototype.remove = function() {
  return this.each("end.transition", function() {
    var p;
    if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
  });
};
d3_transitionPrototype.delay = function(value) {
  var groups = this;
  return groups.each(typeof value === "function"
      ? function(d, i, j) { groups[j][i].delay = value.apply(this, arguments) | 0; }
      : (value = value | 0, function(d, i, j) { groups[j][i].delay = value; }));
};
d3_transitionPrototype.duration = function(value) {
  var groups = this;
  return groups.each(typeof value === "function"
      ? function(d, i, j) { groups[j][i].duration = Math.max(1, value.apply(this, arguments) | 0); }
      : (value = Math.max(1, value | 0), function(d, i, j) { groups[j][i].duration = value; }));
};
function d3_transition_each(callback) {
  var id = d3_transitionId,
      ease = d3_transitionEase,
      delay = d3_transitionDelay,
      duration = d3_transitionDuration;

  d3_transitionId = this.id;
  d3_transitionEase = this.ease();
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var node = group[i];
      if (node) {
        d3_transitionDelay = this[j][i].delay;
        d3_transitionDuration = this[j][i].duration;
        callback.call(node = node.node, node.__data__, i, j);
      }
    }
  }

  d3_transitionId = id;
  d3_transitionEase = ease;
  d3_transitionDelay = delay;
  d3_transitionDuration = duration;
  return this;
}
d3_transitionPrototype.transition = function() {
  return this.select(d3_this);
};
var d3_timer_queue = null,
    d3_timer_interval, // is an interval (or frame) active?
    d3_timer_timeout; // is a timeout active?

// The timer will continue to fire until callback returns true.
d3.timer = function(callback, delay, then) {
  var found = false,
      t0,
      t1 = d3_timer_queue;

  if (arguments.length < 3) {
    if (arguments.length < 2) delay = 0;
    else if (!isFinite(delay)) return;
    then = Date.now();
  }

  // See if the callback's already in the queue.
  while (t1) {
    if (t1.callback === callback) {
      t1.then = then;
      t1.delay = delay;
      found = true;
      break;
    }
    t0 = t1;
    t1 = t1.next;
  }

  // Otherwise, add the callback to the queue.
  if (!found) d3_timer_queue = {
    callback: callback,
    then: then,
    delay: delay,
    next: d3_timer_queue
  };

  // Start animatin'!
  if (!d3_timer_interval) {
    d3_timer_timeout = clearTimeout(d3_timer_timeout);
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

function d3_timer_step() {
  var elapsed,
      now = Date.now(),
      t1 = d3_timer_queue;

  while (t1) {
    elapsed = now - t1.then;
    if (elapsed >= t1.delay) t1.flush = t1.callback(elapsed);
    t1 = t1.next;
  }

  var delay = d3_timer_flush() - now;
  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(d3_timer_timeout);
      d3_timer_timeout = setTimeout(d3_timer_step, delay);
    }
    d3_timer_interval = 0;
  } else {
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

d3.timer.flush = function() {
  var elapsed,
      now = Date.now(),
      t1 = d3_timer_queue;

  while (t1) {
    elapsed = now - t1.then;
    if (!t1.delay) t1.flush = t1.callback(elapsed);
    t1 = t1.next;
  }

  d3_timer_flush();
};

// Flush after callbacks, to avoid concurrent queue modification.
function d3_timer_flush() {
  var t0 = null,
      t1 = d3_timer_queue,
      then = Infinity;
  while (t1) {
    if (t1.flush) {
      t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
    } else {
      then = Math.min(then, t1.then + t1.delay);
      t1 = (t0 = t1).next;
    }
  }
  return then;
}

var d3_timer_frame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 17); };
d3.transform = function(string) {
  var g = document.createElementNS(d3.ns.prefix.svg, "g"),
      identity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
  return (d3.transform = function(string) {
    g.setAttribute("transform", string);
    var t = g.transform.baseVal.consolidate();
    return new d3_transform(t ? t.matrix : identity);
  })(string);
};

// Compute x-scale and normalize the first row.
// Compute shear and make second row orthogonal to first.
// Compute y-scale and normalize the second row.
// Finally, compute the rotation.
function d3_transform(m) {
  var r0 = [m.a, m.b],
      r1 = [m.c, m.d],
      kx = d3_transformNormalize(r0),
      kz = d3_transformDot(r0, r1),
      ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
  if (r0[0] * r1[1] < r1[0] * r0[1]) {
    r0[0] *= -1;
    r0[1] *= -1;
    kx *= -1;
    kz *= -1;
  }
  this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_transformDegrees;
  this.translate = [m.e, m.f];
  this.scale = [kx, ky];
  this.skew = ky ? Math.atan2(kz, ky) * d3_transformDegrees : 0;
};

d3_transform.prototype.toString = function() {
  return "translate(" + this.translate
      + ")rotate(" + this.rotate
      + ")skewX(" + this.skew
      + ")scale(" + this.scale
      + ")";
};

function d3_transformDot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function d3_transformNormalize(a) {
  var k = Math.sqrt(d3_transformDot(a, a));
  if (k) {
    a[0] /= k;
    a[1] /= k;
  }
  return k;
}

function d3_transformCombine(a, b, k) {
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a;
}

var d3_transformDegrees = 180 / Math.PI;
d3.mouse = function(container) {
  return d3_mousePoint(container, d3_eventSource());
};

// https://bugs.webkit.org/show_bug.cgi?id=44083
var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;

function d3_mousePoint(container, e) {
  var svg = container.ownerSVGElement || container;
  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    if ((d3_mouse_bug44083 < 0) && (window.scrollX || window.scrollY)) {
      svg = d3.select(document.body)
        .append("svg")
          .style("position", "absolute")
          .style("top", 0)
          .style("left", 0);
      var ctm = svg[0][0].getScreenCTM();
      d3_mouse_bug44083 = !(ctm.f || ctm.e);
      svg.remove();
    }
    if (d3_mouse_bug44083) {
      point.x = e.pageX;
      point.y = e.pageY;
    } else {
      point.x = e.clientX;
      point.y = e.clientY;
    }
    point = point.matrixTransform(container.getScreenCTM().inverse());
    return [point.x, point.y];
  }
  var rect = container.getBoundingClientRect();
  return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop];
};
d3.touches = function(container, touches) {
  if (arguments.length < 2) touches = d3_eventSource().touches;
  return touches ? d3_array(touches).map(function(touch) {
    var point = d3_mousePoint(container, touch);
    point.identifier = touch.identifier;
    return point;
  }) : [];
};
function d3_noop() {}
d3.scale = {};

function d3_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_scaleRange(scale) {
  return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
}
function d3_scale_nice(domain, nice) {
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      dx;

  if (x1 < x0) {
    dx = i0; i0 = i1; i1 = dx;
    dx = x0; x0 = x1; x1 = dx;
  }

  if (dx = x1 - x0) {
    nice = nice(dx);
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
  }

  return domain;
}

function d3_scale_niceDefault() {
  return Math;
}
d3.scale.linear = function() {
  return d3_scale_linear([0, 1], [0, 1], d3.interpolate, false);
};

function d3_scale_linear(domain, range, interpolate, clamp) {
  var output,
      input;

  function rescale() {
    var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear,
        uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
    output = linear(domain, range, uninterpolate, interpolate);
    input = linear(range, domain, uninterpolate, d3.interpolate);
    return scale;
  }

  function scale(x) {
    return output(x);
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    return input(y);
  };

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(Number);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.rangeRound = function(x) {
    return scale.range(x).interpolate(d3.interpolateRound);
  };

  scale.clamp = function(x) {
    if (!arguments.length) return clamp;
    clamp = x;
    return rescale();
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x;
    return rescale();
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  scale.nice = function() {
    d3_scale_nice(domain, d3_scale_linearNice);
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_linear(domain, range, interpolate, clamp);
  };

  return rescale();
}

function d3_scale_linearRebind(scale, linear) {
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

function d3_scale_linearNice(dx) {
  dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
  return {
    floor: function(x) { return Math.floor(x / dx) * dx; },
    ceil: function(x) { return Math.ceil(x / dx) * dx; }
  };
}

function d3_scale_linearTickRange(domain, m) {
  var extent = d3_scaleExtent(domain),
      span = extent[1] - extent[0],
      step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
      err = m / span * step;

  // Filter ticks to get closer to the desired count.
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;

  // Round start and stop values to step interval.
  extent[0] = Math.ceil(extent[0] / step) * step;
  extent[1] = Math.floor(extent[1] / step) * step + step * .5; // inclusive
  extent[2] = step;
  return extent;
}

function d3_scale_linearTicks(domain, m) {
  return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
}

function d3_scale_linearTickFormat(domain, m) {
  return d3.format(",." + Math.max(0, -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01)) + "f");
}
function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
  var u = uninterpolate(domain[0], domain[1]),
      i = interpolate(range[0], range[1]);
  return function(x) {
    return i(u(x));
  };
}
function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
  var u = [],
      i = [],
      j = 0,
      k = Math.min(domain.length, range.length) - 1;

  // Handle descending domains.
  if (domain[k] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++j <= k) {
    u.push(uninterpolate(domain[j - 1], domain[j]));
    i.push(interpolate(range[j - 1], range[j]));
  }

  return function(x) {
    var j = d3.bisect(domain, x, 1, k) - 1;
    return i[j](u[j](x));
  };
}
d3.scale.log = function() {
  return d3_scale_log(d3.scale.linear(), d3_scale_logp);
};

function d3_scale_log(linear, log) {
  var pow = log.pow;

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    log = x[0] < 0 ? d3_scale_logn : d3_scale_logp;
    pow = log.pow;
    linear.domain(x.map(log));
    return scale;
  };

  scale.nice = function() {
    linear.domain(d3_scale_nice(linear.domain(), d3_scale_niceDefault));
    return scale;
  };

  scale.ticks = function() {
    var extent = d3_scaleExtent(linear.domain()),
        ticks = [];
    if (extent.every(isFinite)) {
      var i = Math.floor(extent[0]),
          j = Math.ceil(extent[1]),
          u = pow(extent[0]),
          v = pow(extent[1]);
      if (log === d3_scale_logn) {
        ticks.push(pow(i));
        for (; i++ < j;) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
      } else {
        for (; i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
        ticks.push(pow(i));
      }
      for (i = 0; ticks[i] < u; i++) {} // strip small values
      for (j = ticks.length; ticks[j - 1] > v; j--) {} // strip big values
      ticks = ticks.slice(i, j);
    }
    return ticks;
  };

  scale.tickFormat = function(n, format) {
    if (arguments.length < 2) format = d3_scale_logFormat;
    if (arguments.length < 1) return format;
    var k = n / scale.ticks().length,
        f = log === d3_scale_logn ? (e = -1e-12, Math.floor) : (e = 1e-12, Math.ceil),
        e;
    return function(d) {
      return d / pow(f(log(d) + e)) < k ? format(d) : "";
    };
  };

  scale.copy = function() {
    return d3_scale_log(linear.copy(), log);
  };

  return d3_scale_linearRebind(scale, linear);
}

var d3_scale_logFormat = d3.format(".0e");

function d3_scale_logp(x) {
  return Math.log(x < 0 ? 0 : x) / Math.LN10;
}

function d3_scale_logn(x) {
  return -Math.log(x > 0 ? 0 : -x) / Math.LN10;
}

d3_scale_logp.pow = function(x) {
  return Math.pow(10, x);
};

d3_scale_logn.pow = function(x) {
  return -Math.pow(10, -x);
};
d3.scale.pow = function() {
  return d3_scale_pow(d3.scale.linear(), 1);
};

function d3_scale_pow(linear, exponent) {
  var powp = d3_scale_powPow(exponent),
      powb = d3_scale_powPow(1 / exponent);

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(scale.domain(), m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(scale.domain(), m);
  };

  scale.nice = function() {
    return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
  };

  scale.exponent = function(x) {
    if (!arguments.length) return exponent;
    var domain = scale.domain();
    powp = d3_scale_powPow(exponent = x);
    powb = d3_scale_powPow(1 / exponent);
    return scale.domain(domain);
  };

  scale.copy = function() {
    return d3_scale_pow(linear.copy(), exponent);
  };

  return d3_scale_linearRebind(scale, linear);
}

function d3_scale_powPow(e) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
  };
}
d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(.5);
};
d3.scale.ordinal = function() {
  return d3_scale_ordinal([], {t: "range", x: []});
};

function d3_scale_ordinal(domain, ranger) {
  var index,
      range,
      rangeBand;

  function scale(x) {
    return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
  }

  function steps(start, step) {
    return d3.range(domain.length).map(function(i) { return start + step * i; });
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = [];
    index = new d3_Map;
    var i = -1, n = x.length, xi;
    while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
    return scale[ranger.t](ranger.x, ranger.p);
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rangeBand = 0;
    ranger = {t: "range", x: x};
    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (domain.length - 1 + padding);
    range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
    rangeBand = 0;
    ranger = {t: "rangePoints", x: x, p: padding};
    return scale;
  };

  scale.rangeBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var reverse = x[1] < x[0],
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = (stop - start) / (domain.length + padding);
    range = steps(start + step * padding, step);
    if (reverse) range.reverse();
    rangeBand = step * (1 - padding);
    ranger = {t: "rangeBands", x: x, p: padding};
    return scale;
  };

  scale.rangeRoundBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var reverse = x[1] < x[0],
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = Math.floor((stop - start) / (domain.length + padding)),
        error = stop - start - (domain.length - padding) * step;
    range = steps(start + Math.round(error / 2), step);
    if (reverse) range.reverse();
    rangeBand = Math.round(step * (1 - padding));
    ranger = {t: "rangeRoundBands", x: x, p: padding};
    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  scale.rangeExtent = function() {
    return d3_scaleExtent(ranger.x);
  };

  scale.copy = function() {
    return d3_scale_ordinal(domain, ranger);
  };

  return scale.domain(domain);
}
/*
 * This product includes color specifications and designs developed by Cynthia
 * Brewer (http://colorbrewer.org/). See lib/colorbrewer for more information.
 */
d3.scale.getcategory20 = function() {
  return d3_category20;
};

d3.scale.getcategory60 = function() {
  return d3_category20.concat(d3_category20b, d3_category20c);
};

d3.scale.getcategory60b = function() {
  return d3_category20b.concat(d3_category20c, d3_category20);
};

d3.scale.getcategory60c = function() {
  return d3_category20c.concat(d3_category20, d3_category20b);
};
 
d3.scale.category10 = function() {
  return d3.scale.ordinal().range(d3_category10);
};

d3.scale.category20 = function() {
//return d3_category20;
  return d3.scale.ordinal().range(d3_category20);
};

d3.scale.category20b = function() {
  return d3.scale.ordinal().range(d3_category20b);
};

d3.scale.category20c = function() {
  return d3.scale.ordinal().range(d3_category20c);
};

var d3_category10 = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var d3_category20 = [
  "#1f77b4", "#aec7e8",
  "#ff7f0e", "#ffbb78",
  "#2ca02c", "#98df8a",
  "#d62728", "#ff9896",
  "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94",
  "#e377c2", "#f7b6d2",
  "#7f7f7f", "#c7c7c7",
  "#bcbd22", "#dbdb8d",
  "#17becf", "#9edae5"
];

var d3_category20b = [
  "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
  "#637939", "#8ca252", "#b5cf6b", "#cedb9c",
  "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
  "#843c39", "#ad494a", "#d6616b", "#e7969c",
  "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
];

var d3_category20c = [
  "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
  "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
  "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
  "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
  "#636363", "#969696", "#bdbdbd", "#d9d9d9"
];
d3.scale.quantile = function() {
  return d3_scale_quantile([], []);
};

function d3_scale_quantile(domain, range) {
  var thresholds;

  function rescale() {
    var k = 0,
        n = domain.length,
        q = range.length;
    thresholds = [];
    while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
    return scale;
  }

  function scale(x) {
    if (isNaN(x = +x)) return NaN;
    return range[d3.bisect(thresholds, x)];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.filter(function(d) { return !isNaN(d); }).sort(d3.ascending);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.quantiles = function() {
    return thresholds;
  };

  scale.copy = function() {
    return d3_scale_quantile(domain, range); // copy on write!
  };

  return rescale();
}
d3.scale.quantize = function() {
  return d3_scale_quantize(0, 1, [0, 1]);
};

function d3_scale_quantize(x0, x1, range) {
  var kx, i;

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  function rescale() {
    kx = range.length / (x1 - x0);
    i = range.length - 1;
    return scale;
  }

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = +x[0];
    x1 = +x[x.length - 1];
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_quantize(x0, x1, range); // copy on write
  };

  return rescale();
}
d3.scale.identity = function() {
  return d3_scale_identity([0, 1]);
};

function d3_scale_identity(domain) {

  function identity(x) { return +x; }

  identity.invert = identity;

  identity.domain = identity.range = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(identity);
    return identity;
  };

  identity.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  identity.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  identity.copy = function() {
    return d3_scale_identity(domain);
  };

  return identity;
}
d3.svg = {};
d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
      outerRadius = d3_svg_arcOuterRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  function arc() {
    var r0 = innerRadius.apply(this, arguments),
        r1 = outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset,
        a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset,
        da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0),
        df = da < Math.PI ? "0" : "1",
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    return da >= d3_svg_arcMax
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1,0 0," + (-r0)
      + "A" + r0 + "," + r0 + " 0 1,0 0," + r0
      + "Z"
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "Z")
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
      + "Z"
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L0,0"
      + "Z");
  }

  arc.innerRadius = function(v) {
    if (!arguments.length) return innerRadius;
    innerRadius = d3_functor(v);
    return arc;
  };

  arc.outerRadius = function(v) {
    if (!arguments.length) return outerRadius;
    outerRadius = d3_functor(v);
    return arc;
  };

  arc.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return arc;
  };

  arc.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return arc;
  };

  arc.centroid = function() {
    var r = (innerRadius.apply(this, arguments)
        + outerRadius.apply(this, arguments)) / 2,
        a = (startAngle.apply(this, arguments)
        + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return arc;
};

var d3_svg_arcOffset = -Math.PI / 2,
    d3_svg_arcMax = 2 * Math.PI - 1e-6;

function d3_svg_arcInnerRadius(d) {
  return d.innerRadius;
}

function d3_svg_arcOuterRadius(d) {
  return d.outerRadius;
}

function d3_svg_arcStartAngle(d) {
  return d.startAngle;
}

function d3_svg_arcEndAngle(d) {
  return d.endAngle;
}
function d3_svg_line(projection) {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      defined = d3_true,
      interpolate = d3_svg_lineInterpolatorDefault,
      interpolator = d3_svg_lineLinear,
      tension = .7;

  function line(data) {
    var segments = [],
        points = [],
        i = -1,
        n = data.length,
        d,
        fx = d3_functor(x),
        fy = d3_functor(y);

    function segment() {
      segments.push("M", interpolator(projection(points), tension));
    }

    while (++i < n) {
      if (defined.call(this, d = data[i], i)) {
        points.push([+fx.call(this, d, i), +fy.call(this, d, i)]);
      } else if (points.length) {
        segment();
        points = [];
      }
    }

    if (points.length) segment();

    return segments.length ? segments.join("") : null;
  }

  line.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return line;
  };

  line.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return line;
  };

  line.defined  = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return line;
  };

  line.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    if (!d3_svg_lineInterpolators.has(_ += "")) _ = d3_svg_lineInterpolatorDefault;
    interpolator = d3_svg_lineInterpolators.get(interpolate = _);
    return line;
  };

  line.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _;
    return line;
  };

  return line;
}

d3.svg.line = function() {
  return d3_svg_line(d3_identity);
};

// The default `x` property, which references d[0].
function d3_svg_lineX(d) {
  return d[0];
}

// The default `y` property, which references d[1].
function d3_svg_lineY(d) {
  return d[1];
}

var d3_svg_lineInterpolatorDefault = "linear";

// The various interpolators supported by the `line` class.
var d3_svg_lineInterpolators = d3.map({
  "linear": d3_svg_lineLinear,
  "step-before": d3_svg_lineStepBefore,
  "step-after": d3_svg_lineStepAfter,
  "basis": d3_svg_lineBasis,
  "basis-open": d3_svg_lineBasisOpen,
  "basis-closed": d3_svg_lineBasisClosed,
  "bundle": d3_svg_lineBundle,
  "cardinal": d3_svg_lineCardinal,
  "cardinal-open": d3_svg_lineCardinalOpen,
  "cardinal-closed": d3_svg_lineCardinalClosed,
  "monotone": d3_svg_lineMonotone
});

// Linear interpolation; generates "L" commands.
function d3_svg_lineLinear(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("L", (p = points[i])[0], ",", p[1]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepBefore(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepAfter(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
  return path.join("");
}

// Open cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalOpen(points, tension) {
  return points.length < 4
      ? d3_svg_lineLinear(points)
      : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1),
        d3_svg_lineCardinalTangents(points, tension));
}

// Closed cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalClosed(points, tension) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite((points.push(points[0]), points),
        d3_svg_lineCardinalTangents([points[points.length - 2]]
        .concat(points, [points[1]]), tension));
}

// Cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinal(points, tension, closed) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points,
        d3_svg_lineCardinalTangents(points, tension));
}

// Hermite spline construction; generates "C" commands.
function d3_svg_lineHermite(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) {
    return d3_svg_lineLinear(points);
  }

  var quad = points.length != tangents.length,
      path = "",
      p0 = points[0],
      p = points[1],
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3)
        + "," + p[0] + "," + p[1];
    p0 = points[1];
    pi = 2;
  }

  if (tangents.length > 1) {
    t = tangents[1];
    p = points[pi];
    pi++;
    path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1])
        + "," + (p[0] - t[0]) + "," + (p[1] - t[1])
        + "," + p[0] + "," + p[1];
    for (var i = 2; i < tangents.length; i++, pi++) {
      p = points[pi];
      t = tangents[i];
      path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1])
          + "," + p[0] + "," + p[1];
    }
  }

  if (quad) {
    var lp = points[pi];
    path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3)
        + "," + lp[0] + "," + lp[1];
  }

  return path;
}

// Generates tangents for a cardinal spline.
function d3_svg_lineCardinalTangents(points, tension) {
  var tangents = [],
      a = (1 - tension) / 2,
      p0,
      p1 = points[0],
      p2 = points[1],
      i = 1,
      n = points.length;
  while (++i < n) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  }
  return tangents;
}

// B-spline interpolation; generates "C" commands.
function d3_svg_lineBasis(points) {
  if (points.length < 3) return d3_svg_lineLinear(points);
  var i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi[0],
      y0 = pi[1],
      px = [x0, x0, x0, (pi = points[1])[0]],
      py = [y0, y0, y0, pi[1]],
      path = [x0, ",", y0];
  d3_svg_lineBasisBezier(path, px, py);
  while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  i = -1;
  while (++i < 2) {
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Open B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisOpen(points) {
  if (points.length < 4) return d3_svg_lineLinear(points);
  var path = [],
      i = -1,
      n = points.length,
      pi,
      px = [0],
      py = [0];
  while (++i < 3) {
    pi = points[i];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px)
    + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
  --i; while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Closed B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisClosed(points) {
  var path,
      i = -1,
      n = points.length,
      m = n + 4,
      pi,
      px = [],
      py = [];
  while (++i < 4) {
    pi = points[i % n];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path = [
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",",
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
  ];
  --i; while (++i < m) {
    pi = points[i % n];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

function d3_svg_lineBundle(points, tension) {
  var n = points.length - 1,
      x0 = points[0][0],
      y0 = points[0][1],
      dx = points[n][0] - x0,
      dy = points[n][1] - y0,
      i = -1,
      p,
      t;
  while (++i <= n) {
    p = points[i];
    t = i / n;
    p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
    p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
  }
  return d3_svg_lineBasis(points);
}

// Returns the dot product of the given four-element vectors.
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Matrix to transform basis (b-spline) control points to bezier
// control points. Derived from FvD 11.2.8.
var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
    d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
    d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

// Pushes a "C" Bézier curve onto the specified path array, given the
// two specified four-element arrays which define the control points.
function d3_svg_lineBasisBezier(path, x, y) {
  path.push(
      "C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}

// Computes the slope from points p0 to p1.
function d3_svg_lineSlope(p0, p1) {
  return (p1[1] - p0[1]) / (p1[0] - p0[0]);
}

// Compute three-point differences for the given points.
// http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Finite_difference
function d3_svg_lineFiniteDifferences(points) {
  var i = 0,
      j = points.length - 1,
      m = [],
      p0 = points[0],
      p1 = points[1],
      d = m[0] = d3_svg_lineSlope(p0, p1);
  while (++i < j) {
    m[i] = d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]));
  }
  m[i] = d;
  return m;
}

// Interpolates the given points using Fritsch-Carlson Monotone cubic Hermite
// interpolation. Returns an array of tangent vectors. For details, see
// http://en.wikipedia.org/wiki/Monotone_cubic_interpolation
function d3_svg_lineMonotoneTangents(points) {
  var tangents = [],
      d,
      a,
      b,
      s,
      m = d3_svg_lineFiniteDifferences(points),
      i = -1,
      j = points.length - 1;

  // The first two steps are done by computing finite-differences:
  // 1. Compute the slopes of the secant lines between successive points.
  // 2. Initialize the tangents at every point as the average of the secants.

  // Then, for each segment…
  while (++i < j) {
    d = d3_svg_lineSlope(points[i], points[i + 1]);

    // 3. If two successive yk = y{k + 1} are equal (i.e., d is zero), then set
    // mk = m{k + 1} = 0 as the spline connecting these points must be flat to
    // preserve monotonicity. Ignore step 4 and 5 for those k.

    if (Math.abs(d) < 1e-6) {
      m[i] = m[i + 1] = 0;
    } else {
      // 4. Let ak = mk / dk and bk = m{k + 1} / dk.
      a = m[i] / d;
      b = m[i + 1] / d;

      // 5. Prevent overshoot and ensure monotonicity by restricting the
      // magnitude of vector <ak, bk> to a circle of radius 3.
      s = a * a + b * b;
      if (s > 9) {
        s = d * 3 / Math.sqrt(s);
        m[i] = s * a;
        m[i + 1] = s * b;
      }
    }
  }

  // Compute the normalized tangent vector from the slopes. Note that if x is
  // not monotonic, it's possible that the slope will be infinite, so we protect
  // against NaN by setting the coordinate to zero.
  i = -1; while (++i <= j) {
    s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
    tangents.push([s || 0, m[i] * s || 0]);
  }

  return tangents;
}

function d3_svg_lineMonotone(points) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
}
d3.svg.line.radial = function() {
  var line = d3_svg_line(d3_svg_lineRadial);
  line.radius = line.x, delete line.x;
  line.angle = line.y, delete line.y;
  return line;
};

function d3_svg_lineRadial(points) {
  var point,
      i = -1,
      n = points.length,
      r,
      a;
  while (++i < n) {
    point = points[i];
    r = point[0];
    a = point[1] + d3_svg_arcOffset;
    point[0] = r * Math.cos(a);
    point[1] = r * Math.sin(a);
  }
  return points;
}
function d3_svg_area(projection) {
  var x0 = d3_svg_lineX,
      x1 = d3_svg_lineX,
      y0 = 0,
      y1 = d3_svg_lineY,
      defined = d3_true,
      interpolate = d3_svg_lineInterpolatorDefault,
      i0 = d3_svg_lineLinear,
      i1 = d3_svg_lineLinear,
      L = "L",
      tension = .7;

  function area(data) {
    var segments = [],
        points0 = [],
        points1 = [],
        i = -1,
        n = data.length,
        d,
        fx0 = d3_functor(x0),
        fy0 = d3_functor(y0),
        fx1 = x0 === x1 ? function() { return x; } : d3_functor(x1),
        fy1 = y0 === y1 ? function() { return y; } : d3_functor(y1),
        x,
        y;

    function segment() {
      segments.push("M", i0(projection(points1), tension),
          L, i1(projection(points0.reverse()), tension),
          "Z");
    }

    while (++i < n) {
      if (defined.call(this, d = data[i], i)) {
        points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]);
        points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)]);
      } else if (points0.length) {
        segment();
        points0 = [];
        points1 = [];
      }
    }

    if (points0.length) segment();

    return segments.length ? segments.join("") : null;
  }

  area.x = function(_) {
    if (!arguments.length) return x1;
    x0 = x1 = _;
    return area;
  };

  area.x0 = function(_) {
    if (!arguments.length) return x0;
    x0 = _;
    return area;
  };

  area.x1 = function(_) {
    if (!arguments.length) return x1;
    x1 = _;
    return area;
  };

  area.y = function(_) {
    if (!arguments.length) return y1;
    y0 = y1 = _;
    return area;
  };

  area.y0 = function(_) {
    if (!arguments.length) return y0;
    y0 = _;
    return area;
  };

  area.y1 = function(_) {
    if (!arguments.length) return y1;
    y1 = _;
    return area;
  };

  area.defined  = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return area;
  };

  area.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    if (!d3_svg_lineInterpolators.has(_ += "")) _ = d3_svg_lineInterpolatorDefault;
    i0 = d3_svg_lineInterpolators.get(interpolate = _);
    i1 = i0.reverse || i0;
    L = /-closed$/.test(_) ? "M" : "L";
    return area;
  };

  area.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _;
    return area;
  };

  return area;
}

d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;

d3.svg.area = function() {
  return d3_svg_area(Object);
};
d3.svg.area.radial = function() {
  var area = d3_svg_area(d3_svg_lineRadial);
  area.radius = area.x, delete area.x;
  area.innerRadius = area.x0, delete area.x0;
  area.outerRadius = area.x1, delete area.x1;
  area.angle = area.y, delete area.y;
  area.startAngle = area.y0, delete area.y0;
  area.endAngle = area.y1, delete area.y1;
  return area;
};
d3.svg.chord = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      radius = d3_svg_chordRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  // TODO Allow control point to be customized.

  function chord(d, i) {
    var s = subgroup(this, source, d, i),
        t = subgroup(this, target, d, i);
    return "M" + s.p0
      + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t)
      ? curve(s.r, s.p1, s.r, s.p0)
      : curve(s.r, s.p1, t.r, t.p0)
      + arc(t.r, t.p1, t.a1 - t.a0)
      + curve(t.r, t.p1, s.r, s.p0))
      + "Z";
  }

  function subgroup(self, f, d, i) {
    var subgroup = f.call(self, d, i),
        r = radius.call(self, subgroup, i),
        a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset,
        a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
    return {
      r: r,
      a0: a0,
      a1: a1,
      p0: [r * Math.cos(a0), r * Math.sin(a0)],
      p1: [r * Math.cos(a1), r * Math.sin(a1)]
    };
  }

  function equals(a, b) {
    return a.a0 == b.a0 && a.a1 == b.a1;
  }

  function arc(r, p, a) {
    return "A" + r + "," + r + " 0 " + +(a > Math.PI) + ",1 " + p;
  }

  function curve(r0, p0, r1, p1) {
    return "Q 0,0 " + p1;
  }

  chord.radius = function(v) {
    if (!arguments.length) return radius;
    radius = d3_functor(v);
    return chord;
  };

  chord.source = function(v) {
    if (!arguments.length) return source;
    source = d3_functor(v);
    return chord;
  };

  chord.target = function(v) {
    if (!arguments.length) return target;
    target = d3_functor(v);
    return chord;
  };

  chord.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return chord;
  };

  chord.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return chord;
  };

  return chord;
};

function d3_svg_chordSource(d) {
  return d.source;
}

function d3_svg_chordTarget(d) {
  return d.target;
}

function d3_svg_chordRadius(d) {
  return d.radius;
}

function d3_svg_chordStartAngle(d) {
  return d.startAngle;
}

function d3_svg_chordEndAngle(d) {
  return d.endAngle;
}
d3.svg.diagonal = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      projection = d3_svg_diagonalProjection;

  function diagonal(d, i) {
    var p0 = source.call(this, d, i),
        p3 = target.call(this, d, i),
        m = (p0.y + p3.y) / 2,
        p = [p0, {x: p0.x, y: m}, {x: p3.x, y: m}, p3];
    p = p.map(projection);
    return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
  }

  diagonal.source = function(x) {
    if (!arguments.length) return source;
    source = d3_functor(x);
    return diagonal;
  };

  diagonal.target = function(x) {
    if (!arguments.length) return target;
    target = d3_functor(x);
    return diagonal;
  };

  diagonal.projection = function(x) {
    if (!arguments.length) return projection;
    projection = x;
    return diagonal;
  };

  return diagonal;
};

function d3_svg_diagonalProjection(d) {
  return [d.x, d.y];
}
d3.svg.diagonal.radial = function() {
  var diagonal = d3.svg.diagonal(),
      projection = d3_svg_diagonalProjection,
      projection_ = diagonal.projection;

  diagonal.projection = function(x) {
    return arguments.length
        ? projection_(d3_svg_diagonalRadialProjection(projection = x))
        : projection;
  };

  return diagonal;
};

function d3_svg_diagonalRadialProjection(projection) {
  return function() {
    var d = projection.apply(this, arguments),
        r = d[0],
        a = d[1] + d3_svg_arcOffset;
    return [r * Math.cos(a), r * Math.sin(a)];
  };
}
d3.svg.mouse = d3.mouse;
d3.svg.touches = d3.touches;
d3.svg.symbol = function() {
  var type = d3_svg_symbolType,
      size = d3_svg_symbolSize;

  function symbol(d, i) {
    return (d3_svg_symbols.get(type.call(this, d, i))
        || d3_svg_symbolCircle)
        (size.call(this, d, i));
  }

  symbol.type = function(x) {
    if (!arguments.length) return type;
    type = d3_functor(x);
    return symbol;
  };

  // size of symbol in square pixels
  symbol.size = function(x) {
    if (!arguments.length) return size;
    size = d3_functor(x);
    return symbol;
  };

  return symbol;
};

function d3_svg_symbolSize() {
  return 64;
}

function d3_svg_symbolType() {
  return "circle";
}

function d3_svg_symbolCircle(size) {
  var r = Math.sqrt(size / Math.PI);
  return "M0," + r
      + "A" + r + "," + r + " 0 1,1 0," + (-r)
      + "A" + r + "," + r + " 0 1,1 0," + r
      + "Z";
}

// TODO cross-diagonal?
var d3_svg_symbols = d3.map({
  "circle": d3_svg_symbolCircle,
  "cross": function(size) {
    var r = Math.sqrt(size / 5) / 2;
    return "M" + -3 * r + "," + -r
        + "H" + -r
        + "V" + -3 * r
        + "H" + r
        + "V" + -r
        + "H" + 3 * r
        + "V" + r
        + "H" + r
        + "V" + 3 * r
        + "H" + -r
        + "V" + r
        + "H" + -3 * r
        + "Z";
  },
  "diamond": function(size) {
    var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)),
        rx = ry * d3_svg_symbolTan30;
    return "M0," + -ry
        + "L" + rx + ",0"
        + " 0," + ry
        + " " + -rx + ",0"
        + "Z";
  },
  "square": function(size) {
    var r = Math.sqrt(size) / 2;
    return "M" + -r + "," + -r
        + "L" + r + "," + -r
        + " " + r + "," + r
        + " " + -r + "," + r
        + "Z";
  },
  "triangle-down": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + ry
        + "L" + rx +"," + -ry
        + " " + -rx + "," + -ry
        + "Z";
  },
  "triangle-up": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + -ry
        + "L" + rx +"," + ry
        + " " + -rx + "," + ry
        + "Z";
  }
});

d3.svg.symbolTypes = d3_svg_symbols.keys();

var d3_svg_symbolSqrt3 = Math.sqrt(3),
    d3_svg_symbolTan30 = Math.tan(30 * Math.PI / 180);
d3.svg.axis = function() {
  var scale = d3.scale.linear(),
      orient = "bottom",
      tickMajorSize = 6,
      tickMinorSize = 6,
      tickEndSize = 6,
      tickPadding = 3,
      tickArguments_ = [10],
      tickValues = null,
      tickFormat_,
      tickSubdivide = 0;

  function axis(g) {
    g.each(function() {
      var g = d3.select(this);

      // Ticks, or domain values for ordinal scales.
      var ticks = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain()) : tickValues,
          tickFormat = tickFormat_ == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String) : tickFormat_;

      // Minor ticks.
      var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide),
          subtick = g.selectAll(".minor").data(subticks, String),
          subtickEnter = subtick.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1e-6),
          subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(),
          subtickUpdate = d3.transition(subtick).style("opacity", 1);

      // Major ticks.
      var tick = g.selectAll("g").data(ticks, String),
          tickEnter = tick.enter().insert("g", "path").style("opacity", 1e-6),
          tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(),
          tickUpdate = d3.transition(tick).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = d3_scaleRange(scale),
          path = g.selectAll(".domain").data([0]),
          pathEnter = path.enter().append("path").attr("class", "domain"),
          pathUpdate = d3.transition(path);

      // Stash a snapshot of the new scale, and retrieve the old snapshot.
      var scale1 = scale.copy(),
          scale0 = this.__chart__ || scale1;
      this.__chart__ = scale1;

      tickEnter.append("line").attr("class", "tick");
      tickEnter.append("text");
      tickUpdate.select("text").text(tickFormat);

      switch (orient) {
        case "bottom": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", tickMinorSize);
          subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
          tickEnter.select("line").attr("y2", tickMajorSize);
          tickEnter.select("text").attr("y", Math.max(tickMajorSize, 0) + tickPadding);
          tickUpdate.select("line").attr("x2", 0).attr("y2", tickMajorSize);
          tickUpdate.select("text").attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding).attr("dy", ".71em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
          break;
        }
        case "top": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", -tickMinorSize);
          subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
          tickEnter.select("line").attr("y2", -tickMajorSize);
          tickEnter.select("text").attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
          tickUpdate.select("line").attr("x2", 0).attr("y2", -tickMajorSize);
          tickUpdate.select("text").attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("dy", "0em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
          break;
        }
        case "left": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", -tickMinorSize);
          subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
          tickEnter.select("line").attr("x2", -tickMajorSize);
          tickEnter.select("text").attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
          tickUpdate.select("line").attr("x2", -tickMajorSize).attr("y2", 0);
          tickUpdate.select("text").attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "end");
          pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
          break;
        }
        case "right": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", tickMinorSize);
          subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
          tickEnter.select("line").attr("x2", tickMajorSize);
          tickEnter.select("text").attr("x", Math.max(tickMajorSize, 0) + tickPadding);
          tickUpdate.select("line").attr("x2", tickMajorSize).attr("y2", 0);
          tickUpdate.select("text").attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "start");
          pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
          break;
        }
      }

      // For quantitative scales:
      // - enter new ticks from the old scale
      // - exit old ticks to the new scale
      if (scale.ticks) {
        tickEnter.call(tickTransform, scale0);
        tickUpdate.call(tickTransform, scale1);
        tickExit.call(tickTransform, scale1);
        subtickEnter.call(tickTransform, scale0);
        subtickUpdate.call(tickTransform, scale1);
        subtickExit.call(tickTransform, scale1);
      }

      // For ordinal scales:
      // - any entering ticks are undefined in the old scale
      // - any exiting ticks are undefined in the new scale
      // Therefore, we only need to transition updating ticks.
      else {
        var dx = scale1.rangeBand() / 2, x = function(d) { return scale1(d) + dx; };
        tickEnter.call(tickTransform, x);
        tickUpdate.call(tickTransform, x);
      }
    });
  }

  axis.scale = function(x) {
    if (!arguments.length) return scale;
    scale = x;
    return axis;
  };

  axis.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    return axis;
  };

  axis.ticks = function() {
    if (!arguments.length) return tickArguments_;
    tickArguments_ = arguments;
    return axis;
  };

  axis.tickValues = function(x) {
    if (!arguments.length) return tickValues;
    tickValues = x;
    return axis;
  };

  axis.tickFormat = function(x) {
    if (!arguments.length) return tickFormat_;
    tickFormat_ = x;
    return axis;
  };

  axis.tickSize = function(x, y, z) {
    if (!arguments.length) return tickMajorSize;
    var n = arguments.length - 1;
    tickMajorSize = +x;
    tickMinorSize = n > 1 ? +y : tickMajorSize;
    tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
    return axis;
  };

  axis.tickPadding = function(x) {
    if (!arguments.length) return tickPadding;
    tickPadding = +x;
    return axis;
  };

  axis.tickSubdivide = function(x) {
    if (!arguments.length) return tickSubdivide;
    tickSubdivide = +x;
    return axis;
  };

  return axis;
};

function d3_svg_axisX(selection, x) {
  selection.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
}

function d3_svg_axisY(selection, y) {
  selection.attr("transform", function(d) { return "translate(0," + y(d) + ")"; });
}

function d3_svg_axisSubdivide(scale, ticks, m) {
  subticks = [];
  if (m && ticks.length > 1) {
    var extent = d3_scaleExtent(scale.domain()),
        subticks,
        i = -1,
        n = ticks.length,
        d = (ticks[1] - ticks[0]) / ++m,
        j,
        v;
    while (++i < n) {
      for (j = m; --j > 0;) {
        if ((v = +ticks[i] - j * d) >= extent[0]) {
          subticks.push(v);
        }
      }
    }
    for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1];) {
      subticks.push(v);
    }
  }
  return subticks;
}
d3.svg.brush = function() {
  var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"),
      x = null, // x-scale, optional
      y = null, // y-scale, optional
      resizes = d3_svg_brushResizes[0],
      extent = [[0, 0], [0, 0]], // [x0, y0], [x1, y1], in pixels (integers)
      extentDomain; // the extent in data space, lazily created

  function brush(g) {
    g.each(function() {
      var g = d3.select(this),
          bg = g.selectAll(".background").data([0]),
          fg = g.selectAll(".extent").data([0]),
          tz = g.selectAll(".resize").data(resizes, String),
          e;

      // Prepare the brush container for events.
      g
          .style("pointer-events", "all")
          .on("mousedown.brush", brushstart)
          .on("touchstart.brush", brushstart);

      // An invisible, mouseable area for starting a new brush.
      bg.enter().append("rect")
          .attr("class", "background")
          .style("visibility", "hidden")
          .style("cursor", "crosshair");

      // The visible brush extent; style this as you like!
      fg.enter().append("rect")
          .attr("class", "extent")
          .style("cursor", "move");

      // More invisible rects for resizing the extent.
      tz.enter().append("g")
          .attr("class", function(d) { return "resize " + d; })
          .style("cursor", function(d) { return d3_svg_brushCursor[d]; })
        .append("rect")
          .attr("x", function(d) { return /[ew]$/.test(d) ? -3 : null; })
          .attr("y", function(d) { return /^[ns]/.test(d) ? -3 : null; })
          .attr("width", 6)
          .attr("height", 6)
          .style("visibility", "hidden");

      // Show or hide the resizers.
      tz.style("display", brush.empty() ? "none" : null);

      // Remove any superfluous resizers.
      tz.exit().remove();

      // Initialize the background to fill the defined range.
      // If the range isn't defined, you can post-process.
      if (x) {
        e = d3_scaleRange(x);
        bg.attr("x", e[0]).attr("width", e[1] - e[0]);
        redrawX(g);
      }
      if (y) {
        e = d3_scaleRange(y);
        bg.attr("y", e[0]).attr("height", e[1] - e[0]);
        redrawY(g);
      }
      redraw(g);
    });
  }

  function redraw(g) {
    g.selectAll(".resize").attr("transform", function(d) {
      return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
    });
  }

  function redrawX(g) {
    g.select(".extent").attr("x", extent[0][0]);
    g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
  }

  function redrawY(g) {
    g.select(".extent").attr("y", extent[0][1]);
    g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
  }

  function brushstart() {
    var target = this,
        eventTarget = d3.select(d3.event.target),
        event_ = event.of(target, arguments),
        g = d3.select(target),
        resizing = eventTarget.datum(),
        resizingX = !/^(n|s)$/.test(resizing) && x,
        resizingY = !/^(e|w)$/.test(resizing) && y,
        dragging = eventTarget.classed("extent"),
        center,
        origin = mouse(),
        offset;

    var w = d3.select(window)
        .on("mousemove.brush", brushmove)
        .on("mouseup.brush", brushend)
        .on("touchmove.brush", brushmove)
        .on("touchend.brush", brushend)
        .on("keydown.brush", keydown)
        .on("keyup.brush", keyup);

    // If the extent was clicked on, drag rather than brush;
    // store the point between the mouse and extent origin instead.
    if (dragging) {
      origin[0] = extent[0][0] - origin[0];
      origin[1] = extent[0][1] - origin[1];
    }

    // If a resizer was clicked on, record which side is to be resized.
    // Also, set the origin to the opposite side.
    else if (resizing) {
      var ex = +/w$/.test(resizing),
          ey = +/^n/.test(resizing);
      offset = [extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1]];
      origin[0] = extent[ex][0];
      origin[1] = extent[ey][1];
    }

    // If the ALT key is down when starting a brush, the center is at the mouse.
    else if (d3.event.altKey) center = origin.slice();

    // Propagate the active cursor to the body for the drag duration.
    g.style("pointer-events", "none").selectAll(".resize").style("display", null);
    d3.select("body").style("cursor", eventTarget.style("cursor"));

    // Notify listeners.
    event_({type: "brushstart"});
    brushmove();
    d3_eventCancel();

    function mouse() {
      var touches = d3.event.changedTouches;
      return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
    }

    function keydown() {
      if (d3.event.keyCode == 32) {
        if (!dragging) {
          center = null;
          origin[0] -= extent[1][0];
          origin[1] -= extent[1][1];
          dragging = 2;
        }
        d3_eventCancel();
      }
    }

    function keyup() {
      if (d3.event.keyCode == 32 && dragging == 2) {
        origin[0] += extent[1][0];
        origin[1] += extent[1][1];
        dragging = 0;
        d3_eventCancel();
      }
    }

    function brushmove() {
      var point = mouse(),
          moved = false;

      // Preserve the offset for thick resizers.
      if (offset) {
        point[0] += offset[0];
        point[1] += offset[1];
      }

      if (!dragging) {

        // If needed, determine the center from the current extent.
        if (d3.event.altKey) {
          if (!center) center = [(extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2];

          // Update the origin, for when the ALT key is released.
          origin[0] = extent[+(point[0] < center[0])][0];
          origin[1] = extent[+(point[1] < center[1])][1];
        }

        // When the ALT key is released, we clear the center.
        else center = null;
      }

      // Update the brush extent for each dimension.
      if (resizingX && move1(point, x, 0)) {
        redrawX(g);
        moved = true;
      }
      if (resizingY && move1(point, y, 1)) {
        redrawY(g);
        moved = true;
      }

      // Final redraw and notify listeners.
      if (moved) {
        redraw(g);
        event_({type: "brush", mode: dragging ? "move" : "resize"});
      }
    }

    function move1(point, scale, i) {
      var range = d3_scaleRange(scale),
          r0 = range[0],
          r1 = range[1],
          position = origin[i],
          size = extent[1][i] - extent[0][i],
          min,
          max;

      // When dragging, reduce the range by the extent size and position.
      if (dragging) {
        r0 -= position;
        r1 -= size + position;
      }

      // Clamp the point so that the extent fits within the range extent.
      min = Math.max(r0, Math.min(r1, point[i]));

      // Compute the new extent bounds.
      if (dragging) {
        max = (min += position) + size;
      } else {

        // If the ALT key is pressed, then preserve the center of the extent.
        if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));

        // Compute the min and max of the position and point.
        if (position < min) {
          max = min;
          min = position;
        } else {
          max = position;
        }
      }

      // Update the stored bounds.
      if (extent[0][i] !== min || extent[1][i] !== max) {
        extentDomain = null;
        extent[0][i] = min;
        extent[1][i] = max;
        return true;
      }
    }

    function brushend() {
      brushmove();

      // reset the cursor styles
      g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
      d3.select("body").style("cursor", null);

      w .on("mousemove.brush", null)
        .on("mouseup.brush", null)
        .on("touchmove.brush", null)
        .on("touchend.brush", null)
        .on("keydown.brush", null)
        .on("keyup.brush", null);

      event_({type: "brushend"});
      d3_eventCancel();
    }
  }

  brush.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    resizes = d3_svg_brushResizes[!x << 1 | !y]; // fore!
    return brush;
  };

  brush.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    resizes = d3_svg_brushResizes[!x << 1 | !y]; // fore!
    return brush;
  };

  brush.extent = function(z) {
    var x0, x1, y0, y1, t;

    // Invert the pixel extent to data-space.
    if (!arguments.length) {
      z = extentDomain || extent;
      if (x) {
        x0 = z[0][0], x1 = z[1][0];
        if (!extentDomain) {
          x0 = extent[0][0], x1 = extent[1][0];
          if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
          if (x1 < x0) t = x0, x0 = x1, x1 = t;
        }
      }
      if (y) {
        y0 = z[0][1], y1 = z[1][1];
        if (!extentDomain) {
          y0 = extent[0][1], y1 = extent[1][1];
          if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
          if (y1 < y0) t = y0, y0 = y1, y1 = t;
        }
      }
      return x && y ? [[x0, y0], [x1, y1]] : x ? [x0, x1] : y && [y0, y1];
    }

    // Scale the data-space extent to pixels.
    extentDomain = [[0, 0], [0, 0]];
    if (x) {
      x0 = z[0], x1 = z[1];
      if (y) x0 = x0[0], x1 = x1[0];
      extentDomain[0][0] = x0, extentDomain[1][0] = x1;
      if (x.invert) x0 = x(x0), x1 = x(x1);
      if (x1 < x0) t = x0, x0 = x1, x1 = t;
      extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
    }
    if (y) {
      y0 = z[0], y1 = z[1];
      if (x) y0 = y0[1], y1 = y1[1];
      extentDomain[0][1] = y0, extentDomain[1][1] = y1;
      if (y.invert) y0 = y(y0), y1 = y(y1);
      if (y1 < y0) t = y0, y0 = y1, y1 = t;
      extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
    }

    return brush;
  };

  brush.clear = function() {
    extentDomain = null;
    extent[0][0] =
    extent[0][1] =
    extent[1][0] =
    extent[1][1] = 0;
    return brush;
  };

  brush.empty = function() {
    return (x && extent[0][0] === extent[1][0])
        || (y && extent[0][1] === extent[1][1]);
  };

  return d3.rebind(brush, event, "on");
};

var d3_svg_brushCursor = {
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};

var d3_svg_brushResizes = [
  ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
  ["e", "w"],
  ["n", "s"],
  []
];
d3.behavior = {};
// TODO Track touch points by identifier.

d3.behavior.drag = function() {
  var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
      origin = null;

  function drag() {
    this.on("mousedown.drag", mousedown)
        .on("touchstart.drag", mousedown);
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        offset,
        origin_ = point(),
        moved = 0;

    var w = d3.select(window)
        .on("mousemove.drag", dragmove)
        .on("touchmove.drag", dragmove)
        .on("mouseup.drag", dragend, true)
        .on("touchend.drag", dragend, true);

    if (origin) {
      offset = origin.apply(target, arguments);
      offset = [offset.x - origin_[0], offset.y - origin_[1]];
    } else {
      offset = [0, 0];
    }

    d3_eventCancel();
    event_({type: "dragstart"});

    function point() {
      var p = target.parentNode,
          t = d3.event.changedTouches;
      return t ? d3.touches(p, t)[0] : d3.mouse(p);
    }

    function dragmove() {
      if (!target.parentNode) return dragend(); // target removed from DOM

      var p = point(),
          dx = p[0] - origin_[0],
          dy = p[1] - origin_[1];

      moved |= dx | dy;
      origin_ = p;
      d3_eventCancel();

      event_({type: "drag", x: p[0] + offset[0], y: p[1] + offset[1], dx: dx, dy: dy});
    }

    function dragend() {
      event_({type: "dragend"});

      // if moved, prevent the mouseup (and possibly click) from propagating
      if (moved) {
        d3_eventCancel();
        if (d3.event.target === eventTarget) w.on("click.drag", click, true);
      }

      w .on("mousemove.drag", null)
        .on("touchmove.drag", null)
        .on("mouseup.drag", null)
        .on("touchend.drag", null);
    }

    // prevent the subsequent click from propagating (e.g., for anchors)
    function click() {
      d3_eventCancel();
      w.on("click.drag", null);
    }
  }

  drag.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return drag;
  };

  return d3.rebind(drag, event, "on");
};
d3.behavior.zoom = function() {
  var translate = [0, 0],
      translate0, // translate when we started zooming (to avoid drift)
      scale = 1,
      scale0, // scale when we started touching
      scaleExtent = d3_behavior_zoomInfinity,
      event = d3_eventDispatch(zoom, "zoom"),
      x0,
      x1,
      y0,
      y1,
      touchtime; // time of last touchstart (to detect double-tap)

  function zoom() {
    this
        .on("mousedown.zoom", mousedown)
        .on("mousewheel.zoom", mousewheel)
        .on("mousemove.zoom", mousemove)
        .on("DOMMouseScroll.zoom", mousewheel)
        .on("dblclick.zoom", dblclick)
        .on("touchstart.zoom", touchstart)
        .on("touchmove.zoom", touchmove)
        .on("touchend.zoom", touchstart);
  }

  zoom.translate = function(x) {
    if (!arguments.length) return translate;
    translate = x.map(Number);
    return zoom;
  };

  zoom.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return zoom;
  };

  zoom.scaleExtent = function(x) {
    if (!arguments.length) return scaleExtent;
    scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
    return zoom;
  };

  zoom.x = function(z) {
    if (!arguments.length) return x1;
    x1 = z;
    x0 = z.copy();
    return zoom;
  };

  zoom.y = function(z) {
    if (!arguments.length) return y1;
    y1 = z;
    y0 = z.copy();
    return zoom;
  };

  function location(p) {
    return [(p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale];
  }

  function point(l) {
    return [l[0] * scale + translate[0], l[1] * scale + translate[1]];
  }

  function scaleTo(s) {
    scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
  }

  function translateTo(p, l) {
    l = point(l);
    translate[0] += p[0] - l[0];
    translate[1] += p[1] - l[1];
  }

  function dispatch(event) {
    if (x1) x1.domain(x0.range().map(function(x) { return (x - translate[0]) / scale; }).map(x0.invert));
    if (y1) y1.domain(y0.range().map(function(y) { return (y - translate[1]) / scale; }).map(y0.invert));
    d3.event.preventDefault();
    event({type: "zoom", scale: scale, translate: translate});
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        moved = 0,
        w = d3.select(window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup),
        l = location(d3.mouse(target));

    window.focus();
    d3_eventCancel();

    function mousemove() {
      moved = 1;
      translateTo(d3.mouse(target), l);
      dispatch(event_);
    }

    function mouseup() {
      if (moved) d3_eventCancel();
      w.on("mousemove.zoom", null).on("mouseup.zoom", null);
      if (moved && d3.event.target === eventTarget) w.on("click.zoom", click, true);
    }

    function click() {
      d3_eventCancel();
      w.on("click.zoom", null);
    }
  }

  function mousewheel() {
    if (!translate0) translate0 = location(d3.mouse(this));
    scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
    translateTo(d3.mouse(this), translate0);
    dispatch(event.of(this, arguments));
  }

  function mousemove() {
    translate0 = null;
  }

  function dblclick() {
    var p = d3.mouse(this), l = location(p);
    scaleTo(d3.event.shiftKey ? scale / 2 : scale * 2);
    translateTo(p, l);
    dispatch(event.of(this, arguments));
  }

  function touchstart() {
    var touches = d3.touches(this),
        now = Date.now();

    scale0 = scale;
    translate0 = {};
    touches.forEach(function(t) { translate0[t.identifier] = location(t); });
    d3_eventCancel();

    if ((touches.length === 1) && (now - touchtime < 500)) { // dbltap
      var p = touches[0], l = location(touches[0]);
      scaleTo(scale * 2);
      translateTo(p, l);
      dispatch(event.of(this, arguments));
    }
    touchtime = now;
  }

  function touchmove() {
    var touches = d3.touches(this),
        p0 = touches[0],
        l0 = translate0[p0.identifier];
    if (p1 = touches[1]) {
      var p1, l1 = translate0[p1.identifier];
      p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      scaleTo(d3.event.scale * scale0);
    }
    translateTo(p0, l0);
    dispatch(event.of(this, arguments));
  }

  return d3.rebind(zoom, event, "on");
};

var d3_behavior_zoomDiv, // for interpreting mousewheel events
    d3_behavior_zoomInfinity = [0, Infinity]; // default scale extent

function d3_behavior_zoomDelta() {

  // mousewheel events are totally broken!
  // https://bugs.webkit.org/show_bug.cgi?id=40441
  // not only that, but Chrome and Safari differ in re. to acceleration!
  if (!d3_behavior_zoomDiv) {
    d3_behavior_zoomDiv = d3.select("body").append("div")
        .style("visibility", "hidden")
        .style("top", 0)
        .style("height", 0)
        .style("width", 0)
        .style("overflow-y", "scroll")
      .append("div")
        .style("height", "2000px")
      .node().parentNode;
  }

  var e = d3.event, delta;
  try {
    d3_behavior_zoomDiv.scrollTop = 1000;
    d3_behavior_zoomDiv.dispatchEvent(e);
    delta = 1000 - d3_behavior_zoomDiv.scrollTop;
  } catch (error) {
    delta = e.wheelDelta || (-e.detail * 5);
  }

  return delta;
}
d3.layout = {};
// Implements hierarchical edge bundling using Holten's algorithm. For each
// input link, a path is computed that travels through the tree, up the parent
// hierarchy to the least common ancestor, and then back down to the destination
// node. Each path is simply an array of nodes.
d3.layout.bundle = function() {
  return function(links) {
    var paths = [],
        i = -1,
        n = links.length;
    while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
    return paths;
  };
};

function d3_layout_bundlePath(link) {
  var start = link.source,
      end = link.target,
      lca = d3_layout_bundleLeastCommonAncestor(start, end),
      points = [start];
  while (start !== lca) {
    start = start.parent;
    points.push(start);
  }
  var k = points.length;
  while (end !== lca) {
    points.splice(k, 0, end);
    end = end.parent;
  }
  return points;
}

function d3_layout_bundleAncestors(node) {
  var ancestors = [],
      parent = node.parent;
  while (parent != null) {
    ancestors.push(node);
    node = parent;
    parent = parent.parent;
  }
  ancestors.push(node);
  return ancestors;
}

function d3_layout_bundleLeastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = d3_layout_bundleAncestors(a),
      bNodes = d3_layout_bundleAncestors(b),
      aNode = aNodes.pop(),
      bNode = bNodes.pop(),
      sharedNode = null;
  while (aNode === bNode) {
    sharedNode = aNode;
    aNode = aNodes.pop();
    bNode = bNodes.pop();
  }
  return sharedNode;
}
d3.layout.chord = function() {
  var chord = {},
      chords,
      groups,
      matrix,
      n,
      padding = 0,
      sortGroups,
      sortSubgroups,
      sortChords;
	  
  	
  function getChord(from, to, json) {
		for(var i in json.chords) {
			if(json.chords[i].source == from && json.chords[i].target == to) {
				return json.chords[i];
			}
		}
		return {"width":0};
	}
	  
  function relayoutJSON(json) {
	var subgroups = {},
        groupSums = [],
        groupIndex = d3.range(n),
        subgroupIndex = [],
        k,
        x,
        x0,
        i,
        j;
		
	chords = [];
	groups = json.slices;
	
	/*k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += getLink(i, j, json).width;
      }
      groupSums.push(x);
      subgroupIndex.push(d3.range(n));
      k += x;
    }*/
	
	// Compute the sum.
    k = 0, i = -1; while (++i < n) {
		x = (groups[i].sent);
      groupSums.push(x);
      subgroupIndex.push(d3.range(n));
      k += x;
    }
	
    // Sort groups…
    if (sortGroups) {
      groupIndex.sort(function(a, b) {
        return sortGroups(groupSums[a], groupSums[b]);
      });
    }

    // Sort subgroups…
    if (sortSubgroups) {
      subgroupIndex.forEach(function(d, i) {
        d.sort(function(a, b) {
          return sortSubgroups(getChord(i, a, json).width, getChord(i, b, json).width);
        });
      });
    }
	
	k = (2 * Math.PI - padding * n) / k;
	
	// Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
	x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
			curr = getChord(di, dj, json)
			v = curr.width,
            //v = matrix[di][dj],
            a0 = x,
            a1 = x += v * k;
		curr.index = di;
		curr.subindex = dj;
		curr.startAngle = a0;
		curr.endAngle = a1;
		curr.value = v;
		subgroups[di + "-" + dj] = curr;
      }
	  groups[di].index = di;
	  groups[di].startAngle = x0;
	  groups[di].endAngle = x;
	  groups[di].value = (x - x0) / k;
      x += padding;
    }
	
	// Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[i + "-" + j],
            target = subgroups[j + "-" + i];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }
  }

  function relayout() {
    var subgroups = {},
        groupSums = [],
        groupIndex = d3.range(n),
        subgroupIndex = [],
        k,
        x,
        x0,
        i,
        j;

    chords = [];
    groups = [];

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(d3.range(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) {
      groupIndex.sort(function(a, b) {
        return sortGroups(groupSums[a], groupSums[b]);
      });
    }

    // Sort subgroups…
    if (sortSubgroups) {
      subgroupIndex.forEach(function(d, i) {
        d.sort(function(a, b) {
          return sortSubgroups(matrix[i][a], matrix[i][b]);
        });
      });
    }

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified.
    // TODO Allow padding to be specified as percentage?
    k = (2 * Math.PI - padding * n) / k;

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj],
            a0 = x,
            a1 = x += v * k;
        subgroups[di + "-" + dj] = {
          index: di,
          subindex: dj,
          startAngle: a0,
          endAngle: a1,
          value: v
        };
      }
      groups[di] = {
        index: di,
        startAngle: x0,
        endAngle: x,
        value: (x - x0) / k
      };
      x += padding;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[i + "-" + j],
            target = subgroups[j + "-" + i];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }

    if (sortChords) resort();
  }

  function resort() {
    chords.sort(function(a, b) {
      return sortChords(
          (a.source.value + a.target.value) / 2,
          (b.source.value + b.target.value) / 2);
    });
  }
  
  chord.json =  function(x) {
	if(!arguments.length) return chords;
	n = x.slices.length;
	chords = groups = null;
	relayoutJSON(x);
	return chord;
  }

  chord.matrix = function(x) {
    if (!arguments.length) return matrix;
    n = (matrix = x) && matrix.length;
    chords = groups = null;
    return chord;
  };

  chord.padding = function(x) {
    if (!arguments.length) return padding;
    padding = x;
    chords = groups = null;
    return chord;
  };

  chord.sortGroups = function(x) {
    if (!arguments.length) return sortGroups;
    sortGroups = x;
    chords = groups = null;
    return chord;
  };

  chord.sortSubgroups = function(x) {
    if (!arguments.length) return sortSubgroups;
    sortSubgroups = x;
    chords = null;
    return chord;
  };

  chord.sortChords = function(x) {
    if (!arguments.length) return sortChords;
    sortChords = x;
    if (chords) resort();
    return chord;
  };

  chord.chords = function() {
    if (!chords) relayout();
    return chords;
  };

  chord.groups = function() {
    if (!groups) relayout();
    return groups;
  };

  return chord;
};










// A rudimentary force layout using Gauss-Seidel.
d3.layout.force = function() {
  var force = {},
      event = d3.dispatch("start", "tick", "end"),
      size = [1, 1],
      drag,
      alpha,
      friction = .9,
      linkDistance = d3_layout_forceLinkDistance,
      linkStrength = d3_layout_forceLinkStrength,
      charge = -30,
      gravity = .1,
      theta = .8,
      interval,
      nodes = [],
      links = [],
      distances,
      strengths,
      charges,
	  gravxy;

  function repulse(node) {
    return function(quad, x1, y1, x2, y2) {
      if (quad.point !== node) {
        var dx = quad.cx - node.x,
            dy = quad.cy - node.y,
            dn = 1 / Math.sqrt(dx * dx + dy * dy);

        /* Barnes-Hut criterion. */
        if ((x2 - x1) * dn < theta) {
          var k = quad.charge * dn * dn;
          node.px -= dx * k;
          node.py -= dy * k;
          return true;
        }

        if (quad.point && isFinite(dn)) {
          var k = quad.pointCharge * dn * dn;
          node.px -= dx * k;
          node.py -= dy * k;
        }
      }
      return !quad.charge;
    };
  }

  force.tick = function() {

    var n = nodes.length,
        m = links.length,
        q,
        i, // current index
        o, // current object
        s, // current source
        t, // current target
        l, // current distance
        k, // current force
        x, // x-distance
        y; // y-distance

    // gauss-seidel relaxation for links
    for (i = 0; i < m; ++i) {
      o = links[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      if (l = (x * x + y * y)) {
        l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
        x *= l;
        y *= l;
        t.x -= x * (k = s.weight / (t.weight + s.weight));
        t.y -= y * k;
        s.x += x * (k = 1 - k);
        s.y += y * k;
      }
    }

    // apply gravity forces
    if (k = alpha * gravity) {
      x = gravxy.gx;
      y = gravxy.gy;
      i = -1; if (k) while (++i < n) {
        o = nodes[i];
        o.x += (x - o.x) * k;
        o.y += (y - o.y) * k;
      }
    }

    // compute quadtree center of mass and apply charge forces
    if (charge) {
      d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
      i = -1; while (++i < n) {
        if (!(o = nodes[i]).fixed) {
          q.visit(repulse(o));
        }
      }
    }

    // position verlet integration
    i = -1; while (++i < n) {
      o = nodes[i];
      if (o.fixed) {
        o.x = o.px;
        o.y = o.py;
      } else {
        o.x -= (o.px - (o.px = o.x)) * friction;
        o.y -= (o.py - (o.py = o.y)) * friction;
      }
    }
	
	
    // simulated annealing, basically
    if ((alpha *= .99) < .005) {
      event.end({type: "end", alpha: alpha = 0});
      return true;
    }

    event.tick({type: "tick", alpha: alpha});
  };
  
  force.gravxy = function(gx, gy){
		if(!arguments.length) return gravxy;
		gravxy = {
			"gx":gx,
			"gy":gy
		};
		return force;
	}

  force.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return force;
  };

  force.links = function(x) {
    if (!arguments.length) return links;
    links = x;
    return force;
  };

  force.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return force;
  };

  force.linkDistance = function(x) {
    if (!arguments.length) return linkDistance;
    linkDistance = d3_functor(x);
    return force;
  };

  // For backwards-compatibility.
  force.distance = force.linkDistance;

  force.linkStrength = function(x) {
    if (!arguments.length) return linkStrength;
    linkStrength = d3_functor(x);
    return force;
  };

  force.friction = function(x) {
    if (!arguments.length) return friction;
    friction = x;
    return force;
  };

  force.charge = function(x) {
    if (!arguments.length) return charge;
    charge = typeof x === "function" ? x : +x;
    return force;
  };

  force.gravity = function(x) {
    if (!arguments.length) return gravity;
    gravity = x;
    return force;
  };

  force.theta = function(x) {
    if (!arguments.length) return theta;
    theta = x;
    return force;
  };

  force.alpha = function(x) {
    if (!arguments.length) return alpha;

    if (alpha) { // if we're already running
      if (x > 0) alpha = x; // we might keep it hot
      else alpha = 0; // or, next tick will dispatch "end"
    } else if (x > 0) { // otherwise, fire it up!
      event.start({type: "start", alpha: alpha = x});
      d3.timer(force.tick);
    }

    return force;
  };

  force.start = function() {
    var i,
        j,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        neighbors,
        o;

    for (i = 0; i < n; ++i) {
      (o = nodes[i]).index = i;
      o.weight = 0;
    }

    distances = [];
    strengths = [];
    for (i = 0; i < m; ++i) {
      o = links[i];
      if (typeof o.source == "number") o.source = nodes[o.source];
      if (typeof o.target == "number") o.target = nodes[o.target];
      distances[i] = linkDistance.call(this, o, i);
      strengths[i] = linkStrength.call(this, o, i);
      ++o.source.weight;
      ++o.target.weight;
    }

    for (i = 0; i < n; ++i) {
      o = nodes[i];
      if (isNaN(o.x)) o.x = position("x", w);
      if (isNaN(o.y)) o.y = position("y", h);
      if (isNaN(o.px)) o.px = o.x;
      if (isNaN(o.py)) o.py = o.y;
    }
	
    charges = [];
    if (typeof charge === "function") {
      for (i = 0; i < n; ++i) {
        charges[i] = +charge.call(this, nodes[i], i);
      }
    } else {
      for (i = 0; i < n; ++i) {
        charges[i] = charge;
      }
    }

    // initialize node position based on first neighbor
    function position(dimension, size) {
      var neighbors = neighbor(i),
          j = -1,
          m = neighbors.length,
          x;
      while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
      return Math.random() * size;
    }

    // initialize neighbors lazily
    function neighbor() {
      if (!neighbors) {
        neighbors = [];
        for (j = 0; j < n; ++j) {
          neighbors[j] = [];
        }
        for (j = 0; j < m; ++j) {
          var o = links[j];
          neighbors[o.source.index].push(o.target);
          neighbors[o.target.index].push(o.source);
        }
      }
      return neighbors[i];
    }

    return force.resume();
  };

  force.resume = function() {
    return force.alpha(.1);
  };

  force.stop = function() {
    return force.alpha(0);
  };

  // use `node.call(force.drag)` to make nodes draggable
  force.drag = function() {
    if (!drag) drag = d3.behavior.drag()
        .origin(d3_identity)
        .on("dragstart", dragstart)
        .on("drag", d3_layout_forceDrag)
        .on("dragend", d3_layout_forceDragEnd);

    this.on("mouseover.force", d3_layout_forceDragOver)
        .on("mouseout.force", d3_layout_forceDragOut)
        .call(drag);
  };

  function dragstart(d) {
    d3_layout_forceDragOver(d3_layout_forceDragNode = d);
    d3_layout_forceDragForce = force;
  }

  return d3.rebind(force, event, "on");
};

var d3_layout_forceDragForce,
    d3_layout_forceDragNode;

function d3_layout_forceDragOver(d) {
  d.fixed |= 2;
}

function d3_layout_forceDragOut(d) {
  if (d !== d3_layout_forceDragNode) d.fixed &= 1;
}

function d3_layout_forceDragEnd() {
  d3_layout_forceDragNode.fixed &= 1;
  d3_layout_forceDragForce = d3_layout_forceDragNode = null;
}

function d3_layout_forceDrag() {
  d3_layout_forceDragNode.px = d3.event.x;
  d3_layout_forceDragNode.py = d3.event.y;
  d3_layout_forceDragForce.resume(); // restart annealing
}

function d3_layout_forceAccumulate(quad, alpha, charges) {
  var cx = 0,
      cy = 0;
  quad.charge = 0;
  if (!quad.leaf) {
    var nodes = quad.nodes,
        n = nodes.length,
        i = -1,
        c;
    while (++i < n) {
      c = nodes[i];
      if (c == null) continue;
      d3_layout_forceAccumulate(c, alpha, charges);
      quad.charge += c.charge;
      cx += c.charge * c.cx;
      cy += c.charge * c.cy;
    }
  }
  if (quad.point) {
    // jitter internal nodes that are coincident
    if (!quad.leaf) {
      quad.point.x += Math.random() - .5;
      quad.point.y += Math.random() - .5;
    }
    var k = alpha * charges[quad.point.index];
    quad.charge += quad.pointCharge = k;
    cx += k * quad.point.x;
    cy += k * quad.point.y;
  }
  quad.cx = cx / quad.charge;
  quad.cy = cy / quad.charge;
}

function d3_layout_forceLinkDistance(link) {
  return 20;
}

function d3_layout_forceLinkStrength(link) {
  return 1;
}
d3.layout.partition = function() {
  var hierarchy = d3.layout.hierarchy(),
      size = [1, 1]; // width, height

  function position(node, x, dx, dy) {
    var children = node.children;
    node.x = x;
    node.y = node.depth * dy;
    node.dx = dx;
    node.dy = dy;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          c,
          d;
      dx = node.value ? dx / node.value : 0;
      while (++i < n) {
        position(c = children[i], x, d = c.value * dx, dy);
        x += d;
      }
    }
  }

  function depth(node) {
    var children = node.children,
        d = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n;
      while (++i < n) d = Math.max(d, depth(children[i]));
    }
    return 1 + d;
  }

  function partition(d, i) {
    var nodes = hierarchy.call(this, d, i);
    position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
    return nodes;
  }

  partition.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return partition;
  };

  return d3_layout_hierarchyRebind(partition, hierarchy);
};





d3.layout.pie = function() {
  var value = Number,
      sort = d3_layout_pieSortByValue,
      startAngle = 0,
      endAngle = 2 * Math.PI;

  function pie(data, i) {

    // Compute the numeric values for each data element.
    var values = data.map(function(d, i) { return +value.call(pie, d, i); });

    // Compute the start angle.
    var a = +(typeof startAngle === "function"
        ? startAngle.apply(this, arguments)
        : startAngle);

    // Compute the angular scale factor: from value to radians.
    var k = ((typeof endAngle === "function"
        ? endAngle.apply(this, arguments)
        : endAngle) - startAngle)
        / d3.sum(values);

    // Optionally sort the data.
    var index = d3.range(data.length);
    if (sort != null) index.sort(sort === d3_layout_pieSortByValue
        ? function(i, j) { return values[j] - values[i]; }
        : function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs!
    // They are stored in the original data's order.
    var arcs = [];
    index.forEach(function(i) {
      var d;
      arcs[i] = {
        data: data[i],
        value: d = values[i],
        startAngle: a,
        endAngle: a += d * k
      };
    });
    return arcs;
  }

  /**
   * Specifies the value function *x*, which returns a nonnegative numeric value
   * for each datum. The default value function is `Number`. The value function
   * is passed two arguments: the current datum and the current index.
   */
  pie.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return pie;
  };

  /**
   * Specifies a sort comparison operator *x*. The comparator is passed two data
   * elements from the data array, a and b; it returns a negative value if a is
   * less than b, a positive value if a is greater than b, and zero if a equals
   * b.
   */
  pie.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return pie;
  };

  /**
   * Specifies the overall start angle of the pie chart. Defaults to 0. The
   * start angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.startAngle = function(x) {
    if (!arguments.length) return startAngle;
    startAngle = x;
    return pie;
  };

  /**
   * Specifies the overall end angle of the pie chart. Defaults to 2p. The
   * end angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.endAngle = function(x) {
    if (!arguments.length) return endAngle;
    endAngle = x;
    return pie;
  };

  return pie;
};

var d3_layout_pieSortByValue = {};
// data is two-dimensional array of x,y; we populate y0
d3.layout.stack = function() {
  var values = d3_identity,
      order = d3_layout_stackOrderDefault,
      offset = d3_layout_stackOffsetZero,
      out = d3_layout_stackOut,
      x = d3_layout_stackX,
      y = d3_layout_stackY;

  function stack(data, index) {

    // Convert series to canonical two-dimensional representation.
    var series = data.map(function(d, i) {
      return values.call(stack, d, i);
    });

    // Convert each series to canonical [[x,y]] representation.
    var points = series.map(function(d, i) {
      return d.map(function(v, i) {
        return [x.call(stack, v, i), y.call(stack, v, i)];
      });
    });

    // Compute the order of series, and permute them.
    var orders = order.call(stack, points, index);
    series = d3.permute(series, orders);
    points = d3.permute(points, orders);

    // Compute the baseline…
    var offsets = offset.call(stack, points, index);

    // And propagate it to other series.
    var n = series.length,
        m = series[0].length,
        i,
        j,
        o;
    for (j = 0; j < m; ++j) {
      out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
      for (i = 1; i < n; ++i) {
        out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
      }
    }

    return data;
  }

  stack.values = function(x) {
    if (!arguments.length) return values;
    values = x;
    return stack;
  };

  stack.order = function(x) {
    if (!arguments.length) return order;
    order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
    return stack;
  };

  stack.offset = function(x) {
    if (!arguments.length) return offset;
    offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
    return stack;
  };

  stack.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return stack;
  };

  stack.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return stack;
  };

  stack.out = function(z) {
    if (!arguments.length) return out;
    out = z;
    return stack;
  };

  return stack;
}

function d3_layout_stackX(d) {
  return d.x;
}

function d3_layout_stackY(d) {
  return d.y;
}

function d3_layout_stackOut(d, y0, y) {
  d.y0 = y0;
  d.y = y;
}

var d3_layout_stackOrders = d3.map({

  "inside-out": function(data) {
    var n = data.length,
        i,
        j,
        max = data.map(d3_layout_stackMaxIndex),
        sums = data.map(d3_layout_stackReduceSum),
        index = d3.range(n).sort(function(a, b) { return max[a] - max[b]; }),
        top = 0,
        bottom = 0,
        tops = [],
        bottoms = [];
    for (i = 0; i < n; ++i) {
      j = index[i];
      if (top < bottom) {
        top += sums[j];
        tops.push(j);
      } else {
        bottom += sums[j];
        bottoms.push(j);
      }
    }
    return bottoms.reverse().concat(tops);
  },

  "reverse": function(data) {
    return d3.range(data.length).reverse();
  },

  "default": d3_layout_stackOrderDefault

});

var d3_layout_stackOffsets = d3.map({

  "silhouette": function(data) {
    var n = data.length,
        m = data[0].length,
        sums = [],
        max = 0,
        i,
        j,
        o,
        y0 = [];
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
      if (o > max) max = o;
      sums.push(o);
    }
    for (j = 0; j < m; ++j) {
      y0[j] = (max - sums[j]) / 2;
    }
    return y0;
  },

  "wiggle": function(data) {
    var n = data.length,
        x = data[0],
        m = x.length,
        max = 0,
        i,
        j,
        k,
        s1,
        s2,
        s3,
        dx,
        o,
        o0,
        y0 = [];
    y0[0] = o = o0 = 0;
    for (j = 1; j < m; ++j) {
      for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
      for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
        for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
          s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
        }
        s2 += s3 * data[i][j][1];
      }
      y0[j] = o -= s1 ? s2 / s1 * dx : 0;
      if (o < o0) o0 = o;
    }
    for (j = 0; j < m; ++j) y0[j] -= o0;
    return y0;
  },

  "expand": function(data) {
    var n = data.length,
        m = data[0].length,
        k = 1 / n,
        i,
        j,
        o,
        y0 = [];
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
      if (o) for (i = 0; i < n; i++) data[i][j][1] /= o;
      else for (i = 0; i < n; i++) data[i][j][1] = k;
    }
    for (j = 0; j < m; ++j) y0[j] = 0;
    return y0;
  },

  "zero": d3_layout_stackOffsetZero

});

function d3_layout_stackOrderDefault(data) {
  return d3.range(data.length);
}

function d3_layout_stackOffsetZero(data) {
  var j = -1,
      m = data[0].length,
      y0 = [];
  while (++j < m) y0[j] = 0;
  return y0;
}

function d3_layout_stackMaxIndex(array) {
  var i = 1,
      j = 0,
      v = array[0][1],
      k,
      n = array.length;
  for (; i < n; ++i) {
    if ((k = array[i][1]) > v) {
      j = i;
      v = k;
    }
  }
  return j;
}

function d3_layout_stackReduceSum(d) {
  return d.reduce(d3_layout_stackSum, 0);
}

function d3_layout_stackSum(p, d) {
  return p + d[1];
}
d3.layout.histogram = function() {
  var frequency = true,
      valuer = Number,
      ranger = d3_layout_histogramRange,
      binner = d3_layout_histogramBinSturges;

  function histogram(data, i) {
    var bins = [],
        values = data.map(valuer, this),
        range = ranger.call(this, values, i),
        thresholds = binner.call(this, range, values, i),
        bin,
        i = -1,
        n = values.length,
        m = thresholds.length - 1,
        k = frequency ? 1 : 1 / n,
        x;

    // Initialize the bins.
    while (++i < m) {
      bin = bins[i] = [];
      bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
      bin.y = 0;
    }

    // Fill the bins, ignoring values outside the range.
    if (m > 0) {
      i = -1; while(++i < n) {
        x = values[i];
        if ((x >= range[0]) && (x <= range[1])) {
          bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
          bin.y += k;
          bin.push(data[i]);
        }
      }
    }

    return bins;
  }

  // Specifies how to extract a value from the associated data. The default
  // value function is `Number`, which is equivalent to the identity function.
  histogram.value = function(x) {
    if (!arguments.length) return valuer;
    valuer = x;
    return histogram;
  };

  // Specifies the range of the histogram. Values outside the specified range
  // will be ignored. The argument `x` may be specified either as a two-element
  // array representing the minimum and maximum value of the range, or as a
  // function that returns the range given the array of values and the current
  // index `i`. The default range is the extent (minimum and maximum) of the
  // values.
  histogram.range = function(x) {
    if (!arguments.length) return ranger;
    ranger = d3_functor(x);
    return histogram;
  };

  // Specifies how to bin values in the histogram. The argument `x` may be
  // specified as a number, in which case the range of values will be split
  // uniformly into the given number of bins. Or, `x` may be an array of
  // threshold values, defining the bins; the specified array must contain the
  // rightmost (upper) value, thus specifying n + 1 values for n bins. Or, `x`
  // may be a function which is evaluated, being passed the range, the array of
  // values, and the current index `i`, returning an array of thresholds. The
  // default bin function will divide the values into uniform bins using
  // Sturges' formula.
  histogram.bins = function(x) {
    if (!arguments.length) return binner;
    binner = typeof x === "number"
        ? function(range) { return d3_layout_histogramBinFixed(range, x); }
        : d3_functor(x);
    return histogram;
  };

  // Specifies whether the histogram's `y` value is a count (frequency) or a
  // probability (density). The default value is true.
  histogram.frequency = function(x) {
    if (!arguments.length) return frequency;
    frequency = !!x;
    return histogram;
  };

  return histogram;
};

function d3_layout_histogramBinSturges(range, values) {
  return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
}

function d3_layout_histogramBinFixed(range, n) {
  var x = -1,
      b = +range[0],
      m = (range[1] - b) / n,
      f = [];
  while (++x <= n) f[x] = m * x + b;
  return f;
}

function d3_layout_histogramRange(values) {
  return [d3.min(values), d3.max(values)];
}
d3.layout.hierarchy = function() {
  var sort = d3_layout_hierarchySort,
      children = d3_layout_hierarchyChildren,
      value = d3_layout_hierarchyValue;

  // Recursively compute the node depth and value.
  // Also converts the data representation into a standard hierarchy structure.
  function recurse(data, depth, nodes) {
    var childs = children.call(hierarchy, data, depth),
        node = d3_layout_hierarchyInline ? data : {data: data};
    node.depth = depth;
    nodes.push(node);
    if (childs && (n = childs.length)) {
      var i = -1,
          n,
          c = node.children = [],
          v = 0,
          j = depth + 1,
          d;
      while (++i < n) {
        d = recurse(childs[i], j, nodes);
        d.parent = node;
        c.push(d);
        v += d.value;
      }
      if (sort) c.sort(sort);
      if (value) node.value = v;
    }
	else if (value && !node.value) {
      node.value = +value.call(hierarchy, data, depth) || 0;
    }
    return node;
  }

  // Recursively re-evaluates the node value.
  function revalue(node, depth) {
    var children = node.children,
        v = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          j = depth + 1;
      while (++i < n) v += revalue(children[i], j);
    } else if (value) {
      v = +value.call(hierarchy, d3_layout_hierarchyInline ? node : node.data, depth) || 0;
    }
    if (value) node.value = v;
    return v;
  }

  function hierarchy(d) {
    var nodes = [];
    recurse(d, 0, nodes);
    return nodes;
  }

  hierarchy.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return hierarchy;
  };

  hierarchy.children = function(x) {
    if (!arguments.length) return children;
    children = x;
    return hierarchy;
  };

  hierarchy.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return hierarchy;
  };

  // Re-evaluates the `value` property for the specified hierarchy.
  hierarchy.revalue = function(root) {
    revalue(root, 0);
    return root;
  };

  return hierarchy;
};

// A method assignment helper for hierarchy subclasses.
function d3_layout_hierarchyRebind(object, hierarchy) {
  d3.rebind(object, hierarchy, "sort", "children", "value");

  // Add an alias for links, for convenience.
  object.links = d3_layout_hierarchyLinks;

  // If the new API is used, enabling inlining.
  object.nodes = function(d) {
    d3_layout_hierarchyInline = true;
    return (object.nodes = object)(d);
  };

  return object;
}

function d3_layout_hierarchyChildren(d) {
  return d.children;
}

function d3_layout_hierarchyValue(d) {
  return d.value;
}

function d3_layout_hierarchySort(a, b) {
  return b.value - a.value;
}

// Returns an array source+target objects for the specified nodes.
function d3_layout_hierarchyLinks(nodes) {
  return d3.merge(nodes.map(function(parent) {
    return (parent.children || []).map(function(child) {
      return {source: parent, target: child};
    });
  }));
}

// For backwards-compatibility, don't enable inlining by default.
var d3_layout_hierarchyInline = false;
d3.layout.pack = function() {
  var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort),
      size = [1, 1];

  function pack(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    // Recursively compute the layout.
    root.x = 0;
    root.y = 0;
    d3_layout_packTree(root);

    // Scale the layout to fit the requested size.
    var w = size[0],
        h = size[1],
        k = 1 / Math.max(2 * root.r / w, 2 * root.r / h);
    d3_layout_packTransform(root, w / 2, h / 2, k);

    return nodes;
  }

  pack.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return pack;
  };

  return d3_layout_hierarchyRebind(pack, hierarchy);
};

function d3_layout_packSort(a, b) {
  return a.value - b.value;
}

function d3_layout_packInsert(a, b) {
  var c = a._pack_next;
  a._pack_next = b;
  b._pack_prev = a;
  b._pack_next = c;
  c._pack_prev = b;
}

function d3_layout_packSplice(a, b) {
  a._pack_next = b;
  b._pack_prev = a;
}

function d3_layout_packIntersects(a, b) {
  var dx = b.x - a.x,
      dy = b.y - a.y,
      dr = a.r + b.r;
  return dr * dr - dx * dx - dy * dy > .001; // within epsilon
}

function d3_layout_packCircle(nodes) {
  var xMin = Infinity,
      xMax = -Infinity,
      yMin = Infinity,
      yMax = -Infinity,
      n = nodes.length,
      a, b, c, j, k;

  function bound(node) {
    xMin = Math.min(node.x - node.r, xMin);
    xMax = Math.max(node.x + node.r, xMax);
    yMin = Math.min(node.y - node.r, yMin);
    yMax = Math.max(node.y + node.r, yMax);
  }

  // Create node links.
  nodes.forEach(d3_layout_packLink);

  // Create first node.
  a = nodes[0];
  a.x = -a.r;
  a.y = 0;
  bound(a);

  // Create second node.
  if (n > 1) {
    b = nodes[1];
    b.x = b.r;
    b.y = 0;
    bound(b);

    // Create third node and build chain.
    if (n > 2) {
      c = nodes[2];
      d3_layout_packPlace(a, b, c);
      bound(c);
      d3_layout_packInsert(a, c);
      a._pack_prev = c;
      d3_layout_packInsert(c, b);
      b = a._pack_next;

      // Now iterate through the rest.
      for (var i = 3; i < n; i++) {
        d3_layout_packPlace(a, b, c = nodes[i]);

        // Search for the closest intersection.
        var isect = 0, s1 = 1, s2 = 1;
        for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
          if (d3_layout_packIntersects(j, c)) {
            isect = 1;
            break;
          }
        }
        if (isect == 1) {
          for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
            if (d3_layout_packIntersects(k, c)) {
              break;
            }
          }
        }

        // Update node chain.
        if (isect) {
          if (s1 < s2 || (s1 == s2 && b.r < a.r)) d3_layout_packSplice(a, b = j);
          else d3_layout_packSplice(a = k, b);
          i--;
        } else {
          d3_layout_packInsert(a, c);
          b = c;
          bound(c);
        }
      }
    }
  }

  // Re-center the circles and return the encompassing radius.
  var cx = (xMin + xMax) / 2,
      cy = (yMin + yMax) / 2,
      cr = 0;
  for (var i = 0; i < n; i++) {
    var node = nodes[i];
    node.x -= cx;
    node.y -= cy;
    cr = Math.max(cr, node.r + Math.sqrt(node.x * node.x + node.y * node.y));
  }

  // Remove node links.
  nodes.forEach(d3_layout_packUnlink);

  return cr;
}

function d3_layout_packLink(node) {
  node._pack_next = node._pack_prev = node;
}

function d3_layout_packUnlink(node) {
  delete node._pack_next;
  delete node._pack_prev;
}

function d3_layout_packTree(node) {
  var children = node.children;
  if (children && children.length) {
    children.forEach(d3_layout_packTree);
    node.r = d3_layout_packCircle(children);
  } else {
    node.r = Math.sqrt(node.value);
  }
}

function d3_layout_packTransform(node, x, y, k) {
  var children = node.children;
  node.x = (x += k * node.x);
  node.y = (y += k * node.y);
  node.r *= k;
  if (children) {
    var i = -1, n = children.length;
    while (++i < n) d3_layout_packTransform(children[i], x, y, k);
  }
}

function d3_layout_packPlace(a, b, c) {
  var db = a.r + c.r,
      dx = b.x - a.x,
      dy = b.y - a.y;
  if (db && (dx || dy)) {
    var da = b.r + c.r,
        dc = Math.sqrt(dx * dx + dy * dy),
        cos = Math.max(-1, Math.min(1, (db * db + dc * dc - da * da) / (2 * db * dc))),
        theta = Math.acos(cos),
        x = cos * (db /= dc),
        y = Math.sin(theta) * db;
    c.x = a.x + x * dx + y * dy;
    c.y = a.y + x * dy - y * dx;
  } else {
    c.x = a.x + db;
    c.y = a.y;
  }
}
// Implements a hierarchical layout using the cluster (or dendrogram)
// algorithm.
d3.layout.cluster = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function cluster(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0],
        previousNode,
        x = 0,
        kx,
        ky;

    // First walk, computing the initial x & y values.
    d3_layout_treeVisitAfter(root, function(node) {
      var children = node.children;
      if (children && children.length) {
        node.x = d3_layout_clusterX(children);
        node.y = d3_layout_clusterY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_clusterLeft(root),
        right = d3_layout_clusterRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
    });

    return nodes;
  }

  cluster.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return cluster;
  };

  cluster.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return cluster;
  };

  return d3_layout_hierarchyRebind(cluster, hierarchy);
};

function d3_layout_clusterY(children) {
  return 1 + d3.max(children, function(child) {
    return child.y;
  });
}

function d3_layout_clusterX(children) {
  return children.reduce(function(x, child) {
    return x + child.x;
  }, 0) / children.length;
}

function d3_layout_clusterLeft(node) {
  var children = node.children;
  return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
}

function d3_layout_clusterRight(node) {
  var children = node.children, n;
  return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
}
// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    function firstWalk(node, previousSibling) {
      var children = node.children,
          layout = node._tree;
      if (children && (n = children.length)) {
        var n,
            firstChild = children[0],
            previousChild,
            ancestor = firstChild,
            child,
            i = -1;
        while (++i < n) {
          child = children[i];
          firstWalk(child, previousChild);
          ancestor = apportion(child, previousChild, ancestor);
          previousChild = child;
        }
        d3_layout_treeShift(node);
        var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          layout.mod = layout.prelim - midpoint;
        } else {
          layout.prelim = midpoint;
        }
      } else {
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
        }
      }
    }

    function secondWalk(node, x) {
      node.x = node._tree.prelim + x;
      var children = node.children;
      if (children && (n = children.length)) {
        var i = -1,
            n;
        x += node._tree.mod;
        while (++i < n) {
          secondWalk(children[i], x);
        }
      }
    }

    function apportion(node, previousSibling, ancestor) {
      if (previousSibling) {
        var vip = node,
            vop = node,
            vim = previousSibling,
            vom = node.parent.children[0],
            sip = vip._tree.mod,
            sop = vop._tree.mod,
            sim = vim._tree.mod,
            som = vom._tree.mod,
            shift;
        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(vom);
          vop = d3_layout_treeRight(vop);
          vop._tree.ancestor = node;
          shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim._tree.mod;
          sip += vip._tree.mod;
          som += vom._tree.mod;
          sop += vop._tree.mod;
        }
        if (vim && !d3_layout_treeRight(vop)) {
          vop._tree.thread = vim;
          vop._tree.mod += sim - sop;
        }
        if (vip && !d3_layout_treeLeft(vom)) {
          vom._tree.thread = vip;
          vom._tree.mod += sip - som;
          ancestor = node;
        }
      }
      return ancestor;
    }

    // Initialize temporary layout variables.
    d3_layout_treeVisitAfter(root, function(node, previousSibling) {
      node._tree = {
        ancestor: node,
        prelim: 0,
        mod: 0,
        change: 0,
        shift: 0,
        number: previousSibling ? previousSibling._tree.number + 1 : 0
      };
    });

    // Compute the layout using Buchheim et al.'s algorithm.
    firstWalk(root);
    secondWalk(root, -root._tree.prelim);

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost),
        right = d3_layout_treeSearch(root, d3_layout_treeRightmost),
        deep = d3_layout_treeSearch(root, d3_layout_treeDeepest),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2,
        y1 = deep.depth || 1;

    // Clear temporary layout variables; transform x and y.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = node.depth / y1 * size[1];
      delete node._tree;
    });

    return nodes;
  }

  tree.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return tree;
  };

  tree.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return tree;
  };

  return d3_layout_hierarchyRebind(tree, hierarchy);
};

function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}

// function d3_layout_treeSeparationRadial(a, b) {
//   return (a.parent == b.parent ? 1 : 2) / a.depth;
// }

function d3_layout_treeLeft(node) {
  var children = node.children;
  return children && children.length ? children[0] : node._tree.thread;
}

function d3_layout_treeRight(node) {
  var children = node.children,
      n;
  return children && (n = children.length) ? children[n - 1] : node._tree.thread;
}

function d3_layout_treeSearch(node, compare) {
  var children = node.children;
  if (children && (n = children.length)) {
    var child,
        n,
        i = -1;
    while (++i < n) {
      if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
        node = child;
      }
    }
  }
  return node;
}

function d3_layout_treeRightmost(a, b) {
  return a.x - b.x;
}

function d3_layout_treeLeftmost(a, b) {
  return b.x - a.x;
}

function d3_layout_treeDeepest(a, b) {
  return a.depth - b.depth;
}

function d3_layout_treeVisitAfter(node, callback) {
  function visit(node, previousSibling) {
    var children = node.children;
    if (children && (n = children.length)) {
      var child,
          previousChild = null,
          i = -1,
          n;
      while (++i < n) {
        child = children[i];
        visit(child, previousChild);
        previousChild = child;
      }
    }
    callback(node, previousSibling);
  }
  visit(node, null);
}

function d3_layout_treeShift(node) {
  var shift = 0,
      change = 0,
      children = node.children,
      i = children.length,
      child;
  while (--i >= 0) {
    child = children[i]._tree;
    child.prelim += shift;
    child.mod += shift;
    shift += child.shift + (change += child.change);
  }
}

function d3_layout_treeMove(ancestor, node, shift) {
  ancestor = ancestor._tree;
  node = node._tree;
  var change = shift / (node.number - ancestor.number);
  ancestor.change += change;
  node.change -= change;
  node.shift += shift;
  node.prelim += shift;
  node.mod += shift;
}

function d3_layout_treeAncestor(vim, node, ancestor) {
  return vim._tree.ancestor.parent == node.parent
      ? vim._tree.ancestor
      : ancestor;
}
// Squarified Treemaps by Mark Bruls, Kees Huizing, and Jarke J. van Wijk
// Modified to support a target aspect ratio by Jeff Heer
d3.layout.treemap = function() {
  var hierarchy = d3.layout.hierarchy(),
      round = Math.round,
      size = [1, 1], // width, height
      padding = null,
      pad = d3_layout_treemapPadNull,
      sticky = false,
      stickies,
      ratio = 0.5 * (1 + Math.sqrt(5)); // golden ratio

  // Compute the area for each child based on value & scale.
  function scale(children, k) {
    var i = -1,
        n = children.length,
        child,
        area;
    while (++i < n) {
      area = (child = children[i]).value * (k < 0 ? 0 : k);
      child.area = isNaN(area) || area <= 0 ? 0 : area;
    }
  }

  // Recursively arranges the specified node's children into squarified rows.
  function squarify(node) {
    var children = node.children;
    if (children && children.length) {
      var rect = pad(node),
          row = [],
          remaining = children.slice(), // copy-on-write
          child,
          best = Infinity, // the best row score so far
          score, // the current row score
          u = Math.min(rect.dx, rect.dy), // initial orientation
          n;
      scale(remaining, rect.dx * rect.dy / node.value);
      row.area = 0;
      while ((n = remaining.length) > 0) {
        row.push(child = remaining[n - 1]);
        row.area += child.area;
        if ((score = worst(row, u)) <= best) { // continue with this orientation
          remaining.pop();
          best = score;
        } else { // abort, and try a different orientation
          row.area -= row.pop().area;
          position(row, u, rect, false);
          u = Math.min(rect.dx, rect.dy);
          row.length = row.area = 0;
          best = Infinity;
        }
      }
      if (row.length) {
        position(row, u, rect, true);
        row.length = row.area = 0;
      }
      children.forEach(squarify);
    }
  }

  // Recursively resizes the specified node's children into existing rows.
  // Preserves the existing layout!
  function stickify(node) {
    var children = node.children;
    if (children && children.length) {
      var rect = pad(node),
          remaining = children.slice(), // copy-on-write
          child,
          row = [];
      scale(remaining, rect.dx * rect.dy / node.value);
      row.area = 0;
      while (child = remaining.pop()) {
        row.push(child);
        row.area += child.area;
        if (child.z != null) {
          position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
          row.length = row.area = 0;
        }
      }
      children.forEach(stickify);
    }
  }

  // Computes the score for the specified row, as the worst aspect ratio.
  function worst(row, u) {
    var s = row.area,
        r,
        rmax = 0,
        rmin = Infinity,
        i = -1,
        n = row.length;
    while (++i < n) {
      if (!(r = row[i].area)) continue;
      if (r < rmin) rmin = r;
      if (r > rmax) rmax = r;
    }
    s *= s;
    u *= u;
    return s
        ? Math.max((u * rmax * ratio) / s, s / (u * rmin * ratio))
        : Infinity;
  }

  // Positions the specified row of nodes. Modifies `rect`.
  function position(row, u, rect, flush) {
    var i = -1,
        n = row.length,
        x = rect.x,
        y = rect.y,
        v = u ? round(row.area / u) : 0,
        o;
    if (u == rect.dx) { // horizontal subdivision
      if (flush || v > rect.dy) v = rect.dy; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dy = v;
        x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
      }
      o.z = true;
      o.dx += rect.x + rect.dx - x; // rounding error
      rect.y += v;
      rect.dy -= v;
    } else { // vertical subdivision
      if (flush || v > rect.dx) v = rect.dx; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dx = v;
        y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
      }
      o.z = false;
      o.dy += rect.y + rect.dy - y; // rounding error
      rect.x += v;
      rect.dx -= v;
    }
  }

  function treemap(d) {
    var nodes = stickies || hierarchy(d),
        root = nodes[0];
    root.x = 0;
    root.y = 0;
    root.dx = size[0];
    root.dy = size[1];
    if (stickies) hierarchy.revalue(root);
    scale([root], root.dx * root.dy / root.value);
    (stickies ? stickify : squarify)(root);
    if (sticky) stickies = nodes;
    return nodes;
  }

  treemap.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return treemap;
  };

  treemap.padding = function(x) {
    if (!arguments.length) return padding;

    function padFunction(node) {
      var p = x.call(treemap, node, node.depth);
      return p == null
          ? d3_layout_treemapPadNull(node)
          : d3_layout_treemapPad(node, typeof p === "number" ? [p, p, p, p] : p);
    }

    function padConstant(node) {
      return d3_layout_treemapPad(node, x);
    }

    var type;
    pad = (padding = x) == null ? d3_layout_treemapPadNull
        : (type = typeof x) === "function" ? padFunction
        : type === "number" ? (x = [x, x, x, x], padConstant)
        : padConstant;
    return treemap;
  };

  treemap.round = function(x) {
    if (!arguments.length) return round != Number;
    round = x ? Math.round : Number;
    return treemap;
  };

  treemap.sticky = function(x) {
    if (!arguments.length) return sticky;
    sticky = x;
    stickies = null;
    return treemap;
  };

  treemap.ratio = function(x) {
    if (!arguments.length) return ratio;
    ratio = x;
    return treemap;
  };

  return d3_layout_hierarchyRebind(treemap, hierarchy);
};

function d3_layout_treemapPadNull(node) {
  return {x: node.x, y: node.y, dx: node.dx, dy: node.dy};
}

function d3_layout_treemapPad(node, padding) {
  var x = node.x + padding[3],
      y = node.y + padding[0],
      dx = node.dx - padding[1] - padding[3],
      dy = node.dy - padding[0] - padding[2];
  if (dx < 0) { x += dx / 2; dx = 0; }
  if (dy < 0) { y += dy / 2; dy = 0; }
  return {x: x, y: y, dx: dx, dy: dy};
}
d3.csv = function(url, callback) {
  d3.text(url, "text/csv", function(text) {
    callback(text && d3.csv.parse(text));
  });
};
d3.csv.parse = function(text) {
  var header;
  return d3.csv.parseRows(text, function(row, i) {
    if (i) {
      var o = {}, j = -1, m = header.length;
      while (++j < m) o[header[j]] = row[j];
      return o;
    } else {
      header = row;
      return null;
    }
  });
};

d3.csv.parseRows = function(text, f) {
  var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      re = /\r\n|[,\r\n]/g, // field separator regex
      n = 0, // the current line number
      t, // the current token
      eol; // is the current token followed by EOL?

  re.lastIndex = 0; // work-around bug in FF 3.6

  /** @private Returns the next token. */
  function token() {
    if (re.lastIndex >= text.length) return EOF; // special case: end of file
    if (eol) { eol = false; return EOL; } // special case: end of line

    // special case: quotes
    var j = re.lastIndex;
    if (text.charCodeAt(j) === 34) {
      var i = j;
      while (i++ < text.length) {
        if (text.charCodeAt(i) === 34) {
          if (text.charCodeAt(i + 1) !== 34) break;
          i++;
        }
      }
      re.lastIndex = i + 2;
      var c = text.charCodeAt(i + 1);
      if (c === 13) {
        eol = true;
        if (text.charCodeAt(i + 2) === 10) re.lastIndex++;
      } else if (c === 10) {
        eol = true;
      }
      return text.substring(j + 1, i).replace(/""/g, "\"");
    }

    // common case
    var m = re.exec(text);
    if (m) {
      eol = m[0].charCodeAt(0) !== 44;
      return text.substring(j, m.index);
    }
    re.lastIndex = text.length;
    return text.substring(j);
  }

  while ((t = token()) !== EOF) {
    var a = [];
    while ((t !== EOL) && (t !== EOF)) {
      a.push(t);
      t = token();
    }
    if (f && !(a = f(a, n++))) continue;
    rows.push(a);
  }

  return rows;
};
d3.csv.format = function(rows) {
  return rows.map(d3_csv_formatRow).join("\n");
};

function d3_csv_formatRow(row) {
  return row.map(d3_csv_formatValue).join(",");
}

function d3_csv_formatValue(text) {
  return /[",\n]/.test(text)
      ? "\"" + text.replace(/\"/g, "\"\"") + "\""
      : text;
}
d3.geo = {};

var d3_geo_radians = Math.PI / 180;
// TODO clip input coordinates on opposite hemisphere
d3.geo.azimuthal = function() {
  var mode = "orthographic", // or stereographic, gnomonic, equidistant or equalarea
      origin,
      scale = 200,
      translate = [480, 250],
      x0,
      y0,
      cy0,
      sy0;

  function azimuthal(coordinates) {
    var x1 = coordinates[0] * d3_geo_radians - x0,
        y1 = coordinates[1] * d3_geo_radians,
        cx1 = Math.cos(x1),
        sx1 = Math.sin(x1),
        cy1 = Math.cos(y1),
        sy1 = Math.sin(y1),
        cc = mode !== "orthographic" ? sy0 * sy1 + cy0 * cy1 * cx1 : null,
        c,
        k = mode === "stereographic" ? 1 / (1 + cc)
          : mode === "gnomonic" ? 1 / cc
          : mode === "equidistant" ? (c = Math.acos(cc), c ? c / Math.sin(c) : 0)
          : mode === "equalarea" ? Math.sqrt(2 / (1 + cc))
          : 1,
        x = k * cy1 * sx1,
        y = k * (sy0 * cy1 * cx1 - cy0 * sy1);
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  azimuthal.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale,
        p = Math.sqrt(x * x + y * y),
        c = mode === "stereographic" ? 2 * Math.atan(p)
          : mode === "gnomonic" ? Math.atan(p)
          : mode === "equidistant" ? p
          : mode === "equalarea" ? 2 * Math.asin(.5 * p)
          : Math.asin(p),
        sc = Math.sin(c),
        cc = Math.cos(c);
    return [
      (x0 + Math.atan2(x * sc, p * cy0 * cc + y * sy0 * sc)) / d3_geo_radians,
      Math.asin(cc * sy0 - (p ? (y * sc * cy0) / p : 0)) / d3_geo_radians
    ];
  };

  azimuthal.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x + "";
    return azimuthal;
  };

  azimuthal.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    x0 = origin[0] * d3_geo_radians;
    y0 = origin[1] * d3_geo_radians;
    cy0 = Math.cos(y0);
    sy0 = Math.sin(y0);
    return azimuthal;
  };

  azimuthal.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return azimuthal;
  };

  azimuthal.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return azimuthal;
  };

  return azimuthal.origin([0, 0]);
};
// Derived from Tom Carden's Albers implementation for Protovis.
// http://gist.github.com/476238
// http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html

d3.geo.albers = function() {
  var origin = [-98, 38],
      parallels = [29.5, 45.5],
      scale = 1000,
      translate = [480, 250],
      lng0, // d3_geo_radians * origin[0]
      n,
      C,
      p0;

  function albers(coordinates) {
    var t = n * (d3_geo_radians * coordinates[0] - lng0),
        p = Math.sqrt(C - 2 * n * Math.sin(d3_geo_radians * coordinates[1])) / n;
    return [
      scale * p * Math.sin(t) + translate[0],
      scale * (p * Math.cos(t) - p0) + translate[1]
    ];
  }

  albers.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale,
        p0y = p0 + y,
        t = Math.atan2(x, p0y),
        p = Math.sqrt(x * x + p0y * p0y);
    return [
      (lng0 + t / n) / d3_geo_radians,
      Math.asin((C - p * p * n * n) / (2 * n)) / d3_geo_radians
    ];
  };

  function reload() {
    var phi1 = d3_geo_radians * parallels[0],
        phi2 = d3_geo_radians * parallels[1],
        lat0 = d3_geo_radians * origin[1],
        s = Math.sin(phi1),
        c = Math.cos(phi1);
    lng0 = d3_geo_radians * origin[0];
    n = .5 * (s + Math.sin(phi2));
    C = c * c + 2 * n * s;
    p0 = Math.sqrt(C - 2 * n * Math.sin(lat0)) / n;
    return albers;
  }

  albers.origin = function(x) {
    if (!arguments.length) return origin;
    origin = [+x[0], +x[1]];
    return reload();
  };

  albers.parallels = function(x) {
    if (!arguments.length) return parallels;
    parallels = [+x[0], +x[1]];
    return reload();
  };

  albers.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return albers;
  };

  albers.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return albers;
  };

  return reload();
};

// A composite projection for the United States, 960x500. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
// TODO allow the composite projection to be rescaled?
d3.geo.albersUsa = function() {
  var lower48 = d3.geo.albers();

  var alaska = d3.geo.albers()
      .origin([-160, 60])
      .parallels([55, 65]);

  var hawaii = d3.geo.albers()
      .origin([-160, 20])
      .parallels([8, 18]);

  var puertoRico = d3.geo.albers()
      .origin([-60, 10])
      .parallels([8, 18]);

  function albersUsa(coordinates) {
    var lon = coordinates[0],
        lat = coordinates[1];
    return (lat > 50 ? alaska
        : lon < -140 ? hawaii
        : lat < 21 ? puertoRico
        : lower48)(coordinates);
  }

  albersUsa.scale = function(x) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(x);
    alaska.scale(x * .6);
    hawaii.scale(x);
    puertoRico.scale(x * 1.5);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(x) {
    if (!arguments.length) return lower48.translate();
    var dz = lower48.scale() / 1000,
        dx = x[0],
        dy = x[1];
    lower48.translate(x);
    alaska.translate([dx - 400 * dz, dy + 170 * dz]);
    hawaii.translate([dx - 190 * dz, dy + 200 * dz]);
    puertoRico.translate([dx + 580 * dz, dy + 430 * dz]);
    return albersUsa;
  };

  return albersUsa.scale(lower48.scale());
};
d3.geo.bonne = function() {
  var scale = 200,
      translate = [480, 250],
      x0, // origin longitude in radians
      y0, // origin latitude in radians
      y1, // parallel latitude in radians
      c1; // cot(y1)

  function bonne(coordinates) {
    var x = coordinates[0] * d3_geo_radians - x0,
        y = coordinates[1] * d3_geo_radians - y0;
    if (y1) {
      var p = c1 + y1 - y, E = x * Math.cos(y) / p;
      x = p * Math.sin(E);
      y = p * Math.cos(E) - c1;
    } else {
      x *= Math.cos(y);
      y *= -1;
    }
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  bonne.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    if (y1) {
      var c = c1 + y, p = Math.sqrt(x * x + c * c);
      y = c1 + y1 - p;
      x = x0 + p * Math.atan2(x, c) / Math.cos(y);
    } else {
      y *= -1;
      x /= Math.cos(y);
    }
    return [
      x / d3_geo_radians,
      y / d3_geo_radians
    ];
  };

  // 90° for Werner, 0° for Sinusoidal
  bonne.parallel = function(x) {
    if (!arguments.length) return y1 / d3_geo_radians;
    c1 = 1 / Math.tan(y1 = x * d3_geo_radians);
    return bonne;
  };

  bonne.origin = function(x) {
    if (!arguments.length) return [x0 / d3_geo_radians, y0 / d3_geo_radians];
    x0 = x[0] * d3_geo_radians;
    y0 = x[1] * d3_geo_radians;
    return bonne;
  };

  bonne.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return bonne;
  };

  bonne.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return bonne;
  };

  return bonne.origin([0, 0]).parallel(45);
};
d3.geo.equirectangular = function() {
  var scale = 500,
      translate = [480, 250];

  function equirectangular(coordinates) {
    var x = coordinates[0] / 360,
        y = -coordinates[1] / 360;
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  equirectangular.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    return [
      360 * x,
      -360 * y
    ];
  };

  equirectangular.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return equirectangular;
  };

  equirectangular.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return equirectangular;
  };

  return equirectangular;
};
d3.geo.mercator = function() {
  var scale = 500,
      translate = [480, 250];

  function mercator(coordinates) {
    var x = coordinates[0] / 360,
        y = -(Math.log(Math.tan(Math.PI / 4 + coordinates[1] * d3_geo_radians / 2)) / d3_geo_radians) / 360;
    return [
      scale * x + translate[0],
      scale * Math.max(-.5, Math.min(.5, y)) + translate[1]
    ];
  }

  mercator.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    return [
      360 * x,
      2 * Math.atan(Math.exp(-360 * y * d3_geo_radians)) / d3_geo_radians - 90
    ];
  };

  mercator.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return mercator;
  };

  mercator.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return mercator;
  };

  return mercator;
};
function d3_geo_type(types, defaultValue) {
  return function(object) {
    return object && types.hasOwnProperty(object.type) ? types[object.type](object) : defaultValue;
  };
}
/**
 * Returns a function that, given a GeoJSON object (e.g., a feature), returns
 * the corresponding SVG path. The function can be customized by overriding the
 * projection. Point features are mapped to circles with a default radius of
 * 4.5px; the radius can be specified either as a constant or a function that
 * is evaluated per object.
 */
d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_path_circle(pointRadius),
      projection = d3.geo.albersUsa();

  function path(d, i) {
    if (typeof pointRadius === "function") {
      pointCircle = d3_path_circle(pointRadius.apply(this, arguments));
    }
    return pathType(d) || null;
  }

  function project(coordinates) {
    return projection(coordinates).join(",");
  }

  var pathType = d3_geo_type({

    FeatureCollection: function(o) {
      var path = [],
          features = o.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) path.push(pathType(features[i].geometry));
      return path.join("");
    },

    Feature: function(o) {
      return pathType(o.geometry);
    },

    Point: function(o) {
      return "M" + project(o.coordinates) + pointCircle;
    },

    MultiPoint: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) path.push("M", project(coordinates[i]), pointCircle);
      return path.join("");
    },

    LineString: function(o) {
      var path = ["M"],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) path.push(project(coordinates[i]), "L");
      path.pop();
      return path.join("");
    },

    MultiLineString: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        path.push("M");
        while (++j < m) path.push(project(subcoordinates[j]), "L");
        path.pop();
      }
      return path.join("");
    },

    Polygon: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        if ((m = subcoordinates.length - 1) > 0) {
          path.push("M");
          while (++j < m) path.push(project(subcoordinates[j]), "L");
          path[path.length - 1] = "Z";
        }
      }
      return path.join("");
    },

    MultiPolygon: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates index
          m, // subcoordinates.length
          subsubcoordinates, // subcoordinates[j]
          k, // subsubcoordinates index
          p; // subsubcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        while (++j < m) {
          subsubcoordinates = subcoordinates[j];
          k = -1;
          if ((p = subsubcoordinates.length - 1) > 0) {
            path.push("M");
            while (++k < p) path.push(project(subsubcoordinates[k]), "L");
            path[path.length - 1] = "Z";
          }
        }
      }
      return path.join("");
    },

    GeometryCollection: function(o) {
      var path = [],
          geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) path.push(pathType(geometries[i]));
      return path.join("");
    }

  });

  var areaType = path.area = d3_geo_type({

    FeatureCollection: function(o) {
      var area = 0,
          features = o.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) area += areaType(features[i]);
      return area;
    },

    Feature: function(o) {
      return areaType(o.geometry);
    },

    Polygon: function(o) {
      return polygonArea(o.coordinates);
    },

    MultiPolygon: function(o) {
      var sum = 0,
          coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length;
      while (++i < n) sum += polygonArea(coordinates[i]);
      return sum;
    },

    GeometryCollection: function(o) {
      var sum = 0,
          geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) sum += areaType(geometries[i]);
      return sum;
    }

  }, 0);

  function polygonArea(coordinates) {
    var sum = area(coordinates[0]), // exterior ring
        i = 0, // coordinates.index
        n = coordinates.length;
    while (++i < n) sum -= area(coordinates[i]); // holes
    return sum;
  }

  function polygonCentroid(coordinates) {
    var polygon = d3.geom.polygon(coordinates[0].map(projection)), // exterior ring
        area = polygon.area(),
        centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1),
        x = centroid[0],
        y = centroid[1],
        z = area,
        i = 0, // coordinates index
        n = coordinates.length;
    while (++i < n) {
      polygon = d3.geom.polygon(coordinates[i].map(projection)); // holes
      area = polygon.area();
      centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1);
      x -= centroid[0];
      y -= centroid[1];
      z -= area;
    }
    return [x, y, 6 * z]; // weighted centroid
  }

  var centroidType = path.centroid = d3_geo_type({

    // TODO FeatureCollection
    // TODO Point
    // TODO MultiPoint
    // TODO LineString
    // TODO MultiLineString
    // TODO GeometryCollection

    Feature: function(o) {
      return centroidType(o.geometry);
    },

    Polygon: function(o) {
      var centroid = polygonCentroid(o.coordinates);
      return [centroid[0] / centroid[2], centroid[1] / centroid[2]];
    },

    MultiPolygon: function(o) {
      var area = 0,
          coordinates = o.coordinates,
          centroid,
          x = 0,
          y = 0,
          z = 0,
          i = -1, // coordinates index
          n = coordinates.length;
      while (++i < n) {
        centroid = polygonCentroid(coordinates[i]);
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
      return [x / z, y / z];
    }

  });

  function area(coordinates) {
    return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  }

  path.projection = function(x) {
    projection = x;
    return path;
  };

  path.pointRadius = function(x) {
    if (typeof x === "function") pointRadius = x;
    else {
      pointRadius = +x;
      pointCircle = d3_path_circle(pointRadius);
    }
    return path;
  };

  return path;
};

function d3_path_circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}
/**
 * Given a GeoJSON object, returns the corresponding bounding box. The bounding
 * box is represented by a two-dimensional array: [[left, bottom], [right,
 * top]], where left is the minimum longitude, bottom is the minimum latitude,
 * right is maximum longitude, and top is the maximum latitude.
 */
d3.geo.bounds = function(feature) {
  var left = Infinity,
      bottom = Infinity,
      right = -Infinity,
      top = -Infinity;
  d3_geo_bounds(feature, function(x, y) {
    if (x < left) left = x;
    if (x > right) right = x;
    if (y < bottom) bottom = y;
    if (y > top) top = y;
  });
  return [[left, bottom], [right, top]];
};

function d3_geo_bounds(o, f) {
  if (d3_geo_boundsTypes.hasOwnProperty(o.type)) d3_geo_boundsTypes[o.type](o, f);
}

var d3_geo_boundsTypes = {
  Feature: d3_geo_boundsFeature,
  FeatureCollection: d3_geo_boundsFeatureCollection,
  GeometryCollection: d3_geo_boundsGeometryCollection,
  LineString: d3_geo_boundsLineString,
  MultiLineString: d3_geo_boundsMultiLineString,
  MultiPoint: d3_geo_boundsLineString,
  MultiPolygon: d3_geo_boundsMultiPolygon,
  Point: d3_geo_boundsPoint,
  Polygon: d3_geo_boundsPolygon
};

function d3_geo_boundsFeature(o, f) {
  d3_geo_bounds(o.geometry, f);
}

function d3_geo_boundsFeatureCollection(o, f) {
  for (var a = o.features, i = 0, n = a.length; i < n; i++) {
    d3_geo_bounds(a[i].geometry, f);
  }
}

function d3_geo_boundsGeometryCollection(o, f) {
  for (var a = o.geometries, i = 0, n = a.length; i < n; i++) {
    d3_geo_bounds(a[i], f);
  }
}

function d3_geo_boundsLineString(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    f.apply(null, a[i]);
  }
}

function d3_geo_boundsMultiLineString(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    for (var b = a[i], j = 0, m = b.length; j < m; j++) {
      f.apply(null, b[j]);
    }
  }
}

function d3_geo_boundsMultiPolygon(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    for (var b = a[i][0], j = 0, m = b.length; j < m; j++) {
      f.apply(null, b[j]);
    }
  }
}

function d3_geo_boundsPoint(o, f) {
  f.apply(null, o.coordinates);
}

function d3_geo_boundsPolygon(o, f) {
  for (var a = o.coordinates[0], i = 0, n = a.length; i < n; i++) {
    f.apply(null, a[i]);
  }
}
// TODO breakAtDateLine?

d3.geo.circle = function() {
  var origin = [0, 0],
      degrees = 90 - 1e-2,
      radians = degrees * d3_geo_radians,
      arc = d3.geo.greatArc().target(d3_identity);

  function circle() {
    // TODO render a circle as a Polygon
  }

  function visible(point) {
    return arc.distance(point) < radians;
  }

  circle.clip = function(d) {
    arc.source(typeof origin === "function" ? origin.apply(this, arguments) : origin);
    return clipType(d);
  };

  var clipType = d3_geo_type({

    FeatureCollection: function(o) {
      var features = o.features.map(clipType).filter(d3_identity);
      return features && (o = Object.create(o), o.features = features, o);
    },

    Feature: function(o) {
      var geometry = clipType(o.geometry);
      return geometry && (o = Object.create(o), o.geometry = geometry, o);
    },

    Point: function(o) {
      return visible(o.coordinates) && o;
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates.filter(visible);
      return coordinates.length && {
        type: o.type,
        coordinates: coordinates
      };
    },

    LineString: function(o) {
      var coordinates = clip(o.coordinates);
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    MultiLineString: function(o) {
      var coordinates = o.coordinates.map(clip).filter(function(d) { return d.length; });
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    Polygon: function(o) {
      var coordinates = o.coordinates.map(clip);
      return coordinates[0].length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    MultiPolygon: function(o) {
      var coordinates = o.coordinates.map(function(d) { return d.map(clip); }).filter(function(d) { return d[0].length; });
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries.map(clipType).filter(d3_identity);
      return geometries.length && (o = Object.create(o), o.geometries = geometries, o);
    }

  });

  function clip(coordinates) {
    var i = -1,
        n = coordinates.length,
        clipped = [],
        p0,
        p1,
        p2,
        d0,
        d1;

    while (++i < n) {
      d1 = arc.distance(p2 = coordinates[i]);
      if (d1 < radians) {
        if (p1) clipped.push(d3_geo_greatArcInterpolate(p1, p2)((d0 - radians) / (d0 - d1)));
        clipped.push(p2);
        p0 = p1 = null;
      } else {
        p1 = p2;
        if (!p0 && clipped.length) {
          clipped.push(d3_geo_greatArcInterpolate(clipped[clipped.length - 1], p1)((radians - d0) / (d1 - d0)));
          p0 = p1;
        }
      }
      d0 = d1;
    }

    if (p1 && clipped.length) {
      d1 = arc.distance(p2 = clipped[0]);
      clipped.push(d3_geo_greatArcInterpolate(p1, p2)((d0 - radians) / (d0 - d1)));
    }

    return resample(clipped);
  }

  // Resample coordinates, creating great arcs between each.
  function resample(coordinates) {
    var i = 0,
        n = coordinates.length,
        j,
        m,
        resampled = n ? [coordinates[0]] : coordinates,
        resamples,
        origin = arc.source();

    while (++i < n) {
      resamples = arc.source(coordinates[i - 1])(coordinates[i]).coordinates;
      for (j = 0, m = resamples.length; ++j < m;) resampled.push(resamples[j]);
    }

    arc.source(origin);
    return resampled;
  }

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return degrees;
    radians = (degrees = +x) * d3_geo_radians;
    return circle;
  };

  // Precision is specified in degrees.
  circle.precision = function(x) {
    if (!arguments.length) return arc.precision();
    arc.precision(x);
    return circle;
  };

  return circle;
}
d3.geo.greatArc = function() {
  var source = d3_geo_greatArcSource,
      target = d3_geo_greatArcTarget,
      precision = 6 * d3_geo_radians;

  function greatArc() {
    var a = typeof source === "function" ? source.apply(this, arguments) : source,
        b = typeof target === "function" ? target.apply(this, arguments) : target,
        i = d3_geo_greatArcInterpolate(a, b),
        dt = precision / i.d,
        t = 0,
        coordinates = [a];
    while ((t += dt) < 1) coordinates.push(i(t));
    coordinates.push(b);
    return {
      type: "LineString",
      coordinates: coordinates
    };
  }

  // Length returned in radians; multiply by radius for distance.
  greatArc.distance = function() {
    var a = typeof source === "function" ? source.apply(this, arguments) : source,
        b = typeof target === "function" ? target.apply(this, arguments) : target;
     return d3_geo_greatArcInterpolate(a, b).d;
  };

  greatArc.source = function(x) {
    if (!arguments.length) return source;
    source = x;
    return greatArc;
  };

  greatArc.target = function(x) {
    if (!arguments.length) return target;
    target = x;
    return greatArc;
  };

  // Precision is specified in degrees.
  greatArc.precision = function(x) {
    if (!arguments.length) return precision / d3_geo_radians;
    precision = x * d3_geo_radians;
    return greatArc;
  };

  return greatArc;
};

function d3_geo_greatArcSource(d) {
  return d.source;
}

function d3_geo_greatArcTarget(d) {
  return d.target;
}

function d3_geo_greatArcInterpolate(a, b) {
  var x0 = a[0] * d3_geo_radians, cx0 = Math.cos(x0), sx0 = Math.sin(x0),
      y0 = a[1] * d3_geo_radians, cy0 = Math.cos(y0), sy0 = Math.sin(y0),
      x1 = b[0] * d3_geo_radians, cx1 = Math.cos(x1), sx1 = Math.sin(x1),
      y1 = b[1] * d3_geo_radians, cy1 = Math.cos(y1), sy1 = Math.sin(y1),
      d = interpolate.d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))),
      sd = Math.sin(d);

  // From http://williams.best.vwh.net/avform.htm#Intermediate
  function interpolate(t) {
    var A = Math.sin(d - (t *= d)) / sd,
        B = Math.sin(t) / sd,
        x = A * cy0 * cx0 + B * cy1 * cx1,
        y = A * cy0 * sx0 + B * cy1 * sx1,
        z = A * sy0       + B * sy1;
    return [
      Math.atan2(y, x) / d3_geo_radians,
      Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_geo_radians
    ];
  }

  return interpolate;
}
d3.geo.greatCircle = d3.geo.circle;
d3.geom = {};
/**
 * Computes a contour for a given input grid function using the <a
 * href="http://en.wikipedia.org/wiki/Marching_squares">marching
 * squares</a> algorithm. Returns the contour polygon as an array of points.
 *
 * @param grid a two-input function(x, y) that returns true for values
 * inside the contour and false for values outside the contour.
 * @param start an optional starting point [x, y] on the grid.
 * @returns polygon [[x1, y1], [x2, y2], …]
 */
d3.geom.contour = function(grid, start) {
  var s = start || d3_geom_contourStart(grid), // starting point
      c = [],    // contour polygon
      x = s[0],  // current x position
      y = s[1],  // current y position
      dx = 0,    // next x direction
      dy = 0,    // next y direction
      pdx = NaN, // previous x direction
      pdy = NaN, // previous y direction
      i = 0;

  do {
    // determine marching squares index
    i = 0;
    if (grid(x-1, y-1)) i += 1;
    if (grid(x,   y-1)) i += 2;
    if (grid(x-1, y  )) i += 4;
    if (grid(x,   y  )) i += 8;

    // determine next direction
    if (i === 6) {
      dx = pdy === -1 ? -1 : 1;
      dy = 0;
    } else if (i === 9) {
      dx = 0;
      dy = pdx === 1 ? -1 : 1;
    } else {
      dx = d3_geom_contourDx[i];
      dy = d3_geom_contourDy[i];
    }

    // update contour polygon
    if (dx != pdx && dy != pdy) {
      c.push([x, y]);
      pdx = dx;
      pdy = dy;
    }

    x += dx;
    y += dy;
  } while (s[0] != x || s[1] != y);

  return c;
};

// lookup tables for marching directions
var d3_geom_contourDx = [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN],
    d3_geom_contourDy = [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN];

function d3_geom_contourStart(grid) {
  var x = 0,
      y = 0;

  // search for a starting point; begin at origin
  // and proceed along outward-expanding diagonals
  while (true) {
    if (grid(x,y)) {
      return [x,y];
    }
    if (x === 0) {
      x = y + 1;
      y = 0;
    } else {
      x = x - 1;
      y = y + 1;
    }
  }
}
/**
 * Computes the 2D convex hull of a set of points using Graham's scanning
 * algorithm. The algorithm has been implemented as described in Cormen,
 * Leiserson, and Rivest's Introduction to Algorithms. The running time of
 * this algorithm is O(n log n), where n is the number of input points.
 *
 * @param vertices [[x1, y1], [x2, y2], …]
 * @returns polygon [[x1, y1], [x2, y2], …]
 */
d3.geom.hull = function(vertices) {
  if (vertices.length < 3) return [];

  var len = vertices.length,
      plen = len - 1,
      points = [],
      stack = [],
      i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;

  // find the starting ref point: leftmost point with the minimum y coord
  for (i=1; i<len; ++i) {
    if (vertices[i][1] < vertices[h][1]) {
      h = i;
    } else if (vertices[i][1] == vertices[h][1]) {
      h = (vertices[i][0] < vertices[h][0] ? i : h);
    }
  }

  // calculate polar angles from ref point and sort
  for (i=0; i<len; ++i) {
    if (i === h) continue;
    y1 = vertices[i][1] - vertices[h][1];
    x1 = vertices[i][0] - vertices[h][0];
    points.push({angle: Math.atan2(y1, x1), index: i});
  }
  points.sort(function(a, b) { return a.angle - b.angle; });

  // toss out duplicate angles
  a = points[0].angle;
  v = points[0].index;
  u = 0;
  for (i=1; i<plen; ++i) {
    j = points[i].index;
    if (a == points[i].angle) {
      // keep angle for point most distant from the reference
      x1 = vertices[v][0] - vertices[h][0];
      y1 = vertices[v][1] - vertices[h][1];
      x2 = vertices[j][0] - vertices[h][0];
      y2 = vertices[j][1] - vertices[h][1];
      if ((x1*x1 + y1*y1) >= (x2*x2 + y2*y2)) {
        points[i].index = -1;
      } else {
        points[u].index = -1;
        a = points[i].angle;
        u = i;
        v = j;
      }
    } else {
      a = points[i].angle;
      u = i;
      v = j;
    }
  }

  // initialize the stack
  stack.push(h);
  for (i=0, j=0; i<2; ++j) {
    if (points[j].index !== -1) {
      stack.push(points[j].index);
      i++;
    }
  }
  sp = stack.length;

  // do graham's scan
  for (; j<plen; ++j) {
    if (points[j].index === -1) continue; // skip tossed out points
    while (!d3_geom_hullCCW(stack[sp-2], stack[sp-1], points[j].index, vertices)) {
      --sp;
    }
    stack[sp++] = points[j].index;
  }

  // construct the hull
  var poly = [];
  for (i=0; i<sp; ++i) {
    poly.push(vertices[stack[i]]);
  }
  return poly;
}

// are three points in counter-clockwise order?
function d3_geom_hullCCW(i1, i2, i3, v) {
  var t, a, b, c, d, e, f;
  t = v[i1]; a = t[0]; b = t[1];
  t = v[i2]; c = t[0]; d = t[1];
  t = v[i3]; e = t[0]; f = t[1];
  return ((f-b)*(c-a) - (d-b)*(e-a)) > 0;
}
// Note: requires coordinates to be counterclockwise and convex!
d3.geom.polygon = function(coordinates) {

  coordinates.area = function() {
    var i = 0,
        n = coordinates.length,
        a = coordinates[n - 1][0] * coordinates[0][1],
        b = coordinates[n - 1][1] * coordinates[0][0];
    while (++i < n) {
      a += coordinates[i - 1][0] * coordinates[i][1];
      b += coordinates[i - 1][1] * coordinates[i][0];
    }
    return (b - a) * .5;
  };

  coordinates.centroid = function(k) {
    var i = -1,
        n = coordinates.length,
        x = 0,
        y = 0,
        a,
        b = coordinates[n - 1],
        c;
    if (!arguments.length) k = -1 / (6 * coordinates.area());
    while (++i < n) {
      a = b;
      b = coordinates[i];
      c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }
    return [x * k, y * k];
  };

  // The Sutherland-Hodgman clipping algorithm.
  coordinates.clip = function(subject) {
    var input,
        i = -1,
        n = coordinates.length,
        j,
        m,
        a = coordinates[n - 1],
        b,
        c,
        d;
    while (++i < n) {
      input = subject.slice();
      subject.length = 0;
      b = coordinates[i];
      c = input[(m = input.length) - 1];
      j = -1;
      while (++j < m) {
        d = input[j];
        if (d3_geom_polygonInside(d, a, b)) {
          if (!d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          subject.push(d);
        } else if (d3_geom_polygonInside(c, a, b)) {
          subject.push(d3_geom_polygonIntersect(c, d, a, b));
        }
        c = d;
      }
      a = b;
    }
    return subject;
  };

  return coordinates;
};

function d3_geom_polygonInside(p, a, b) {
  return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
}

// Intersect two infinite lines cd and ab.
function d3_geom_polygonIntersect(c, d, a, b) {
  var x1 = c[0], x2 = d[0], x3 = a[0], x4 = b[0],
      y1 = c[1], y2 = d[1], y3 = a[1], y4 = b[1],
      x13 = x1 - x3,
      x21 = x2 - x1,
      x43 = x4 - x3,
      y13 = y1 - y3,
      y21 = y2 - y1,
      y43 = y4 - y3,
      ua = (x43 * y13 - y43 * x13) / (y43 * x21 - x43 * y21);
  return [x1 + ua * x21, y1 + ua * y21];
}
// Adapted from Nicolas Garcia Belmonte's JIT implementation:
// http://blog.thejit.org/2010/02/12/voronoi-tessellation/
// http://blog.thejit.org/assets/voronoijs/voronoi.js
// See lib/jit/LICENSE for details.

// Notes:
//
// This implementation does not clip the returned polygons, so if you want to
// clip them to a particular shape you will need to do that either in SVG or by
// post-processing with d3.geom.polygon's clip method.
//
// If any vertices are coincident or have NaN positions, the behavior of this
// method is undefined. Most likely invalid polygons will be returned. You
// should filter invalid points, and consolidate coincident points, before
// computing the tessellation.

/**
 * @param vertices [[x1, y1], [x2, y2], …]
 * @returns polygons [[[x1, y1], [x2, y2], …], …]
 */
d3.geom.voronoi = function(vertices) {
  var polygons = vertices.map(function() { return []; });

  d3_voronoi_tessellate(vertices, function(e) {
    var s1,
        s2,
        x1,
        x2,
        y1,
        y2;
    if (e.a === 1 && e.b >= 0) {
      s1 = e.ep.r;
      s2 = e.ep.l;
    } else {
      s1 = e.ep.l;
      s2 = e.ep.r;
    }
    if (e.a === 1) {
      y1 = s1 ? s1.y : -1e6;
      x1 = e.c - e.b * y1;
      y2 = s2 ? s2.y : 1e6;
      x2 = e.c - e.b * y2;
    } else {
      x1 = s1 ? s1.x : -1e6;
      y1 = e.c - e.a * x1;
      x2 = s2 ? s2.x : 1e6;
      y2 = e.c - e.a * x2;
    }
    var v1 = [x1, y1],
        v2 = [x2, y2];
    polygons[e.region.l.index].push(v1, v2);
    polygons[e.region.r.index].push(v1, v2);
  });

  // Reconnect the polygon segments into counterclockwise loops.
  return polygons.map(function(polygon, i) {
    var cx = vertices[i][0],
        cy = vertices[i][1];
    polygon.forEach(function(v) {
      v.angle = Math.atan2(v[0] - cx, v[1] - cy);
    });
    return polygon.sort(function(a, b) {
      return a.angle - b.angle;
    }).filter(function(d, i) {
      return !i || (d.angle - polygon[i - 1].angle > 1e-10);
    });
  });
};

var d3_voronoi_opposite = {"l": "r", "r": "l"};

function d3_voronoi_tessellate(vertices, callback) {

  var Sites = {
    list: vertices
      .map(function(v, i) {
        return {
          index: i,
          x: v[0],
          y: v[1]
        };
      })
      .sort(function(a, b) {
        return a.y < b.y ? -1
          : a.y > b.y ? 1
          : a.x < b.x ? -1
          : a.x > b.x ? 1
          : 0;
      }),
    bottomSite: null
  };

  var EdgeList = {
    list: [],
    leftEnd: null,
    rightEnd: null,

    init: function() {
      EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
      EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
      EdgeList.leftEnd.r = EdgeList.rightEnd;
      EdgeList.rightEnd.l = EdgeList.leftEnd;
      EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
    },

    createHalfEdge: function(edge, side) {
      return {
        edge: edge,
        side: side,
        vertex: null,
        "l": null,
        "r": null
      };
    },

    insert: function(lb, he) {
      he.l = lb;
      he.r = lb.r;
      lb.r.l = he;
      lb.r = he;
    },

    leftBound: function(p) {
      var he = EdgeList.leftEnd;
      do {
        he = he.r;
      } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
      he = he.l;
      return he;
    },

    del: function(he) {
      he.l.r = he.r;
      he.r.l = he.l;
      he.edge = null;
    },

    right: function(he) {
      return he.r;
    },

    left: function(he) {
      return he.l;
    },

    leftRegion: function(he) {
      return he.edge == null
          ? Sites.bottomSite
          : he.edge.region[he.side];
    },

    rightRegion: function(he) {
      return he.edge == null
          ? Sites.bottomSite
          : he.edge.region[d3_voronoi_opposite[he.side]];
    }
  };

  var Geom = {

    bisect: function(s1, s2) {
      var newEdge = {
        region: {"l": s1, "r": s2},
        ep: {"l": null, "r": null}
      };

      var dx = s2.x - s1.x,
          dy = s2.y - s1.y,
          adx = dx > 0 ? dx : -dx,
          ady = dy > 0 ? dy : -dy;

      newEdge.c = s1.x * dx + s1.y * dy
          + (dx * dx + dy * dy) * .5;

      if (adx > ady) {
        newEdge.a = 1;
        newEdge.b = dy / dx;
        newEdge.c /= dx;
      } else {
        newEdge.b = 1;
        newEdge.a = dx / dy;
        newEdge.c /= dy;
      }

      return newEdge;
    },

    intersect: function(el1, el2) {
      var e1 = el1.edge,
          e2 = el2.edge;
      if (!e1 || !e2 || (e1.region.r == e2.region.r)) {
        return null;
      }
      var d = (e1.a * e2.b) - (e1.b * e2.a);
      if (Math.abs(d) < 1e-10) {
        return null;
      }
      var xint = (e1.c * e2.b - e2.c * e1.b) / d,
          yint = (e2.c * e1.a - e1.c * e2.a) / d,
          e1r = e1.region.r,
          e2r = e2.region.r,
          el,
          e;
      if ((e1r.y < e2r.y) ||
         (e1r.y == e2r.y && e1r.x < e2r.x)) {
        el = el1;
        e = e1;
      } else {
        el = el2;
        e = e2;
      }
      var rightOfSite = (xint >= e.region.r.x);
      if ((rightOfSite && (el.side === "l")) ||
        (!rightOfSite && (el.side === "r"))) {
        return null;
      }
      return {
        x: xint,
        y: yint
      };
    },

    rightOf: function(he, p) {
      var e = he.edge,
          topsite = e.region.r,
          rightOfSite = (p.x > topsite.x);

      if (rightOfSite && (he.side === "l")) {
        return 1;
      }
      if (!rightOfSite && (he.side === "r")) {
        return 0;
      }
      if (e.a === 1) {
        var dyp = p.y - topsite.y,
            dxp = p.x - topsite.x,
            fast = 0,
            above = 0;

        if ((!rightOfSite && (e.b < 0)) ||
          (rightOfSite && (e.b >= 0))) {
          above = fast = (dyp >= e.b * dxp);
        } else {
          above = ((p.x + p.y * e.b) > e.c);
          if (e.b < 0) {
            above = !above;
          }
          if (!above) {
            fast = 1;
          }
        }
        if (!fast) {
          var dxs = topsite.x - e.region.l.x;
          above = (e.b * (dxp * dxp - dyp * dyp)) <
            (dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b));

          if (e.b < 0) {
            above = !above;
          }
        }
      } else /* e.b == 1 */ {
        var yl = e.c - e.a * p.x,
            t1 = p.y - yl,
            t2 = p.x - topsite.x,
            t3 = yl - topsite.y;

        above = (t1 * t1) > (t2 * t2 + t3 * t3);
      }
      return he.side === "l" ? above : !above;
    },

    endPoint: function(edge, side, site) {
      edge.ep[side] = site;
      if (!edge.ep[d3_voronoi_opposite[side]]) return;
      callback(edge);
    },

    distance: function(s, t) {
      var dx = s.x - t.x,
          dy = s.y - t.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  };

  var EventQueue = {
    list: [],

    insert: function(he, site, offset) {
      he.vertex = site;
      he.ystar = site.y + offset;
      for (var i=0, list=EventQueue.list, l=list.length; i<l; i++) {
        var next = list[i];
        if (he.ystar > next.ystar ||
          (he.ystar == next.ystar &&
          site.x > next.vertex.x)) {
          continue;
        } else {
          break;
        }
      }
      list.splice(i, 0, he);
    },

    del: function(he) {
      for (var i=0, ls=EventQueue.list, l=ls.length; i<l && (ls[i] != he); ++i) {}
      ls.splice(i, 1);
    },

    empty: function() { return EventQueue.list.length === 0; },

    nextEvent: function(he) {
      for (var i=0, ls=EventQueue.list, l=ls.length; i<l; ++i) {
        if (ls[i] == he) return ls[i+1];
      }
      return null;
    },

    min: function() {
      var elem = EventQueue.list[0];
      return {
        x: elem.vertex.x,
        y: elem.ystar
      };
    },

    extractMin: function() {
      return EventQueue.list.shift();
    }
  };

  EdgeList.init();
  Sites.bottomSite = Sites.list.shift();

  var newSite = Sites.list.shift(), newIntStar;
  var lbnd, rbnd, llbnd, rrbnd, bisector;
  var bot, top, temp, p, v;
  var e, pm;

  while (true) {
    if (!EventQueue.empty()) {
      newIntStar = EventQueue.min();
    }
    if (newSite && (EventQueue.empty()
      || newSite.y < newIntStar.y
      || (newSite.y == newIntStar.y
      && newSite.x < newIntStar.x))) { //new site is smallest
      lbnd = EdgeList.leftBound(newSite);
      rbnd = EdgeList.right(lbnd);
      bot = EdgeList.rightRegion(lbnd);
      e = Geom.bisect(bot, newSite);
      bisector = EdgeList.createHalfEdge(e, "l");
      EdgeList.insert(lbnd, bisector);
      p = Geom.intersect(lbnd, bisector);
      if (p) {
        EventQueue.del(lbnd);
        EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
      }
      lbnd = bisector;
      bisector = EdgeList.createHalfEdge(e, "r");
      EdgeList.insert(lbnd, bisector);
      p = Geom.intersect(bisector, rbnd);
      if (p) {
        EventQueue.insert(bisector, p, Geom.distance(p, newSite));
      }
      newSite = Sites.list.shift();
    } else if (!EventQueue.empty()) { //intersection is smallest
      lbnd = EventQueue.extractMin();
      llbnd = EdgeList.left(lbnd);
      rbnd = EdgeList.right(lbnd);
      rrbnd = EdgeList.right(rbnd);
      bot = EdgeList.leftRegion(lbnd);
      top = EdgeList.rightRegion(rbnd);
      v = lbnd.vertex;
      Geom.endPoint(lbnd.edge, lbnd.side, v);
      Geom.endPoint(rbnd.edge, rbnd.side, v);
      EdgeList.del(lbnd);
      EventQueue.del(rbnd);
      EdgeList.del(rbnd);
      pm = "l";
      if (bot.y > top.y) {
        temp = bot;
        bot = top;
        top = temp;
        pm = "r";
      }
      e = Geom.bisect(bot, top);
      bisector = EdgeList.createHalfEdge(e, pm);
      EdgeList.insert(llbnd, bisector);
      Geom.endPoint(e, d3_voronoi_opposite[pm], v);
      p = Geom.intersect(llbnd, bisector);
      if (p) {
        EventQueue.del(llbnd);
        EventQueue.insert(llbnd, p, Geom.distance(p, bot));
      }
      p = Geom.intersect(bisector, rrbnd);
      if (p) {
        EventQueue.insert(bisector, p, Geom.distance(p, bot));
      }
    } else {
      break;
    }
  }//end while

  for (lbnd = EdgeList.right(EdgeList.leftEnd);
      lbnd != EdgeList.rightEnd;
      lbnd = EdgeList.right(lbnd)) {
    callback(lbnd.edge);
  }
}
/**
* @param vertices [[x1, y1], [x2, y2], …]
* @returns triangles [[[x1, y1], [x2, y2], [x3, y3]], …]
 */
d3.geom.delaunay = function(vertices) {
  var edges = vertices.map(function() { return []; }),
      triangles = [];

  // Use the Voronoi tessellation to determine Delaunay edges.
  d3_voronoi_tessellate(vertices, function(e) {
    edges[e.region.l.index].push(vertices[e.region.r.index]);
  });

  // Reconnect the edges into counterclockwise triangles.
  edges.forEach(function(edge, i) {
    var v = vertices[i],
        cx = v[0],
        cy = v[1];
    edge.forEach(function(v) {
      v.angle = Math.atan2(v[0] - cx, v[1] - cy);
    });
    edge.sort(function(a, b) {
      return a.angle - b.angle;
    });
    for (var j = 0, m = edge.length - 1; j < m; j++) {
      triangles.push([v, edge[j], edge[j + 1]]);
    }
  });

  return triangles;
};
// Constructs a new quadtree for the specified array of points. A quadtree is a
// two-dimensional recursive spatial subdivision. This implementation uses
// square partitions, dividing each square into four equally-sized squares. Each
// point exists in a unique node; if multiple points are in the same position,
// some points may be stored on internal nodes rather than leaf nodes. Quadtrees
// can be used to accelerate various spatial operations, such as the Barnes-Hut
// approximation for computing n-body forces, or collision detection.
d3.geom.quadtree = function(points, x1, y1, x2, y2) {
  var p,
      i = -1,
      n = points.length;

  // Type conversion for deprecated API.
  if (n && isNaN(points[0].x)) points = points.map(d3_geom_quadtreePoint);

  // Allow bounds to be specified explicitly.
  if (arguments.length < 5) {
    if (arguments.length === 3) {
      y2 = x2 = y1;
      y1 = x1;
    } else {
      x1 = y1 = Infinity;
      x2 = y2 = -Infinity;

      // Compute bounds.
      while (++i < n) {
        p = points[i];
        if (p.x < x1) x1 = p.x;
        if (p.y < y1) y1 = p.y;
        if (p.x > x2) x2 = p.x;
        if (p.y > y2) y2 = p.y;
      }

      // Squarify the bounds.
      var dx = x2 - x1,
          dy = y2 - y1;
      if (dx > dy) y2 = y1 + dx;
      else x2 = x1 + dy;
    }
  }

  // Recursively inserts the specified point p at the node n or one of its
  // descendants. The bounds are defined by [x1, x2] and [y1, y2].
  function insert(n, p, x1, y1, x2, y2) {
    if (isNaN(p.x) || isNaN(p.y)) return; // ignore invalid points
    if (n.leaf) {
      var v = n.point;
      if (v) {
        // If the point at this leaf node is at the same position as the new
        // point we are adding, we leave the point associated with the
        // internal node while adding the new point to a child node. This
        // avoids infinite recursion.
        if ((Math.abs(v.x - p.x) + Math.abs(v.y - p.y)) < .01) {
          insertChild(n, p, x1, y1, x2, y2);
        } else {
          n.point = null;
          insertChild(n, v, x1, y1, x2, y2);
          insertChild(n, p, x1, y1, x2, y2);
        }
      } else {
        n.point = p;
      }
    } else {
      insertChild(n, p, x1, y1, x2, y2);
    }
  }

  // Recursively inserts the specified point p into a descendant of node n. The
  // bounds are defined by [x1, x2] and [y1, y2].
  function insertChild(n, p, x1, y1, x2, y2) {
    // Compute the split point, and the quadrant in which to insert p.
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        right = p.x >= sx,
        bottom = p.y >= sy,
        i = (bottom << 1) + right;

    // Recursively insert into the child node.
    n.leaf = false;
    n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());

    // Update the bounds as we recurse.
    if (right) x1 = sx; else x2 = sx;
    if (bottom) y1 = sy; else y2 = sy;
    insert(n, p, x1, y1, x2, y2);
  }

  // Create the root node.
  var root = d3_geom_quadtreeNode();

  root.add = function(p) {
    insert(root, p, x1, y1, x2, y2);
  };

  root.visit = function(f) {
    d3_geom_quadtreeVisit(f, root, x1, y1, x2, y2);
  };

  // Insert all points.
  points.forEach(root.add);
  return root;
};

function d3_geom_quadtreeNode() {
  return {
    leaf: true,
    nodes: [],
    point: null
  };
}

function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
  if (!f(node, x1, y1, x2, y2)) {
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        children = node.nodes;
    if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
    if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
    if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
    if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
  }
}

function d3_geom_quadtreePoint(p) {
  return {
    x: p[0],
    y: p[1]
  };
}
d3.time = {};

var d3_time = Date;

function d3_time_utc() {
  this._ = new Date(arguments.length > 1
      ? Date.UTC.apply(this, arguments)
      : arguments[0]);
}

d3_time_utc.prototype = {
  getDate: function() { return this._.getUTCDate(); },
  getDay: function() { return this._.getUTCDay(); },
  getFullYear: function() { return this._.getUTCFullYear(); },
  getHours: function() { return this._.getUTCHours(); },
  getMilliseconds: function() { return this._.getUTCMilliseconds(); },
  getMinutes: function() { return this._.getUTCMinutes(); },
  getMonth: function() { return this._.getUTCMonth(); },
  getSeconds: function() { return this._.getUTCSeconds(); },
  getTime: function() { return this._.getTime(); },
  getTimezoneOffset: function() { return 0; },
  valueOf: function() { return this._.valueOf(); },
  setDate: function() { d3_time_prototype.setUTCDate.apply(this._, arguments); },
  setDay: function() { d3_time_prototype.setUTCDay.apply(this._, arguments); },
  setFullYear: function() { d3_time_prototype.setUTCFullYear.apply(this._, arguments); },
  setHours: function() { d3_time_prototype.setUTCHours.apply(this._, arguments); },
  setMilliseconds: function() { d3_time_prototype.setUTCMilliseconds.apply(this._, arguments); },
  setMinutes: function() { d3_time_prototype.setUTCMinutes.apply(this._, arguments); },
  setMonth: function() { d3_time_prototype.setUTCMonth.apply(this._, arguments); },
  setSeconds: function() { d3_time_prototype.setUTCSeconds.apply(this._, arguments); },
  setTime: function() { d3_time_prototype.setTime.apply(this._, arguments); }
};

var d3_time_prototype = Date.prototype;
d3.time.format = function(template) {
  var n = template.length;

  function format(date) {
    var string = [],
        i = -1,
        j = 0,
        c,
        f;
    while (++i < n) {
      if (template.charCodeAt(i) == 37) {
        string.push(
            template.substring(j, i),
            (f = d3_time_formats[c = template.charAt(++i)])
            ? f(date) : c);
        j = i + 1;
      }
    }
    string.push(template.substring(j, i));
    return string.join("");
  }

  format.parse = function(string) {
    var d = {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0},
        i = d3_time_parse(d, template, string, 0);
    if (i != string.length) return null;

    // The am-pm flag is 0 for AM, and 1 for PM.
    if ("p" in d) d.H = d.H % 12 + d.p * 12;

    var date = new d3_time();
    date.setFullYear(d.y, d.m, d.d);
    date.setHours(d.H, d.M, d.S, d.L);
    return date;
  };

  format.toString = function() {
    return template;
  };

  return format;
};

function d3_time_parse(date, template, string, j) {
  var c,
      p,
      i = 0,
      n = template.length,
      m = string.length;
  while (i < n) {
    if (j >= m) return -1;
    c = template.charCodeAt(i++);
    if (c == 37) {
      p = d3_time_parsers[template.charAt(i++)];
      if (!p || ((j = p(date, string, j)) < 0)) return -1;
    } else if (c != string.charCodeAt(j++)) {
      return -1;
    }
  }
  return j;
}

var d3_time_zfill2 = d3.format("02d"),
    d3_time_zfill3 = d3.format("03d"),
    d3_time_zfill4 = d3.format("04d"),
    d3_time_sfill2 = d3.format("2d");

var d3_time_formats = {
  a: function(d) { return d3_time_weekdays[d.getDay()].substring(0, 3); },
  A: function(d) { return d3_time_weekdays[d.getDay()]; },
  b: function(d) { return d3_time_months[d.getMonth()].substring(0, 3); },
  B: function(d) { return d3_time_months[d.getMonth()]; },
  c: d3.time.format("%a %b %e %H:%M:%S %Y"),
  d: function(d) { return d3_time_zfill2(d.getDate()); },
  e: function(d) { return d3_time_sfill2(d.getDate()); },
  H: function(d) { return d3_time_zfill2(d.getHours()); },
  I: function(d) { return d3_time_zfill2(d.getHours() % 12 || 12); },
  j: function(d) { return d3_time_zfill3(1 + d3.time.dayOfYear(d)); },
  L: function(d) { return d3_time_zfill3(d.getMilliseconds()); },
  m: function(d) { return d3_time_zfill2(d.getMonth() + 1); },
  M: function(d) { return d3_time_zfill2(d.getMinutes()); },
  p: function(d) { return d.getHours() >= 12 ? "PM" : "AM"; },
  S: function(d) { return d3_time_zfill2(d.getSeconds()); },
  U: function(d) { return d3_time_zfill2(d3.time.sundayOfYear(d)); },
  w: function(d) { return d.getDay(); },
  W: function(d) { return d3_time_zfill2(d3.time.mondayOfYear(d)); },
  x: d3.time.format("%m/%d/%y"),
  X: d3.time.format("%H:%M:%S"),
  y: function(d) { return d3_time_zfill2(d.getFullYear() % 100); },
  Y: function(d) { return d3_time_zfill4(d.getFullYear() % 10000); },
  Z: d3_time_zone,
  "%": function(d) { return "%"; }
};

var d3_time_parsers = {
  a: d3_time_parseWeekdayAbbrev,
  A: d3_time_parseWeekday,
  b: d3_time_parseMonthAbbrev,
  B: d3_time_parseMonth,
  c: d3_time_parseLocaleFull,
  d: d3_time_parseDay,
  e: d3_time_parseDay,
  H: d3_time_parseHour24,
  I: d3_time_parseHour24,
  // j: function(d, s, i) { /*TODO day of year [001,366] */ return i; },
  L: d3_time_parseMilliseconds,
  m: d3_time_parseMonthNumber,
  M: d3_time_parseMinutes,
  p: d3_time_parseAmPm,
  S: d3_time_parseSeconds,
  // U: function(d, s, i) { /*TODO week number (sunday) [00,53] */ return i; },
  // w: function(d, s, i) { /*TODO weekday [0,6] */ return i; },
  // W: function(d, s, i) { /*TODO week number (monday) [00,53] */ return i; },
  x: d3_time_parseLocaleDate,
  X: d3_time_parseLocaleTime,
  y: d3_time_parseYear,
  Y: d3_time_parseFullYear
  // ,
  // Z: function(d, s, i) { /*TODO time zone */ return i; },
  // "%": function(d, s, i) { /*TODO literal % */ return i; }
};

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekdayAbbrev(date, string, i) {
  return d3_time_weekdayAbbrevRe.test(string.substring(i, i += 3)) ? i : -1;
}

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekday(date, string, i) {
  d3_time_weekdayRe.lastIndex = 0;
  var n = d3_time_weekdayRe.exec(string.substring(i, i + 10));
  return n ? i += n[0].length : -1;
}

var d3_time_weekdayAbbrevRe = /^(?:sun|mon|tue|wed|thu|fri|sat)/i,
    d3_time_weekdayRe = /^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i,
    d3_time_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function d3_time_parseMonthAbbrev(date, string, i) {
  var n = d3_time_monthAbbrevLookup.get(string.substring(i, i += 3).toLowerCase());
  return n == null ? -1 : (date.m = n, i);
}

var d3_time_monthAbbrevLookup = d3.map({
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
});

function d3_time_parseMonth(date, string, i) {
  d3_time_monthRe.lastIndex = 0;
  var n = d3_time_monthRe.exec(string.substring(i, i + 12));
  return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
}

var d3_time_monthRe = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig;

var d3_time_monthLookup = d3.map({
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
});

var d3_time_months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function d3_time_parseLocaleFull(date, string, i) {
  return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
}

function d3_time_parseLocaleDate(date, string, i) {
  return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
}

function d3_time_parseLocaleTime(date, string, i) {
  return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
}

function d3_time_parseFullYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 4));
  return n ? (date.y = +n[0], i += n[0].length) : -1;
}

function d3_time_parseYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.y = d3_time_century() + +n[0], i += n[0].length) : -1;
}

function d3_time_century() {
  return ~~(new Date().getFullYear() / 1000) * 1000;
}

function d3_time_parseMonthNumber(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.m = n[0] - 1, i += n[0].length) : -1;
}

function d3_time_parseDay(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.d = +n[0], i += n[0].length) : -1;
}

// Note: we don't validate that the hour is in the range [0,23] or [1,12].
function d3_time_parseHour24(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.H = +n[0], i += n[0].length) : -1;
}

function d3_time_parseMinutes(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.M = +n[0], i += n[0].length) : -1;
}

function d3_time_parseSeconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.S = +n[0], i += n[0].length) : -1;
}

function d3_time_parseMilliseconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 3));
  return n ? (date.L = +n[0], i += n[0].length) : -1;
}

// Note: we don't look at the next directive.
var d3_time_numberRe = /\s*\d+/;

function d3_time_parseAmPm(date, string, i) {
  var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
  return n == null ? -1 : (date.p = n, i);
}

var d3_time_amPmLookup = d3.map({
  am: 0,
  pm: 1
});

// TODO table of time zone offset names?
function d3_time_zone(d) {
  var z = d.getTimezoneOffset(),
      zs = z > 0 ? "-" : "+",
      zh = ~~(Math.abs(z) / 60),
      zm = Math.abs(z) % 60;
  return zs + d3_time_zfill2(zh) + d3_time_zfill2(zm);
}
d3.time.format.utc = function(template) {
  var local = d3.time.format(template);

  function format(date) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time();
      utc._ = date;
      return local(utc);
    } finally {
      d3_time = Date;
    }
  }

  format.parse = function(string) {
    try {
      d3_time = d3_time_utc;
      var date = local.parse(string);
      return date && date._;
    } finally {
      d3_time = Date;
    }
  };

  format.toString = local.toString;

  return format;
};
var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");

d3.time.format.iso = Date.prototype.toISOString ? d3_time_formatIsoNative : d3_time_formatIso;

function d3_time_formatIsoNative(date) {
  return date.toISOString();
}

d3_time_formatIsoNative.parse = function(string) {
  return new Date(string);
};

d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
function d3_time_interval(local, step, number) {

  function round(date) {
    var d0 = local(date), d1 = offset(d0, 1);
    return date - d0 < d1 - date ? d0 : d1;
  }

  function ceil(date) {
    step(date = local(new d3_time(date - 1)), 1);
    return date;
  }

  function offset(date, k) {
    step(date = new d3_time(+date), k);
    return date;
  }

  function range(t0, t1, dt) {
    var time = ceil(t0), times = [];
    if (dt > 1) {
      while (time < t1) {
        if (!(number(time) % dt)) times.push(new Date(+time));
        step(time, 1);
      }
    } else {
      while (time < t1) times.push(new Date(+time)), step(time, 1);
    }
    return times;
  }

  function range_utc(t0, t1, dt) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time_utc();
      utc._ = t0;
      return range(utc, t1, dt);
    } finally {
      d3_time = Date;
    }
  }

  local.floor = local;
  local.round = round;
  local.ceil = ceil;
  local.offset = offset;
  local.range = range;

  var utc = local.utc = d3_time_interval_utc(local);
  utc.floor = utc;
  utc.round = d3_time_interval_utc(round);
  utc.ceil = d3_time_interval_utc(ceil);
  utc.offset = d3_time_interval_utc(offset);
  utc.range = range_utc;

  return local;
}

function d3_time_interval_utc(method) {
  return function(date, k) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time_utc();
      utc._ = date;
      return method(utc, k)._;
    } finally {
      d3_time = Date;
    }
  };
}
d3.time.second = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 1e3) * 1e3);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 1e3); // DST breaks setSeconds
}, function(date) {
  return date.getSeconds();
});

d3.time.seconds = d3.time.second.range;
d3.time.seconds.utc = d3.time.second.utc.range;
d3.time.minute = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 6e4) * 6e4);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 6e4); // DST breaks setMinutes
}, function(date) {
  return date.getMinutes();
});

d3.time.minutes = d3.time.minute.range;
d3.time.minutes.utc = d3.time.minute.utc.range;
d3.time.hour = d3_time_interval(function(date) {
  var timezone = date.getTimezoneOffset() / 60;
  return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 36e5); // DST breaks setHours
}, function(date) {
  return date.getHours();
});

d3.time.hours = d3.time.hour.range;
d3.time.hours.utc = d3.time.hour.utc.range;
d3.time.day = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), date.getMonth(), date.getDate());
}, function(date, offset) {
  date.setDate(date.getDate() + offset);
}, function(date) {
  return date.getDate() - 1;
});

d3.time.days = d3.time.day.range;
d3.time.days.utc = d3.time.day.utc.range;

d3.time.dayOfYear = function(date) {
  var year = d3.time.year(date);
  return Math.floor((date - year) / 864e5 - (date.getTimezoneOffset() - year.getTimezoneOffset()) / 1440);
};
d3_time_weekdays.forEach(function(day, i) {
  day = day.toLowerCase();
  i = 7 - i;

  var interval = d3.time[day] = d3_time_interval(function(date) {
    (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
    return date;
  }, function(date, offset) {
    date.setDate(date.getDate() + Math.floor(offset) * 7);
  }, function(date) {
    var day = d3.time.year(date).getDay();
    return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
  });

  d3.time[day + "s"] = interval.range;
  d3.time[day + "s"].utc = interval.utc.range;

  d3.time[day + "OfYear"] = function(date) {
    var day = d3.time.year(date).getDay();
    return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
  };
});

d3.time.week = d3.time.sunday;
d3.time.weeks = d3.time.sunday.range;
d3.time.weeks.utc = d3.time.sunday.utc.range;
d3.time.weekOfYear = d3.time.sundayOfYear;
d3.time.month = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), date.getMonth(), 1);
}, function(date, offset) {
  date.setMonth(date.getMonth() + offset);
}, function(date) {
  return date.getMonth();
});

d3.time.months = d3.time.month.range;
d3.time.months.utc = d3.time.month.utc.range;
d3.time.year = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), 0, 1);
}, function(date, offset) {
  date.setFullYear(date.getFullYear() + offset);
}, function(date) {
  return date.getFullYear();
});

d3.time.years = d3.time.year.range;
d3.time.years.utc = d3.time.year.utc.range;
function d3_time_scale(linear, methods, format) {

  function scale(x) {
    return linear(x);
  }

  scale.invert = function(x) {
    return d3_time_scaleDate(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
    linear.domain(x);
    return scale;
  };

  scale.nice = function(m) {
    var extent = d3_time_scaleExtent(scale.domain());
    return scale.domain([m.floor(extent[0]), m.ceil(extent[1])]);
  };

  scale.ticks = function(m, k) {
    var extent = d3_time_scaleExtent(scale.domain());
    if (typeof m !== "function") {
      var span = extent[1] - extent[0],
          target = span / m,
          i = d3.bisect(d3_time_scaleSteps, target);
      if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
      if (!i) return linear.ticks(m).map(d3_time_scaleDate);
      if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
      m = methods[i];
      k = m[1];
      m = m[0].range;
    }
    return m(extent[0], new Date(+extent[1] + 1), k); // inclusive upper bound
  };

  scale.tickFormat = function() {
    return format;
  };

  scale.copy = function() {
    return d3_time_scale(linear.copy(), methods, format);
  };

  // TOOD expose d3_scale_linear_rebind?
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

// TODO expose d3_scaleExtent?
function d3_time_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_time_scaleDate(t) {
  return new Date(t);
}

function d3_time_scaleFormat(formats) {
  return function(date) {
    var i = formats.length - 1, f = formats[i];
    while (!f[1](date)) f = formats[--i];
    return f[0](date);
  };
}

function d3_time_scaleSetYear(y) {
  var d = new Date(y, 0, 1);
  d.setFullYear(y); // Y2K fail
  return d;
}

function d3_time_scaleGetYear(d) {
  var y = d.getFullYear(),
      d0 = d3_time_scaleSetYear(y),
      d1 = d3_time_scaleSetYear(y + 1);
  return y + (d - d0) / (d1 - d0);
}

var d3_time_scaleSteps = [
  1e3,    // 1-second
  5e3,    // 5-second
  15e3,   // 15-second
  3e4,    // 30-second
  6e4,    // 1-minute
  3e5,    // 5-minute
  9e5,    // 15-minute
  18e5,   // 30-minute
  36e5,   // 1-hour
  108e5,  // 3-hour
  216e5,  // 6-hour
  432e5,  // 12-hour
  864e5,  // 1-day
  1728e5, // 2-day
  6048e5, // 1-week
  2592e6, // 1-month
  7776e6, // 3-month
  31536e6 // 1-year
];

var d3_time_scaleLocalMethods = [
  [d3.time.second, 1],
  [d3.time.second, 5],
  [d3.time.second, 15],
  [d3.time.second, 30],
  [d3.time.minute, 1],
  [d3.time.minute, 5],
  [d3.time.minute, 15],
  [d3.time.minute, 30],
  [d3.time.hour, 1],
  [d3.time.hour, 3],
  [d3.time.hour, 6],
  [d3.time.hour, 12],
  [d3.time.day, 1],
  [d3.time.day, 2],
  [d3.time.week, 1],
  [d3.time.month, 1],
  [d3.time.month, 3],
  [d3.time.year, 1]
];

var d3_time_scaleLocalFormats = [
  [d3.time.format("%Y"), function(d) { return true; }],
  [d3.time.format("%B"), function(d) { return d.getMonth(); }],
  [d3.time.format("%b %d"), function(d) { return d.getDate() != 1; }],
  [d3.time.format("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
  [d3.time.format("%I %p"), function(d) { return d.getHours(); }],
  [d3.time.format("%I:%M"), function(d) { return d.getMinutes(); }],
  [d3.time.format(":%S"), function(d) { return d.getSeconds(); }],
  [d3.time.format(".%L"), function(d) { return d.getMilliseconds(); }]
];

var d3_time_scaleLinear = d3.scale.linear(),
    d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);

d3_time_scaleLocalMethods.year = function(extent, m) {
  return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
};

d3.time.scale = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
};
var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
  return [m[0].utc, m[1]];
});

var d3_time_scaleUTCFormats = [
  [d3.time.format.utc("%Y"), function(d) { return true; }],
  [d3.time.format.utc("%B"), function(d) { return d.getUTCMonth(); }],
  [d3.time.format.utc("%b %d"), function(d) { return d.getUTCDate() != 1; }],
  [d3.time.format.utc("%a %d"), function(d) { return d.getUTCDay() && d.getUTCDate() != 1; }],
  [d3.time.format.utc("%I %p"), function(d) { return d.getUTCHours(); }],
  [d3.time.format.utc("%I:%M"), function(d) { return d.getUTCMinutes(); }],
  [d3.time.format.utc(":%S"), function(d) { return d.getUTCSeconds(); }],
  [d3.time.format.utc(".%L"), function(d) { return d.getUTCMilliseconds(); }]
];

var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);

function d3_time_scaleUTCSetYear(y) {
  var d = new Date(Date.UTC(y, 0, 1));
  d.setUTCFullYear(y); // Y2K fail
  return d;
}

function d3_time_scaleUTCGetYear(d) {
  var y = d.getUTCFullYear(),
      d0 = d3_time_scaleUTCSetYear(y),
      d1 = d3_time_scaleUTCSetYear(y + 1);
  return y + (d - d0) / (d1 - d0);
}

d3_time_scaleUTCMethods.year = function(extent, m) {
  return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
};

d3.time.scale.utc = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
};
})();

  function isFunction(object) {
  var getClass = {}.toString;
   return object && getClass.call(object) == '[object Function]';
  }
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
/*infoWindow.js*/
function displayInfoWindow(title, description, link) {
	var temp = d3.select("#infoWindow").html("");
	temp = temp.append("windowTitle")
			.attr("class", "info_head");
	if(link) {
		temp = temp.append("a")
			.attr("href", link)
			.attr("style", "text-decoration:none;")
	}
	temp.html(title);
	d3.select("#infoWindow").append("text")
			.html(description);
}





































/*filter.js*/
var builtFilters = false;
var filterMap = {};

function doFilter(value, filter) {
	if(!value) {
		return false;
	}
	if(builtFilters) {
		var dropdown = document.getElementById("filter-" + filter);
		if(dropdown.options[0].selected) return true;
		for(var i in dropdown.options) {
			if(dropdown.options[i].value == value) {
				return (dropdown.options[i].selected);
			}
		}
	}
	else {
		if(filterMap[filter] == undefined) {
			filterMap[filter] = {};
			d3.select("#filters").append("select")
				.attr("id", "filter-" + filter)
				.attr("multiple", "true")
				.append("option")
					.attr("value", "All")
					.text("All");
			document.getElementById("filter-" + filter).selectedIndex = 0;
		}
		if(filterMap[filter][value] == undefined) {
			filterMap[filter][value] = 1;
			d3.select("#" + "filter-" + filter).append("option")
				.attr("value", value)
				.text(value);
		}
	}
	return true;
}

function selectFilterOption(value, filter, shiftPressed, dontrefresh) {
	var dropdown = document.getElementById("filter-" + filter);
	for(var i in dropdown.options) {
		if(!shiftPressed) {
			dropdown.options[i].selected = false;
		}
		if(dropdown.options[i].value == value) {
			dropdown.options[0].selected = false;
			dropdown.options[i].selected = true;
		}
	}
	if(!dontrefresh) {
		refreshAll();
	}
}


function filterObject(obj, shiftPressed) {
	selectFilterOption(obj.filterValue, obj.filterTag, shiftPressed, (obj.filterValue2 != null));
	if(obj.filterValue2) {
		selectFilterOption(obj.filterValue2, obj.filterTag2, true, false);
	}
}















































/*mapOptions.js*/
var mapChoices = {};
var mapOptions = {};
var builtOptions = false;

function getOption(option) {
	return mapOptions[option].options[mapChoices[mapOptions[option].tag]];
}

function buildOptions() {
	if(typeof mapOptions != "undefined" && !builtOptions) {
		var opts = {};
		var options = Object.keys(mapOptions);
		for(var i in options) {
			var currTag = mapOptions[options[i]].tag;
			var currOptions = mapOptions[options[i]].options;
			if(!opts[currTag]) {
				var dropdown = d3.select("#mapChoices").append("select")
					.attr("id", "choices-" + currTag);
				for(var j in currOptions) {
					dropdown.append("option")
						.attr("value", currOptions[j])
						.text(currOptions[j]);
				}
				mapChoices[currTag] = 0;
				opts[currTag] = 1;
			}
		}
	}
}

function populateOptions() {
	var choices = Object.keys(mapChoices);
	for(var i in choices) {
		mapChoices[choices[i]] = document.getElementById("choices-" + choices[i]).selectedIndex;
	}
}

function addOption(optName, optTag, optValues) {
	var temp = {}
	temp["tag"] = optTag;
	temp["options"] = optValues;
	mapOptions[optName] = temp;
}

function doOptions() {
	buildOptions();
	populateOptions();
}















































/*legend.js*/
var rowHeight = 30;
var colPadding = 12;
var centerPadding = 4;
var dividingChar = ":";
var leftAlign = 100;	
	var width = 1,
		height = 1;
		
		


var legendTags = [];
var legend = {};
var legendMap = {};

function drawLegendElement(svg, value, type, cx, cy, isRight) {
	if(type == "colour" || type == "color") {
		return svg.append("circle")
			.attr("class", "circle")
			.attr("r", 8)
			.style("fill", value)
			.attr("cx", cx + (isRight ? 8 : -8))
			.attr("cy", cy)
			.node().getBBox();
	}
	else if(type == "shape") {
		cx = cx + (isRight ? 8 : -8);
		if(value < 3) {
			return svg.append("circle")
			.attr("class", "shape")
			.attr("r", 8)
			.style("fill", "#ffffff")
			.attr("cx", cx)
			.attr("cy", cy)
			.node().getBBox();
		}
		else {
			var shape = value;
			var size = 8;
			var inc = (2 * Math.PI) / shape;
			var currAngle = inc;
			var points = cx + "," + (cy - size);
			var x;
			var y;
			for(var i = 0; i < shape; i++) {
				x = Math.sin(currAngle);
				y = Math.cos(currAngle);
				x = x * size;
				y = y * size;
				points = points + " " + (cx - Math.sin(currAngle) * size) + "," + (cy - Math.cos(currAngle) * size);
				currAngle = currAngle + inc;
			}
			return svg.append("polygon")
				.attr("class", "shape")
				.style("fill", "#ffffff")
				.attr("points", points)
				.node().getBBox();
		}
	}
	else if(type == "image") {
		var size = 16;
		return svg.append("image")
			.attr("x", cx - (isRight ? 0 : size))
			.attr("y", cy - (size/2))
			.attr("width", size)
			.attr("height", size)
			.attr("xlink:href", value)
			.node().getBBox();
	}
	else {
		return svg.append("text")
			.attr("x", cx)
			.attr("y", cy + 4)
			.attr("fill","#000")
			.attr("text-anchor", (isRight ? "start" : "end"))
			.text(value)
			.node().getBBox();
	}
}


function addALegendElement(svg, json, i) {
	drawLegendElement(svg, json[i].from, json[i].fromType, colInc/2 + leftAlign, (i * rowInc) + rowInc);
	drawLegendElement(svg, ":", "string", colInc + leftAlign, (i * rowInc) + rowInc);
	drawLegendElement(svg, json[i].to, json[i].toType, colInc + (colInc/2) + leftAlign, (i * rowInc) + rowInc);
}

function createLegend(container) {
	if(legendTags.length) {
		
		var containerObject = d3.select("#" + container);
		var svg = containerObject.append("svg")
			.attr("width", width)
			.attr("height", height);
		
		var totalColWidths = 0;
		var totalNumRows = 0;
		var colWidths = [];
		var leftColWidths = [];
		var rightColWidths = [];
		var centerWidth = drawLegendElement(svg, dividingChar, "string", 0, 0).width + (2 * centerPadding);
		for(var i in legendTags) {
			colWidths[i] = drawLegendElement(svg, legendTags[i], "string", 0, 0).width + (2 * colPadding);
			leftColWidths[i] = 0;
			rightColWidths[i] = 0;
			var currRowNum = 0;
			for(var j in legend[legendTags[i]]) {
				var currLeft = drawLegendElement(svg, legend[legendTags[i]][j].from, legend[legendTags[i]][j].fromType, 0, 0);
				var currRight = drawLegendElement(svg, legend[legendTags[i]][j].to, legend[legendTags[i]][j].toType, 0, 0);
				leftColWidths[i] = (leftColWidths[i] > currLeft.width) ? leftColWidths[i] : currLeft.width;
				rightColWidths[i] = (rightColWidths[i] > currRight.width) ? rightColWidths[i] : currRight.width;
				
				currRowNum++;
				if (currRowNum > totalNumRows) {
					totalNumRows = currRowNum;
				}
			}
			var currColWidth = leftColWidths[i] + rightColWidths[i] + centerWidth + (2 * colPadding);
			colWidths[i] = (colWidths[i] > currColWidth) ? colWidths[i] : currColWidth;
			totalColWidths += colWidths[i];
		}
		
		var temp = containerObject.node()
		while (temp.lastChild) {
			temp.removeChild(temp.lastChild);
		}
		
		svg = containerObject.append("svg")
			.attr("width", totalColWidths)
			.attr("height", totalNumRows * rowHeight + 2*rowHeight);
		
		var currColLeft = 0;
		for(var i in legendTags) {
			svg.append("text")
				.attr("x", currColLeft + colWidths[i]/2)
				.attr("y", rowHeight)
				.attr("fill","#000")
				.attr("text-anchor", "middle")
				.text(legendTags[i]);
			
			for(var j in legend[legendTags[i]]) {
				var temp = rowHeight * j;
				temp = temp + rowHeight + rowHeight;
				drawLegendElement(svg, legend[legendTags[i]][j].from, legend[legendTags[i]][j].fromType, currColLeft + colPadding + leftColWidths[i], temp, 0);
				svg.append("text")
					.attr("x", currColLeft + colPadding + leftColWidths[i] + (centerWidth / 2))
					.attr("y", temp + 4)
					.attr("fill","#000")
					.attr("text-anchor", "middle")
					.text(dividingChar);
				drawLegendElement(svg, legend[legendTags[i]][j].to, legend[legendTags[i]][j].toType, currColLeft + colPadding + leftColWidths[i] + centerWidth, temp, 1);
			}
			currColLeft += colWidths[i];
		}
	}
}

function addToLegend(from, to, mapping) {
	if(from != null && to != null) {
		var legendIDs = legendMap[mapping.legend];
		if(!legendIDs) {
			legendMap[mapping.legend] = {};
			legend[mapping.legend] = [];
			legendTags.push(mapping.legend);
		}
		var index = legendMap[mapping.legend][from];
		if(index == undefined) {
			index = legend[mapping.legend].length;
			legendMap[mapping.legend][from] = index;
		}
		legend[mapping.legend][index] = {
			"from":from,
			"to":to,
			"fromType":mapping.fromType,
			"toType":mapping.toType
		};
	}
}












































/*wheelStrat.js*/
var noName = function(value) {
	return (value ? value : "??");
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var colourList2 = {
	"author":d3.scale.getcategory60(),
	"activity":d3.scale.getcategory60b(),
	"workItem":d3.scale.getcategory60c().concat(d3.scale.getcategory60c())
}

var wheelStrat = new Object();
wheelStrat.getStrat = function() {
	return [
		{
			"from":"returnValue/values",
			"to":"tempValues",
			"condition":countNotZero,
			"iterate":[
				{
					"from":"author",
					"to":"author",
					"filter":"Students"
				},
				{
					"from":"activity",
					"to":"activity",
					"filter":"Activity"
				},
				{
					"from":"workItem",
					"to":"workItem"
				},
				{
					"from":"count",
					"to":"count"
				}
			]
		},
		{
			"remap":1,
			"from":"tempValues",
			"to":"children",
			"unique":[
				{
					"from":getOption("col1from"),
					"to":"name",
					"appendFunction":noName
				}
			],
			"iterate":[
				{
					"remap":1,
					"from":"name",
					"to":"colour",
					"toList":colourList2[getOption("col1from")],
					"tag":getOption("col1from"),
					"legend":getOption("col1from"),
					"toType":"colour"
				},
				{
					"from":"",
					"to":"children",
					"unique":[
						{
							"from":getOption("col2from"),
							"to":"name",
							"appendFunction":noName
						}
					],
					"iterate":[
						{
							"remap":1,
							"from":"name",
							"to":"colour",
							"toList":colourList2[getOption("col2from")],
							"tag":getOption("col2from"),
							"legend":getOption("col2from"),
							"toType":"colour"
						},
						{
							"from":"",
							"to":"children",
							"unique":[
								{
									"from":getOption("col3from"),
									"to":"name",
									"appendFunction":noName
								}
							],
							"iterate":[
								{
									"remap":1,
									"from":"name",
									"to":"colour",
									"toList":colourList2[getOption("col3from")],
									"tag":getOption("col3from"),
									"legend":getOption("col3from"),
									"toType":"colour"
								},
								{
									"from":"count",
									"to":"value",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		}
	];
}















































/*SimStrat.js*/
var simParseDate = function(value) {
	if(!value) return "";
	var dateAndTime = value.split(" ");
	var ymd = dateAndTime[0].split("-");
	var retVal = ymd[1] + " " + ymd[2] + " " + ymd[0] + " " + dateAndTime[1];
	return retVal;
}

var laterDate = function (newDate, oldDate) {
	//newDate = parseDate(newDate);
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 > d2) ? newDate : oldDate;
	return retVal;
}

var earlierDate = function (newDate, oldDate) {
	//newDate = parseDate(newDate);
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 < d2) ? newDate : oldDate;
	return retVal;
}

var parseTitle = function(value) {
	if(!value) return "";
	var val = document.createElement("a");
	val.innerHTML = value;
	return $(val.children[0]).text();
}

var parseColour = function(value) {
	if(!value) return "";
	var val = document.createElement("a");
	val.innerHTML = value;
	return val.children[0].style.color;
}

var hasEndDate = function(fromObj) {
	return (fromObj.startdate == fromObj.enddate || fromObj.enddate == undefined) ? false : true;
};

var addImagesFolder = function(value) {
	return imageURLPrefix + value;
}

var parseAction = function(value) {
	return value.split(" ")[1];
}

var timelineStrat = new Object();
timelineStrat.getStrat = function(){
	return [
		{
			"from":"returnValue/values",
			"to":"",
			"map":[
				{
					"from":"",
					"to":"events",
					"iterate":[
						{
							"from":"author",
							"to":"author",
							"filter":"Students"
						},
						{
							"from":"author",
							"to":"filterValue"
						},
						{
							"value":"Students",
							"to":"filterTag"
						},
						{
							"from":"icon",
							"to":"icon",
							"appendFunction":addImagesFolder
						},
						{
							"from":"title",
							"to":"title",
							"appendFunction":parseTitle
						},
						{
							"remap":1,
							"from":"title",
							"to":"action",
							"appendFunction":parseAction
						},
						{
							"from":"author",
							"to":"textColor",
							"toList":studentColours,
							"tag":"Students",
							"legend":"Students",
							"toType":"colour"
						},
						{
							"from":"title",
							"to":"header"
						},
						{
							"from":"description",
							"to":"description"
						},
						{
							"from":"image",
							"to":"image"
						},
						{
							"from":"link",
							"to":"link"
						},
						{
							"from":"startdate",
							"to":"start",
							"appendFunction":simParseDate
						},
						{
							"from":"enddate",
							"to":"end",
							"condition":hasEndDate,
							"appendFunction":simParseDate
						}
					],
					"legend":[
						/*{
							"legend":"Students",
							"from":"author",
							"to":"textColor",
							"toType":"colour"
						},*/
						{
							"legend":"Actions",
							"from":"action",
							"to":"icon",
							"toType":"image"
						}
					]
				},
				{
					"remap":1,
					"from":"events",
					"to":"stats",
					"unique":1,
					"iterate":[
						{
							"from":"start",
							"to":"lastDate",
							"appendFunction":laterDate
						},
						{
							"from":"start",
							"to":"firstDate",
							"appendFunction":earlierDate
						}
					]
				}
			]
		}
	];
}














































/*partitionStrat.js*/
var noName = function(value) {
	return (value ? value : "??");
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var colourList2 = {
	"author":studentColours,
	"activity":d3.scale.getcategory60b(),
	"workItem":d3.scale.getcategory60c().concat(d3.scale.getcategory60c())
}

var partitionTags = {
	"author":"Students",
	"activity":"Activity",
	"workItem":"workItem"
}

var partitionLegends = {
	"author":"Students",
	"activity":"Activity",
	"workItem":null
}

var partitionStrat = new Object();

partitionStrat.addOptions = function() {
	addOption("col1from", "col1", ["author","activity","workItem"]);
	addOption("col2from", "col2", ["activity","author","workItem"]);
	addOption("col3from", "col3", ["workItem","author","activity"]);
}

partitionStrat.getStrat = function() {
	return [
		{
			"value":"Time spent",
			"to":"unitLabel"
		},
		{
			"value":"hours",
			"to":"unit"
		},
		{
			"from":"returnValue/values",
			"to":"tempValues",
			"condition":countNotZero,
			"iterate":[
				{
					"dataFunction":getStudentLabel,
					"to":"author",
					"filter":"Students"
				},
				{
					"from":"activity",
					"to":"activity",
					"filter":"Activity"
				},
				{
					"from":"workItem",
					"to":"workItem",
					"filter":"workItem"
				},
				{
					"from":"count",
					"to":"count"
				}
			]
		},
		{
			"remap":1,
			"from":"tempValues",
			"to":"children",
			"unique":[
				{
					"from":getOption("col1from"),
					"to":"name",
					"appendFunction":noName
				}
			],
			"iterate":[
				{
					"remap":1,
					"from":"name",
					"to":"colour",
					"toList":colourList2[getOption("col1from")],
					"tag":partitionTags[getOption("col1from")],
					"legend":partitionLegends[getOption("col1from")],
					"toType":"colour"
				},
				{
					"remap":1,
					"from":"name",
					"to":"filterValue"
				},
				{
					"value":partitionTags[getOption("col1from")],
					"to":"filterTag"
				},
				{
					"from":"",
					"to":"children",
					"unique":[
						{
							"from":getOption("col2from"),
							"to":"name",
							"appendFunction":noName
						}
					],
					"iterate":[
						{
							"remap":1,
							"from":"name",
							"to":"colour",
							"toList":colourList2[getOption("col2from")],
							"tag":partitionTags[getOption("col2from")],
							"legend":partitionLegends[getOption("col2from")],
							"toType":"colour"
						},
						{
							"remap":1,
							"from":"name",
							"to":"filterValue"
						},
						{
							"value":partitionTags[getOption("col2from")],
							"to":"filterTag"
						},
						{
							"from":"",
							"to":"children",
							"unique":[
								{
									"from":getOption("col3from"),
									"to":"name",
									"appendFunction":noName
								}
							],
							"iterate":[
								{
									"remap":1,
									"from":"name",
									"to":"colour",
									"toList":colourList2[getOption("col3from")],
									"tag":partitionTags[getOption("col3from")],
									"legend":partitionLegends[getOption("col3from")],
									"toType":"colour"
								},
								{
									"remap":1,
									"from":"name",
									"to":"filterValue"
								},
								{
									"value":partitionTags[getOption("col3from")],
									"to":"filterTag"
								},
								{
									"from":"count",
									"to":"value",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		}
	];
}












































/*forceStrat.js*/
  function isCircle(d) {
	return isNaN(d.shape) || d.shape < 2.5
  }

var makePair = function (fromObj, toObj) {
	var x = fromObj.author1;
	var y = fromObj.author2;
	if (x > y) {
		var temp = x;
		x = y;
		y = temp;
	}
	return x + " - " + y;
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var nanIsZero = function (newValue, oldValue) {
	return (isNaN(oldValue)) ? 0 : oldValue;
}

var isNotFromSelf = function(obj) {
	if(obj == null) return false;
	return (obj.author1 != obj.author2);
}

var isFromSelf = function(obj) {
	if(obj == null) return false;
	return (obj.author1 == obj.author2);
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var addThree = function(value) {
	return value + 3;
}

var forceStrat = new Object();
forceStrat.getStrat = function(){
	return [
		{
			"from":"returnValue",
			"to":"",
			"map":[
				{
					"from":"values",
					"to":"tempValues",
					"condition":countNotZero,
					"iterate":[
						{
							"from":"",
							"to":"",
							"filter":"Students",
							"map":[
								{
									"dataFunction":getAuthor1Label,
									"to":"author1"
								},
								{
									"dataFunction":getAuthor2Label,
									"to":"author2"
								}
							]
						},
						{
							"from":"activitiesType",
							"to":"type",
							"filter":"CommType"
						},
						{
							"from":"count",
							"to":"count"
						}
					]
				},
				{
					"remap":1,
					"from":"tempValues",
					"to":"",
					"map":[
						{
							"from":"",
							"to":"nodes",
							"condition":isNotFromSelf,
							"unique":[
								{
									"from":"author1",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"sent",
									"appendFunction":addToOldValue
								},
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								},
								{
									"from":"author1",
									"index":"people"
								},
								{
									"from":"author1",
									"to":"filterValue"
								},
								{
									"value":"Students",
									"to":"filterTag"
								}
							]
						},
						{
							"from":"",
							"to":"nodes",
							"condition":isNotFromSelf,
							"unique":[
								{
									"from":"author2",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"received",
									"appendFunction":addToOldValue
								},
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								},
								{
									"from":"author2",
									"index":"people"
								},
								{
									"from":"author2",
									"to":"filterValue"
								},
								{
									"value":"Students",
									"to":"filterTag"
								}
							]
						},
						{
							"to":"nodes",
							"iterate":[
								{
									"from":"sent",
									"to":"sent",
									"appendFunction":nanIsZero //if sent hasn't been set, set it to zero
								},
								{
									"from":"received",
									"to":"received",
									"appendFunction":nanIsZero //if received hasn't been set, set it to zero
								},
								{
									"from":"title",
									"to":"colour",
									"toList":studentColours,
									"tag":"Students",
									"legend":"Students",
									"toType":"colour"
								},
								{
									"value":"1",
									"to":"shape"
								},
								{
									"from":"messages",
									"to":"size",
									"format":1
								}
							]
						},
						{
							"from":"",
							"to":"links",
							"unique":[
								{
									"dataFunction":makePair,
									"to":"pair"
								}
							],
							"iterate":[
								{
									"from":"author1",
									"to":"source",
									"index":"people"
								},
								{
									"from":"author2",
									"to":"target",
									"index":"people"
								},
								{
									"from":"count",
									"to":"distance",
									"appendFunction":addToOldValue,
									"format":1
								},
								{
									"from":"count",
									"to":"strength",
									"appendFunction":addToOldValue,
									"format":1
								},
								{
									"from":"count",
									"to":"width",
									"appendFunction":addToOldValue,
									"format":1
								}
							]
						}
					]
				}
			]
		}
	];
}












































/*commWheelStrat.js*/
var noName = function(value) {
	return (value ? value : "??");
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var colourList = {
	"author1":studentColours,
	"author2":studentColours,
	"activitiesType":d3.scale.getcategory60c()
}

var tagList = {
	"author1":"Students",
	"author2":"Students",
	"activitiesType":"CommType"
}

var commWheelStrat = Object();

commWheelStrat.addOptions = function() {
	addOption("commcol1from", "commcol1", ["author1","author2","activitiesType"]);
	addOption("commcol2from", "commcol2", ["author2","author1","activitiesType"]);
	addOption("commcol3from", "commcol3", ["activitiesType","author1","author2"]);
}

commWheelStrat.getStrat = function() {
	return [
		{
			"value":"Messages",
			"to":"unitLabel"
		},
		{
			"value":"",
			"to":"unit"
		},
		{
			"from":"returnValue/values",
			"to":"tempValues",
			"condition":countNotZero,
			"iterate":[
				{
					"from":"",
					"to":"",
					"filter":"Students",
					"map":[
						{
							"dataFunction":getAuthor1Label,
							"to":"author1"
						},
						{
							"dataFunction":getAuthor2Label,
							"to":"author2"
						}
					]
				},
				{
					"from":"activitiesType",
					"to":"activitiesType",
					"filter":"CommType"
				},
				{
					"from":"count",
					"to":"count"
				}
			]
		},
		{
			"remap":1,
			"from":"tempValues",
			"to":"children",
			"unique":[
				{
					"from":getOption("commcol1from"),
					"to":"name",
					"appendFunction":noName
				}
			],
			"iterate":[
				{
					"remap":1,
					"from":"name",
					"to":"colour",
					"toList":colourList[getOption("commcol1from")],
					"tag":tagList[getOption("commcol1from")],
					"legend":tagList[getOption("commcol1from")],
					"toType":"colour"
				},
				{
					"remap":1,
					"from":"name",
					"to":"filterValue"
				},
				{
					"value":tagList[getOption("commcol1from")],
					"to":"filterTag"
				},
				{
					"from":"",
					"to":"children",
					"unique":[
						{
							"from":getOption("commcol2from"),
							"to":"name",
							"appendFunction":noName
						}
					],
					"iterate":[
						{
							"remap":1,
							"from":"name",
							"to":"colour",
							"toList":colourList[getOption("commcol2from")],
							"tag":tagList[getOption("commcol2from")],
							"legend":tagList[getOption("commcol2from")],
							"toType":"colour"
						},
						{
							"remap":1,
							"from":"name",
							"to":"filterValue"
						},
						{
							"value":tagList[getOption("commcol2from")],
							"to":"filterTag"
						},
						{
							"from":"",
							"to":"children",
							"unique":[
								{
									"from":getOption("commcol3from"),
									"to":"name",
									"appendFunction":noName
								}
							],
							"iterate":[
								{
									"remap":1,
									"from":"name",
									"to":"colour",
									"toList":colourList[getOption("commcol3from")],
									"tag":tagList[getOption("commcol3from")],
									"legend":tagList[getOption("commcol3from")],
									"toType":"colour"
								},
								{
									"remap":1,
									"from":"name",
									"to":"filterValue"
								},
								{
									"value":tagList[getOption("commcol3from")],
									"to":"filterTag"
								},
								{
									"from":"count",
									"to":"value",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		}
	];
}









































/*chordStrat.js*/
var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var nanIsZero = function (newValue, oldValue) {
	return (isNaN(oldValue)) ? 0 : oldValue;
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var chordStrat = new Object();
chordStrat.getStrat = function(){
	return [
		{
			"from":"returnValue",
			"to":"",
			"map":[
				{
					"from":"values",
					"to":"tempValues",
					"condition":countNotZero,
					"iterate":[
						{
							"from":"",
							"to":"",
							"filter":"Students",
							"map":[
								{
									"dataFunction":getAuthor1Label,
									"to":"author1"
								},
								{
									"dataFunction":getAuthor2Label,
									"to":"author2"
								}
							]
						},
						{
							"from":"activitiesType",
							"to":"type",
							"filter":"CommType"
						},
						{
							"from":"count",
							"to":"count"
						}
					]
				},
				{
					"remap":1,
					"from":"tempValues",
					"to":"",
					"map":[
						{
							"from":"",
							"to":"slices",
							"unique":[
								{
									"from":"author1",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"sent",
									"appendFunction":addToOldValue
								},
								{
									"from":"author1",
									"index":"people"
								}
							]
						},
						{
							"from":"",
							"to":"slices",
							"unique":[
								{
									"from":"author2",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"received",
									"appendFunction":addToOldValue
								},
								{
									"from":"author2",
									"index":"people"
								}
							]
						},
						{
							"to":"slices",
							"iterate":[
								{
									"from":"sent",
									"to":"sent",
									"appendFunction":nanIsZero //if sent hasn't been set, set it to zero
								},
								{
									"from":"received",
									"to":"received",
									"appendFunction":nanIsZero //if received hasn't been set, set it to zero
								},
								{
									"from":"title",
									"to":"colour",
									"toList":studentColours,
									"tag":"Students",
									"legend":"Students",
									"toType":"colour"
								},
								{
									"remap":1,
									"from":"title",
									"to":"filterValue"
								},
								{
									"value":"Students",
									"to":"filterTag"
								}
							]
						},
						{
							"from":"",
							"to":"chords",
							"unique":[
								{
									"from":"author1",
									"to":"source",
									"index":"people"
								},
								{
									"from":"author2",
									"to":"target",
									"index":"people"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"width",
									"appendFunction":addToOldValue
								},
								/*{
									"from":"",
									"to":"subChords",
									"unique":[
										{
											"from":"type",
											"to":"colour",
											"toList":["#ff0000", "#00ff00", "#0000ff"],
											"tag":"Activities",
											"legend":"Activities",
											"toType":"colour"
										}
									],
									"iterate":[
										{
											"from":"count",
											"to":"width",
											"appendFunction":addToOldValue
										}
									]
								}*/
							]
						},
						{
							"from":"",
							"to":"totals",
							"unique":1,
							"iterate":[
								{
									"from":"count",
									"to":"totalMessages",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		}
	];
}










































/*activitiesTimelineStrat.js*/
var parseDate = function(value) {
	if(!value) return "";
	var dateAndTime = value.split("T");
	var ymd = dateAndTime[0].split("-");
	var time = dateAndTime[1].split(".");
	var retVal = ymd[1] + " " + ymd[2] + " " + ymd[0] + " " + time[0];
	return retVal;
}

var laterDate = function (newDate, oldDate) {
	//newDate = parseDate(newDate);
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 > d2) ? newDate : oldDate;
	return retVal;
}

var earlierDate = function (newDate, oldDate) {
	//newDate = parseDate(newDate);
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 < d2) ? newDate : oldDate;
	return retVal;
}

var parseTitle = function(value) {
	if(!value) return "";
	var val = document.createElement("a");
	val.innerHTML = value;
	return $(val.children[0]).text();
}

var parseColour = function(value) {
	if(!value) return "";
	var val = document.createElement("a");
	val.innerHTML = value;
	return val.children[0].style.color;
}

var hasEndDate = function(fromObj) {
	return (fromObj.startdate == fromObj.enddate || fromObj.enddate == undefined) ? false : true;
};

var addImagesFolder = function(value) {
	return imageURLPrefix + value;
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var generateDescription = function(obj) {
	return obj.count + " " + obj.activitiesType;
}

var activitiesTimelineStrat = Object();
activitiesTimelineStrat.getStrat = function() {
	return [
		{
			"from":"",
			"to":"",
			"map":[
				{
					"from":"returnValue/values",
					"to":"events",
					"condition":countNotZero,
					"unique":[
						{
							"from":"",
							"to":"",
							"filter":"Students",
							"map":[
								{
									"dataFunction":getAuthor1Label,
									"to":"author1"
								},
								{
									"dataFunction":getAuthor2Label,
									"to":"author2"
								}
							]
						},
						{
							"from":"activitiesType",
							"to":"activitiesType",
							"filter":"CommType"
						},
						{
							"from":"date",
							"to":"start",
							"appendFunction":parseDate
						}
					],
					"iterate":[
						{
							"from":"activitiesType",
							"to":"icon",
							"toList":["dark-green-circle.png", "dark-red-circle.png", "dark-blue-circle.png"],
							"tag":"activitiesType",
							"appendFunction":addImagesFolder,
							"legend":"Activities Type",
							"toType":"image"
						},
						{
							"remap":1,
							"dataFunction":makePair,
							"to":"title"
						},
						{
							"dataFunction":getAuthor1Label,
							"to":"tempauthor"
						},
						{
							"remap":1,
							"from":"tempauthor",
							"to":"textColor",
							"toList":studentColours,
							"tag":"Students",
							"legend":"Students",
							"toType":"colour"
						},
						{
							"remap":1,
							"dataFunction":makePair,
							"to":"header"
						},
						{
							"dataFunction":generateDescription,
							"to":"description"
						},
						{
							"value":"",
							"to":"image"
						},
						{
							"from":"_eQualifiedClassName",
							"to":"link"
						},
						{
							"remap":1,
							"from":"author1",
							"to":"filterValue"
						},
						{
							"remap":1,
							"from":"author2",
							"to":"filterValue2"
						},
						{
							"value":"Students",
							"to":"filterTag"
						},
						{
							"value":"Students",
							"to":"filterTag2"
						}
					]
				},
				{
					"remap":1,
					"from":"events",
					"to":"stats",
					"unique":1,
					"iterate":[
						{
							"from":"start",
							"to":"lastDate",
							"appendFunction":laterDate
						},
						{
							"from":"start",
							"to":"firstDate",
							"appendFunction":earlierDate
						}
					]
				}
			]
		}
	];
}









































/*timeAndStatsStrat.js*/

  function isCircle(d) {
	return isNaN(d.shape) || d.shape < 2.5
  }

var makePair = function (fromObj, toObj) {
	var x = fromObj.author1;
	var y = fromObj.author2;
	if (x > y) {
		var temp = x;
		x = y;
		y = temp;
	}
	return x + " - " + y;
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var nanIsZero = function (newValue, oldValue) {
	return (isNaN(oldValue)) ? 0 : oldValue;
}

var isNotFromSelf = function(obj) {
	if(obj == null) return false;
	return (obj.author1 != obj.author2);
}

var isFromSelf = function(obj) {
	if(obj == null) return false;
	return (obj.author1 == obj.author2);
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var addThree = function(value) {
	return value + 3;
}

var timeAndStatsStrat = new Object();
timeAndStatsStrat.getStrat = function() {
	return [
		{
			"from":"ActivityStats",
			"to":"",
			"map":[
				{
					"from":"values",
					"to":"tempValues",
					"condition":countNotZero,
					"iterate":[
						{
							"from":"",
							"to":"",
							"filter":"Students",
							"map":[
								{
									"dataFunction":getAuthor1Label,
									"to":"author1"
								},
								{
									"dataFunction":getAuthor2Label,
									"to":"author2"
								}
							]
						},
						{
							"from":"activitiesType",
							"to":"activitiesType",
							"filter":"CommType"
						},
						{
							"from":"count",
							"to":"count"
						}
					]
				},
				{
					"remap":1,
					"from":"tempValues",
					"to":"",
					"map":[
						{
							"from":"",
							"to":"people",
							"condition":isNotFromSelf,
							"unique":[
								{
									"from":"author1",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"sent",
									"appendFunction":addToOldValue
								},
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								}
							]
						},
						{
							"from":"",
							"to":"people",
							"condition":isNotFromSelf,
							"unique":[
								{
									"from":"author2",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"received",
									"appendFunction":addToOldValue
								}
							]
						},
						{
							"from":"",
							"to":"links",
							"unique":[
								{
									"dataFunction":makePair,
									"to":"pair"
								}
							],
							"iterate":[
								{
									"from":"author1",
									"to":"source"
								},
								{
									"from":"author2",
									"to":"target"
								},
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		},
		{
			"from":"timeActivity",
			"to":"",
			"map":[
				{
					"from":"values",
					"to":"tempValues2",
					"condition":countNotZero,
					"iterate":[
						{
							"dataFunction":getStudentLabel,
							"to":"author",
							"filter":"Students"
						},
						{
							"from":"workItem",
							"to":"workItem",
							"filter":"workItem"
						},
						{
							"from":"activity",
							"to":"type",
							"filter":"Activity"
						},
						{
							"from":"count",
							"to":"count"
						}
					]
				},
				{
					"remap":1,
					"from":"tempValues2",
					"to":"",
					"map":[
						{
							"from":"",
							"to":"people",
							"unique":[
								{
									"from":"author",
									"to":"title"
								}
							],
							"iterate":[
								{
									"value":0,
									"to":"messages",
									"appendFunction":addToOldValue
								}
							]
						},
						{
							"from":"",
							"to":"workItems",
							"unique":[
								{
									"from":"workItem",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"size",
									"appendFunction":addToOldValue,
									"format":1
								}
							]
						},
						{
							"from":"",
							"to":"links",
							"unique":[
								{
									"from":"author",
									"to":"source"
								},
								{
									"from":"workItem",
									"to":"target"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		},
		{
			"remap":1,
			"from":"people",
			"to":"nodes",
			"iterate":[
				{
					"from":"title",
					"to":"title"
				},
				{
					"from":"title",
					"index":"people"
				},
				{
					"from":"sent",
					"to":"sent",
					"appendFunction":nanIsZero //if sent hasn't been set, set it to zero
				},
				{
					"from":"received",
					"to":"received",
					"appendFunction":nanIsZero //if received hasn't been set, set it to zero
				},
				{
					"from":"title",
					"to":"colour",
					"toList":studentColours,
					"tag":"Students",
					"legend":"Students",
					"toType":"colour"
				},
				{
					"from":"messages",
					"to":"size",
					"appendFunction":nanIsZero,
					"format":1
				},
				{
					"value":1,
					"to":"shape"
				},
				{
					"from":"title",
					"to":"filterValue"
				},
				{
					"value":"Students",
					"to":"filterTag"
				}
			]
		},
		{
			"remap":1,
			"from":"workItems",
			"to":"nodes",
			"append":1,
			"iterate":[
				{
					"from":"title",
					"to":"title"
				},
				{
					"from":"title",
					"index":"people"
				},
				{
					"from":"sent",
					"to":"sent",
					"appendFunction":nanIsZero //if sent hasn't been set, set it to zero
				},
				{
					"from":"received",
					"to":"received",
					"appendFunction":nanIsZero //if received hasn't been set, set it to zero
				},
				{
					"from":"title",
					"to":"colour",
					"toList":d3.scale.getcategory60c().concat(d3.scale.getcategory60c()),
					"tag":"workItem",
					//"legend":"workItem",
					"toType":"colour"
				},
				{
					"from":"size",
					"to":"size"
				},
				{
					"value":4,
					"to":"shape"
				},
				{
					"from":"title",
					"to":"filterValue"
				},
				{
					"value":"workItem",
					"to":"filterTag"
				}
			]
		},
		{
			"to":"links",
			"iterate":[
				{
					"from":"source",
					"to":"source",
					"index":"people"
				},
				{
					"from":"target",
					"to":"target",
					"index":"people"
				},
				{
					"from":"messages",
					"to":"distance",
					"format":1,
					"mean":100,
					"min":50
				},
				/*{
					"from":"messages",
					"to":"strength",
					"format":1
				},*/
				{
					"from":"messages",
					"to":"width",
					"format":1
				}
			]
		}
	];
}







































/*streamStrat.js*/
var parseDate = function(value) {
	if(!value) return "";
	var dateAndTime = value.split("T");
	var ymd = dateAndTime[0].split("-");
	var time = dateAndTime[1].split(".");
	var retVal = ymd[1] + " " + ymd[2] + " " + ymd[0] + " " + time[0];
	return retVal;
}

var laterDate = function (newDate, oldDate) {
	//newDate = parseDate(newDate);
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 > d2) ? newDate : oldDate;
	return retVal;
}

var earlierDate = function (newDate, oldDate) {
	//newDate = parseDate(newDate);
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 < d2) ? newDate : oldDate;
	return retVal;
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var streamStrat = new Object();


streamStrat.getStrat = function() {
	return [
		{
			"from":"returnValue/values",
			"to":"tempValues",
			"condition":countNotZero,
			"iterate":[
				{
					"dataFunction":getStudentLabel,
					"to":"author",
					"filter":"Students"
				},
				{
					"from":"activity",
					"to":"activity",
					"filter":"Activity"
				},
				{
					"from":"workItem",
					"to":"workItem",
					"filter":"workItem"
				},
				{
					"from":"count",
					"to":"count"
				},
				{
					"from":"date",
					"to":"date",
					"appendFunction":parseDate
				}
			]
		},
		{
			"remap":1,
			"from":"tempValues",
			"to":"paths",
			"unique":[
				{
					"from":"author",
					"to":"title"
				}
			],
			"iterate":[
				{
					"from":"author",
					"to":"colour",
					"toList":studentColours,
					"tag":"Students",
					"legend":"Students",
					"toType":"colour"
				},
				{
					"from":"author",
					"to":"filterValue"
				},
				{
					"value":"Students",
					"to":"filterTag"
				},
				{
					"from":"",
					"to":"days",
					"unique":[
						{
							"from":"date",
							"to":"date"
						}
					],
					"iterate":[
						{
							"from":"count",
							"to":"value",
							"appendFunction":addToOldValue
						}
					]
				}
			]
		},
		{
			"remap":1,
			"from":"tempValues",
			"to":"stats",
			"unique":1,
			"iterate":[
				{
					"from":"date",
					"to":"lastDate",
					"appendFunction":laterDate
				},
				{
					"from":"date",
					"to":"firstDate",
					"appendFunction":earlierDate
				}
			]
		}
	]
}









































/*partition.js*/
var myPartition = new Object();
myPartition.displayVisualization = function(container, json) {

var w = 1120,
    h = 600,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h]);

var vis = d3.select("#" + container).append("div")
    .attr("class", "chart")
    .style("width", w + "px")
    .style("height", h + "px")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var partition = d3.layout.partition();

	var root = json;
  var g = vis.selectAll("g")
      .data(partition.nodes(root))
    .enter().append("svg:g")
      .attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; })
      .on("click", click);

  var kx = w / root.dx,
      ky = h / 1;

  g.append("svg:rect")
      .attr("width", root.dy * kx)
      .attr("height", function(d) { return d.dx * ky; })
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
	  .style("fill", function(d) { return d.colour; })
		.append("title")
		.text(function(d) { return (d.name ? "Name: " + d.name + "\n" : "") + json.unitLabel + ": " + d.value + " " + json.unit; });

  g.append("svg:text")
      .attr("transform", transform)
      .attr("dy", ".35em")
      .style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; })
      .text(function(d) { return (d.name ? d.name : "Total: " + d.value + " " + json.unit); })

  d3.select(window)
      .on("click", function() { click(root); })

  function click(d) {
	filterObject(d, d3.event.shiftKey);
    //if (!d.children) return;

    /*kx = (d.y ? w - 40 : w) / (1 - d.y);
    ky = h / d.dx;
    x.domain([d.y, 1]).range([d.y ? 40 : 0, w]);
    y.domain([d.x, d.x + d.dx]);

    var t = g.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; });

    t.select("rect")
        .attr("width", d.dy * kx)
        .attr("height", function(d) { return d.dx * ky; });

    t.select("text")
        .attr("transform", transform)
        .style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; });

    d3.event.stopPropagation();*/
  }

  function transform(d) {
    return "translate(8," + d.dx * ky / 2 + ")";
  }
}










































/*force.js*/

var lastmovex = 0;
var lastmovey = 0;
var mdown = 0;

function nodeEnter() {
	return function(d) {
		console.log(force.links);
	}
}

var generateDescription = function (d) {
 	return "Sent: " + d.sent + "<br/>Received: " + d.received + "<br/>Total: " + d.messages + (d.selfMessages ? ("<br/>Plus " + d.selfMessages + " message" + ((d.selfMessages == 1) ? "" : "s") + " to self") : "");
}

function nodeClick() {
	return function(d){
		//mdown = 0
		//displayInfoWindow(d.title, generateDescription(d));
		filterObject(d, d3.event.shiftKey);
	};
}

var myForce = new Object();

myForce.defaults = {
"defaultValues":{
		"charge":-150,
		"distance":100,
		"strength":4,
		"size":8,
		"area":220,
		"width":15,
		"shape":0
	},
	"mean":{
		"charge":-120,
		"distance":100,
		"strength":4,
		"size":8,
		"area":220,
		"width":15,
		"shape":5
	},
	"deviation":{
		"charge":50,
		"distance":15,
		"strength":0.4,
		"size":3,
		"area":100,
		"width":8,
		"shape":2
	},
	"min":{
		"distance":0,
		"strength":0,
		"size":0.1,
		"area":0,
		"width":1,
		"shape":3
	},
	"max":{
	},
	"inverted":{
		"distance":1
	},
	"direct":{
		"name":1,
		"colour":1,
		"source":1,
		"target":1
	}
}

myForce.displayVisualization = function(container, json) {
	
	var width = 700,
		height = 400;

	var force = d3.layout.force()
		.charge(function (d) {
			return isNaN(d.charge) ? myForce.defaults.defaultValues.charge : d.charge;
		})
		.linkDistance(function (d) {
			return isNaN(d.distance) ? myForce.defaults.defaultValues.distance : d.distance;
		})
		.linkStrength(function (d) {
			return isNaN(d.strength) ? myForce.defaults.defaultValues.strength : d.strength;
		})
		.size([width, height])
		.gravxy(width/2, height/2);

	var svg = d3.select("#" + container).append("svg")
		.attr("width", width)
		.attr("height", height);
		//.onClick = derp;
		
		document.getElementById(container).onmousedown = function(e){
			lastmovex = e.clientX;
			lastmovey = e.clientY;
			mdown = 1;
		};
		document.getElementById(container).onmouseup = function(e) {
			mdown = 0;
		};
		//document.getElementById(container).onmouseout = function(e) {
			//mdown = 0;
		//};
		document.getElementById(container).onmousemove = function(e) {
			if(force.alpha() == 0) { force.alpha(.0051); }
			if(mdown) {
				var deltax = e.clientX - lastmovex;
				var deltay = e.clientY - lastmovey;
				lastmovex = e.clientX;
				lastmovey = e.clientY;
				force.gravxy(force.gravxy().gx + deltax, force.gravxy().gy + deltay);
				force.alpha(0.05);
			}
		};
	
	force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll("line.link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) {
			return Math.sqrt(isNaN(d.width) ? myForce.defaults.defaultValues.width : d.width);
		});
		
	var circleNodes = [];
	var polyNodes = [];
	for(var i in json.nodes) {
		if(isCircle(json.nodes[i])) {
			circleNodes[circleNodes.length] = json.nodes[i];
		}
		else {
			polyNodes[polyNodes.length] = json.nodes[i];
		}
	}

  var circleNode = svg.selectAll("circle.node")
      .data(circleNodes)
    .enter().append("circle")
      .attr("class", "node")
	  .attr("r", function(d) {
			return isNaN(d.size) ? myForce.defaults.defaultValues.size : d.size;
		})
      .style("fill", function(d) {
			return d.colour; 
		})
		.on("mouseup", nodeClick())
		.on("mousemove", function(d) {
			for(var i in force.links()) {
				if(force.links()[i].source.index == d.index || force.links()[i].target.index == d.index) {
					force.links()[i].highlighted = 1;
				}
			}
			if(mdown) {
				var deltax = e.clientX - lastmovex;
				var deltay = e.clientY - lastmovey;
				lastmovex = e.clientX;
				lastmovey = e.clientY;
				force.gravxy(force.gravxy().gx + deltax, force.gravxy().gy + deltay);
			}
			if(force.alpha() == 0) { force.alpha(.0051); }
		})
		.on("mouseout", function(d) {
			for(var i in force.links()) {
				if(force.links()[i].source.index == d.index || force.links()[i].target.index == d.index) {
					force.links()[i].highlighted = 0;
				}
			}
			if(force.alpha() == 0) { force.alpha(.0051); }
		});

  circleNode.append("title")
      .text(function(d) { return d.title; });
	  
	var polyNode = svg.selectAll("polygon.node")
      .data(polyNodes)
    .enter().append("polygon")
      .attr("class", "node")
      .style("fill", function(d) {
			return d.colour; 
		})
		.on("mouseup", nodeClick())
		.on("mousemove", function(d) {
			for(var i in force.links()) {
				if(force.links()[i].source.index == d.index || force.links()[i].target.index == d.index) {
					force.links()[i].highlighted = 1;
				}
			}
			if(mdown) {
				var deltax = e.clientX - lastmovex;
				var deltay = e.clientY - lastmovey;
				lastmovex = e.clientX;
				lastmovey = e.clientY;
				force.gravxy(force.gravxy().gx + deltax, force.gravxy().gy + deltay);
			}
			if(force.alpha() == 0) { force.alpha(.0051); }
		})
		.on("mouseout", function(d) {
			for(var i in force.links()) {
				if(force.links()[i].source.index == d.index || force.links()[i].target.index == d.index) {
					force.links()[i].highlighted = 0;
				}
			}
			if(force.alpha() == 0) { force.alpha(.0051); }
		});

  polyNode.append("title")
      .text(function(d) { return d.title; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
		//.style("stroke-opacity", function(d) { return d.highlighted ? 1 : 0.6 })
		.style("stroke", function(d) { return d.highlighted ? '#000' : '#999' });

	polyNode.attr("points", function(d) {
		var shape = isNaN(d.shape) ? 3 : Math.round(d.shape);
		var size = isNaN(d.size) ? myForce.defaults.defaultValues.size : d.size;
		var inc = (2 * Math.PI) / shape;
		var currAngle = inc;
		var points = d.x + "," + (d.y - size);
		var x;
		var y;
		for(var i = 0; i < shape; i++) {
			x = Math.sin(currAngle);
			y = Math.cos(currAngle);
			x = x * size;
			y = y * size;
			points = points + " " + (d.x - Math.sin(currAngle) * size) + "," + (d.y - Math.cos(currAngle) * size);
			currAngle = currAngle + inc;
		}
		return points;
	});
	circleNode.attr("cx", function (d) { return d.x; })
		.attr("cy", function (d) { return d.y; });
  });
}














































/*chord.js*/
var generateDescription = function (d) {
	var total = d.sent + d.received;
 	return "Sent: " + d.sent + "<br/>Received: " + d.received + "<br/>Total: " + total + (d.selfMessages ? ("<br/>Plus " + d.selfMessages + " message" + ((d.selfMessages == 1) ? "" : "s") + " to self") : "");
}

function groupClick() {
	return function(d){
		//displayInfoWindow(d.title, generateDescription(d));
		filterObject(d, d3.event.shiftKey);
	};
}

function averageColours(c1, c2, w1, w2) {
	var tw = w1 + w2;
	if(isNaN(tw)) {
		tw = 1;
		w1 = 0.5;
		w2 = 0.5;
	}
	w1 = w1/tw;
	w2 = w2/tw;
	var c1a = c1.split("");
	var c2a = c2.split("");
	var c11 = c1a[1] + "" + c1a[2];
	var c12 = c1a[3] + "" + c1a[4];
	var c13 = c1a[5] + "" + c1a[6];
	var c21 = c2a[1] + "" + c2a[2];
	var c22 = c2a[3] + "" + c2a[4];
	var c23 = c2a[5] + "" + c2a[6];
	c11 = parseInt(c11, 16);
	c12 = parseInt(c12, 16);
	c13 = parseInt(c13, 16);
	c21 = parseInt(c21, 16);
	c22 = parseInt(c22, 16);
	c23 = parseInt(c23, 16);
	c11 = Math.round((c11*w1 + c21*w2));
	c12 = Math.round((c12*w1 + c22*w2));
	c13 = Math.round((c13*w1 + c23*w2));
	c11 = c11.toString(16);
	c12 = c12.toString(16);
	c13 = c13.toString(16);
	c11 = (c11.split("").length < 2 ? "0" + c11 : c11);
	c12 = (c12.split("").length < 2 ? "0" + c12 : c12);
	c13 = (c13.split("").length < 2 ? "0" + c13 : c13);
	var retVal = "#" + c11 + c12 + c13;
	return retVal;
}

var myChord = new Object();
myChord.displayVisualization = function (container, json) {

	

	// From http://mkweb.bcgsc.ca/circos/guide/tables/
	var chord = d3.layout.chord()
		.padding(.05)
		.sortSubgroups(d3.descending)
		.json(json);

	var width = 600,
		height = 600,
		innerRadius = Math.min(width, height) * .41,
		outerRadius = innerRadius * 1.1;

	var svg = d3.select("#" + container)
	  .append("svg")
		.attr("width", width)
		.attr("height", height)
	  .append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var c = svg.append("g")
	  .selectAll("path")
		.data(chord.groups)
	  .enter().append("path")
		.style("fill", function(d) { return d.colour;})
		.style("stroke", function(d) { return d.colour;})
		.attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
		.on("mouseover", fade(.1))
		.on("mouseout", fade(1))
		.on("mouseup", groupClick());
		
	c.append("title")
      .text(function(d) { return d.title; });

	var ticks = svg.append("g")
	  .selectAll("g")
		.data(chord.groups)
	  .enter().append("g")
	  .selectAll("g")
		.data(groupTicks)
	  .enter().append("g")
		.attr("transform", function(d) {
		  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
			  + "translate(" + outerRadius + ",0)";
		});

	ticks.append("line")
		.attr("x1", 1)
		.attr("y1", 0)
		.attr("x2", 5)
		.attr("y2", 0)
		.style("stroke", "#000");

	ticks.append("text")
		.attr("x", 8)
		.attr("dy", ".35em")
		.attr("text-anchor", function(d) {
		  return d.angle > Math.PI ? "end" : null;
		})
		.attr("transform", function(d) {
		  return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
		})
		.text(function(d) { return d.label; });

	var test = svg.append("g")
		.attr("class", "chord")
	  .selectAll("path")
		.data(chord.chords)
	  .enter().append("path")
		//.style("fill", function(d) { return chord.groups()[d.target.index].colour;})
		.style("fill", function(d) { return d.source.colour ? d.source.colour : averageColours(chord.groups()[d.source.index].colour, chord.groups()[d.target.index].colour, Math.abs(d.source.startAngle - d.source.endAngle), Math.abs(d.target.startAngle - d.target.endAngle)); })
		.attr("d", d3.svg.chord().radius(innerRadius))
		.style("opacity", 1);
		
		test.append("title")
      .text(function(d) { return d.name; });

	/** Returns an array of tick angles and labels, given a group. */
	function groupTicks(d) {
	  var k = (d.endAngle - d.startAngle) / d.value;
	  var step = Math.round(json.totals[0].totalMessages / 90);
	  step = (step ? step : 1);
	  return d3.range(0, d.value, step).map(function(v, i) {
		return {
		  "angle": v * k + d.startAngle,
		  "label": (json.totals[0].totalMessages < 40) ? v : (i % 5 ? null : v)
		};
	  });
	}

	/** Returns an event handler for fading a given chord group. */
	function fade(opacity) {
	  return function(g, i) {
		svg.selectAll("g.chord path")
			.filter(function(d) {
			  return d.source.index != i && d.target.index != i;
			})
		  .transition()
			.style("opacity", opacity);
	  };
	}
}

















































/*wheel.js*/
var textShowThreshold = 0.02;

var myWheel = Object();
myWheel.displayVisualization = function(container, json) {
var w = 840,
    h = w,
    r = w / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, r]),
    p = 5,
    duration = 1000;

var div = d3.select("#" + container);

div.select("img").remove();

var vis = div.append("svg")
    .attr("width", w + p * 2)
    .attr("height", h + p * 2)
  .append("g")
    .attr("transform", "translate(" + (r + p) + "," + (r + p) + ")");

var partition = d3.layout.partition()
    .sort(null)
    .value(function(d) { return 5.8 - d.depth; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  var nodes = partition.nodes(json);

  var path = vis.selectAll("path").data(nodes);
  var c = path.enter().append("path")
      .attr("id", function(d, i) { return "path-" + i; })
      .attr("d", arc)
      //.attr("fill-rule", "evenodd")
      .style("fill", colour)
      .on("click", click);
	  
	  c.append("title")
      .text(function(d) { return (d.name ? d.name : "") + " (" + d.value + ")"; });

	if(!json.hideText) {
  var text = vis.selectAll("text").data(nodes);
  var textEnter = text.enter().append("text")
      .style("fill-opacity", 1)
      .style("fill", function(d) {
        return brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
      })
      .attr("text-anchor", function(d) {
        return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
      })
      .attr("dy", ".2em")
      .attr("transform", function(d) {
        //var multiline = (d.name || "").split(" ").length > 1,
        var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
            rotate = angle;
        return "rotate(" + rotate + ")translate(" + (y(d.y) + p) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
      })
      .on("click", click);
  textEnter.append("tspan")
      .attr("x", 0)
      .text(function(d) { return d.depth ? d.name : ""; });
	  //.style("visibility", function(d) {return ((d.value / nodes[0].value) < textShowThreshold) ? "hidden" : "visible"});
	}
  /*textEnter.append("tspan")
      .attr("x", 0)
      .attr("dy", "1em")
      .text(function(d) { return d.depth ? d.name.split(" ")[1] || "" : ""; });*/

  function click(d) {
	displayInfoWindow(d.name, "Count: " + d.value);
    path.transition()
      .duration(duration)
      .attrTween("d", arcTween(d));

    // Somewhat of a hack as we rely on arcTween updating the scales.
    text
      .style("visibility", function(e) {
		return ((e.value / d.value) < textShowThreshold) ? "hidden" : (isParentOf(d, e) ? null : d3.select(this).style("visibility"));
        //return isParentOf(d, e) ? null : d3.select(this).style("visibility");
      })
      .transition().duration(duration)
      .attrTween("text-anchor", function(d) {
        return function() {
          return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        };
      })
      .attrTween("transform", function(d) {
        //var multiline = (d.name || "").split(" ").length > 1;
        return function() {
          var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
              rotate = angle;
          return "rotate(" + rotate + ")translate(" + (y(d.y) + p) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        };
      })
      .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
      .each("end", function(e) {
        d3.select(this).style("visibility", function(e) {
			return ((e.value / d.value) < textShowThreshold) ? "hidden" : (isParentOf(d, e) ? null : "hidden");
			//return isParentOf(d, e) ? null : "hidden"
		});
      });
  }
  
  click(nodes[0]);

function isParentOf(p, c) {
  if (p === c) return true;
  if (p.children) {
    return p.children.some(function(d) {
      return isParentOf(d, c);
    });
  }
  return false;
}

function colour(d) {
	if(!d.colour) {
  if (d.children) {
    // There is a maximum of two children!
    var colours = d.children.map(colour),
        a = d3.hsl(colours[0]),
        b = d3.hsl(colours[1]);
    // L*a*b* might be better here...
    return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
  }
  return d.colour || "#fff";
  }
  return d.colour;
}

// Interpolate the scales!
function arcTween(d) {
  var my = maxY(d),
      xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, my]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, r]);
  return function(d) {
    return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function maxY(d) {
  return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
}

// http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
function brightness(rgb) {
  return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
}
}










































/*Simile.js*/
var Timeline_urlPrefix='timeline/'; 
var imageURLPrefix=Timeline_urlPrefix + "images/";

/*==================================================
 *  Timeline API
 *
 *  This file will load all the Javascript files
 *  necessary to make the standard timeline work.
 *  It also detects the default locale.
 *
 *  Include this file in your HTML file as follows:
 *
 *    <script src="http://simile.mit.edu/timeline/api/scripts/timeline-api.js" type="text/javascript"></script>
 *
 *==================================================
 */
/*
window.__simile_api_state = "not-used";
window.setTimeout(function() {
    try {
        var div = document.createElement("div");
        div.style.fontSize = "12px";
        div.style.fontFamily = "sans-serif";
        div.style.position = "fixed";
        div.style.top = "25px";
        div.style.right = "25px";
        div.style.width = "20em";
        div.style.padding = "2em";
        div.style.backgroundColor = "#ffe080";
        div.style.zIndex = 1000000;
    
        if (window.__simile_api_state == "used") {
            div.innerHTML = 
                'Thank you for using <a href="http://www.simile-widgets.org/timeline/">SIMILE Timeline</a>. ' +
                'However, your page is referencing an old version of Timeline at a location soon to be deprecated. ' +
                'Please upgrade to the latest version at the latest location at <a href="http://www.simile-widgets.org/timeline/">http://www.simile-widgets.org/timeline/</a>.';
        } else {
            div.innerHTML = 
                'This web page is referencing an old version of the <a href="http://www.simile-widgets.org/timeline/">SIMILE Timeline API</a> but does not make use of it. ' +
                'This reference is taxing our bandwidth unnecessarily. Please remove it (and this message will go away). Thank you for your cooperation.';
        }
        document.body.insertBefore(div, document.body.firstChild);
    } catch (e) {
        window.setTimeout(arguments.callee, 5000);
    }
}, 10000);
*/

var Timeline = new Object();
Timeline.Platform = new Object();
    /*
        HACK: We need these 2 things here because we cannot simply append
        a <script> element containing code that accesses Timeline.Platform
        to initialize it because IE executes that <script> code first
        before it loads timeline.js and util/platform.js.
    */

(function() {
    var bundle = true;
    var javascriptFiles = [
        "timeline.js",
        
        "util/platform.js",
        "util/debug.js",
        "util/xmlhttp.js",
        "util/dom.js",
        "util/graphics.js",
        "util/date-time.js",
        "util/data-structure.js",
        "util/html.js",
        
        "units.js",
        "themes.js",
        "ethers.js",
        "ether-painters.js",
        "labellers.js",
        "sources.js",
        "layouts.js",
        "painters.js",
        "decorators.js"
    ];
    var cssFiles = [
        "timeline.css",
        "ethers.css",
        "events.css"
    ];
    
    var localizedJavascriptFiles = [
        "timeline.js",
        "labellers.js"
    ];
    var localizedCssFiles = [
    ];
    
    // ISO-639 language codes, ISO-3166 country codes (2 characters)
    var supportedLocales = [
        "cs",       // Czech
        "de",       // German
        "en",       // English
        "es",       // Spanish
        "fr",       // French
        "it",       // Italian
        "ru",       // Russian
        "se",       // Swedish
        "vi",       // Vietnamese
        "zh"        // Chinese
    ];
    
    try {
        var desiredLocales = [ "en" ];
        var defaultServerLocale = "en";
        
        var parseURLParameters = function(parameters) {
            var params = parameters.split("&");
            for (var p = 0; p < params.length; p++) {
                var pair = params[p].split("=");
                if (pair[0] == "locales") {
                    desiredLocales = desiredLocales.concat(pair[1].split(","));
                } else if (pair[0] == "defaultLocale") {
                    defaultServerLocale = pair[1];
                } else if (pair[0] == "bundle") {
                    bundle = pair[1] != "false";
                }
            }
        };
        
        (function() {
            if (typeof Timeline_urlPrefix == "string") {
                Timeline.urlPrefix = Timeline_urlPrefix;
                if (typeof Timeline_parameters == "string") {
                    parseURLParameters(Timeline_parameters);
                }
            } else {
                var heads = document.documentElement.getElementsByTagName("head");
                for (var h = 0; h < heads.length; h++) {
                    var scripts = heads[h].getElementsByTagName("script");
                    for (var s = 0; s < scripts.length; s++) {
                        var url = scripts[s].src;
                        var i = url.indexOf("timeline-api.js");
                        if (i >= 0) {
                            Timeline.urlPrefix = url.substr(0, i);
                            var q = url.indexOf("?");
                            if (q > 0) {
                                parseURLParameters(url.substr(q + 1));
                            }
                            return;
                        }
                    }
                }
                throw new Error("Failed to derive URL prefix for Timeline API code files");
            }
        })();
        
        var includeJavascriptFiles;
        var includeCssFiles;
        if ("SimileAjax" in window) {
            includeJavascriptFiles = function(urlPrefix, filenames) {
                SimileAjax.includeJavascriptFiles(document, urlPrefix, filenames);
            }
            includeCssFiles = function(urlPrefix, filenames) {
                SimileAjax.includeCssFiles(document, urlPrefix, filenames);
            }
        } else {
            var getHead = function() {
                return document.getElementsByTagName("head")[0];
            };
            var includeJavascriptFile = function(url) {
                if (document.body == null) {
                    try {
                        document.write("<script src='" + url + "' type='text/javascript'></script>");
                        return;
                    } catch (e) {
                        // fall through
                    }
                }
                
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.language = "JavaScript";
                script.src = url;
                getHead().appendChild(script);
            };
            var includeCssFile = function(url) {
                if (document.body == null) {
                    try {
                        document.write("<link rel='stylesheet' href='" + url + "' type='text/css'/>");
                        return;
                    } catch (e) {
                        // fall through
                    }
                }
                
                var link = document.createElement("link");
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");
                link.setAttribute("href", url);
                getHead().appendChild(link);
            }
            
            includeJavascriptFiles = function(urlPrefix, filenames) {
                for (var i = 0; i < filenames.length; i++) {
                    includeJavascriptFile(urlPrefix + filenames[i]);
                }
            };
            includeCssFiles = function(urlPrefix, filenames) {
                for (var i = 0; i < filenames.length; i++) {
                    includeCssFile(urlPrefix + filenames[i]);
                }
            };
        }
        
        /*
         *  Include non-localized files
         */
        if (bundle) {
            //includeJavascriptFiles(Timeline.urlPrefix, [ "bundle.js" ]);
            //includeCssFiles(Timeline.urlPrefix, [ "bundle.css" ]);
        } else {
            includeJavascriptFiles(Timeline.urlPrefix + "scripts/", javascriptFiles);
            includeCssFiles(Timeline.urlPrefix + "styles/", cssFiles);
        }
        
        /*
         *  Include localized files
         */
        var loadLocale = [];
        loadLocale[defaultServerLocale] = true;
        
        var tryExactLocale = function(locale) {
            for (var l = 0; l < supportedLocales.length; l++) {
                if (locale == supportedLocales[l]) {
                    loadLocale[locale] = true;
                    return true;
                }
            }
            return false;
        }
        var tryLocale = function(locale) {
            if (tryExactLocale(locale)) {
                return locale;
            }
            
            var dash = locale.indexOf("-");
            if (dash > 0 && tryExactLocale(locale.substr(0, dash))) {
                return locale.substr(0, dash);
            }
            
            return null;
        }
        
        for (var l = 0; l < desiredLocales.length; l++) {
            tryLocale(desiredLocales[l]);
        }
        
        var defaultClientLocale = defaultServerLocale;
        var defaultClientLocales = ("language" in navigator ? navigator.language : navigator.browserLanguage).split(";");
        for (var l = 0; l < defaultClientLocales.length; l++) {
            var locale = tryLocale(defaultClientLocales[l]);
            if (locale != null) {
                defaultClientLocale = locale;
                break;
            }
        }
        
        for (var l = 0; l < supportedLocales.length; l++) {
            var locale = supportedLocales[l];
            if (loadLocale[locale]) {
                //includeJavascriptFiles(Timeline.urlPrefix + "scripts/l10n/" + locale + "/", localizedJavascriptFiles);
                //includeCssFiles(Timeline.urlPrefix + "styles/l10n/" + locale + "/", localizedCssFiles);
            }
        }
        
        Timeline.Platform.serverLocale = defaultServerLocale;
        Timeline.Platform.clientLocale = defaultClientLocale;
    } catch (e) {
        alert(e);
    }
})();


/* timeline.js */



Timeline.strings={};

Timeline.create=function(elmt,bandInfos,orientation,unit){
window.__simile_api_state = "used";
return new Timeline._Impl(elmt,bandInfos,orientation,unit);
};

Timeline.HORIZONTAL=0;
Timeline.VERTICAL=1;

Timeline._defaultTheme=null;

Timeline.createBandInfo=function(params){
var theme=("theme"in params)?params.theme:Timeline.getDefaultTheme();

var eventSource=("eventSource"in params)?params.eventSource:null;

var ether=new Timeline.LinearEther({
centersOn:("date"in params)?params.date:new Date(),
interval:Timeline.DateTime.gregorianUnitLengths[params.intervalUnit],
pixelsPerInterval:params.intervalPixels
});

var etherPainter=new Timeline.GregorianEtherPainter({
unit:params.intervalUnit,
multiple:("multiple"in params)?params.multiple:1,
theme:theme,
align:("align"in params)?params.align:undefined
});

var layout=new Timeline.StaticTrackBasedLayout({
eventSource:eventSource,
ether:ether,
showText:("showEventText"in params)?params.showEventText:true,
theme:theme
});

var eventPainterParams={
showText:("showEventText"in params)?params.showEventText:true,
layout:layout,
theme:theme
};
if("trackHeight"in params){
eventPainterParams.trackHeight=params.trackHeight;
}
if("trackGap"in params){
eventPainterParams.trackGap=params.trackGap;
}
var eventPainter=new Timeline.DurationEventPainter(eventPainterParams);

return{
width:params.width,
eventSource:eventSource,
timeZone:("timeZone"in params)?params.timeZone:0,
ether:ether,
etherPainter:etherPainter,
eventPainter:eventPainter
};
};

Timeline.createHotZoneBandInfo=function(params){
var theme=("theme"in params)?params.theme:Timeline.getDefaultTheme();

var eventSource=("eventSource"in params)?params.eventSource:null;

var ether=new Timeline.HotZoneEther({
centersOn:("date"in params)?params.date:new Date(),
interval:Timeline.DateTime.gregorianUnitLengths[params.intervalUnit],
pixelsPerInterval:params.intervalPixels,
zones:params.zones
});

var etherPainter=new Timeline.HotZoneGregorianEtherPainter({
unit:params.intervalUnit,
zones:params.zones,
theme:theme,
align:("align"in params)?params.align:undefined
});

var layout=new Timeline.StaticTrackBasedLayout({
eventSource:eventSource,
ether:ether,
theme:theme
});

var eventPainterParams={
showText:("showEventText"in params)?params.showEventText:true,
layout:layout,
theme:theme
};
if("trackHeight"in params){
eventPainterParams.trackHeight=params.trackHeight;
}
if("trackGap"in params){
eventPainterParams.trackGap=params.trackGap;
}
var eventPainter=new Timeline.DurationEventPainter(eventPainterParams);

return{
width:params.width,
eventSource:eventSource,
timeZone:("timeZone"in params)?params.timeZone:0,
ether:ether,
etherPainter:etherPainter,
eventPainter:eventPainter
};
};

Timeline.getDefaultTheme=function(){
if(Timeline._defaultTheme==null){
Timeline._defaultTheme=Timeline.ClassicTheme.create(Timeline.Platform.getDefaultLocale());
}
return Timeline._defaultTheme;
};

Timeline.setDefaultTheme=function(theme){
Timeline._defaultTheme=theme;
};

Timeline.loadXML=function(url,f){
var fError=function(statusText,status,xmlhttp){
alert("Failed to load data xml from "+url+"\n"+statusText);
};
var fDone=function(xmlhttp){
var xml=xmlhttp.responseXML;
if(!xml.documentElement&&xmlhttp.responseStream){
xml.load(xmlhttp.responseStream);
}
f(xml,url);
};
Timeline.XmlHttp.get(url,fError,fDone);
};


Timeline.loadJSON=function(url,f){
var fError=function(statusText,status,xmlhttp){
alert("Failed to load json data from "+url+"\n"+statusText);
};
var fDone=function(xmlhttp){
f(eval('('+xmlhttp.responseText+')'),url);
};
Timeline.XmlHttp.get(url,fError,fDone);
};


Timeline._Impl=function(elmt,bandInfos,orientation,unit){
this._containerDiv=elmt;

this._bandInfos=bandInfos;
this._orientation=orientation==null?Timeline.HORIZONTAL:orientation;
this._unit=(unit!=null)?unit:Timeline.NativeDateUnit;

this._initialize();
};

Timeline._Impl.prototype.dispose=function(){
for(var i=0;i<this._bands.length;i++){
this._bands[i].dispose();
}
this._bands=null;
this._bandInfos=null;
this._containerDiv.innerHTML="";
};

Timeline._Impl.prototype.getBandCount=function(){
return this._bands.length;
};

Timeline._Impl.prototype.getBand=function(index){
return this._bands[index];
};

Timeline._Impl.prototype.layout=function(){
this._distributeWidths();
};

Timeline._Impl.prototype.paint=function(){
for(var i=0;i<this._bands.length;i++){
this._bands[i].paint();
}
};

Timeline._Impl.prototype.getDocument=function(){
return this._containerDiv.ownerDocument;
};

Timeline._Impl.prototype.addDiv=function(div){
this._containerDiv.appendChild(div);
};

Timeline._Impl.prototype.removeDiv=function(div){
this._containerDiv.removeChild(div);
};

Timeline._Impl.prototype.isHorizontal=function(){
return this._orientation==Timeline.HORIZONTAL;
};

Timeline._Impl.prototype.isVertical=function(){
return this._orientation==Timeline.VERTICAL;
};

Timeline._Impl.prototype.getPixelLength=function(){
return this._orientation==Timeline.HORIZONTAL?
this._containerDiv.offsetWidth:this._containerDiv.offsetHeight;
};

Timeline._Impl.prototype.getPixelWidth=function(){
return this._orientation==Timeline.VERTICAL?
this._containerDiv.offsetWidth:this._containerDiv.offsetHeight;
};

Timeline._Impl.prototype.getUnit=function(){
return this._unit;
};

Timeline._Impl.prototype.loadXML=function(url,f){
var tl=this;


var fError=function(statusText,status,xmlhttp){
alert("Failed to load data xml from "+url+"\n"+statusText);
tl.hideLoadingMessage();
};
var fDone=function(xmlhttp){
try{
var xml=xmlhttp.responseXML;
if(!xml.documentElement&&xmlhttp.responseStream){
xml.load(xmlhttp.responseStream);
}
f(xml,url);
}finally{
tl.hideLoadingMessage();
}
};

this.showLoadingMessage();
window.setTimeout(function(){Timeline.XmlHttp.get(url,fError,fDone);},0);
};

Timeline._Impl.prototype.loadJSON=function(url,f){
var tl=this;


var fError=function(statusText,status,xmlhttp){
alert("Failed to load json data from "+url+"\n"+statusText);
tl.hideLoadingMessage();
};
var fDone=function(xmlhttp){
try{
f(eval('('+xmlhttp.responseText+')'),url);
}finally{
tl.hideLoadingMessage();
}
};

this.showLoadingMessage();
window.setTimeout(function(){Timeline.XmlHttp.get(url,fError,fDone);},0);
};

Timeline._Impl.prototype._initialize=function(){
var containerDiv=this._containerDiv;
var doc=containerDiv.ownerDocument;

containerDiv.className=
containerDiv.className.split(" ").concat("timeline-container").join(" ");

while(containerDiv.firstChild){
containerDiv.removeChild(containerDiv.firstChild);
}


var elmtCopyright=Timeline.Graphics.createTranslucentImage(doc,(this.isHorizontal()?imageURLPrefix+"/copyright-vertical.png":imageURLPrefix+"copyright.png"));
elmtCopyright.className="timeline-copyright";
elmtCopyright.title="Timeline (c) SIMILE - http://simile.mit.edu/timeline/";
Timeline.DOM.registerEvent(elmtCopyright,"click",function(){window.location="http://simile.mit.edu/timeline/";});
containerDiv.appendChild(elmtCopyright);


this._bands=[];
for(var i=0;i<this._bandInfos.length;i++){
var band=new Timeline._Band(this,this._bandInfos[i],i);
this._bands.push(band);
}
this._distributeWidths();


for(var i=0;i<this._bandInfos.length;i++){
var bandInfo=this._bandInfos[i];
if("syncWith"in bandInfo){
this._bands[i].setSyncWithBand(
this._bands[bandInfo.syncWith],
("highlight"in bandInfo)?bandInfo.highlight:false
);
}
}


var message=Timeline.Graphics.createMessageBubble(doc);
message.containerDiv.className="timeline-message-container";
containerDiv.appendChild(message.containerDiv);

message.contentDiv.className="timeline-message";
message.contentDiv.innerHTML="<img src='"+imageURLPrefix+"/progress-running.gif' /> Loading...";

this.showLoadingMessage=function(){message.containerDiv.style.display="block";};
this.hideLoadingMessage=function(){message.containerDiv.style.display="none";};
};

Timeline._Impl.prototype._distributeWidths=function(){
var length=this.getPixelLength();
var width=this.getPixelWidth();
var cumulativeWidth=0;

for(var i=0;i<this._bands.length;i++){
var band=this._bands[i];
var bandInfos=this._bandInfos[i];
var widthString=bandInfos.width;

var x=widthString.indexOf("%");
if(x>0){
var percent=parseInt(widthString.substr(0,x));
var bandWidth=percent*width/100;
}else{
var bandWidth=parseInt(widthString);
}

band.setBandShiftAndWidth(cumulativeWidth,bandWidth);
band.setViewLength(length);

cumulativeWidth+=bandWidth;
}
};


Timeline._Band=function(timeline,bandInfo,index){
this._timeline=timeline;
this._bandInfo=bandInfo;
this._index=index;

this._locale=("locale"in bandInfo)?bandInfo.locale:Timeline.Platform.getDefaultLocale();
this._timeZone=("timeZone"in bandInfo)?bandInfo.timeZone:0;
this._labeller=("labeller"in bandInfo)?bandInfo.labeller:
timeline.getUnit().createLabeller(this._locale,this._timeZone);

this._dragging=false;
this._changing=false;
this._originalScrollSpeed=5;
this._scrollSpeed=this._originalScrollSpeed;
this._onScrollListeners=[];

var b=this;
this._syncWithBand=null;
this._syncWithBandHandler=function(band){
b._onHighlightBandScroll();
};
this._selectorListener=function(band){
b._onHighlightBandScroll();
};


var inputDiv=this._timeline.getDocument().createElement("div");
inputDiv.className="timeline-band-input";
this._timeline.addDiv(inputDiv);

this._keyboardInput=document.createElement("input");
this._keyboardInput.type="text";
inputDiv.appendChild(this._keyboardInput);
Timeline.DOM.registerEventWithObject(this._keyboardInput,"keydown",this,this._onKeyDown);
Timeline.DOM.registerEventWithObject(this._keyboardInput,"keyup",this,this._onKeyUp);

this._div=this._timeline.getDocument().createElement("div");
this._div.className="timeline-band";
this._timeline.addDiv(this._div);

Timeline.DOM.registerEventWithObject(this._div,"mousedown",this,this._onMouseDown);
Timeline.DOM.registerEventWithObject(this._div,"mousemove",this,this._onMouseMove);
Timeline.DOM.registerEventWithObject(this._div,"mouseup",this,this._onMouseUp);
Timeline.DOM.registerEventWithObject(this._div,"mouseout",this,this._onMouseOut);
Timeline.DOM.registerEventWithObject(this._div,"dblclick",this,this._onDblClick);


this._innerDiv=this._timeline.getDocument().createElement("div");
this._innerDiv.className="timeline-band-inner";
this._div.appendChild(this._innerDiv);


this._ether=bandInfo.ether;
bandInfo.ether.initialize(timeline);

this._etherPainter=bandInfo.etherPainter;
bandInfo.etherPainter.initialize(this,timeline);

this._eventSource=bandInfo.eventSource;
if(this._eventSource){
this._eventListener={
onAddMany:function(){b._onAddMany();},
onClear:function(){b._onClear();}
}
this._eventSource.addListener(this._eventListener);
}

this._eventPainter=bandInfo.eventPainter;
bandInfo.eventPainter.initialize(this,timeline);

this._decorators=("decorators"in bandInfo)?bandInfo.decorators:[];
for(var i=0;i<this._decorators.length;i++){
this._decorators[i].initialize(this,timeline);
}

this._bubble=null;
};

Timeline._Band.SCROLL_MULTIPLES=5;

Timeline._Band.prototype.dispose=function(){
this.closeBubble();

if(this._eventSource){
this._eventSource.removeListener(this._eventListener);
this._eventListener=null;
this._eventSource=null;
}

this._timeline=null;
this._bandInfo=null;

this._labeller=null;
this._ether=null;
this._etherPainter=null;
this._eventPainter=null;
this._decorators=null;

this._onScrollListeners=null;
this._syncWithBandHandler=null;
this._selectorListener=null;

this._div=null;
this._innerDiv=null;
this._keyboardInput=null;
this._bubble=null;
};

Timeline._Band.prototype.addOnScrollListener=function(listener){
this._onScrollListeners.push(listener);
};

Timeline._Band.prototype.removeOnScrollListener=function(listener){
for(var i=0;i<this._onScrollListeners.length;i++){
if(this._onScrollListeners[i]==listener){
this._onScrollListeners.splice(i,1);
break;
}
}
};

Timeline._Band.prototype.setSyncWithBand=function(band,highlight){
if(this._syncWithBand){
this._syncWithBand.removeOnScrollListener(this._syncWithBandHandler);
}

this._syncWithBand=band;
this._syncWithBand.addOnScrollListener(this._syncWithBandHandler);
this._highlight=highlight;
this._positionHighlight();
};

Timeline._Band.prototype.getLocale=function(){
return this._locale;
};

Timeline._Band.prototype.getTimeZone=function(){
return this._timeZone;
};

Timeline._Band.prototype.getLabeller=function(){
return this._labeller;
};

Timeline._Band.prototype.getIndex=function(){
return this._index;
};

Timeline._Band.prototype.getEther=function(){
return this._ether;
};

Timeline._Band.prototype.getEtherPainter=function(){
return this._etherPainter;
};

Timeline._Band.prototype.getEventSource=function(){
return this._eventSource;
};

Timeline._Band.prototype.getEventPainter=function(){
return this._eventPainter;
};

Timeline._Band.prototype.layout=function(){
this.paint();
};

Timeline._Band.prototype.paint=function(){
this._etherPainter.paint();
this._paintDecorators();
this._paintEvents();
};

Timeline._Band.prototype.softLayout=function(){
this.softPaint();
};

Timeline._Band.prototype.softPaint=function(){
this._etherPainter.softPaint();
this._softPaintDecorators();
this._softPaintEvents();
};

Timeline._Band.prototype.setBandShiftAndWidth=function(shift,width){
var inputDiv=this._keyboardInput.parentNode;
var middle=shift+Math.floor(width/2);
if(this._timeline.isHorizontal()){
this._div.style.top=shift+"px";
this._div.style.height=width+"px";

inputDiv.style.top=middle+"px";
inputDiv.style.left="-1em";
}else{
this._div.style.left=shift+"px";
this._div.style.width=width+"px";

inputDiv.style.left=middle+"px";
inputDiv.style.top="-1em";
}
};

Timeline._Band.prototype.getViewWidth=function(){
if(this._timeline.isHorizontal()){
return this._div.offsetHeight;
}else{
return this._div.offsetWidth;
}
};

Timeline._Band.prototype.setViewLength=function(length){
this._viewLength=length;
this._recenterDiv();
this._onChanging();
};

Timeline._Band.prototype.getViewLength=function(){
return this._viewLength;
};

Timeline._Band.prototype.getTotalViewLength=function(){
return Timeline._Band.SCROLL_MULTIPLES*this._viewLength;
};

Timeline._Band.prototype.getViewOffset=function(){
return this._viewOffset;
};

Timeline._Band.prototype.getMinDate=function(){
return this._ether.pixelOffsetToDate(this._viewOffset);
};

Timeline._Band.prototype.getMaxDate=function(){
return this._ether.pixelOffsetToDate(this._viewOffset+Timeline._Band.SCROLL_MULTIPLES*this._viewLength);
};

Timeline._Band.prototype.getMinVisibleDate=function(){
return this._ether.pixelOffsetToDate(0);
};

Timeline._Band.prototype.getMaxVisibleDate=function(){
return this._ether.pixelOffsetToDate(this._viewLength);
};

Timeline._Band.prototype.getCenterVisibleDate=function(){
return this._ether.pixelOffsetToDate(this._viewLength/2);
};

Timeline._Band.prototype.setMinVisibleDate=function(date){
if(!this._changing){
this._moveEther(Math.round(-this._ether.dateToPixelOffset(date)));
}
};

Timeline._Band.prototype.setMaxVisibleDate=function(date){
if(!this._changing){
this._moveEther(Math.round(this._viewLength-this._ether.dateToPixelOffset(date)));
}
};

Timeline._Band.prototype.setCenterVisibleDate=function(date){
if(!this._changing){
this._moveEther(Math.round(this._viewLength/2-this._ether.dateToPixelOffset(date)));
}
};

Timeline._Band.prototype.dateToPixelOffset=function(date){
return this._ether.dateToPixelOffset(date)-this._viewOffset;
};

Timeline._Band.prototype.pixelOffsetToDate=function(pixels){
return this._ether.pixelOffsetToDate(pixels+this._viewOffset);
};

Timeline._Band.prototype.createLayerDiv=function(zIndex){
var div=this._timeline.getDocument().createElement("div");
div.className="timeline-band-layer";
div.style.zIndex=zIndex;
this._innerDiv.appendChild(div);

var innerDiv=this._timeline.getDocument().createElement("div");
innerDiv.className="timeline-band-layer-inner";
if(Timeline.Platform.browser.isIE){
innerDiv.style.cursor="move";
}else{
innerDiv.style.cursor="-moz-grab";
}
div.appendChild(innerDiv);
var thisBand = this;

$(innerDiv).parent().scroll(function(){
	thisBand.closeBubble();
	$(innerDiv).height($(innerDiv).parent().height() + $(innerDiv).parent().scrollTop());
});

return innerDiv;
};

Timeline._Band.prototype.removeLayerDiv=function(div){
this._innerDiv.removeChild(div.parentNode);
};

Timeline._Band.prototype.closeBubble=function(){
if(this._bubble!=null){
this._bubble.close();
this._bubble=null;
}
};

Timeline._Band.prototype.openBubbleForPoint=function(pageX,pageY,width,height){
this.closeBubble();

this._bubble=Timeline.Graphics.createBubbleForPoint(
this._timeline.getDocument(),pageX,pageY,width,height);

return this._bubble.content;
};

Timeline._Band.prototype.scrollToCenter=function(date){
var pixelOffset=this._ether.dateToPixelOffset(date);
if(pixelOffset<-this._viewLength/2){
this.setCenterVisibleDate(this.pixelOffsetToDate(pixelOffset+this._viewLength));
}else if(pixelOffset>3*this._viewLength/2){
this.setCenterVisibleDate(this.pixelOffsetToDate(pixelOffset-this._viewLength));
}
this._autoScroll(Math.round(this._viewLength/2-this._ether.dateToPixelOffset(date)));
};

Timeline._Band.prototype._onMouseDown=function(innerFrame,evt,target){
this.closeBubble();

this._hasDragged = false;

this._dragging=true;
this._dragX=evt.clientX;
this._dragY=evt.clientY;
};

Timeline._Band.prototype._onMouseMove=function(innerFrame,evt,target){
if(this._dragging){
this._hasDragged = true;
var diffX=evt.clientX-this._dragX;
var diffY=evt.clientY-this._dragY;

this._dragX=evt.clientX;
this._dragY=evt.clientY;

$(target).parent().scrollTop($(target).parent().scrollTop() - diffY);

$(innerFrame).height($(innerFrame).height() + $(innerFrame).scrollTop());

this._moveEther(this._timeline.isHorizontal()?diffX:diffY);
this._positionHighlight();
}
};

Timeline._Band.prototype._onMouseUp=function(innerFrame,evt,target){
this._dragging=false;
this._keyboardInput.focus();
};

Timeline._Band.prototype._onMouseOut=function(innerFrame,evt,target){
var coords=Timeline.DOM.getEventRelativeCoordinates(evt,innerFrame);
coords.x+=this._viewOffset;
if(coords.x<2||coords.x>$(innerFrame).parent().width()||
coords.y<2||coords.y>innerFrame.offsetHeight - 2){
this._dragging=false;
}
};

Timeline._Band.prototype._onDblClick=function(innerFrame,evt,target){
var coords=Timeline.DOM.getEventRelativeCoordinates(evt,innerFrame);
var distance=coords.x-(this._viewLength/2-this._viewOffset);

this._autoScroll(-distance);
};

Timeline._Band.prototype._onKeyDown=function(keyboardInput,evt,target){
if(!this._dragging){
switch(evt.keyCode){
case 27:
break;
case 37:
case 38:
this._scrollSpeed=Math.min(50,Math.abs(this._scrollSpeed*1.05));
this._moveEther(this._scrollSpeed);
break;
case 39:
case 40:
this._scrollSpeed=-Math.min(50,Math.abs(this._scrollSpeed*1.05));
this._moveEther(this._scrollSpeed);
break;
default:
return true;
}
this.closeBubble();

Timeline.DOM.cancelEvent(evt);
return false;
}
return true;
};

Timeline._Band.prototype._onKeyUp=function(keyboardInput,evt,target){
if(!this._dragging){
this._scrollSpeed=this._originalScrollSpeed;

switch(evt.keyCode){
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
return true;
}

this.closeBubble();

Timeline.DOM.cancelEvent(evt);
return false;
}
return true;
};

Timeline._Band.prototype._autoScroll=function(distance){
var b=this;
var a=Timeline.Graphics.createAnimation(function(abs,diff){
b._moveEther(diff);
},0,distance,1000);
a.run();
};

Timeline._Band.prototype._moveEther=function(shift){
this.closeBubble();

this._viewOffset+=shift;
this._ether.shiftPixels(-shift);
if(this._timeline.isHorizontal()){
this._div.style.left=this._viewOffset+"px";
}else{
this._div.style.top=this._viewOffset+"px";
}

if(this._viewOffset>-this._viewLength*0.5||
this._viewOffset<-this._viewLength*(Timeline._Band.SCROLL_MULTIPLES-1.5)){

this._recenterDiv();
}else{
this.softLayout();
}

this._onChanging();
}

Timeline._Band.prototype._onChanging=function(){
this._changing=true;

this._fireOnScroll();
this._setSyncWithBandDate();

this._changing=false;
};

Timeline._Band.prototype._fireOnScroll=function(){
for(var i=0;i<this._onScrollListeners.length;i++){
this._onScrollListeners[i](this);
};
};

Timeline._Band.prototype._setSyncWithBandDate=function(){
if(this._syncWithBand){
var centerDate=this._ether.pixelOffsetToDate(this.getViewLength()/2);
this._syncWithBand.setCenterVisibleDate(centerDate);
}
};

Timeline._Band.prototype._onHighlightBandScroll=function(){
if(this._syncWithBand){
var centerDate=this._syncWithBand.getCenterVisibleDate();
var centerPixelOffset=this._ether.dateToPixelOffset(centerDate);

this._moveEther(Math.round(this._viewLength/2-centerPixelOffset));

if(this._highlight){
this._etherPainter.setHighlight(
this._syncWithBand.getMinVisibleDate(),
this._syncWithBand.getMaxVisibleDate());
}
}
};

Timeline._Band.prototype._onAddMany=function(){
this._paintEvents();
};

Timeline._Band.prototype._onClear=function(){
this._paintEvents();
};

Timeline._Band.prototype._positionHighlight=function(){
if(this._syncWithBand){
var startDate=this._syncWithBand.getMinVisibleDate();
var endDate=this._syncWithBand.getMaxVisibleDate();

if(this._highlight){
this._etherPainter.setHighlight(startDate,endDate);
}
}
};

Timeline._Band.prototype._recenterDiv=function(){
this._viewOffset=-this._viewLength*(Timeline._Band.SCROLL_MULTIPLES-1)/2;
if(this._timeline.isHorizontal()){
this._div.style.left=this._viewOffset+"px";
this._div.style.width=(Timeline._Band.SCROLL_MULTIPLES*this._viewLength)+"px";
}else{
this._div.style.top=this._viewOffset+"px";
this._div.style.height=(Timeline._Band.SCROLL_MULTIPLES*this._viewLength)+"px";
}
this.layout();
};

Timeline._Band.prototype._paintEvents=function(){
this._eventPainter.paint();
};

Timeline._Band.prototype._softPaintEvents=function(){
this._eventPainter.softPaint();
};

Timeline._Band.prototype._paintDecorators=function(){
for(var i=0;i<this._decorators.length;i++){
this._decorators[i].paint();
}
};

Timeline._Band.prototype._softPaintDecorators=function(){
for(var i=0;i<this._decorators.length;i++){
this._decorators[i].softPaint();
}
};


/* platform.js */



Timeline.Platform.os={
isMac:false,
isWin:false,
isWin32:false,
isUnix:false
};
Timeline.Platform.browser={
isIE:false,
isNetscape:false,
isMozilla:false,
isFirefox:false,
isOpera:false,
isSafari:false,

majorVersion:0,
minorVersion:0
};

(function(){
var an=navigator.appName.toLowerCase();
var ua=navigator.userAgent.toLowerCase();



Timeline.Platform.os.isMac=(ua.indexOf('mac')!=-1);

Timeline.Platform.os.isWin=(ua.indexOf('win')!=-1);

Timeline.Platform.os.isWin32=Timeline.Platform.isWin&&(
ua.indexOf('95')!=-1||
ua.indexOf('98')!=-1||
ua.indexOf('nt')!=-1||
ua.indexOf('win32')!=-1||
ua.indexOf('32bit')!=-1
);
Timeline.Platform.os.isUnix=(ua.indexOf('x11')!=-1);



Timeline.Platform.browser.isIE=(an.indexOf("microsoft")!=-1);
Timeline.Platform.browser.isNetscape=(an.indexOf("netscape")!=-1);
Timeline.Platform.browser.isMozilla=(ua.indexOf("mozilla")!=-1);
Timeline.Platform.browser.isFirefox=(ua.indexOf("firefox")!=-1);
Timeline.Platform.browser.isOpera=(an.indexOf("opera")!=-1);


var parseVersionString=function(s){
var a=s.split(".");
Timeline.Platform.browser.majorVersion=parseInt(a[0]);
Timeline.Platform.browser.minorVersion=parseInt(a[1]);
};
var indexOf=function(s,sub,start){
var i=s.indexOf(sub,start);
return i>=0?i:s.length;
};

if(Timeline.Platform.browser.isMozilla){
var offset=ua.indexOf("mozilla/");
if(offset>=0){
parseVersionString(ua.substring(offset+8,indexOf(ua," ",offset)));
}
}

if(Timeline.Platform.browser.isIE){
var offset=ua.indexOf("msie ");
if(offset>=0){
parseVersionString(ua.substring(offset+5,indexOf(ua,";",offset)));
}
}
if(Timeline.Platform.browser.isNetscape){
var offset=ua.indexOf("rv:");
if(offset>=0){
parseVersionString(ua.substring(offset+3,indexOf(ua,")",offset)));
}
}

if(Timeline.Platform.browser.isFirefox){
var offset=ua.indexOf("firefox/");
if(offset>=0){
parseVersionString(ua.substring(offset+8,indexOf(ua," ",offset)));
}
}
})();

Timeline.Platform.getDefaultLocale=function(){
return Timeline.Platform.clientLocale;
};

/* data-structure.js */



Timeline.SortedArray=function(compare,initialArray){
this._a=(initialArray instanceof Array)?initialArray:[];
this._compare=compare;
};

Timeline.SortedArray.prototype.add=function(elmt){
var sa=this;
var index=this.find(function(elmt2){
return sa._compare(elmt2,elmt);
});

if(index<this._a.length){
this._a.splice(index,0,elmt);
}else{
this._a.push(elmt);
}
};

Timeline.SortedArray.prototype.remove=function(elmt){
var sa=this;
var index=this.find(function(elmt2){
return sa._compare(elmt2,elmt);
});

while(index<this._a.length&&this._compare(this._a[index],elmt)==0){
if(this._a[index]==elmt){
this._a.splice(index,1);
return true;
}else{
index++;
}
}
return false;
};

Timeline.SortedArray.prototype.removeAll=function(){
this._a=[];
};

Timeline.SortedArray.prototype.elementAt=function(index){
return this._a[index];
};

Timeline.SortedArray.prototype.length=function(){
return this._a.length;
};

Timeline.SortedArray.prototype.find=function(compare){
var a=0;
var b=this._a.length;

while(a<b){
var mid=Math.floor((a+b)/2);
var c=compare(this._a[mid]);
if(mid==a){
return c<0?a+1:a;
}else if(c<0){
a=mid;
}else{
b=mid;
}
}
return a;
};

Timeline.SortedArray.prototype.getFirst=function(){
return(this._a.length>0)?this._a[0]:null;
};

Timeline.SortedArray.prototype.getLast=function(){
return(this._a.length>0)?this._a[this._a.length-1]:null;
};



Timeline.EventIndex=function(unit){
var eventIndex=this;

this._unit=(unit!=null)?unit:Timeline.NativeDateUnit;
this._events=new Timeline.SortedArray(
function(event1,event2){
return eventIndex._unit.compare(event1.getStart(),event2.getStart());
}
);
this._indexed=true;
};

Timeline.EventIndex.prototype.getUnit=function(){
return this._unit;
};

Timeline.EventIndex.prototype.add=function(evt){
this._events.add(evt);
this._indexed=false;
};

Timeline.EventIndex.prototype.removeAll=function(){
this._events.removeAll();
this._indexed=false;
};

Timeline.EventIndex.prototype.getCount=function(){
return this._events.length();
};

Timeline.EventIndex.prototype.getIterator=function(startDate,endDate){
if(!this._indexed){
this._index();
}
return new Timeline.EventIndex._Iterator(this._events,startDate,endDate,this._unit);
};

Timeline.EventIndex.prototype.getAllIterator=function(){
return new Timeline.EventIndex._AllIterator(this._events);
};

Timeline.EventIndex.prototype.getEarliestDate=function(){
var evt=this._events.getFirst();
return(evt==null)?null:evt.getStart();
};

Timeline.EventIndex.prototype.getLatestDate=function(){
var evt=this._events.getLast();
if(evt==null){
return null;
}

if(!this._indexed){
this._index();
}

var index=evt._earliestOverlapIndex;
var date=this._events.elementAt(index).getEnd();
for(var i=index+1;i<this._events.length();i++){
date=this._unit.later(date,this._events.elementAt(i).getEnd());
}

return date;
};

Timeline.EventIndex.prototype._index=function(){


var l=this._events.length();
for(var i=0;i<l;i++){
var evt=this._events.elementAt(i);
evt._earliestOverlapIndex=i;
}

var toIndex=1;
for(var i=0;i<l;i++){
var evt=this._events.elementAt(i);
var end=evt.getEnd();

toIndex=Math.max(toIndex,i+1);
while(toIndex<l){
var evt2=this._events.elementAt(toIndex);
var start2=evt2.getStart();

if(this._unit.compare(start2,end)<0){
evt2._earliestOverlapIndex=i;
toIndex++;
}else{
break;
}
}
}
this._indexed=true;
};

Timeline.EventIndex._Iterator=function(events,startDate,endDate,unit){
this._events=events;
this._startDate=startDate;
this._endDate=endDate;
this._unit=unit;

this._currentIndex=events.find(function(evt){
return unit.compare(evt.getStart(),startDate);
});
if(this._currentIndex-1>=0){
this._currentIndex=this._events.elementAt(this._currentIndex-1)._earliestOverlapIndex;
}
this._currentIndex--;

this._maxIndex=events.find(function(evt){
return unit.compare(evt.getStart(),endDate);
});

this._hasNext=false;
this._next=null;
this._findNext();
};

Timeline.EventIndex._Iterator.prototype={
hasNext:function(){return this._hasNext;},
next:function(){
if(this._hasNext){
var next=this._next;
this._findNext();

return next;
}else{
return null;
}
},
_findNext:function(){
var unit=this._unit;
while((++this._currentIndex)<this._maxIndex){
var evt=this._events.elementAt(this._currentIndex);
if(unit.compare(evt.getStart(),this._endDate)<0&&
unit.compare(evt.getEnd(),this._startDate)>0){

this._next=evt;
this._hasNext=true;
return;
}
}
this._next=null;
this._hasNext=false;
}
};

Timeline.EventIndex._AllIterator=function(events){
this._events=events;
this._index=0;
};

Timeline.EventIndex._AllIterator.prototype={
hasNext:function(){
return this._index<this._events.length();
},
next:function(){
return this._index<this._events.length()?
this._events.elementAt(this._index++):null;
}
};

/* date-time.js */



Timeline.DateTime=new Object();

Timeline.DateTime.MILLISECOND=0;
Timeline.DateTime.SECOND=1;
Timeline.DateTime.MINUTE=2;
Timeline.DateTime.HOUR=3;
Timeline.DateTime.DAY=4;
Timeline.DateTime.WEEK=5;
Timeline.DateTime.MONTH=6;
Timeline.DateTime.YEAR=7;
Timeline.DateTime.DECADE=8;
Timeline.DateTime.CENTURY=9;
Timeline.DateTime.MILLENNIUM=10;

Timeline.DateTime.EPOCH=-1;
Timeline.DateTime.ERA=-2;

Timeline.DateTime.gregorianUnitLengths=[];
(function(){
var d=Timeline.DateTime;
var a=d.gregorianUnitLengths;

a[d.MILLISECOND]=1;
a[d.SECOND]=1000;
a[d.MINUTE]=a[d.SECOND]*60;
a[d.HOUR]=a[d.MINUTE]*60;
a[d.DAY]=a[d.HOUR]*24;
a[d.WEEK]=a[d.DAY]*7;
a[d.MONTH]=a[d.DAY]*31;
a[d.YEAR]=a[d.DAY]*365;
a[d.DECADE]=a[d.YEAR]*10;
a[d.CENTURY]=a[d.YEAR]*100;
a[d.MILLENNIUM]=a[d.YEAR]*1000;
})();

Timeline.DateTime.parseGregorianDateTime=function(o){
if(o==null){
return null;
}else if(o instanceof Date){
return o;
}

var s=o.toString();
if(s.length>0&&s.length<8){
var space=s.indexOf(" ");
if(space>0){
var year=parseInt(s.substr(0,space));
var suffix=s.substr(space+1);
if(suffix.toLowerCase()=="bc"){
year=1-year;
}
}else{
var year=parseInt(s);
}

var d=new Date(0);
d.setUTCFullYear(year);

return d;
}

try{
return new Date(Date.parse(s));
}catch(e){
return null;
}
};

Timeline.DateTime._iso8601DateRegExp="^(-?)([0-9]{4})("+[
"(-?([0-9]{2})(-?([0-9]{2}))?)",
"(-?([0-9]{3}))",
"(-?W([0-9]{2})(-?([1-7]))?)"
].join("|")+")?$";

Timeline.DateTime.setIso8601Date=function(dateObject,string){


var regexp=Timeline.DateTime._iso8601DateRegExp;
var d=string.match(new RegExp(regexp));
if(!d){
throw new Error("Invalid date string: "+string);
}

var sign=(d[1]=="-")?-1:1;
var year=sign*d[2];
var month=d[5];
var date=d[7];
var dayofyear=d[9];
var week=d[11];
var dayofweek=(d[13])?d[13]:1;

dateObject.setUTCFullYear(year);
if(dayofyear){
dateObject.setUTCMonth(0);
dateObject.setUTCDate(Number(dayofyear));
}else if(week){
dateObject.setUTCMonth(0);
dateObject.setUTCDate(1);
var gd=dateObject.getUTCDay();
var day=(gd)?gd:7;
var offset=Number(dayofweek)+(7*Number(week));

if(day<=4){
dateObject.setUTCDate(offset+1-day);
}else{
dateObject.setUTCDate(offset+8-day);
}
}else{
if(month){
dateObject.setUTCDate(1);
dateObject.setUTCMonth(month-1);
}
if(date){
dateObject.setUTCDate(date);
}
}

return dateObject;
};

Timeline.DateTime.setIso8601Time=function(dateObject,string){



var timezone="Z|(([-+])([0-9]{2})(:?([0-9]{2}))?)$";
var d=string.match(new RegExp(timezone));

var offset=0;
if(d){
if(d[0]!='Z'){
offset=(Number(d[3])*60)+Number(d[5]);
offset*=((d[2]=='-')?1:-1);
}
string=string.substr(0,string.length-d[0].length);
}


var regexp="^([0-9]{2})(:?([0-9]{2})(:?([0-9]{2})(\.([0-9]+))?)?)?$";
var d=string.match(new RegExp(regexp));
if(!d){
dojo.debug("invalid time string: "+string);
return false;
}
var hours=d[1];
var mins=Number((d[3])?d[3]:0);
var secs=(d[5])?d[5]:0;
var ms=d[7]?(Number("0."+d[7])*1000):0;

dateObject.setUTCHours(hours);
dateObject.setUTCMinutes(mins);
dateObject.setUTCSeconds(secs);
dateObject.setUTCMilliseconds(ms);

return dateObject;
};

Timeline.DateTime.setIso8601=function(dateObject,string){


var comps=(string.indexOf("T")==-1)?string.split(" "):string.split("T");

Timeline.DateTime.setIso8601Date(dateObject,comps[0]);
if(comps.length==2){
Timeline.DateTime.setIso8601Time(dateObject,comps[1]);
}
return dateObject;
};

Timeline.DateTime.parseIso8601DateTime=function(string){
try{
return Timeline.DateTime.setIso8601(new Date(0),string);
}catch(e){
return null;
}
};

Timeline.DateTime.roundDownToInterval=function(date,intervalUnit,timeZone,multiple,firstDayOfWeek){
var timeShift=timeZone*
Timeline.DateTime.gregorianUnitLengths[Timeline.DateTime.HOUR];

var date2=new Date(date.getTime()+timeShift);
var clearInDay=function(d){
d.setUTCMilliseconds(0);
d.setUTCSeconds(0);
d.setUTCMinutes(0);
d.setUTCHours(0);
};
var clearInYear=function(d){
clearInDay(d);
d.setUTCDate(1);
d.setUTCMonth(0);
};

switch(intervalUnit){
case Timeline.DateTime.MILLISECOND:
var x=date2.getUTCMilliseconds();
date2.setUTCMilliseconds(x-(x%multiple));
break;
case Timeline.DateTime.SECOND:
date2.setUTCMilliseconds(0);

var x=date2.getUTCSeconds();
date2.setUTCSeconds(x-(x%multiple));
break;
case Timeline.DateTime.MINUTE:
date2.setUTCMilliseconds(0);
date2.setUTCSeconds(0);

var x=date2.getUTCMinutes();
date2.setTime(date2.getTime()-
(x%multiple)*Timeline.DateTime.gregorianUnitLengths[Timeline.DateTime.MINUTE]);
break;
case Timeline.DateTime.HOUR:
date2.setUTCMilliseconds(0);
date2.setUTCSeconds(0);
date2.setUTCMinutes(0);

var x=date2.getUTCHours();
date2.setUTCHours(x-(x%multiple));
break;
case Timeline.DateTime.DAY:
clearInDay(date2);
break;
case Timeline.DateTime.WEEK:
clearInDay(date2);
var d=(date2.getUTCDay()+7-firstDayOfWeek)%7;
date2.setTime(date2.getTime()-
d*Timeline.DateTime.gregorianUnitLengths[Timeline.DateTime.DAY]);
break;
case Timeline.DateTime.MONTH:
clearInDay(date2);
date2.setUTCDate(1);

var x=date2.getUTCMonth();
date2.setUTCMonth(x-(x%multiple));
break;
case Timeline.DateTime.YEAR:
clearInYear(date2);

var x=date2.getUTCFullYear();
date2.setUTCFullYear(x-(x%multiple));
break;
case Timeline.DateTime.DECADE:
clearInYear(date2);
date2.setUTCFullYear(Math.floor(date2.getUTCFullYear()/10)*10);
break;
case Timeline.DateTime.CENTURY:
clearInYear(date2);
date2.setUTCFullYear(Math.floor(date2.getUTCFullYear()/100)*100);
break;
case Timeline.DateTime.MILLENNIUM:
clearInYear(date2);
date2.setUTCFullYear(Math.floor(date2.getUTCFullYear()/1000)*1000);
break;
}

date.setTime(date2.getTime()-timeShift);
};

Timeline.DateTime.roundUpToInterval=function(date,intervalUnit,timeZone,multiple,firstDayOfWeek){
var originalTime=date.getTime();
Timeline.DateTime.roundDownToInterval(date,intervalUnit,timeZone,multiple,firstDayOfWeek);
if(date.getTime()<originalTime){
date.setTime(date.getTime()+
Timeline.DateTime.gregorianUnitLengths[intervalUnit]*multiple);
}
};

Timeline.DateTime.incrementByInterval=function(date,intervalUnit){
switch(intervalUnit){
case Timeline.DateTime.MILLISECOND:
date.setTime(date.getTime()+1)
break;
case Timeline.DateTime.SECOND:
date.setTime(date.getTime()+1000);
break;
case Timeline.DateTime.MINUTE:
date.setTime(date.getTime()+
Timeline.DateTime.gregorianUnitLengths[Timeline.DateTime.MINUTE]);
break;
case Timeline.DateTime.HOUR:
date.setTime(date.getTime()+
Timeline.DateTime.gregorianUnitLengths[Timeline.DateTime.HOUR]);
break;
case Timeline.DateTime.DAY:
date.setUTCDate(date.getUTCDate()+1);
break;
case Timeline.DateTime.WEEK:
date.setUTCDate(date.getUTCDate()+7);
break;
case Timeline.DateTime.MONTH:
date.setUTCMonth(date.getUTCMonth()+1);
break;
case Timeline.DateTime.YEAR:
date.setUTCFullYear(date.getUTCFullYear()+1);
break;
case Timeline.DateTime.DECADE:
date.setUTCFullYear(date.getUTCFullYear()+10);
break;
case Timeline.DateTime.CENTURY:
date.setUTCFullYear(date.getUTCFullYear()+100);
break;
case Timeline.DateTime.MILLENNIUM:
date.setUTCFullYear(date.getUTCFullYear()+1000);
break;
}
};

Timeline.DateTime.removeTimeZoneOffset=function(date,timeZone){
return new Date(date.getTime()+
timeZone*Timeline.DateTime.gregorianUnitLengths[Timeline.DateTime.HOUR]);
};



/* debug.js */



Timeline.Debug=new Object();

Timeline.Debug.log=function(msg){
};

Timeline.Debug.exception=function(e){
alert("Caught exception: "+(Timeline.Platform.isIE?e.message:e));
};



/* dom.js */



Timeline.DOM=new Object();

Timeline.DOM.registerEventWithObject=function(elmt,eventName,obj,handler){
Timeline.DOM.registerEvent(elmt,eventName,function(elmt2,evt,target){
return handler.call(obj,elmt2,evt,target);
});
};

Timeline.DOM.registerEvent=function(elmt,eventName,handler){
var handler2=function(evt){
evt=(evt)?evt:((event)?event:null);
if(evt){
var target=(evt.target)?
evt.target:((evt.srcElement)?evt.srcElement:null);

if(target){

target=(target.nodeType==1||target.nodeType==9)?
target:target.parentNode;

}

return handler(elmt,evt,target);
}
return true;
}

if(Timeline.Platform.browser.isIE){
elmt.attachEvent("on"+eventName,handler2);
}else{
elmt.addEventListener(eventName,handler2,false);
}
};

Timeline.DOM.getPageCoordinates=function(elmt){
var left=0;
var top=0;

if(elmt.nodeType!=1){
elmt=elmt.parentNode;
}

while(elmt!=null){
left+=elmt.offsetLeft;
top+=elmt.offsetTop;

elmt=elmt.offsetParent;
}
return{left:left,top:top};
};

Timeline.DOM.getEventRelativeCoordinates=function(evt,elmt){
if(Timeline.Platform.browser.isIE){
return{
x:evt.offsetX,
y:evt.offsetY
};
}else{
var coords=Timeline.DOM.getPageCoordinates(elmt);
return{
x:evt.pageX-coords.left,
y:evt.pageY-coords.top
};
}
};

Timeline.DOM.cancelEvent=function(evt){
evt.returnValue=false;
evt.cancelBubble=true;
if("preventDefault"in evt){
evt.preventDefault();
}
};



/* graphics.js */



Timeline.Graphics=new Object();
Timeline.Graphics.pngIsTranslucent=(!Timeline.Platform.browser.isIE)||(Timeline.Platform.browser.majorVersion>6);


Timeline.Graphics.createTranslucentImage=function(doc,url,verticalAlign, width, height){
var elmt;
if(Timeline.Graphics.pngIsTranslucent){
elmt=doc.createElement("img");
elmt.setAttribute("src",url);
if(width != undefined) {
	elmt.setAttribute("width", width);
}
/*if(height != undefined) {
	elmt.setAttribute("height", height);
}*/
}else{
elmt=doc.createElement("img");
elmt.style.display="inline";
elmt.style.width="1px";
elmt.style.height="1px";
elmt.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+url+"', sizingMethod='image')";
}
//elmt.style.verticalAlign="middle";
return elmt;
};

Timeline.Graphics.setOpacity=function(elmt,opacity){
if(Timeline.Platform.browser.isIE){
elmt.style.filter="progid:DXImageTransform.Microsoft.Alpha(Style=0,Opacity="+opacity+")";
}else{
var o=(opacity/100).toString();
elmt.style.opacity=o;
elmt.style.MozOpacity=o;
}
};

Timeline.Graphics._bubbleMargins={
top:33,
bottom:42,
left:33,
right:40
}


Timeline.Graphics._arrowOffsets={
top:0,
bottom:9,
left:1,
right:8
}

Timeline.Graphics._bubblePadding=15;
Timeline.Graphics._bubblePointOffset=6;
Timeline.Graphics._halfArrowWidth=18;

Timeline.Graphics.createBubbleForPoint=function(doc,pageX,pageY,contentWidth,contentHeight){
function getWindowDims(){
if(typeof window.innerWidth=='number'){
return{w:window.innerWidth,h:window.innerHeight};
}else if(document.documentElement&&document.documentElement.clientWidth){
return{
w:document.documentElement.clientWidth,
h:document.documentElement.clientHeight
};
}else if(document.body&&document.body.clientWidth){
return{
w:document.body.clientWidth,
h:document.body.clientHeight
};
}
}

var bubble={
_closed:false,
_doc:doc,
close:function(){
if(!this._closed){
this._doc.body.removeChild(this._div);
this._doc=null;
this._div=null;
this._content=null;
this._closed=true;
}
}
};

var dims=getWindowDims();
var docWidth=dims.w;
var docHeight=dims.h;

var margins=Timeline.Graphics._bubbleMargins;
contentWidth=parseInt(contentWidth,10);
contentHeight=parseInt(contentHeight,10);
var bubbleWidth=margins.left+contentWidth+margins.right;
var bubbleHeight=margins.top+contentHeight+margins.bottom;

var pngIsTranslucent=Timeline.Graphics.pngIsTranslucent;
var urlPrefix=Timeline.urlPrefix;

var setImg=function(elmt,url,width,height){
elmt.style.position="absolute";
elmt.style.width=width+"px";
elmt.style.height=height+"px";
if(pngIsTranslucent){
elmt.style.background="url("+url+")";
}else{
elmt.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+url+"', sizingMethod='crop')";
}
}
var div=doc.createElement("div");
div.style.width=bubbleWidth+"px";
div.style.height=bubbleHeight+"px";
div.style.position="absolute";
div.style.zIndex=1000;
bubble._div=div;

var divInner=doc.createElement("div");
divInner.style.width="100%";
divInner.style.height="100%";
divInner.style.position="relative";
div.appendChild(divInner);

var createImg=function(url,left,top,width,height){
var divImg=doc.createElement("div");
divImg.style.left=left+"px";
divImg.style.top=top+"px";
setImg(divImg,url,width,height);
divInner.appendChild(divImg);
}

createImg(urlPrefix+imageURLPrefix+"bubble-top-left.png",0,0,margins.left,margins.top);
createImg(urlPrefix+imageURLPrefix+"bubble-top.png",margins.left,0,contentWidth,margins.top);
createImg(urlPrefix+imageURLPrefix+"bubble-top-right.png",margins.left+contentWidth,0,margins.right,margins.top);

createImg(urlPrefix+imageURLPrefix+"bubble-left.png",0,margins.top,margins.left,contentHeight);
createImg(urlPrefix+imageURLPrefix+"bubble-right.png",margins.left+contentWidth,margins.top,margins.right,contentHeight);

createImg(urlPrefix+imageURLPrefix+"bubble-bottom-left.png",0,margins.top+contentHeight,margins.left,margins.bottom);
createImg(urlPrefix+imageURLPrefix+"bubble-bottom.png",margins.left,margins.top+contentHeight,contentWidth,margins.bottom);
createImg(urlPrefix+imageURLPrefix+"bubble-bottom-right.png",margins.left+contentWidth,margins.top+contentHeight,margins.right,margins.bottom);

var divClose=doc.createElement("div");
divClose.style.left=(bubbleWidth-margins.right+Timeline.Graphics._bubblePadding-16-2)+"px";
divClose.style.top=(margins.top-Timeline.Graphics._bubblePadding+1)+"px";
divClose.style.cursor="pointer";
setImg(divClose,urlPrefix+imageURLPrefix+"close-button.png",16,16);
Timeline.DOM.registerEventWithObject(divClose,"click",bubble,bubble.close);
divInner.appendChild(divClose);

var divContent=doc.createElement("div");
divContent.style.position="absolute";
divContent.style.left=margins.left+"px";
divContent.style.top=margins.top+"px";
divContent.style.width=contentWidth+"px";
divContent.style.height=contentHeight+"px";
divContent.style.overflow="auto";
divContent.style.background="white";
divInner.appendChild(divContent);
bubble.content=divContent;

(function(){
if(pageX-Timeline.Graphics._halfArrowWidth-Timeline.Graphics._bubblePadding>0&&
pageX+Timeline.Graphics._halfArrowWidth+Timeline.Graphics._bubblePadding<docWidth){

var left=pageX-Math.round(contentWidth/2)-margins.left;
left=pageX<(docWidth/2)?
Math.max(left,-(margins.left-Timeline.Graphics._bubblePadding)):
Math.min(left,docWidth+(margins.right-Timeline.Graphics._bubblePadding)-bubbleWidth);

if(pageY-Timeline.Graphics._bubblePointOffset-bubbleHeight>0){
var divImg=doc.createElement("div");

divImg.style.left=(pageX-Timeline.Graphics._halfArrowWidth-left)+"px";
divImg.style.top=(margins.top+contentHeight)+"px";
setImg(divImg,urlPrefix+imageURLPrefix+"bubble-bottom-arrow.png",37,margins.bottom);
divInner.appendChild(divImg);

div.style.left=left+"px";
div.style.top=(pageY-Timeline.Graphics._bubblePointOffset-bubbleHeight+
Timeline.Graphics._arrowOffsets.bottom)+"px";

return;
}else if(pageY+Timeline.Graphics._bubblePointOffset+bubbleHeight<docHeight){
var divImg=doc.createElement("div");

divImg.style.left=(pageX-Timeline.Graphics._halfArrowWidth-left)+"px";
divImg.style.top="0px";
setImg(divImg,urlPrefix+imageURLPrefix+"bubble-top-arrow.png",37,margins.top);
divInner.appendChild(divImg);

div.style.left=left+"px";
div.style.top=(pageY+Timeline.Graphics._bubblePointOffset-
Timeline.Graphics._arrowOffsets.top)+"px";

return;
}
}

var top=pageY-Math.round(contentHeight/2)-margins.top;
top=pageY<(docHeight/2)?
Math.max(top,-(margins.top-Timeline.Graphics._bubblePadding)):
Math.min(top,docHeight+(margins.bottom-Timeline.Graphics._bubblePadding)-bubbleHeight);

if(pageX-Timeline.Graphics._bubblePointOffset-bubbleWidth>0){
var divImg=doc.createElement("div");

divImg.style.left=(margins.left+contentWidth)+"px";
divImg.style.top=(pageY-Timeline.Graphics._halfArrowWidth-top)+"px";
setImg(divImg,urlPrefix+imageURLPrefix+"bubble-right-arrow.png",margins.right,37);
divInner.appendChild(divImg);

div.style.left=(pageX-Timeline.Graphics._bubblePointOffset-bubbleWidth+
Timeline.Graphics._arrowOffsets.right)+"px";
div.style.top=top+"px";
}else{
var divImg=doc.createElement("div");

divImg.style.left="0px";
divImg.style.top=(pageY-Timeline.Graphics._halfArrowWidth-top)+"px";
setImg(divImg,urlPrefix+imageURLPrefix+"bubble-left-arrow.png",margins.left,37);
divInner.appendChild(divImg);

div.style.left=(pageX+Timeline.Graphics._bubblePointOffset-
Timeline.Graphics._arrowOffsets.left)+"px";
div.style.top=top+"px";
}
})();

doc.body.appendChild(div);

return bubble;
};

Timeline.Graphics.createMessageBubble=function(doc){
var containerDiv=doc.createElement("div");
if(Timeline.Graphics.pngIsTranslucent){
var topDiv=doc.createElement("div");
topDiv.style.height="33px";
topDiv.style.background="url("+Timeline.urlPrefix+imageURLPrefix+"message-top-left.png) top left no-repeat";
topDiv.style.paddingLeft="44px";
containerDiv.appendChild(topDiv);

var topRightDiv=doc.createElement("div");
topRightDiv.style.height="33px";
topRightDiv.style.background="url("+Timeline.urlPrefix+imageURLPrefix+"message-top-right.png) top right no-repeat";
topDiv.appendChild(topRightDiv);

var middleDiv=doc.createElement("div");
middleDiv.style.background="url("+Timeline.urlPrefix+imageURLPrefix+"message-left.png) top left repeat-y";
middleDiv.style.paddingLeft="44px";
containerDiv.appendChild(middleDiv);

var middleRightDiv=doc.createElement("div");
middleRightDiv.style.background="url("+Timeline.urlPrefix+imageURLPrefix+"message-right.png) top right repeat-y";
middleRightDiv.style.paddingRight="44px";
middleDiv.appendChild(middleRightDiv);

var contentDiv=doc.createElement("div");
middleRightDiv.appendChild(contentDiv);

var bottomDiv=doc.createElement("div");
bottomDiv.style.height="55px";
bottomDiv.style.background="url("+Timeline.urlPrefix+imageURLPrefix+"message-bottom-left.png) bottom left no-repeat";
bottomDiv.style.paddingLeft="44px";
containerDiv.appendChild(bottomDiv);

var bottomRightDiv=doc.createElement("div");
bottomRightDiv.style.height="55px";
bottomRightDiv.style.background="url("+Timeline.urlPrefix+imageURLPrefix+"message-bottom-right.png) bottom right no-repeat";
bottomDiv.appendChild(bottomRightDiv);
}else{
containerDiv.style.border="2px solid #7777AA";
containerDiv.style.padding="20px";
containerDiv.style.background="white";
Timeline.Graphics.setOpacity(containerDiv,90);

var contentDiv=doc.createElement("div");
containerDiv.appendChild(contentDiv);
}

return{
containerDiv:containerDiv,
contentDiv:contentDiv
};
};

Timeline.Graphics.createAnimation=function(f,from,to,duration){
return new Timeline.Graphics._Animation(f,from,to,duration);
};

Timeline.Graphics._Animation=function(f,from,to,duration){
this.f=f;

this.from=from;
this.to=to;
this.current=from;

this.duration=duration;
this.start=new Date().getTime();
this.timePassed=0;
};

Timeline.Graphics._Animation.prototype.run=function(){
var a=this;
window.setTimeout(function(){a.step();},100);
};

Timeline.Graphics._Animation.prototype.step=function(){
this.timePassed+=100;

var timePassedFraction=this.timePassed/this.duration;
var parameterFraction=-Math.cos(timePassedFraction*Math.PI)/2+0.5;
var current=parameterFraction*(this.to-this.from)+this.from;

try{
this.f(current,current-this.current);
}catch(e){
}
this.current=current;

if(this.timePassed<this.duration){
this.run();
}
};


/* html.js */



Timeline.HTML=new Object();

Timeline.HTML._e2uHash={};
(function(){
e2uHash=Timeline.HTML._e2uHash;
e2uHash['nbsp']='\u00A0[space]';
e2uHash['iexcl']='\u00A1';
e2uHash['cent']='\u00A2';
e2uHash['pound']='\u00A3';
e2uHash['curren']='\u00A4';
e2uHash['yen']='\u00A5';
e2uHash['brvbar']='\u00A6';
e2uHash['sect']='\u00A7';
e2uHash['uml']='\u00A8';
e2uHash['copy']='\u00A9';
e2uHash['ordf']='\u00AA';
e2uHash['laquo']='\u00AB';
e2uHash['not']='\u00AC';
e2uHash['shy']='\u00AD';
e2uHash['reg']='\u00AE';
e2uHash['macr']='\u00AF';
e2uHash['deg']='\u00B0';
e2uHash['plusmn']='\u00B1';
e2uHash['sup2']='\u00B2';
e2uHash['sup3']='\u00B3';
e2uHash['acute']='\u00B4';
e2uHash['micro']='\u00B5';
e2uHash['para']='\u00B6';
e2uHash['middot']='\u00B7';
e2uHash['cedil']='\u00B8';
e2uHash['sup1']='\u00B9';
e2uHash['ordm']='\u00BA';
e2uHash['raquo']='\u00BB';
e2uHash['frac14']='\u00BC';
e2uHash['frac12']='\u00BD';
e2uHash['frac34']='\u00BE';
e2uHash['iquest']='\u00BF';
e2uHash['Agrave']='\u00C0';
e2uHash['Aacute']='\u00C1';
e2uHash['Acirc']='\u00C2';
e2uHash['Atilde']='\u00C3';
e2uHash['Auml']='\u00C4';
e2uHash['Aring']='\u00C5';
e2uHash['AElig']='\u00C6';
e2uHash['Ccedil']='\u00C7';
e2uHash['Egrave']='\u00C8';
e2uHash['Eacute']='\u00C9';
e2uHash['Ecirc']='\u00CA';
e2uHash['Euml']='\u00CB';
e2uHash['Igrave']='\u00CC';
e2uHash['Iacute']='\u00CD';
e2uHash['Icirc']='\u00CE';
e2uHash['Iuml']='\u00CF';
e2uHash['ETH']='\u00D0';
e2uHash['Ntilde']='\u00D1';
e2uHash['Ograve']='\u00D2';
e2uHash['Oacute']='\u00D3';
e2uHash['Ocirc']='\u00D4';
e2uHash['Otilde']='\u00D5';
e2uHash['Ouml']='\u00D6';
e2uHash['times']='\u00D7';
e2uHash['Oslash']='\u00D8';
e2uHash['Ugrave']='\u00D9';
e2uHash['Uacute']='\u00DA';
e2uHash['Ucirc']='\u00DB';
e2uHash['Uuml']='\u00DC';
e2uHash['Yacute']='\u00DD';
e2uHash['THORN']='\u00DE';
e2uHash['szlig']='\u00DF';
e2uHash['agrave']='\u00E0';
e2uHash['aacute']='\u00E1';
e2uHash['acirc']='\u00E2';
e2uHash['atilde']='\u00E3';
e2uHash['auml']='\u00E4';
e2uHash['aring']='\u00E5';
e2uHash['aelig']='\u00E6';
e2uHash['ccedil']='\u00E7';
e2uHash['egrave']='\u00E8';
e2uHash['eacute']='\u00E9';
e2uHash['ecirc']='\u00EA';
e2uHash['euml']='\u00EB';
e2uHash['igrave']='\u00EC';
e2uHash['iacute']='\u00ED';
e2uHash['icirc']='\u00EE';
e2uHash['iuml']='\u00EF';
e2uHash['eth']='\u00F0';
e2uHash['ntilde']='\u00F1';
e2uHash['ograve']='\u00F2';
e2uHash['oacute']='\u00F3';
e2uHash['ocirc']='\u00F4';
e2uHash['otilde']='\u00F5';
e2uHash['ouml']='\u00F6';
e2uHash['divide']='\u00F7';
e2uHash['oslash']='\u00F8';
e2uHash['ugrave']='\u00F9';
e2uHash['uacute']='\u00FA';
e2uHash['ucirc']='\u00FB';
e2uHash['uuml']='\u00FC';
e2uHash['yacute']='\u00FD';
e2uHash['thorn']='\u00FE';
e2uHash['yuml']='\u00FF';
e2uHash['quot']='\u0022';
e2uHash['amp']='\u0026';
e2uHash['lt']='\u003C';
e2uHash['gt']='\u003E';
e2uHash['OElig']='';
e2uHash['oelig']='\u0153';
e2uHash['Scaron']='\u0160';
e2uHash['scaron']='\u0161';
e2uHash['Yuml']='\u0178';
e2uHash['circ']='\u02C6';
e2uHash['tilde']='\u02DC';
e2uHash['ensp']='\u2002';
e2uHash['emsp']='\u2003';
e2uHash['thinsp']='\u2009';
e2uHash['zwnj']='\u200C';
e2uHash['zwj']='\u200D';
e2uHash['lrm']='\u200E';
e2uHash['rlm']='\u200F';
e2uHash['ndash']='\u2013';
e2uHash['mdash']='\u2014';
e2uHash['lsquo']='\u2018';
e2uHash['rsquo']='\u2019';
e2uHash['sbquo']='\u201A';
e2uHash['ldquo']='\u201C';
e2uHash['rdquo']='\u201D';
e2uHash['bdquo']='\u201E';
e2uHash['dagger']='\u2020';
e2uHash['Dagger']='\u2021';
e2uHash['permil']='\u2030';
e2uHash['lsaquo']='\u2039';
e2uHash['rsaquo']='\u203A';
e2uHash['euro']='\u20AC';
e2uHash['fnof']='\u0192';
e2uHash['Alpha']='\u0391';
e2uHash['Beta']='\u0392';
e2uHash['Gamma']='\u0393';
e2uHash['Delta']='\u0394';
e2uHash['Epsilon']='\u0395';
e2uHash['Zeta']='\u0396';
e2uHash['Eta']='\u0397';
e2uHash['Theta']='\u0398';
e2uHash['Iota']='\u0399';
e2uHash['Kappa']='\u039A';
e2uHash['Lambda']='\u039B';
e2uHash['Mu']='\u039C';
e2uHash['Nu']='\u039D';
e2uHash['Xi']='\u039E';
e2uHash['Omicron']='\u039F';
e2uHash['Pi']='\u03A0';
e2uHash['Rho']='\u03A1';
e2uHash['Sigma']='\u03A3';
e2uHash['Tau']='\u03A4';
e2uHash['Upsilon']='\u03A5';
e2uHash['Phi']='\u03A6';
e2uHash['Chi']='\u03A7';
e2uHash['Psi']='\u03A8';
e2uHash['Omega']='\u03A9';
e2uHash['alpha']='\u03B1';
e2uHash['beta']='\u03B2';
e2uHash['gamma']='\u03B3';
e2uHash['delta']='\u03B4';
e2uHash['epsilon']='\u03B5';
e2uHash['zeta']='\u03B6';
e2uHash['eta']='\u03B7';
e2uHash['theta']='\u03B8';
e2uHash['iota']='\u03B9';
e2uHash['kappa']='\u03BA';
e2uHash['lambda']='\u03BB';
e2uHash['mu']='\u03BC';
e2uHash['nu']='\u03BD';
e2uHash['xi']='\u03BE';
e2uHash['omicron']='\u03BF';
e2uHash['pi']='\u03C0';
e2uHash['rho']='\u03C1';
e2uHash['sigmaf']='\u03C2';
e2uHash['sigma']='\u03C3';
e2uHash['tau']='\u03C4';
e2uHash['upsilon']='\u03C5';
e2uHash['phi']='\u03C6';
e2uHash['chi']='\u03C7';
e2uHash['psi']='\u03C8';
e2uHash['omega']='\u03C9';
e2uHash['thetasym']='\u03D1';
e2uHash['upsih']='\u03D2';
e2uHash['piv']='\u03D6';
e2uHash['bull']='\u2022';
e2uHash['hellip']='\u2026';
e2uHash['prime']='\u2032';
e2uHash['Prime']='\u2033';
e2uHash['oline']='\u203E';
e2uHash['frasl']='\u2044';
e2uHash['weierp']='\u2118';
e2uHash['image']='\u2111';
e2uHash['real']='\u211C';
e2uHash['trade']='\u2122';
e2uHash['alefsym']='\u2135';
e2uHash['larr']='\u2190';
e2uHash['uarr']='\u2191';
e2uHash['rarr']='\u2192';
e2uHash['darr']='\u2193';
e2uHash['harr']='\u2194';
e2uHash['crarr']='\u21B5';
e2uHash['lArr']='\u21D0';
e2uHash['uArr']='\u21D1';
e2uHash['rArr']='\u21D2';
e2uHash['dArr']='\u21D3';
e2uHash['hArr']='\u21D4';
e2uHash['forall']='\u2200';
e2uHash['part']='\u2202';
e2uHash['exist']='\u2203';
e2uHash['empty']='\u2205';
e2uHash['nabla']='\u2207';
e2uHash['isin']='\u2208';
e2uHash['notin']='\u2209';
e2uHash['ni']='\u220B';
e2uHash['prod']='\u220F';
e2uHash['sum']='\u2211';
e2uHash['minus']='\u2212';
e2uHash['lowast']='\u2217';
e2uHash['radic']='\u221A';
e2uHash['prop']='\u221D';
e2uHash['infin']='\u221E';
e2uHash['ang']='\u2220';
e2uHash['and']='\u2227';
e2uHash['or']='\u2228';
e2uHash['cap']='\u2229';
e2uHash['cup']='\u222A';
e2uHash['int']='\u222B';
e2uHash['there4']='\u2234';
e2uHash['sim']='\u223C';
e2uHash['cong']='\u2245';
e2uHash['asymp']='\u2248';
e2uHash['ne']='\u2260';
e2uHash['equiv']='\u2261';
e2uHash['le']='\u2264';
e2uHash['ge']='\u2265';
e2uHash['sub']='\u2282';
e2uHash['sup']='\u2283';
e2uHash['nsub']='\u2284';
e2uHash['sube']='\u2286';
e2uHash['supe']='\u2287';
e2uHash['oplus']='\u2295';
e2uHash['otimes']='\u2297';
e2uHash['perp']='\u22A5';
e2uHash['sdot']='\u22C5';
e2uHash['lceil']='\u2308';
e2uHash['rceil']='\u2309';
e2uHash['lfloor']='\u230A';
e2uHash['rfloor']='\u230B';
e2uHash['lang']='\u2329';
e2uHash['rang']='\u232A';
e2uHash['loz']='\u25CA';
e2uHash['spades']='\u2660';
e2uHash['clubs']='\u2663';
e2uHash['hearts']='\u2665';
e2uHash['diams']='\u2666';
})();

Timeline.HTML.deEntify=function(s){
e2uHash=Timeline.HTML._e2uHash;

var re=/&(\w+?);/;
while(re.test(s)){
var m=s.match(re);
s=s.replace(re,e2uHash[m[1]]);
}
return s;
};

/* xmlhttp.js */



Timeline.XmlHttp=new Object();


Timeline.XmlHttp._onReadyStateChange=function(xmlhttp,fError,fDone){
switch(xmlhttp.readyState){









case 4:

try{
if(xmlhttp.status==0
||xmlhttp.status==200
){
if(fDone){
fDone(xmlhttp);
}

}else{
if(fError){
fError(
xmlhttp.statusText,

xmlhttp.status,

xmlhttp

);
}

}

}catch(e){

Timeline.Debug.exception(e);

}

break;
}
};


Timeline.XmlHttp._createRequest=function(){
if(Timeline.Platform.browser.isIE){
var programIDs=[
"Msxml2.XMLHTTP",
"Microsoft.XMLHTTP",
"Msxml2.XMLHTTP.4.0"
];
for(var i=0;i<programIDs.length;i++){
try{
var programID=programIDs[i];
var f=function(){
return new ActiveXObject(programID);
};
var o=f();






Timeline.XmlHttp._createRequest=f;

return o;
}catch(e){

}
}
throw new Error("Failed to create an XMLHttpRequest object");
}else{
try{
var f=function(){
return new XMLHttpRequest();
};
var o=f();






Timeline.XmlHttp._createRequest=f;

return o;
}catch(e){
throw new Error("Failed to create an XMLHttpRequest object");
}
}
};


Timeline.XmlHttp.get=function(url,fError,fDone){
var xmlhttp=Timeline.XmlHttp._createRequest();

xmlhttp.open("GET",url,true);
xmlhttp.onreadystatechange=function(){
Timeline.XmlHttp._onReadyStateChange(xmlhttp,fError,fDone);
};
xmlhttp.send(null);
};


Timeline.XmlHttp.post=function(url,body,fError,fDone){
var xmlhttp=Timeline.XmlHttp._createRequest();

xmlhttp.open("POST",url,true);
xmlhttp.onreadystatechange=function(){
Timeline.XmlHttp._onReadyStateChange(xmlhttp,fError,fDone);
};
xmlhttp.send(body);
};

Timeline.XmlHttp._forceXML=function(xmlhttp){
try{
xmlhttp.overrideMimeType("text/xml");
}catch(e){
xmlhttp.setrequestheader("Content-Type","text/xml");
}
};

/* decorators.js */



Timeline.SpanHighlightDecorator=function(params){
this._unit=("unit"in params)?params.unit:Timeline.NativeDateUnit;
this._startDate=(typeof params.startDate=="string")?
this._unit.parseFromObject(params.startDate):params.startDate;
this._endDate=(typeof params.endDate=="string")?
this._unit.parseFromObject(params.endDate):params.endDate;
this._startLabel=params.startLabel;
this._endLabel=params.endLabel;
this._color=params.color;
this._opacity=("opacity"in params)?params.opacity:100;
};

Timeline.SpanHighlightDecorator.prototype.initialize=function(band,timeline){
this._band=band;
this._timeline=timeline;

this._layerDiv=null;
};

Timeline.SpanHighlightDecorator.prototype.paint=function(){
if(this._layerDiv!=null){
this._band.removeLayerDiv(this._layerDiv);
}
this._layerDiv=this._band.createLayerDiv(10);
this._layerDiv.setAttribute("name","span-highlight-decorator");
this._layerDiv.style.display="none";

var minDate=this._band.getMinDate();
var maxDate=this._band.getMaxDate();

if(this._unit.compare(this._startDate,maxDate)<0&&
this._unit.compare(this._endDate,minDate)>0){

minDate=this._unit.later(minDate,this._startDate);
maxDate=this._unit.earlier(maxDate,this._endDate);

var minPixel=this._band.dateToPixelOffset(minDate);
var maxPixel=this._band.dateToPixelOffset(maxDate);

var doc=this._timeline.getDocument();

var createTable=function(){
var table=doc.createElement("table");
table.insertRow(0).insertCell(0);
return table;
};

var div=doc.createElement("div");
div.style.position="absolute";
div.style.overflow="hidden";
div.style.background=this._color;
if(this._opacity<100){
Timeline.Graphics.setOpacity(div,this._opacity);
}
this._layerDiv.appendChild(div);

var tableStartLabel=createTable();
tableStartLabel.style.position="absolute";
tableStartLabel.style.overflow="hidden";
tableStartLabel.style.fontSize="300%";
tableStartLabel.style.fontWeight="bold";
tableStartLabel.style.color=this._color;
tableStartLabel.rows[0].cells[0].innerHTML=this._startLabel;
this._layerDiv.appendChild(tableStartLabel);

var tableEndLabel=createTable();
tableEndLabel.style.position="absolute";
tableEndLabel.style.overflow="hidden";
tableEndLabel.style.fontSize="300%";
tableEndLabel.style.fontWeight="bold";
tableEndLabel.style.color=this._color;
tableEndLabel.rows[0].cells[0].innerHTML=this._endLabel;
this._layerDiv.appendChild(tableEndLabel);

if(this._timeline.isHorizontal()){
div.style.left=minPixel+"px";
div.style.width=(maxPixel-minPixel)+"px";
div.style.top="0px";
div.style.height="100%";

tableStartLabel.style.right=(this._band.getTotalViewLength()-minPixel)+"px";
tableStartLabel.style.width=(this._startLabel.length)+"em";
tableStartLabel.style.top="0px";
tableStartLabel.style.height="100%";
tableStartLabel.style.textAlign="right";

tableEndLabel.style.left=maxPixel+"px";
tableEndLabel.style.width=(this._endLabel.length)+"em";
tableEndLabel.style.top="0px";
tableEndLabel.style.height="100%";
}else{
div.style.top=minPixel+"px";
div.style.height=(maxPixel-minPixel)+"px";
div.style.left="0px";
div.style.width="100%";

tableStartLabel.style.bottom=minPixel+"px";
tableStartLabel.style.height="1.5px";
tableStartLabel.style.left="0px";
tableStartLabel.style.width="100%";

tableEndLabel.style.top=maxPixel+"px";
tableEndLabel.style.height="1.5px";
tableEndLabel.style.left="0px";
tableEndLabel.style.width="100%";
}
}
this._layerDiv.style.display="block";
};

Timeline.SpanHighlightDecorator.prototype.softPaint=function(){
};



Timeline.PointHighlightDecorator=function(params){
this._unit=("unit"in params)?params.unit:Timeline.NativeDateUnit;
this._date=(typeof params.date=="string")?
this._unit.parseFromObject(params.date):params.date;
this._width=("width"in params)?params.width:10;
this._color=params.color;
this._opacity=("opacity"in params)?params.opacity:100;
};

Timeline.PointHighlightDecorator.prototype.initialize=function(band,timeline){
this._band=band;
this._timeline=timeline;

this._layerDiv=null;
};

Timeline.PointHighlightDecorator.prototype.paint=function(){
if(this._layerDiv!=null){
this._band.removeLayerDiv(this._layerDiv);
}
this._layerDiv=this._band.createLayerDiv(10);
this._layerDiv.setAttribute("name","span-highlight-decorator");
this._layerDiv.style.display="none";

var minDate=this._band.getMinDate();
var maxDate=this._band.getMaxDate();

if(this._unit.compare(this._date,maxDate)<0&&
this._unit.compare(this._date,minDate)>0){

var pixel=this._band.dateToPixelOffset(this._date);
var minPixel=pixel-Math.round(this._width/2);

var doc=this._timeline.getDocument();

var div=doc.createElement("div");
div.style.position="absolute";
div.style.overflow="hidden";
div.style.background=this._color;
if(this._opacity<100){
Timeline.Graphics.setOpacity(div,this._opacity);
}
this._layerDiv.appendChild(div);

if(this._timeline.isHorizontal()){
div.style.left=minPixel+"px";
div.style.width=this._width+"px";
div.style.top="0px";
div.style.height="100%";
}else{
div.style.top=minPixel+"px";
div.style.height=this._width+"px";
div.style.left="0px";
div.style.width="100%";
}
}
this._layerDiv.style.display="block";
};

Timeline.PointHighlightDecorator.prototype.softPaint=function(){
};


/* ether-painters.js */



Timeline.GregorianEtherPainter=function(params){
this._params=params;
this._theme=params.theme;
this._unit=params.unit;
this._multiple=("multiple"in params)?params.multiple:1;
};

Timeline.GregorianEtherPainter.prototype.initialize=function(band,timeline){
this._band=band;
this._timeline=timeline;

this._backgroundLayer=band.createLayerDiv(0);
this._backgroundLayer.setAttribute("name","ether-background");
this._backgroundLayer.style.background=this._theme.ether.backgroundColors[band.getIndex()];

this._markerLayer=null;
this._lineLayer=null;

var align=("align"in this._params&&this._params.align!=undefined)?this._params.align:
this._theme.ether.interval.marker[timeline.isHorizontal()?"hAlign":"vAlign"];
var showLine=("showLine"in this._params)?this._params.showLine:
this._theme.ether.interval.line.show;

this._intervalMarkerLayout=new Timeline.EtherIntervalMarkerLayout(
this._timeline,this._band,this._theme,align,showLine);

this._highlight=new Timeline.EtherHighlight(
this._timeline,this._band,this._theme,this._backgroundLayer);
}

Timeline.GregorianEtherPainter.prototype.setHighlight=function(startDate,endDate){
this._highlight.position(startDate,endDate);
}

Timeline.GregorianEtherPainter.prototype.paint=function(){
if(this._markerLayer){
this._band.removeLayerDiv(this._markerLayer);
}
this._markerLayer=this._band.createLayerDiv(100);
this._markerLayer.setAttribute("name","ether-markers");
this._markerLayer.style.display="none";

if(this._lineLayer){
this._band.removeLayerDiv(this._lineLayer);
}
this._lineLayer=this._band.createLayerDiv(1);
this._lineLayer.setAttribute("name","ether-lines");
this._lineLayer.style.display="none";

var minDate=this._band.getMinDate();
var maxDate=this._band.getMaxDate();

var timeZone=this._band.getTimeZone();
var labeller=this._band.getLabeller();

Timeline.DateTime.roundDownToInterval(minDate,this._unit,timeZone,this._multiple,this._theme.firstDayOfWeek);

var p=this;
var incrementDate=function(date){
for(var i=0;i<p._multiple;i++){
Timeline.DateTime.incrementByInterval(date,p._unit);
}
};

while(minDate.getTime()<maxDate.getTime()){
this._intervalMarkerLayout.createIntervalMarker(
minDate,labeller,this._unit,this._markerLayer,this._lineLayer);

incrementDate(minDate);
}
this._markerLayer.style.display="block";
this._lineLayer.style.display="block";
};

Timeline.GregorianEtherPainter.prototype.softPaint=function(){
};



Timeline.HotZoneGregorianEtherPainter=function(params){
this._params=params;
this._theme=params.theme;

this._zones=[{
startTime:Number.NEGATIVE_INFINITY,
endTime:Number.POSITIVE_INFINITY,
unit:params.unit,
multiple:1
}];
for(var i=0;i<params.zones.length;i++){
var zone=params.zones[i];
var zoneStart=Timeline.DateTime.parseGregorianDateTime(zone.start).getTime();
var zoneEnd=Timeline.DateTime.parseGregorianDateTime(zone.end).getTime();

for(var j=0;j<this._zones.length&&zoneEnd>zoneStart;j++){
var zone2=this._zones[j];

if(zoneStart<zone2.endTime){
if(zoneStart>zone2.startTime){
this._zones.splice(j,0,{
startTime:zone2.startTime,
endTime:zoneStart,
unit:zone2.unit,
multiple:zone2.multiple
});
j++;

zone2.startTime=zoneStart;
}

if(zoneEnd<zone2.endTime){
this._zones.splice(j,0,{
startTime:zoneStart,
endTime:zoneEnd,
unit:zone.unit,
multiple:(zone.multiple)?zone.multiple:1
});
j++;

zone2.startTime=zoneEnd;
zoneStart=zoneEnd;
}else{
zone2.multiple=zone.multiple;
zone2.unit=zone.unit;
zoneStart=zone2.endTime;
}
}
}
}
};

Timeline.HotZoneGregorianEtherPainter.prototype.initialize=function(band,timeline){
this._band=band;
this._timeline=timeline;

this._backgroundLayer=band.createLayerDiv(0);
this._backgroundLayer.setAttribute("name","ether-background");
this._backgroundLayer.style.background=this._theme.ether.backgroundColors[band.getIndex()];

this._markerLayer=null;
this._lineLayer=null;

var align=("align"in this._params&&this._params.align!=undefined)?this._params.align:
this._theme.ether.interval.marker[timeline.isHorizontal()?"hAlign":"vAlign"];
var showLine=("showLine"in this._params)?this._params.showLine:
this._theme.ether.interval.line.show;

this._intervalMarkerLayout=new Timeline.EtherIntervalMarkerLayout(
this._timeline,this._band,this._theme,align,showLine);

this._highlight=new Timeline.EtherHighlight(
this._timeline,this._band,this._theme,this._backgroundLayer);
}

Timeline.HotZoneGregorianEtherPainter.prototype.setHighlight=function(startDate,endDate){
this._highlight.position(startDate,endDate);
}

Timeline.HotZoneGregorianEtherPainter.prototype.paint=function(){
if(this._markerLayer){
this._band.removeLayerDiv(this._markerLayer);
}
this._markerLayer=this._band.createLayerDiv(100);
this._markerLayer.setAttribute("name","ether-markers");
this._markerLayer.style.display="none";

if(this._lineLayer){
this._band.removeLayerDiv(this._lineLayer);
}
this._lineLayer=this._band.createLayerDiv(1);
this._lineLayer.setAttribute("name","ether-lines");
this._lineLayer.style.display="none";

var minDate=this._band.getMinDate();
var maxDate=this._band.getMaxDate();

var timeZone=this._band.getTimeZone();
var labeller=this._band.getLabeller();

var p=this;
var incrementDate=function(date,zone){
for(var i=0;i<zone.multiple;i++){
Timeline.DateTime.incrementByInterval(date,zone.unit);
}
};

var zStart=0;
while(zStart<this._zones.length){
if(minDate.getTime()<this._zones[zStart].endTime){
break;
}
zStart++;
}
var zEnd=this._zones.length-1;
while(zEnd>=0){
if(maxDate.getTime()>this._zones[zEnd].startTime){
break;
}
zEnd--;
}

for(var z=zStart;z<=zEnd;z++){
var zone=this._zones[z];

var minDate2=new Date(Math.max(minDate.getTime(),zone.startTime));
var maxDate2=new Date(Math.min(maxDate.getTime(),zone.endTime));

Timeline.DateTime.roundDownToInterval(minDate2,zone.unit,timeZone,zone.multiple,this._theme.firstDayOfWeek);
Timeline.DateTime.roundUpToInterval(maxDate2,zone.unit,timeZone,zone.multiple,this._theme.firstDayOfWeek);

while(minDate2.getTime()<maxDate2.getTime()){
this._intervalMarkerLayout.createIntervalMarker(
minDate2,labeller,zone.unit,this._markerLayer,this._lineLayer);

incrementDate(minDate2,zone);
}
}
this._markerLayer.style.display="block";
this._lineLayer.style.display="block";
};

Timeline.HotZoneGregorianEtherPainter.prototype.softPaint=function(){
};



Timeline.YearCountEtherPainter=function(params){
this._params=params;
this._theme=params.theme;
this._startDate=Timeline.DateTime.parseGregorianDateTime(params.startDate);
this._multiple=("multiple"in params)?params.multiple:1;
};

Timeline.YearCountEtherPainter.prototype.initialize=function(band,timeline){
this._band=band;
this._timeline=timeline;

this._backgroundLayer=band.createLayerDiv(0);
this._backgroundLayer.setAttribute("name","ether-background");
this._backgroundLayer.style.background=this._theme.ether.backgroundColors[band.getIndex()];

this._markerLayer=null;
this._lineLayer=null;

var align=("align"in this._params)?this._params.align:
this._theme.ether.interval.marker[timeline.isHorizontal()?"hAlign":"vAlign"];
var showLine=("showLine"in this._params)?this._params.showLine:
this._theme.ether.interval.line.show;

this._intervalMarkerLayout=new Timeline.EtherIntervalMarkerLayout(
this._timeline,this._band,this._theme,align,showLine);

this._highlight=new Timeline.EtherHighlight(
this._timeline,this._band,this._theme,this._backgroundLayer);
};

Timeline.YearCountEtherPainter.prototype.setHighlight=function(startDate,endDate){
this._highlight.position(startDate,endDate);
};

Timeline.YearCountEtherPainter.prototype.paint=function(){
if(this._markerLayer){
this._band.removeLayerDiv(this._markerLayer);
}
this._markerLayer=this._band.createLayerDiv(100);
this._markerLayer.setAttribute("name","ether-markers");
this._markerLayer.style.display="none";

if(this._lineLayer){
this._band.removeLayerDiv(this._lineLayer);
}
this._lineLayer=this._band.createLayerDiv(1);
this._lineLayer.setAttribute("name","ether-lines");
this._lineLayer.style.display="none";

var minDate=new Date(this._startDate.getTime());
var maxDate=this._band.getMaxDate();
var yearDiff=this._band.getMinDate().getUTCFullYear()-this._startDate.getUTCFullYear();
minDate.setUTCFullYear(this._band.getMinDate().getUTCFullYear()-yearDiff%this._multiple);

var p=this;
var incrementDate=function(date){
for(var i=0;i<p._multiple;i++){
Timeline.DateTime.incrementByInterval(date,Timeline.DateTime.YEAR);
}
};
var labeller={
labelInterval:function(date,intervalUnit){
var diff=date.getUTCFullYear()-p._startDate.getUTCFullYear();
return{
text:diff,
emphasized:diff==0
};
}
};

while(minDate.getTime()<maxDate.getTime()){
this._intervalMarkerLayout.createIntervalMarker(
minDate,labeller,Timeline.DateTime.YEAR,this._markerLayer,this._lineLayer);

incrementDate(minDate);
}
this._markerLayer.style.display="block";
this._lineLayer.style.display="block";
};

Timeline.YearCountEtherPainter.prototype.softPaint=function(){
};



Timeline.QuarterlyEtherPainter=function(params){
this._params=params;
this._theme=params.theme;
this._startDate=Timeline.DateTime.parseGregorianDateTime(params.startDate);
};

Timeline.QuarterlyEtherPainter.prototype.initialize=function(band,timeline){
this._band=band;
this._timeline=timeline;

this._backgroundLayer=band.createLayerDiv(0);
this._backgroundLayer.setAttribute("name","ether-background");
this._backgroundLayer.style.background=this._theme.ether.backgroundColors[band.getIndex()];

this._markerLayer=null;
this._lineLayer=null;

var align=("align"in this._params)?this._params.align:
this._theme.ether.interval.marker[timeline.isHorizontal()?"hAlign":"vAlign"];
var showLine=("showLine"in this._params)?this._params.showLine:
this._theme.ether.interval.line.show;

this._intervalMarkerLayout=new Timeline.EtherIntervalMarkerLayout(
this._timeline,this._band,this._theme,align,showLine);

this._highlight=new Timeline.EtherHighlight(
this._timeline,this._band,this._theme,this._backgroundLayer);
};

Timeline.QuarterlyEtherPainter.prototype.setHighlight=function(startDate,endDate){
this._highlight.position(startDate,endDate);
};

Timeline.QuarterlyEtherPainter.prototype.paint=function(){
if(this._markerLayer){
this._band.removeLayerDiv(this._markerLayer);
}
this._markerLayer=this._band.createLayerDiv(100);
this._markerLayer.setAttribute("name","ether-markers");
this._markerLayer.style.display="none";

if(this._lineLayer){
this._band.removeLayerDiv(this._lineLayer);
}
this._lineLayer=this._band.createLayerDiv(1);
this._lineLayer.setAttribute("name","ether-lines");
this._lineLayer.style.display="none";

var minDate=new Date(0);
var maxDate=this._band.getMaxDate();

minDate.setUTCFullYear(Math.max(this._startDate.getUTCFullYear(),this._band.getMinDate().getUTCFullYear()));
minDate.setUTCMonth(this._startDate.getUTCMonth());

var p=this;
var incrementDate=function(date){
date.setUTCMonth(date.getUTCMonth()+3);
};
var labeller={
labelInterval:function(date,intervalUnit){
var quarters=(4+(date.getUTCMonth()-p._startDate.getUTCMonth())/3)%4;
if(quarters!=0){
return{text:"Q"+(quarters+1),emphasized:false};
}else{
return{text:"Y"+(date.getUTCFullYear()-p._startDate.getUTCFullYear()+1),emphasized:true};
}
}
};

while(minDate.getTime()<maxDate.getTime()){
this._intervalMarkerLayout.createIntervalMarker(
minDate,labeller,Timeline.DateTime.YEAR,this._markerLayer,this._lineLayer);

incrementDate(minDate);
}
this._markerLayer.style.display="block";
this._lineLayer.style.display="block";
};

Timeline.QuarterlyEtherPainter.prototype.softPaint=function(){
};



Timeline.EtherIntervalMarkerLayout=function(timeline,band,theme,align,showLine){
var horizontal=timeline.isHorizontal();
if(horizontal){
if(align=="Top"){
this.positionDiv=function(div,offset){
div.style.left=offset+"px";
div.style.top="0px";
};
}else{
this.positionDiv=function(div,offset){
div.style.left=offset+"px";
div.style.bottom="0px";
};
}
}else{
if(align=="Left"){
this.positionDiv=function(div,offset){
div.style.top=offset+"px";
div.style.left="0px";
};
}else{
this.positionDiv=function(div,offset){
div.style.top=offset+"px";
div.style.right="0px";
};
}
}

var markerTheme=theme.ether.interval.marker;
var lineTheme=theme.ether.interval.line;
var weekendTheme=theme.ether.interval.weekend;

var stylePrefix=(horizontal?"h":"v")+align;
var labelStyler=markerTheme[stylePrefix+"Styler"];
var emphasizedLabelStyler=markerTheme[stylePrefix+"EmphasizedStyler"];
var day=Timeline.DateTime.gregorianUnitLengths[Timeline.DateTime.DAY];

this.createIntervalMarker=function(date,labeller,unit,markerDiv,lineDiv){
var offset=Math.round(band.dateToPixelOffset(date));

if(showLine&&unit!=Timeline.DateTime.WEEK){
var divLine=timeline.getDocument().createElement("div");
divLine.style.position="absolute";

if(lineTheme.opacity<100){
Timeline.Graphics.setOpacity(divLine,lineTheme.opacity);
}

if(horizontal){
divLine.style.borderLeft="1px solid "+lineTheme.color;
divLine.style.left=offset+"px";
divLine.style.width="1px";
divLine.style.top="0px";
divLine.style.height="100%";
}else{
divLine.style.borderTop="1px solid "+lineTheme.color;
divLine.style.top=offset+"px";
divLine.style.height="1px";
divLine.style.left="0px";
divLine.style.width="100%";
}
lineDiv.appendChild(divLine);
}
if(unit==Timeline.DateTime.WEEK){
var firstDayOfWeek=theme.firstDayOfWeek;

var saturday=new Date(date.getTime()+(6-firstDayOfWeek-7)*day);
var monday=new Date(saturday.getTime()+2*day);

var saturdayPixel=Math.round(band.dateToPixelOffset(saturday));
var mondayPixel=Math.round(band.dateToPixelOffset(monday));
var length=Math.max(1,mondayPixel-saturdayPixel);

var divWeekend=timeline.getDocument().createElement("div");
divWeekend.style.position="absolute";

divWeekend.style.background=weekendTheme.color;
if(weekendTheme.opacity<100){
Timeline.Graphics.setOpacity(divWeekend,weekendTheme.opacity);
}

if(horizontal){
divWeekend.style.left=saturdayPixel+"px";
divWeekend.style.width=length+"px";
divWeekend.style.top="0px";
divWeekend.style.height="100%";
}else{
divWeekend.style.top=saturdayPixel+"px";
divWeekend.style.height=length+"px";
divWeekend.style.left="0px";
divWeekend.style.width="100%";
}
lineDiv.appendChild(divWeekend);
}

var label=labeller.labelInterval(date,unit);

var div=timeline.getDocument().createElement("div");
div.innerHTML=label.text;
div.style.position="absolute";
(label.emphasized?emphasizedLabelStyler:labelStyler)(div);

this.positionDiv(div,offset);
markerDiv.appendChild(div);

return div;
};
};



Timeline.EtherHighlight=function(timeline,band,theme,backgroundLayer){
var horizontal=timeline.isHorizontal();

this._highlightDiv=null;
this._createHighlightDiv=function(){
if(this._highlightDiv==null){
this._highlightDiv=timeline.getDocument().createElement("div");
this._highlightDiv.setAttribute("name","ether-highlight");
this._highlightDiv.style.position="absolute";
this._highlightDiv.style.background=theme.ether.highlightColor;

var opacity=theme.ether.highlightOpacity;
if(opacity<100){
Timeline.Graphics.setOpacity(this._highlightDiv,opacity);
}

backgroundLayer.appendChild(this._highlightDiv);
}
}

this.position=function(startDate,endDate){
this._createHighlightDiv();

var startPixel=Math.round(band.dateToPixelOffset(startDate));
var endPixel=Math.round(band.dateToPixelOffset(endDate));
var length=Math.max(endPixel-startPixel,3);
if(horizontal){
this._highlightDiv.style.left=startPixel+"px";
this._highlightDiv.style.width=length+"px";
this._highlightDiv.style.top="2px";
this._highlightDiv.style.height=(band.getViewWidth()-4)+"px";
}else{
this._highlightDiv.style.top=startPixel+"px";
this._highlightDiv.style.height=length+"px";
this._highlightDiv.style.left="2px";
this._highlightDiv.style.width=(band.getViewWidth()-4)+"px";
}
}
};



/* ethers.js */



Timeline.LinearEther=function(params){
this._params=params;
this._interval=params.interval;
this._pixelsPerInterval=params.pixelsPerInterval;
};

Timeline.LinearEther.prototype.initialize=function(timeline){
this._timeline=timeline;
this._unit=timeline.getUnit();

if("startsOn"in this._params){
this._start=this._unit.parseFromObject(this._params.startsOn);
}else if("endsOn"in this._params){
this._start=this._unit.parseFromObject(this._params.endsOn);
this.shiftPixels(-this._timeline.getPixelLength());
}else if("centersOn"in this._params){
this._start=this._unit.parseFromObject(this._params.centersOn);
this.shiftPixels(-this._timeline.getPixelLength()/2);
}else{
this._start=this._unit.makeDefaultValue();
this.shiftPixels(-this._timeline.getPixelLength()/2);
}
};

Timeline.LinearEther.prototype.setDate=function(date){
this._start=this._unit.cloneValue(date);
};

Timeline.LinearEther.prototype.shiftPixels=function(pixels){
var numeric=this._interval*pixels/this._pixelsPerInterval;
this._start=this._unit.change(this._start,numeric);
};

Timeline.LinearEther.prototype.dateToPixelOffset=function(date){
var numeric=this._unit.compare(date,this._start);
return this._pixelsPerInterval*numeric/this._interval;
};

Timeline.LinearEther.prototype.pixelOffsetToDate=function(pixels){
var numeric=pixels*this._interval/this._pixelsPerInterval;
return this._unit.change(this._start,numeric);
};



Timeline.HotZoneEther=function(params){
this._params=params;
this._interval=params.interval;
this._pixelsPerInterval=params.pixelsPerInterval;
};

Timeline.HotZoneEther.prototype.initialize=function(timeline){
this._timeline=timeline;
this._unit=timeline.getUnit();

this._zones=[{
startTime:Number.NEGATIVE_INFINITY,
endTime:Number.POSITIVE_INFINITY,
magnify:1
}];
var params=this._params;
for(var i=0;i<params.zones.length;i++){
var zone=params.zones[i];
var zoneStart=this._unit.parseFromObject(zone.start);
var zoneEnd=this._unit.parseFromObject(zone.end);

for(var j=0;j<this._zones.length&&this._unit.compare(zoneEnd,zoneStart)>0;j++){
var zone2=this._zones[j];

if(this._unit.compare(zoneStart,zone2.endTime)<0){
if(this._unit.compare(zoneStart,zone2.startTime)>0){
this._zones.splice(j,0,{
startTime:zone2.startTime,
endTime:zoneStart,
magnify:zone2.magnify
});
j++;

zone2.startTime=zoneStart;
}

if(this._unit.compare(zoneEnd,zone2.endTime)<0){
this._zones.splice(j,0,{
startTime:zoneStart,
endTime:zoneEnd,
magnify:zone.magnify*zone2.magnify
});
j++;

zone2.startTime=zoneEnd;
zoneStart=zoneEnd;
}else{
zone2.magnify*=zone.magnify;
zoneStart=zone2.endTime;
}
}
}
}

if("startsOn"in this._params){
this._start=this._unit.parseFromObject(this._params.startsOn);
}else if("endsOn"in this._params){
this._start=this._unit.parseFromObject(this._params.endsOn);
this.shiftPixels(-this._timeline.getPixelLength());
}else if("centersOn"in this._params){
this._start=this._unit.parseFromObject(this._params.centersOn);
this.shiftPixels(-this._timeline.getPixelLength()/2);
}else{
this._start=this._unit.makeDefaultValue();
this.shiftPixels(-this._timeline.getPixelLength()/2);
}
};

Timeline.HotZoneEther.prototype.setDate=function(date){
this._start=this._unit.cloneValue(date);
};

Timeline.HotZoneEther.prototype.shiftPixels=function(pixels){
this._start=this.pixelOffsetToDate(pixels);
};

Timeline.HotZoneEther.prototype.dateToPixelOffset=function(date){
return this._dateDiffToPixelOffset(this._start,date);
};

Timeline.HotZoneEther.prototype.pixelOffsetToDate=function(pixels){
return this._pixelOffsetToDate(pixels,this._start);
};

Timeline.HotZoneEther.prototype._dateDiffToPixelOffset=function(fromDate,toDate){
var scale=this._getScale();
var fromTime=fromDate;
var toTime=toDate;

var pixels=0;
if(this._unit.compare(fromTime,toTime)<0){
var z=0;
while(z<this._zones.length){
if(this._unit.compare(fromTime,this._zones[z].endTime)<0){
break;
}
z++;
}

while(this._unit.compare(fromTime,toTime)<0){
var zone=this._zones[z];
var toTime2=this._unit.earlier(toTime,zone.endTime);

pixels+=(this._unit.compare(toTime2,fromTime)/(scale/zone.magnify));

fromTime=toTime2;
z++;
}
}else{
var z=this._zones.length-1;
while(z>=0){
if(this._unit.compare(fromTime,this._zones[z].startTime)>0){
break;
}
z--;
}

while(this._unit.compare(fromTime,toTime)>0){
var zone=this._zones[z];
var toTime2=this._unit.later(toTime,zone.startTime);

pixels+=(this._unit.compare(toTime2,fromTime)/(scale/zone.magnify));

fromTime=toTime2;
z--;
}
}
return pixels;
};

Timeline.HotZoneEther.prototype._pixelOffsetToDate=function(pixels,fromDate){
var scale=this._getScale();
var time=fromDate;
if(pixels>0){
var z=0;
while(z<this._zones.length){
if(this._unit.compare(time,this._zones[z].endTime)<0){
break;
}
z++;
}

while(pixels>0){
var zone=this._zones[z];
var scale2=scale/zone.magnify;

if(zone.endTime==Number.POSITIVE_INFINITY){
time=this._unit.change(time,pixels*scale2);
pixels=0;
}else{
var pixels2=this._unit.compare(zone.endTime,time)/scale2;
if(pixels2>pixels){
time=this._unit.change(time,pixels*scale2);
pixels=0;
}else{
time=zone.endTime;
pixels-=pixels2;
}
}
z++;
}
}else{
var z=this._zones.length-1;
while(z>=0){
if(this._unit.compare(time,this._zones[z].startTime)>0){
break;
}
z--;
}

pixels=-pixels;
while(pixels>0){
var zone=this._zones[z];
var scale2=scale/zone.magnify;

if(zone.startTime==Number.NEGATIVE_INFINITY){
time=this._unit.change(time,-pixels*scale2);
pixels=0;
}else{
var pixels2=this._unit.compare(time,zone.startTime)/scale2;
if(pixels2>pixels){
time=this._unit.change(time,-pixels*scale2);
pixels=0;
}else{
time=zone.startTime;
pixels-=pixels2;
}
}
z--;
}
}
return time;
};

Timeline.HotZoneEther.prototype._getScale=function(){
return this._interval/this._pixelsPerInterval;
};


/* labellers.js */



Timeline.GregorianDateLabeller=function(locale,timeZone){
this._locale=locale;
this._timeZone=timeZone;
};

Timeline.GregorianDateLabeller.monthNames=[];
Timeline.GregorianDateLabeller.dayNames=[];
Timeline.GregorianDateLabeller.labelIntervalFunctions=[];

Timeline.GregorianDateLabeller.getMonthName=function(month,locale){
return Timeline.GregorianDateLabeller.monthNames[locale][month];
};

Timeline.GregorianDateLabeller.prototype.labelInterval=function(date,intervalUnit){
var f=Timeline.GregorianDateLabeller.labelIntervalFunctions[this._locale];
if(f==null){
f=Timeline.GregorianDateLabeller.prototype.defaultLabelInterval;
}
return f.call(this,date,intervalUnit);
};

Timeline.GregorianDateLabeller.prototype.labelPrecise=function(date){
return Timeline.DateTime.removeTimeZoneOffset(
date,
this._timeZone
).toUTCString();
};

Timeline.GregorianDateLabeller.prototype.defaultLabelInterval=function(date,intervalUnit){
var text;
var emphasized=false;

date=Timeline.DateTime.removeTimeZoneOffset(date,this._timeZone);

switch(intervalUnit){
case Timeline.DateTime.MILLISECOND:
text=date.getUTCMilliseconds();
break;
case Timeline.DateTime.SECOND:
text=date.getUTCSeconds();
break;
case Timeline.DateTime.MINUTE:
var m=date.getUTCMinutes();
if(m==0){
text=date.getUTCHours()+":00";
emphasized=true;
}else{
text=m;
}
break;
case Timeline.DateTime.HOUR:
text=date.getUTCHours()+"hr";
break;
case Timeline.DateTime.DAY:
text=Timeline.GregorianDateLabeller.getMonthName(date.getUTCMonth(),this._locale)+" "+date.getUTCDate();
break;
case Timeline.DateTime.WEEK:
text=Timeline.GregorianDateLabeller.getMonthName(date.getUTCMonth(),this._locale)+" "+date.getUTCDate();
break;
case Timeline.DateTime.MONTH:
var m=date.getUTCMonth();
if(m!=0){
text=Timeline.GregorianDateLabeller.getMonthName(m,this._locale);
break;
}
case Timeline.DateTime.YEAR:
case Timeline.DateTime.DECADE:
case Timeline.DateTime.CENTURY:
case Timeline.DateTime.MILLENNIUM:
var y=date.getUTCFullYear();
if(y>0){
text=date.getUTCFullYear();
}else{
text=(1-y)+"BC";
}
emphasized=
(intervalUnit==Timeline.DateTime.MONTH)||
(intervalUnit==Timeline.DateTime.DECADE&&y%100==0)||
(intervalUnit==Timeline.DateTime.CENTURY&&y%1000==0);
break;
default:
text=date.toUTCString();
}
return{text:text,emphasized:emphasized};
}



/* layouts.js */




Timeline.StaticTrackBasedLayout=function(params){
this._eventSource=params.eventSource;
this._ether=params.ether;
this._theme=params.theme;
this._showText=("showText"in params)?params.showText:true;

this._laidout=false;

var layout=this;
if(this._eventSource!=null){
this._eventSource.addListener({
onAddMany:function(){
layout._laidout=false;
}
});
}
};

Timeline.StaticTrackBasedLayout.prototype.initialize=function(timeline){
this._timeline=timeline;
};

Timeline.StaticTrackBasedLayout.prototype.getTrack=function(evt){
if(!this._laidout){
this._tracks=[];
this._layout();
this._laidout=true;
}
return this._tracks[evt.getID()];
};

Timeline.StaticTrackBasedLayout.prototype.getTrackCount=function(){
if(!this._laidout){
this._tracks=[];
this._layout();
this._laidout=true;
}
return this._trackCount;
};

Timeline.StaticTrackBasedLayout.prototype._layout=function(){
if(this._eventSource==null){
return;
}

var streams=[Number.NEGATIVE_INFINITY];
var layout=this;
var showText=this._showText;
var theme=this._theme;
var eventTheme=theme.event;

var layoutInstant=function(evt,startPixel,endPixel,streamOffset){
var finalPixel=startPixel-1;
if(evt.isImprecise()){
finalPixel=endPixel;
}
if(showText){
finalPixel=Math.max(finalPixel,startPixel+eventTheme.label.width);
}

return finalPixel;
};
var layoutDuration=function(evt,startPixel,endPixel,streamOffset){
if(evt.isImprecise()){
var startDate=evt.getStart();
var endDate=evt.getEnd();

var startPixel2=Math.round(layout._ether.dateToPixelOffset(startDate));
var endPixel2=Math.round(layout._ether.dateToPixelOffset(endDate));
}else{
var startPixel2=startPixel;
var endPixel2=endPixel;
}

var finalPixel=endPixel2;
var length=Math.max(endPixel2-startPixel2,1);

if(showText){
if(length<eventTheme.label.width){
finalPixel=endPixel2+eventTheme.label.width;
}
}

return finalPixel;
};
var layoutEvent=function(evt){
var startDate=evt.getStart();
var endDate=evt.getEnd();

var startPixel=Math.round(layout._ether.dateToPixelOffset(startDate));
var endPixel=Math.round(layout._ether.dateToPixelOffset(endDate));

var streamIndex=0;
for(;streamIndex<streams.length;streamIndex++){
if(streams[streamIndex]<startPixel){
break;
}
}
if(streamIndex>=streams.length){
streams.push(Number.NEGATIVE_INFINITY);
}

var streamOffset=(eventTheme.track.offset+
streamIndex*(eventTheme.track.height+eventTheme.track.gap))+"em";

layout._tracks[evt.getID()]=streamIndex;

if(evt.isInstant()){
streams[streamIndex]=layoutInstant(evt,startPixel,endPixel,streamOffset);
}else{
streams[streamIndex]=layoutDuration(evt,startPixel,endPixel,streamOffset);
}
};

var iterator=this._eventSource.getAllEventIterator();
while(iterator.hasNext()){
var evt=iterator.next();
layoutEvent(evt);
}

this._trackCount=streams.length;
};

/* painters.js */



Timeline.DurationEventPainter=function(params){
this._params=params;
this._theme=params.theme;
this._layout=params.layout;

this._showText=params.showText;
this._showLineForNoText=("showLineForNoText"in params)?
params.showLineForNoText:params.theme.event.instant.showLineForNoText;

this._filterMatcher=null;
this._highlightMatcher=null;
};

Timeline.DurationEventPainter.prototype.initialize=function(band,timeline){
this._band=band;
this._timeline=timeline;
this._layout.initialize(band,timeline);

this._eventLayer=null;
this._highlightLayer=null;
};

Timeline.DurationEventPainter.prototype.getLayout=function(){
return this._layout;
};

Timeline.DurationEventPainter.prototype.setLayout=function(layout){
this._layout=layout;
};

Timeline.DurationEventPainter.prototype.getFilterMatcher=function(){
return this._filterMatcher;
};

Timeline.DurationEventPainter.prototype.setFilterMatcher=function(filterMatcher){
this._filterMatcher=filterMatcher;
};

Timeline.DurationEventPainter.prototype.getHighlightMatcher=function(){
return this._highlightMatcher;
};

Timeline.DurationEventPainter.prototype.setHighlightMatcher=function(highlightMatcher){
this._highlightMatcher=highlightMatcher;
};

Timeline.DurationEventPainter.prototype.paint=function(){
var eventSource=this._band.getEventSource();
if(eventSource==null){
return;
}

if(this._highlightLayer!=null){
this._band.removeLayerDiv(this._highlightLayer);
}
this._highlightLayer=this._band.createLayerDiv(105);
this._highlightLayer.setAttribute("name","event-highlights");
this._highlightLayer.style.display="none";

if(this._eventLayer!=null){
this._band.removeLayerDiv(this._eventLayer);
}
this._eventLayer=this._band.createLayerDiv(110);
this._eventLayer.setAttribute("name","events");
this._eventLayer.style.display="none";

var minDate=this._band.getMinDate();
var maxDate=this._band.getMaxDate();

var doc=this._timeline.getDocument();

var p=this;
var eventLayer=this._eventLayer;
var highlightLayer=this._highlightLayer;

var showText=this._showText;
var theme=this._params.theme;
var eventTheme=theme.event;
var trackOffset=eventTheme.track.offset;
var trackHeight=("trackHeight"in this._params)?this._params.trackHeight:eventTheme.track.height;
var trackGap=("trackGap"in this._params)?this._params.trackGap:eventTheme.track.gap;


var appendIcon=function(evt,div){
var icon=evt.getIcon();
var img=Timeline.Graphics.createTranslucentImage(
doc,icon!=null?icon:eventTheme.instant.icon,
14, 14);
div.appendChild(img);
div.style.cursor="pointer";

Timeline.DOM.registerEvent(div,"mouseup",function(elmt,domEvt,target){
p._band._dragging = false;
if(!p._band._hasDragged){
p._onClickInstantEvent(img,domEvt,evt);
}
});
Timeline.DOM.registerEvent(div,"mousemove",function(elmt,domEvt,target){
p._band._onMouseMove(p._band._div, domEvt, p._eventLayer);
});

};
var createHighlightDiv=function(highlightIndex,startPixel,length,highlightOffset,highlightWidth){
if(highlightIndex>=0){
var color=eventTheme.highlightColors[Math.min(highlightIndex,eventTheme.highlightColors.length-1)];

var div=doc.createElement("div");
div.style.position="absolute";
div.style.overflow="hidden";
div.style.left=(startPixel-3)+"px";
div.style.width=(length+6)+"px";
div.style.top=highlightOffset+"em";
div.style.height=highlightWidth+"em";
div.style.background=color;


highlightLayer.appendChild(div);
}
};

var createInstantDiv=function(evt,startPixel,endPixel,streamOffset,highlightIndex,highlightOffset,highlightWidth){
if(evt.isImprecise()){
var length=Math.max(endPixel-startPixel,1);

var divImprecise=doc.createElement("div");
divImprecise.style.position="absolute";
divImprecise.style.overflow="hidden";

divImprecise.style.top=streamOffset;
divImprecise.style.height=trackHeight+"em";
divImprecise.style.left=startPixel+"px";
divImprecise.style.width=length+"px";

divImprecise.style.background=eventTheme.instant.impreciseColor;
if(eventTheme.instant.impreciseOpacity<100){
Timeline.Graphics.setOpacity(divImprecise,eventTheme.instant.impreciseOpacity);
}

eventLayer.appendChild(divImprecise);
}

var div=doc.createElement("div");
div.style.position="absolute";
div.style.overflow="hidden";
eventLayer.appendChild(div);

var foreground=evt.getTextColor();
var background=evt.getColor();

var realign=-8;
var length=16;
if(showText){
div.style.width=eventTheme.label.width+"px";
div.style.color=foreground!=null?foreground:eventTheme.label.outsideColor;

appendIcon(evt,div);
var textNode = doc.createTextNode(evt.getText());
//console.log(textNode);
div.appendChild(textNode);
//div.appendChild(doc.createTextNode(evt.getText()));
//var textNode = doc.createTextNode("derpity derp derp");
//textNode.html = evt.getText();
//div.appendChild(textNode);
}else{
if(p._showLineForNoText){
div.style.width="1px";
div.style.borderLeft="1px solid "+(background!=null?background:eventTheme.instant.lineColor);
realign=0;
length=1;
}else{
appendIcon(evt,div);
}
}

div.style.top=streamOffset;
div.style.height=trackHeight+"em";
div.style.left=(startPixel+realign)+"px";

createHighlightDiv(highlightIndex,(startPixel+realign),length,highlightOffset,highlightWidth);
};
var createDurationDiv=function(evt,startPixel,endPixel,streamOffset,highlightIndex,highlightOffset,highlightWidth){
var attachClickEvent=function(elmt){
elmt.style.cursor="pointer";
Timeline.DOM.registerEvent(elmt,"mouseup",function(elmt,domEvt,target){
p._band._dragging = false;
if(!p._band._hasDragged){
p._onClickDurationEvent(domEvt,evt,target);
}
});
Timeline.DOM.registerEvent(elmt,"mousemove",function(elmt,domEvt,target){
p._band._onMouseMove(p._band._div, domEvt, p._eventLayer);
});
};

var length=Math.max(endPixel-startPixel,1);
if(evt.isImprecise()){
var div=doc.createElement("div");
div.style.position="absolute";
div.style.overflow="hidden";

div.style.top=streamOffset;
div.style.height=trackHeight+"em";
div.style.left=startPixel+"px";
div.style.width=length+"px";

div.style.background=eventTheme.duration.impreciseColor;
if(eventTheme.duration.impreciseOpacity<100){
Timeline.Graphics.setOpacity(div,eventTheme.duration.impreciseOpacity);
}

eventLayer.appendChild(div);

var startDate=evt.getLatestStart();
var endDate=evt.getEarliestEnd();

var startPixel2=Math.round(p._band.dateToPixelOffset(startDate));
var endPixel2=Math.round(p._band.dateToPixelOffset(endDate));
}else{
var startPixel2=startPixel;
var endPixel2=endPixel;
}

var foreground=evt.getTextColor();
var outside=true;
if(startPixel2<=endPixel2){
length=Math.max(endPixel2-startPixel2,1);
outside=!(length>eventTheme.label.width);

div=doc.createElement("div");
div.style.position="absolute";
div.style.overflow="hidden";

div.style.top=streamOffset;
div.style.height=trackHeight+"em";
div.style.left=startPixel2+"px";
div.style.width=length+"px";

var background=evt.getColor();

div.style.background=background!=null?background:eventTheme.duration.color;
if(eventTheme.duration.opacity<100){
Timeline.Graphics.setOpacity(div,eventTheme.duration.opacity);
}

eventLayer.appendChild(div);
}else{
var temp=startPixel2;
startPixel2=endPixel2;
endPixel2=temp;
}
if(div==null){
console.log(evt);
}
attachClickEvent(div);

if(showText){
var divLabel=doc.createElement("div");
divLabel.style.position="absolute";

divLabel.style.top=streamOffset;
divLabel.style.height=trackHeight+"em";
divLabel.style.left=((length>eventTheme.label.width)?startPixel2:endPixel2)+"px";
divLabel.style.width=eventTheme.label.width+"px";
divLabel.style.color=foreground!=null?foreground:(outside?eventTheme.label.outsideColor:eventTheme.label.insideColor);
divLabel.style.overflow="hidden";
divLabel.appendChild(doc.createTextNode(evt.getText()));

eventLayer.appendChild(divLabel);
attachClickEvent(divLabel);
}

createHighlightDiv(highlightIndex,startPixel,endPixel-startPixel,highlightOffset,highlightWidth);
};

var createEventDiv=function(evt,highlightIndex){
var startDate=evt.getStart();
var endDate=evt.getEnd();

var startPixel=Math.round(p._band.dateToPixelOffset(startDate));
var endPixel=Math.round(p._band.dateToPixelOffset(endDate));

var streamOffset=(trackOffset+
p._layout.getTrack(evt)*(trackHeight+trackGap));

if(evt.isInstant()){
createInstantDiv(evt,startPixel,endPixel,streamOffset+"em",
highlightIndex,streamOffset-trackGap,trackHeight+2*trackGap);
}else{
createDurationDiv(evt,startPixel,endPixel,streamOffset+"em",
highlightIndex,streamOffset-trackGap,trackHeight+2*trackGap);
}
};

var filterMatcher=(this._filterMatcher!=null)?
this._filterMatcher:
function(evt){return true;};
var highlightMatcher=(this._highlightMatcher!=null)?
this._highlightMatcher:
function(evt){return-1;};

var iterator=eventSource.getEventIterator(minDate,maxDate);
while(iterator.hasNext()){
var evt=iterator.next();
if(filterMatcher(evt)){
createEventDiv(evt,highlightMatcher(evt));
}
}

this._highlightLayer.style.display="block";
this._eventLayer.style.display="block";
};

Timeline.DurationEventPainter.prototype.softPaint=function(){
};

Timeline.DurationEventPainter.prototype._onClickInstantEvent=function(icon,domEvt,evt){
domEvt.cancelBubble=true;
var c=Timeline.DOM.getPageCoordinates(icon);
this._showBubble(
c.left+Math.ceil(icon.offsetWidth/2),
c.top+Math.ceil(icon.offsetHeight/2) - ($(icon).parent().parent().parent().scrollTop()), domEvt,
evt
);
};

Timeline.DurationEventPainter.prototype._onClickDurationEvent=function(domEvt,evt,target){
domEvt.cancelBubble=true;
if("pageX"in domEvt){
var x=domEvt.pageX;
var y=domEvt.pageY;
}else{
var c=Timeline.DOM.getPageCoordinates(target);
var x=domEvt.offsetX+c.left;
var y=domEvt.offsetY+c.top;
y -= $(target).parent().parent().scrollTop();
}
this._showBubble(x,y, domEvt, evt);
};

Timeline.DurationEventPainter.prototype._showBubble=function(x,y,domEvt,evt){
var d = evt._obj;
//displayInfoWindow(d.header, d.description, d.link);
filterObject(d, domEvt.shiftKey);
/*d3.select("#infoWindow").html("");
		d3.select("#infoWindow").append("windowTitle")
			.attr("class", "info_head")
			.append("a")
				.attr("href", d.link)
				.attr("style", "text-decoration:none;")
				.html(d.header);
			
		d3.select("#infoWindow").append("text")
			.html(d.description);*/
			/*
console.log("wuddup");
var div=this._band.openBubbleForPoint(
x,y,
this._theme.event.bubble.width,
this._theme.event.bubble.height
);

evt.fillInfoBubble(div,this._theme,this._band.getLabeller());*/
};

/* sources.js */




Timeline.DefaultEventSource=function(eventIndex){
this._events=(eventIndex instanceof Object)?eventIndex:new Timeline.EventIndex();
this._listeners=[];
};

Timeline.DefaultEventSource.prototype.addListener=function(listener){
this._listeners.push(listener);
};

Timeline.DefaultEventSource.prototype.removeListener=function(listener){
for(var i=0;i<this._listeners.length;i++){
if(this._listeners[i]==listener){
this._listeners.splice(i,1);
break;
}
}
};

Timeline.DefaultEventSource.prototype.loadXML=function(xml,url){
var base=this._getBaseURL(url);

var wikiURL=xml.documentElement.getAttribute("wiki-url");
var wikiSection=xml.documentElement.getAttribute("wiki-section");

var dateTimeFormat=xml.documentElement.getAttribute("date-time-format");
var parseDateTimeFunction=this._events.getUnit().getParser(dateTimeFormat);

var node=xml.documentElement.firstChild;
var added=false;
while(node!=null){
if(node.nodeType==1){
var description="";
if(node.firstChild!=null&&node.firstChild.nodeType==3){
description=node.firstChild.nodeValue;
}
var evt=new Timeline.DefaultEventSource.Event(
parseDateTimeFunction(node.getAttribute("start")),
parseDateTimeFunction(node.getAttribute("end")),
parseDateTimeFunction(node.getAttribute("latestStart")),
parseDateTimeFunction(node.getAttribute("earliestEnd")),
node.getAttribute("isDuration")!="true",
node.getAttribute("title"),
description,
this._resolveRelativeURL(node.getAttribute("image"),base),
this._resolveRelativeURL(node.getAttribute("link"),base),
this._resolveRelativeURL(Timeline.urlPrefix+node.getAttribute("icon")),
node.getAttribute("color"),
node.getAttribute("textColor")
);
evt._node=node;
evt.getProperty=function(name){
return this._node.getAttribute(name);
};
evt.setWikiInfo(wikiURL,wikiSection);

this._events.add(evt);

added=true;
}
node=node.nextSibling;
}

if(added){
this._fire("onAddMany",[]);
}
};


Timeline.DefaultEventSource.prototype.loadJSON=function(data,url){
var base=this._getBaseURL(url);
var added=false;
if(data&&data.events){
var wikiURL=("wikiURL"in data)?data.wikiURL:null;
var wikiSection=("wikiSection"in data)?data.wikiSection:null;

var dateTimeFormat=("dateTimeFormat"in data)?data.dateTimeFormat:null;
var parseDateTimeFunction=this._events.getUnit().getParser(dateTimeFormat);

for(var i=0;i<data.events.length;i++){
var event=data.events[i];
var evt=new Timeline.DefaultEventSource.Event(
parseDateTimeFunction(event.start),
parseDateTimeFunction(event.end),
parseDateTimeFunction(event.latestStart),
parseDateTimeFunction(event.earliestEnd),
event.isDuration||false,
event.title,
event.description,
this._resolveRelativeURL(event.image,base),
this._resolveRelativeURL(event.link,base),
this._resolveRelativeURL(event.icon,base),
event.color,
event.textColor
);
evt._obj=event;
evt.getProperty=function(name){
return this._obj[name];
};
evt.setWikiInfo(wikiURL,wikiSection);

this._events.add(evt);
added=true;
}
}

if(added){
this._fire("onAddMany",[]);
}
};


Timeline.DefaultEventSource.prototype.loadSPARQL=function(xml,url){
var base=this._getBaseURL(url);

var dateTimeFormat='iso8601';
var parseDateTimeFunction=this._events.getUnit().getParser(dateTimeFormat);

if(xml==null){
return;
}


var node=xml.documentElement.firstChild;
while(node!=null&&(node.nodeType!=1||node.nodeName!='results')){
node=node.nextSibling;
}

var wikiURL=null;
var wikiSection=null;
if(node!=null){
wikiURL=node.getAttribute("wiki-url");
wikiSection=node.getAttribute("wiki-section");

node=node.firstChild;
}

var added=false;
while(node!=null){
if(node.nodeType==1){
var bindings={};
var binding=node.firstChild;
while(binding!=null){
if(binding.nodeType==1&&
binding.firstChild!=null&&
binding.firstChild.nodeType==1&&
binding.firstChild.firstChild!=null&&
binding.firstChild.firstChild.nodeType==3){
bindings[binding.getAttribute('name')]=binding.firstChild.firstChild.nodeValue;
}
binding=binding.nextSibling;
}

if(bindings["start"]==null&&bindings["date"]!=null){
bindings["start"]=bindings["date"];
}

var evt=new Timeline.DefaultEventSource.Event(
parseDateTimeFunction(bindings["start"]),
parseDateTimeFunction(bindings["end"]),
parseDateTimeFunction(bindings["latestStart"]),
parseDateTimeFunction(bindings["earliestEnd"]),
bindings["isDuration"]!="true",
bindings["title"],
bindings["description"],
this._resolveRelativeURL(bindings["image"],base),
this._resolveRelativeURL(bindings["link"],base),
this._resolveRelativeURL(bindings["icon"],base),
bindings["color"],
bindings["textColor"]
);
evt._bindings=bindings;
evt.getProperty=function(name){
return this._bindings[name];
};
evt.setWikiInfo(wikiURL,wikiSection);

this._events.add(evt);
added=true;
}
node=node.nextSibling;
}

if(added){
this._fire("onAddMany",[]);
}
};

Timeline.DefaultEventSource.prototype.add=function(evt){
this._events.add(evt);
this._fire("onAddOne",[evt]);
};

Timeline.DefaultEventSource.prototype.addMany=function(events){
for(var i=0;i<events.length;i++){
this._events.add(events[i]);
}
this._fire("onAddMany",[]);
};

Timeline.DefaultEventSource.prototype.clear=function(){
this._events.removeAll();
this._fire("onClear",[]);
};

Timeline.DefaultEventSource.prototype.getEventIterator=function(startDate,endDate){
return this._events.getIterator(startDate,endDate);
};

Timeline.DefaultEventSource.prototype.getAllEventIterator=function(){
return this._events.getAllIterator();
};

Timeline.DefaultEventSource.prototype.getCount=function(){
return this._events.getCount();
};

Timeline.DefaultEventSource.prototype.getEarliestDate=function(){
return this._events.getEarliestDate();
};

Timeline.DefaultEventSource.prototype.getLatestDate=function(){
return this._events.getLatestDate();
};

Timeline.DefaultEventSource.prototype._fire=function(handlerName,args){
for(var i=0;i<this._listeners.length;i++){
var listener=this._listeners[i];
if(handlerName in listener){
try{
listener[handlerName].apply(listener,args);
}catch(e){
Timeline.Debug.exception(e);
}
}
}
};

Timeline.DefaultEventSource.prototype._getBaseURL=function(url){
if(url.indexOf("://")<0){
var url2=this._getBaseURL(document.location.href);
if(url.substr(0,1)=="/"){
url=url2.substr(0,url2.indexOf("/",url2.indexOf("://")+3))+url;
}else{
url=url2+url;
}
}

var i=url.lastIndexOf("/");
if(i<0){
return"";
}else{
return url.substr(0,i+1);
}
};

Timeline.DefaultEventSource.prototype._resolveRelativeURL=function(url,base){
if(url==null||url==""){
return url;
}else if(url.indexOf("://")>0){
return url;
}else if(url.substr(0,1)=="/"){
return base.substr(0,base.indexOf("/",base.indexOf("://")+3))+url;
}else{
return base+url;
}
};


Timeline.DefaultEventSource.Event=function(
start,end,latestStart,earliestEnd,instant,
text,description,image,link,
icon,color,textColor){

this._id="e"+Math.floor(Math.random()*1000000);

this._instant=instant||(end==null);

this._start=start;
this._end=(end!=null)?end:start;

this._latestStart=(latestStart!=null)?latestStart:(instant?this._end:this._start);
this._earliestEnd=(earliestEnd!=null)?earliestEnd:(instant?this._start:this._end);

this._text=Timeline.HTML.deEntify(text);
this._description=Timeline.HTML.deEntify(description);
this._image=(image!=null&&image!="")?image:null;
this._link=(link!=null&&link!="")?link:null;

this._icon=(icon!=null&&icon!="")?icon:null;
this._color=(color!=null&&color!="")?color:null;
this._textColor=(textColor!=null&&textColor!="")?textColor:null;

this._wikiURL=null;
this._wikiSection=null;
};

Timeline.DefaultEventSource.Event.prototype={
getID:function(){return this._id;},

isInstant:function(){return this._instant;},
isImprecise:function(){return this._start!=this._latestStart||this._end!=this._earliestEnd;},

getStart:function(){return this._start;},
getEnd:function(){return this._end;},
getLatestStart:function(){return this._latestStart;},
getEarliestEnd:function(){return this._earliestEnd;},

getText:function(){return this._text;},
getDescription:function(){return this._description;},
getImage:function(){return this._image;},
getLink:function(){return this._link;},

getIcon:function(){return this._icon;},
getColor:function(){return this._color;},
getTextColor:function(){return this._textColor;},

getProperty:function(name){return null;},

getWikiURL:function(){return this._wikiURL;},
getWikiSection:function(){return this._wikiSection;},
setWikiInfo:function(wikiURL,wikiSection){
this._wikiURL=wikiURL;
this._wikiSection=wikiSection;
},

fillDescription:function(elmt){
elmt.innerHTML=this._description;
},
fillWikiInfo:function(elmt){
if(this._wikiURL!=null&&this._wikiSection!=null){
var wikiID=this.getProperty("wikiID");
if(wikiID==null||wikiID.length==0){
wikiID=this.getText();
}
wikiID=wikiID.replace(/\s/g,"_");

var url=this._wikiURL+this._wikiSection.replace(/\s/g,"_")+"/"+wikiID;
var a=document.createElement("a");
a.href=url;
a.target="new";
a.innerHTML=Timeline.strings[Timeline.Platform.clientLocale].wikiLinkLabel;

elmt.appendChild(document.createTextNode("["));
elmt.appendChild(a);
elmt.appendChild(document.createTextNode("]"));
}else{
elmt.style.display="none";
}
},
fillTime:function(elmt,labeller){
if(this._instant){
if(this.isImprecise()){
elmt.appendChild(elmt.ownerDocument.createTextNode(labeller.labelPrecise(this._start)));
elmt.appendChild(elmt.ownerDocument.createElement("br"));
elmt.appendChild(elmt.ownerDocument.createTextNode(labeller.labelPrecise(this._end)));
}else{
elmt.appendChild(elmt.ownerDocument.createTextNode(labeller.labelPrecise(this._start)));
}
}else{
if(this.isImprecise()){
elmt.appendChild(elmt.ownerDocument.createTextNode(
labeller.labelPrecise(this._start)+" ~ "+labeller.labelPrecise(this._latestStart)));
elmt.appendChild(elmt.ownerDocument.createElement("br"));
elmt.appendChild(elmt.ownerDocument.createTextNode(
labeller.labelPrecise(this._earliestEnd)+" ~ "+labeller.labelPrecise(this._end)));
}else{
elmt.appendChild(elmt.ownerDocument.createTextNode(labeller.labelPrecise(this._start)));
elmt.appendChild(elmt.ownerDocument.createElement("br"));
elmt.appendChild(elmt.ownerDocument.createTextNode(labeller.labelPrecise(this._end)));
}
}
},
/*fillInfoBubble:function(elmt,theme,labeller){
var doc=elmt.ownerDocument;

var title=this.getText();
var link=this.getLink();
var image=this.getImage();

if(image!=null){
var img=doc.createElement("img");
img.src=image;

theme.event.bubble.imageStyler(img);
elmt.appendChild(img);
}

var divTitle=doc.createElement("div");
var textTitle=doc.createTextNode(title);
if(link!=null){
var a=doc.createElement("a");
a.href=link;
a.appendChild(textTitle);
divTitle.appendChild(a);
}else{
divTitle.appendChild(textTitle);
}
theme.event.bubble.titleStyler(divTitle);
elmt.appendChild(divTitle);

var divBody=doc.createElement("div");
this.fillDescription(divBody);
theme.event.bubble.bodyStyler(divBody);
elmt.appendChild(divBody);

var divTime=doc.createElement("div");
this.fillTime(divTime,labeller);
theme.event.bubble.timeStyler(divTime);
elmt.appendChild(divTime);

var divWiki=doc.createElement("div");
this.fillWikiInfo(divWiki);
theme.event.bubble.wikiStyler(divWiki);
elmt.appendChild(divWiki);
}*/
};

/* themes.js */




Timeline.ClassicTheme=new Object();

Timeline.ClassicTheme.implementations=[];

Timeline.ClassicTheme.create=function(locale){
if(locale==null){
locale=Timeline.Platform.getDefaultLocale();
}

var f=Timeline.ClassicTheme.implementations[locale];
if(f==null){
f=Timeline.ClassicTheme._Impl;
}
return new f();
};

Timeline.ClassicTheme._Impl=function(){
this.firstDayOfWeek=0;

this.ether={
backgroundColors:[
"#EEE",
"#DDD",
"#CCC",
"#AAA"
],
highlightColor:"white",
highlightOpacity:50,
interval:{
line:{
show:true,
color:"#aaa",
opacity:25
},
weekend:{
color:"#FFFFE0",
opacity:30
},
marker:{
hAlign:"Bottom",
hBottomStyler:function(elmt){
elmt.className="timeline-ether-marker-bottom";
},
hBottomEmphasizedStyler:function(elmt){
elmt.className="timeline-ether-marker-bottom-emphasized";
},
hTopStyler:function(elmt){
elmt.className="timeline-ether-marker-top";
},
hTopEmphasizedStyler:function(elmt){
elmt.className="timeline-ether-marker-top-emphasized";
},

vAlign:"Right",
vRightStyler:function(elmt){
elmt.className="timeline-ether-marker-right";
},
vRightEmphasizedStyler:function(elmt){
elmt.className="timeline-ether-marker-right-emphasized";
},
vLeftStyler:function(elmt){
elmt.className="timeline-ether-marker-left";
},
vLeftEmphasizedStyler:function(elmt){
elmt.className="timeline-ether-marker-left-emphasized";
}
}
}
};

this.event={
track:{
offset:0.5,
height:1.5,
gap:0.5
},
instant:{
icon:imageURLPrefix+"dull-blue-circle.png",
lineColor:"#58A0DC",
impreciseColor:"#58A0DC",
impreciseOpacity:20,
showLineForNoText:true
},
duration:{
color:"#58A0DC",
opacity:100,
impreciseColor:"#58A0DC",
impreciseOpacity:20
},
label:{
insideColor:"white",
outsideColor:"black",
width:200
},
highlightColors:[
"#FFFF00",
"#FFC000",
"#FF0000",
"#0000FF"
],
bubble:{
width:250,
height:125,
titleStyler:function(elmt){
elmt.className="timeline-event-bubble-title";
},
bodyStyler:function(elmt){
elmt.className="timeline-event-bubble-body";
},
imageStyler:function(elmt){
elmt.className="timeline-event-bubble-image";
},
wikiStyler:function(elmt){
elmt.className="timeline-event-bubble-wiki";
},
timeStyler:function(elmt){
elmt.className="timeline-event-bubble-time";
}
}
};
};

/* units.js */





Timeline.NativeDateUnit=new Object();

Timeline.NativeDateUnit.createLabeller=function(locale,timeZone){
return new Timeline.GregorianDateLabeller(locale,timeZone);
};


Timeline.NativeDateUnit.makeDefaultValue=function(){
return new Date();
};

Timeline.NativeDateUnit.cloneValue=function(v){
return new Date(v.getTime());
};

Timeline.NativeDateUnit.getParser=function(format){
if(typeof format=="string"){
format=format.toLowerCase();
}
return(format=="iso8601"||format=="iso 8601")?

Timeline.DateTime.parseIso8601DateTime:

Timeline.DateTime.parseGregorianDateTime;

};

Timeline.NativeDateUnit.parseFromObject=function(o){
return Timeline.DateTime.parseGregorianDateTime(o);
};


Timeline.NativeDateUnit.toNumber=function(v){
return v.getTime();
};

Timeline.NativeDateUnit.fromNumber=function(n){
return new Date(n);
};

Timeline.NativeDateUnit.compare=function(v1,v2){
var n1,n2;
if(typeof v1=="object"){
n1=v1.getTime();
}else{
n1=Number(v1);
}
if(typeof v2=="object"){
n2=v2.getTime();
}else{
n2=Number(v2);
}

return n1-n2;
};

Timeline.NativeDateUnit.earlier=function(v1,v2){
return Timeline.NativeDateUnit.compare(v1,v2)<0?v1:v2;
};

Timeline.NativeDateUnit.later=function(v1,v2){
return Timeline.NativeDateUnit.compare(v1,v2)>0?v1:v2;
};

Timeline.NativeDateUnit.change=function(v,n){
return new Date(v.getTime()+n);
};

/*==================================================
 *  Common localization strings
 *==================================================
 */

Timeline.strings["en"] = {
    wikiLinkLabel:  "Discuss"
};

/*==================================================
 *  Localization of labellers.js
 *==================================================
 */

Timeline.GregorianDateLabeller.monthNames["en"] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];













































/*timeline.js*/
var myTimeline = new Object();

var tl;
myTimeline.displayVisualization = function(container, json) {
	var eventSource = new Timeline.DefaultEventSource();
  var bandInfos = [
	/*Timeline.createBandInfo({
		eventSource:	eventSource,
		date:           json.stats[0].lastDate,
        width:          "20%", 
        intervalUnit:   Timeline.DateTime.HOUR, 
        intervalPixels: 100
	}),*/
	Timeline.createBandInfo({
		eventSource:	eventSource,
		date:           json.stats[0].lastDate,
        width:          "65%", 
        intervalUnit:   Timeline.DateTime.DAY, 
        intervalPixels: 100
	}),
    Timeline.createBandInfo({
		showEventText:  false,
        trackHeight:    0.5,
        trackGap:       0.2,
        eventSource:    eventSource,
		date:           json.stats[0].lastDate,
        width:          "35%", 
        intervalUnit:   Timeline.DateTime.MONTH, 
        intervalPixels: 200
    })
  ];
  
  /*bandInfos[1].syncWith = 0;
  bandInfos[2].syncWith = 1;
  bandInfos[2].highlight = true;
  bandInfos[2].eventPainter.setLayout(bandInfos[1].eventPainter.getLayout());*/
  
  bandInfos[1].syncWith = 0;
  bandInfos[1].highlight = true;
  bandInfos[1].eventPainter.setLayout(bandInfos[0].eventPainter.getLayout());
  
  tl = Timeline.create(document.getElementById(container), bandInfos);
	eventSource.loadJSON(json, "");
}

var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}




















var daysBetweenDates = function( d1, d2 ) {
	var date1 = new Date(d1);
	var date2 = new Date(d2);
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}

function streamClick() {
	return function(d){
		filterObject(d[0], d3.event.shiftKey);
	};
}


/*streamgraph.js*/
var myStream = new Object();

myStream.displayVisualization = function(container, json) {
	var n = 6, // number of layers
		m = 200, // number of samples per layer
		stack = d3.layout.stack().offset("wiggle"),
		layers0 = stack(fixJson(json));

	var streamwidth = 3000,
		streamheight = 500;

	var x = d3.scale.linear()
		.domain([0, m - 1])
		.range([0, streamwidth]);

	var y = d3.scale.linear()
		.domain([0, d3.max(layers0, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
		.range([streamheight, 0]);

	var area = d3.svg.area()
		.x(function(d) { return x(d.x); })
		.y0(function(d) { return y(d.y0); })
		.y1(function(d) { return y(d.y0 + d.y); });

	var svg = d3.select("#" + container).append("svg")
		.attr("width", streamwidth)
		.attr("height", streamheight);

	svg.selectAll("path")
		.data(layers0)
	  .enter().append("path")
		.attr("d", area)
		.style("fill", function(d) { 
			return d[0].colour;
			})
		.on("mouseup", streamClick())
		.append("title")
		  .text(function(d) { return d[0].title; });
		  
		  
	function fixJson(json) {
		var firstDate = json.stats[0].firstDate;
		var lastDate = json.stats[0].lastDate;
		var numDates = daysBetweenDates(firstDate, lastDate) + 1;
		var paths = json.paths;
		var newPaths = [], i, j;
		
		for (i = 0; i < paths.length; i++) {
			newPaths[i] = [];
			for(j = 0; j < numDates; j++) {
				newPaths[i][j] = {};
				newPaths[i][j].x = j;
				newPaths[i][j].y = 0;
			}
			
			for(j = 0; j < paths[i].days.length; j++) {
				var derpity = daysBetweenDates(firstDate, paths[i].days[j].date);
				newPaths[i][derpity].y = paths[i].days[j].value;
			}
			
			newPaths[i][0].colour = paths[i].colour;
			newPaths[i][0].title = paths[i].title;
			newPaths[i][0].filterValue = paths[i].filterValue;
			newPaths[i][0].filterTag = paths[i].filterTag;
		}
		
		return newPaths;
	}
}
















































/*chordDefaults.js*/
myChord.defaults = {
"defaultValues":{
		"colour":1,
		"size":0,
		"width":0
	},
	"mean":{
	},
	"deviation":{
	},
	"min":{
		"size":0,
		"width":0
	},
	"max":{
	},
	"inverted":{
	},
	"direct":{
		"name":1,
		"colour":1,
		"size":1,
		"width":1,
		"source":1,
		"target":1
	}
}


































/*finalizer.js*/
var numLoaded = 0;
var visNum = 0;

function initializeVisLoad() {
	visNum++;
}

function finalizeVisLoad() {
	numLoaded++;
	if(numLoaded >= visNum) {
		hasFinalized = true;
		builtFilters = true;
		builtOptions = true;
		createLegend("legend");
		visNum = 0;
		numLoaded = 0;
	}
}

function startLoads() {
	if(visNum > 0) {
		return false;
	}
	visNum = 1;
	return true;
}

function doneStartingLoads(){
	visNum--;
}
































/*listMappings.js*/
var indexMappings = {};

function indexMapping(value, tag) {
	if(indexMappings[tag] == undefined) {
		indexMappings[tag] = {};
	}
	if(indexMappings[tag][value] == undefined) {
		indexMappings[tag][value] = Object.keys(indexMappings[tag]).length;
	}
	return indexMappings[tag][value];
}

var discreteMappings = {};

function discreteMapping(value, toList, tag) {
	if(discreteMappings[tag] == undefined) {
		discreteMappings[tag] = {};
	}
	if(discreteMappings[tag][value] == undefined) {
		discreteMappings[tag][value] = Object.keys(discreteMappings[tag]).length;
	}
	return toList[discreteMappings[tag][value]];
}

function preloadMapping(newMap) {
	discreteMappings = newMap;
}








/*visualizationWrapper*/
function clearAllNulls(json) {
	if(typeof json == "object"){
		if(json instanceof Array) {
			for(var i = json.length - 1; i >= 0; i--) {
				if(json[i] == null) {
					json.splice(i, 1);
				}
				else {
					json[i] = clearAllNulls(json[i]);
				}
			}
		}
		else {
			var keys = Object.keys(json);
			for(var i in keys) {
				json[keys[i]] = clearAllNulls(json[keys[i]]);
			}
		}
	}
	return json;
}

function followArrayPath(json, path, replace) {
	if(path.length == 0) {
		if(replace == undefined) {
			return json;
		}
		else {
			json = replace;
			return replace;
		}
	}
	if(json == undefined) {
		json = {};
	}
	var njson = json[path[0]];
	var npath = [];
	for(var i in path) {
		npath[i] = path[i];
	}
	npath.splice(0,1);
	if(replace == undefined) {
		return followArrayPath(njson, npath);
	}
	else {
		json[path[0]] =  followArrayPath(njson, npath, replace);
		return json;
	}
}

function followPath(json, path, replace) {
	var npath = (path == "") ? [] : path.split("/");
	return followArrayPath(json, npath, replace);
}

function formatNumbers(toArray, mapping, defaults) {
	var toVar = mapping.to;
	var newMean = isNaN(mapping.mean) ? defaults.mean[toVar] : mapping.mean;
	var newDeviation = isNaN(mapping.deviation) ? defaults.deviation[toVar] : mapping.deviation;
	var isInverted = isNaN(mapping.inverted) ? defaults.inverted[toVar] : mapping.inverted;
	var min = isNaN(mapping.min) ? defaults.min[toVar] : mapping.min;
	var max = isNaN(mapping.max) ? defaults.max[toVar] : mapping.max;
	var oldMean = 0;
	var numOfObjects = 0;
	var oldNumbers = [];
	var oldIndexes = [];
	for(var i = 0; i < toArray.length; i++) {
		var temp = followPath(toArray[i], toVar);
		if(!isNaN(temp)) {
			numOfObjects++;
			oldMean += temp;
			oldIndexes.push(i);
			oldNumbers.push(temp);
		}
	}
	if(isNaN(oldMean)) {
		return toArray;
	}
	oldMean = oldMean / numOfObjects;
	if (isNaN(newMean)) {
		newMean = oldMean;
	}
	var oldNumbers2 = new Array();
	for(var i = 0; i < oldNumbers.length; i++) {
		if(!isNaN(oldNumbers[i])) {
			oldNumbers[i] = oldNumbers[i] - oldMean;
			oldNumbers2[i] = oldNumbers[i] * oldNumbers[i];
		}
	}
	var oldDeviation = 0;
	for(var i = 0; i < oldNumbers2.length; i++) {
		oldDeviation += oldNumbers2[i];
	}
	var modifier = 0;
	if(isNaN(newDeviation)) {
		modifier = 1;
	}
	else if(oldDeviation > 0) {
		oldDeviation = oldDeviation / numOfObjects;
		oldDeviation = Math.sqrt(oldDeviation);
		modifier = newDeviation / oldDeviation;
	}
	for(var i = 0; i < oldNumbers.length; i++) {
		if(!isNaN(oldNumbers[i])) {
			oldNumbers[i] = oldNumbers[i] * modifier;
			if(isInverted) {
				oldNumbers[i] = oldNumbers[i] * -1;
			}
			oldNumbers[i] += newMean;
			if(!isNaN(min) && oldNumbers[i] < min) {
				oldNumbers[i] = min;
			}
			else if(!isNaN(max) && oldNumbers[i] > max) {
				oldNumbers[i] = max;
			}
		}
	}
	for(var i = 0; i < oldNumbers.length; i++) {
		followPath(toArray[oldIndexes[i]], toVar, oldNumbers[i]);
	}
	return toArray;
}

function getUniqueIndex(obj, map, indexes, index, save) {
	var retVal;
	if(typeof(obj) == "object"){
		var path = [];
		for(var i in map) {
			path.push(followPath(obj, map[i].to));
		}
		retVal = followArrayPath(indexes, path);
		if(retVal == undefined || !Object.keys(indexes).length) {
			if(save) indexes = followArrayPath(indexes, path, index);
			return undefined;
		}
	}
	else {
		retVal = indexes[obj];
		if(retVal == undefined) {
			if(save) indexes[obj] = index;
			return undefined;
		}
	}
	return retVal
}

var uniqueIndexes = {};

function doMapping(json, njson, mapping, tpath, defaults) {
	if(njson == undefined) {
		njson = {};
	}
	else if(njson == null) {
		return null;
	}
	var from = mapping.from;
	var to = mapping.to;
	var fjson = json;
	if(from == undefined) {
		fjson = njson;
		from = to;
	}
	if(mapping.remap) {
		 json = njson
		fjson = njson;
	}
	fjson = followPath(fjson, from);
	if (to != undefined) {
		var fnjson = followPath(njson, to);
	}
	if(to && to != "") {
		tpath += "/" + to;
	}
	if (mapping.iterate || mapping.unique) {
		if(fnjson == undefined || !fnjson.length) {
			fnjson = [];
		}
		if(uniqueIndexes[tpath] == undefined) {
			uniqueIndexes[tpath] = {};
		}
		var iterArray = fjson;
		if(!(fjson instanceof Array)){
			iterArray = [fjson];
		}
		for(var i in iterArray) {
			if((!mapping.condition || mapping.condition(iterArray[i])) && iterArray[i] != null) {
				if(mapping.unique) {
					var currVal = {};
					if(typeof mapping.unique == "object") {
						currVal = doMapping(iterArray[i],currVal, {"from":"","to":"","map":mapping.unique}, tpath, defaults);
					}
					if(currVal != null) {
						var index = 0;
						if(typeof mapping.unique == "object") {
							index = getUniqueIndex(currVal, mapping.unique, uniqueIndexes[tpath], fnjson.length);
						}
						if(isNaN(index)) {
							index = fnjson.length;
							var currVal2 = currVal;
							if(mapping.iterate) {
								currVal2 = doMapping(iterArray[i], $.extend(true, {}, currVal), {"from":"","to":"","map":mapping.iterate}, tpath + "/" + index, defaults);
							}
							if(currVal2 != null) {
								getUniqueIndex(currVal, mapping.unique, uniqueIndexes[tpath], index, true);
								fnjson[index] = currVal2;
							}
						}
						else
						{
							if(mapping.iterate) {
								currVal = doMapping(iterArray[i], $.extend(true, {}, fnjson[index]), {"from":"","to":"","map":mapping.iterate}, tpath + "/" + index, defaults);
							}
							if(currVal != null) fnjson[index] = currVal;
						}
					}
				}
				else {
					if(mapping.append) {
						fnjson.push(doMapping(iterArray[i], {}, {"from":"","to":"","map":mapping.iterate}, tpath + "/" + fnjson.length, defaults));
					}
					else {
						fnjson[i] = doMapping(iterArray[i], fnjson[i], {"from":"","to":"","map":mapping.iterate}, tpath + "/" + i, defaults);
					}
				}
			}
			else{
				fnjson[i] = (fnjson[i] == undefined) ? null : fnjson[i];
			}
		}
		for(var j in mapping.iterate) {
			if(mapping.iterate[j].format) {
				fnjson = formatNumbers(fnjson, mapping.iterate[j], defaults);
			}
		}
	}
	else {
		if(mapping.condition && !mapping.condition(json)) return njson;
		if(mapping.map) {
			var filterSuccess = false;
			for(var i in mapping.map) {
				fnjson = doMapping(fjson, fnjson, mapping.map[i], tpath, defaults);
				if(mapping.filter) {
					if(mapping.map[i].to && doFilter(fnjson[mapping.map[i].to], mapping.filter)) {
						filterSuccess = true;
					}
					if(mapping.map[i].from && doFilter(fnjson[mapping.map[i].from], mapping.filter)) {
						filterSuccess = true;
					}
				}
				else if(fnjson == null) return null;
			}
			if(mapping.filter && !filterSuccess) return null;
		}
		else if(mapping.value != undefined) {
			fnjson = mapping.value;
		}
		else
		{
			fnjson = fjson;
		}
	}
	
	
	if(mapping.dataFunction) {
		fnjson = mapping.dataFunction(json, njson);
	}
	
	if(fnjson != null) {
		if(mapping.toList != undefined) {
			fnjson = discreteMapping(fnjson, mapping.toList, mapping.tag);
		}
		
		if(mapping.index) {
			fnjson = indexMapping(fnjson, mapping.index);
		}
	}
	
	if(mapping.appendFunction) {
		fnjson = mapping.appendFunction(fnjson, followPath(njson, to));
	}
	
	if(mapping.filter && mapping.map == undefined) {
		if(!doFilter(fnjson, mapping.filter)) return null;
	}
	
	
	
	if(mapping.legend) {
		if (mapping.iterate || mapping.unique) {
			for(var i in mapping.legend) {
				for(var j in fnjson) {
					if(fnjson != null) addToLegend(followPath(fnjson[j], mapping.legend[i].from), followPath(fnjson[j], mapping.legend[i].to), mapping.legend[i]);
				}
			}
		}
		else {
			addToLegend(fjson, fnjson, mapping);
		}
	}
	
	if(to == undefined) return njson;
	return followPath(njson, to, fnjson);
}

function applyVisualizationStrategy(json, strategy, defaults) {
	uniqueIndexes = {};
	return doMapping(json, {}, {"from":"", "to":"", "map":strategy}, "", defaults);
}

function doRefresh(dataFile, container, obj, strat) {
	var temp = d3.select("#" + container).node();
	while (temp.hasChildNodes()) {
		temp.removeChild(temp.lastChild);
	}
	onLoad(dataFile, container, obj, strat);
}

function onLoad(dataFile, container, obj, stratObj) {
	initializeVisLoad();
	var strat = stratObj.getStrat();
	d3.json("data/"+dataFile, function(json) {
		if(obj.defaults == undefined){
			obj.defaults = {};
		}
		var njson = clearAllNulls(applyVisualizationStrategy(json, strat, obj.defaults));
		obj.displayVisualization(container, njson);
		finalizeVisLoad();
	});
}






/*onLoad*/
function refreshAll() {
	indexMappings = {};
	if(startLoads()){
		doRefresh("ActivityStats.json", "activityTimeline", myTimeline, activitiesTimelineStrat);
		/*doRefresh("timelineData.json", "simileTimeline", myTimeline, timelineStrat);
		doRefresh("ActivityStats.json", "activityChord", myChord, chordStrat);
		doRefresh("ActivityStats.json", "activityWheel", myPartition, commWheelStrat);
		doRefresh("timeActivity.json", "timePartition", myPartition, partitionStrat);
		doRefresh("timeAndStats.json", "bigFDG", myForce, timeAndStatsStrat);
		doRefresh("ActivityStats.json", "forceGraph", myForce, forceStrat);
		doRefresh("timeActivity.json", "streamGraph", myStream, streamStrat);*/
		doneStartingLoads();
	}
}

function loadEverything() {
	if(preloadMap) {
		preloadMapping(preloadMap);
	}
	commWheelStrat.addOptions();
	partitionStrat.addOptions();
	doOptions();
	
	refreshAll();
	
}