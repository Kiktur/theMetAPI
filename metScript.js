// base URL https://collectionapi.metmuseum.org/public/collection/v1/
// https://collectionapi.metmuseum.org/public/collection/v1/objects

const pageImage = document.getElementById("object-image");
const artTitle = document.getElementById("art-title");
const countryTitle = document.getElementById("country-info");
const cultureTitle = document.getElementById("culture-info");
const dimensionTitle = document.getElementById("dimension-info");
const mediumTitle = document.getElementById("medium-info");
const departmentTitle = document.getElementById("department-info");
const imageBackup = document.getElementById("image-backup");
const artContainer = document.getElementById("art-container");
const artLines = document.getElementsByClassName("art-info");
const header = document.getElementById("header");
const fetchButton = document.getElementById("fetch-button");

// https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers


// https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}
function getObject() {
    let id = document.getElementById("object-id-input").value;
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          if (!data["accessionNumber"]) {
            imageBackup.style.display = "inline";
            imageBackup.innerHTML = "Object ID not found";
            pageImage.src = "";
            pageImage.style.display = "none";
            
            for (let i = 1; i < 7; i++) {
              artLines[i].innerHTML = "";
              artLines[i].style.display = "none";
            }

          } else {
            for (let i = 0; i < 7; i++) {
              artLines[i].style.display = "inline";
            }
            if (data["primaryImageSmall"]!= '') {
              pageImage.style.display = "inline";
              pageImage.src = data["primaryImageSmall"];
              imageBackup.style.display = "none";
            } else {
              pageImage.src = "";
              imageBackup.innerHTML = "Image not available";
            }
            
            if (data["title"]!= '') {
              artTitle.innerHTML = `Title: ${data["title"]}`;
            } else {
              artTitle.innerHTML = "Title: Not available";
            }
  
            if (data["country"] != '') {
              countryTitle.innerHTML = `Country of Origin: ${data["country"]}`;
            } else {
              countryTitle.innerHTML = 'Country of Origin: Not available';
            }
            
            if (data["culture"] != '') {
              cultureTitle.innerHTML = `Culture: ${data["culture"]}`;
            } else {
              cultureTitle.innerHTML = "Culture: Not available";
            }
  
            if (data["dimensions"] != '') {
              dimensionTitle.innerHTML = `Dimensions: ${data["dimensions"]}`;
            } else {
              dimensionTitle.innerHTML = "Dimensions: Not available";
            }
            
            if (data["medium"] != '') {
              mediumTitle.innerHTML = `Medium: ${data["medium"]}`;
            } else {
              mediumTitle.innerHTML = "Medium: Not available";
            }

            if (data["isHighlight"] == true) {
              //Note from previous attempt below
              //Repeated line because the RED ITEMS LIST SHORTENS TO ONE ITEM AFTER YOU REMOVE THE CLASS NAME
              //I'm an idiot
              header.className = header.className.replace("red-scheme", "gold-scheme");
              fetchButton.className = fetchButton.className.replace("red-scheme", "gold-scheme");
            } else if (header.className.includes("gold-scheme") == true) {
              header.className = header.className.replace("gold-scheme", "red-scheme");
              fetchButton.className = fetchButton.className.replace("gold-scheme", "red-scheme");
            }


          }

      })
      .catch(function() {
        console.log("Error occurred");
      });
  }

