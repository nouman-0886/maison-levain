import { products, WHATSAPP_NUMBER } from "./data.js";

const header = document.querySelector("#site-header");
const footer = document.querySelector("#site-footer");
const page = document.body.dataset.page || "home";
const navItems = [["Home","index.html","home"],["Menu","menu.html","menu"],["Our story","about.html","about"],["Contact","contact.html","contact"]];
if (header) {
  header.innerHTML = `<header class="site-header"><div class="wrap header-inner"><a class="brand" href="index.html" aria-label="Maison Levain home"><span class="brand-mark">M</span><span><span class="brand-name">Maison Levain</span><span class="brand-sub">ARTISAN BAKERY</span></span></a><button class="burger" id="burger" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav">☰</button><nav class="nav" id="primary-nav" aria-label="Primary navigation">${navItems.map(([label,url,key])=>`<a href="${url}" ${page===key?'aria-current="page"':''}>${label}</a>`).join("")}<a class="header-cta" href="contact.html">Say hello ↗</a></nav></div></header>`;
}
if (footer) {
 footer.innerHTML = `<footer class="site-footer"><div class="wrap"><div class="footer-top"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark">M</span><span><span class="brand-name">Maison Levain</span><span class="brand-sub">ARTISAN BAKERY</span></span></a><p>Good things take time. Come for the bread, stay for the little moments.</p></div><div class="footer-col"><p class="eyebrow">EXPLORE</p><a href="menu.html">The menu</a><a href="about.html">Our story</a><a href="contact.html">Visit & contact</a></div><div class="footer-col"><p class="eyebrow">FIND US</p><p>Model Town A<br>Bahawalpur, Pakistan</p><a href="tel:+923000000000">+92 300 0000000</a><a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">WhatsApp ↗</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} MAISON LEVAIN — FICTIONAL PORTFOLIO CONCEPT</span><span>MADE WITH PATIENCE IN BAHawalpur</span></div></div></footer>`;
}
const burger = document.querySelector("#burger");
const nav = document.querySelector("#primary-nav");
burger?.addEventListener("click",()=>{const open=nav.classList.toggle("open");burger.setAttribute("aria-expanded",String(open));burger.setAttribute("aria-label",open?"Close navigation":"Open navigation");burger.textContent=open?"×":"☰";document.body.classList.toggle("menu-open",open);});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");document.body.classList.remove("menu-open");burger?.setAttribute("aria-expanded","false");if(burger){burger.textContent="☰";burger.setAttribute("aria-label","Open navigation");}}));

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduced) {
 const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target);}}),{threshold:.12});
 revealEls.forEach(el=>io.observe(el));
} else revealEls.forEach(el=>el.classList.add("is-visible"));

const toast = document.createElement("div");toast.className="toast";toast.setAttribute("role","status");toast.setAttribute("aria-live","polite");document.body.append(toast);
let toastTimer;function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);}

function setupHeroShader(){
 const canvas=document.querySelector("#hero-glow");if(!canvas||reduced)return;
 const ctx=canvas.getContext("2d");if(!ctx)return;
 let w=0,h=0,raf=0,t=0;
 const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,1.5);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};
 const draw=()=>{t+=.003;ctx.clearRect(0,0,w,h);const g=ctx.createRadialGradient(w*.73+Math.sin(t)*35,h*.48+Math.cos(t)*25,10,w*.73,h*.48,w*.48);g.addColorStop(0,"rgba(210,164,116,.22)");g.addColorStop(.55,"rgba(230,205,170,.13)");g.addColorStop(1,"rgba(243,235,221,0)");ctx.fillStyle=g;ctx.fillRect(0,0,w,h);raf=requestAnimationFrame(draw);};
 resize();draw();window.addEventListener("resize",resize,{passive:true});document.addEventListener("visibilitychange",()=>{if(document.hidden)cancelAnimationFrame(raf);else draw();});
}
setupHeroShader();

