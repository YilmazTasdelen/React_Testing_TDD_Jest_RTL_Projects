import Alert from 'react-bootstrap/Alert';

export default function AlertBanner({ message, variant }) {
    const alertMessage = message || 'An unexpected error occured. Pleasetry again later.';
    const alkertVariant = variant || 'danger';

    return (
        <Alert variant={alkertVariant} style={{ backgroundColor: 'red' }}>
            {alertMessage}
        </Alert>
    );
}