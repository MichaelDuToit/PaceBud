!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);var r,o,u,i,a,l,c,d,s,m,v,f,p={meter:1,kilometer:1e3,yard:.9144,mile:1609.344},g={time:document.getElementById("time-button"),pace:document.getElementById("pace-button"),distance:document.getElementById("dist-button")};function y(){return r=document.getElementById("time-hh"),o=document.getElementById("time-mm"),u=document.getElementById("time-ss"),i=document.getElementById("dist"),a=document.getElementById("pace-mm"),l=document.getElementById("pace-ss"),c=document.getElementById("pace-option"),d=c.options[c.selectedIndex].value.toLowerCase(),s=document.getElementById("dist-option"),m=s.options[s.selectedIndex].value.toLowerCase()}function b(e,t){return e=Number(e),"kilometer"==t||"km"==t||"kilometers"==t?e*p.kilometer:"mile"==t||"mi"==t||"miles"==t?e*p.mile:"yards"==t||"y"==t||"yard"==t?e*p.yard:"meter"==t||"m"==t||"meters"==t?e:console.log("Measure unit not defined")}function E(e,t,n){return Number(n)+60*Number(t)+60*Number(e)*60}g.time.addEventListener("click",function(){y();var e=E(0,a.value,l.value),t=b(i.value,m),n=e/p[d]*t,c=Math.floor(n/60/60),s=Math.floor(n/60),v=n%60;return c>0&&(s-=60*c),r.value=c,o.value=s,u.value=v}),g.pace.addEventListener("click",function(){y();var e=E(r.value,o.value,u.value)/b(i.value,m),t=Math.floor(e*p[d]/60),n=e*p[d]%60;return n<9&&(n="0"+n),a.value=t,l.value=n}),g.distance.addEventListener("click",function(){y();var e=E(r.value,o.value,u.value)/(E(0,a.value,l.value)/p[d])/p[m];return i.value=e}),document.getElementById("update-button").addEventListener("click",function(){v.postMessage({action:"skipWaiting"})}),"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js",{scope:"/"}).then(function(e){e.addEventListener("updatefound",function(){(v=e.installing).addEventListener("statechange",function(){switch(v.state){case"installed":if(navigator.serviceWorker.controller)document.getElementById("update-available").className="show"}})})}),navigator.serviceWorker.addEventListener("controllerchange",function(){f||(window.location.reload(),f=!0)})},function(e,t,n){}]);