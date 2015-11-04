/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
/*global define: false*/
!function(e,t){"object"==typeof exports&&exports?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.Mustache={})}(this,function(e){function t(e){return"function"==typeof e}function n(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function r(e,t){return d.call(e,t)}function i(e){return!r(v,e)}function o(e){return String(e).replace(/[&<>"'\/]/g,function(e){return g[e]})}/**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
function s(t,r){// Is there a non-space char on the current line?
// Strips all whitespace tokens array for the current line
// if there was a {{#tag}} on it and otherwise only space.
function o(){if(_&&!U)for(;g.length;)delete v[g.pop()];else g=[];_=!1,U=!1}function s(e){if("string"==typeof e&&(e=e.split(y,2)),!f(e)||2!==e.length)throw new Error("Invalid tags: "+e);p=new RegExp(n(e[0])+"\\s*"),l=new RegExp("\\s*"+n(e[1])),h=new RegExp("\\s*"+n("}"+e[1]))}if(!t)return[];var p,l,h,d=[],v=[],g=[],_=!1,U=!1;s(r||e.tags);for(var m,E,T,j,S,V,C=new c(t);!C.eos();){if(m=C.pos,
// Match any text between tags.
T=C.scanUntil(p))for(var A=0,R=T.length;R>A;++A)j=T.charAt(A),i(j)?g.push(v.length):U=!0,v.push(["text",j,m,m+1]),m+=1,
// Check for whitespace on the current line.
"\n"===j&&o();
// Match the opening tag.
if(!C.scan(p))break;
// Match the closing tag.
if(_=!0,
// Get the tag type.
E=C.scan(b)||"name",C.scan(w),
// Get the tag value.
"="===E?(T=C.scanUntil(k),C.scan(k),C.scanUntil(l)):"{"===E?(T=C.scanUntil(h),C.scan(x),C.scanUntil(l),E="&"):T=C.scanUntil(l),!C.scan(l))throw new Error("Unclosed tag at "+C.pos);if(S=[E,T,m,C.pos],v.push(S),"#"===E||"^"===E)d.push(S);else if("/"===E){if(
// Check section nesting.
V=d.pop(),!V)throw new Error('Unopened section "'+T+'" at '+m);if(V[1]!==T)throw new Error('Unclosed section "'+V[1]+'" at '+m)}else"name"===E||"{"===E||"&"===E?U=!0:"="===E&&
// Set the tags for the next time around.
s(T)}if(
// Make sure there are no open sections when we're done.
V=d.pop())throw new Error('Unclosed section "'+V[1]+'" at '+C.pos);return u(a(v))}/**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
function a(e){for(var t,n,r=[],i=0,o=e.length;o>i;++i)t=e[i],t&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}/**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
function u(e){for(var t,n,r=[],i=r,o=[],s=0,a=e.length;a>s;++s)switch(t=e[s],t[0]){case"#":case"^":i.push(t),o.push(t),i=t[4]=[];break;case"/":n=o.pop(),n[5]=t[2],i=o.length>0?o[o.length-1][4]:r;break;default:i.push(t)}return r}/**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
function c(e){this.string=e,this.tail=e,this.pos=0}/**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
function p(e,t){this.view=null==e?{}:e,this.cache={".":this.view},this.parent=t}/**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
function l(){this.cache={}}var h=Object.prototype.toString,f=Array.isArray||function(e){return"[object Array]"===h.call(e)},d=RegExp.prototype.test,v=/\S/,g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},w=/\s*/,y=/\s+/,k=/\s*=/,x=/\s*\}/,b=/#|\^|\/|>|\{|&|=|!/;/**
   * Returns `true` if the tail is empty (end of string).
   */
c.prototype.eos=function(){return""===this.tail},/**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
c.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},/**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
c.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},/**
   * Creates a new context using the given view with this context
   * as the parent.
   */
p.prototype.push=function(e){return new p(e,this)},/**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
p.prototype.lookup=function(e){var n,r=this.cache;if(e in r)n=r[e];else{for(var i,o,s=this;s;){if(e.indexOf(".")>0)for(n=s.view,i=e.split("."),o=0;null!=n&&o<i.length;)n=n[i[o++]];else"object"==typeof s.view&&(n=s.view[e]);if(null!=n)break;s=s.parent}r[e]=n}return t(n)&&(n=n.call(this.view)),n},/**
   * Clears all cached templates in this writer.
   */
l.prototype.clearCache=function(){this.cache={}},/**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
l.prototype.parse=function(e,t){var n=this.cache,r=n[e];return null==r&&(r=n[e]=s(e,t)),r},/**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
l.prototype.render=function(e,t,n){var r=this.parse(e),i=t instanceof p?t:new p(t);return this.renderTokens(r,i,n,e)},/**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
l.prototype.renderTokens=function(e,t,n,r){for(var i,o,s,a="",u=0,c=e.length;c>u;++u)s=void 0,i=e[u],o=i[0],"#"===o?s=this._renderSection(i,t,n,r):"^"===o?s=this._renderInverted(i,t,n,r):">"===o?s=this._renderPartial(i,t,n,r):"&"===o?s=this._unescapedValue(i,t):"name"===o?s=this._escapedValue(i,t):"text"===o&&(s=this._rawValue(i)),void 0!==s&&(a+=s);return a},l.prototype._renderSection=function(e,n,r,i){
// This function is used to render an arbitrary template
// in the current context by higher-order sections.
function o(e){return s.render(e,n,r)}var s=this,a="",u=n.lookup(e[1]);if(u){if(f(u))for(var c=0,p=u.length;p>c;++c)a+=this.renderTokens(e[4],n.push(u[c]),r,i);else if("object"==typeof u||"string"==typeof u)a+=this.renderTokens(e[4],n.push(u),r,i);else if(t(u)){if("string"!=typeof i)throw new Error("Cannot use higher-order sections without the original template");
// Extract the portion of the original template that the section contains.
u=u.call(n.view,i.slice(e[3],e[5]),o),null!=u&&(a+=u)}else a+=this.renderTokens(e[4],n,r,i);return a}},l.prototype._renderInverted=function(e,t,n,r){var i=t.lookup(e[1]);
// Use JavaScript's definition of falsy. Include empty arrays.
// See https://github.com/janl/mustache.js/issues/186
// Use JavaScript's definition of falsy. Include empty arrays.
// See https://github.com/janl/mustache.js/issues/186
return!i||f(i)&&0===i.length?this.renderTokens(e[4],t,n,r):void 0},l.prototype._renderPartial=function(e,n,r){if(r){var i=t(r)?r(e[1]):r[e[1]];return null!=i?this.renderTokens(this.parse(i),n,r,i):void 0}},l.prototype._unescapedValue=function(e,t){var n=t.lookup(e[1]);return null!=n?n:void 0},l.prototype._escapedValue=function(t,n){var r=n.lookup(t[1]);return null!=r?e.escape(r):void 0},l.prototype._rawValue=function(e){return e[1]},e.name="mustache.js",e.version="1.1.0",e.tags=["{{","}}"];
// All high-level mustache.* functions use this writer.
var _=new l;/**
   * Clears all cached templates in the default writer.
   */
e.clearCache=function(){return _.clearCache()},/**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
e.parse=function(e,t){return _.parse(e,t)},/**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
e.render=function(e,t,n){return _.render(e,t,n)},
// This is here for backwards compatibility with 0.4.x.
e.to_html=function(n,r,i,o){var s=e.render(n,r,i);return t(o)?void o(s):s},
// Export the escaping function so that the user may override it.
// See https://github.com/janl/mustache.js/issues/244
e.escape=o,
// Export these mainly for testing, but also for advanced usage.
e.Scanner=c,e.Context=p,e.Writer=l});