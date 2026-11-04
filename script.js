const IMAGENS = {};

const CARDAPIO = [
 {id:"petiscos",nome:"Petiscos",icone:"🍢",itens:[
  [1,"Pão de Alho","","",8],[2,"Torresmo","","",7],[3,"Caldinho Aperitivo","","",18],
  [4,"Espetinho Simples","Carne / Frango","",25],[5,"Barriguinha de Porco","","",25],
  [6,"Queijo Coalho","Com geleia de pimenta ou melaço","",35],[7,"Calabresa com Cebola","","",35],
  [8,"Batata Frita","","",30],[9,"Espetinho Completo","Com Batata Frita ou Pão de Alho ou Sugestão do Chef","",35],
  [10,"Salgadinhos","Risole de camarão / coxinha / kibe / bolinha de queijo / empada de queijo","14 unidades",30],
  [11,"Pastel de Queijo / Carne","","6 unidades",35],[12,"Pastel de Camarão","","6 unidades",40],
  [13,"Croquete de Carne","","10 unidades",38],[14,"Rabinho de Camarão","","10 unidades",40],
  [15,"Pipoca de Porco","Ao molho de Barbecue","",30],[16,"Bolinho de Bacalhau","","10 unidades",40],
  [17,"Filé Mignon Aperitivo","Com cebola","",65]]},
 {id:"saladas",nome:"Saladas & Sanduíches",icone:"🥪",itens:[
  [18,"Salada Carne Assada","Alface crespo e roxo e carne assada desfiada","",38],
  [19,"Salada do Chef","Verdes variados, tomate cereja, gorgonzola e nozes ao molho balsâmico","",25],
  [20,"Xburger Artesanal","","",28],[21,"Baiano","","",30],[22,"Pão com Linguiça","","",22],
  [200,"XNaneburger","Completo, ovo, bacon","",38],[201,"Sanduíche de Filé Mignon","","",35]]},
 {id:"refeicao",nome:"Refeição",icone:"🍽️",itens:[
  [23,"Filé de Frango","Ou salada ou spaghetti ou penne","",42],
  [24,"Filé de Frango à Parmegiana","Grelhado, gratinado com queijo Mussarela e molho de tomate com spaghetti","",45],
  [25,"Filé Mignon com Arroz e Fritas","Ou salada ou spaghetti ou penne","",68],
  [26,"Strognoff de Filé Mignon","Arroz e batata palha","",65],[27,"Strognoff de Frango","Arroz e batata palha","",42]]},
 {id:"kids",nome:"Kids",icone:"🧒",itens:[
  [28,"Filé Mignon Kids","Arroz e batata frita ou salada ou spaghetti ou penne","",58],
  [29,"Spaghetti à Parisiense","Frango, presunto e petit pois ao molho branco","",28],
  [30,"Spaghetti à Bolonhesa","Carne moída e molho rosê parmesão","",28],
  [31,"Filé de Frango Kids","Com fritas ou salada ou spaghetti ou penne","",30]]},
 {id:"massas",nome:"Massas",icone:"🍝",itens:[
  [32,"Allá Vodka","Calabresa em tiras, flambada com vodka ao molho rosê","",30],
  [33,"Allá Arrabiatta","Azeite, um toque de alho, bacon e calabresa em tiras ao molho de tomate","",30],
  [34,"Parisiense","Frango, presunto e petit pois ao molho branco","",30],
  [35,"Bolonhesa","Carne moída, molho de tomate e parmesão","",30]]},
 {id:"pratos",nome:"Pratos Eventuais",icone:"🥩",itens:[
  [36,"Carne de Sol com Aipim (Especial)","","",50],[37,"Churrasco de Picanha e Linguiça","","",90],[38,"Caldos","","",30]]},
 {id:"sobremesa",nome:"Sobremesas",icone:"🍨",itens:[
  [39,"Picolé Itália","Diversos sabores","",9],[40,"Picolé Itália Wind","","",10],[41,"Picolé Itália Zero","","",10]]},
 {id:"cervejas",nome:"Cervejas & Drinks",icone:"🍺",itens:[
  [42,"Heineken 600ml","","",16],[43,"Heineken 330ml","","",11],[44,"Heineken 250ml","","",9],
  [45,"Stella Pure Gold 330ml","","",12],[46,"Coronita 210ml","","",10],[47,"Corona 330ml","","",12],
  [48,"Teresópolis 335ml","","",12],[49,"Batidas","","",7],[50,"Cachaça Artesanal","","",8],
  [51,"Caipirinha - Cachaça 51","","",20],[52,"Caipifruta - Vodka Sminorff","","",25],[53,"Caipifruta - Vodka Absolut","","",28]]},
 {id:"bebidas",nome:"Bebidas",icone:"🥤",itens:[
  [54,"Água Mineral","","",4.5],[55,"Água Mineral c/ Gás","","",5.5],[56,"Guaravita","","",4],
  [57,"Mate Leão Copo","Natural / Com Limão / Zero","",6],[58,"Mate Leão Diet c/ Limão Garrafa","","",7],
  [59,"Coca-Cola Garrafinha","","",5],[60,"Coca-Cola Lata","","",7.5],[61,"Coca-Cola Diet Lata","","",7.5],
  [62,"Guaraná Antártica","","",7.5],[63,"Guaraná Antártica Zero","","",7.5],[64,"Soda Limonada","","",7.5],
  [65,"Soda Limonada Zero","","",7.5],[66,"Água Tônica Comum / Diet","","",7.5],[67,"H2O","","",8],[68,"Café Expresso","","",6]]}
];


