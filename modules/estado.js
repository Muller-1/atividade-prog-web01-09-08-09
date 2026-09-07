import { agendamentosIniciais } from "../dados.js"

let agendamentos = [...agendamentosIniciais]

export function adicionarAgendamento(dadosNovo){
    const idsExistentes = agendamentos.map((agendamento) => agendamento.id)
    const novoId = Math.max(...idsExistentes) + 1
    const dadosNovoId = { id: novoId, ...dadosNovo }
    agendamentos.push(dadosNovoId)
}

export function getAgendamentos(){
    return agendamentos
}

adicionarAgendamento({ solicitante: "Teste", bloco: "Bloco A", sala: "Sala 101", data: "2026-10-01", turno: "Tarde" });
console.log(agendamentos);