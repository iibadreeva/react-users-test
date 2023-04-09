import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
export default function ToppingOption({name, imagePath,updateItemCount}){
    const handleChange = (event) => {
        updateItemCount(name, event.target.value)
    }
    return <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
        <img
            style={{width: '75%'}}
            src={`http://localhost:3000/${imagePath}`}
            alt={`${name} topping`}
        />
        {/*<Form.Group controlId={`${name}-count`} as={Row} style={{marginTop: '10px'}}>*/}
        {/*    <Form.Label column xs="6" style={{textAlign: 'right'}}>{name}</Form.Label>*/}
        {/*    <Col xs="5" style={{textAlign: 'left'}}>*/}
        {/*        <Form.Control*/}
        {/*            type="number"*/}
        {/*            defaultValue={0}*/}
        {/*            onChange={handleChange}*/}
        {/*        />*/}
        {/*    </Col>*/}
        {/*</Form.Group>*/}
        <Form.Group controlId={`${name}-topping-checkbox`}>
            <Form.Check
                type="checkbox"
                onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
                label={name}
            />
        </Form.Group>
    </Col>
}