import { agendamentosIniciais } from "../dados.js";

let agendamentos = [...agendamentosIniciais];

export function adicionarAgendamento(dadosNovo) {
    const idsExistentes = agendamentos.map((agendamento) => agendamento.id);
    const novoId = idsExistentes.length > 0 ? Math.max(...idsExistentes) + 1 : 1;
    const dadosNovoId = { id: novoId, ...dadosNovo };
    agendamentos.push(dadosNovoId);
}

export function removerAgendamento(id) {
    agendamentos = agendamentos.filter((agendamento) => agendamento.id !== id);
}

export function getAgendamentos() {
    return agendamentos;
}
