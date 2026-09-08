import { removerReserva } from "./estado.js";

// recebe a função de atualizar a tela porque quem sabe redesenhar é o
// index.js, esse módulo aqui só cuida do clique em excluir
export function registrarExclusao(atualizarTela) {
  const corpoTabela = document.getElementById("corpoTabelaReservas");

  // o listener fica no tbody, não no botão. como as linhas são recriadas
  // toda vez que renderiza de novo, um listener direto no botão se perderia
  // (o elemento antigo é destruído junto)
  corpoTabela.addEventListener("click", function (evento) {
    if (evento.target.matches(".btn-danger")) {
      const id = Number(evento.target.dataset.id);

      removerReserva(id);
      atualizarTela();
    }
  });
}
