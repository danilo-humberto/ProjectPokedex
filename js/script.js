const input = document.getElementById('input')
const namePokemon = document.querySelector('.name')
const idPokemon = document.querySelector('.id')
const imageGif = document.querySelector('.image')
const form = document.querySelector('.form')

// STATS

const hp = document.querySelector('.hp')
const atk = document.querySelector('.atk')
const def = document.querySelector('.def')
const speed = document.querySelector('.speed')

// TYPES

const ulType = document.querySelector('.types-list')


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
    hp.innerHTML = ''
    atk.innerHTML = ''
    def.innerHTML = ''
    speed.innerHTML = ''
    ulType.innerHTML = ''

    const data = await fetchPokemon(id)
    console.log(data);

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
            ulType.appendChild(liType)
        })

    } else {
        namePokemon.innerHTML = "Not Found"
        idPokemon.innerHTML = ''
        imageGif.style.display = 'none'
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    showResult(input.value.toLowerCase())
    input.value = ''
    imageGif.style.display = 'block'
})

showResult(1)

const toggleBtn = document.querySelector('.btn')
const content = document.querySelector('.content')
const container = document.querySelector('#container')

toggleBtn.addEventListener('click', () => {
    content.style.display = 'none'
    container.style.display = 'block'
})