# Mural da Turma

Lê um array de alunos (nome + recado) e exibe na tela como cartões.
Ao digitar no campo de busca, a lista é filtrada pelo nome (ignora acentos e maiúsculas/minúsculas) e o trecho digitado fica marcado.

## Arquivos
- `index.html` – estrutura da página (campo de busca, botão Limpar, área dos cartões)
- `style.css` – aparência (cores em variáveis, grid responsivo)
- `script.js` – lê o array, filtra e exibe (todo comentado passo a passo)

## Tabela de produtos
Além do mural, a página lê o array `dadosDyego` (Videogames: produto, categoria, quantidade e preço) e mostra numa tabela, com o preço em reais e o valor total do estoque (`reduce`).

## Como usar
Abra o `index.html` no navegador. Para trocar os dados, edite o array `alunos` no `script.js`.

## Conceitos de JavaScript usados
- **Array e objetos:** `const alunos = [ { nome, recado }, ... ]`
- **DOM:** `getElementById`, `createElement`, `textContent`, `append`, `replaceChildren`
- **Métodos de array:** `forEach` (percorrer) e `filter` (filtrar)
- **Eventos:** `addEventListener("input", ...)` e `addEventListener("click", ...)`
- **Strings:** `normalize`, `replace`, `toLowerCase`, `includes`, `indexOf`, `slice`
- **Segurança:** o texto é inserido com `textContent` (e não `innerHTML`), evitando injeção de HTML/scripts.
