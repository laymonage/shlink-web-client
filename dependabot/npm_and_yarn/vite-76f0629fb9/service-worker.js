try{self["workbox:core:7.0.0"]&&_()}catch{}const G=(s,...e)=>{let t=s;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},Q=G;class h extends Error{constructor(e,t){const n=Q(e,t);super(n),this.name=e,this.details=t}}const B=new Set;function z(s){B.add(s)}const d={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},k=s=>[d.prefix,s,d.suffix].filter(e=>e&&e.length>0).join("-"),J=s=>{for(const e of Object.keys(d))s(e)},x={updateDetails:s=>{J(e=>{typeof s[e]=="string"&&(d[e]=s[e])})},getGoogleAnalyticsName:s=>s||k(d.googleAnalytics),getPrecacheName:s=>s||k(d.precache),getPrefix:()=>d.prefix,getRuntimeName:s=>s||k(d.runtime),getSuffix:()=>d.suffix};function K(s,e){const t=new URL(s);for(const n of e)t.searchParams.delete(n);return t.href}async function X(s,e,t,n){const i=K(e.url,t);if(e.url===i)return s.match(e,n);const a=Object.assign(Object.assign({},n),{ignoreSearch:!0}),r=await s.keys(e,a);for(const c of r){const o=K(c.url,t);if(i===o)return s.match(c,n)}}let m;function Y(){if(m===void 0){const s=new Response("");if("body"in s)try{new Response(s.body),m=!0}catch{m=!1}m=!1}return m}function q(s){s.then(()=>{})}class Z{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function ee(){for(const s of B)await s()}const te=s=>new URL(String(s),location.href).href.replace(new RegExp(`^${location.origin}`),"");function se(s){return new Promise(e=>setTimeout(e,s))}function A(s,e){const t=e();return s.waitUntil(t),t}async function ne(s,e){let t=null;if(s.url&&(t=new URL(s.url).origin),t!==self.location.origin)throw new h("cross-origin-copy-response",{origin:t});const n=s.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},a=e?e(i):i,r=Y()?n.body:await n.blob();return new Response(r,a)}function ie(){self.addEventListener("activate",()=>self.clients.claim())}const ae=(s,e)=>e.some(t=>s instanceof t);let j,O;function re(){return j||(j=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ce(){return O||(O=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const F=new WeakMap,U=new WeakMap,H=new WeakMap,v=new WeakMap,P=new WeakMap;function oe(s){const e=new Promise((t,n)=>{const i=()=>{s.removeEventListener("success",a),s.removeEventListener("error",r)},a=()=>{t(f(s.result)),i()},r=()=>{n(s.error),i()};s.addEventListener("success",a),s.addEventListener("error",r)});return e.then(t=>{t instanceof IDBCursor&&F.set(t,s)}).catch(()=>{}),P.set(e,s),e}function le(s){if(U.has(s))return;const e=new Promise((t,n)=>{const i=()=>{s.removeEventListener("complete",a),s.removeEventListener("error",r),s.removeEventListener("abort",r)},a=()=>{t(),i()},r=()=>{n(s.error||new DOMException("AbortError","AbortError")),i()};s.addEventListener("complete",a),s.addEventListener("error",r),s.addEventListener("abort",r)});U.set(s,e)}let T={get(s,e,t){if(s instanceof IDBTransaction){if(e==="done")return U.get(s);if(e==="objectStoreNames")return s.objectStoreNames||H.get(s);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return f(s[e])},set(s,e,t){return s[e]=t,!0},has(s,e){return s instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in s}};function he(s){T=s(T)}function ue(s){return s===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=s.call(E(this),e,...t);return H.set(n,e.sort?e.sort():[e]),f(n)}:ce().includes(s)?function(...e){return s.apply(E(this),e),f(F.get(this))}:function(...e){return f(s.apply(E(this),e))}}function de(s){return typeof s=="function"?ue(s):(s instanceof IDBTransaction&&le(s),ae(s,re())?new Proxy(s,T):s)}function f(s){if(s instanceof IDBRequest)return oe(s);if(v.has(s))return v.get(s);const e=de(s);return e!==s&&(v.set(s,e),P.set(e,s)),e}const E=s=>P.get(s);function fe(s,e,{blocked:t,upgrade:n,blocking:i,terminated:a}={}){const r=indexedDB.open(s,e),c=f(r);return n&&r.addEventListener("upgradeneeded",o=>{n(f(r.result),o.oldVersion,o.newVersion,f(r.transaction),o)}),t&&r.addEventListener("blocked",o=>t(o.oldVersion,o.newVersion,o)),c.then(o=>{a&&o.addEventListener("close",()=>a()),i&&o.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}function pe(s,{blocked:e}={}){const t=indexedDB.deleteDatabase(s);return e&&t.addEventListener("blocked",n=>e(n.oldVersion,n)),f(t).then(()=>{})}const ge=["get","getKey","getAll","getAllKeys","count"],me=["put","add","delete","clear"],D=new Map;function S(s,e){if(!(s instanceof IDBDatabase&&!(e in s)&&typeof e=="string"))return;if(D.get(e))return D.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=me.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||ge.includes(t)))return;const a=async function(r,...c){const o=this.transaction(r,i?"readwrite":"readonly");let l=o.store;return n&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),i&&o.done]))[0]};return D.set(e,a),a}he(s=>({...s,get:(e,t,n)=>S(e,t)||s.get(e,t,n),has:(e,t)=>!!S(e,t)||s.has(e,t)}));try{self["workbox:expiration:7.0.0"]&&_()}catch{}const we="workbox-expiration",w="cache-entries",W=s=>{const e=new URL(s,location.href);return e.hash="",e.href};class ye{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(w,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&pe(this._cacheName)}async setTimestamp(e,t){e=W(e);const n={url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)},a=(await this.getDb()).transaction(w,"readwrite",{durability:"relaxed"});await a.store.put(n),await a.done}async getTimestamp(e){const n=await(await this.getDb()).get(w,this._getId(e));return n==null?void 0:n.timestamp}async expireEntries(e,t){const n=await this.getDb();let i=await n.transaction(w).store.index("timestamp").openCursor(null,"prev");const a=[];let r=0;for(;i;){const o=i.value;o.cacheName===this._cacheName&&(e&&o.timestamp<e||t&&r>=t?a.push(i.value):r++),i=await i.continue()}const c=[];for(const o of a)await n.delete(w,o.id),c.push(o.url);return c}_getId(e){return this._cacheName+"|"+W(e)}async getDb(){return this._db||(this._db=await fe(we,1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class _e{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new ye(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),n=await self.caches.open(this._cacheName);for(const i of t)await n.delete(i,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,q(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),n=Date.now()-this._maxAgeSeconds*1e3;return t!==void 0?t<n:!0}else return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class be{constructor(e={}){this.cachedResponseWillBeUsed=async({event:t,request:n,cacheName:i,cachedResponse:a})=>{if(!a)return null;const r=this._isResponseDateFresh(a),c=this._getCacheExpiration(i);q(c.expireEntries());const o=c.updateTimestamp(n.url);if(t)try{t.waitUntil(o)}catch{}return r?a:null},this.cacheDidUpdate=async({cacheName:t,request:n})=>{const i=this._getCacheExpiration(t);await i.updateTimestamp(n.url),await i.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&z(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===x.getRuntimeName())throw new h("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new _e(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(t===null)return!0;const n=Date.now();return t>=n-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),i=new Date(t).getTime();return isNaN(i)?null:i}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}try{self["workbox:precaching:7.0.0"]&&_()}catch{}const Re="__WB_REVISION__";function Ce(s){if(!s)throw new h("add-to-cache-list-unexpected-type",{entry:s});if(typeof s=="string"){const a=new URL(s,location.href);return{cacheKey:a.href,url:a.href}}const{revision:e,url:t}=s;if(!t)throw new h("add-to-cache-list-unexpected-type",{entry:s});if(!e){const a=new URL(t,location.href);return{cacheKey:a.href,url:a.href}}const n=new URL(t,location.href),i=new URL(t,location.href);return n.searchParams.set(Re,e),{cacheKey:n.href,url:i.href}}class xe{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:n})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const i=t.originalRequest.url;n?this.notUpdatedURLs.push(i):this.updatedURLs.push(i)}return n}}}class ke{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:n})=>{const i=(n==null?void 0:n.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return i?new Request(i,{headers:t.headers}):t},this._precacheController=e}}try{self["workbox:strategies:7.0.0"]&&_()}catch{}function R(s){return typeof s=="string"?new Request(s):s}class ve{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new Z,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const n of this._plugins)this._pluginStateMap.set(n,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let n=R(e);if(n.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const r=await t.preloadResponse;if(r)return r}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const r of this.iterateCallbacks("requestWillFetch"))n=await r({request:n.clone(),event:t})}catch(r){if(r instanceof Error)throw new h("plugin-error-request-will-fetch",{thrownErrorMessage:r.message})}const a=n.clone();try{let r;r=await fetch(n,n.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const c of this.iterateCallbacks("fetchDidSucceed"))r=await c({event:t,request:a,response:r});return r}catch(r){throw i&&await this.runCallbacks("fetchDidFail",{error:r,event:t,originalRequest:i.clone(),request:a.clone()}),r}}async fetchAndCachePut(e){const t=await this.fetch(e),n=t.clone();return this.waitUntil(this.cachePut(e,n)),t}async cacheMatch(e){const t=R(e);let n;const{cacheName:i,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},a),{cacheName:i});n=await caches.match(r,c);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))n=await o({cacheName:i,matchOptions:a,cachedResponse:n,request:r,event:this.event})||void 0;return n}async cachePut(e,t){const n=R(e);await se(0);const i=await this.getCacheKey(n,"write");if(!t)throw new h("cache-put-with-no-response",{url:te(i.url)});const a=await this._ensureResponseSafeToCache(t);if(!a)return!1;const{cacheName:r,matchOptions:c}=this._strategy,o=await self.caches.open(r),l=this.hasCallback("cacheDidUpdate"),g=l?await X(o,i.clone(),["__WB_REVISION__"],c):null;try{await o.put(i,l?a.clone():a)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await ee(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:r,oldResponse:g,newResponse:a.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const n=`${e.url} | ${t}`;if(!this._cacheKeys[n]){let i=e;for(const a of this.iterateCallbacks("cacheKeyWillBeUsed"))i=R(await a({mode:t,request:i,event:this.event,params:this.params}));this._cacheKeys[n]=i}return this._cacheKeys[n]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const n of this.iterateCallbacks(e))await n(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const n=this._pluginStateMap.get(t);yield a=>{const r=Object.assign(Object.assign({},a),{state:n});return t[e](r)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,n=!1;for(const i of this.iterateCallbacks("cacheWillUpdate"))if(t=await i({request:this.request,response:t,event:this.event})||void 0,n=!0,!t)break;return n||t&&t.status!==200&&(t=void 0),t}}class V{constructor(e={}){this.cacheName=x.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,n=typeof e.request=="string"?new Request(e.request):e.request,i="params"in e?e.params:void 0,a=new ve(this,{event:t,request:n,params:i}),r=this._getResponse(a,n,t),c=this._awaitComplete(r,a,n,t);return[r,c]}async _getResponse(e,t,n){await e.runCallbacks("handlerWillStart",{event:n,request:t});let i;try{if(i=await this._handle(t,e),!i||i.type==="error")throw new h("no-response",{url:t.url})}catch(a){if(a instanceof Error){for(const r of e.iterateCallbacks("handlerDidError"))if(i=await r({error:a,event:n,request:t}),i)break}if(!i)throw a}for(const a of e.iterateCallbacks("handlerWillRespond"))i=await a({event:n,request:t,response:i});return i}async _awaitComplete(e,t,n,i){let a,r;try{a=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:i,request:n,response:a}),await t.doneWaiting()}catch(c){c instanceof Error&&(r=c)}if(await t.runCallbacks("handlerDidComplete",{event:i,request:n,response:a,error:r}),t.destroy(),r)throw r}}class p extends V{constructor(e={}){e.cacheName=x.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(p.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const n=await t.cacheMatch(e);return n||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let n;const i=t.params||{};if(this._fallbackToNetwork){const a=i.integrity,r=e.integrity,c=!r||r===a;n=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?r||a:void 0})),a&&c&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,n.clone()))}else throw new h("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return n}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const n=await t.fetch(e);if(!await t.cachePut(e,n.clone()))throw new h("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[n,i]of this.plugins.entries())i!==p.copyRedirectedCacheableResponsesPlugin&&(i===p.defaultPrecacheCacheabilityPlugin&&(e=n),i.cacheWillUpdate&&t++);t===0?this.plugins.push(p.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}p.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:s}){return!s||s.status>=400?null:s}};p.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:s}){return s.redirected?await ne(s):s}};class Ee{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:n=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new p({cacheName:x.getPrecacheName(e),plugins:[...t,new ke({precacheController:this})],fallbackToNetwork:n}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const n of e){typeof n=="string"?t.push(n):n&&n.revision===void 0&&t.push(n.url);const{cacheKey:i,url:a}=Ce(n),r=typeof n!="string"&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==i)throw new h("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:i});if(typeof n!="string"&&n.integrity){if(this._cacheKeysToIntegrities.has(i)&&this._cacheKeysToIntegrities.get(i)!==n.integrity)throw new h("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(i,n.integrity)}if(this._urlsToCacheKeys.set(a,i),this._urlsToCacheModes.set(a,r),t.length>0){const c=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(c)}}}install(e){return A(e,async()=>{const t=new xe;this.strategy.plugins.push(t);for(const[a,r]of this._urlsToCacheKeys){const c=this._cacheKeysToIntegrities.get(r),o=this._urlsToCacheModes.get(a),l=new Request(a,{integrity:c,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:l,event:e}))}const{updatedURLs:n,notUpdatedURLs:i}=t;return{updatedURLs:n,notUpdatedURLs:i}})}activate(e){return A(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),n=await t.keys(),i=new Set(this._urlsToCacheKeys.values()),a=[];for(const r of n)i.has(r.url)||(await t.delete(r),a.push(r.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n)return(await self.caches.open(this.strategy.cacheName)).match(n)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new h("non-precached-url",{url:e});return n=>(n.request=new Request(e),n.params=Object.assign({cacheKey:t},n.params),this.strategy.handle(n))}}let L;const I=()=>(L||(L=new Ee),L);try{self["workbox:routing:7.0.0"]&&_()}catch{}const $="GET",C=s=>s&&typeof s=="object"?s:{handle:s};class b{constructor(e,t,n=$){this.handler=C(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=C(e)}}class De extends b{constructor(e,t,n){const i=({url:a})=>{const r=e.exec(a.href);if(r&&!(a.origin!==location.origin&&r.index!==0))return r.slice(1)};super(i,t,n)}}class Le{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,n=Promise.all(t.urlsToCache.map(i=>{typeof i=="string"&&(i=[i]);const a=new Request(...i);return this.handleRequest({request:a,event:e})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return;const i=n.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:i,url:n});let c=r&&r.handler;const o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;let l;try{l=c.handle({url:n,request:e,event:t,params:a})}catch(u){l=Promise.reject(u)}const g=r&&r.catchHandler;return l instanceof Promise&&(this._catchHandler||g)&&(l=l.catch(async u=>{if(g)try{return await g.handle({url:n,request:e,event:t,params:a})}catch(N){N instanceof Error&&(u=N)}if(this._catchHandler)return this._catchHandler.handle({url:n,request:e,event:t});throw u})),l}findMatchingRoute({url:e,sameOrigin:t,request:n,event:i}){const a=this._routes.get(n.method)||[];for(const r of a){let c;const o=r.match({url:e,sameOrigin:t,request:n,event:i});if(o)return c=o,(Array.isArray(c)&&c.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(c=void 0),{route:r,params:c}}return{}}setDefaultHandler(e,t=$){this._defaultHandlerMap.set(t,C(e))}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new h("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new h("unregister-route-route-not-registered")}}let y;const Ue=()=>(y||(y=new Le,y.addFetchListener(),y.addCacheListener()),y);function M(s,e,t){let n;if(typeof s=="string"){const a=new URL(s,location.href),r=({url:c})=>c.href===a.href;n=new b(r,e,t)}else if(s instanceof RegExp)n=new De(s,e,t);else if(typeof s=="function")n=new b(s,e,t);else if(s instanceof b)n=s;else throw new h("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return Ue().registerRoute(n),n}function Te(s,e=[]){for(const t of[...s.searchParams.keys()])e.some(n=>n.test(t))&&s.searchParams.delete(t);return s}function*Pe(s,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const a=new URL(s,location.href);a.hash="",yield a.href;const r=Te(a,e);if(yield r.href,t&&r.pathname.endsWith("/")){const c=new URL(r.href);c.pathname+=t,yield c.href}if(n){const c=new URL(r.href);c.pathname+=".html",yield c.href}if(i){const c=i({url:a});for(const o of c)yield o.href}}class Ie extends b{constructor(e,t){const n=({request:i})=>{const a=e.getURLsToCacheKeys();for(const r of Pe(i.url,t)){const c=a.get(r);if(c){const o=e.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:o}}}};super(n,e.strategy)}}function Me(s){const e=I(),t=new Ie(e,s);M(t)}function Ne(s){return I().createHandlerBoundToURL(s)}function Ke(s){I().precache(s)}function Ae(s,e){Ke(s),Me(e)}const je={cacheWillUpdate:async({response:s})=>s.status===200||s.status===0?s:null};class Oe extends V{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(je)}async _handle(e,t){const n=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(n);let i=await t.cacheMatch(e),a;if(!i)try{i=await n}catch(r){r instanceof Error&&(a=r)}if(!i)throw new h("no-response",{url:e.url,error:a});return i}}const Se="shlink-web-client",We="A React-based progressive web application for shlink",Be="/shlink-web-client/dependabot/npm_and_yarn/vite-76f0629fb9",qe="https://github.com/shlinkio/shlink-web-client",Fe="MIT",He="module",Ve={lint:"npm run lint:css && npm run lint:js","lint:css":"stylelint src/*.scss src/**/*.scss","lint:js":"eslint src test config/test","lint:fix":"npm run lint:css:fix && npm run lint:js:fix","lint:css:fix":"npm run lint:css -- --fix","lint:js:fix":"npm run lint:js -- --fix",types:"tsc",start:"vite serve --host=0.0.0.0",preview:"vite preview --host=0.0.0.0",build:"npm run types && vite build && node scripts/replace-version.mjs","build:dist":"npm run build && node scripts/create-dist-file.mjs",test:"vitest run --run","test:watch":"vitest --watch","test:ci":"npm run test -- --coverage","test:verbose":"npm run test -- --verbose"},$e={"@fortawesome/fontawesome-free":"^6.5.2","@fortawesome/fontawesome-svg-core":"^6.5.2","@fortawesome/free-brands-svg-icons":"^6.5.2","@fortawesome/free-regular-svg-icons":"^6.5.2","@fortawesome/free-solid-svg-icons":"^6.5.2","@fortawesome/react-fontawesome":"^0.2.2","@json2csv/plainjs":"^7.0.6","@reduxjs/toolkit":"^2.2.6","@shlinkio/data-manipulation":"^1.0.3","@shlinkio/shlink-frontend-kit":"^0.5.1","@shlinkio/shlink-js-sdk":"^1.1.0","@shlinkio/shlink-web-component":"^0.7.0",bootstrap:"5.2.3",bottlejs:"^2.0.1",clsx:"^2.1.1","compare-versions":"^6.1.0",csvtojson:"^2.0.10","date-fns":"^3.6.0",react:"^18.3.1","react-dom":"^18.3.1","react-external-link":"^2.3.1","react-redux":"^9.1.2","react-router-dom":"^6.24.1",reactstrap:"^9.2.2","redux-localstorage-simple":"^2.5.1",uuid:"^10.0.0","workbox-core":"^7.1.0","workbox-expiration":"^7.1.0","workbox-precaching":"^7.1.0","workbox-routing":"^7.1.0","workbox-strategies":"^7.1.0"},Ge={"@shlinkio/eslint-config-js-coding-standard":"~3.0.0","@shlinkio/stylelint-config-css-coding-standard":"~1.1.1","@stylistic/eslint-plugin":"^2.3.0","@testing-library/jest-dom":"^6.4.6","@testing-library/react":"^16.0.0","@testing-library/user-event":"^14.5.2","@total-typescript/shoehorn":"^0.1.2","@types/react":"^18.3.3","@types/react-dom":"^18.3.0","@types/uuid":"^10.0.0","@vitejs/plugin-react":"^4.3.1","@vitest/coverage-v8":"^2.0.2","adm-zip":"^0.5.14","axe-core":"^4.9.1",chalk:"^5.3.0",eslint:"^8.57.0","eslint-plugin-jsx-a11y":"^6.9.0","eslint-plugin-react":"^7.34.3","eslint-plugin-react-hooks":"^4.6.2","eslint-plugin-simple-import-sort":"^12.1.1",history:"^5.3.0",jsdom:"^24.1.0",sass:"^1.77.8",stylelint:"^15.11.0",typescript:"^5.5.3","typescript-eslint":"^7.16.0",vite:"^5.3.4","vite-plugin-pwa":"^0.20.0",vitest:"^2.0.2"},Qe=[">0.2%","not dead","not ie <= 11","not op_mini all"],ze={name:Se,description:We,private:!1,homepage:Be,repository:qe,license:Fe,type:He,scripts:Ve,dependencies:$e,devDependencies:Ge,browserslist:Qe};ie();Ae([{"revision":null,"url":"assets/index-CRpH7Bmq.css"},{"revision":null,"url":"assets/index-CvOALfpl.js"},{"revision":"93016dd2a354fbf9b428b692d573d2a1","url":"index.html"},{"revision":"3e8169a112865ef0d76bba4e2dfd3a89","url":"./icons/icon-16x16.png"},{"revision":"20f0b51945ae3c973420e31d6b4d43c1","url":"./icons/icon-24x24.png"},{"revision":"4c9695cfb4cea403c1b66bbb7b4f7420","url":"./icons/icon-32x32.png"},{"revision":"f74edb9cc54ac938c1589876f8da9f21","url":"./icons/icon-40x40.png"},{"revision":"52933970fac8498311687de13549b014","url":"./icons/icon-48x48.png"},{"revision":"40209a194f29b21882571c77bd2bd906","url":"./icons/icon-60x60.png"},{"revision":"c8ba5a8c1da76d74c7bb21827fcf975c","url":"./icons/icon-64x64.png"},{"revision":"ae3435baceb494f9c966e2c2c736ea35","url":"./icons/icon-72x72.png"},{"revision":"850aa5b026fd1452af6c1ddd9d71850f","url":"./icons/icon-76x76.png"},{"revision":"8c62535e6b7a498ece1f6c6ae62ede59","url":"./icons/icon-96x96.png"},{"revision":"2dff586aaefa4c8d17f4c0bcbdef8b53","url":"./icons/icon-114x114.png"},{"revision":"8e28257a68ef1c55bc68bfff80e1a310","url":"./icons/icon-120x120.png"},{"revision":"0059b6f0c97fa871a5c29643b2857585","url":"./icons/icon-128x128.png"},{"revision":"41478c2456281f61e54d714718743ecc","url":"./icons/icon-144x144.png"},{"revision":"625251910295f33a578ae6d8117711c9","url":"./icons/icon-150x150.png"},{"revision":"19b71508b1d05defe32cf16a7d453001","url":"./icons/icon-152x152.png"},{"revision":"9d029a32a54ba3084c67acd5d74f8ac4","url":"./icons/icon-160x160.png"},{"revision":"6ec104aeaf745f003ecdaef2edddce97","url":"./icons/icon-167x167.png"},{"revision":"871d67907434ed0ddf5d2a6c220e09af","url":"./icons/icon-180x180.png"},{"revision":"cee2529402074d73b2135e2ddee25f6b","url":"./icons/icon-192x192.png"},{"revision":"85055b452284c0193142936dee7d2cd1","url":"./icons/icon-196x196.png"},{"revision":"f471155dd70b99924422dd9dd87ea94d","url":"./icons/icon-228x228.png"},{"revision":"4d896c5c7025582605de31fb74f0316b","url":"./icons/icon-256x256.png"},{"revision":"d99b49e5bcad41968313c3e132e7c661","url":"./icons/icon-310x310.png"},{"revision":"f9597636bef677327c3abc0fd1a743c4","url":"./icons/icon-384x384.png"},{"revision":"de22c0eb9e08d3576df5cedb568ca56b","url":"./icons/icon-512x512.png"},{"revision":"583b223ad8e20f05aaa64923d7db2e46","url":"./icons/icon-1024x1024.png"},{"revision":"d057474e13b408a6f27ad94a0f27eb9b","url":"manifest.json"}]);const Je=new RegExp("/[^/?]+\\.[^/]+$");M(({request:s,url:e})=>!(s.mode!=="navigate"||e.pathname.startsWith("/_")||e.pathname.match(Je)),Ne(`${ze.homepage}/index.html`));M(({url:s})=>s.origin===self.location.origin&&s.pathname.endsWith(".png"),new Oe({cacheName:"images",plugins:[new be({maxEntries:50})]}));self.addEventListener("message",s=>{s.data&&s.data.type==="SKIP_WAITING"&&self.skipWaiting()});
