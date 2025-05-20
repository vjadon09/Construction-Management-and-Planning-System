import { useRouteError } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8d7da", // Light red background for error
                padding: "20px"
            }}
        >
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card
                        className="shadow-lg p-4"
                        style={{
                            backgroundColor: "#ffffff",
                            borderColor: "#f5c6cb",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}
                    >
                        <Card.Body>
                            <h1
                                style={{
                                    fontSize: "4rem",
                                    color: "#721c24",
                                    fontWeight: "bold"
                                }}
                            >
                                Oops!
                            </h1>
                            <p
                                style={{
                                    fontSize: "1.25rem",
                                    color: "#721c24",
                                    marginBottom: "1.5rem"
                                }}
                            >
                                Sorry, an unexpected error has occurred.
                            </p>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    color: "#721c24",
                                    fontStyle: "italic"
                                }}
                            >
                                <i>{error.statusText || error.message}</i>
                            </p>
                            <Button
                                variant="danger"
                                onClick={() => window.location.reload()}
                                style={{
                                    marginTop: "1.5rem",
                                    backgroundColor: "#f44336",
                                    borderColor: "#f44336"
                                }}
                            >
                                Reload Page
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}