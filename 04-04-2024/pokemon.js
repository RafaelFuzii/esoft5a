window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const evolution = params.get('evolucao');

    if (evolution) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${evolution}`)
            .then(response => response.json())
            .then(data => {
                const pokemonImg = document.createElement('img');
                pokemonImg.src = data.sprites.front_default;
                pokemonImg.alt = data.name;

                document.getElementById('pokemon-info').appendChild(pokemonImg);
                const pokemonNameHeader = document.getElementById('poke-name');
                const NamePokemon = data.name;
                const firstChar = NamePokemon.charAt(0).toUpperCase()
                const remain = NamePokemon.slice(1)
                const nameComplete = firstChar + remain
                
                pokemonNameHeader.querySelector('h1').textContent = nameComplete;

                const infoPokemon = document.getElementById('evolucao-label');
                const infoPokemonH2 = "Infomação Sobre " + nameComplete;
                infoPokemon.textContent = infoPokemonH2;


            })
            .catch(error => console.error('Erro ao carregar o Pokémon:', error));
    }
};
