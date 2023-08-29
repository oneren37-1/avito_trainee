import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWithRetry} from "../app/store";

export type GameDetails = {
    id: number;
    title: string;
    release_date: string;
    thumbnail: string;
    genre: string;
    publisher: string;
    developer: string;
    minimum_system_requirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    }
    screenshots: {
        id: number;
        image: string;
    }[]
}

export interface GameState {
    content?: GameDetails;
    status: 'idle' | 'loading' | 'failed' | 'loaded';
    error: string | null;
}

const initialState: GameState = {
    status: 'idle',
    error: null
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGame.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchGame.fulfilled, (state, action) => {
            state.status = 'loaded'
            const data = action.payload;
            state.content = {
                id: data.id,
                title: data.title,
                release_date: data.release_date,
                thumbnail: data.thumbnail,
                genre: data.genre,
                publisher: data.publisher,
                developer: data.developer,
                minimum_system_requirements: data.minimum_system_requirements,
                screenshots: data.screenshots
            }
        })
        builder.addCase(fetchGame.rejected, (state, action) => {
            state.status = 'failed'
            state.error = "Ошибка загрузки"
        })
    }
});

export const fetchGame = createAsyncThunk(
    'game/fetchGame',
    async (id: string) => {
        const url = new URL('https://free-to-play-games-database.p.rapidapi.com/api/game');

        url.searchParams.append('id', id);

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4c6ad09b64msh85f478e0abf1ef7p1c1434jsnd50eefc49298',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        return await fetchWithRetry(url, options)
            .then(response => response.json())
    }
)
export default gameSlice.reducer;