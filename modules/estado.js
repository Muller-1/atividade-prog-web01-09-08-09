import { agendamentosIniciais } from "../dados.js";

// slice() faz uma cópia, pra não mexer no array original do dados.js
let reservas = agendamentosIniciais.slice();

export function obterReservas() {
  return reservas;
}

export function adicionarReserva(nova) {
  reservas.push(nova);
}

export function removerReserva(id) {
  reservas = reservas.filter(function (reserva) {
    return reserva.id !== id;
  });
}

export function gerarId() {
  let maiorId = 0;

  reservas.forEach(function (reserva) {
    if (reserva.id > maiorId) {
      maiorId = reserva.id;
    }
  });

  return maiorId + 1;
}
