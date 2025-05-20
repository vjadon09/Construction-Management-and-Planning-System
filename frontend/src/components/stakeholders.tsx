import { useState } from 'react';
import { Card, Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import { Stakeholder } from './models';
import { useParams } from 'react-router-dom';
import '../pages/Dashboard.css';

interface StakeholdersProps {
    project_stakeholders: Stakeholder[];
}

const Stakeholders = ({ project_stakeholders }: StakeholdersProps) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [stakeholders, setStakeholders] = useState(project_stakeholders);
    let { projectID } = useParams();

    const handleAdd = async () => {
        try {
            const response = await fetch(`http://localhost:8000/stakeholder/${projectID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: stakeholders.length + 1,
                    name,
                    role,
                }),
            });

            if (!response.ok) throw new Error('Failed to add stakeholder');

            const newStakeholderData = await response.json();
            const newStakeholder = newStakeholderData[newStakeholderData.length - 1];

            setStakeholders([...stakeholders, newStakeholder]);
            setName('');
            setRole('');
        } catch (error) {
            console.error('Error adding stakeholder:', error);
        }
    };

    const handleDelete = async (stakeholderId: number) => {
        try {
            const response = await fetch(
                `http://localhost:8000/stakeholder/${projectID}?stakeholder_id=${stakeholderId}`,
                { method: 'DELETE' }
            );

            if (!response.ok) throw new Error('Failed to delete stakeholder');

            setStakeholders(stakeholders.filter((s) => s.id !== stakeholderId));
        } catch (error) {
            console.error('Error deleting stakeholder:', error);
        }
    };

    return (
        <Container className="dashboard-container">
            <h4 className="text-center my-3 pb-3 text-primary">Stakeholders</h4>
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="dashboard-card">
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stakeholders.map((stakeholder, index) => (
                                        <tr key={index}>
                                            <td>{stakeholder.id}</td>
                                            <td>{stakeholder.name}</td>
                                            <td>{stakeholder.role}</td>
                                            <td>
                                                <Button
                                                    type="button"
                                                    variant="danger"
                                                    className="w-100"
                                                    onClick={() => handleDelete(stakeholder.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>
                                            <Form.Control type="number" disabled placeholder="ID" />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                placeholder="Role"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                className="w-100"
                                                type="button"
                                                variant="success"
                                                onClick={handleAdd}
                                            >
                                                Add
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Stakeholders;
