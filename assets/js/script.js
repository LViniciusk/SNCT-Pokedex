const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const pokedex = document.querySelector(".pokedex")
const type1 = document.querySelector(".type1")
const type2 = document.querySelector(".type2")
const tMale = document.querySelector(".t__male")
const tFemale = document.querySelector(".t__female")

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnShiny = document.querySelector(".shiny")
const btnMale = document.querySelector(".male")
const btnFemale = document.querySelector(".female")

let searchPokemon = 1, bShiny = false, male = true, female = false
let vtype1, vtype2, meme=false, Nmeme, Numeme

async function fetchPokemon(pokemon){

    switch(pokemon) {
        case '13.984.356.982':
            meme = true
            Nmeme = 'gato'
            Numeme = '4002'
            female = true; male = false
            btnMale.style.scale = '0.9'
            btnFemale.style.scale = '1.1'
            break;
        case '14.512':
            meme = true
            Nmeme = 'yScroww'
            Numeme = '69'
            female = false; male = true;
            btnMale.style.scale = '1.1'
            btnFemale.style.scale = '0.9'
            break;
        case '2.469':
            meme = true
            Nmeme = 'fire-chan'
            Numeme = '24'
            female = false; male = true;
            btnMale.style.scale = '1.1'
            btnFemale.style.scale = '0.9'
            break;
        case '69.420':
            meme = true
            Nmeme = 'ohomemsegredos'
            Numeme = '??'
            female = false; male = true;
            btnMale.style.scale = '1.1'
            btnFemale.style.scale = '0.9'
            break;
        default:
            meme = false
    }
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
    type1.src = '#'
    type2.src = '#'
    btnMale.style.background = '#8a1ae6'
    tMale.innerHTML = '♂'
    btnFemale.style.background = '#ee2a2a'
    tFemale.innerHTML = '♀'
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
        vtype1 = data.types['0'].type.name
        type1.src = `assets/imagens/types/Icon_${vtype1}.webp`
        vtype2 = data.types['1'].type.name
        type2.src = `assets/imagens/types/Icon_${vtype2}.webp`
        input.value = ''
    }else if(meme){
        pokemonImage.src = `assets/imagens/meme/${Nmeme}.png`

        pokemonName.innerHTML = Nmeme;
        pokemonNumber.innerHTML = Numeme;

        type1.src = `assets/imagens/types/comunidade.png`
        if(Nmeme = 'ohomemsegredos'){
            type2.src = `assets/imagens/types/segredo.png`
            btnMale.style.background = '#333'
            tMale.innerHTML = '?'
            btnFemale.style.background = '#333'
            tFemale.innerHTML = '?'
            btnMale.style.scale = '1'
            btnFemale.style.scale = '1'

        }


        input.value = ''
    }else{
        pokemonImage.style.display = 'none'
        pokemonNumber.innerHTML = '404'
        pokemonName.innerHTML = 'Not Found :('
        input.value = ''
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
    }else if(searchPokemon < 1 || searchPokemon > 905){
        renderPokemon(1)
    }
})
btnNext.addEventListener('click', ()=>{
    if(searchPokemon < 905){
        searchPokemon+=1;
        renderPokemon(searchPokemon)
    }else if(searchPokemon > 905 || searchPokemon < 1){
        renderPokemon(905)
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
        btnFemale.style.scale = '0.9'
    }
    renderPokemon(searchPokemon)
})

btnFemale.addEventListener('click', ()=>{
    if(!female){
        male = false
        female = true
        btnMale.style.scale = '0.9'
        btnFemale.style.scale = '1.1'
    }
    renderPokemon(searchPokemon)
})
renderPokemon(searchPokemon)