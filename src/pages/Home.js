import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const Home = () => {
  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col>
            <Card className="text-center">
              <CardBody>
                <CardTitle tag="h1">Welcome to My App</CardTitle>
                <CardText>This is the home page of your React app using Reactstrap.</CardText>
                <Button color="primary" href="/about">Learn more</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;