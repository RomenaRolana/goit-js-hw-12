import{a as y}from"./assets/vendor-9129e3ca.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const m="https://pixabay.com/api/",h="42183789-4564ae77348bbdba9cab87cc0";async function g(e,o=1,a=15){const s={key:h,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:a};try{return(await y.get(m,{params:s})).data}catch(t){throw t}}function v(e){return`
      <a class="gallery-link" href="${e.largeImageURL}">
          <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}">
      </a>
      <div class="img-content">
          <div><h3>Likes</h3><p>${e.likes}</p></div>
          <div><h3>Views</h3><p>${e.views}</p></div>
          <div><h3>Comments</h3><p>${e.comments}</p></div>
          <div><h3>Downloads</h3><p>${e.downloads}</p></div>
      </div>
    `}function L(e){e.innerHTML=""}function b(e){e.style.display="block"}function l(e){e.style.display="none"}const w=document.querySelector("#search-form"),u=document.querySelector(".gallery"),n=document.querySelector("#load-more"),d=document.querySelector(".loader");let i=1,f="";w.addEventListener("submit",async e=>{e.preventDefault(),f=e.target.query.value.trim(),i=1,L(u),await p()});n.addEventListener("click",async()=>{i+=1,await p()});async function p(){try{d.style.display="block",l(n);const e=await g(f,i),o=e.hits.map(v).join("");u.insertAdjacentHTML("beforeend",o),e.hits.length>0?b(n):l(n)}catch(e){console.error("Error fetching images:",e)}finally{d.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map
