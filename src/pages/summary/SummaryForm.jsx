import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

// const Example = () => (
//     <OverlayTrigger trigger="click" placement="right" overlay={popover}>
//         <Button variant="success">Click me to see</Button>
//     </OverlayTrigger>
// );
function SummaryForm({setOrderPhase}) {
    const [tcChecked, setTcChecked] = useState(false)

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                no ice cream will actually be delivered
            </Popover.Body>
        </Popover>
    );
    const checkboxLabel = (<span>
        agree to
        <OverlayTrigger placement="right" overlay={popover}>
            <span style={{color: 'blue'}}>Terms and Conditions</span>
        </OverlayTrigger>
    </span>)
    const handleSubmit = (event) => {
        event.preventDefault()
        setOrderPhase('completed')
    }

    return (<Form onSubmit={handleSubmit}>
        <Form.Group controlId="terms-and-conditions">
            <Form.Check
                type="checkbox"
                checked={tcChecked}
                onChange={(e) => setTcChecked(e.target.checked)}
                label={checkboxLabel}
            />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!tcChecked}>
            Confirm order
        </Button>
    </Form>)
}
export  default SummaryForm