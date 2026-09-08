import { colisaoAgendamento } from "./validacao.js";
import { getAgendamentos, adicionarAgendamento, removerAgendamento } from "./estado.js";
import { infraestrutura } from "../dados.js";
import { renderizarTabela } from "./render.js";
import { lerCriterios, aplicarFiltros } from "./filtros.js";
import { exibirMetricas } from "./metricas.js";

const formNovoAgendamento = document.getElementById("formNovoAgendamento");
const modalNovoAgendamentoEl = document.getElementById("modalNovoAgendamento");
const modalNovoAgendamento = new bootstrap.Modal(modalNovoAgendamentoEl);
const alertaColisao = document.getElementById("alertaColisao");
const selectBloco = document.getElementById("selectBloco");
const selectSala = document.getElementById("selectSala");
const corpoTabela = document.getElementById("corpoTabelaReservas");
const btnNovoAgendamento = document.getElementById("btnNovoAgendamento");
const btnCancelar = document.getElementById("btnCancelar");
const filtroBloco = document.getElementById("filtroBloco");
const filtroSala = document.getElementById("filtroSala");
const formFiltros = document.getElementById("formFiltros");
const btnLimparFiltros = document.getElementById("btnLimparFiltros");

// A função que qualquer evento chama depois de mexer no estado: lê os
// filtros atuais, filtra a lista completa, e redesenha tabela + métricas
// só com o que sobrou do filtro (ou a lista inteira, se nenhum filtro
// estiver preenchido).
function atualizarTela() {
  const criterios = lerCriterios();
  const listaFiltrada = aplicarFiltros(getAgendamentos(), criterios);

  renderizarTabela(listaFiltrada);
  exibirMetricas(listaFiltrada);
}

// Popula um <select> com uma option vazia (o "Todos"/"Selecione...") mais
// uma option para cada valor do array. Usada tanto pro select da modal
// quanto pelos dois selects de filtro (bloco e sala).
function popularOpcoes(select, valores, textoOpcaoPadrao) {
  select.innerHTML = "";

  const opcaoPadrao = document.createElement("option");
  opcaoPadrao.value = "";
  opcaoPadrao.textContent = textoOpcaoPadrao;
  select.appendChild(opcaoPadrao);

  valores.forEach((valor) => {
    const opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = valor;
    select.appendChild(opcao);
  });
}

// Roda uma vez, ao carregar a página: preenche o select de Bloco da modal
// e os dois selects do painel de filtro com os dados de infraestrutura.
function popularSelectsEstaticos() {
  const nomesDosBlocos = infraestrutura.map((item) => item.bloco);

  const todasAsSalas = [];
  infraestrutura.forEach((item) => {
    item.salas.forEach((sala) => todasAsSalas.push(sala));
  });

  popularOpcoes(selectBloco, nomesDosBlocos, "Selecione...");
  popularOpcoes(filtroBloco, nomesDosBlocos, "Todos os blocos");
  popularOpcoes(filtroSala, todasAsSalas, "Todas as salas");
}

btnNovoAgendamento.addEventListener("click", function () {
  modalNovoAgendamento.show();
});

btnCancelar.addEventListener("click", function () {
  modalNovoAgendamento.hide();
});

modalNovoAgendamentoEl.addEventListener("shown.bs.modal", function () {
  formNovoAgendamento.reset();
  alertaColisao.hidden = true;

  const opcaoPlaceholder = document.createElement("option");
  opcaoPlaceholder.value = "";
  opcaoPlaceholder.textContent = "Selecione o bloco primeiro";
  opcaoPlaceholder.disabled = true;
  opcaoPlaceholder.selected = true;
  selectSala.innerHTML = "";
  selectSala.appendChild(opcaoPlaceholder);
  selectSala.disabled = true;
});

formNovoAgendamento.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const novoAgendamento = {
        solicitante: document.getElementById("inputSolicitante").value,
        bloco: selectBloco.value,
        sala: selectSala.value,
        data: document.getElementById("inputData").value,
        turno: document.getElementById("selectTurno").value
    };

    const houveColisao = colisaoAgendamento(getAgendamentos(), novoAgendamento);

    if (houveColisao) {
        const mensagem =
          "Conflito de Agendamento: A " + novoAgendamento.sala +
          " do " + novoAgendamento.bloco +
          " já está ocupada no turno da " + novoAgendamento.turno +
          " na data selecionada.";

        document.getElementById("mensagemColisao").textContent = mensagem;
        alertaColisao.hidden = false;
        return;
    }

    alertaColisao.hidden = true;
    adicionarAgendamento(novoAgendamento);
    atualizarTela();

    modalNovoAgendamento.hide();
});

selectBloco.addEventListener("change", function () {
    selectSala.innerHTML = "";
    const blocoEncontrado = infraestrutura.find((blocoAtual) => blocoAtual.bloco === selectBloco.value);

    if (blocoEncontrado === undefined) {
        selectSala.disabled = true;
        return;
    }

    blocoEncontrado.salas.forEach(element => {
        const opcaoBloco = document.createElement("option");
        opcaoBloco.value = element;
        opcaoBloco.textContent = element;
        selectSala.appendChild(opcaoBloco);
    });

    selectSala.disabled = false;
});

corpoTabela.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".btn-excluir");
    if (!botao) return;

    const id = Number(botao.dataset.id);
    removerAgendamento(id);
    atualizarTela();
});

formFiltros.addEventListener("input", atualizarTela);
formFiltros.addEventListener("change", atualizarTela);

btnLimparFiltros.addEventListener("click", function () {
  document.getElementById("filtroSolicitante").value = "";
  document.getElementById("filtroData").value = "";
  filtroBloco.value = "";
  filtroSala.value = "";
  atualizarTela();
});

popularSelectsEstaticos();
atualizarTela();
