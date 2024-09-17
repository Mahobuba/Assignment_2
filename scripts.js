// DOM elements
const hamburgerButton = document.getElementById('hamburgerButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const foodGrid = document.getElementById('foodGrid');

// Toggle dropdown menu on mobile
hamburgerButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

// API call to retrieve food data by category
async function getFoodData(category) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
    const data = await response.json();
    return data.meals;
}

// Render food items on the page
function renderFoodItems(meals) {
    // Clear existing content
    foodGrid.innerHTML = '';
    
    if (meals) {
        meals.forEach(meal => {
            const foodItem = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-bold">${meal.strMeal}</h3>
                        <p class="text-gray-600 mt-2">${meal.strInstructions.slice(0, 100)}...</p>
                    </div>
                </div>
            `;
            foodGrid.innerHTML += foodItem;
        });
    } else {
        foodGrid.innerHTML = '<p class="text-gray-600 col-span-full">No meals found for this category.</p>';
    }
}

// Handle category button click (Navbar and Dropdown)
function handleCategoryClick(event) {
    const category = event.target.getAttribute('data-category');
    getFoodData(category).then(renderFoodItems);
}

// Attach event listeners to category buttons
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', handleCategoryClick);
});
