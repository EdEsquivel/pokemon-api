async function obtenerDetallesPokemon(nombrePokemon) {
  try {
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`
    );
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la información del Pokémon.");
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error al obtener los detalles del Pokémon:", error);
  }
}

// Llamado de función

obtenerDetallesPokemon("pikachu").then((detalles) => console.log(detalles));

async function obtenerHabilidadesPokemon(nombrePokemon) {
  try {
    const detallesPokemon = await obtenerDetallesPokemon(nombrePokemon);
    const habilidades = detallesPokemon.abilities.map(
      (habilidad) => habilidad.ability.name
    );
    return habilidades;
  } catch (error) {
    console.error("Error al obtener las habilidades del Pokémon:", error);
  }
}

// Llamado de función

obtenerHabilidadesPokemon("pikachu").then((habilidades) =>
  console.log(habilidades)
);

async function obtenerPokemonPorTipo(tipoPokemon) {
  try {
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/type/${tipoPokemon}`
    );
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la información del tipo de Pokémon.");
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error(
      "Error al obtener la información del tipo de Pokémon:",
      error
    );
  }
}

// Llamado de función

obtenerPokemonPorTipo("water").then((infoTipo) => console.log(infoTipo));

async function obtenerListaPrimerosPokemon() {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!respuesta.ok) {
      throw new Error(
        "No se pudo obtener la lista de los primeros 50 Pokémon."
      );
    }
    const datos = await respuesta.json();
    return datos.results;
  } catch (error) {
    console.error(
      "Error al obtener la lista de los primeros 50 Pokémon:",
      error
    );
  }
}

// Llamado de función

obtenerListaPrimerosPokemon().then((lista) => console.log(lista));

async function obtenerInfoEvolucionPokemon(nombrePokemon) {
  try {
    const detallesPokemon = await obtenerDetallesPokemon(nombrePokemon);
    const especieURL = detallesPokemon.species.url;
    const especieRespuesta = await fetch(especieURL);
    if (!especieRespuesta.ok) {
      throw new Error(
        "No se pudo obtener la información de la especie del Pokémon."
      );
    }
    const especieDatos = await especieRespuesta.json();
    const evolucionURL = especieDatos.evolution_chain.url;
    const evolucionRespuesta = await fetch(evolucionURL);
    if (!evolucionRespuesta.ok) {
      throw new Error(
        "No se pudo obtener la información de la evolución del Pokémon."
      );
    }
    const evolucionDatos = await evolucionRespuesta.json();
    let nombreEvolucion = null;
    let tipoEvolucionPokemon = null;
    if (
      evolucionDatos.chain &&
      evolucionDatos.chain.evolves_to &&
      evolucionDatos.chain.evolves_to.length > 0
    ) {
      const tipoEvolucion =
        evolucionDatos.chain.evolves_to[0].evolves_to[0].species.url;
      const respuestaTipoEvolucion = await fetch(tipoEvolucion);
      const detallesPokemonEvolucion = await respuestaTipoEvolucion.json();
      nombreEvolucion = detallesPokemonEvolucion.name;
      const respuestaPokemonEvolucion = await obtenerDetallesPokemon(
        nombreEvolucion
      );
      tipoEvolucionPokemon = respuestaPokemonEvolucion.types[0].type.name;
    }
    return { nombreEvolucion, tipoEvolucionPokemon };
  } catch (error) {
    console.error(
      "Error al obtener la información de la evolución del Pokémon:",
      error
    );
  }
}

// Llamado de función compuesta

obtenerInfoEvolucionPokemon("pikachu").then((infoEvolucion) =>
  console.log(infoEvolucion)
);
