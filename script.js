// base URL https://collectionapi.metmuseum.org/public/collection/v1/
// https://collectionapi.metmuseum.org/public/collection/v1/objects

// https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers

//https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers
// https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}

const resultsText = document.getElementById("results-text");
const searchResults = document.getElementById("search-results");
let firstSearch = false;



// START OF ID EVALUATION FUNCTIONS; UNCOMMENT THESE FOR PROPER VALIDATION 

/* function interpret(message) {
  if (message == 'Not a valid object') {
    return false;
  }
  return true;
}

async function isValid(idNumber) {
  const message = fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${idNumber}`)
  .then((response) => response.json())
  .then((data) => {
   // console.log(message);
    return data["message"];
  });

const check = async () => {
  const a = await message;
  console.log(a);
  return a;
};

const eval = await check();
  if (eval == 'Not a valid object') {
    console.log("Got em");
    return false;
  } else {
    console.log("chill");
    return true;
  }
  
} */

// END OF FORM VALIDATION FUNCTIONS


function retrieve(idNumber, resultElement) {
  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${idNumber}`)
  .then((response) => response.json())
  .then((data) => {
      
      if (data["primaryImageSmall"] == '') {
        resultElement.children[0].src = "images/no-image-placeholder.png";
      } else {
        resultElement.children[0].src = data["primaryImageSmall"];
      }
      
      resultElement.children[1].children[0].innerHTML = data["title"];
      
      let firstInfo = "";
      if (data["artistDisplayName"]) {
        firstInfo = data["artistDisplayName"];
      } else {
        firstInfo = data["culture"];
      }

      let date = "";
      if (data["objectDate"]) {
        date = data["objectDate"];
      }

      if (firstInfo != "") {
        resultElement.children[1].children[1].innerHTML = firstInfo;
        if (date != "") {
          resultElement.children[1].children[1].innerHTML = firstInfo + ", " + date;
        }
      } else if(date != "") {
        resultElement.children[1].children[1].innerHTML = date;
      }
  })
}




async function search() {
  if (firstSearch == false) {
    for (let i = 0; i < 12; i++) {
      searchResults.children[i].classList.toggle("hidden");
    }
    firstSearch = true;
  }
    let tag = document.getElementById("object-tag-input").value;
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${tag}`)
      .then((response) => response.json())
      .then(async (data) => {
          console.log(data);
          if (data["total"] > 10000) {
            resultsText.innerHTML = "Showing tens of thousands of results";
          } else if (data["total"] > 1000) {
            resultsText.innerHTML = Math.floor(data["total"] / 1000) + "," + (data["total"] % 1000) + " results for " + tag;
          } else {
            resultsText.innerHTML = data["total"] + " results for " + tag;
          }
          
          
        //  let IDindex = 0;
          for (let i = 0; i < 12; i++) {

            // THIS SECTION IS USED FOR VALIDATION OF ID NUMBERS. Does not provide routine experience upgrades, but faulty object IDs do come up sometime */
            // Validation does slow down the site by a noticable amount. Do with this what you will


           /* if (isValid(data["objectIDs"][IDindex])) {     
              retrieve(data["objectIDs"][IDindex], searchResults.children[i]);
              IDindex++;
            } else {
              console.log("Another gotcha");
              IDindex++;
              while ((await isValid(data["objectIDs"][IDindex]) == false)) {
                IDindex++;
              } */

              /* END OF VALIDATION CALLS */

              retrieve(data["objectIDs"][i], searchResults.children[i]);
          //    IDindex++;


           // }   Additional bracket needed for validation implementation
            
          }
          

      })
      .catch(function() {
        console.log("Error occurred");
      });
  }


let tagInput = document.getElementById("object-tag-input");
tagInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        search();
    }
});


//search("wolf"); // Used for styling
