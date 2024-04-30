
'use strict';

const btnSearch = document.querySelector('.js_btn-search');
const btnreset = document.querySelector('.js_btn-reset');
const ulListFav = document.querySelector('.js_fav-list');

const inputSearch = document.querySelector('.js_search');
const ulListResults = document.querySelector('.js_result-list');

let cocktailsData = [];
let favDrinks = [];



const renderOneDrink = (eachDrink) => {
    let html = "";
    const indexFav = favDrinks.findIndex((item) => item.id === eachDrink.idDrink);
    let classCss = indexFav === -1 ? '' : 'fav';
  
    html = `<li class="js_drinks ${classCss}" id="${eachDrink.idDrink}">
              <h4>${eachDrink.strDrink}</h4>
              <img src="${eachDrink.strDrinkThumb}" alt="${eachDrink.strDrink}" class="js_drink-img">
            </li>`;
  
    return html;
  };


const addFavorite = (ev) => {
    const liClickedId = ev.currentTarget.id;
    const clickedDrinkData = cocktailsData.find((item) => item.idDrink === liClickedId);
  
    const favoriteLiClicked = favDrinks.findIndex((item) => item.idDrink === liClickedId);
  
    if (favoriteLiClicked === -1) {
        favDrinks.push(clickedDrinkData);
        ev.currentTarget.classList.add('fav'); 
        const favListItem = document.createElement('li');
        favListItem.classList.add('js_drinks', 'fav');
        favListItem.id = liClickedId;
        favListItem.innerHTML = `<h4>${clickedDrinkData.strDrink}</h4>
                                 <img src="${clickedDrinkData.strDrinkThumb}" alt="${clickedDrinkData.strDrink}" class="js_drink-img">`;
        ulListFav.appendChild(favListItem); 
    } else {
        favDrinks.splice(favoriteLiClicked, 1);
        ev.currentTarget.classList.remove('fav'); 
        const favListItemToRemove = document.getElementById(liClickedId);
        favListItemToRemove.remove(); 
    }

    
    renderAllDrinks(cocktailsData);
  
    localStorage.setItem('favDrinks', JSON.stringify(favDrinks));
};




const renderAllDrinks = (array) => {
    let drinksHTML = ''; 
    for (let i = 0; i < array.length; i++) {
        const isFav = favDrinks.find((favDrink) => favDrink.idDrink === array[i].idDrink) !== undefined;
        const classCss = isFav ? 'fav' : ''; 
        
        drinksHTML += `<li class="js_drinks ${classCss}" id="${array[i].idDrink}">
                            <h4>${array[i].strDrink}</h4>
                            <img src="${array[i].strDrinkThumb}" alt="${array[i].strDrink}" class="js_drink-img">
                        </li>`; 
    }
    ulListResults.innerHTML = drinksHTML; 

    const allDrinksLi = document.querySelectorAll('.js_drinks');
    allDrinksLi.forEach((li) => {
        li.addEventListener('click', (event) => {
            addFavorite(event);
            if (!li.classList.contains('fav')) {
                li.classList.add('fav'); 
            }
        });
    });
};



const renderFavDrinks = (favDrinks) => {
    let favDrinksHTML = '';
    for (const drink of favDrinks) {
        favDrinksHTML += renderOneDrink(drink); 
    }
    ulListFav.innerHTML = favDrinksHTML; 
};

 const getData = (searchTerm) => {
    console.log(searchTerm);
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        cocktailsData = data.drinks;
        
        renderAllDrinks(cocktailsData);
        localStorage.setItem('drinks', JSON.stringify(cocktailsData));
      });
      
};




const handleSearch = (event) => {
    event.preventDefault();
    const valueSearch = inputSearch.value.toLowerCase().trim(); 
    console.log(inputSearch.value);
    
    let filteredDrinks = [];
    
    
    if (favDrinks.length > 0) {
        filteredDrinks = favDrinks.filter((item) => item.strDrink.toLowerCase().includes(valueSearch));
    }
    
    
    if (cocktailsData.length > 0) {
        const drinksFromAPI = cocktailsData.filter((item) => item.strDrink.toLowerCase().includes(valueSearch));
        filteredDrinks = filteredDrinks.concat(drinksFromAPI);
    }

   
    if (filteredDrinks.length === 0) {
        getData(valueSearch);
        return; 
    }
    
    
    renderAllDrinks(filteredDrinks);
}; 

 


const init = () => {
    const drinksFavLocal = localStorage.getItem('favDrinks');
    if (drinksFavLocal !== null) {
        favDrinks = JSON.parse(drinksFavLocal);
        renderFavDrinks(favDrinks); 
    }

    const drinksLocal = localStorage.getItem('drinks');
    if (drinksLocal !== null) {
        cocktailsData = JSON.parse(drinksLocal);
        renderAllDrinks(cocktailsData);
    } else {
        getData('margarita');
    }

    
    btnreset.addEventListener('click', () => {
        
        ulListFav.innerHTML = '';
        
        
        favDrinks = [];
        
       
        localStorage.removeItem('favDrinks');
    });
}; 

init(); 


btnSearch.addEventListener('click', handleSearch);







