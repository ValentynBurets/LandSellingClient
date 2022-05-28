import React, { Component } from "react";
import { Container, Tab, Nav, Row, Col, Card, CardDeck } from "react-bootstrap";

import Valentyn from "../../Assets/Images/About/Valentyn.jpg";

export default class About extends Component {
  render() {
    return (
      <Container>
        <Tab.Container id="ledt-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column mt-2">
                <Nav.Item>
                  <Nav.Link eventKey="first">What is "LandSelling"?</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Our team</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Used instruments</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="first">
                  <h2 className="text-center m-4">Who we are?</h2>
                  <p>
                    We are a team of young professionals who want to develop a
                    new and unique products that will not leave you indifferent.
                  </p>
                  <img
                    className="mx-auto d-block"
                    width="700"
                    height="auto"
                    src="data:image/jpeg;base64,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"
                  ></img>

                  <h2 className="text-center m-4">Our main goal?</h2>
                  <p>
                    Our main goal is to gain maximum skills in the development
                    of this site to apply them in the future in new and even
                    better projects. Each of us wants to develop in this
                    direction in the future and develop better and better
                    projects.
                  </p>
                  <img
                    className="mb-4 mx-auto d-block"
                    width="700"
                    height="auto"
                    src="https://ixbt.online/live/topics/preview/00/02/02/07/7ffea780cb.jpg"
                  ></img>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <CardDeck>
                    <Card
                      bg=""
                      border="dark"
                      className="mb-4"
                      style={{
                        "flex-wrap": "nowrap",
                        "min-width": "200px",
                        "max-width": "300px",
                      }}
                    >
                      <Card.Img
                        style={{ padding: "20px" }}
                        variant="top"
                        src={Valentyn}
                      />
                      <Card.Body>
                        <Card.Title>{this.props.Title}</Card.Title>
                        <Card.Text>
                          Valentyn Burets
                          <p />
                          Front-end developer
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <h2 className="text-center m-4">Front-end</h2>
                  <p>
                    React (also known as React.js or ReactJS) is an open-source
                    front-end JavaScript library for building user interfaces or
                    UI components. It is maintained by Facebook and a community
                    of individual developers and companies. React can be used as
                    a base in the development of single-page or mobile
                    applications. However, React is only concerned with state
                    management and rendering that state to the DOM, so creating
                    React applications usually requires the use of additional
                    libraries for routing, as well as certain client-side
                    functionality
                  </p>
                  <img
                    className="mb-4 mx-auto d-block"
                    width="700"
                    height="auto"
                    src="https://miro.medium.com/max/2484/1*CeuWv9fCjD1uTiTuKytnBQ.png"
                  ></img>

                  <h2 className="text-center m-4">Back-end</h2>
                  <p>
                    The .NET Framework (pronounced as "dot net") is a software
                    framework developed by Microsoft that runs primarily on
                    Microsoft Windows. It includes a large class library called
                    Framework Class Library (FCL) and provides language
                    interoperability (each language can use code written in
                    other languages) across several programming languages.
                    Programs written for .NET Framework execute in a software
                    environment (in contrast to a hardware environment) named
                    the Common Language Runtime (CLR). The CLR is an application
                    virtual machine that provides services such as security,
                    memory management, and exception handling. As such, computer
                    code written using .NET Framework is called "managed code".
                    FCL and CLR together constitute the .NET Framework.
                  </p>
                  <img
                    className="mb-4 mx-auto d-block"
                    width="700"
                    height="auto"
                    src="https://media.proglib.io/wp-uploads/2019/08/c-sharp-dot-net.png"
                  ></img>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }
}
