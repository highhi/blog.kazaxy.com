!function(e){function t(r){if(n[r])return n[r].exports;var c=n[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";var r="blog-kazaxy-v7a69528abf4f4c48017d6d31320979ac1924d24a",c=["css/vars.css","css/base.css","css/home.css","css/page.css"];self.addEventListener("install",function(e){var t=caches.open(r).then(function(e){return e.addAll(c)});e.waitUntil(t)}),self.addEventListener("activate",function(e){var t=caches.keys().then(function(e){return e.filter(function(e){return e!==r})}).then(function(e){return Promise.all(e.map(function(e){return caches.delete(e)}))});e.waitUntil(t)}),self.addEventListener("fetch",function(e){var t=e.request.url;if(console.log(t),c.some(function(e){return t.includes(e)})){var n=caches.match(e.request).then(function(t){return t||fetch(e.request)});e.respondWith(n)}})}]);