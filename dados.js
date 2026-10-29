/* =====================================================================
   dados.js  ->  ONDE FICAM OS DADOS (o array)
   Aluno: DYEGO BRAYAN PIRES FARIAS DA ROCHA  |  Tema: Videogames

   Um ARRAY é uma lista entre colchetes [ ].
   Cada item é um OBJETO entre chaves { } com propriedades:
     produto    -> nome do item
     categoria  -> tipo do item (Console, Acessório, Jogo...)
     quantidade -> unidades em estoque
     preco      -> preço de cada unidade, em reais (R$)

   São 12 produtos (mínimo exigido: 10). Os 4 primeiros são os
   originais do mural; os outros 8 foram acrescentados.
   ===================================================================== */
const dadosDyego = [
  // ----- Originais -----
  { produto: "PlayStation 5",        categoria: "Console",   quantidade: 6,  preco: 3500 },
  { produto: "Xbox Series X",        categoria: "Console",   quantidade: 4,  preco: 3200 },
  { produto: "Controle Gamer",       categoria: "Acessório", quantidade: 15, preco: 350 },
  { produto: "Headset Gamer",        categoria: "Acessório", quantidade: 20, preco: 250 },

  // ----- Acrescentados -----
  { produto: "Nintendo Switch",      categoria: "Console",   quantidade: 8,  preco: 2200 },
  { produto: "Teclado Mecânico",     categoria: "Acessório", quantidade: 12, preco: 320 },
  { produto: "Mouse Gamer",          categoria: "Acessório", quantidade: 25, preco: 180 },
  { produto: "Cadeira Gamer",        categoria: "Mobiliário", quantidade: 5, preco: 1100 },
  { produto: "FIFA / EA FC",         categoria: "Jogo",      quantidade: 30, preco: 280 },
  { produto: "God of War Ragnarök",  categoria: "Jogo",      quantidade: 14, preco: 250 },
  { produto: "Monitor Gamer 144Hz",  categoria: "Acessório", quantidade: 7,  preco: 1300 },
  { produto: "Cartão PSN R$100",     categoria: "Cartão",    quantidade: 40, preco: 100 }
];
