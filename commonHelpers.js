import{S as f,i as n,a as g}from"./assets/vendor-da186403.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const p=document.querySelector("#search-form"),u=document.querySelector(".gallery"),h=document.querySelector(".loader"),a=document.querySelector("#load-more");let c={page:1,per_page:15,q:""},b=new f(".gallery a");const l=e=>{h.style.display=e?"block":"none",a.style.display=e?"none":"block"},y=async()=>{const e="42183789-4564ae77348bbdba9cab87cc0",t="https://pixabay.com/api/";try{return(await g.get(`${t}?key=${e}&image_type=photo&orientation=horizontal&safesearch=true`,{params:c})).data}catch(s){throw s}},m=e=>{if(e.hits.length===0)n.info({message:"Sorry, there are no images matching your search query. Please try again!"}),l(!1);else{const t=e.hits.map(s=>`
            <a href="${s.largeImageURL}" class="gallery-item">
                <img src="${s.webformatURL}" alt="${s.tags}" loading="lazy">
            </a>
        `).join("");u.insertAdjacentHTML("beforeend",t),b.refresh(),l(!1)}};p.addEventListener("submit",async e=>{e.preventDefault(),c.q=document.querySelector("#query").value,c.page=1,u.innerHTML="",l(!0);try{const t=await y();m(t)}catch(t){n.error({title:"Error",message:`An error occurred: ${t.message}`})}a.style.display="block"});a.addEventListener("click",async()=>{c.page+=1,l(!0);try{const e=await y();m(e),(e.hits.length<15||u.querySelectorAll(".gallery-item").length>=e.totalHits)&&(a.style.display="none",n.info({message:"We're sorry, but you've reached the end of search results."}))}catch(e){n.error({title:"Error",message:`An error occurred: ${e.message}`})}});a.style.display="none";
//# sourceMappingURL=commonHelpers.js.map
