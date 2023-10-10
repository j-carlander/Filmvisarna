import "dotenv/config";

import express from 'express';
const app = express();
const port = 3000;


app.get('/api/health', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});