let news = [];
let pageNum = 1;
let newsArticles = [];

let curlUrl = (`https://newsapi.org/v2/everything?q=cat&q=dog&apiKey=b1c2ed62f2e54229aa2cd6fdb5c4473c&page=${pageNum}`)

async function fetchNews() {
let url = curlUrl;
let result = await fetch(url);
let data = await result.json();
news = data.articles;
pageNum++;
console.log("news list", news);
newsArticles = newsArticles.concat(data.articles);
renderArticlesCounter(newsArticles);
renderNews(newsArticles);
}

function renderNews(arr) {
let html = arr.map(article => {
return `
<div class="card">
<img class="card-img-top" src="${article.urlToImage}" class="img-fluid">
<div class="card-body">
<h3 class="card-title" id="title">${article.title}</h3>
<footer class="blockquote-footer">
<small class="text-muted" id="author">${article.author}</small>
<span id="date" class="text-right">(${moment(article.publishedAt).fromNow()})</span>
</footer>
<p "card-text" id="description">${article.description}</p>
</div>
<div class="card-footer">
<a class="btn btn-outline-info" href="${article.url}" id="source">Read More</a>
</div>
</div>
`
}).join("")
document.getElementById("board").innerHTML = html;
}
fetchNews();

const renderArticlesCounter = (articles) => {
document.getElementById("count").innerHTML = `[${articles.length} articles]`;
}

