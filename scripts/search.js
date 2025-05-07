// Function to initiate search for social media, news, sports, and stock data
async function search() {
  const query = document.getElementById('searchQuery').value;
  try {
    await fetchTwitterData(query);
    await fetchRedditData(query);
    await fetchNewsData(query);
    await fetchStockData(query);
    await fetchSportsData(query);
    await fetchResearchData(query);
  } catch (error) {
    console.error('Error during search:', error);
  }
}

// Fetch and display functions for Twitter, Reddit, News, Sports, etc.
const fetchTwitterData = async (query) => {
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=5`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer YOUR_BEARER_TOKEN` }
  });
  const data = await response.json();
  displaySocialMediaResults(data.data);
};

// Define other fetch functions (Reddit, News, Sports, Investing, etc.)

// Display results
const displaySocialMediaResults = (data) => {
  const socialMediaPanel = document.getElementById('socialMediaPanel').querySelector('.panel-content');
  socialMediaPanel.innerHTML = `
    <div class="result-count">Found ${data.length} results</div>
    ${data.map(item => `
      <div class="result-item">
        <a href="https://twitter.com/${item.username}" target="_blank">${item.text}</a>
      </div>
    `).join('')}
  `;
};

// Additional display functions for each panel: News, Sports, Investing, etc.
