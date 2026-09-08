import { validacaoAgendamento } from "./modules/validacao.js";
import { adicionarAgendamento } from "./modules/estado.js";
import * as eventos from "./modules/eventos.js";
import { renderizarTabela } from "./modules/render.js";
import * as dados from './dados.js';

document.getElementById("corpoTabelaReservas").innerHTML = renderizarTabela(dados.agendamentosIniciais);

renderizarTabela();
