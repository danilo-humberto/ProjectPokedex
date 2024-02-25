const input = document.getElementById('input')
const namePokemon = document.querySelector('.name')
const idPokemon = document.querySelector('.idPokemon')
const imageGif = document.querySelector('.image')
const btnSearch = document.querySelector('.btnSearch')

// STATS

const hp = document.querySelector('.hp')
const atk = document.querySelector('.atk')
const def = document.querySelector('.def')
const speed = document.querySelector('.speed')

// TYPES

const ulType = document.querySelector('.types-list')

// COLORS

const colors = {
    fire: "#FF7F50",
    water: "#1E90FF",
    grass: "#2E8B57",
    flying: "#87CEEB",
    fighting: "#B22222",
    poison: "#EE82EE",
    electric: "#EEDD82",
    ground: "#DAA520",
    rock: "#B8860B",
    psychic: "#FF69B4",
    ice: "#AFEEEE",
    bug: "#8FBC8F",
    ghost: "#9370DB",
    steel: "#778899",
    dragon: "#9932CC",
    dark: "#A0522D",
    fairy: "#FFC0CB"
}

const mainTypes = Object.keys(colors)


const toggleBtn = document.querySelector('.btn')
const content = document.querySelector('.content')
const container = document.querySelector('#container')

toggleBtn.addEventListener('click', () => {
    content.style.display = 'none'
    container.style.display = 'flex'
})

// FUNCTIONS

const fetchPokemon = async (pokemon) => {
    const resultAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(resultAPI.status == 200){
        const data = await resultAPI.json()
        return data
    }
}

const showResult = async (id) => {

    idPokemon.innerHTML = ''
    namePokemon.innerHTML = "loading..."
    hp.innerHTML = 'x'
    atk.innerHTML = 'x'
    def.innerHTML = 'x'
    speed.innerHTML = 'x'
    ulType.innerHTML = ''

    const data = await fetchPokemon(id)

    if (data){
        ulType.innerHTML = ''
        namePokemon.innerHTML = data.name
        idPokemon.innerHTML = data.id

        imageGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        hp.innerHTML = data.stats[0].base_stat
        atk.innerHTML = data.stats[1].base_stat
        def.innerHTML = data.stats[2].base_stat
        speed.innerHTML = data.stats[5].base_stat

        const type = data.types

        type.forEach(t => {
            const liType = document.createElement('li')
            liType.innerHTML = t.type.name

            const colorType = mainTypes.find(ty => ty === t.type.name)
            const color = colors[colorType]

            if(color) {
                liType.style.backgroundColor = color
            }
            ulType.appendChild(liType)
        })

    } else {
        namePokemon.innerHTML = "Not Found"
        idPokemon.innerHTML = ''
        imageGif.style.display = 'none'
    }

}

btnSearch.addEventListener('click', (e) => {
    e.preventDefault()
    if(!input.value == '') {
        showResult(input.value.toLowerCase())
        input.value = ''
        input.blur()
        imageGif.style.display = 'block' 
    } else {
        alert('preencha a caixa de pesquisa')
    }
})

showResult(1)

