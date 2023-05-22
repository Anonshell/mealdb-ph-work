const loadMeals = (searchText,dataLimit) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals, dataLimit));
};

const displayMeals = (meals,dataLimit) => {
  const mealsContainer = document.getElementById("meals-container");

  mealsContainer.innerHTML = " ";

  //  display 6 card only
  const showAll = document.getElementById("show-all");


  if (dataLimit && meals.length > 6) {
    meals = meals.slice(0, 6);

    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // display no meals

  const noMealMessage = document.getElementById("no-found-message");

  if (meals.length === 0) {
    noMealMessage.classList.remove("d-none");
  } else {
    noMealMessage.classList.add("d-none");
  }

  // display all meals

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");

    mealDiv.classList.add("col");

    mealDiv.innerHTML = `     
    
          <div class="card mb-3" style="max-width: 540px;">
       <div class="row g-0">
         <div class="col-md-4">
           <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${meal.strMeal}</h5>
             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          
           </div>
         </div>
       </div>
     </div>

`;

    mealsContainer.appendChild(mealDiv);
  });

  // stop loader

  toggleSpinner(false);
};




     const processSearch = (dataLimit) =>{


      toggleSpinner(true);

      const searchText = document.getElementById("search-field").value;

      console.log(searchText);
    
      loadMeals(searchText,dataLimit);


     }





// search input field enter key

document.getElementById('search-field').addEventListener('keypress', function (e) {
  console.log(e.key)
  if (e.key === 'Enter') {
    
         processSearch(6);
  }

});
     
     document.getElementById('btn-search').addEventListener('click', function(){
      // start loader
      processSearch(6);
  })



const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");

  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};





// not  the best way to  load

document.getElementById("btn-show-all").addEventListener('click', function(){
 
  processSearch();

});




loadMeals();
