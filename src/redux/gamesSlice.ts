import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWithRetry} from "../app/store";

export type Game = {
    id: number,
    title: string,
    thumbnail: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    release_date: string,
    views: number,
}
export interface GamesState {
    games: Game[],
    status: 'idle' | 'loading' | 'failed',
    error: string | null,
}

const initialState: GamesState = {
    games: [],
    status: 'idle',
    error: null,
}

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGames.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchGames.fulfilled, (state, action) => {
            state.status = 'idle'
            state.games = action.payload.length ? action.payload.map((item: any) => {
                return {
                    id: item.id,
                    title: item.title,
                    thumbnail: item.thumbnail,
                    game_url: item.game_url,
                    genre: item.genre,
                    platform: item.platform,
                    publisher: item.publisher,
                    release_date: item.release_date,
                    views: item.views
                }
            }) : []
        })
        builder.addCase(fetchGames.rejected, (state, action) => {
            if (action.error.name === 'AbortError') return;
            state.status = 'failed'
            state.error = "Ошибка загрузки"
        })
    }
});

export interface IFetchGamesParams {
    platform: 'pc' | 'browser' | 'all',
    category: string[],
    sort: 'relevance' | 'alphabetical' | 'release-date' | 'popularity'
}

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (params: IFetchGamesParams, thunkAPI) => {
        const url = new URL('https://free-to-play-games-database.p.rapidapi.com/api/' + ((params && params.category.length) ? 'filter' : 'games'));

        if (params) {
            url.searchParams.append('platform', params.platform || 'all');
            url.searchParams.append('sort-by', params.sort || 'relevance');
            params.category.length && url.searchParams.append('tag', params.category.join('.'));
        }

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4c6ad09b64msh85f478e0abf1ef7p1c1434jsnd50eefc49298',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            },
            signal: thunkAPI.signal,
        };

        return await fetchWithRetry(url, options)
            .then(response => response.json())
    }
)
export default gamesSlice.reducer;