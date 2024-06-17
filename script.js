window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    // Clear the existing news articles
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = '';

    try {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=6c07eb64056f46298c464ea5c6764295`);
        let data = await response.json();
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        let card = document.createElement("div");
        card.setAttribute('class', 'card');

        card.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        let cardHeader = document.createElement("div");
        cardHeader.setAttribute('class', 'card-header');
        cardHeader.innerHTML = `<img style="width: 100%; height:180px; object-fit: cover;" src="${article.urlToImage}" alt="Card-pic">`;
        card.appendChild(cardHeader);

        const date = new Date(article.publishedAt).toLocaleString("en-US");
        let cardContent = document.createElement("div");
        cardContent.setAttribute('class', 'card-content');

        cardContent.innerHTML = `
            <h3>${article.title}</h3>
            <h6 class="news-source">${article.source.name} · ${date}</h6>
            <p class="news-desc">${article.description}</p>
        `;
        card.appendChild(cardContent);

        cardsContainer.appendChild(card);
    });
}

let currSelectedNav = null;
function changeSearchItem(id) {
    fetchNews(id);
    let navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

const searchBtn = document.getElementById('searchBtn');
const searchTxt = document.getElementById('searchTxt');

searchBtn.addEventListener('click', () => {
    let query = searchTxt.value;
    if (!query) return;
    currSelectedNav?.classList.remove('active');
    fetchNews(query);
});
