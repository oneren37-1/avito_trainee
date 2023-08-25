import React from 'react';
import {useParams} from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";

const Game: React.FC = () => {
    const { id } = useParams();

    return (
        <PageLayout>
            <h1>Game</h1>
            <div>
                <h1>Страница игры {id}</h1>
            </div>
        </PageLayout>
    );
}

export default Game;