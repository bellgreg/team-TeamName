document.addEventListener('DOMContentLoaded', function() {
    getRandomPokemon();
});

async function getRandomPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        if (!response.ok) {
            throw new Error('Failed to fetch random Pokémon');
        }
        const data = await response.json();
        const randomPokemon = data.results[Math.floor(Math.random() * data.results.length)];
        const pokemonData = await fetchPokemonData(randomPokemon.url);
        displayPokemon(pokemonData);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch random Pokémon');
    }
}

async function fetchPokemonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch Pokémon data');
    }
}

function displayPokemon(pokemon) {
    document.getElementById('pokemonTitle').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById('pokemonImage').src = pokemon.sprites.front_default;
    document.getElementById('pokemonDescription').textContent = 'Random Pokémon';
    displayAbilities(pokemon.abilities);
    displayMoves(pokemon.moves);
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
