import Alert from 'react-bootstrap/Alert'
export default function AlertBanner({massage, variant}){
    const alertMassage = massage || "An unexpected error occurred. Please try again later.";
    const alertVariant = variant || "danger";

    return (<Alert variant={alertVariant} style={{backgroundColor: 'red'}}>{alertMassage}</Alert>)
}