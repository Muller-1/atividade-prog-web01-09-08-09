import { infraestrutura } from "./dados.js";
import { obterReservas, adicionarReserva, gerarId } from "./modules/estado.js";
import { renderizarTabela, renderizarOpcoes } from "./modules/render.js";
import { lerCriterios, aplicarFiltros } from "./modules/filtros.js";
import { exibirMetricas } from "./modules/metricas.js";
import { validacaoAgendamento } from "./modules/validacao.js";
import { registrarExclusao } from "./modules/eventos.js";

// ==================== ELEMENTOS USADOS EM VÁRIOS LUGARES ====================

const corpoTabela = document.getElementById("corpoTabelaReservas");
const selectBloco = document.getElementById("selectBloco");
const selectSala = document.getElementById("selectSala");
const formNovoAgendamento = document.getElementById("formNovoAgendamento");
const alertaColisao = document.getElementById("alertaColisao");

// A instância da modal é criada uma vez só. Criar uma nova a cada clique
// geraria vários controles pro mesmo elemento e eles empilhariam.
const modalNovoAgendamento = new bootstrap.Modal(
  document.getElementById("modalNovoAgendamento")
);

// ==================== ATUALIZAÇÃO DA TELA ====================

function atualizarEstadoVazio(lista) {
  const alerta = document.getElementById("alertaVazio");
  const tabela = document.getElementById("tabelaReservas");

  if (lista.length === 0) {
    alerta.hidden = false;
    tabela.hidden = true;
  } else {
    alerta.hidden = true;
    tabela.hidden = false;
  }
}

// Função central: todo evento altera o estado e chama esta função,
// que refaz a tela inteira a partir dele.
function atualizarTela() {
  const criterios = lerCriterios();
  const listaFiltrada = aplicarFiltros(obterReservas(), criterios);

  corpoTabela.innerHTML = renderizarTabela(listaFiltrada);

  exibirMetricas(listaFiltrada);
  atualizarEstadoVazio(listaFiltrada);
}

// ==================== CARREGAMENTO DOS SELECTS ====================

function carregarSelects() {
  const blocos = infraestrutura.map(function (item) {
    return item.bloco;
  });

  // junta as salas de todos os blocos em uma lista só
  const todasAsSalas = [];

  infraestrutura.forEach(function (item) {
    item.salas.forEach(function (sala) {
      todasAsSalas.push(sala);
    });
  });

  renderizarOpcoes(
    document.getElementById("filtroBloco"), blocos, "Todos os blocos");

  renderizarOpcoes(
    document.getElementById("filtroSala"), todasAsSalas, "Todas as salas");

  renderizarOpcoes(selectBloco, blocos, "Selecione...");

  // a sala da modal começa vazia, só libera depois de escolher o bloco
  renderizarOpcoes(selectSala, [], "Selecione...");
}

// ==================== FILTROS ====================

// O evento input sobe dos campos filhos até o formulário,
// então um listener só cobre os quatro campos.
document.getElementById("formFiltros").addEventListener("input", function () {
  atualizarTela();
});

document.getElementById("btnLimparFiltros").addEventListener("click", function () {
  document.getElementById("filtroSolicitante").value = "";
  document.getElementById("filtroData").value = "";
  document.getElementById("filtroBloco").value = "";
  document.getElementById("filtroSala").value = "";

  atualizarTela();
});

// ==================== MODAL ====================

document.getElementById("btnNovoAgendamento").addEventListener("click", function () {
  alertaColisao.hidden = true;
  modalNovoAgendamento.show();
});

document.getElementById("btnCancelar").addEventListener("click", function () {
  modalNovoAgendamento.hide();
});

// ==================== SELECTS DEPENDENTES ====================

selectBloco.addEventListener("change", function () {
  const blocoEscolhido = infraestrutura.find(function (item) {
    return item.bloco === selectBloco.value;
  });

  let salas = [];

  // se o usuário voltar para "Selecione...", o find não acha nada
  // e ler .salas de undefined derrubaria o script
  if (blocoEscolhido !== undefined) {
    salas = blocoEscolhido.salas;
  }

  renderizarOpcoes(selectSala, salas, "Selecione...");
});

// ==================== CADASTRO DE NOVA RESERVA ====================

formNovoAgendamento.addEventListener("submit", function (evento) {
  // sem isso o formulário recarrega a página e o estado se perde
  evento.preventDefault();

  const novoAgendamento = {
    id: gerarId(),
    solicitante: document.getElementById("inputSolicitante").value,
    bloco: selectBloco.value,
    sala: selectSala.value,
    data: document.getElementById("inputData").value,
    turno: document.getElementById("selectTurno").value
  };

  const temConflito = validacaoAgendamento(obterReservas(), novoAgendamento);

  if (temConflito === true) {
    const mensagem =
      "Conflito de Agendamento: A " + novoAgendamento.sala +
      " do " + novoAgendamento.bloco +
      " já está ocupada no turno da " + novoAgendamento.turno +
      " na data selecionada.";

    document.getElementById("mensagemColisao").textContent = mensagem;
    alertaColisao.hidden = false;

    // o return encerra a função aqui, então a modal não fecha
    return;
  }

  adicionarReserva(novoAgendamento);

  modalNovoAgendamento.hide();
  formNovoAgendamento.reset();

  // o reset não limpa as opções de sala, só a seleção
  renderizarOpcoes(selectSala, [], "Selecione...");

  atualizarTela();
});

// ==================== INÍCIO ====================

registrarExclusao(atualizarTela);
carregarSelects();
atualizarTela();
