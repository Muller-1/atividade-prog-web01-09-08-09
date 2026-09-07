import * as dados from './dados.js';
import {renderizarTabela} from './modules/render.js';

document.getElementById("corpoTabelaReservas").innerHTML = renderizarTabela(dados.agendamentosIniciais);