import React, {useEffect, useState} from 'react';
import PageLayout from "../../components/PageLayout/PageLayout";
import {Alert, Col, Empty, Pagination, Row, Space, Spin} from "antd";
import {useAppSelector} from "../../app/hooks";
import {Game} from "../../redux/gamesSlice";
import Title from "antd/es/typography/Title";
import {LoadingOutlined} from '@ant-design/icons';
import Controllers from "./Controllers";
import GameCard from "./GameCard";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const Home: React.FC = () => {
    const screens = useBreakpoint();

    const games = useAppSelector((state) => state.games.games);
    const loadingStatus = useAppSelector((state) => state.games.status);
    const error = useAppSelector((state) => state.games.error);

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        setCurrentPage(1)
    }, [games])

    return (
        <>
            <PageLayout>
                <Title level={2}>Игры</Title>

                <Space direction="vertical" size="middle" style={{width: '100%'}}>
                    <Controllers />
                    {loadingStatus === "loading" && (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />)}
                    {loadingStatus === "failed" && (<Alert message={error} type="error" />)}
                    {loadingStatus === "idle" && (<>
                        { !games.length && (
                            <Row style={{width: "100%"}} justify="center">
                                <Empty description="Не нашлось подходящих игр"/>
                            </Row>
                        )}
                        { games.length !== 0 && (<>
                            <Pagination
                                defaultPageSize={pageSize}
                                defaultCurrent={currentPage}
                                pageSizeOptions={['10', '20', '50']}
                                showSizeChanger
                                onShowSizeChange={(current, size) => setPageSize(size)}
                                onChange={page => setCurrentPage(page)}
                                total={games.length}
                                size={screens.xs ? "small" : "default"}
                            />
                            <Row gutter={[20, 20]} >
                                { games
                                    .slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
                                    .map((g:Game, i) => (
                                        <Col xs={24} sm={12} md={8} lg={6} key={i}>
                                            <GameCard {...g} />
                                        </Col>
                                    ))}
                            </Row>
                        </>)}
                    </>)}
                </Space>
            </PageLayout>
        </>
    );
}

export default Home;