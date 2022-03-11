const searchBtn = document.getElementById('button-search');
const searchInput = document.getElementById('search-field');

searchInput.addEventListener("keypress", function(event){
    if(event.keyCode == 13){
        searchBtn.click();
    }
})

document.getElementById('error-message').style.display = 'none';
const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // Clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if(searchText == ''){
        // please write something to display
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals.slice(0,4)))
            .catch(error => displayError(error));
    }

}
    const displayError = error => {
        document.getElementById('error-message').style.display = 'block';
    }

    const displaySearchResult = meals =>{
        // console.log(meals);
        const seachResult = document.getElementById('search-result');

        // Clear data
        // seachResult.innerHTML = '';
        seachResult.textContent = '';

        if(meals.length == 0){
            // show no result found
        }
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <a href="#top">
                <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                    </div>
                </div>
            </a>
            `;
            seachResult.appendChild(div);
            
        })
        
    }

    const loadMealDetail = mealId => {
        // console.log(mealId);
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayMealDetail(data.meals[0]));
        
    }

    const displayMealDetail = meal => {
        // console.log(meal);
        const mealDetails = document.getElementById('meal-details');
        mealDetails.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML= `
            <img src="${meal.strMealThumb}" class="card-img-top>
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 190)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Youtube</a>
            </div>
        `;
        mealDetails.appendChild(div);
    }
    
