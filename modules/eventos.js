import { validacaoAgendamento } from "./validacao.js";
import { getAgendamentos, adicionarAgendamento } from "./estado.js";
import { infraestrutura } from "../dados.js";

const formNovoAgendamento = document.getElementById("formNovoAgendamento");
const modalNovoAgendamento = document.getElementById("modalNovoAgendamento");
const alertaColisao = document.getElementById("alertaColisao");
const selectBloco = document.getElementById("selectBloco");
const selectSala = document.getElementById("selectSala")

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

    const houveColisao = validacaoAgendamento(getAgendamentos(), novoAgendamento);

    if (houveColisao) {
        alertaColisao.classList.remove("d-none")
        return;
    }

    alertaColisao.classList.add("d-none");
});

selectBloco.addEventListener("change", function (evento) {
    selectSala.innerHTML = "";
    const blocoEncontrado = infraestrutura.find((blocoAtual) => blocoAtual.bloco === selectBloco.value);

    if (blocoEncontrado === undefined) {
        return;
    }
    

    blocoEncontrado.salas.forEach(element => {
        const opcaoBloco = document.createElement("option");
        opcaoBloco.value = element
        opcaoBloco.textContent = element
        selectSala.appendChild(opcaoBloco)
        selectSala.disabled = false;

    });

});

