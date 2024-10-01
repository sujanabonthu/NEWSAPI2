document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'news.json'; // Make sure the 'news.json' file is correctly placed
    const fetchNewsBtn = document.getElementById('fetchBtn');
    const newsContainer = document.getElementById('newsContainer');
    let articles = [];

    async function fetchNews() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched articles:", data.articles);
            articles = data.articles;
            renderRandomArticle();
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Error fetching articles.</p>';
        }
    }

    function renderRandomArticle() {
        newsContainer.innerHTML = ''; // Clear the container
        if (articles.length > 0) {
            const randomIndex = Math.floor(Math.random() * articles.length);
            const article = articles[randomIndex];
            const articleElement = document.createElement('div');
            articleElement.className = 'news-item';
            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <img src="${article.urlToImage}" alt="${article.title}">
                <p><a href="${article.url}" target="_blank">Read more</a></p>
            `;
            newsContainer.appendChild(articleElement);
        } else {
            newsContainer.innerHTML = '<p>No articles available.</p>';
        }
    }

    fetchNewsBtn.addEventListener('click', fetchNews);
});