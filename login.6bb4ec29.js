var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequire0562;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},e.parcelRequire0562=r);const n=r("2shzp").default.create({baseURL:"строка подключения к базе данных",params:{headers:{},body:new FormData(a)}}),a=document.querySelector("#admin-form-js");a.addEventListener("submit",(async e=>{e.preventDefault();try{const{data:e}=await n.post("",{params:{}}),t=e.token;localStorage.setItem("accessToken",t)}catch(e){console.log(e)}n.interceptors.request.use((e=>(localStorage.getItem("token")&&(e.headers.Authorization=`Bearer ${token}`,console.log("Get token from LS")),e)),(e=>Promise.reject(e)))}));
//# sourceMappingURL=login.6bb4ec29.js.map