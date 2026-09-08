import { formatarData } from "../data.js";

export function renderizarTabela(agendamentos) {
  return agendamentos.map(function (reserva) {
    return `
  <tr>
    <td>${reserva.id}</td>
    <td>${reserva.solicitante}</td>
    <td>${reserva.bloco}</td>
    <td>${reserva.sala}</td>
    <td>${formatarData(reserva.data)}</td>
    <td>${reserva.turno}</td>
    <td class="text-end"><button class="btn btn-sm btn-danger" data-id="${reserva.id}">Excluir</button></td>
  </tr>
`;
  }).join("");
}

export function renderizarOpcoes(select, valores, textoPadrao) {
  const opcoes = valores.map(function (valor) {
    return `<option value="${valor}">${valor}</option>`;
  });

  const opcaoPadrao = `<option value="">${textoPadrao}</option>`;

  // é = mesmo, não +=, senão as opções antigas ficavam acumulando toda vez
  select.innerHTML = opcaoPadrao + opcoes.join("");
}
