import * as dados from '../dados.js';
import { renderizarTabela } from './render.js';

export function excluirSolicitante(id) {
  const index = dados.agendamentosIniciais.findIndex(reserva => reserva.id === id);
  dados.agendamentosIniciais.splice(index, 1);
  document.getElementById("corpoTabelaReservas").innerHTML = renderizarTabela(dados.agendamentosIniciais);
}