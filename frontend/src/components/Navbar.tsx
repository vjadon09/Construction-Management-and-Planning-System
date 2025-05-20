import { Container, Navbar } from 'react-bootstrap';

const NavigationBar = ({ title }: { title: string }) => {
    return (
        <Navbar
            expand="lg"
            className="shadow-sm"
            style={{
                backgroundColor: 'rgba(165, 234, 255, 0.85)',
                color: 'black',
                padding: '15px 0',
            }}
        >
            <Container className="d-flex justify-content-center">
                <Navbar.Brand
                    style={{
                        color: 'black',
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        letterSpacing: '1px',
                    }}
                >
                    Construction Dashboard: {title}
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
