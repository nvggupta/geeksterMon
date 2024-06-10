const input = document.getElementById("input");
const reset = document.getElementById("reset");
const API_cards = "https://pokeapi.co/api/v2/pokemon/"
async function searching(inputs){
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/type/${inputs}`);
            if(response.ok)
                {
                    const data = await response.json();
                    console.log(data);
                }
                else{
                    alert("No Data Fetch");
                }

        }
        catch(e){
            console.log("error" ,e);
        }
}
input.addEventListener("change" , ()=>{
        searching(input.value);
   
})