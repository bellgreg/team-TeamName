document.getElementById('pokemonForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    getPokemonData(pokemonName);
});

async function getPokemonData(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon = await response.json();

        const speciesResponse = await fetch(pokemon.species.url);
        const species = await speciesResponse.json();

        displayPokemon(pokemon, species);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        alert('Error fetching Pokémon data');
    }
}

function displayPokemon(pokemon, species) {
    document.getElementById('pokemonInfo').classList.remove('d-none');
    document.getElementById('pokemonTitle').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById('pokemonImage').src = pokemon.sprites.front_default; // Set Pokémon picture

    displayAbilities(pokemon.abilities);
    displayMoves(pokemon.moves);
    displayDescription(species);
}

function displayDescription(species) {
    const descriptionText = getDescription(species);
    document.getElementById('pokemonDescription').textContent = descriptionText;
}

function getDescription(species) {
    return species.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
}

function displayAbilities(abilities) {
    const abilitiesList = document.getElementById('pokemonAbilities');
    abilitiesList.innerHTML = '';

    abilities.forEach(ability => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = ability.ability.name;
        abilitiesList.appendChild(listItem);
    });
}

function displayMoves(moves) {
    const movesList = document.getElementById('pokemonMoves');
    movesList.innerHTML = '';

    moves.forEach(move => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = move.move.name;
        movesList.appendChild(listItem);
    });
}