function setupMenu(){
 const grid=document.querySelector("#product-grid");if(!grid)return;
 const search=document.querySelector("#menu-search"),sort=document.querySelector("#menu-sort"),tabs=[...document.querySelectorAll("[data-filter]")];
 let category="all";let cart=loadCart();
 function loadCart(){try{return JSON.parse(localStorage.getItem("maison-levain-cart")||"{}");}catch{return {};}}
 function saveCart(){localStorage.setItem("maison-levain-cart",JSON.stringify(cart));}
 const money=n=>`PKR ${n.toLocaleString("en-PK")}`;
 function renderProducts(){
  let list=products.filter(p=>(category==="all"||p.category===category)&&(`${p.name} ${p.description}`.toLowerCase().includes(search.value.toLowerCase())));
  if(sort.value==="low")list.sort((a,b)=>a.price-b.price);if(sort.value==="high")list.sort((a,b)=>b.price-a.price);if(sort.value==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
  grid.innerHTML=list.length?list.map(p=>`<article class="product-card"><img src="${p.image}" width="700" height="560" loading="lazy" alt="${p.name}"><div class="product-card-body"><div class="product-top"><h3>${p.name}</h3><span class="product-price">${money(p.price)}</span></div><p>${p.description}</p><div class="product-foot"><span class="product-tag">${p.tag}</span><button class="add-btn" type="button" data-add="${p.id}">Add +</button></div></div></article>`).join(""):`<div class="product-empty">Nothing on the counter matches that search. Try another word.</div>`;
 }
 function renderCart(){
  const lines=document.querySelector("#cart-lines");const entries=Object.entries(cart).filter(([,qty])=>qty>0);let total=0,count=0;
  if(lines)lines.innerHTML=entries.length?entries.map(([id,qty])=>{const p=products.find(x=>x.id===id);if(!p)return "";total+=p.price*qty;count+=qty;return `<div class="cart-line"><div><strong>${p.name}</strong><small>${money(p.price)} each</small></div><div class="qty-controls"><button type="button" data-qty="${id}" data-delta="-1" aria-label="Remove one ${p.name}">−</button><span>${qty}</span><button type="button" data-qty="${id}" data-delta="1" aria-label="Add one ${p.name}">+</button></div></div>`;}).join(""):`<p class="empty-cart">Your list is waiting for something delicious.</p>`;
  document.querySelector("#cart-count").textContent=count;document.querySelector("#cart-total").textContent=money(total);
 }
 grid.addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(!btn)return;cart[btn.dataset.add]=(cart[btn.dataset.add]||0)+1;saveCart();renderCart();showToast("Added to your little list.");});
 document.querySelector("#cart-lines")?.addEventListener("click",e=>{const btn=e.target.closest("[data-qty]");if(!btn)return;const id=btn.dataset.qty;cart[id]=(cart[id]||0)+Number(btn.dataset.delta);if(cart[id]<=0)delete cart[id];saveCart();renderCart();});
 tabs.forEach(tab=>tab.addEventListener("click",()=>{category=tab.dataset.filter;tabs.forEach(t=>t.classList.toggle("active",t===tab));renderProducts();}));
 search.addEventListener("input",renderProducts);sort.addEventListener("change",renderProducts);
 document.querySelector("#whatsapp-order")?.addEventListener("click",()=>{const entries=Object.entries(cart).filter(([,q])=>q>0);if(!entries.length){showToast("Add an item before sending your order.");return;}let total=0;const lines=entries.map(([id,q])=>{const p=products.find(x=>x.id===id);total+=p.price*q;return `• ${p.name} × ${q} — ${money(p.price*q)}`;});const msg=`Hello Maison Levain! I'd like to enquire about this order:\n\n${lines.join("\n")}\n\nEstimated total: ${money(total)}\n\nPlease confirm availability and collection details. (This is a demo website.)`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");});
 renderProducts();renderCart();
}
setupMenu();

function setupContact(){
 const form=document.querySelector("#contact-form");if(!form)return;
 const validate=(field)=>{const el=form.elements[field];const val=el.value.trim();let msg="";
  if(field==="name"&&val.length<2)msg="Please enter at least 2 characters.";
  if(field==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))msg="Please enter a valid email address.";
  if(field==="message"&&val.length<10)msg="Please add a little more detail (at least 10 characters).";
  el.setAttribute("aria-invalid",String(!!msg));form.querySelector(`[data-error="${field}"]`).textContent=msg;return !msg;
 };
 ["name","email","message"].forEach(field=>{form.elements[field].addEventListener("blur",()=>validate(field));form.elements[field].addEventListener("input",()=>{if(form.elements[field].getAttribute("aria-invalid")==="true")validate(field);});});
 form.addEventListener("submit",e=>{e.preventDefault();const valid=["name","email","message"].map(validate).every(Boolean);if(!valid){form.querySelector('[aria-invalid="true"]')?.focus();return;}
  const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),topic=form.elements.topic.value,message=form.elements.message.value.trim();
  const body=`Hello Maison Levain,\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;
  document.querySelector("#form-status").textContent="Your message is ready in WhatsApp. Press send there to complete the enquiry.";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`,"_blank","noopener");form.reset();["name","email","message"].forEach(f=>form.elements[f].setAttribute("aria-invalid","false"));
 });
}
setupContact();

function setupOpenBadge(){
 const badge=document.querySelector("#open-badge");if(!badge)return;
 // Demo hours: Tuesday–Sunday, 08:00–20:00, Asia/Karachi (UTC+5).
 const now=new Date();const utc=now.getTime()+now.getTimezoneOffset()*60000;const pkt=new Date(utc+5*3600000);const day=pkt.getDay(),mins=pkt.getHours()*60+pkt.getMinutes();const open=day!==1&&mins>=480&&mins<1200;
 badge.textContent=open?"Open now":"Closed now";badge.classList.toggle("closed",!open);
}
setupOpenBadge();
