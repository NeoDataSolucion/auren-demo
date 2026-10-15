document.addEventListener('DOMContentLoaded',()=>{const el=document.querySelector('.v24-compare');if(!el)return;const input=el.querySelector('input');let direction=1;let value=50;let active=false;let last=0;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;input.addEventListener('input',()=>{value=Number(input.value);el.style.setProperty('--split',value+'%');active=true;});if(reduced)return;function frame(t){if(!active&&t-last>45){value+=direction*.45;if(value>=90){direction=-1;}if(value<=10){direction=1;}el.style.setProperty('--split',value+'%');input.value=value;last=t;}requestAnimationFrame(frame)}requestAnimationFrame(frame);el.addEventListener('pointerleave',()=>{active=false;});});
// Carruseles accesibles de proyectos. No alteran otras secciones.
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('[data-carousel]').forEach(carousel=>{
  const slides=[...carousel.querySelectorAll('.v24-carousel-slide')];
  const dots=[...carousel.querySelectorAll('.v24-carousel-dot')];
  const count=carousel.querySelector('.v24-carousel-count');
  let current=0,touchStart=null;
  const show=index=>{current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.hidden=i!==current;slide.classList.toggle('is-active',i===current)});dots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===current);dot.setAttribute('aria-current',i===current?'true':'false')});if(count)count.textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0')};
  carousel.querySelector('[data-prev]')?.addEventListener('click',()=>show(current-1));
  carousel.querySelector('[data-next]')?.addEventListener('click',()=>show(current+1));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
  carousel.addEventListener('keydown',e=>{if(e.target.closest('button'))return;if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}});
  carousel.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0]?.screenX??null},{passive:true});
  carousel.addEventListener('touchend',e=>{if(touchStart===null)return;const delta=(e.changedTouches[0]?.screenX??touchStart)-touchStart;if(Math.abs(delta)>45)show(current+(delta<0?1:-1));touchStart=null},{passive:true});
  show(0);
 });
});
