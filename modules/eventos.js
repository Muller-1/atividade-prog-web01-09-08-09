formNovoAgendamento.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const novoAgendamento = {
    solicitante: document.getElementById("inputSolicitante").value,
    bloco: document.getElementById("selectBloco").value, 
    sala: document.getElementById("selectSala").value,
    data: document.getElementById("inputData").value,
    turno: document.getElementById("selectTurno").value};
});