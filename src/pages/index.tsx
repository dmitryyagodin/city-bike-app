import { Col, Container, Row } from '@components';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>City-bike Helsinki | Homepage</title>
        <meta name="description" content="Helsinki city bike. Homepage" key="desc" />
      </Head>
      <Container>
        <Row className="text-center">
          <Col mobileS={12}>
            <h1>Helsinki city bikes</h1>
          </Col>
          <Col mobileS={8} desktop={4} className="mx-auto">
            <p>
              This is a demo web app. It lists city bike stations and the rides associated with them.
              The data belongs to City Bike Finland and covers over 400 stations and 1.5 million
              rides from May to July 2021.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
