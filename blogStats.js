const express = require('express');
const axios = require('axios');
const _ = require('lodash');

const router = express.Router();

/**
 * Fetches blog data from an API using the axios library.
 * @returns {Promise<Array>} The blog data received from the API as an array of objects.
 * Each object represents a blog and contains properties such as `id`, `title`, and `content`.
 * @throws {Error} If an error occurs during the request.
 */

let cacheHit = false;

// Fetches data from the api.
async function fetchBlogData() {
  try {
    const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
      headers: {
        'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog data:', error.message);
    throw error;
  }
}

// Create a memoized version of the fetchBlogData function to store data in Cache for 5 minutes.

const memoizedFetchBlogData = _.memoize(fetchBlogData, () => 'blogs', { maxAge: 300000 });

// Middleware for fetching blog data and analysing data using lodash.

router.get('/blog-stats', async (req, res) => {
  try {

    if (cacheHit) {
      console.log('Data retrieved from cache.');
    } else {
      console.log('Data retrieved from API.');
    }
    const apiResponse = await memoizedFetchBlogData();   // Fetch using the memoized function

    cacheHit = true; 

    if (!apiResponse || !Array.isArray(apiResponse.blogs)) {
      throw new Error('Data received from the API is not in the expected format.');
    }

    const data = apiResponse.blogs; 

    // Data Analysis
    const totalBlogs = data.length;
    const longestTitleBlog = _.maxBy(data, 'title.length');
    const privacyTitleBlogs = data.filter(blog => blog.title.toLowerCase().includes('privacy'));
    const uniqueTitles = _.uniqBy(data, 'title');

    // Response
    const statistics = {
      totalBlogs,
      longestBlogTitle: longestTitleBlog.title,
      privacyTitleBlogs: privacyTitleBlogs.length,
      uniqueBlogTitles: uniqueTitles.map(blog => blog.title)
    };

    res.json(statistics);
  } catch (error) {
    console.error('Error fetching or analyzing data:', error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});


// Blog Search Endpoint

router.get('/blog-search', async (req, res) => {
  const query = req.query.query.toLowerCase();

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  try {
    const apiResponse = await memoizedFetchBlogData(); // Fetch using the memoized function

    if (!apiResponse || !Array.isArray(apiResponse.blogs)) {
      throw new Error('Data received from the API is not in the expected format.');
    }

    const data = apiResponse.blogs; // Access the 'blogs' property

    console.log('Received blog data for search:', data);

    // Data filter based on the query.
    const filteredBlogs = data.filter(blog => blog.title.toLowerCase().includes(query));

    res.json(filteredBlogs);
  } catch (error) {
    console.error('Error occurred during blog search:', error.message);
    res.status(500).json({ error: 'An error occurred while searching for blogs.' });
  }
});

module.exports = router;
