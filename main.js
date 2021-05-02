const poke_display = document.getElementById('poke_display')
const poke_form = document.getElementById('poke_form')
const poke_input_buscar = document.getElementById('poke_input_buscar')
// 
const last_busquedas = document.getElementById('last_busquedas')
const memoria = []
const memoriaMax = 8

async function getPokemon(name) {
  try {
    const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/'+ name)
    const data = await respuesta.json()

    let abilidades = ''
    data.abilities.forEach(element => {
      abilidades += `<span class="poke-abilidad">${element.ability.name}</span>` 
    });

    poke_display.innerHTML= `
      <div class="poke-display-box">
        <img src="${data.sprites.front_shiny}" alt="">
        <img src="${data.sprites.back_shiny}" alt="">
        <p class="poke-display-nombre">${data.name}</p>
        <div class="poke-display-abilidades">
          ${abilidades}
        </div>
      </div>
    `
    addPokemon(name)
  } catch (error) {
    console.log(error)
  }
}
getPokemon('pikachu')

const addPokemon = (name) => {
  memoria.unshift(name)
  let nombres = ''
  let cont = 0
  memoria.forEach(element => {
    if (cont > memoriaMax) {
      return
    }
    nombres += `<span class="poke-memoria-nombre">${element}</span>` 
    cont++
  });
  last_busquedas.innerHTML = nombres
}

poke_form.addEventListener('submit', (e) => {
  const nombre = e.target.poke_input_buscar.value.toLowerCase()
  e.preventDefault()
  if (!nombre.trim()) {
    return
  }
  
  getPokemon(nombre)

})