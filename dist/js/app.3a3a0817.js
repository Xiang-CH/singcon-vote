(function(){"use strict";var e={563:function(e,t,n){var o=n(9242),r=n(3396);const a=(0,r._)("h1",null,"2023 Singing Contest",-1);function i(e,t){const n=(0,r.up)("v-app-bar"),o=(0,r.up)("router-view"),i=(0,r.up)("v-sheet"),s=(0,r.up)("v-app");return(0,r.wg)(),(0,r.j4)(s,null,{default:(0,r.w5)((()=>[(0,r.Wm)(n,{color:"primary",style:{height:"70px"},flat:""},{default:(0,r.w5)((()=>[a])),_:1}),(0,r.Wm)(i,{style:{"margin-top":"70px"}},{default:(0,r.w5)((()=>[(0,r.Wm)(o)])),_:1})])),_:1})}var s=n(89);const c={},u=(0,s.Z)(c,[["render",i]]);var l=u,d=(n(9773),n(8957)),h=n(1850),f=n(8600),p=n(2483),m=n(7139);const g={key:0,style:{margin:"4vh"}},v={key:1,style:{padding:"0 10vw 0 10vw"},src:"qr.png",class:"qr"},y={key:3,class:"success"},k=(0,r._)("div",{class:"wechatPrompt"},[(0,r._)("h3",null,"前往微信扫描打开"),(0,r._)("h3",null,"可获取噗噗纪念头像奖励")],-1),b=(0,r._)("img",{src:"loading.gif",style:{"margin-bottom":"30vh"}},null,-1);function w(e,t,n,o,a,i){const s=(0,r.up)("StreamBarcodeReader"),c=(0,r.up)("v-btn"),u=(0,r.up)("v-overlay"),l=(0,r.up)("v-alert"),d=(0,r.up)("StaffBtn");return(0,r.wg)(),(0,r.iD)(r.HY,null,[a.hidescanner?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("h3",g,"请扫描票面二维码")),!a.scanner_loaded||a.loading?((0,r.wg)(),(0,r.iD)("img",v)):(0,r.kq)("",!0),a.loading||a.hidescanner?(0,r.kq)("",!0):((0,r.wg)(),(0,r.j4)(s,{key:2,class:"qr",onDecode:i.onDecode,onLoaded:i.onLoaded},null,8,["onDecode","onLoaded"])),a.hidescanner&&a.loaded?((0,r.wg)(),(0,r.iD)("div",y,[k,(0,r.Wm)(c,{color:"grey w-75 mx-auto my-3",onClick:t[0]||(t[0]=e=>i.verifyRefused())},{default:(0,r.w5)((()=>[(0,r.Uk)("直接打开")])),_:1}),(0,r.Wm)(u,{modelValue:a.overlay,"onUpdate:modelValue":t[1]||(t[1]=e=>a.overlay=e),contained:"",class:"align-center justify-center"},{default:(0,r.w5)((()=>[b])),_:1},8,["modelValue"])])):(0,r.kq)("",!0),(0,r.Wm)(l,{class:(0,m.C_)("alert "+(a.alert?"":"d-none")),color:"warning",density:"compact",text:a.alert_text},null,8,["class","text"]),(0,r.Wm)(d)],64)}n(7658);var _=n(4411),F=n(4161),x=n(9156),C=n(9028),T=n.n(C),A={components:{StreamBarcodeReader:_.w,StaffBtn:x.Z},data(){return{scanner_loaded:!1,alert:!1,alert_text:"扫描失败请重试",loading:!1,isWechat:!1,hidescanner:!1,key:"",loaded:!0,overlay:!1}},computed:{},methods:{verifyInWechat(){T().setStorageSync("user_key",this.key),window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91a4ad470fb0b432&redirect_uri=https%3A%2F%2Fone.hkupootal.com%3Furl%3Dhttps%253A%252F%252Fsingcon23.hkupootal.com%252Fwechat&response_type=code&scope=snsapi_base#wechat_redirect"},verifyRefused(){this.overlay=!0,F.Z.post("https://api.singcon23.hkupootal.com/user/refuse.php",{user_key:this.key},{headers:{"Content-Type":"multipart/form-data"}}).then((e=>{this.overlay=!1,console.log(e.data),"200"==e.data.code?this.$router.push({name:"vote",params:{user_key:this.key}}):"400"==e.data.code?(this.loaded=!1,this.alert_text="无效票，请尝试新扫描",this.alert=!0):"401"==e.data.code?(this.loaded=!1,this.alert_text="为入场，请先入场签到",this.alert=!0):(this.loaded=!1,this.alert_text="验证失败请重试",this.alert=!0,setTimeout((()=>{this.loaded=!0}),2e3))})).catch((e=>{this.overlay=!1,console.log(e),this.loaded=!1,this.alert_text="验证失败请重试",this.alert=!0,setTimeout((()=>{this.loaded=!0}),2e3)}))},onDecode(e){console.log(`Decode text from QR code is ${e}`);const t=decodeURI(e).split("=")[0],n=decodeURI(e).split("=")[1];this.key=n,console.log(n),"https://v.6re.co?k"==t?(this.loading=!0,F.Z.post("https://api.singcon23.hkupootal.com/user/check.php",{user_key:n},{headers:{"Content-Type":"multipart/form-data"}}).then((e=>{console.log(e.data),"200"==e.data.code?(console.log("not binded or refused"),/MicroMessenger/i.test(window.navigator.userAgent)?(console.log("wechat"),this.verifyInWechat()):(this.loading=!1,this.hidescanner=!0)):"201"==e.data.code||"202"==e.data.code?this.$router.push({name:"vote",params:{user_key:n}}):"401"==e.data.code?(console.log("haven't checked in"),this.alert_text="未入场，请先入场签到。",this.alert=!0,setTimeout((()=>{this.loading=!1,this.alert=!1}),1e4)):(console.log("invalid try again"),this.alert_text="扫描失败请重试",this.alert=!0,setTimeout((()=>{this.loading=!1,this.alert=!1}),2e3))})).catch((e=>{console.log(e),this.alert_text="扫描失败请重试",this.alert=!0,setTimeout((()=>{this.alert=!1,this.loading=!1}),2e3)}))):(console.log("invalid ticket"),this.alert_text="非票面二维码",this.alert=!0,setTimeout((()=>{this.alert=!1}),2e3))},onLoaded(){this.scanner_loaded=!0}}};const O=(0,s.Z)(A,[["render",w]]);var S=O;const j=[{path:"/",name:"",component:S},{path:"/home",name:"home",component:S},{path:"/vote/:user_key",name:"vote",component:()=>n.e(94).then(n.bind(n,9094))},{path:"/ticket",name:"ticket",query:{k:""},component:()=>n.e(368).then(n.bind(n,4368))},{path:"/admin",name:"admin",component:()=>n.e(383).then(n.bind(n,1383))},{path:"/wechat",name:"wechat",query:{code:""},component:()=>n.e(648).then(n.bind(n,7648))}],E=(0,p.p7)({history:(0,p.PO)("/REPO_NAME/"),routes:j});var q=E;const D={dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF",primary:"#104e8d","primary-darken-1":"#3700B3",secondary:"#03DAC6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"}},B=(0,d.Rd)({components:h,directives:f,theme:{defaultTheme:"myCustomLightTheme",themes:{myCustomLightTheme:D}}});(0,o.ri)(l).use(q).use(B).mount("#app")},9156:function(e,t,n){n.d(t,{Z:function(){return c}});var o=n(3396);function r(e,t,n,r,a,i){const s=(0,o.up)("v-btn");return(0,o.wg)(),(0,o.j4)(s,{variant:"tonal",class:"button",onClick:t[0]||(t[0]=e=>i.toAdmin())},{default:(0,o.w5)((()=>[(0,o.Uk)(" 后台管理 ")])),_:1})}n(7658);var a={methods:{toAdmin(){this.$router.push("/admin")}}},i=n(89);const s=(0,i.Z)(a,[["render",r]]);var c=s}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,a){if(!o){var i=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],a=e[l][2];for(var s=!0,c=0;c<o.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(s=!1,a<i&&(i=a));if(s){e.splice(l--,1);var u=r();void 0!==u&&(t=u)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[o,r,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{94:"49ac2e44",368:"7df43c81",383:"00d4194f",648:"2deb144e"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{94:"b3f9225b",368:"76acd270"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="cssaud-singcon:";n.l=function(o,r,a,i){if(e[o])e[o].push(r);else{var s,c;if(void 0!==a)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=o),e[o]=[r];var h=function(t,n){s.onerror=s.onload=null,clearTimeout(f);var r=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),r&&r.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/REPO_NAME/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,o,r){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=function(n){if(a.onerror=a.onload=null,"load"===n.type)o();else{var i=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=s,a.parentNode&&a.parentNode.removeChild(a),r(c)}};return a.onerror=a.onload=i,a.href=t,n?n.parentNode.insertBefore(a,n.nextSibling):document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],a=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(a===e||a===t))return r}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){r=i[o],a=r.getAttribute("data-href");if(a===e||a===t)return r}},o=function(o){return new Promise((function(r,a){var i=n.miniCssF(o),s=n.p+i;if(t(i,s))return r();e(o,s,null,r,a)}))},r={143:0};n.f.miniCss=function(e,t){var n={94:1,368:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var a=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=a);var i=n.p+n.u(t),s=new Error,c=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,r[1](s)}};n.l(i,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,a,i=o[0],s=o[1],c=o[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(c)var l=c(n)}for(t&&t(o);u<i.length;u++)a=i[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},o=self["webpackChunkcssaud_singcon"]=self["webpackChunkcssaud_singcon"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(563)}));o=n.O(o)})();
//# sourceMappingURL=app.3a3a0817.js.map