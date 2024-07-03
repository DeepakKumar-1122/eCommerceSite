import express from 'express';
import products from './data/products.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", process.env.frontendURL] }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
