var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},n=e.parcelRequire0562;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},e.parcelRequire0562=n);var o=n("2shzp");const r=document.querySelector("#logoutButton"),s=document.querySelector(".spinner-border"),c=o.default.create({baseURL:"https://flexyplanner.onrender.com/auth/logout",headers:{Authorization:`Bearer ${window.sessionStorage.getItem("accessToken")}`}});r.addEventListener("click",(async()=>{s.style.display="inline-block";try{await c.post("",{}),window.location.href="/login.html",window.sessionStorage.removeItem("accessToken")}catch(e){401===e.response.status&&(window.location.href="/login.html",window.sessionStorage.removeItem("accessToken"))}finally{s.style.display="none"}}));const i=(o=n("2shzp")).default.create({baseURL:"https://flexyplanner.onrender.com",headers:{Authorization:`Bearer ${window.sessionStorage.getItem("accessToken")}`}}),d=async()=>{const{data:e}=await i.get("/promo/");return e},l=async e=>(await i.post("/promo",e)).data,u=async e=>(await i.patch("/promo",e)).data,p=async e=>(await i.delete("/promo",e)).data;var m=n("eWCmQ");const y=document.querySelector(".promocode__form"),f=document.querySelector(".input-amount-js"),g=document.querySelector(".date__wrapper"),v=document.querySelector(".common-promocode"),b=document.querySelector(".personal-promocode"),h=document.querySelector("#dateStart"),w=document.querySelector("#dateTo"),S={};function L(){const e=new Date;let t=e.getDate(),a=e.getMonth()+1;a<10&&(a="0"+a),t<10&&(t="0"+t);return e.getFullYear()+"-"+a+"-"+t}function $({common:e,personal:t}){const a=e.map((({discount:e,promo:t,period:a},n)=>`<li class="list__item" data-name='${t}'>\n            <p>Знижка ${e}%</p>\n            <p>Термін дії: ${a.from.slice(0,10)} - ${a.to.slice(0,10)}</p>\n            <div class="common__wrapper">\n            <p>${n+1}. <span class="promo__name">${t}</span></p>\n            <button data-action="delete" class="btn btn-danger" type="button">Видалити</button>\n            </div>\n            </li>`)).join(""),n=t.reduce(((e,t)=>(e[t.discount]=e[t.discount]||[],e[t.discount].push(t),e)),{}),o=Object.entries(n).map((e=>`\n        <p>Знижка ${e[0]}%</p>\n        <ul class="list__item">\n          ${e[1].map(((e,t)=>`\n                    <li class="personal__wrapper" data-name='${e.promo}'>\n                    <span>${t+1}. \n                      <span class="promo__name">${e.promo}</span>\n                    </span>\n                    <div class="btn-wrapper">\n                    ${e.isUsing?'<button data-action="active" disabled class="btn btn-success" type="button">Активовано</button>':'<button data-action="active" class="btn btn-success" type="button">Активувати</button>'}\n                    <button data-action="delete" class="btn btn-danger" type="button">Видалити</button></div>\n                    </li>`)).join("")}</ul>`)).join("");v.innerHTML=a,b.innerHTML=o}function N(e){401===e.response.request.status&&(alert("Час сесії минув. Будь ласка, пройдіть повторну авторизацію!"),window.location.href="/login.html")}h.value=L(),w.value=L(),d().then((e=>$(e))).catch((e=>console.log(e.message))),setInterval((()=>{d().then((e=>$(e))).catch((e=>console.log(e.message)))}),36e5),y.addEventListener("change",(function(e){e.preventDefault(),"Personal"===e.currentTarget.elements.promocode.value?(f.disabled&&(f.disabled=!1),g.classList.add("visually-hidden")):(g.classList.contains("visually-hidden")&&g.classList.remove("visually-hidden"),f.disabled=!0)})),y.addEventListener("submit",(async function(e){try{e.preventDefault();const t=e.currentTarget,{elements:{promocode:a,amount:n,discount:o,dateStart:r,dateTo:s}}=t;"Personal"===a.value?(S.type=a.value,S.amount=Number(n.value),S.discount=Number(o.value)):(S.type=a.value,S.discount=Number(o.value),S.amount=Number(n.value),S.from=new Date(r.value).toISOString(),S.to=new Date(s.value).toISOString());if((await l(S)).length){$(await d()),m.Notify.success("Список промокодів успішно оновлено!")}f.disabled&&(f.disabled=!1),g.classList.contains("visually-hidden")&&g.classList.remove("visually-hidden"),t.reset(),h.value=L(),w.value=L()}catch(e){N(e)}})),v.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const t=e.target.closest("li"),a=t.dataset.name;confirm(`Дійсно видалити цей промокод: ${a} ?`)?p({data:{promocode:a}}).then((e=>{1==e.ok&&(m.Notify.failure(`${a} успішно видалено!`),t.remove())})).catch((e=>N(e))):m.Notify.info(`Видалення ${a} відмінено`)})),b.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const t=e.target.dataset.action,a=e.target.closest("li"),n=a.dataset.name;if("delete"===t){confirm(`Дійсно видалити цей промокод: ${n} ?`)?p({data:{promocode:n}}).then((e=>{1==e.ok&&(m.Notify.failure(`${n} успішно видалено!`),a.remove())})).catch((e=>N(e))):m.Notify.info(`Видалення ${n} відмінено.`)}else{confirm(`Дійсно активувати цей промокод: ${n} ?`)?u({promocode:n}).then((t=>{"switchPromoStatus"===t&&(e.target.disabled=!0,e.target.innerText="Активовано",m.Notify.success(`${n} успішно активовано.`))})).catch((e=>N(e))):m.Notify.info(`Активацію ${n} відмінено.`)}}));const T=(o=n("2shzp")).default.create({baseURL:"https://flexyplanner.onrender.com/markup"}),q=async()=>{const{data:e}=await T.get("");return e},_=async()=>{const{data:e}=await T.patch("");return e},k=async e=>{const{data:t}=await T.put("",e);return t},x=document.querySelector(".order-admin"),O=document.querySelector('[data-status="to-order"]'),D=document.querySelector('[data-status="pre-order"]'),E=document.querySelector(".form-to-order"),U=document.querySelector(".form-pre-order"),I=e=>{"pre-order"===e.type?document.querySelector(".preorder-price-info").innerHTML=`Встановлена ціна: ${e.data.price}, ціна зі знижкою:  ${e.data.preOrderPrice}`:document.querySelector(".price-info").innerHTML=`Встановлена ціна: ${e.data.price}`},j=async e=>{e.classList.remove("btn-danger"),e.classList.add("btn-success"),e.innerText="Активовано",e.disabled=!0;try{const e=await q();I(e)}catch(e){Notify.failure(e.message)}},M=async(e,t)=>{try{await _(),j(e),t.classList.remove("btn-success"),t.classList.add("btn-danger"),t.innerText="Активувати",t.disabled=!1}catch(e){Notify.failure(e.message)}};x.addEventListener("click",(e=>{e.target.classList.contains("btn-order-js")&&("pre-order"==e.target.dataset.status?M(e.target,O):M(e.target,D))})),E.addEventListener("submit",(async e=>{e.preventDefault();const t={type:"to-order",data:{price:e.target.elements.price.value}};try{const e=await k(t);I(e)}catch(e){Notify.failure(e.message)}})),U.addEventListener("submit",(async e=>{e.preventDefault();const t={type:"pre-order",data:{price:e.target.elements.price.value,preOrderPrice:e.target.elements.preOrderPrice.value}};try{const e=await k(t);I(e)}catch(e){Notify.failure(e.message)}})),async function(){try{"pre-order"===(await q()).type?j(D):j(O)}catch(e){Notify.failure(e.message)}}();
//# sourceMappingURL=admin_main.4308e685.js.map
