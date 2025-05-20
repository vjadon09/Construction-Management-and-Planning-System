import React, { useState } from 'react';
import { Container, Tab, Tabs, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const LandingPage: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [managerName, setManagerName] = useState('');
    const [budget, setBudget] = useState('');
    const [projectID, setProjectID] = useState<number>(0);
    const [errorShow, setErrorShow] = useState(false);
    const navigate = useNavigate();
    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Make API request to create project
            const response = await fetch('http://localhost:8000/project/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: -1,
                    name: projectName,
                    manager_name: managerName,
                    tasks: [],
                    stakeholders: [],
                    posts: [],
                    budget: parseInt(budget),
                    status: "Planning Phase"
                }),
            });

            if (!response.ok) {
                setErrorShow(true)
                return
            }

            const data = await response.json();
            // Extract the projectID from the response

            // Construct the project object with relevant data
            const project = {
                id: data.id,
                name: data.name,
                managerName: data.manager_name,
                tasks: data.tasks,
                stakeholders: data.stakeholders,
                posts: data.posts,
                budget: data.budget,
                status: data.status
            };
            navigate(`/dashboard/${project.id}`, { state: { project } });
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleProjectID = async () => {
        try {
            // Make API request to get project details
            const response = await fetch(`http://localhost:8000/project/${projectID}`);

            if (!response.ok) {
                setErrorShow(true)
                return
            }

            const data = await response.json();
            // Extract the projectID from the response

            // Construct the project object with relevant data
            const project = {
                id: data.id,
                name: data.name,
                managerName: data.manager_name,
                tasks: data.tasks,
                stakeholders: data.stakeholders,
                posts: data.posts,
                budget: data.budget,
                status: data.status
            };
            navigate(`/dashboard/${project.id}`, { state: { project } })
        } catch (error) {
            console.error('Error getting project:', error);
        }
    };

    return (
        <Container
            className="mt-5 d-flex flex-column align-items-center"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
                color: '#fff' // Adjust text color for readability
            }}
        >
            {errorShow && (
                <Alert variant="danger" onClose={() => setErrorShow(false)} dismissible>
                    <Alert.Heading>Error</Alert.Heading>
                    <p>Something went wrong while processing your request.</p>
                </Alert>
            )}
            <h2 className="text-center mb-4" style={{color: 'black'}}>Construction Planning and Development System</h2>
            <Row className="w-100 d-flex justify-content-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Col md={6} className="mb-4">
                    <Card className="shadow-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                        <Card.Body>
                            <h4 className="text-center mb-3">Start a New Project</h4>
                            <Form onSubmit={handleCreateProject}>
                                <Form.Group controlId="formProjectName" className="mb-3">
                                    <Form.Label>Project Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter project title" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formManagerName" className="mb-3">
                                    <Form.Label>Project Supervisor</Form.Label>
                                    <Form.Control type="text" placeholder="Enter supervisor's name" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formBudget" className="mb-3">
                                    <Form.Label>Allocated Budget (CAD)</Form.Label>
                                    <Form.Control type="number" placeholder="Enter allocated budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-100">Create Project</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                        <Card.Body>
                            <h4 className="text-center mb-3">Modify Existing Project</h4>
                            <Form>
                                <Form.Group controlId="formProjectID" className="mb-3">
                                    <Form.Label>Project Reference ID</Form.Label>
                                    <Form.Control type="number" placeholder="Enter project reference ID" onChange={(e) => setProjectID(parseInt(e.target.value))} />
                                </Form.Group>
                                <Button variant="primary" className="w-100" onClick={handleProjectID}>Continue</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};

export default LandingPage;
