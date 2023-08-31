const express = require('express')
const app = express()
const cors = require('cors');
const GameDTO = require('./dto/Game');
const GamesDTO = require('./dto/Games');

app.use(cors());
app.use(express.json());

const BASE_URL = 'https://www.freetogame.com/api';
app.get('/games', (req, res) => {
    const { page, size, platform, sort, category } = req.query;

    const subUrl = category ? 'filter' : 'games';
    const url = new URL(`${BASE_URL}/${subUrl}`);

    url.searchParams.append('platform', platform || 'all');
    url.searchParams.append('sort-by', sort || 'relevance');
    category && url.searchParams.append('tag', category || '');

    fetch(url)
        .then(data => data.json())
        .then(data => {
            if (data.status !== undefined && data.status === 0) {
                return res.status(404).send('Not found');
            }
            res.status(200).send(new GamesDTO(data, page, size))
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send()
        });
});

app.get('/game', (req, res) => {
    if (!req.query.id) return res.status(400).send('Bad request');

    fetch(`${BASE_URL}/game?id=${req.query.id}`)
        .then(data => data.json())
        .then(data => {
            if (data.status !== undefined && data.status === 0) {
                return res.status(404).send('Not found');
            }
            res.status(200).send(new GameDTO(data));
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send()
        });
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
});