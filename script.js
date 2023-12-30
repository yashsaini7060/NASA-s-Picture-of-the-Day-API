
document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
}

function getImageOfTheDay(date) {
    const apiKey = 'ziuq13NAPB28Ft4xeozU73x6qvELEMOJua0Z8lnA'; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Display error message to the user
            alert('Error fetching data. Please try again.');
        });
}

function displayImage(data) {
    const imageContainer = document.getElementById('current-image-container');
    imageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
    const searchHistoryList = document.getElementById('search-history');
    searchHistoryList.innerHTML = '';

    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    searches.forEach(search => {
        const listItem = document.createElement('li');
        listItem.textContent = search;
        listItem.addEventListener('click', () => getImageOfTheDay(search));
        searchHistoryList.appendChild(listItem);
    });
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const selectedDate = document.getElementById('search-input').value;
    getImageOfTheDay(selectedDate);
});
