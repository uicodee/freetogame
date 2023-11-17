import {FC, useEffect, useState} from "react";
import {Layout} from "../components/atoms/Layout.tsx";
import {useParams} from "react-router-dom";
import GameService from "../services/GameService.ts";
import {SingleGame as SingleGameResponse} from "../models/Game.ts";
import {Card, Carousel, Col, Descriptions, DescriptionsProps, Image, Row} from "antd";

export const SingleGame: FC = () => {
    const params = useParams()
    const [game, setGame] = useState<SingleGameResponse>()
    const infoItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Genre',
            children: <p>{game?.genre}</p>,
            span: 12
        },
        {
            key: '2',
            label: 'Short description',
            children: <p>{game?.description}</p>,
            span: 24
        },
        {
            key: '3',
            label: 'Game Url',
            children: <a href={game?.game_url}>{game?.game_url}</a>,
            span: 12
        },
        {
            key: '4',
            label: 'Platform',
            children: <p>{game?.platform}</p>,
            span: 12
        },
        {
            key: '5',
            label: 'Publisher',
            children: <p>{game?.publisher}</p>,
            span: 12
        },
        {
            key: '6',
            label: 'Developer',
            children: <p>{game?.developer}</p>,
            span: 12
        },
        {
            key: '7',
            label: 'Release data',
            children: <p>{game?.release_date}</p>,
        },
    ];
    const otherItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'OS',
            children: <p>{game?.minimum_system_requirements.os}</p>,
            span: 12
        },
        {
            key: '2',
            label: 'Processor',
            children: <p>{game?.minimum_system_requirements.processor}</p>,
            span: 24
        },
        {
            key: '3',
            label: 'Memory',
            children: <p>{game?.minimum_system_requirements.memory}</p>,
            span: 12
        },
        {
            key: '4',
            label: 'Graphics',
            children: <p>{game?.minimum_system_requirements.graphics}</p>,
            span: 12
        },
        {
            key: '5',
            label: 'Storage',
            children: <p>{game?.minimum_system_requirements.storage}</p>,
            span: 12
        },
    ];
    useEffect(() => {
        GameService.getGameById(Number(params.gameId)).then(response => setGame(response.data))
    }, [params])
    return (
        <Layout>
            <Row className="row-wrapper">
                <Col span={24}>
                    <div style={{position: "relative", color: "white"}}>
                        <Image alt={game?.title} className="img-wrapper" src={game?.thumbnail} width="100%" height="200px"/>
                        <h1 style={{position: "absolute", bottom: "10px", left: "10px"}}>{game?.title}</h1>
                    </div>
                </Col>
                <Col span={24} className="mt-16">
                    <Card>
                        <Descriptions items={infoItems} title="Game Info"/>
                    </Card>
                </Col>
                <Col span={24} className="mt-16">
                    <Card>
                        <Descriptions items={otherItems} title="Other"/>
                    </Card>
                </Col>
                <Col span={24} className="mt-16">
                    <Carousel autoplay>
                        {game?.screenshots.map(img => {
                            return <Image
                                src={img.image}
                                alt={game?.title}
                                className="slider-img"
                                width="100%"
                                height="300px"
                            />
                        })}
                    </Carousel>
                </Col>
            </Row>
        </Layout>
    );
};
