if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const o=e=>a(e,i),r={module:{uri:i},exports:c,require:o};s[i]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(t(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Q9Hk3Zl8XZ0XWYsdxJG4k/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/Q9Hk3Zl8XZ0XWYsdxJG4k/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/187-bb55e17b1bdc8ba5.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/190-ba91e494c8ab454b.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/477-8b3dac09a0998617.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/app/_not-found/page-8485ca182b8fcb28.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/app/layout-95fee27ee668bec2.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/app/page-3d9b636456850066.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/fd9d1056-02a7ca6d61e7c515.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/main-833c7e8623ab0269.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/main-app-827e357f1f4d668a.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-1796d5ecd61cbd74.js",revision:"Q9Hk3Zl8XZ0XWYsdxJG4k"},{url:"/_next/static/css/8be776115d21ca07.css",revision:"8be776115d21ca07"},{url:"/assets/favicon.ico",revision:"406d7e2fed36519bd958698213094c85"},{url:"/assets/logo-192x192.png",revision:"7036ea0698298ebbef42ca87340c501e"},{url:"/fonts/NanumSquareNeo-Bold.woff",revision:"3e81895813840a00fd310ee644c128ad"},{url:"/fonts/NanumSquareNeo-Bold.woff2",revision:"ced0f2bf940abc855b264b71caeb78ef"},{url:"/fonts/NanumSquareNeo-ExtraBold.woff",revision:"754b6abd5e1569ae132017fdab957efd"},{url:"/fonts/NanumSquareNeo-ExtraBold.woff2",revision:"c1e6fc8655d6053ef822b17a6edb1272"},{url:"/fonts/NanumSquareNeo-Regular.woff",revision:"45d90f2a7e4e030e1bf18bf84c86d28a"},{url:"/fonts/NanumSquareNeo-Regular.woff2",revision:"3b75b9b01d962687d3040069d5c6e98e"},{url:"/manifest.json",revision:"0d164f67ea67c64d6277f52cb8bb456b"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
