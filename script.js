document.getElementById('search-button').addEventListener('click', async () => {
    const input = document.getElementById('search-input').value.trim().toLowerCase();
    const pokemonDetails = {
        'pikachu': {
            name: 'PIKACHU',
            id: 25,
            weight: 'Weight: 60',
            height: 'Height: 4',
            hp: 35,
            attack: 55,
            defense: 40,
            specialAttack: 50,
            specialDefense: 50,
            speed: 90,
            types: ['ELECTRIC'],
            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
        },
        '94': {
            name: 'GENGAR',
            id: 94,
            weight: 'Weight: 405',
            height: 'Height: 15',
            hp: 60,
            attack: 65,
            defense: 60,
            specialAttack: 130,
            specialDefense: 75,
            speed: 110,
            types: ['GHOST', 'POISON'],
            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png'
        }
    };

    const clearPreviousResults = () => {
        document.getElementById('pokemon-name').innerText = '';
        document.getElementById('pokemon-id').innerText = '';
        document.getElementById('weight').innerText = '';
        document.getElementById('height').innerText = '';
        document.getElementById('hp').innerText = '';
        document.getElementById('attack').innerText = '';
        document.getElementById('defense').innerText = '';
        document.getElementById('special-attack').innerText = '';
        document.getElementById('special-defense').innerText = '';
        document.getElementById('speed').innerText = '';
        document.getElementById('types').innerHTML = '';
        const sprite = document.getElementById('sprite');
        if (sprite) sprite.src = '';
    };

    clearPreviousResults();

    if (pokemonDetails[input]) {
        const data = pokemonDetails[input];
        document.getElementById('pokemon-name').innerText = data.name;
        document.getElementById('pokemon-id').innerText = `#${data.id}`;
        document.getElementById('weight').innerText = data.weight;
        document.getElementById('height').innerText = data.height;
        document.getElementById('hp').innerText = `HP: ${data.hp}`;
        document.getElementById('attack').innerText = `Attack: ${data.attack}`;
        document.getElementById('defense').innerText = `Defense: ${data.defense}`;
        document.getElementById('special-attack').innerText = `Special Attack: ${data.specialAttack}`;
        document.getElementById('special-defense').innerText = `Special Defense: ${data.specialDefense}`;
        document.getElementById('speed').innerText = `Speed: ${data.speed}`;

        const typesDiv = document.getElementById('types');
        data.types.forEach(type => {
            const typeElement = document.createElement('p');
            typeElement.innerText = type;
            typesDiv.appendChild(typeElement);
        });

        const sprite = document.getElementById('sprite');
        sprite.src = data.sprite;
    } else {
        const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                document.getElementById('pokemon-name').innerText = data.name.toUpperCase();
                document.getElementById('pokemon-id').innerText = `#${data.id}`;
                document.getElementById('weight').innerText = `Weight: ${data.weight / 10} kg`;
                document.getElementById('height').innerText = `Height: ${data.height / 10} m`;
                document.getElementById('hp').innerText = `HP: ${data.stats[0].base_stat}`;
                document.getElementById('attack').innerText = `Attack: ${data.stats[1].base_stat}`;
                document.getElementById('defense').innerText = `Defense: ${data.stats[2].base_stat}`;
                document.getElementById('special-attack').innerText = `Special Attack: ${data.stats[3].base_stat}`;
                document.getElementById('special-defense').innerText = `Special Defense: ${data.stats[4].base_stat}`;
                document.getElementById('speed').innerText = `Speed: ${data.stats[5].base_stat}`;

                const typesDiv = document.getElementById('types');
                typesDiv.innerHTML = '';
                data.types.forEach(type => {
                    const typeElement = document.createElement('p');
                    typeElement.innerText = type.type.name.toUpperCase();
                    typesDiv.appendChild(typeElement);
                });

                const sprite = document.getElementById('sprite');
                sprite.src = data.sprites.front_default;
            } else {
                alert('Pokémon not found');
            }
        } catch (error) {
            alert('Error fetching Pokémon data');
        }
    }
});
