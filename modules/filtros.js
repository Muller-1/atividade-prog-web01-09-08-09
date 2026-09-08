export function lerCriterios() {
  const criterios = {
    solicitante: document.getElementById("filtroSolicitante").value,
    data: document.getElementById("filtroData").value,
    bloco: document.getElementById("filtroBloco").value,
    sala: document.getElementById("filtroSala").value
  };

  return criterios;
}

export function aplicarFiltros(lista, criterios) {
  return lista.filter(function (reserva) {

    // se tem algo digitado no filtro de nome e o nome da reserva não bate, descarta
    if (criterios.solicitante !== "") {
      const nome = reserva.solicitante.toLowerCase();
      const busca = criterios.solicitante.toLowerCase();

      if (nome.includes(busca) === false) {
        return false;
      }
    }

    if (criterios.data !== "" && reserva.data !== criterios.data) {
      return false;
    }

    if (criterios.bloco !== "" && reserva.bloco !== criterios.bloco) {
      return false;
    }

    if (criterios.sala !== "" && reserva.sala !== criterios.sala) {
      return false;
    }

    // se chegou até aqui é porque passou em todos os filtros
    return true;
  });
}
