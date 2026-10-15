// Keep saved data from Neo Control when opened on the same browser origin.
const aurenIcons={dashboard:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',inventory:'m3 7 9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7M12 11v10',movements:'M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4',finance:'M4 20V10m6 10V4m6 16v-7m5 7H2',import:'M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6'};
document.querySelectorAll('[data-view] .nav-icon').forEach(el=>{const path=aurenIcons[el.parentElement.dataset.view];el.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;});
