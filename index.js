const apikey = 'd6ad8daf';

async function findMovie() {
    let movieName = document.getElementById("input").value;
    if(movieName){
        document.getElementById("displayResult").innerHTML = null;
        try {
        // const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&t=${movieName}`;  for specific movie name
           const url = `http://www.omdbapi.com/?apikey=${apikey}&s=${movieName}`;

            let response = await fetch(url);
            let data = await response.json();
            console.log(data);

            if(response){
                //we got array of objects so we gonna use array destructuring here  imdbid = https://www.imdb.com/title/<ID_here>/
                
                let showResult = data.Search.forEach(({Title, Year, Poster, Type, imdbID}, index) => {

                                    let div = document.createElement("div");
                                    div.classList.add("card-container");
                                    div.id = index;
                                    div.innerHTML =`<h1>${Title} </h1>
                                                    <span>${Type}</span> 
                                                    <span> ${Year}</span>
                                                    <img src=${Poster} width="300px">
                                                    `

                                    document.getElementById("displayResult").appendChild(div);               

                                    div.onclick= ()=> {
                                        window.location.href = `https://www.imdb.com/title/${imdbID}/`;
                                        console.log(imdbID)
                                    }
                                   
                })
                
            }
    
      
        } catch (error) {
            console.error("cannot find movie", error);
            let errorMsg = `<span>Please enter a Movie name</span>`;
            document.getElementById("displayResult").innerHTML += errorMsg;
        }
    }
    else{
        console.error("Enter a movie name")
    }
   
}
