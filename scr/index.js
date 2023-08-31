const express = require('express');
// const mongoose = require('mongoose');
const redis = require('redis');
const {Client} = require('pg');


//init app
const PORT = process.env.PORT || 4000;
const app = express();
//connect redis
REDIS_PORT = '6379';
REDIS_HOST = 'redis';
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected to redis...'));

redisClient.connect();

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '5432';
// const DB_HOST = '172.19.0.3';
const DB_HOST = 'postgres';

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
    connectionString: URI
})
client
    .connect()
    .then(() => console.log('connected to POSTGRES DB...'))
    .catch(err => console.log('failed to connect POSTGRES DB: ', err));

// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '27017';
// const DB_HOST = '172.19.0.3';
// const DB_HOST = 'mongo';

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// mongoose
//     .connect(URI)
//     .then(() => console.log('connected to DB...'))
//     .catch(err => console.log('failed to connect DB: ', err));

app.get('/', (req, res) => {
    redisClient.set('products', 'products...');

    res.send("<h1> hello digital creativity!</h1>")
});

app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`<h1> hello digital creativity!</h1> <h2>${products}</h2>`)
});


app.listen(PORT, () => console.log(`app is running on port: ${PORT}`));
