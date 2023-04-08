(function(){"use strict";var e={2173:function(e,t,n){var o=n(9242),r=n(3396);function a(e,t){const n=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(n)}var i=n(89);const u={},c=(0,i.Z)(u,[["render",a]]);var s=c,l=(n(9773),n(8957)),d=n(1850),f=n(8600),h=n(2483),p=n(7139);const m=(0,r._)("h1",null,"SingCon 2023",-1),g=(0,r._)("h3",null,"请扫描票面二维码",-1),v={key:0,src:"qr.png",class:"qr"};function y(e,t,n,o,a,i){const u=(0,r.up)("v-card"),c=(0,r.up)("StreamBarcodeReader"),s=(0,r.up)("v-alert"),l=(0,r.up)("v-app");return(0,r.wg)(),(0,r.j4)(l,{class:"home-container"},{default:(0,r.w5)((()=>[(0,r.Wm)(u,{class:"mb-7",color:"primary",rounded:"0"},{default:(0,r.w5)((()=>[m])),_:1}),g,!a.scanner_loaded||a.loading?((0,r.wg)(),(0,r.iD)("img",v)):(0,r.kq)("",!0),a.loading?(0,r.kq)("",!0):((0,r.wg)(),(0,r.j4)(c,{key:1,class:"qr",onDecode:i.onDecode,onLoaded:i.onLoaded},null,8,["onDecode","onLoaded"])),(0,r.Wm)(s,{class:(0,p.C_)("alert "+(a.alert?"":"d-none")),color:"warning",density:"compact",text:a.alert_text},null,8,["class","text"])])),_:1})}n(7658);var b=n(4411),k=n(4161),w={components:{StreamBarcodeReader:b.w},data(){return{scanner_loaded:!1,alert:!1,alert_text:"扫描失败请重试",loading:!1}},computed:{},methods:{onDecode(e){console.log(`Decode text from QR code is ${e}`);const t=decodeURI(e).split("=")[0],n=decodeURI(e).split("=")[1];console.log(n),"https://v.6re.co?k"==t?(this.loading=!0,k.Z.post("https://api.singcon23.hkupootal.com/user/check.php",{user_key:n},{headers:{"Content-Type":"multipart/form-data"}}).then((e=>{console.log(e.data),this.loading=!1,"200"==e.data.code?(console.log("not binded or refused"),/MicroMessenger/i.test(window.navigator.userAgent)&&(console.log("wechat"),this.$router.push("/wechat",{query:{user_key:n}}))):"201"==e.data.code||"202"==e.data.code?this.$router.push("/vote",{query:{user_key:n}}):"401"==e.data.code?(console.log("haven't checked in"),this.alert_text="未入场，请先入场签到。",this.alert=!0,setTimeout((()=>{this.alert=!1}),1e4)):(console.log("invalid try again"),this.alert_text="扫描失败请重试",this.alert=!0,setTimeout((()=>{this.alert=!1}),2e3))})).catch((e=>{console.log(e),this.loading=!1,this.alert_text="扫描失败请重试",this.alert=!0,setTimeout((()=>{this.alert=!1}),2e3)}))):(console.log("invalid try again"),this.alert_text="非票面二维码",this.alert=!0,setTimeout((()=>{this.alert=!1}),2e3))},onLoaded(){this.scanner_loaded=!0}}};const _=(0,i.Z)(w,[["render",y]]);var C=_;const F=[{path:"/",name:"home",component:C},{path:"/home",name:"home",component:C},{path:"/vote",name:"vote",component:()=>n.e(443).then(n.bind(n,4702))}],T=(0,h.p7)({history:(0,h.PO)("/"),routes:F});var O=T;const j={dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF",primary:"#104e8d","primary-darken-1":"#3700B3",secondary:"#03DAC6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"}},x=(0,l.Rd)({components:d,directives:f,theme:{defaultTheme:"myCustomLightTheme",themes:{myCustomLightTheme:j}}});(0,o.ri)(s).use(O).use(x).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,a){if(!o){var i=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],a=e[l][2];for(var u=!0,c=0;c<o.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(u=!1,a<i&&(i=a));if(u){e.splice(l--,1);var s=r();void 0!==s&&(t=s)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[o,r,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.c5228bf6.js"}}(),function(){n.miniCssF=function(e){return"css/about.9bd3aad4.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="singcon-vote:";n.l=function(o,r,a,i){if(e[o])e[o].push(r);else{var u,c;if(void 0!==a)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var d=s[l];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+a){u=d;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+a),u.src=o),e[o]=[r];var f=function(t,n){u.onerror=u.onload=null,clearTimeout(h);var r=e[o];if(delete e[o],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(e){return e(n)})),t)return t(n)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=f.bind(null,u.onerror),u.onload=f.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,o,r){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=function(n){if(a.onerror=a.onload=null,"load"===n.type)o();else{var i=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=u,a.parentNode&&a.parentNode.removeChild(a),r(c)}};return a.onerror=a.onload=i,a.href=t,n?n.parentNode.insertBefore(a,n.nextSibling):document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],a=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(a===e||a===t))return r}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){r=i[o],a=r.getAttribute("data-href");if(a===e||a===t)return r}},o=function(o){return new Promise((function(r,a){var i=n.miniCssF(o),u=n.p+i;if(t(i,u))return r();e(o,u,null,r,a)}))},r={143:0};n.f.miniCss=function(e,t){var n={443:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var a=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=a);var i=n.p+n.u(t),u=new Error,c=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,r[1](u)}};n.l(i,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,a,i=o[0],u=o[1],c=o[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(c)var l=c(n)}for(t&&t(o);s<i.length;s++)a=i[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},o=self["webpackChunksingcon_vote"]=self["webpackChunksingcon_vote"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(2173)}));o=n.O(o)})();
//# sourceMappingURL=app.33ec9e29.js.map