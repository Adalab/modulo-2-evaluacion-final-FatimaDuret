const f=document.querySelector(".js_btn-search"),m=document.querySelector(".js_btn-reset"),a=document.querySelector(".js_fav-list"),u=document.querySelector(".js_search"),v=document.querySelector(".js_result-list");let c=[],r=[];const D=s=>{let t="";return t=`<li class="js_drinks ${r.findIndex(n=>n.id===s.idDrink)===-1?"":"fav"}" id="${s.idDrink}">
              <h4>${s.strDrink}</h4>
              <img src="${s.strDrinkThumb}" alt="${s.strDrink}" class="js_drink-img">
            </li>`,t},h=s=>{const t=s.currentTarget.id,i=c.find(n=>n.idDrink===t),e=r.findIndex(n=>n.idDrink===t);if(e===-1){r.push(i),s.currentTarget.classList.add("fav");const n=document.createElement("li");n.classList.add("js_drinks","fav"),n.id=t,n.innerHTML=`<h4>${i.strDrink}</h4>
                                 <img src="${i.strDrinkThumb}" alt="${i.strDrink}" class="js_drink-img">`,a.appendChild(n)}else r.splice(e,1),s.currentTarget.classList.remove("fav"),document.getElementById(t).remove();l(c),localStorage.setItem("favDrinks",JSON.stringify(r))},l=s=>{let t="";for(let e=0;e<s.length;e++){const d=r.find(k=>k.idDrink===s[e].idDrink)!==void 0?"fav":"";t+=`<li class="js_drinks ${d}" id="${s[e].idDrink}">
                            <h4>${s[e].strDrink}</h4>
                            <img src="${s[e].strDrinkThumb}" alt="${s[e].strDrink}" class="js_drink-img">
                        </li>`}v.innerHTML=t,document.querySelectorAll(".js_drinks").forEach(e=>{e.addEventListener("click",n=>{h(n),e.classList.contains("fav")||e.classList.add("fav")})})},L=s=>{let t="";for(const i of s)t+=D(i);a.innerHTML=t},o=s=>{fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${s}`).then(t=>t.json()).then(t=>{c=t.drinks,l(c),localStorage.setItem("drinks",JSON.stringify(c))})},g=s=>{s.preventDefault();const t=u.value.toLowerCase().trim();let i=[];if(r.length>0&&(i=r.filter(e=>e.strDrink.toLowerCase().includes(t))),c.length>0){const e=c.filter(n=>n.strDrink.toLowerCase().includes(t));i=i.concat(e)}if(i.length===0){o(t);return}l(i)},S=()=>{const s=localStorage.getItem("favDrinks");s!==null&&(r=JSON.parse(s),L(r));const t=localStorage.getItem("drinks");t!==null?(c=JSON.parse(t),l(c)):o(),m.addEventListener("click",()=>{a.innerHTML="",r=[],localStorage.removeItem("favDrinks")})};S();f.addEventListener("click",g);
//# sourceMappingURL=main.js.map
