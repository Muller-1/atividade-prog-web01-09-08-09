// pega a data tipo "2026-09-15" (formato do input type=date) e devolve "15/09/2026"
export function formatarData(dataISO) {
  const partes = dataISO.split("-");

  const ano = Number(partes[0]);
  const mes = Number(partes[1]);
  const dia = Number(partes[2]);

  // mes - 1 porque no construtor Date janeiro conta como 0, não como 1
  const data = new Date(ano, mes - 1, dia);

  return data.toLocaleDateString("pt-BR");
}
