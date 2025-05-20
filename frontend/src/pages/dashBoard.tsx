import { Tab, Row, Nav, Col, InputGroup, Form } from 'react-bootstrap';
import Tasks from "../components/tasks.tsx";
import Posts from "../components/sites.tsx";
import Stakeholders from "../components/stakeholders.tsx";
import LocationRanker from "../components/LocationRanker.tsx";
import { useLocation } from "react-router-dom";
import ErrorPage from "./error.tsx";
import { useState } from "react";
import NavComp from "../components/Navbar.tsx";
import './Dashboard.css';

const Dashboard = () => {
    const location = useLocation();
    const projectExists = location.state && location.state.project;
    if (!projectExists) return <ErrorPage />;
    
    const project = location.state.project;
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [editedBudget, setEditedBudget] = useState(project.budget);
    const [editedStatus, setEditedStatus] = useState(project.status);

    const handleBudgetDoubleClick = () => setIsEditingBudget(true);
    const handleStatusDoubleClick = () => setIsEditingStatus(true);
    const handleBudgetChange = (e: any) => setEditedBudget(e.target.value);
    const handleStatusChange = (e: any) => setEditedStatus(e.target.value);

    const handleBudgetBlur = async () => {
        setIsEditingBudget(false);
        try {
            const response = await fetch(`http://localhost:8000/project/budget/${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ new_budget: parseFloat(editedBudget) }),
            });
            if (!response.ok) throw new Error('Failed to update budget');
        } catch (error) {
            console.error('Error updating budget:', error);
        }
    };

    const handleStatusBlur = async () => {
        setIsEditingStatus(false);
        try {
            const response = await fetch(`http://localhost:8000/project/status/${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ new_status: editedStatus }),
            });
            if (!response.ok) throw new Error('Failed to update status');
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <>
            <NavComp title={project.name} />
            <div className="project-details">
                <h5 className="d-flex justify-content-center">Project ID: {project.id}</h5>
                {isEditingBudget ? (
                    <InputGroup>
                        <Form.Control type="number" value={editedBudget} onChange={handleBudgetChange} onBlur={handleBudgetBlur} autoFocus />
                    </InputGroup>
                ) : (
                    <h6 className="d-flex justify-content-center" onDoubleClick={handleBudgetDoubleClick}>Budget: ${editedBudget}</h6>
                )}
                {isEditingStatus ? (
                    <InputGroup>
                        <Form.Control type="text" value={editedStatus} onChange={handleStatusChange} onBlur={handleStatusBlur} autoFocus />
                    </InputGroup>
                ) : (
                    <h6 className="d-flex justify-content-center" onDoubleClick={handleStatusDoubleClick}>Status: {editedStatus}</h6>
                )}
            </div>

            <Tab.Container id="left-tabs" defaultActiveKey="tasks">
                <Nav variant="tabs" className="dashboard-nav justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey="tasks">Tasks</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="stakeholders">Stakeholders</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="posts">Posts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="locationRanker">Ranks</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Row className="dashboard-container">
                    <Col sm={12}>
                        <Tab.Content>
                            <Tab.Pane eventKey="tasks">
                                <Tasks project_tasks={project.tasks} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="stakeholders">
                                <Stakeholders project_stakeholders={project.stakeholders} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="posts">
                                <Posts project_posts={project.posts} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="locationRanker">
                                <LocationRanker />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
};

export default Dashboard;
