import React from 'react';
import {Layout} from 'antd';
import PageHeader from "../PageHeader/PageHeader";
import style from './PageLayout.module.scss';

const {
    Header,
    Content
} = Layout;

type PageLayoutProps = {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <Layout className={style.container}>
            <Header className={style.header}><PageHeader /></Header>
            <Content>
                <div className={style.content}>
                    { children }
                </div>
            </Content>
        </Layout>
    );
}

export default PageLayout;