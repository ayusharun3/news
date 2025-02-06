document.getElementById("fetchNewsBtn").addEventListener("click", fetchNews);

async function fetchNews() {
  const topic = document.getElementById("topicInput").value.trim();
  if (!topic) {
    alert("Please enter a topic.");
    return;
  }

  const newsResults = document.getElementById("newsResults");
  newsResults.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${topic}&apiKey=1c46f639113b45949ecd3997c790dc4b`
    );
    const data = await response.json();

    if (data.status === "ok") {
      displayArticles(data.articles);
    } else {
      newsResults.innerHTML = "<p>No articles found.</p>";
    }
  } catch (error) {
    console.error(error);
    newsResults.innerHTML =
      "<p>Error fetching news. Please try again later.</p>";
  }
}

function displayArticles(articles) {
  const newsResults = document.getElementById("newsResults");
  newsResults.innerHTML = ""; // Clear any previous results

  articles.slice(0, 5).forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article");

    const articleTitle = document.createElement("h3");
    articleTitle.innerHTML = article.title;
    articleElement.appendChild(articleTitle);

    const articleSource = document.createElement("p");
    articleSource.innerHTML = `Source: ${article.source.name}`;
    articleElement.appendChild(articleSource);

    const articlePublished = document.createElement("p");
    articlePublished.innerHTML = `Published: ${new Date(
      article.publishedAt
    ).toLocaleString()}`;
    articleElement.appendChild(articlePublished);

    const articleLink = document.createElement("a");
    articleLink.href = article.url;
    articleLink.innerHTML = "Read more";
    articleElement.appendChild(articleLink);

    newsResults.appendChild(articleElement);
  });
}
