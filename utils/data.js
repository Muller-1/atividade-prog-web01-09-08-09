// Recebe a data no formato "2026-09-15" e devolve "15/09/2026"
export function formatarData(dataISO) {
  const partes = dataISO.split("-");

  const ano = Number(partes[0]);
  const mes = Number(partes[1]);
  const dia = Number(partes[2]);

  // no Date do JS janeiro é 0, por isso o mes - 1
  const data = new Date(ano, mes - 1, dia);

  return data.toLocaleDateString("pt-BR");
}
