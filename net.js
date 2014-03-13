/**
 * net.js 0.1 Copyright (c) 2013, Matt King (mking@mking.me)
 * Available via the MIT license.
 * see: https://github.com/mattking17/net.js for details
 */

/**
 * almond 0.2.5 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(e,t){typeof define=="function"&&define.amd?define(t):e.net=t()})(this,function(){var e,t,n;return function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("../build/almond.js",function(){}),n("promise",[],function(){function t(){this.promises={success:[],fail:[]}}var e={SUCCESS:"success",FAIL:"fail"};return t.prototype.chain=function(){return this.chained=!0,this},t.prototype.then=function(e,t){return e&&this.promises.success.push(e),t&&this.promises.fail.push(t),this},t.prototype.run=function(e,t){var n=t,r=this.promises[e];while(r.length){var i=r.shift(),s=i(n);this.chained&&(n=s)}return this},t.prototype.succeed=function(t){return this.run(e.SUCCESS,t)},t.prototype.fail=function(t){return this.run(e.FAIL,t)},t}),n("net/ajax",["promise"],function(e){function i(){}function s(t){var s=t.success,o=t.error,u=new e;(s||o)&&u.then(s||i,o||i);var a=new XMLHttpRequest;a.open(t.method,t.url,!0),t.headers=t.headers||{};for(var f in t.headers)a.setRequestHeader(f,t.headers[f]);return a.withCredentials=t.withCredentials,a.onreadystatechange=function(){if(a.readyState!==4)return;if(a.status in r&&!(a.status in n))throw u.fail(a),new Error("Error issuing "+t.method+" to "+t.url+" ("+a.status+" "+r[a.status]+")");t.process?t.process.call(t.process,a,u):u.succeed(a)},a.readyState===4?!1:(a.send(t.data||null),u)}function o(e){return e.method=t.GET,s(e)}function u(e){return e.method=t.POST,s(e)}function a(e){return e.method=t.PUT,s(e)}function f(e){return e.method=t.DELETE,s(e)}window.XMLHttpRequest=window.XMLHttpRequest||function(){var e=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Microsoft.XMLHTTP"];for(var t=0;t<e.length;t++)try{return new ActiveXObject(e[t]),function(){return new ActiveXObject(e[t])}}catch(n){}throw new Error("This browser does not support XMLHttpRequest.")}();var t={GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE"},n={200:"OK",201:"Created",202:"Accepted",204:"No Content"},r={400:"Bad Request",401:"Unauthorized",403:"Forbidden",404:"Not Found",409:"Conflict",411:"Method Not Allowed",500:"Internal Server Error",501:"Unsupported Method"},l={get:o,post:u,put:a,"delete":f,request:s};return l}),n("net/json",["net/ajax"],function(e){function t(e){e=e||{},e.headers=e.headers||{},e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json",e.headers.Accept=e.headers.Accept||"application/json",e.process=n,e.data&&(e.data=JSON.stringify(e.data))}function n(e,t){var n;try{n=JSON.parse(e.responseText||{})}catch(r){throw t.fail(e),new Error("Error parsing JSON: "+r)}return t.succeed(n)}function r(n){return t(n),e.get(n)}function i(n){return t(n),e.post(n)}function s(n){return t(n),e.put(n)}function o(n){return t(n),e.delete(n)}var u={get:r,post:i,put:s,"delete":o};return u}),n("net/form",["net/ajax"],function(e){function t(e){var t=[];for(var n in e)t.push([encodeURIComponent(n),encodeURIComponent(e[n])].join("="));return t.join("&")}function n(e){e=e||{},e.headers=e.headers||{},e.headers["Content-Type"]="application/x-www-form-urlencoded",e.data&&(e.data=t(e.data))}function r(t){return n(t),e.post(t)}function i(t){return n(t),e.put(t)}var s={post:r,put:i};return s}),n("net",["net/ajax","net/json","net/form"],function(e,t,n){var r={ajax:e,json:t,form:n};return r}),t("net")});