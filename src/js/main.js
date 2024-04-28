'use strict';

const btnSearch = document.querySelector('.js_btn-search');
const btnreset = document.querySelector('.js_btn-reset');
const ulListFav = document.querySelector('.js_fav-list');

const inputSearch = document.querySelector('.js_search');
const ulListResults = document.querySelector('.js_result-list');

let cocktailsData = [];
let favDrinks = [];



const renderOneDrink = (eachDrink) => {
    let html= "";
    const indexFav = favDrinks.findIndex((item) => item.id === eachDrink.id
  );

  let classCss = indexFav === -1 ? '' : 'fav';

        html = `<li class="js_drinks" id="${eachDrink.id}">
        <h4>${eachDrink.name}</h4>
        <div class="js_drink-img" style="background-image: url(${eachDrink.image});"></div>`;
    
        for ( const iterator of eachDrink.name) {
            html += `<img src="${eachDrink.image}" alt="${eachDrink.name}" class="js_drink-img">`;
        }
        html += `</li>`;

        return html;
};


const addFavorite = (ev) => {

  const liClickedId = ev.currentTarget.id;
  const clickedDrinkData = cocktailsData.find((item) => item.id === liClickedId

  );

  const favoriteLiClicked = favDrinks.findIndex((item) => item.id === liClickedId

  );

  if (favoriteLiClicked === -1) {
    favDrinks.push(clickedDrinkData);
  } else{
    favDrinks.splice(favoriteLiClicked, 1);
   }

   renderAllDrinks(cocktailsData);
   localStorage.setItem('favDrinks', JSON.stringify(favDrinks));

 
    
};

const renderAllDrinks = (array) => {
    ulListResults.innerHTML= '';
    for (let i=0; i<array.length; i++) {
        ulListResults.innerHTML += renderOneDrink(array[i]);
    }

    const allDrinksLi = document.querySelectorAll('.js_drinks');
    for (const li of allDrinksLi) {
        li.addEventListener('click', addFavorite);
    }

};




const getData = () => {
    fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
    )
      .then((response) => response.json())
      .then((data) => {
        cocktailsData = data.drinks;
        renderAllDrinks(cocktailsData);
        localStorage.setItem('drinks', JSON.stringify(cocktailsData));
        
      });
  };

  const handleSearch = () => {
    const valueSearch = inputSearch.value;
    const filteredDrinks = cocktailsData.filter((item) =>
      item.name.toLowerCase().includes(valueSearch.toLowerCase())
    
    );
    renderAllDrinks(filteredDrinks);

   
  };

  const init = () => {
   
    const drinksFavLocal = localStorage.getItem('favDrinks');
     if (drinksFavLocal !== null) {
     favDrinks = JSON.parse(drinksFavLocal);
     renderAllDrinks(cocktailsData);
     }

     const drinksLocal = localStorage.getItem('drinks');
     if (drinksLocal !== null) {
     cocktailsData = JSON.parse(drinksLocal);
     renderAllDrinks(cocktailsData);
    } else {
     getData();
  
    }
  };


init();
inputSearch.addEventListener("input", handleSearch);





