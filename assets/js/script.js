const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const pokedex = document.querySelector(".pokedex")

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnShiny = document.querySelector(".shiny")

let searchPokemon = 1, bShiny = false

async function fetchPokemon(pokemon){

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }

    
}

async function renderPokemon(pokemon){
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    pokemonImage.style.display = 'none'
    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display='block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        searchPokemon = data.id;
    
        sprite = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        if(bShiny){
            sprite = data.sprites.versions['generation-v']['black-white'].animated.front_shiny;
        }
        pokemonImage.style.height = '18%';
        pokemonImage.style.bottom = '55%';
        if(sprite == null){
            sprite = data.sprites.front_default;
            if(bShiny){
                sprite = data.sprites.front_shiny;
            }
            pokemonImage.style.height = '25%';
            pokemonImage.style.bottom = '52.5%';
    
            if(sprite == null){
                sprite = 'assets/imagens/incog.png';
                pokemonImage.style.height = '18%';
                pokemonImage.style.bottom = '55%';
            }
        }
        pokemonImage.src = sprite
        input.value = ''
    }else{
        pokemonImage.style.display = 'none'
        pokemonNumber.innerHTML = '404'
        pokemonName.innerHTML = 'Not Found :('
    }

    
}

form.addEventListener('submit', (event)=>{
    event.preventDefault()

    renderPokemon(input.value.toLowerCase())
    
})

btnPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon-=1
        renderPokemon(searchPokemon)
    }
})
btnNext.addEventListener('click', ()=>{
    if(searchPokemon < 905){
        searchPokemon+=1;
        renderPokemon(searchPokemon)
    }
})

btnShiny.addEventListener('click', ()=>{
    if(bShiny){
        bShiny = false
        pokedex.src = 'assets/imagens/pokedex.png'
    }else{
        bShiny = true
        pokedex.src = 'assets/imagens/pokedex-s.png'
    }
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)