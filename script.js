/* =====================================================================
   script.js -> LÓGICA: lê o array dadosDyego (vem do dados.js) e
   mostra na tela. Este arquivo NÃO tem os dados, só usa eles.
   ===================================================================== */

/* ---------- 1) PEGAR ELEMENTOS DO HTML ----------
   getElementById procura o elemento pelo id e guarda na variável
   para podermos ler/alterar ele pelo JavaScript. */
const campoBusca  = document.getElementById("busca");
const campoCateg  = document.getElementById("categoria");
const corpoTabela = document.getElementById("lista");
const resumo      = document.getElementById("resumo");

/* ---------- 2) FORMATAR DINHEIRO ----------
   Intl.NumberFormat transforma 1199 em "R$ 3.500,00" no padrão brasileiro. */
const formatoMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

/* ---------- 3) LIMPAR TEXTO PARA COMPARAR ----------
   Deixa minúsculo e tira acentos: assim "Pro" = "pro". */
function limpar(texto) {
  return texto
    .normalize("NFD")                  // separa letra e acento
    .replace(/[\u0300-\u036f]/g, "")   // apaga os acentos
    .toLowerCase();                    // tudo minúsculo
}

/* ---------- 4) MARCAR O TRECHO BUSCADO ----------
   Ex.: busca "play" em "PlayStation 5" -> "<mark>Play</mark>Station 5" */
function destacar(nome, busca) {
  if (!busca) return nome;                              // sem busca, não marca
  const inicio = limpar(nome).indexOf(limpar(busca));   // posição do trecho
  if (inicio === -1) return nome;                       // não achou
  const fim = inicio + busca.length;
  return nome.slice(0, inicio) + "<mark>" + nome.slice(inicio, fim) + "</mark>" + nome.slice(fim);
}

/* ---------- 5) CRIAR AS OPÇÕES DO SELECT ----------
   map pega só a categoria de cada item; Set remove repetidas;
   [...] transforma o Set de volta em array. */
function montarCategorias() {
  const categorias = [...new Set(dadosDyego.map(function (item) {
    return item.categoria;
  }))];

  campoCateg.innerHTML = '<option value="todas">Todas</option>';
  categorias.forEach(function (cat) {
    campoCateg.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

/* ---------- 6) EXIBIR A LISTA NA TABELA ----------
   Recebe um array e cria uma linha <tr> para cada item. */
function exibir(lista, busca) {
  corpoTabela.innerHTML = "";   // limpa as linhas antigas

  if (lista.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="4" class="vazio">Nenhum produto encontrado.</td></tr>';
    resumo.textContent = "0 produtos";
    return;                     // encerra a função
  }

  // forEach roda o código uma vez para cada item do array
  lista.forEach(function (item) {
    const linha = document.createElement("tr");   // cria <tr>
    linha.innerHTML = `
      <td>${destacar(item.produto, busca)}</td>
      <td>${item.categoria}</td>
      <td class="num">${item.quantidade}</td>
      <td class="num">${formatoMoeda.format(item.preco)}</td>
    `;
    corpoTabela.appendChild(linha);               // coloca a linha na tabela
  });

  /* reduce soma valores do array: começa em 0 e acumula item a item.
     Aqui calculamos o total de unidades e o valor total do estoque
     (quantidade x preço de cada aparelho). */
  const totalUnidades = lista.reduce(function (soma, item) {
    return soma + item.quantidade;
  }, 0);
  const valorEstoque = lista.reduce(function (soma, item) {
    return soma + item.quantidade * item.preco;
  }, 0);

  resumo.textContent =
    `${lista.length} produto(s) · ${totalUnidades} unidades · estoque de ${formatoMoeda.format(valorEstoque)}`;
}

/* ---------- 7) FILTRAR ----------
   filter cria um NOVO array só com os itens que passam nas duas regras:
   o nome contém o texto digitado E a categoria é a escolhida. */
function filtrar() {
  const busca = campoBusca.value.trim();
  const categoria = campoCateg.value;

  const resultado = dadosDyego.filter(function (item) {
    const nomeConfere = limpar(item.produto).includes(limpar(busca));
    const categoriaConfere = categoria === "todas" || item.categoria === categoria;
    return nomeConfere && categoriaConfere;   // precisa passar nas duas
  });

  exibir(resultado, busca);
}

/* ---------- 8) EVENTOS ----------
   "input" dispara a cada letra digitada; "change" quando troca o select. */
campoBusca.addEventListener("input", filtrar);
campoCateg.addEventListener("change", filtrar);

/* ---------- 9) INÍCIO ----------
   Ao abrir a página: monta o select e mostra tudo. */
montarCategorias();
exibir(dadosDyego, "");
