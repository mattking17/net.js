/**
 * net.js 0.1 Copyright (c) 2013, Matt King (mking@mking.me)
 * Available via the MIT license.
 * see: https://github.com/mattking17/net.js for details
 */

/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(e,t){typeof define=="function"&&define.amd?define(t):e.net=t()})(this,function(){var e,t,n;return function(r){function v(e,t){return h.call(e,t)}function m(e,t){var n,r,i,s,o,u,a,f,c,h,p,v=t&&t.split("/"),m=l.map,g=m&&m["*"]||{};if(e&&e.charAt(0)===".")if(t){v=v.slice(0,v.length-1),e=e.split("/"),o=e.length-1,l.nodeIdCompat&&d.test(e[o])&&(e[o]=e[o].replace(d,"")),e=v.concat(e);for(c=0;c<e.length;c+=1){p=e[c];if(p===".")e.splice(c,1),c-=1;else if(p===".."){if(c===1&&(e[2]===".."||e[0]===".."))break;c>0&&(e.splice(c-1,2),c-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((v||g)&&m){n=e.split("/");for(c=n.length;c>0;c-=1){r=n.slice(0,c).join("/");if(v)for(h=v.length;h>0;h-=1){i=m[v.slice(0,h).join("/")];if(i){i=i[r];if(i){s=i,u=c;break}}}if(s)break;!a&&g&&g[r]&&(a=g[r],f=c)}!s&&a&&(s=a,u=f),s&&(n.splice(0,u,s),e=n.join("/"))}return e}function g(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function y(e){return function(t){return m(t,e)}}function b(e){return function(t){a[e]=t}}function w(e){if(v(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!v(a,e)&&!v(c,e))throw new Error("No "+e);return a[e]}function E(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function S(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice,d=/\.js$/;o=function(e,t){var n,r=E(e),i=r[0];return e=r[1],i&&(i=m(i,t),n=w(i)),i?n&&n.normalize?e=n.normalize(e,y(t)):e=m(e,t):(e=m(e,t),r=E(e),i=r[0],e=r[1],i&&(n=w(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return g(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:S(e)}}},i=function(e,t,n,i){var s,l,h,p,d,m=[],y=typeof n,E;i=i||e;if(y==="undefined"||y==="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(d=0;d<t.length;d+=1){p=o(t[d],i),l=p.f;if(l==="require")m[d]=u.require(e);else if(l==="exports")m[d]=u.exports(e),E=!0;else if(l==="module")s=m[d]=u.module(e);else if(v(a,l)||v(f,l)||v(c,l))m[d]=w(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,g(i,!0),b(l),{}),m[d]=a[l]}}h=n?n.apply(a[e],m):undefined;if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!E)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){if(typeof e=="string")return u[e]?u[e](t):w(o(e,t).f);if(!e.splice){l=e,l.deps&&s(l.deps,l.callback);if(!t)return;t.splice?(e=t,t=n,n=null):e=r}return t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s},s.config=function(e){return s(e)},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!v(a,e)&&!v(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("../node_modules/almond/almond",function(){}),n("promise",[],function(){function t(){this.promises={success:[],fail:[]}}var e={SUCCESS:"success",FAIL:"fail"};return t.prototype.then=function(e,t){return e&&this.promises.success.push(e),t&&this.promises.fail.push(t),this},t.prototype.run=function(e,t,n){var r=t,i=this.promises[e];while(i.length){var s=i.shift(),o=s(r,n);r=o||r}return this},t.prototype.succeed=function(t,n){return this.run(e.SUCCESS,t,n)},t.prototype.fail=function(t){return this.run(e.FAIL,t)},t}),n("net/ajax",["promise"],function(e){function s(e){return e===0||e>399}function o(){}function u(e,t){return function(){if(this.readyState!==4)return;s(this.status)?e.fail(this):t.process?t.process.call(t.process,this,e):e.succeed(this)}}function a(r,i){typeof r=="string"?(i=i||{},i.url=r):i=r||{};var s=new e;s.then(i.success||function(e){return e},i.error||function(e){return e});var o=new t;o.open(i.method||n.GET,i.url,!0),i.headers=i.headers||{};for(var a in i.headers)o.setRequestHeader(a,i.headers[a]);return o.withCredentials=i.withCredentials,o.onreadystatechange=u(s,i),o.readyState===4?!1:(o.send(i.data||null),s)}function f(e,t,n){typeof e=="string"&&t?t.method=n:e.method=n}function l(e,t){return f(e,t,n.GET),a(e,t)}function c(e,t){return f(e,t,n.POST),a(e,t)}function h(e,t){return f(e,t,n.PUT),a(e,t)}function p(e,t){return f(e,t,n.DELETE),a(e,t)}var t=function(){return t=window.XMLHttpRequest||function(){var e=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Microsoft.XMLHTTP"],t=function(e){return function(){return new window.ActiveXObject(e)}};for(var n=0;n<e.length;n++)try{var r=new window.ActiveXObject(e[n]);return t(e[n])}catch(i){}throw new Error("This browser does not support XMLHttpRequest.")}(),new t(Array.prototype.slice.call(arguments,0))},n={GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE"},r={200:"OK",201:"Created",202:"Accepted",204:"No Content"},i={0:"Server Could Not Be Reached",400:"Bad Request",401:"Unauthorized",403:"Forbidden",404:"Not Found",409:"Conflict",411:"Method Not Allowed",500:"Internal Server Error",501:"Unsupported Method",502:"Bad Gateway",503:"Service Unavailable"},d={get:l,post:c,put:h,"delete":p,request:a};return d}),n("net/json",["net/ajax"],function(e){function t(e){e=e||{},e.headers=e.headers||{},e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json",e.headers.Accept=e.headers.Accept||"application/json",e.process=n,e.data&&(e.data=JSON.stringify(e.data))}function n(e,t){var n;try{n=JSON.parse(e.responseText||"{}")}catch(r){return t.fail(e)}return t.succeed(n,e)}function r(n){return t(n),e.get(n)}function i(n){return t(n),e.post(n)}function s(n){return t(n),e.put(n)}function o(n){return t(n),e.delete(n)}var u={get:r,post:i,put:s,"delete":o};return u}),n("net/form",["net/ajax"],function(e){function t(e){for(var t=0,n=Object.keys(e),r=n.length,i=[];t<r;t++)i.push([encodeURIComponent(n[t]),encodeURIComponent(e[n[t]])].join("="));return i.join("&")}function n(e){e=e||{},e.headers=e.headers||{},e.data&&(e.data.nodeName==="FORM"?e.data=new FormData(e.data):e.data instanceof FormData||(e.headers["Content-Type"]="application/x-www-form-urlencoded",e.data=t(e.data)))}function r(t){return n(t),e.post(t)}function i(t){return n(t),e.put(t)}var s={post:r,put:i};return s}),n("net",["net/ajax","net/json","net/form"],function(e,t,n){var r={ajax:e,json:t,form:n};return r}),t("net")});