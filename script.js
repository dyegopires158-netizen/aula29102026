/* =====================================================================
   MURAL DA TURMA - script.js
   O que este arquivo faz, em resumo:
     1. Guarda uma lista (ARRAY) de alunos com nome e recado.
     2. Mostra todos os alunos na tela como "cartões".
     3. Quando a pessoa digita o nome no campo de busca, filtra o array
        e mostra só os nomes que combinam (com o trecho digitado marcado).
   ===================================================================== */


/* =====================================================================
   1) O ARRAY
   - Array = lista de itens dentro de colchetes [ ], separados por vírgula.
   - Cada item aqui é um OBJETO { } com duas propriedades:
        nome   -> o nome do aluno
        recado -> o texto postado no mural
   - Para acessar: alunos[0].nome devolve "Ana Souza".
   - alunos.length devolve quantos itens existem no array.
   >>> TROQUE pelos nomes/recados reais do mural da sua turma. <<<
   - "const" significa que a variável não pode ser reatribuída
     (mas ainda dá para usar métodos como filter, forEach, etc.).
   ===================================================================== */
const alunos = [
  { nome: "Ana Souza",      recado: "Bom dia, turma!" },
  { nome: "Bruno Lima",     recado: "Não esqueçam do trabalho de sexta." },
  { nome: "Carla Mendes",   recado: "Boa sorte na prova!" },
  { nome: "Diego Santos",   recado: "Quem tem o material da aula 3?" },
  { nome: "Eduarda Alves",  recado: "Estudar em grupo ajuda muito." },
  { nome: "Felipe Rocha",   recado: "Presente!" }
];


/* =====================================================================
   2) PEGAR ELEMENTOS DO HTML
   document.getElementById("x") procura no HTML o elemento que tem
   id="x" e devolve esse elemento. Guardamos em variáveis para poder
   alterar o conteúdo pelo JavaScript depois.
   ===================================================================== */
const campoBusca  = document.getElementById("busca");    // <input> onde digita
const botaoLimpar = document.getElementById("limpar");   // <button> limpar
const mural       = document.getElementById("mural");    // <section> dos cartões
const contador    = document.getElementById("contador"); // <p> "X resultados"


/* =====================================================================
   3) FUNÇÃO AUXILIAR: limpar (tirar acentos e deixar minúsculo)
   Objetivo: "JOSÉ", "jose" e "José" serem tratados como iguais.
   - normalize("NFD") separa a letra do acento: "é" vira "e" + "´".
   - replace(/[\u0300-\u036f]/g, "") apaga todos os acentos soltos.
     (\u0300-\u036f é a faixa Unicode dos acentos; "g" = todas as vezes)
   - toLowerCase() deixa tudo em minúsculas.
   ===================================================================== */
function limpar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}


/* =====================================================================
   4) FUNÇÃO AUXILIAR: criar o título do cartão com o trecho marcado
   Exemplo: busca "an" em "Ana" -> <h2><mark>An</mark>a</h2>

   IMPORTANTE (segurança): não usamos innerHTML com texto vindo dos
   dados. Em vez disso criamos os elementos com createElement e
   colocamos o texto com textContent. Assim, se alguém escrever algo
   como <script> no nome, aparece como texto simples e NÃO executa.
   ===================================================================== */
function criarTitulo(nome, busca) {
  const titulo = document.createElement("h2");     // cria <h2></h2> vazio

  // NFC junta letra+acento em um só caractere. Isso garante que as
  // posições (índices) do texto original e do texto "limpo" batam.
  const nomeNFC = nome.normalize("NFC");

  // indexOf devolve a posição onde o texto buscado começa (ou -1 se não achar)
  const inicio = busca ? limpar(nomeNFC).indexOf(limpar(busca)) : -1;

  // Sem busca ou sem correspondência: título normal, sem marcação
  if (inicio === -1) {
    titulo.textContent = nomeNFC;
    return titulo;
  }

  const fim = inicio + busca.length;               // posição onde o trecho termina

  const marca = document.createElement("mark");    // cria <mark></mark>
  marca.textContent = nomeNFC.slice(inicio, fim);  // slice(a, b) recorta o texto

  // Monta: [texto antes] + [trecho marcado] + [texto depois]
  titulo.append(
    nomeNFC.slice(0, inicio),
    marca,
    nomeNFC.slice(fim)
  );
  return titulo;
}


/* =====================================================================
   5) FUNÇÃO AUXILIAR: criar um cartão (um aluno)
   Recebe UM objeto do array e devolve o <article> pronto.
   ===================================================================== */
function criarCartao(aluno, busca) {
  const cartao = document.createElement("article"); // cria <article>
  cartao.className = "cartao";                      // aplica a classe CSS

  const recado = document.createElement("p");       // cria <p> do recado
  recado.textContent = aluno.recado;                // texto seguro

  cartao.append(criarTitulo(aluno.nome, busca), recado); // coloca dentro do cartão
  return cartao;
}


/* =====================================================================
   6) FUNÇÃO PRINCIPAL: exibir (renderizar) a lista na tela
   Recebe um array e cria um cartão HTML para cada item.
   Parâmetros:
     lista -> array de alunos a mostrar (pode ser o completo ou filtrado)
     busca -> texto digitado (usado só para marcar o trecho no nome)
     (busca = "" é um valor padrão: se não passarmos nada, fica vazio)
   ===================================================================== */
function exibir(lista, busca = "") {
  // Apaga tudo que estava no mural antes de desenhar de novo
  mural.replaceChildren();

  // Se o array estiver vazio, mostra um aviso e encerra a função
  if (lista.length === 0) {
    const aviso = document.createElement("p");
    aviso.className = "vazio";
    aviso.textContent = "Nenhum nome encontrado. Confira a escrita.";
    mural.appendChild(aviso);
    contador.textContent = "0 resultados";
    return; // "return" sai da função aqui
  }

  // forEach percorre o array: executa o código uma vez para cada aluno
  lista.forEach(function (aluno) {
    mural.appendChild(criarCartao(aluno, busca)); // põe o cartão dentro do #mural
  });

  // Atualiza o contador (singular quando for só 1, plural nos demais casos)
  contador.textContent =
    lista.length === 1 ? "1 resultado" : lista.length + " resultados";
}



/* =====================================================================
   7) FILTRAR conforme o que foi digitado
   - filter cria um NOVO array só com os itens que passam no teste
     (o array original "alunos" não é alterado).
   - includes verifica se um texto contém o outro.
   - Se o campo estiver vazio, includes("") é sempre verdadeiro,
     então todos os alunos aparecem.
   ===================================================================== */
function filtrar() {
  const busca = campoBusca.value.trim(); // .value = texto digitado; trim tira espaços das pontas

  const resultado = alunos.filter(function (aluno) {
    return limpar(aluno.nome).includes(limpar(busca));
  });

  exibir(resultado, busca);
}


/* =====================================================================
   8) LIMPAR a busca
   Apaga o campo, mostra todos os nomes e devolve o cursor ao campo.
   ===================================================================== */
function limparBusca() {
  campoBusca.value = "";
  filtrar();
  campoBusca.focus();
}


/* =====================================================================
   9) EVENTOS: quando cada função deve rodar
   addEventListener("evento", função) -> "quando X acontecer, rode Y".
   - "input" dispara a cada letra digitada ou apagada no campo.
   - "click" dispara quando o botão é clicado.
   ===================================================================== */
campoBusca.addEventListener("input", filtrar);
botaoLimpar.addEventListener("click", limparBusca);

// Ao abrir a página, mostra todos os nomes do array
exibir(alunos);

