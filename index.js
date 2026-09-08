import { infraestrutura } from "./dados.js";
import { obterReservas, adicionarReserva, gerarId } from "./modules/estado.js";
import { renderizarTabela, renderizarOpcoes } from "./modules/render.js";
import { lerCriterios, aplicarFiltros } from "./modules/filtros.js";
import { exibirMetricas } from "./modules/metricas.js";
import { validacaoAgendamento } from "./modules/validacao.js";
import { registrarExclusao } from "./modules/eventos.js";

// elementos que vou usar em mais de um lugar do arquivo
const corpoTabela = document.getElementById("corpoTabelaReservas");
const selectBloco = document.getElementById("selectBloco");
const selectSala = document.getElementById("selectSala");
const formNovoAgendamento = document.getElementById("formNovoAgendamento");
const alertaColisao = document.getElementById("alertaColisao");

// só cria a modal uma vez aqui fora. se criasse ela de novo dentro do listener
// do clique, ia ficar empilhando um bootstrap.Modal em cima do outro
const modalNovoAgendamento = new bootstrap.Modal(
  document.getElementById("modalNovoAgendamento")
);

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

// essa é a função que todo evento chama depois de mexer no estado,
// ela pega o estado atualizado e redesenha tudo de novo
function atualizarTela() {
  const criterios = lerCriterios();
  const listaFiltrada = aplicarFiltros(obterReservas(), criterios);

  corpoTabela.innerHTML = renderizarTabela(listaFiltrada);

  exibirMetricas(listaFiltrada);
  atualizarEstadoVazio(listaFiltrada);
}

// preenche os selects de bloco e sala com o que tem em dados.js
function carregarSelects() {
  const blocos = infraestrutura.map(function (item) {
    return item.bloco;
  });

  // aqui eu junto as salas de todos os blocos numa lista só
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

  // o select de sala da modal começa vazio, só é liberado depois que escolhe o bloco
  renderizarOpcoes(selectSala, [], "Selecione...");
}

// o evento de input sobe dos campos até o form (event bubbling), por isso
// um listener só no form já cobre os quatro campos do filtro
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

document.getElementById("btnNovoAgendamento").addEventListener("click", function () {
  alertaColisao.hidden = true;
  modalNovoAgendamento.show();
});

document.getElementById("btnCancelar").addEventListener("click", function () {
  modalNovoAgendamento.hide();
});

// quando muda o bloco, recarrega o select de sala só com as salas daquele bloco
selectBloco.addEventListener("change", function () {
  const blocoEscolhido = infraestrutura.find(function (item) {
    return item.bloco === selectBloco.value;
  });

  let salas = [];

  // se voltar pra "Selecione...", o find não acha nenhum bloco e devolve
  // undefined. tentar ler .salas disso ia quebrar o script
  if (blocoEscolhido !== undefined) {
    salas = blocoEscolhido.salas;
  }

  renderizarOpcoes(selectSala, salas, "Selecione...");
});

formNovoAgendamento.addEventListener("submit", function (evento) {
  // preventDefault pra não deixar o form recarregar a página, senão perde o estado todo
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

    // dá return aqui e não fecha a modal, pra deixar o usuário ver o erro
    return;
  }

  adicionarReserva(novoAgendamento);

  modalNovoAgendamento.hide();
  formNovoAgendamento.reset();

  // o reset() só limpa o que foi selecionado, as <option> de sala continuam lá
  renderizarOpcoes(selectSala, [], "Selecione...");

  atualizarTela();
});

registrarExclusao(atualizarTela);
carregarSelects();
atualizarTela();
