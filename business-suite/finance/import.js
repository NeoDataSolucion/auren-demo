/* Inventory import: local processing, validation and explicit confirmation. */
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let pendingImport=null, importSequence=0;
let importedMode=localStorage.getItem('aurenSuiteFinanceImported')==='true';
const originalFinancials=financials, originalDashboard=renderDashboard, originalFinance=renderFinance;
financials=function(){
  if(!importedMode)return originalFinancials();
  const sales=salesMovements().reduce((sum,m)=>sum+m.amount,0);
  const cogs=salesMovements().reduce((sum,m)=>sum+(products.find(p=>p.sku===m.sku)?.cost||0)*m.qty,0);
  return {sales,cogs,gross:sales-cogs,expenseTotal:0,profit:sales-cogs,margin:sales?(sales-cogs)/sales*100:0};
};
renderDashboard=function(){originalDashboard();if(importedMode){
  $('#salesCaption').textContent=`${salesMovements().length} operaciones registradas`;
  $('#weeklyChart').innerHTML='<p>Inventario propio cargado. Consulta los resultados de tus ventas en Finanzas.</p>';
  $('.welcome-card .badge').textContent='Inventario cargado · datos locales';
}};
renderFinance=function(){originalFinance();if(importedMode){
  $('#expenseTotal').textContent=money(0);$('#expenseDonut').style.background='#e2e7f1';
  $('#expenseLegend').textContent='Sin gastos registrados. Esta etapa permite importar inventario y registrar movimientos.';
  $('.statement-note').textContent='Resultado antes de gastos e impuestos. Calculado con los costos del catálogo.';
}};
function refreshAll(){populateFilters();renderDashboard();renderInventory();renderMovements();renderFinance();}
function validateInventory(rows){
  const normalize=v=>String(v??'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const required=['sku','producto','categoria','existencia','minimo','costo','precio'];
  if(!rows.length)throw Error('El archivo está vacío.');
  const headers=rows[0].map(normalize);
  for(const h of required)if(headers.filter(v=>v===h).length!==1)throw Error(`Debe existir una sola columna: ${h}.`);
  const records=[],seen=new Set();
  for(let i=1;i<rows.length;i++){
    const row=rows[i];if(row.every(v=>v===null||v===undefined||String(v).trim()===''))continue;
    const value=h=>row[headers.indexOf(h)];
    const errors=[],p={sku:String(value('sku')??'').trim().toUpperCase(),name:String(value('producto')??'').trim(),category:String(value('categoria')??'').trim()};
    for(const [key,label] of [['sku','SKU'],['name','Producto'],['category','Categoría']]){
      if(!p[key])errors.push(`${label} vacío`);
      if(p[key].length>150)errors.push(`${label}: máximo 150 caracteres`);
    }
    if(seen.has(p.sku))errors.push('SKU duplicado en el archivo');seen.add(p.sku);
    for(const [key,h] of [['stock','existencia'],['min','minimo'],['cost','costo'],['price','precio']]){
      const raw=value(h),text=String(raw??'').trim();
      p[key]=Number(text);
      if(!text||!Number.isFinite(p[key])||p[key]<0||p[key]>100000000)errors.push(`${h}: número entre 0 y 100000000`);
      else if(['stock','min'].includes(key)&&!Number.isInteger(p[key]))errors.push(`${h}: usa unidades enteras`);
    }
    records.push({row:i+1,product:p,errors});
  }
  if(!records.length)throw Error('No hay productos para cargar.');
  if(records.length>5000)throw Error('El máximo es 5,000 productos.');
  return records;
}
function updateImportButton(){$('#confirmImport').disabled=!pendingImport||!$('#importConsent').checked;}
$('#importConsent').addEventListener('change',updateImportButton);
$('#importFile').addEventListener('change',async()=>{
  const sequence=++importSequence;pendingImport=null;$('#importConsent').checked=false;updateImportButton();$('#importPreview').replaceChildren();
  const file=$('#importFile').files[0];if(!file)return;
  $('#importSummary').textContent='Leyendo archivo…';
  try{
    if(!/\.(xlsx|csv)$/i.test(file.name))throw Error('Usa un archivo .xlsx o .csv.');
    if(file.size>5*1024*1024)throw Error('El archivo supera 5 MB.');
    const buffer=await file.arrayBuffer();if(sequence!==importSequence)return;
    const book=XLSX.read(buffer,{type:'array',raw:true,cellFormula:true,sheetRows:5002});
    const sheet=book.Sheets[book.SheetNames[0]];
    if(Object.values(sheet).some(cell=>cell&&cell.f))throw Error('El archivo contiene fórmulas. Copia y pega como valores antes de cargar.');
    const records=validateInventory(XLSX.utils.sheet_to_json(sheet,{header:1,defval:'',raw:true}));
    const invalid=records.filter(r=>r.errors.length).length;
    $('#importSummary').textContent=`${records.length} productos · ${invalid} filas con errores. ${invalid?'Corrige el archivo y vuelve a seleccionarlo.':'Listo para confirmar.'} Vista previa: primeras 100 filas.`;
    $('#importPreview').innerHTML=records.slice(0,100).map(r=>`<tr><td>${r.row}</td><td>${escapeHTML(r.product.sku)}</td><td>${escapeHTML(r.product.name)}</td><td>${escapeHTML(r.product.stock)}</td><td>${escapeHTML(r.errors.join('; ')||'Correcto')}</td></tr>`).join('');
    if(!invalid)pendingImport=records.map(r=>r.product);
    updateImportButton();
  }catch(error){if(sequence===importSequence)$('#importSummary').textContent=error.message;}
});
$('#downloadTemplate').addEventListener('click',()=>{
  const book=XLSX.utils.book_new();
  const sheet=XLSX.utils.aoa_to_sheet([['SKU','Producto','Categoría','Existencia','Mínimo','Costo','Precio'],['PROD-001','Producto de ejemplo','General',20,5,50,85]]);
  sheet['!cols']=[{wch:20},{wch:32},{wch:20},...Array(4).fill({wch:15})];
  XLSX.utils.book_append_sheet(book,sheet,'Inventario');XLSX.writeFile(book,'Plantilla_Inventario.xlsx');
});
$('#downloadBackup').addEventListener('click',()=>{
  const book=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book,XLSX.utils.aoa_to_sheet([['SKU','Producto','Categoría','Existencia','Mínimo','Costo','Precio'],...products.map(p=>[p.sku,p.name,p.category,p.stock,p.min,p.cost,p.price])]),'Inventario');
  XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet(movements),'Movimientos');
  XLSX.writeFile(book,'Respaldo_AUREN_Finance.xlsx');
});
$('#confirmImport').addEventListener('click',()=>{
  if(!pendingImport||!$('#importConsent').checked)return;
  const oldProducts=products,oldMovements=movements,oldMode=importedMode;
  try{
    localStorage.setItem('aurenSuiteFinanceBeforeImport',JSON.stringify({products,movements,importedMode}));
    products=structuredClone(pendingImport);movements=[];importedMode=true;save();localStorage.setItem('aurenSuiteFinanceImported','true');
  }catch{
    products=oldProducts;movements=oldMovements;importedMode=oldMode;
    try{save();localStorage.setItem('aurenSuiteFinanceImported',String(oldMode));}catch{}
    $('#importSummary').textContent='No fue posible guardar. Revisa el espacio disponible del navegador.';return;
  }
  pendingImport=null;$('#importConsent').checked=false;updateImportButton();refreshAll();
  $('#importSummary').textContent='Inventario cargado. Movimientos y resultados anteriores reiniciados.';
  toast('Inventario cargado correctamente.');switchView('inventory');
});
$('#resetDemo').addEventListener('click',()=>{importedMode=false;localStorage.removeItem('aurenSuiteFinanceImported');$('.welcome-card .badge').textContent='Información actualizada';refreshAll();});
document.querySelector('[data-view="import"]').addEventListener('click',()=>{$('#pageTitle').textContent='Cargar datos';});
refreshAll();
