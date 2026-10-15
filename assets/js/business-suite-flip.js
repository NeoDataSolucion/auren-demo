/* AUREN Business Suite: toque en móvil, hover en escritorio, teclado accesible. */
(()=>{
 const hover=window.matchMedia('(hover: hover) and (pointer: fine)');
 document.querySelectorAll('[data-flip-card]').forEach(card=>{
  function toggle(){if(hover.matches)return;const next=!card.classList.contains('is-flipped');card.classList.toggle('is-flipped',next);card.setAttribute('aria-pressed',String(next));}
  card.addEventListener('click',e=>{if(e.target.closest('a'))return;toggle();});
  card.addEventListener('keydown',e=>{if(e.target.closest('a'))return;if(e.key==='Enter'||e.key===' '){e.preventDefault();const next=!card.classList.contains('is-flipped');card.classList.toggle('is-flipped',next);card.setAttribute('aria-pressed',String(next));}});
  card.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.stopPropagation()));
 });
})();
