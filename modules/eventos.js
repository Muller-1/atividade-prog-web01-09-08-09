import { removerReserva } from "./estado.js";

// Recebe a função de atualizar a tela, porque quem sabe redesenhar
// a página é o index.js, não este módulo.
export function registrarExclusao(atualizarTela) {
  const corpoTabela = document.getElementById("corpoTabelaReservas");

  // O listener fica no tbody e não no botão porque as linhas são
  // recriadas a cada renderização — um listener no botão se perderia.
  corpoTabela.addEventListener("click", function (evento) {
    if (evento.target.matches(".btn-danger")) {
      const id = Number(evento.target.dataset.id);

      removerReserva(id);
      atualizarTela();
    }
  });
}
