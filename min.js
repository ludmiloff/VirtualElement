/*! VirtualElement.js, by Cvetoslav Ludmiloff */
var veljs=function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(n,!0).forEach(function(t){a(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function s(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,a=void 0;try{for(var o,u=e[Symbol.iterator]();!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var l=function(e,t){return(t=n.prototype).ELEMENT_NODE=1,t.nodeType=111,t.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var i=this.ownerDocument.createRange();i.setStartBefore(e?t[1]:n),i.setEndAfter(r),i.deleteContents()}return n},t.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,a=r.length;i<a;i++)t.appendChild(r[i]);return t},n;function n(t){var n=this.childNodes=e.call(t,0);this.firstChild=n[0],this.lastChild=n[n.length-1],this.ownerDocument=n[0].ownerDocument,this._=null}}([].slice),f=Array.isArray,h=l.prototype.nodeType;function d(e,t){this.type=e,this.args=t}Object.freeze(d);var p=function(e){var t="fragment",n="content"in i("template")?function(e){var t=i("template");return t.innerHTML=e,t.content}:function(e){var n=i(t),a=i("template"),o=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var u=RegExp.$1;a.innerHTML="<table>"+e+"</table>",o=a.querySelectorAll(u)}else a.innerHTML=e,o=a.childNodes;return r(n,o),n};return function(e,a){return("svg"===a?function(e){var n=i(t),a=i("div");return a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",r(n,a.firstChild.childNodes),n}:n)(e)};function r(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function i(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}}(e),v={};try{v.Map=Map}catch(e){v.Map=function(){var e=0,t=[],n=[];return{delete:function(i){var a=r(i);return a&&(t.splice(e,1),n.splice(e,1)),a},forEach:function(e,r){t.forEach(function(t,i){e.call(r,n[i],t,this)},this)},get:function(t){return r(t)?n[e]:void 0},has:function(e){return r(e)},set:function(i,a){return n[r(i)?e:t.push(i)-1]=a,this}};function r(n){return-1<(e=t.indexOf(n))}}}var _=v.Map,y=[].indexOf,g=function(e,t,n,r,i,a){for(var o=("selectedIndex"in t),u=o;r<i;){var s=e(n[r],1);if(t.insertBefore(s,a),o&&u&&s.selected){u=!u;var c=t.selectedIndex;t.selectedIndex=c<0?r:y.call(t.querySelectorAll("option"),s)}r++}},m=function(e,t){return e==t},w=function(e){return e},b=function(e,t,n,r,i,a,o){var u=a-i;if(u<1)return-1;for(;n-t>=u;){for(var s=t,c=i;s<n&&c<a&&o(e[s],r[c]);)s++,c++;if(c===a)return t;t=s+1}return-1},k=function(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i},N=function(e,t,n,r,i){if(i-r<2)t.removeChild(e(n[r],-1));else{var a=t.ownerDocument.createRange();a.setStartBefore(e(n[r],-1)),a.setEndAfter(e(n[i-1],-1)),a.deleteContents()}},x=function(e,t,n){for(var r=1,i=t;r<i;){var a=(r+i)/2>>>0;n<e[a]?i=a:r=a+1}return r},C=function(e,t,n,r,i,a,o,u,s,c,l,f,h){!function(e,t,n,r,i,a,o,u,s){for(var c=new _,l=e.length,f=o,h=0;h<l;)switch(e[h++]){case 0:i++,f++;break;case 1:c.set(r[i],1),g(t,n,r,i++,i,f<u?t(a[f],0):s);break;case-1:f++}for(h=0;h<l;)switch(e[h++]){case 0:o++;break;case-1:c.has(a[o])?o++:N(t,n,a,o++,o)}}(function(e,t,n,r,i,a,o){var u,s,c,l,f,h,d,p=n+a,v=[];e:for(u=0;u<=p;u++){if(u>50)return null;for(d=u-1,f=u?v[u-1]:[0,0],h=v[u]=[],s=-u;s<=u;s+=2){for(c=(l=s===-u||s!==u&&f[d+s-1]<f[d+s+1]?f[d+s+1]:f[d+s-1]+1)-s;l<a&&c<n&&o(r[i+l],e[t+c]);)l++,c++;if(l===a&&c===n)break e;h[u+s]=l}}var _=Array(u/2+p/2),y=_.length-1;for(u=v.length-1;u>=0;u--){for(;l>0&&c>0&&o(r[i+l-1],e[t+c-1]);)_[y--]=0,l--,c--;if(!u)break;d=u-1,f=u?v[u-1]:[0,0],(s=l-c)==-u||s!==u&&f[d+s-1]<f[d+s+1]?(c--,_[y--]=1):(l--,_[y--]=-1)}return _}(n,r,a,o,u,c,f)||function(e,t,n,r,i,a,o,u){var s=0,c=r<u?r:u,l=Array(c++),f=Array(c);f[0]=-1;for(var h=1;h<c;h++)f[h]=o;for(var d=new _,p=a;p<o;p++)d.set(i[p],p);for(var v=t;v<n;v++){var y=d.get(e[v]);null!=y&&-1<(s=x(f,c,y))&&(f[s]=y,l[s]={newi:v,oldi:y,prev:l[s-1]})}for(s=--c,--o;f[s]>o;)--s;c=u+r-s;var g=Array(c),m=l[s];for(--n;m;){for(var w=m,b=w.newi,k=w.oldi;n>b;)g[--c]=1,--n;for(;o>k;)g[--c]=-1,--o;g[--c]=0,--n,--o,m=m.prev}for(;n>=t;)g[--c]=1,--n;for(;o>=a;)g[--c]=-1,--o;return g}(n,r,i,a,o,u,s,c),e,t,n,r,o,u,l,h)},E=function(e,t,n,r){r||(r={});for(var i=r.compare||m,a=r.node||w,o=null==r.before?null:a(r.before,0),u=t.length,s=u,c=0,l=n.length,f=0;c<s&&f<l&&i(t[c],n[f]);)c++,f++;for(;c<s&&f<l&&i(t[s-1],n[l-1]);)s--,l--;var h=c===s,d=f===l;if(h&&d)return n;if(h&&f<l)return g(a,e,n,f,l,k(a,t,c,u,o)),n;if(d&&c<s)return N(a,e,t,c,s),n;var p=s-c,v=l-f,_=-1;if(p<v){if(-1<(_=b(n,f,l,t,c,s,i)))return g(a,e,n,f,_,a(t[c],0)),g(a,e,n,_+p,l,k(a,t,s,u,o)),n}else if(v<p&&-1<(_=b(t,c,s,n,f,l,i)))return N(a,e,t,c,_),N(a,e,t,_+v,s),n;return p<2||v<2?(g(a,e,n,f,l,a(t[c],0)),N(a,e,t,c,s),n):p===v&&function(e,t,n,r,i,a){for(;r<i&&a(n[r],e[t-1]);)r++,t--;return 0===t}(n,l,t,c,s,i)?(g(a,e,n,f,l,k(a,t,s,u,o)),n):(C(a,e,n,f,l,v,t,c,s,p,u,i,o),n)},j={};try{j.WeakMap=WeakMap}catch(e){j.WeakMap=function(e,t){var n=t.defineProperty,r=t.hasOwnProperty,i=a.prototype;return i.delete=function(e){return this.has(e)&&delete e[this._]},i.get=function(e){return this.has(e)?e[this._]:void 0},i.has=function(e){return r.call(e,this._)},i.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},a;function a(t){n(this,"_",{value:"_@ungap/weakmap"+e++}),t&&t.forEach(o,this)}function o(e){this.set(e[0],e[1])}}(Math.random(),Object)}var O,A=j.WeakMap,P=function(e,t,n,r,i){var a="importNode"in e,o=e.createDocumentFragment();return o.appendChild(e.createTextNode("g")),o.appendChild(e.createTextNode("")),(a?e.importNode(o,!0):o.cloneNode(!0)).childNodes.length<2?function e(t,n){for(var r=t.cloneNode(),i=t.childNodes||[],a=i.length,o=0;n&&o<a;o++)r.appendChild(e(i[o],n));return r}:a?e.importNode:function(e,t){return e.cloneNode(!!t)}}(e),S="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},T="-"+Math.random().toFixed(6)+"%",R=!1;try{"content"in(O=e.createElement("template"))&&(O.innerHTML='<p tabindex="'+T+'"></p>',O.content.childNodes[0].getAttribute("tabindex")==T)||(T="_dt: "+T.slice(1,-1)+";",R=!0)}catch(e){}var M="\x3c!--"+T+"--\x3e",D=8,L=1,$=3,V=/^(?:style|textarea)$/i,z=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var F=" \\f\\n\\r\\t",I="[^"+F+"\\/>\"'=]+",K="["+F+"]+"+I,H="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",G="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+I.replace("\\/","")+"))?)",W=new RegExp(H+K+G+"+)(["+F+"]*/?>)","g"),Z=new RegExp(H+K+G+"*)(["+F+"]*/>)","g"),B=new RegExp("("+K+"\\s*=\\s*)(['\"]?)"+M+"\\2","gi");function q(e,t,n,r){return"<"+t+n.replace(B,U)+r}function U(e,t,n){return t+(n||'"')+T+(n||'"')}function J(e,t,n){return z.test(t)?e:"<"+t+n+"></"+t+">"}function Q(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function X(t,n,r,i){for(var a=new _,o=t.attributes,u=[],s=u.slice.call(o,0),c=s.length,l=0;l<c;){var f,h=s[l++],d=h.value===T;if(d||1<(f=h.value.split(M)).length){var p=h.name;if(!a.has(p)){var v=r.shift().replace(d?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+p+")\\s*=\\s*('|\")","i"),"$1"),y=o[v]||o[v.toLowerCase()];if(a.set(p,y),d)n.push(ee(y,i,v,null));else{for(var g=f.length-2;g--;)r.shift();n.push(ee(y,i,v,f))}}u.push(h)}}l=0;for(var m=(0<(c=u.length)&&R&&!("ownerSVGElement"in t));l<c;){var w=u[l++];m&&(w.value=""),t.removeAttribute(w.name)}var b=t.nodeName;if(/^script$/i.test(b)){var k=e.createElement(b);for(c=o.length,l=0;l<c;)k.setAttributeNode(o[l++].cloneNode(!0));k.textContent=t.textContent,t.parentNode.replaceChild(k,t)}}function Y(e,t){return{type:"any",node:e,path:t}}function ee(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function te(e,t){return{type:"text",node:e,path:t}}var ne=new A,re=new A;function ie(e,t){var n=(e.convert||function(e){return e.join(M).replace(Z,J).replace(W,q)})(t),r=e.transform;r&&(n=r(n));var i=p(n,e.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===S.call(r.textContent).length&&e.removeChild(r)}}(i);var a=[];!function e(t,n,r,i){for(var a=t.childNodes,o=a.length,u=0;u<o;){var s=a[u];switch(s.nodeType){case L:var c=i.concat(u);X(s,n,r,c),e(s,n,r,c);break;case D:var l=s.textContent;if(l===T)r.shift(),n.push(V.test(t.nodeName)?te(t,i):Y(s,i.concat(u)));else switch(l.slice(0,2)){case"/*":if("*/"!==l.slice(-2))break;case"👻":t.removeChild(s),u--,o--}break;case $:V.test(t.nodeName)&&S.call(s.textContent)===M&&(r.shift(),n.push(te(t,i)))}u++}}(i,a,t.slice(0),[]);var o={content:i,updates:function(n){for(var r=[],i=a.length,o=0,u=0;o<i;){var s=a[o++],c=Q(n,s.path);switch(s.type){case"any":r.push({fn:e.any(c,[]),sparse:!1});break;case"attr":var l=s.sparse,f=e.attribute(c,s.name,s.node);null===l?r.push({fn:f,sparse:!1}):(u+=l.length-2,r.push({fn:f,sparse:!0,values:l}));break;case"text":r.push({fn:e.text(c),sparse:!1}),c.textContent=""}}return i+=u,function(){var e=arguments.length;if(i!==e-1)throw new Error(e-1+" values instead of "+i+"\n"+t.join("${value}"));for(var a=1,o=1;a<e;){var u=r[a-o];if(u.sparse){var s=u.values,c=s[0],l=1,f=s.length;for(o+=f-2;l<f;)c+=arguments[a++]+s[l++];u.fn(c)}else u.fn(arguments[a++])}return n}}};return ne.set(t,o),o}function ae(t){return function(n){var r=re.get(t);return null!=r&&r.template===n||(r=function(t,n){var r=ne.get(n)||ie(t,n),i=P.call(e,r.content,!0),a={content:i,template:n,updates:r.updates(i)};return re.set(t,a),a}(t,n)),r.updates.apply(null,arguments),r.content}}var oe=function(){var e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,t=/([^A-Z])([A-Z]+)/g;return function(e,t){return"ownerSVGElement"in e?function(e,t){var n;t?n=t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),n=e.getAttributeNode("style"));return n.value="",e.setAttributeNode(n),r(n,!0)}(e,t):r(e.style,!1)};function n(e,t,n){return t+"-"+n.toLowerCase()}function r(r,i){var a,o;return function(u){var s,c,l,f;switch(typeof u){case"object":if(u){if("object"===a){if(!i&&o!==u)for(c in o)c in u||(r[c]="")}else i?r.value="":r.cssText="";for(c in s=i?{}:r,u)l="number"!=typeof(f=u[c])||e.test(c)?f:f+"px",!i&&/^--/.test(c)?s.setProperty(c,l):s[c]=l;a="object",i?r.value=function(e){var r,i=[];for(r in e)i.push(r.replace(t,n),":",e[r],";");return i.join("")}(o=s):o=u;break}default:o!=u&&(a="string",o=u,i?r.value=u||"":r.cssText=u||"")}}}}(),ue=function(e,t){return e.nodeType===h?1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild:e},se=function(e,t){var n,r=!1,i=t.cloneNode(!0);return function(t){n!==t&&(n=t,i.value!==t&&(null==t?(r&&(r=!1,e.removeAttributeNode(i)),i.value=t):(i.value=t,r||(r=!0,e.setAttributeNode(i)))))}},ce=function(e,t){var n;return function(r){n!==r&&(n=r,e[t]!==r&&(null==r?(e[t]="",e.removeAttribute(t)):e[t]=r))}},le=/^(?:form|list)$/i,fe=[].slice;function he(e){return this.type=e,ae(this)}function de(e){return e(this)}he.prototype={attribute:function(e,t,n){switch(t){case"class":if("ownerSVGElement"in e)return se(e,n);t="className";case"data":case"props":return ce(e,t);case"style":return oe(e,n,"ownerSVGElement"in e);case"ref":return function(e){return function(t){t.current=e}}(e);default:return"."===t.slice(0,1)?function(e,t){return function(n){e[t]=n}}(e,t.slice(1)):"on"===t.slice(0,2)?function(e,t){var n,r=t.slice(2);return t.toLowerCase()in e&&(r=r.toLowerCase()),function(t){n!==t&&(n&&e.removeEventListener(r,n,!1),n=t,t&&e.addEventListener(r,t,!1))}}(e,t):t in e&&!("ownerSVGElement"in e||le.test(t))?ce(e,t):se(e,n)}},any:function(e,t){var n,r={node:ue,before:e},i="ownerSVGElement"in e?"svg":"html",a=!1;return function o(u){switch(typeof u){case"string":case"number":case"boolean":a?n!==u&&(n=u,t[0].textContent=u):(a=!0,n=u,t=E(e.parentNode,t,[function(e,t){return e.ownerDocument.createTextNode(t)}(e,u)],r));break;case"function":o(u(e));break;case"object":case"undefined":if(null==u){a=!1,t=E(e.parentNode,t,[],r);break}default:if(a=!1,n=u,f(u))if(0===u.length)t.length&&(t=E(e.parentNode,t,[],r));else switch(typeof u[0]){case"string":case"number":case"boolean":o(String(u));break;case"function":o(u.map(de,e));break;case"object":f(u[0])&&(u=u.concat.apply([],u));default:t=E(e.parentNode,t,u,r)}else!function(e){return"ELEMENT_NODE"in e}(u)?"text"in u?o(String(u.text)):"any"in u?o(u.any):"html"in u?t=E(e.parentNode,t,fe.call(p([].concat(u.html).join(""),i).childNodes),r):"length"in u&&o(fe.call(u)):t=E(e.parentNode,t,11===u.nodeType?fe.call(u.childNodes):[u],r)}}},text:function(e){var t;return function n(r){if(t!==r){t=r;var i=typeof r;"object"===i&&r?"text"in r?n(String(r.text)):"any"in r?n(r.any):"html"in r?n([].concat(r.html).join("")):"length"in r&&n(fe.call(r).join("")):"function"===i?n(r(e)):e.textContent=null==r?"":r}}}};var pe=!1,ve=function(t){var n,r=(n=(e.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(n)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(n)),i=!("raw"in t)||t.propertyIsEnumerable("raw")||!Object.isFrozen(t.raw);if(r||i){var a={},o=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return a[t]||(a[t]=e)};if(i)ve=o;else{var u=new A;ve=function(e){return u.get(e)||function(e,t){return u.set(e,t),t}(e,o(e))}}}else pe=!0;return _e(t)};function _e(e){return pe?e:ve(e)}function ye(e){for(var t=arguments.length,n=[_e(e)],r=1;r<t;)n.push(arguments[r++]);return n}var ge=new A,me=new A,we=null,be=function(e){var t=je("html",e),n=je("svg",e);return{html:t,svg:n,hook:function(e){return{html:Ee(e,t),svg:Ee(e,n)}},render:function(t,n){var r=Oe.call(this,t,n,e);return me.get(t)!==r&&(me.set(t,r),function(e,t){e.textContent="",e.appendChild(t)}(t,r)),t}}}(he),ke=be.html,Ne=be.svg,xe=be.render;function Ce(e,t){return e.nodeType===h?e.valueOf(t):e}function Ee(e,t){return function(){var n=e(null);return null===n.current&&(n.current=t.for(n)),Ce(n.current.apply(null,arguments),!1)}}function je(e,t){var n=new A;return r.for=function(r,i){var a=n.get(r)||function(e){var t={$:null};return n.set(e,t),t}(r);return null==i&&(i="$"),a[i]||function(n,r){var i=[],a=null,o=new t(e),u=function(){return o.apply(null,Pe(i,1,1,t))};return n[r]=function(){i=ye.apply(null,arguments);var e=Oe(o,u,t);return a||(a=Se(e))}}(a,i)},r;function r(){var n=ye.apply(null,arguments);return we?new d(e,n):new t(e).apply(null,n)}}function Oe(e,t,n){var r,i,a=we;(we=ge.get(e)||(r=e,i={i:0,length:0,stack:[],update:!1},ge.set(r,i),i)).i=0;var o,u=t.call(this);if(u instanceof d){o=Ce(Ae(u,0,n),we.update);var s=we,c=s.i,l=s.length,f=s.stack,h=s.update;c<l&&f.splice(we.length=c),h&&(we.update=!1)}else o=Ce(u,!1);return we=a,o}function Ae(e,t,n){var r=we,i=r.i,a=r.length,o=r.stack,u=e.type,s=e.args,c=i<a;we.i++,c||(we.length=o.push({l:t,kind:u,tag:null,tpl:s[0],wire:null})),Pe(s,1,t+1,n);var l=o[i];if(c){var f=l.l,h=l.kind,d=l.tag,p=l.tpl,v=l.wire;if(f===t&&u===h&&p===s[0])return d.apply(null,s),v}var _=new n(u),y=Se(_.apply(null,s));return l.l=t,l.kind=u,l.tag=_,l.tpl=s[0],l.wire=y,i<1&&(we.update=!0),y}function Pe(e,t,n,r){for(var i=e.length;t<i;t++){var a=e[t];"object"==typeof a&&a&&(a instanceof d?e[t]=Ae(a,n-1,r):f(a)&&(e[t]=Pe(a,0,n++,r)))}return e}function Se(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new l(t):e}function Te(){var e=s(['<div class="','">',"</div>"]);return Te=function(){return e},e}var Re=new WeakMap;function Me(){var e=s([""]);return Me=function(){return e},e}var De=Array.prototype.includes,Le=new Map;function $e(e,t){for(var n=[],r=0;r<e.length;r++)n.push(e[r].replace("{tag}",t));return function(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(n)}new MutationObserver(function(t){t.forEach(function(t){Le.forEach(function(n){if(!(n.hydrated||n.node instanceof l||n.node instanceof Function)&&(De.call(t.removedNodes,n.node)||!e.body.contains(n.node))){n.onDisconnected();var r=n.key;Le.delete(r)}})})}).observe(e.body,{childList:!0,subtree:!0,attributes:!1});var Ve=0;function ze(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new l(t):e}function Fe(e,t,n,r){var i={id:Ve+=1};function a(){var a=new e(t);if(a.key=i,a.id=r,Le.set(i,a),a.__parent__=n,n&&n.stylesRegistry)if(r&&n.stylesRegistry[r])a.styles=u({},a.styles,{},n.stylesRegistry[r]);else{var o=e.compName||!1;o&&n.stylesRegistry[o]&&(a.styles=u({},a.styles,{},n.stylesRegistry[o]))}return a}function o(e){var n=Le.get(i);return n?!e||e instanceof Comment||n._setProps(e):(!e||e instanceof Comment||(t=e),n=a()),n._updater}return o._nameId="_factory",o.instance=function(){return Le.get(i)||a()},o}var Ie=function(){function e(t){n(this,e),this._node=null,this.__parent__=null,this.__childs__={},this.__partKeys__={},this.props=t,this.render=this.render.bind(this),this._updater=this._updater.bind(this)}return i(e,null,[{key:"for",value:function(e,t,n){var r=void 0===n?{}:n;return void 0===e.__childs__&&(e.__childs__={}),e.__childs__[t]?e.__childs__[t](n):(e.__childs__[t]=Fe(this,r,e,t),e.__childs__[t])}}]),i(e,[{key:"part",value:function(e){var t=this.__partKeys__[e]||(this.__partKeys__[e]={tagger:new he("html"),wire:null});return function(){var e=t.tagger.apply(null,arguments);return t.wire||(t.wire=ze(e))}}},{key:"onDisconnected",value:function(){this.__parent__&&this.__parent__.__childs__&&delete this.__parent__.__childs__[this.id]}},{key:"_setProps",value:function(e){this.props=e}},{key:"_updater",value:function(){var e=this.render(this.props);return this._node||(this._node=e)}},{key:"render",value:function(e){return""}},{key:"node",get:function(){return this._node}}]),e}(),Ke=function(){function e(){n(this,e),this.hydrated=!1,this.v2=!0,this.$=new he("html"),this._html=function(){return this.$.apply(null,arguments)},this._key=null,this._id=null,this._node=null,this.__parent__=null,this.__childs__={},this._needsRender=!0,this._connected=!1,this.__values__={},this.__partKeys__={},this.watched=this.watchers(),this.stylesRegistry={},this.styles={};var t=this.constructor.properties;this.attachProps(t),this.templateCache={},this.render=this.render.bind(this),this._updater=this._updater.bind(this)}return i(e,null,[{key:"for",value:function(e,t,n){var r=void 0===t?"default":t,i=void 0===n?{}:n;return void 0===e.__childs__&&(e.__childs__={}),e.__childs__[r]?e.__childs__[r](n):(e.__childs__[r]=Fe(this,i,e,r),e.__childs__[r])}},{key:"properties",get:function(){return{}}}]),i(e,[{key:"attachProps",value:function(e,t){var n=this;e&&Object.keys(e).forEach(function(r){var i=e[r];!function(e,t,n){var r=n.type;function i(){var n=e.__values__[t];return"function"==typeof n&&r!==Function?n():n}Object.defineProperty(e,t,n.computed?{get:i}:{get:i,set:function(n){var i;i=null===n||void 0===n||"function"==typeof n?n:i=r?r(n):n,e._setPropertyValue(t,i)}})}(n,r,i),i.type&&void 0!==i.default?n.__values__[r]=i.default:n.__values__[r]=i,t&&t[r]&&(n.watched[r]=t[r])})}},{key:"part",value:function(e){var t=this.__partKeys__[e]||(this.__partKeys__[e]={tagger:new he("html"),wire:null});return function(){var e=t.tagger.apply(null,arguments);return t.wire||(t.wire=ze(e))}}},{key:"dtt",value:function(e,t){var n=this.__partKeys__[e]||(this.__partKeys__[e]={tagger:new he("html"),wire:null}),r=this;return function(){var e=r.templateCache[t]||(r.templateCache[t]=$e(arguments[0],t));arguments[0]=e;var i=n.tagger.apply(null,arguments);return n.wire||(n.wire=ze(i))}}},{key:"_setPropertyValue",value:function(e,t){var n=this.__values__[e];if(this.__values__[e]=t,n!==t){if(this.watched[e]&&this.watched[e](t,n))return;this._needsRender||this.invalidate()}}},{key:"_setProps",value:function(e){var t=this;if(e){if(this.onUpdated(e))return;Object.keys(e).forEach(function(n){t._setPropertyValue(n,e[n])})}}},{key:"watchers",value:function(){return{}}},{key:"onConnected",value:function(){}},{key:"onDisconnected",value:function(){this.__parent__&&this.__parent__.__childs__&&delete this.__parent__.__childs__[this.id],this._connected=!1}},{key:"onRender",value:function(){}},{key:"invalidate",value:function(){var e=this;if(!this._needsRender){if(this._needsRender=!0,this.hydrated)return void Promise.resolve().then(function(){return e.deHydrate()});Promise.resolve().then(function(){e._needsRender&&e.update()})}}},{key:"onUpdated",value:function(e){}},{key:"update",value:function(){return this._connected?this._updater():""}},{key:"deHydrate",value:function(){this._node=null,this.hydrated=!1,this.__parent__.invalidate()}},{key:"_updater",value:function(){var e=this,t=this.hydrated?this._node:this.render(),n=this._node||(this._node=this.v2?t:ze(t));return this.onRender(),this._connected||(this._connected=!0,setTimeout(function(){return e.onConnected()})),this._needsRender=!1,n}},{key:"render",value:function(){return this.html(Me())}},{key:"vModel",value:function(e){var t=this;function n(){return t.__values__[e]}return n.model=function(){return e},n}},{key:"$emit",value:function(e,t){if(this.__parent__){var n=c(e.split(":"),2),r=n[0],i=n[1];switch(r){case"update":if(this.__values__[i].model){var a=this.__values__[i].model();this.__parent__._setPropertyValue(a,t)}else this.__values__[i]=t;this.invalidate();break;default:this.__parent__.handleEvent&&this.__parent__.handleEvent(e,t)}}else console.log("NO PARENT")}},{key:"html",get:function(){return this._html}},{key:"key",set:function(e){this._key=e},get:function(){return this._key}},{key:"node",get:function(){return this._node}},{key:"id",set:function(e){this._id=e},get:function(){return this._id}}]),e}();return t.Component=Fe,t.Fragment=Ie,t.VirtualElement=Ke,t.html=ke,t.mapClass=function(e){return e.filter(function(e){return"string"==typeof e||e[1]}).map(function(e){return"string"==typeof e?e:e[0]}).join(" ")},t.render=xe,t.svg=Ne,t.vAnimation=function(e,t,n,r){var i,a=Re.get(n);void 0===a&&(a="");var o=r||"v-fade",u=e?"":"hide";return Re.set(n,u),""===a?i="".concat(o," ").concat(u):(u=e?"show":"hide",i="".concat(o," ").concat(u)),html.for(n)(Te(),i,t)},t.vLoop=function(e,t){return e.map(function(e,n){var r=t(e,n);return"function"==typeof r&&r._nameId&&"_factory"===r._nameId?r():r})},t}(document,{});
