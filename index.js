const express = require('express');
const blogRoutes = require('./blogStats');
const app = express();
const PORT = 3000;

app.use('/api', blogRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
