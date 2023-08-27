import React, {useEffect, useState} from 'react';
import Title from "antd/es/typography/Title";
import {Card, Col, Row, Spin, Typography} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export interface IGameCard {
    id: number;
    title: string;
    thumbnail: string;
    game_url: string;
    genre: string;
    release_date: string;
    publisher: string;
}

const GameCard: React.FC<IGameCard> = (props) => {
    const [imageUrl, setImageUrl] = useState(props.thumbnail);

    useEffect(() => {
        setImageUrl('');
        const img: HTMLImageElement = new Image();
        img.src = props.thumbnail;
        img.onload = () => {
            setImageUrl(props.thumbnail);
        };
    }, [props.thumbnail])

    return (
        <Link to={`/game/${props.id}`}>
            <Card
                hoverable
                cover={(
                    <div style={{aspectRatio: '365 / 206'}}>
                        {imageUrl
                            ? <img alt="game preview" src={imageUrl} style={{width: "100%"}}/>
                            : (
                                <Row justify="center" align="middle" style={{height: '100%'}}>
                                    <Col>
                                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                                    </Col>
                                </Row>
                            )
                        }
                    </div>
                )}
            >
                <Title level={5} style={{margin: 0}}>{props.title}</Title>
                <Typography.Text type="secondary" > {props.genre}</Typography.Text>
                <Row justify="space-between" align="middle">
                    <Typography.Text>{props.publisher}</Typography.Text>
                    <Typography.Text type="secondary">
                        {new Date(props.release_date).toLocaleDateString()}
                    </Typography.Text>
                </Row>
            </Card>
        </Link>
    );
}

export default GameCard;