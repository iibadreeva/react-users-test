import {getByRole, render, screen, within} from "@testing-library/react";
import UserList from "./UserList";
function renderComponent() {
    const users = [
        {name: 'Inna', email: 'inna@inna.com'},
        {name: 'jane', email: 'jane@jane.com'}
    ]
    // Render the component
    render(<UserList users={users} />);

    return {
        users
    }
}


test('render one row per user', () => {
    const {users} = renderComponent()

    // Find all the rows in the table
    // screen.logTestingPlaygroundURL() // watch component by link
    // const listitems = screen.getAllByRole('listitem');
    const listitems = within(screen.getByTestId('users')).getAllByRole('listitem');

    // const {container} = render(<UserList users={users} />)
    // const listitems = container.querySelectorAll('ul li')

    // Assertion: correct number of rows in the table
    expect(listitems).toHaveLength(2);
})

test('render the email and name of each user', () => {
    const {users} = renderComponent()
    // screen.logTestingPlaygroundURL()

    for(const user of users){
        const name = screen.getByRole('cell', {name: user.name})
        const email = screen.getByRole('cell', {name: user.email})

        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
    }
})