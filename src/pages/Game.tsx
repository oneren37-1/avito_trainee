import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import {fetchGame} from "../redux/gameSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Title from "antd/es/typography/Title";
import {Alert, Card, Carousel, Col, Divider, Row, Spin, Table} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import Img from "../components/Img";

const Game: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) {
            navigate('/');
            return;
        }
        dispatch(fetchGame(id));
    }, [id])

    const content = useAppSelector((state) => state.game.content);
    const loadingStatus = useAppSelector((state) => state.game.status);
    const error = useAppSelector((state) => state.game.error);

    const tabData = content ? [
        {
            key: '1',
            prop: 'Жанр',
            val: content.genre,

        },
        {
            key: '2',
            prop: 'Издатель',
            val: content.publisher,
        },
        {
            key: '3',
            prop: 'Разработчик',
            val: content.developer,
        },
        {
            key: '4',
            prop: 'Дата выхода',
            val: content.release_date,
        }
    ] : [];

    const requirements = (content && content.minimum_system_requirements) ? [
        {
            key: '1',
            prop: 'ОС',
            val: content.minimum_system_requirements.os,
        },
        {
            key: '2',
            prop: 'Процессор',
            val: content.minimum_system_requirements.processor,
        },
        {
            key: '3',
            prop: 'Видеокарта',
            val: content.minimum_system_requirements.graphics,
        },
        {
            key: '4',
            prop: 'Память',
            val: content.minimum_system_requirements.memory,
        },
        {
            key: '5',
            prop: 'Диск',
            val: content.minimum_system_requirements.storage,
        }
    ] : [];

    const columns = [
        {
            title: 'Property',
            dataIndex: 'prop',
            key: 'prop',
        },
        {
            title: 'Value',
            dataIndex: 'val',
            key: 'val',
        }
    ];

    return (
        <PageLayout>
            {loadingStatus === "loading" && (
                <Row justify="center" style={{marginTop: '50px'}}>
                    <Col><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></Col>
                </Row>
            )}
            {loadingStatus === "failed" && (
                <Row style={{marginTop: '50px'}}>
                    <Col><Alert message={error} type="error" /></Col>
                </Row>
            )}
            {loadingStatus === "idle" && content && (
                <>
                    <Title>{content.title}</Title>
                    <Card
                        cover={<Img src={content.thumbnail} ratio={[365, 206]} />}
                    >
                        <Divider orientation="left">Общие сведения</Divider>
                        <Table
                            dataSource={tabData}
                            columns={columns}
                            pagination={false}
                            showHeader={false}
                        />
                        {content && content.minimum_system_requirements && (<>
                            <Divider orientation="left">Системные требования</Divider>
                            <Table
                                    dataSource={requirements}
                                columns={columns}
                                pagination={false}
                                showHeader={false}
                            />
                        </>)}
                        <Divider orientation="left">Скриншоты</Divider>
                        <Carousel autoplay>
                            {content.screenshots.map((screenshot, index) => (
                                <div key={index}>
                                    <Img src={screenshot.image} ratio={[568, 319]} />
                                </div>
                            ))}
                        </Carousel>
                    </Card>
                </>
            )}
        </PageLayout>
    );
}

export default Game;