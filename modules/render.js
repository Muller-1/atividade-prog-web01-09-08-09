import {excluirSolicitante} from './eventos.js';

export function renderizarTabela (agendamentos) {
  return agendamentos.map(reservas => `
  <tr>
    <td>${reservas.id}</td>
    <td>${reservas.solicitante}</td>
    <td>${reservas.bloco}</td>
    <td>${reservas.sala}</td>
    <td>${reservas.data}</td>
    <td>${reservas.turno}</td>
    <td class="text-end"><button class="btn btn-sm btn-danger" data-id="${reservas.id}">Excluir</button></td>
  </tr>
`).join("")}

document.getElementById("corpoTabelaReservas").addEventListener("click", (evento) => {
  if (evento.target.matches(".btn-danger")) {
    const id = Number(evento.target.dataset.id);
    excluirSolicitante(id);
  }
});