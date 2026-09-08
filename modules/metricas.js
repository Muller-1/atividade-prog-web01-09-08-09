export function calcularMetricas(lista) {
  const contagem = lista.reduce(function (contador, reserva) {
    contador.total = contador.total + 1;

    if (reserva.turno === "Manhã") {
      contador.manha = contador.manha + 1;
    }

    if (reserva.turno === "Tarde") {
      contador.tarde = contador.tarde + 1;
    }

    if (reserva.turno === "Noite") {
      contador.noite = contador.noite + 1;
    }

    return contador;
  }, { total: 0, manha: 0, tarde: 0, noite: 0 });

  return contagem;
}

export function exibirMetricas(lista) {
  const metricas = calcularMetricas(lista);

  document.getElementById("metricaTotal").textContent = metricas.total;
  document.getElementById("metricaManha").textContent = metricas.manha;
  document.getElementById("metricaTarde").textContent = metricas.tarde;
  document.getElementById("metricaNoite").textContent = metricas.noite;
}
