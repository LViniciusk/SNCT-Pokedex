const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const pokedex = document.querySelector(".pokedex")

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnShiny = document.querySelector(".shiny")
const btnMale = document.querySelector(".male")
const btnFemale = document.querySelector(".female")

let searchPokemon = 1, bShiny = false, male = true, female = false

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
        if(male){
            sprite = data.sprites.versions['generation-v']['black-white'].animated.front_default;
            if(bShiny){
                sprite = data.sprites.versions['generation-v']['black-white'].animated.front_shiny;
            }
        }else if(female){
            sprite = data.sprites.versions['generation-v']['black-white'].animated.front_female;
            if(sprite == null){
                sprite = data.sprites.versions['generation-v']['black-white'].animated.front_default;
            }
            if(bShiny){
                sprite = data.sprites.versions['generation-v']['black-white'].animated.front_shiny_female;
                if(sprite == null){
                    sprite = data.sprites.versions['generation-v']['black-white'].animated.front_shiny;
                }
            }
        }
        
        pokemonImage.style.height = '18%';
        pokemonImage.style.bottom = '55%';
        if(sprite == null){
            if(male){
                sprite = data.sprites.front_default;
                if(bShiny){
                    sprite = data.sprites.front_shiny;
                }
            }else if(female){
                sprite = data.sprites.front_female;
                if(sprite == null){
                    sprite = data.sprites.front_default;
                }
                if(bShiny){
                    sprite = data.sprites.front_shiny_female;
                    if(sprite == null){
                        sprite = data.sprites.front_shiny;
                    }
                }
                
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

btnMale.addEventListener('click', ()=>{
    if(!male){
        male = true
        female = false
        btnMale.style.scale = '1.1'
        btnFemale.style.scale = '1'
    }
    renderPokemon(searchPokemon)
})

btnFemale.addEventListener('click', ()=>{
    if(!female){
        male = false
        female = true
        btnMale.style.scale = '1'
        btnFemale.style.scale = '1.1'
    }
    renderPokemon(searchPokemon)
})
renderPokemon(searchPokemon)