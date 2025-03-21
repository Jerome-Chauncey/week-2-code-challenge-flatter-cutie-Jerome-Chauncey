document.addEventListener("DOMContentLoaded", () => {
  fetchCharacters(); //we want the html to load before the fetch characters function
});

function fetchCharacters() {
  fetch("http://localhost:3005/characters") //fetch our character data, this is a GET fetch
  .then(response => response.json()) //convert our resp to json
    .then(data =>{
        const characterBar = document.getElementById("character-bar");
        data.forEach(character =>{ //loop through the data in db.json and grab the names
            const span = document.createElement("span") //creating a span element
            span.textContent = character.name; //set text to character name
            span.classList.add("character");//I will COME BACK AND STYLE THIS!!
            span.addEventListener("click", () => displayCharacterDetails(character));
            characterBar.appendChild(span); // add the span to the character-bar div
        })
    })

    
}




function displayCharacterDetails(character){
    const name = document.getElementById("name");
    const image = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");

    name.textContent = character.name; //update the elements with the character's data
    image.src = character.image;
    image.alt = character.name;
    voteCount.textContent = character.votes;
}


document.getElementById("votes-form").addEventListener("submit", (event) =>{
    event.preventDefault(); 
    const form = document.getElementById("votes-form")
    
    const votesInput = document.getElementById("votes").value; //this captures the placeholder Enter Votes
    const voteTotal = document.getElementById("vote-count")//this captures the h4 span to display the total votes
    


    let votes = parseInt(voteTotal.textContent)//gets the total votes and displays it in the h4 span/ also changes the string to a number by using parseInt/ also saves it in the votes variable
    let newVotes = parseInt(votesInput)//changes the string input to a number that the user has keyed in/also saves it in the newVotes variable
    
    if(!isNaN(newVotes) && newVotes > 0){

        let updatedVotes = votes + newVotes; //add new votes to votes(total)
        voteTotal.textContent = updatedVotes

        updateVotesinDb(updatedVotes);//call function to update the database

        // logEntries(newVotes);//call function to log the vote


    }else{
        alert("Enter a valid number!")
    }

    form.reset()
})


