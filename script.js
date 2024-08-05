const button = document.getElementById("get-meal-button");
const mealContainer = document.getElementById("meal");

function fetchRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            displayMeal(meal);
        })
        .catch(error => {
            mealContainer.innerHTML = "<p>Sorry, something went wrong. Please try again later.</p>";
            console.error("Error fetching meal:", error);
        });
}

function displayMeal(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    const tags = meal.strTags ? meal.strTags.split(',').join(', ') : '';
    const youtubeEmbedUrl = meal.strYoutube ? `https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}` : '';

    mealContainer.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        ${tags ? `<p><strong>Tags:</strong> ${tags}</p>` : ''}
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        <h4>Ingredients:</h4>
        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        ${youtubeEmbedUrl ? `
            <h4>Video Guide:</h4>
            <div class="video-container">
                <iframe src="${youtubeEmbedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        ` : ''}
    `;
}

button.addEventListener("click", fetchRandomMeal);
