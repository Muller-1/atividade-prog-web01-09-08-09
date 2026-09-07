import { agendamentosIniciais } from "../dados.js"

export function validacaoAgendamento(listaAgendamentos, novoAgendamento) {
  return listaAgendamentos.some((agendamento) =>
    agendamento.bloco == novoAgendamento.bloco &&
    agendamento.sala == novoAgendamento.sala &&
    agendamento.data == novoAgendamento.data &&
    agendamento.turno == novoAgendamento.turno)
}
console.log(validacaoAgendamento(agendamentosIniciais, { solicitante: "Prof. Carlos Eduardo", bloco: "Bloco A", sala: "Laboratório de Informática 1", data: "2026-09-15", turno: "Manhã" }))
console.log(validacaoAgendamento(agendamentosIniciais, { solicitante: "Prof. Carlos Eduardo", bloco: "Bloco A", sala: "Laboratório de Informática 1", data: "2026-09-15", turno: "Tarde" }))
