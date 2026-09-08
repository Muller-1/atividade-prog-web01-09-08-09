import { getAgendamentos } from "./estado.js";

const alertaVazio = document.getElementById("alertaVazio");
const tabelaReservas = document.getElementById("tabelaReservas");
const corpoTabela = document.getElementById("corpoTabelaReservas");

export function renderizarTabela() {
  const agendamentos = getAgendamentos();

  // Regra do PDF (3.1): lista vazia -> esconde tabela, mostra alerta
  if (agendamentos.length === 0) {
    tabelaReservas.classList.add("d-none");
    alertaVazio.classList.remove("d-none");
    corpoTabela.innerHTML = "";
    return;
  }

  tabelaReservas.classList.remove("d-none");
  alertaVazio.classList.add("d-none");

  // .map() transforma CADA agendamento em uma string de <tr>...</tr>
  // .join("") gruda todas essas strings numa só, sem separador nenhum
  corpoTabela.innerHTML = agendamentos.map((agendamento) => `
    <tr>
      <td>${agendamento.id}</td>
      <td>${agendamento.solicitante}</td>
      <td>${agendamento.bloco}</td>
      <td>${agendamento.sala}</td>
      <td>${agendamento.data}</td>
      <td><span class="badge badge-turno">${agendamento.turno}</span></td>
      <td class="text-end">
        <button type="button" class="btn btn-sm btn-danger" data-id="${agendamento.id}">
          <i class="bi bi-trash"></i> Excluir
        </button>
      </td>
    </tr>
  `).join("");
}