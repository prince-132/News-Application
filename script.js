window.addEventListener('load', () => fetchNews("India", 1));

async function fetchNews(query, page) {
    // Clear the existing news articles
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = '';

    try {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&pageSize=6&page=${page}&apiKey=6c07eb64056f46298c464ea5c6764295`);
        let data = await response.json();
        bindData(data.articles);
        let totalPage = await fetchtotalItem(query, page);
        setPagination(query, page, totalPage);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");

    articles.forEach((article) => {
        // if (!article.urlToImage) return;
        let card = document.createElement("div");
        card.setAttribute('class', 'card');

        card.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        let cardHeader = document.createElement("div");
        cardHeader.setAttribute('class', 'card-header');
        if(article.urlToImage){
            cardHeader.innerHTML = `<img style="width: 100%; height:180px; object-fit: cover;" src="${article.urlToImage}" >`;
        }
        else{
            cardHeader.innerHTML = `<img style="width: 100%; height:180px; object-fit: cover;" src="./assets/placeholder.jpeg">`;
        }
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
    fetchNews(id, 1);
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
    fetchNews(query, 1);
});

async function fetchtotalItem(query, page) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&pageSize=6&page=${page}&apiKey=6c07eb64056f46298c464ea5c6764295`);
    let data = await response.json();
    return data.totalResults;
}

function setPagination(query, currentPage, totalPage) {
    let pagination = document.getElementById("main-footer");
    pagination.innerHTML = "";
    let totalPages = Math.ceil(totalPage / 6);

    const createButton = (text, page) => {
        let button = document.createElement("button");
        button.textContent = text;
        button.onclick = () => fetchNews(query, page);
        return button;
    };

    // Previous Button
    const prevButton = createButton("Prev", currentPage - 1);
    prevButton.setAttribute('class', 'bottom-btn backBtn');
    prevButton.disabled = currentPage === 1;
    pagination.appendChild(prevButton);

    // Number Buttons Container
    let numBtnList = document.createElement('div');
    numBtnList.setAttribute('class', 'bottom-num-btn');

    const maxBtns = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxBtns / 2));
    let endPage = Math.min(totalPages, startPage + maxBtns - 1);
    if (endPage - startPage + 1 < maxBtns) {
        startPage = Math.max(1, endPage - maxBtns + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        let pageButton = createButton(i, i);
        pageButton.setAttribute('class', 'bottom-btn numBtn');
        if (i === currentPage) {
            pageButton.classList.add('active');
            pageButton.style.backgroundColor = 'orange'
        }
        numBtnList.appendChild(pageButton);
    }

    pagination.appendChild(numBtnList);

    // Next Button
    const nextButton = createButton("Next", currentPage + 1);
    nextButton.setAttribute('class', 'bottom-btn backBtn');
    nextButton.disabled = currentPage === totalPages;
    pagination.appendChild(nextButton);
}


// https://newsapi.org/v2/everything?q=${query}&pageSize=6&page=2&apiKey=6c07eb64056f46298c464ea5c6764295
