import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../app/hooks";
import {CATEGORIES, PLATFORM_OPTIONS, SORT_OPTIONS} from "../../consts";
import {fetchGames, IFetchGamesParams} from "../../redux/gamesSlice";
import {Card, Col, Row, Select, Space} from "antd";
import {FilterOutlined, SortAscendingOutlined} from "@ant-design/icons";

const Controllers: React.FC = () => {
    const dispatch = useAppDispatch();

    const categoryOptions = CATEGORIES.map((category) => ({
        value: category, label: category
    }))

    const [sortType, setSortType] = useState<IFetchGamesParams["sort"]>("relevance")
    const [platformType, setPlatformType] = useState<IFetchGamesParams["platform"]>("all")
    const [categories, setCategories] = useState<IFetchGamesParams["category"]>([])

    useEffect(() => {
        dispatch(fetchGames({
            sort: sortType,
            platform: platformType,
            category: categories,
        }))
    }, [dispatch, sortType, platformType, categories]);

    return (
        <Card>
            <Space direction="vertical">
                <Space>
                    <FilterOutlined />
                    <Row gutter={[10, 10]} align={"middle"}>
                        <Col>
                            <Select
                                style={{ minWidth: '150px' }}
                                onChange={value => { setPlatformType(value) }}
                                options={PLATFORM_OPTIONS}
                                defaultValue={platformType}
                            >
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                mode="multiple"
                                style={{ minWidth: '200px' }}
                                onChange={value => { setCategories(value) }}
                                options={categoryOptions}
                                defaultValue={[]}
                                placeholder={"Выберите жанр"}
                            >
                            </Select>
                        </Col>
                    </Row>
                </Space>

                <Space>
                    <Col><SortAscendingOutlined /></Col>
                    <Col>
                        <Select
                            onChange={value => { setSortType(value) }}
                            options={SORT_OPTIONS}
                            defaultValue={sortType}
                        >
                        </Select>
                    </Col>
                </Space>
            </Space>
        </Card>
    );
}

export default Controllers;