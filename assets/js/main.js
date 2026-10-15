const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');menuButton?.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen));menuButton.setAttribute('aria-label',isOpen?'Cerrar menú':'Abrir menú')});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));const range=document.querySelector('#compareRange');const before=document.querySelector('#compareBefore');const divider=document.querySelector('#compareDivider');range?.addEventListener('input',()=>{const n=Number(range.value);before.style.clipPath=`inset(0 ${100-n}% 0 0)`;divider.style.left=`${n}%`});document.querySelector('#year').textContent=new Date().getFullYear();

// WhatsApp de AUREN (México, sin + ni espacios).
const AUREN_WHATSAPP = '523348070433';
const contactForm = document.querySelector('#contactForm');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const message = [
    '¡Hola, AUREN! Me gustaría hablar sobre un proyecto.',
    '',
    `*Nombre:* ${data.get('name')}`,
    `*Correo:* ${data.get('email')}`,
    `*Servicio:* ${data.get('service')}`,
    '',
    '*Mi proyecto:*',
    String(data.get('message'))
  ].join('\n');
  const url = `https://wa.me/${AUREN_WHATSAPP}?text=${encodeURIComponent(message)}`;
  const status = document.querySelector('#formStatus');
  status.textContent = 'Se abrirá WhatsApp con tu mensaje. Solo falta presionar Enviar.';
  // Navegación directa para evitar bloqueos de ventanas emergentes.
  window.location.href = url;
});
