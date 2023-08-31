const express = require('express')
const cors = require('cors');
const NodeCache = require('node-cache');
const GameDTO = require('./dto/Game');
const GamesDTO = require('./dto/Games');

const app = express()
const cache = new NodeCache();

app.use(cors());
app.use(express.json());

const BASE_URL = 'https://www.freetogame.com/api';
app.get('/games', (req, res) => {
    const { page, size, platform, sort, category } = req.query;

    const cachedData = cache.get('games_' + JSON.stringify({ platform, sort, category }));
    if (cachedData) {
        return res.status(200).send(new GamesDTO(cachedData, page, size));
    }

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
            cache.set('games_' + JSON.stringify({ platform, sort, category }), data, 60 * 60 * 24);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send()
        });
});

app.get('/game', (req, res) => {
    if (!req.query.id) return res.status(400).send('Bad request');

    const cachedData = cache.get('game_' + req.query.id);
    if (cachedData) {
        return res.status(200).send(new GameDTO(cachedData));
    }

    fetch(`${BASE_URL}/game?id=${req.query.id}`)
        .then(data => data.json())
        .then(data => {
            if (data.status !== undefined && data.status === 0) {
                return res.status(404).send('Not found');
            }
            res.status(200).send(new GameDTO(data));
            cache.set('game_' + req.query.id, data, 60 * 60 * 24);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send()
        });
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
});