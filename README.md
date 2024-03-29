# SubSpace-blogStats

# Requirements
1. **Data Retrieval**:
- Use Express to create a route at `/api/blog-stats`.
- When a GET request is made to this route, your middleware should make the provided curl request to fetch the blog data.

2. **Data Analysis**:
- After fetching the data, use Lodash to perform the following analytics:
- Calculate the total number of blogs fetched.
- Find the blog with the longest title.
- Determine the number of blogs with titles containing the word "privacy."
- Create an array of unique blog titles (no duplicates).

3. **Response**:
- Respond to the client with a JSON object containing the following statistics:
- Total number of blogs.
- The title of the longest blog.
- Number of blogs with "privacy" in the title.
- An array of unique blog titles.

4. **Blog Search Endpoint**:
- Create an additional route at `/api/blog-search`.
- This route should accept a query parameter, e.g., `/api/blog-search?query=privacy`.
- Implement a search functionality that filters the blogs based on the provided query string (case-insensitive).
- Ensure that the search functionality is an original implementation, and copied code from external sources is not allowed.

5. **Error Handling**:
- Handle any errors that may occur during the data retrieval, analysis, or search process. If the third-party API is unavailable or returns an error, respond with an appropriate error message.
- Error handling should be implemented without direct copying of code from external sources.

6. **Bonus Challenge**:
- Implement a caching mechanism using Lodash's `memoize` function to store the analytics results and search results for a certain period. If the same requests are made within the caching period, return the cached results instead of re-fetching and re-analyzing the data.
- Ensure that the caching mechanism is implemented as an original solution.

# Tools Used
Backend: NodeJs
Libraries: ExpressJs, axios, Lodash.
API: https://intent-kit-16.hasura.app/api/rest/blogs.
Version Control: Git & Github

# Explaination

Endpoints:
1. Fetch Blog Statistics
Endpoint: `/api/blog-stats`
Method: `GET`
This endpoint fetches blog data from an external API, analyzes it, and returns statistics such as the total number of blogs, the title of the longest blog, the count of blogs with "privacy" in the title, and a list of unique blog titles. The data is cached for 5 minutes to improve performance.

2. Search for Blogs
Endpoint: `/api/blog-search`
Query: `/api/blog-search?query=<yourquery>`
Method: `GET`
This endpoint allows you to search for blogs based on a query parameter. It retrieves the blog data and filters it based on the provided query. The data is cached for 5 minutes to improve performance.

Caching:
The application uses Lodash's memoize function to cache the results of the blog data API requests. If the same request is made within the caching period (5 minutes), the cached data is returned, reducing the need to fetch data from the external API repeatedly.

Error Handling:
The application handles errors gracefully. If an error occurs during data fetching, analysis, or searching, it returns an error response with an appropriate status code and message.

Logging:
The application logs information to the console, indicating whether the data was retrieved from the cache or the external API.

Note:
Ensure that you have an internet connection to access the external API.

# Code Execution Steps

1. Clone Repository Locally
2. npm install
3. node index.js
