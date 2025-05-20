import { useState } from 'react';
import { Container, Col, Row, Button, Form, Tab, Tabs, Table, Card } from 'react-bootstrap';
import '../pages/Dashboard.css';

const LocationRanker = () => {
    const suggestions = [
        'Parkdale-High Park', 'Scarborough Town Centre', 'Rosedale-Moore Park',
        'Queen Street West', 'The Beaches', 'Riverdale', 'Kingston Road Village', 'Leslieville',
        'Trinity-Bellwoods', 'Dundas West', 'High Park North', 'Eglinton East',
        'Little Italy', 'Bayview Village', 'Liberty Village', 'Danforth Village', 
        'Clinton Street', 'St. Lawrence', 'Forest Hill', 'Bloor West Village'
    ];    

    const [locations, setLocations] = useState<string[]>([]);
    const [locationInput, setLocationInput] = useState('');

    const handleLocationSubmit = (e: any) => {
        e.preventDefault();
        if (locations.length < 5 && locationInput.trim() !== '') {
            setLocations([...locations, locationInput.trim()]);
            setLocationInput('');
        }
    };

    const handleRankSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/rank`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([...locations]),
            });
            if (!response.ok) throw new Error('Failed to rank locations');

            const rankedLocations = await response.json();
            setLocations(rankedLocations);
        } catch (error) {
            console.error('Error ranking locations:', error);
        }
    };

    const handleDeleteLocation = (index: number) => {
        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
    };

    return (
        <Container className="dashboard-container">
            <h4 className="text-center my-3 pb-3 text-primary">Add and Rank Locations</h4>
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="dashboard-card">
                        <Card.Body>
                            <Tabs defaultActiveKey="addLocation" className="mb-4">
                                <Tab eventKey="addLocation" title="Add Location" className="text-center">
                                    <Form onSubmit={handleLocationSubmit}>
                                        <Form.Group controlId="formLocation" className="mb-3">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Location"
                                                list="locationSuggestions"
                                                value={locationInput}
                                                onChange={(e) => setLocationInput(e.target.value)}
                                            />
                                            <datalist id="locationSuggestions">
                                                {suggestions.map((suggestion, index) => (
                                                    <option key={index} value={suggestion} />
                                                ))}
                                            </datalist>
                                        </Form.Group>
                                        <Button variant="success" type="submit" className="w-50">
                                            Add Location
                                        </Button>
                                    </Form>
                                </Tab>
                                <Tab eventKey="rankLocation" title="Rank Locations" className="text-center">
                                    <Button variant="warning" className="mb-3 w-50" onClick={handleRankSubmit}>
                                        Rank
                                    </Button>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Rank</th>
                                                <th>Location</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {locations.map((location, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{location}</td>
                                                    <td className="text-center">
                                                        <Button variant="danger" size="sm" onClick={() => handleDeleteLocation(index)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LocationRanker;