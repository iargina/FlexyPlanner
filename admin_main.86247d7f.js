!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequire0562;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequire0562=a);var o,c=a("bpxeT"),u=a("2TvXO"),s=(L=a("dIxxU")).default.create({baseURL:"https://flexyplanner.onrender.com/promo",headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2I4NWJjNDdmMDBlYTAwMzRjNGQ1ZGUiLCJzaWQiOiI2M2JkNDNmYWJlMmFmMDAwMzQzZDgxZTMiLCJpYXQiOjE2NzMzNDgwOTAsImV4cCI6MTY3MzM1MTY5MH0.YHt0Cgfh3YqRPeiGGLgXMUk0d950NWvC_owMoYzm9Q4"}}),i=(o=e(c)(e(u).mark((function t(){var n;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.get("/");case 2:return n=e.sent.data,e.abrupt("return",n);case 4:case"end":return e.stop()}}),t)}))),function(){return o.apply(this,arguments)}),d=(function(){var t=e(c)(e(u).mark((function t(n){var r;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.get("/".concat(n));case 2:return r=e.sent.data,e.abrupt("return",r);case 4:case"end":return e.stop()}}),t)})))}(),function(){var t=e(c)(e(u).mark((function t(n){var r;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.post("",n);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),l=function(){var t=e(c)(e(u).mark((function t(n){var r;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.patch("",n);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=e(c)(e(u).mark((function t(n){var r;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.delete("",n);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=a("iU1Pc"),m=document.querySelector(".promocode__form"),v=document.querySelector(".input-amount-js"),g=document.querySelector(".date__wrapper"),h=document.querySelector(".common-promocode"),y=document.querySelector(".personal-promocode"),b=document.querySelector("#dateStart"),x=document.querySelector("#dateTo"),w={};function T(){var e=new Date,t=e.getDate(),n=e.getMonth()+1;return n<10&&(n="0"+n),t<10&&(t="0"+t),e.getFullYear()+"-"+n+"-"+t}b.value=T(),x.value=T(),i().then((function(e){return n=(t=e).common,r=t.personal,a=n.map((function(e,t){var n=e.discount,r=e.promo,a=e.period;return'<li class="list__item" data-name=\''.concat(r,"'>\n            <p>Знижка ").concat(n,"%</p>\n            <p>Термін дії: ").concat(a.from.slice(0,10)," - ").concat(a.to.slice(0,10),'</p>\n            <div class="common__wrapper">\n            <p>').concat(t+1,'. <span class="promo__name">').concat(r,'</span></p>\n            <button data-action="delete" class="btn btn-danger" type="button">Видалити</button>\n            </div>\n            </li>')})).join(""),o=r.reduce((function(e,t){return e[t.discount]=e[t.discount]||[],e[t.discount].push(t),e}),{}),c=Object.entries(o).map((function(e){return"\n        <p>Знижка ".concat(e[0],'%</p>\n        <ul class="list__item">\n          ').concat(e[1].map((function(e,t){return'\n                    <li class="personal__wrapper" data-name=\''.concat(e.promo,"'>\n                    <span>").concat(t+1,'. \n                      <span class="promo__name">').concat(e.promo,'</span>\n                    </span>\n                    <div class="btn-wrapper">\n                    <button data-action="active" class="btn btn-success" type="button">Активувати</button>\n                    <button data-action="delete" class="btn btn-danger" type="button">Видалити</button></div>\n                    </li>')})).join(""),"</ul>")})).join(""),h.innerHTML=a,void(y.innerHTML=c);var t,n,r,a,o,c})),m.addEventListener("change",(function(e){e.preventDefault(),"Personal"===e.currentTarget.elements.promocode.value?(v.disabled&&(v.disabled=!1),g.classList.add("visually-hidden")):(g.classList.contains("visually-hidden")&&g.classList.remove("visually-hidden"),v.disabled=!0)})),m.addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget,n=t.elements,r=n.promocode,a=n.amound,o=n.discount,c=n.dateStart,u=n.dateTo;"Personal"===r.value?(w.type=r.value,w.amound=Number(a.value),w.discount=Number(o.value)):(w.type=r.value,w.discount=Number(o.value),w.amound=Number(a.value),w.from=new Date(c.value).toISOString(),w.to=new Date(u.value).toISOString());var s=JSON.stringify(w);d(s).then((function(e){return console.log(e)})).catch((function(e){return console.log(e.message)})),v.disabled&&(v.disabled=!1),g.classList.contains("visually-hidden")&&g.classList.remove("visually-hidden"),t.reset(),b.value=T(),x.value=T()})),h.addEventListener("click",(function(e){if("BUTTON"===e.target.nodeName){var t=e.target.closest("li").dataset.name;if(confirm("Дійсно видалити цей промокод: ".concat(t," ?"))){var n=JSON.stringify({promocode:t});p(n).then((function(e){return console.log(e)})).catch((function(e){return console.log(e.message)}))}else f.Notify.info("do not delete ".concat(t))}})),y.addEventListener("click",(function(e){if("BUTTON"===e.target.nodeName){var t=e.target.dataset.action,n=e.target.closest("li").dataset.name,r=JSON.stringify({promocode:n});if("delete"===t)confirm("Дійсно видалити цей промокод: ".concat(n," ?"))?p(r).then((function(e){return console.log(e)})).catch((function(e){return console.log(e.message)})):f.Notify.info("do not delete ".concat(n));else confirm("Дійсно активувати цей промокод: ".concat(n," ?"))?(l(r).then((function(e){return console.log(e)})).catch((function(e){return console.log(e.message)})),e.target.disabled=!0,e.target.innerText="Активовано"):f.Notify.info("do not active ".concat(n))}}));c=a("bpxeT"),u=a("2TvXO");var L=a("dIxxU"),N=document.querySelector(".order-admin"),k=document.querySelector('[data-status="to-order"]'),M=document.querySelector('[data-status="pre-order"]'),S=document.querySelector(".form-to-order"),O=document.querySelector(".form-pre-order"),_=function(e){"pre-order"===e.type?document.querySelector(".preorder-price-info").innerHTML="Встановлена ціна: ".concat(e.data.price,", ціна зі знижкою:  ").concat(e.data.preOrderPrice):document.querySelector(".price-info").innerHTML="Встановлена ціна: ".concat(e.data.price)},q=function(){var t=e(c)(e(u).mark((function t(n){var r;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.classList.remove("btn-danger"),n.classList.add("btn-success"),n.innerText="Активовано",n.disabled=!0,e.next=6,L.default.get("https://flexyplanner.onrender.com/markup");case 6:r=e.sent.data,_(r);case 8:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),D=function(){var t=e(c)(e(u).mark((function t(n,r){return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.default.patch("https://flexyplanner.onrender.com/markup");case 2:q(n),r.classList.remove("btn-success"),r.classList.add("btn-danger"),r.innerText="Активувати",r.disabled=!1;case 7:case"end":return e.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),I=function(){var t=e(c)(e(u).mark((function t(n){var r,a;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),r={type:"to-order",data:{price:n.target.elements.price.value}},e.prev=2,e.next=5,L.default.put("https://flexyplanner.onrender.com/markup",r);case 5:a=e.sent.data,_(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0);case 12:case"end":return e.stop()}}),t,null,[[2,9]])})));return function(e){return t.apply(this,arguments)}}(),J=function(){var t=e(c)(e(u).mark((function t(n){var r,a;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),r={type:"pre-order",data:{price:n.target.elements.price.value,preOrderPrice:n.target.elements.preOrderPrice.value}},e.prev=2,e.next=5,L.default.put("https://flexyplanner.onrender.com/markup",r);case 5:a=e.sent.data,_(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0);case 12:case"end":return e.stop()}}),t,null,[[2,9]])})));return function(e){return t.apply(this,arguments)}}();function U(){return(U=e(c)(e(u).mark((function t(){return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L.default.get("https://flexyplanner.onrender.com/markup");case 3:"pre-order"===e.sent.data.type?q(M):q(k),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("something went wrong");case 10:case"end":return e.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}N.addEventListener("click",(function(e){e.target.classList.contains("btn-order-js")&&("pre-order"==e.target.dataset.status?D(e.target,k):D(e.target,M))})),S.addEventListener("submit",I),O.addEventListener("submit",J),function(){U.apply(this,arguments)}()}();
//# sourceMappingURL=admin_main.86247d7f.js.map
