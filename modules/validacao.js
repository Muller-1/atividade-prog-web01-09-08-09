export function validacaoAgendamento(listaAgendamentos, novoAgendamento) {
  return listaAgendamentos.some((agendamento) =>
    agendamento.bloco == novoAgendamento.bloco &&
    agendamento.sala == novoAgendamento.sala &&
    agendamento.data == novoAgendamento.data &&
    agendamento.turno == novoAgendamento.turno)
}
