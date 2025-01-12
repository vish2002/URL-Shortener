import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import express from 'express';
import mongoose from 'mongoose';
import { urlShort, getOriginalUrl } from "../Controllers/url.js";

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, { dbName: 'NodeJS_Express_API_Series' })
.then(() => console.log('Mongodb Connected'))
.catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.render('server.ejs', { shortUrl: null });
});

app.post('/shorten', urlShort);

app.get('/:shortCode', getOriginalUrl);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the Express app as a serverless function
export default app;
