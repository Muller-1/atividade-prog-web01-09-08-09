import { getAgendamentos } from "./estado.js";

const alertaVazio = document.getElementById("alertaVazio");
const tabelaReservas = document.getElementById("tabelaReservas");
const corpoTabela = document.getElementById("corpoTabelaReservas");

export function renderizarTabela(listaAgendamentos = getAgendamentos()) {
  if (listaAgendamentos.length === 0) {
    tabelaReservas.classList.add("d-none");
    alertaVazio.classList.remove("d-none");
    corpoTabela.innerHTML = "";
    return;
  }

  tabelaReservas.classList.remove("d-none");
  alertaVazio.classList.add("d-none");

  corpoTabela.innerHTML = listaAgendamentos.map((agendamento) => `
    <tr>
      <td>${agendamento.id}</td>
      <td>${agendamento.solicitante}</td>
      <td>${agendamento.bloco}</td>
      <td>${agendamento.sala}</td>
      <td>${agendamento.data}</td>
      <td><span class="badge badge-turno">${agendamento.turno}</span></td>
      <td class="text-end">
        <button type="button" class="btn btn-sm btn-danger btn-excluir" data-id="${agendamento.id}">
          <i class="bi bi-trash"></i> Excluir
        </button>
      </td>
    </tr>
  `).join("");
}

export function atualizarMetricas(listaAgendamentos = getAgendamentos()) {
  const total = listaAgendamentos.length;
  const totalManha = listaAgendamentos.filter((a) => a.turno === "Manhã").length;
  const totalTarde = listaAgendamentos.filter((a) => a.turno === "Tarde").length;
  const totalNoite = listaAgendamentos.filter((a) => a.turno === "Noite").length;

  document.getElementById("metricaTotal").textContent = total;
  document.getElementById("metricaManha").textContent = totalManha;
  document.getElementById("metricaTarde").textContent = totalTarde;
  document.getElementById("metricaNoite").textContent = totalNoite;
}
