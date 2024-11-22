(()=>{"use strict";var e={208:(e,n,t)=>{t.d(n,{A:()=>i});var r=t(601),_=t.n(r),o=t(314),a=t.n(o)()(_());a.push([e.id,'/* copy + paste with Ctrl + Z afterwords, for correct formatting */\n\n/* standards ________________________________________________________________*/\n:root {\n  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  \n  --black010: rgba(0, 0, 0, 0.1);\n  --black050: rgba(0, 0, 0, 0.5);\n  --gray010:rgba(128, 128, 128, 0.1);\n  --gray050:rgba(128, 128, 128, 0.5);\n  --white010: rgba(255, 255, 255, 0.1);\n  --white050: rgba(255, 255, 255, 0.5);\n\n  --accent: lightsteelblue;\n\n  --shadow: 0 0 0.5rem var(--black050);\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  border: 0;\n  padding: 0;\n  \n  outline: none;\n  \n  font-size: 1rem;\n  line-height: 1.5;\n  \n  border: 1px solid red;\n}\n\n/* imports __________________________________________________________________*/\n\n/* @font-face {\n  font-family: Italiana;\n  src: url("./Italiana-Regular.ttf");\n} */\n\n/* elements _________________________________________________________________*/\n\nhr {\n  border: 1px solid var(--color-black050);\n  width: 75%;\n}\n\n/* image {\n  object-fit: cover;\n  object-position: center center;\n  width: 100%;\n  aspect-ratio: 1 / 1;\n} */\n\n/* .button {\n  border-radius: 10rem;\n  padding: 0.5rem 1rem;\n  \n  background-color: var(--accent);\n  color: var(--accent);\n\n  cursor: pointer;\n} */\n\n.material-symbols-outlined {\n  cursor: pointer;\n}\n\n/* segments _________________________________________________________________*/\n\nbody {\n  /* >header {\n    width: 100vw;\n  } */\n  >main {\n    width: clamp(300px, 100%, 900px);\n    \n    background-color: var(--black050);\n  }\n  /* >footer {\n    width: 100vw;\n  } */\n}\n\n.list {\n  display: grid;\n  grid-template: 1fr;\n}\n\n.itemText {\n  background-color: lightgreen;\n}\n\n',""]);const i=a},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,_,o){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(a[c]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);r&&a[l[0]]||(void 0!==o&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=o),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),_&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=_):l[4]="".concat(_)),n.push(l))}},n}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var o={},a=[],i=0;i<e.length;i++){var c=e[i],s=r.base?c[0]+r.base:c[0],l=o[s]||0,d="".concat(s," ").concat(l);o[s]=l+1;var u=t(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)n[u].references++,n[u].updater(p);else{var f=_(p,r);r.byIndex=i,n.splice(i,0,{identifier:d,updater:f,references:1})}a.push(d)}return a}function _(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,_){var o=r(e=e||[],_=_||{});return function(e){e=e||[];for(var a=0;a<o.length;a++){var i=t(o[a]);n[i].references--}for(var c=r(e,_),s=0;s<o.length;s++){var l=t(o[s]);0===n[l].references&&(n[l].updater(),n.splice(l,1))}o=c}}},659:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var _=void 0!==t.layer;_&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,_&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var o=t.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(r){var _=n[r];if(void 0!==_)return _.exports;var o=n[r]={id:r,exports:{}};return e[r](o,o.exports,t),o.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.nc=void 0;var r=t(72),_=t.n(r),o=t(825),a=t.n(o),i=t(659),c=t.n(i),s=t(56),l=t.n(s),d=t(540),u=t.n(d),p=t(113),f=t.n(p),m=t(208),v={};v.styleTagTransform=f(),v.setAttributes=l(),v.insert=c().bind(null,"head"),v.domAPI=a(),v.insertStyleElement=u(),_()(m.A,v),m.A&&m.A.locals&&m.A.locals;const g=function(e,n,t,r,_={}){return{parentSelector:e,htmlTag:n,className:t,textContent:r,attributes:_}},b=function({parentSelector:e,htmlTag:n,className:t,textContent:r="",attributes:_={}}){const o=document.createElement(n);o.classList.add(...t.split(".")),o.innerHTML=r;for(const[e,n]of Object.entries(_))o.setAttribute(e,n);document.querySelector(e).appendChild(o)};let h={};function y(){document.querySelector(".list").innerHTML="",console.log(h),Object.values(h).forEach((e=>b(e)))}[g("main","div","list"),g("main","div","material-symbols-outlined.addIcon","add")].forEach((e=>b(e))),function(){for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e),t=JSON.parse(localStorage.getItem(n));h[n]=t}}(),y(),document.querySelector(".addIcon").addEventListener("click",(()=>{const e=Date.now(),n=e+1,t={[`${e}`]:g(".list","div","item","",{"data-id":e}),[`${n}`]:g(".list","div","itemText","created item",{contenteditable:"true","data-id":n})};h={...h,...t},console.log(h),localStorage.clear(),Object.keys(h).forEach((e=>{localStorage.setItem(e,JSON.stringify(h[e]))})),y()})),document.querySelectorAll(".itemText").forEach((e=>{e.addEventListener("blur",(()=>{}))}))})();