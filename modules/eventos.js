import { colisaoAgendamento } from "./validacao.js";
import { getAgendamentos, adicionarAgendamento, removerAgendamento } from "./estado.js";
import { infraestrutura } from "../dados.js";
import { renderizarTabela, atualizarMetricas } from "./render.js";

const formNovoAgendamento = document.getElementById("formNovoAgendamento");
const modalNovoAgendamento = document.getElementById("modalNovoAgendamento");
const alertaColisao = document.getElementById("alertaColisao");
const selectBloco = document.getElementById("selectBloco");
const selectSala = document.getElementById("selectSala");
const corpoTabela = document.getElementById("corpoTabelaReservas");

modalNovoAgendamento.addEventListener("shown.bs.modal", function () {
  formNovoAgendamento.reset();
  alertaColisao.classList.add("d-none");

  selectSala.innerHTML = "";
  selectSala.disabled = true;

  const opcaoPlaceholder = document.createElement("option");
  opcaoPlaceholder.value = "";
  opcaoPlaceholder.textContent = "Selecione o bloco primeiro";
  opcaoPlaceholder.disabled = true;
  opcaoPlaceholder.selected = true;
  selectSala.appendChild(opcaoPlaceholder);
});

formNovoAgendamento.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const novoAgendamento = {
        solicitante: document.getElementById("inputSolicitante").value,
        bloco: document.getElementById("selectBloco").value,
        sala: document.getElementById("selectSala").value,
        data: document.getElementById("inputData").value,
        turno: document.getElementById("selectTurno").value
    };

    const houveColisao = colisaoAgendamento(getAgendamentos(), novoAgendamento);

    if (houveColisao) {
    alertaColisao.classList.remove("d-none");
    return;
}

    alertaColisao.classList.add("d-none");
    adicionarAgendamento(novoAgendamento);
    renderizarTabela();
    atualizarMetricas();

    const modalInstancia = bootstrap.Modal.getInstance(modalNovoAgendamento);
    modalInstancia.hide();
});

selectBloco.addEventListener("change", function (evento) {
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
    renderizarTabela();
    atualizarMetricas();
});
