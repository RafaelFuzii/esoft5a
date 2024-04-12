function changePageTitle(title) {
    document.title = title
  }
  
  function generateInfoSection(src, pokemonName, sprites) {
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${pokemonName}`

    const img = document.createElement('img')
    img.src = src
    img.alt = `Imagem do pokemon ${pokemonName}`

    const section = document.querySelector('#info-pokemon')

    section.appendChild(h2)
    section.appendChild(img)

    
    const spriteValues = Object.values(sprites)
    const imageLinks = spriteValues.filter(sprite => typeof sprite === 'string')

    img.addEventListener('click', function() {
        const nextIndex = (imageLinks.indexOf(img.src) + 1) % imageLinks.length
        img.src = imageLinks[nextIndex]
    })
}

  
  async function getPokemonData(name) {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //   .then((fetchData) => {
    //     return fetchData.json()
    //   })
    //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
    //   .catch((error) => console.error(error))
  
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  
      const jsonData = await data.json()
  
      generateInfoSection(jsonData.sprites.front_default, name, jsonData.sprites)
    } catch (error) {
      console.error(error)
    }
  }
  
  function getSearchParams() {
    // Early return -> Caso location search, não faz nada.
    if (!location.search) {
      return
    }
  
    // URLSearchParams é uma classe que facilita a manipulação de query strings
    const urlSearchParams = new URLSearchParams(location.search)
  
    // Pegando o valor do parâmetro name
    const pokemonName = urlSearchParams.get('name')
  
    changePageTitle(`Pagina do ${pokemonName}`)
    getPokemonData(pokemonName)
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
  })

  document.addEventListener("DOMContentLoaded", function() {
    const date = new Date()
    options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const dateFormat = new Intl.DateTimeFormat("pt-BR", options).format(date)

    if (localStorage.getItem('contadorVisitas')) {
        var contadorVisitas = JSON.parse(localStorage.getItem('contadorVisitas'))
        contadorVisitas.count++
        contadorVisitas.lastVisit = dateFormat
    } else {
        var contadorVisitas = {
            count: 1,
            lastVisit: dateFormat
        }
    }
    localStorage.setItem('contadorVisitas', JSON.stringify(contadorVisitas))

    var footerP = document.getElementById("countVisita")
    if (footerP) {
      footerP.innerHTML = "Esta página foi visitada " + contadorVisitas.count + " vezes. A última visita foi: " + contadorVisitas.lastVisit;
    }
})

