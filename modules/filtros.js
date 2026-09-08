import { getAgendamentos } from "./estado.js";
import { renderizarTabela, atualizarMetricas } from "./render.js";

// AJUSTE os ids abaixo pros que existirem de fato no seu HTML
const inputFiltroSolicitante = document.getElementById("filtroSolicitante");
const inputFiltroData = document.getElementById("filtroData");
const selectFiltroBloco = document.getElementById("filtroBloco");
const selectFiltroSala = document.getElementById("filtroSala");

function aplicarFiltros() {
  const solicitante = inputFiltroSolicitante.value.trim().toLowerCase();
  const data = inputFiltroData.value;
  const bloco = selectFiltroBloco.value;
  const sala = selectFiltroSala.value;

  const agendamentosFiltrados = getAgendamentos().filter((agendamento) => {
    const bateSolicitante = solicitante === "" || agendamento.solicitante.toLowerCase().includes(solicitante);
    const bateData = data === "" || agendamento.data === data;
    const bateBloco = bloco === "" || agendamento.bloco === bloco;
    const bateSala = sala === "" || agendamento.sala === sala;

    return bateSolicitante && bateData && bateBloco && bateSala;
  });

  renderizarTabela(agendamentosFiltrados);
  atualizarMetricas(agendamentosFiltrados);
}

inputFiltroSolicitante.addEventListener("input", aplicarFiltros);
inputFiltroData.addEventListener("change", aplicarFiltros);
selectFiltroBloco.addEventListener("change", aplicarFiltros);
selectFiltroSala.addEventListener("change", aplicarFiltros);