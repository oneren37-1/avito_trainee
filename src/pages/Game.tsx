import React from 'react';
import {useParams} from "react-router-dom";

const Game = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Game</h1>
            <div>
                <h1>Страница игры {id}</h1>
            </div>
        </div>
    );
}

export default Game;