const $ = s => document.querySelector(s);
const brl = n => "R$ " + n.toFixed(2).replace(".", ",");
const TAXA = 0.10, CHAVE = "goldenGardenComanda";

const itemPorId = {};
CARDAPIO.forEach(c => c.itens = c.itens.map(([id, nome, desc, qtd, preco]) => {
  const it = {id, nome, desc, qtd, preco, icone: c.icone};
  itemPorId[id] = it;
  return it;
}));

let categoria = "todos", busca = "", comanda = carregar();

function carregar(){
  try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch(e){ return {}; }
}
function guardar(){
  try { localStorage.setItem(CHAVE, JSON.stringify(comanda)); } catch(e){}
}
const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function renderAbas(){
  const abas = [{id:"todos", nome:"Todos", icone:"✨"}, ...CARDAPIO];
  $("#tabs").innerHTML = abas.map(c =>
    `<button class="tab ${c.id === categoria ? "on" : ""}" data-cat="${c.id}">${c.icone} ${c.nome}</button>`).join("");
}

function cartao(it){
  const img = IMAGENS[it.id];
  return `<article class="card">
    <div class="pic">${img ? `<img src="${img}" alt="${it.nome}" loading="lazy">` : it.icone}</div>
    <div class="body">
      <h3>${it.nome}</h3>
      ${it.desc ? `<p class="desc">${it.desc}</p>` : ""}
      ${it.qtd ? `<span class="qty">${it.qtd}</span>` : ""}
      <div class="foot"><span class="price">${brl(it.preco)}</span>
      <button class="add" data-add="${it.id}" aria-label="Adicionar ${it.nome} à comanda">+</button></div>
    </div></article>`;
}

function renderCardapio(){
  const q = norm(busca.trim());
  const html = CARDAPIO
    .filter(c => categoria === "todos" || c.id === categoria)
    .map(c => ({c, itens: c.itens.filter(i => !q || norm(i.nome + " " + i.desc).includes(q))}))
    .filter(x => x.itens.length)
    .map(({c, itens}) => `<section class="sec">
      <div class="sec-h"><span class="sec-ico">${c.icone}</span><h2>${c.nome}</h2>
      <span class="sec-n">${itens.length} ${itens.length === 1 ? "item" : "itens"}</span></div>
      <div class="grid">${itens.map(cartao).join("")}</div></section>`).join("");
  $("#menu").innerHTML = html || `<p class="empty">Nenhum item encontrado para "${busca.replace(/[<>&"]/g, "")}".</p>`;
}

function renderComanda(){
  const ids = Object.keys(comanda);
  const qtdTotal = ids.reduce((s, id) => s + comanda[id], 0);
  const sub = ids.reduce((s, id) => s + itemPorId[id].preco * comanda[id], 0);
  $("#count").textContent = qtdTotal;
  $("#sub").textContent = brl(sub);
  $("#fee").textContent = brl(sub * TAXA);
  $("#total").textContent = brl(sub * (1 + TAXA));
  $("#clear").style.display = ids.length ? "" : "none";
  $("#lines").innerHTML = ids.length ? ids.map(id => {
    const it = itemPorId[id];
    return `<div class="line"><div class="thumb">${it.icone}</div>
      <div class="l-info"><b>${it.nome}</b><span>${brl(it.preco)}</span></div>
      <div class="l-side"><button class="trash" data-del="${id}" aria-label="Remover ${it.nome}">🗑</button>
      <div class="stepper"><button data-menos="${id}" aria-label="Diminuir">−</button><b>${comanda[id]}</b><button data-mais="${id}" aria-label="Aumentar">+</button></div></div></div>`;
  }).join("") : `<p class="d-empty">Sua comanda está vazia.<br>Toque no + de um item para adicioná-lo.</p>`;
}

function mudar(id, delta){
  const n = (comanda[id] || 0) + delta;
  if (n <= 0) delete comanda[id]; else comanda[id] = n;
  guardar(); renderComanda();
  if (delta > 0) { const b = $("#count"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
}

function abrir(on){
  $("#drawer").classList.toggle("on", on);
  $("#overlay").classList.toggle("on", on);
  $("#drawer").setAttribute("aria-hidden", !on);
}


document.addEventListener("click", e => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.dataset.cat) { categoria = t.dataset.cat; renderAbas(); renderCardapio(); }
  else if (t.dataset.add) mudar(t.dataset.add, 1);
  else if (t.dataset.mais) mudar(t.dataset.mais, 1);
  else if (t.dataset.menos) mudar(t.dataset.menos, -1);
  else if (t.dataset.del) mudar(t.dataset.del, -comanda[t.dataset.del]);
});
$("#q").addEventListener("input", e => { busca = e.target.value; renderCardapio(); });
$("#openCart").onclick = () => abrir(true);
$("#closeCart").onclick = $("#overlay").onclick = () => abrir(false);
$("#clear").onclick = () => { if (confirm("Limpar todos os itens da comanda?")) { comanda = {}; guardar(); renderComanda(); } };
document.addEventListener("keydown", e => { if (e.key === "Escape") abrir(false); });


Object.keys(comanda).forEach(id => { if (!itemPorId[id]) delete comanda[id]; });
renderAbas(); renderCardapio(); renderComanda();