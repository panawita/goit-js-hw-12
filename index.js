import{i as l,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const p=document.querySelector("form"),a=document.querySelector(".loader"),c=document.querySelector(".gallery");p.addEventListener("submit",o=>{o.preventDefault();const r=document.querySelector(".search-input").value.trim();r?u(r):l.show({message:"Please enter what you are searching for!",backgroundColor:"#EF4040",titleColor:"#fff",messageColor:"#fff",progressBarColor:"#B51B1B",position:"topRight",onOpening:function(){document.querySelector(".iziToast").style.fontFamily="Montserrat, sans-serif"}})});function u(o){c.innerHTML="",a.style.display="block";const r=new URLSearchParams({key:"28729256-3b1de8368afcf00c1bd7e0c48",q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"});fetch(`https://pixabay.com/api/?${r}`).then(s=>s.json()).then(s=>{a.style.display="none",s.hits.length===0?l.show({message:"Sorry, there are no images matching your search phrase. Please try again",backgroundColor:"#EF4040",titleColor:"#fff",messageColor:"#fff",progressBarColor:"#B51B1B",position:"topRight",onOpening:function(){document.querySelector(".iziToast").style.fontFamily="Montserrat, sans-serif"}}):d(s.hits)}).catch(s=>{l.show({title:"Error.",message:"Sorry, something went wrong. Please try again.",backgroundColor:"#EF4040",titleColor:"#fff",messageColor:"#fff",progressBarColor:"#B51B1B",position:"topRight",onOpening:function(){document.querySelector(".iziToast").style.fontFamily="Montserrat, sans-serif"}}),console.error(s)}).finally(()=>{a.style.display="none"})}function d(o){const r=o.map(n=>m(n)).join("");c.innerHTML=r,new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function m(o){return`
      <div class="gallery-item">
        <div class="gallery-image"><a href="${o.largeImageURL}">
          <img src="${o.webformatURL}" alt="${o.tags}" />
        </a></div>
        <div class="image-info">
          <span><p>Likes:</p> ${o.likes}</span>
          <span><p>Views:</p> ${o.views}</span>
          <span><p>Comments:</p> ${o.comments}</span>
          <span><p>Downloads:</p> ${o.downloads}</span>
        </div>
      </div>
    `}
//# sourceMappingURL=index.js.map
