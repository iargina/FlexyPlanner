var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequire0562;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},e.parcelRequire0562=a);var o=a("2shzp");const s=document.querySelector("#logoutButton"),r=document.querySelector(".spinner-border"),i=o.default.create({baseURL:"https://flexyplanner.onrender.com/auth/logout",headers:{Authorization:`Bearer ${window.sessionStorage.getItem("accessToken")}`}});s.addEventListener("click",(async()=>{r.style.display="inline-block";try{await i.post("",{}),window.location.href="/login.html",window.sessionStorage.removeItem("accessToken")}catch(e){401===e.response.status&&(window.location.href="/login.html",window.sessionStorage.removeItem("accessToken"))}finally{r.style.display="none"}}));const c=(o=a("2shzp")).default.create({baseURL:"https://flexyplanner.onrender.com",headers:{Authorization:`Bearer ${window.sessionStorage.getItem("accessToken")}`}}),l=async()=>{const{data:e}=await c.get("/promo/");return e},d=async e=>(await c.post("/promo",e)).data,u=async e=>(await c.patch("/promo",e)).data,p=async e=>(await c.delete("/promo",e)).data;var m=a("eWCmQ");const y=document.querySelector(".promocode__form"),f=document.querySelector(".input-amount-js"),g=document.querySelector(".date__wrapper"),b=document.querySelector(".common-promocode"),v=document.querySelector(".personal-promocode"),h=document.querySelector("#dateStart"),w=document.querySelector("#dateTo"),L=document.querySelector(".promo-spinner-js"),S=document.querySelector(".btn-show-common-js"),$=document.querySelector(".btn-show-personal-js"),k={};function N(){const e=new Date;let t=e.getDate(),n=e.getMonth()+1;n<10&&(n="0"+n),t<10&&(t="0"+t);return e.getFullYear()+"-"+n+"-"+t}function T({common:e,personal:t}){const n=e.map((({discount:e,promo:t,period:n},a)=>`<li class="list__item" data-name='${t}'>\n            <p>Знижка ${e}%</p>\n            <p>Термін дії: ${n.from.slice(0,10).split("-").reverse().join("-")} - ${n.to.slice(0,10).split("-").reverse().join("-")}</p>\n            <div class="common__wrapper">\n            <p>${a+1}. <span class="promo__name">${t}</span></p>\n            <button data-action="delete" class="btn btn-danger" type="button">Видалити</button>\n            </div>\n            </li>`)).join(""),a=t.reduce(((e,t)=>(e[t.discount]=e[t.discount]||[],e[t.discount].push(t),e)),{}),o=Object.entries(a).map((e=>`\n        <p>Знижка ${e[0]}%</p>\n        <ul class="list__item">\n          ${e[1].map(((e,t)=>`\n                    <li class="personal__wrapper" data-name='${e.promo}'>\n                    <span>${t+1}. \n                      <span class="promo__name">${e.promo}</span>\n                    </span>\n                    <div class="btn-wrapper">\n                    ${e.isUsing?'<button data-action="active" disabled class="btn btn-success" type="button">Активовано</button>':'<button data-action="active" class="btn btn-success" type="button">Активувати</button>'}\n                    <button data-action="delete" class="btn btn-danger" type="button">Видалити</button></div>\n                    </li>`)).join("")}</ul>`)).join("");b.innerHTML=n,v.innerHTML=o}function q(e){401===e.response.request.status&&(alert("Час сесії минув. Будь ласка, пройдіть повторну авторизацію!"),window.location.href="/login.html")}h.value=N(),w.value=N(),setInterval((()=>{l().then((e=>T(e))).catch((e=>console.log(e.message)))}),36e5),L.style.display="inline-block",l().then((e=>T(e))).catch((e=>console.log(e.message))).finally((()=>L.style.display="none")),y.addEventListener("change",(function(e){e.preventDefault(),"Personal"===e.currentTarget.elements.promocode.value?(f.disabled&&(f.disabled=!1),g.classList.add("visually-hidden")):(g.classList.contains("visually-hidden")&&g.classList.remove("visually-hidden"),f.disabled=!0)})),y.addEventListener("submit",(async function(e){L.style.display="inline-block";try{e.preventDefault();const t=e.currentTarget,{elements:{promocode:n,amount:a,discount:o,dateStart:s,dateTo:r}}=t;"Personal"===n.value?(k.type=n.value,k.amount=Number(a.value),k.discount=Number(o.value)):(k.type=n.value,k.discount=Number(o.value),k.amount=Number(a.value),k.from=new Date(s.value).toISOString(),k.to=new Date(r.value).toISOString());if((await d(k)).length){T(await l()),m.Notify.success("Список промокодів успішно оновлено!")}f.disabled&&(f.disabled=!1),g.classList.contains("visually-hidden")&&g.classList.remove("visually-hidden"),t.reset(),h.value=N(),w.value=N()}catch(e){q(e)}finally{L.style.display="none"}})),b.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const t=e.target.closest("li"),n=t.dataset.name;confirm(`Дійсно видалити цей промокод: ${n} ?`)?(L.style.display="inline-block",p({data:{promocode:n}}).then((e=>{1==e.ok&&(m.Notify.failure(`${n} успішно видалено!`),t.remove())})).catch((e=>q(e))).finally((()=>L.style.display="none"))):m.Notify.info(`Видалення ${n} відмінено`)})),v.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const t=e.target.dataset.action,n=e.target.closest("li"),a=n.dataset.name;if("delete"===t){confirm(`Дійсно видалити цей промокод: ${a} ?`)?(L.style.display="inline-block",p({data:{promocode:a}}).then((e=>{1==e.ok&&(m.Notify.failure(`${a} успішно видалено!`),n.remove())})).catch((e=>q(e))).finally((()=>L.style.display="none"))):m.Notify.info(`Видалення ${a} відмінено.`)}else{confirm(`Дійсно активувати цей промокод: ${a} ?`)?(L.style.display="inline-block",u({promocode:a}).then((t=>{"switchPromoStatus"===t&&(e.target.disabled=!0,e.target.innerText="Активовано",m.Notify.success(`${a} успішно активовано.`))})).catch((e=>q(e))).finally((()=>L.style.display="none"))):m.Notify.info(`Активацію ${a} відмінено.`)}})),S.addEventListener("click",(function(){b.classList.toggle("visually-hidden"),S.textContent="Сховати",b.classList.contains("visually-hidden")&&(S.textContent="Показати")})),$.addEventListener("click",(function(){v.classList.toggle("visually-hidden"),$.textContent="Сховати",v.classList.contains("visually-hidden")&&($.textContent="Показати")}));const _=(o=a("2shzp")).default.create({baseURL:"https://flexyplanner.onrender.com"}),x=async()=>{const{data:e}=await _.get("/markup");return e},j=async()=>{const{data:e}=await _.patch("/markup");return e},E=async e=>{const{data:t}=await _.put("/markup",e);return t},O=async()=>{const{data:e}=await _.get("/crm/offers");return e.data},D=document.querySelector(".order-admin"),U=document.querySelector('[data-status="to-order"]'),I=document.querySelector('[data-status="pre-order"]'),C=document.querySelector(".form-pre-order"),P=async e=>{e.classList.remove("btn-danger"),e.classList.add("btn-success"),e.innerText="Активовано",e.disabled=!0},z=async(e,t)=>{try{await j(),P(e),t.classList.remove("btn-success"),t.classList.add("btn-danger"),t.innerText="Активувати",t.disabled=!1}catch(e){Notify.failure(e.message)}},B=async()=>{try{return await O()}catch(e){Notify.failure(e.message)}};D.addEventListener("click",(e=>{e.target.classList.contains("btn-order-js")&&("pre-order"==e.target.dataset.status?z(e.target,U):z(e.target,I))})),C.addEventListener("submit",(async e=>{e.preventDefault();const t={type:"pre-order",data:{price:e.target.elements.price.value}};try{const e=await B();console.log(e);const n=e.find((e=>e.sku.startsWith("PO")));t.data.preOrderPrice=Number(n.price),console.log(t);const a=await E(t);showSettedPrice(a)}catch(e){Notify.failure(e.message)}})),async function(){try{const e=await x();console.log(e),"pre-order"===e.type?P(I):P(U)}catch(e){Notify.failure(e.message)}}();
//# sourceMappingURL=admin_main.fc3e63c6.js.map
