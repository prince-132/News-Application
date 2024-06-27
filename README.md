# News Tak

## Overview
News Tak is a web application that allows users to search and browse news articles from various categories such as Finance, Politics, and Technology. The application fetches news data from an API and displays it in a user-friendly interface with pagination and save features.

## Features
- **Category Navigation**: Quickly switch between different news categories.
- **Search Functionality**: Search for news articles by keywords.
- **Save Articles**: Save your favorite articles locally for easy access.
- **Pagination**: Navigate through multiple pages of news articles.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used
- **HTML**: Structure of the web application.
- **CSS**: Styling and layout of the web application.
- **JavaScript**: Functionality and dynamic content management.

## File Descriptions

### `index.html`
The HTML file provides the structure for the web application. It includes:
- A navigation bar with links to different news categories and a search bar.
- A main section where news articles are dynamically displayed.
- A footer for pagination controls.

### `style.css`
The CSS file contains styles for the web application, ensuring a clean and modern look. Key styles include:
- Flexbox layout for alignment and spacing.
- Hover and active states for interactive elements.
- Responsive design adjustments for different screen sizes.

### `script.js`
The JavaScript file handles the functionality of the web application, including:
- Fetching news articles from the News API based on user queries and category selections.
- Dynamically creating and displaying news article cards.
- Managing saved articles in local storage.
- Implementing pagination to navigate through pages of news articles.

## Installation and Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/newstak.git
2. Open `index.html` in your preferred browser

## Usage Description 
- Use the navigation bar to switch between different news categories.
- Enter a keyword in the search bar and click the "Search" button to find news articles related to your query.
- Click on a news article card to read the full article in a new tab.
- Click the star icon on a news article to save it. Access saved articles by clicking the shopping bag icon in the navigation bar.
- Use the pagination buttons in the footer to navigate through multiple pages of news articles.

### API Key
This application uses the News API to fetch news articles. Make sure to replace the API key in `script.js` with your own API key:
```bash
const API_KEY = 'your_api_key_here';
