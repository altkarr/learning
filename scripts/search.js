async function search() {
  const query = document.getElementById('searchQuery').value;
  try {
    await fetchSocialMediaData(query);
    await fetchNewsData(query);
    await fetchSportsData(query);
    await fetchStockData(query);
    await fetchResearchData(query);
  } catch (error) {
    console.error('Error during search:', error);
  }
}

const fetchSocialMediaData = async (query) => {
  await fetchTwitterData(query);
  await fetchRedditData(query);
};

const fetchTwitterData = async (query) => {
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=5`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer YOUR_TWITTER_BEARER_TOKEN`
      }
    });
    const data = await response.json();
    displaySocialMediaResults(data.data || []);
  } catch (error) {
    console.error('Twitter error:', error);
  }
};

const fetchRedditData = async (query) => {
  const url = `https://www.reddit.com/r/all/search.json?q=${query}&sort=relevance&t=all`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displaySocialMediaResults(data.data.children.map(c => c.data));
  } catch (error) {
    console.error('Reddit error:', error);
  }
};

const fetchNewsData = async (query) => {
  const apiKey = 'YOUR_NEWS_API_KEY';
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNewsResults(data.articles || []);
  } catch (error) {
    console.error('News error:', error);
  }
};

const fetchStockData = async (query) => {
  const apiKey = 'OX3H8PKIZFQ6OON3';
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayStockResults(data['Time Series (Daily)'] || {});
  } catch (error) {
    console.error('Stock error:', error);
  }
};

const fetchSportsData = async (query) => {
  const apiKey = 'YOUR_SPORTS_RADAR_API_KEY';
  const url = `https://api.sportsradar.com/sports/baseball/MLB/games?apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displaySportsResults(data.games || []);
  } catch (error) {
    console.error('Sports error:', error);
  }
};

const fetchResearchData = async (query) => {
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${query}&retmax=10&usehistory=y&api_key=YOUR_PUBMED_API_KEY`;
  try {
    const response = await fetch(url);
    const data = await response.text();
    displayResearchResults(data);
  } catch (error) {
    console.error('Research error:', error);
  }
};

const displaySocialMediaResults = (items) => {
  const panel = document.getElementById('socialMediaPanel').querySelector('.panel-content');
  panel.innerHTML = items.map(item => `
    <div class="result-item">
      <p>${item.text || item.title}</p>
    </div>
  `).join('');
};

const displayNewsResults = (articles) => {
  const panel = document.getElementById('newsPanel').querySelector('.panel-content');
  panel.innerHTML = articles.map(article => `
    <div class="result-item">
      <a href="${article.url}" target="_blank">${article.title}</a>
    </div>
  `).join('');
};

const displayStockResults = (data) => {
  const panel = document.getElementById('investingPanel').querySelector('.panel-content');
  panel.innerHTML = Object.entries(data).slice(0, 5).map(([date, values]) => `
    <div class="result-item">${date}: ${values['4. close']}</div>
  `).join('');
};

const displaySportsResults = (games) => {
  const panel = document.getElementById('sportsPanel').querySelector('.panel-content');
  panel.innerHTML = games.map(game => `
    <div class="result-item">
      ${game.date}: ${game.home_team} vs ${game.away_team}
    </div>
  `).join('');
};

const displayResearchResults = (data) => {
  const panel = document.getElementById('researchPanel').querySelector('.panel-content');
  panel.innerHTML = `<pre>${data}</pre>`;
};

// Optional: simple tickers
const fetchLiveTickerData = () => {
  document.getElementById('sports-ticker').innerText = 'NBA: Lakers vs Celtics - Live Score: 98-100';
  document.getElementById('stock-ticker').innerText = 'AAPL: $145.60 (+0.5%)';
};

fetchLiveTickerData();
setInterval(fetchLiveTickerData, 60000);

