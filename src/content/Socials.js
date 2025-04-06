import React from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle, Row } from 'reactstrap';

export default function Socials () {

    return (
        <Row>
            <Card
                className="my-2"
                color="dark"
                inverse
                style={{
                    width: '18rem'
                }}
            >
                <CardHeader>
                    Header
                </CardHeader>
                <CardBody>
                    <CardTitle tag="h5">
                        Special Title Treatment
                    </CardTitle>
                    <CardText>
                        With supporting text below as a natural lead-in to additional content.
                    </CardText>
                </CardBody>
            </Card>
        </Row>
    );
}