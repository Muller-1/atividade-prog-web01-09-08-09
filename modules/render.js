import { getAgendamentos } from "./estado.js";

const alertaVazio = document.getElementById("alertaVazio");
const tabelaReservas = document.getElementById("tabelaReservas");
const corpoTabela = document.getElementById("corpoTabelaReservas");

export function renderizarTabela(listaAgendamentos = getAgendamentos()) {
  if (listaAgendamentos.length === 0) {
    tabelaReservas.hidden = true;
    alertaVazio.hidden = false;
    corpoTabela.innerHTML = "";
    return;
  }

  tabelaReservas.hidden = false;
  alertaVazio.hidden = true;

  corpoTabela.innerHTML = listaAgendamentos.map((agendamento) => `
    <tr>
      <td>${agendamento.id}</td>
      <td>${agendamento.solicitante}</td>
      <td>${agendamento.bloco}</td>
      <td>${agendamento.sala}</td>
      <td>${agendamento.data}</td>
      <td>${agendamento.turno}</td>
      <td class="text-end">
        <button type="button" class="btn btn-sm btn-danger btn-excluir" data-id="${agendamento.id}">Excluir</button>
      </td>
    </tr>
  `).join("");
}
