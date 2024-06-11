const input = document.getElementById("input");
const reset = document.getElementById("reset");
const cardContainer = document.getElementById("card");
const select = document.getElementById("select");
const filter = document.getElementById("filter");
const color = {
    grass: "green",
    fire: "orange",
    water: "navyblue",
    poison: "lightgreen",
    electric: "whitesmoke",

}
select.addEventListener('change', () => {
    const value = select.value;
    console.log(value);
});

filter.addEventListener('click', () => {
    const value = select.value;
    const cards = document.querySelectorAll(".card");
    cards.forEach((el) => {
        const types = el.querySelector(".type").textContent.toLowerCase();
        if (types.includes(value.toLowerCase())) {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    });
});
reset.addEventListener('click' , ()=>{
    location.reload();
})
const createNewCard = (pokemon) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front-card">
            <div class="slNo">#<span class="slNo">${pokemon.id}</span></div>
            <img class="img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <h3 class="name">${pokemon.name}</h3>
            <h6 class="type">${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</h6>
        </div>
        <div class="back-card">
            <img src="" alt="" />
            <h3 class="name">Dragon</h3>
            <p class="utilities">Utilities:</p>
        </div>
    `;
    return card;
}

const searching = async (input) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Error occurred");
        }
    } catch (e) {
        console.log("Error Occurred", e);
    }
}

const fetchData = async () => {  
    for (let i = 1; i <= 151; i++) {
        const data = await searching(i);
        if (data) {
            const card = createNewCard(data);
            cardContainer.appendChild(card);
        }
    }
}

fetchData();
const searchCard = (inputValue) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const name = card.querySelector(".name").textContent.toLowerCase();
        console.log(name);
        if (name.includes(inputValue.toLowerCase())) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

input.addEventListener("input",()=>{
   searchCard(input.value);
   
})