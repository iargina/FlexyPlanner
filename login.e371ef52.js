var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequire0562;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var a={id:e,exports:{}};return n[e]=a,o.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequire0562=o);var a=o("2shzp"),i=o("eWCmQ");const l=a.default.create({baseURL:"https://api.flexyplanner.com/auth/login",headers:{"Content-Type":"application/json"}}),r=document.querySelector(".spinner-border"),s=document.querySelector("#admin-form-js");s.addEventListener("submit",(async e=>{e.preventDefault(),r.style.display="inline-block";try{const e=await l.post("",{email:s.elements.login.value,password:s.elements.password.value}),{accessToken:n}=e.data;window.sessionStorage.setItem("accessToken",n),window.location.href="/admin_main.html"}catch(e){i.Notify.failure("Неправильний e-mail або пароль"),s.reset()}finally{r.style.display="none"}}));
//# sourceMappingURL=login.e371ef52.js.map
