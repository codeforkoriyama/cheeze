var BaseFrame=function(){function o(){this.debugMode=true;if(!Array.prototype.indexOf){Array.prototype.indexOf=function(o,e){var n;if(e===undefined)e=0;if(e<0)e+=this.length;if(e<0)e=0;n=this.length;while(e<n){if(e in this&&this[e]===o)return e;e++}return-1}}}o.prototype.getScrollTop=function(){return document.documentElement.scrollTop||document.body.scrollTop};o.prototype.getBrowserWidth=function(){return document.all?document.documentElement.clientWidth:window.innerWidth};o.prototype.getBrowserHeight=function(){return document.all?document.documentElement.clientHeight:window.innerHeight};o.prototype.getParameters=function(){var o=window.location.search,e=o.length,n={};if(e>1){var t=o.substring(1),i=t.split("&");for(var r=0,c=t.length;r<c;r++){var d=i[r].split("="),u=decodeURIComponent(d[0]),l=decodeURIComponent(d[1]);n[u]=l}}return n};o.prototype.deciFloor=function(o,e){var n=Math.pow(10,e),t=o*n>>0;return t/n};o.prototype.checkBoolean=function(o){for(var e in o){if(o[e]===true){return true}}return false};o.prototype.log=function(o){if(this.debugMode&&window.console&&typeof window.console==="function")console.log(o)};o.prototype.dir=function(o){if(this.debugMode&&window.console&&typeof window.console==="function")console.dir(o)};o.prototype.count=function(o){if(this.debugMode&&window.console&&typeof window.console==="function")console.count(o)};o.prototype.error=function(o){if(this.debugMode&&window.console&&typeof window.console==="function")console.error(o)};o.prototype.trace=function(){if(this.debugMode&&window.console&&typeof window.console==="function")console.trace()};o.prototype.noScrollEvent=function(o,e){if(o===void 0){o="disable"}if(e===void 0){e=300}var n=0,t=$("body");$(window).on("scroll.noEvent",function(){clearTimeout(n);var t=$("body"),i=t.hasClass(o);if(!i)t.addClass(o);n=setTimeout(function(){t.removeClass(o)},e)})};return o}();var Frame=new BaseFrame;