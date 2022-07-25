const pokemonName = document.querySelector('.pokemonName');
const pokemonNum = document.querySelector('.pokemonNum');
const pokemonIMG = document.querySelector('.pokemonIMG');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');

//BUTTONS 
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;

pokemonIMG


const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonNum.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonIMG.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNum.innerHTML = data.id;
        pokemonIMG.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonIMG.style.display = 'none';
        pokemonName.innerHTML = 'Not found :('
        pokemonNum.innerHTML = '';
    }
    
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase())
});


//BUTTONS
buttonPrev.addEventListener('click', () =>{
   if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);}
});
buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);