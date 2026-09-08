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

