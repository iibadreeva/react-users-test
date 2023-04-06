import {render, screen} from "@testing-library/react";
import user from '@testing-library/user-event'
import UserForm from "../UserForm";

test('it show two inputs and a button', async () => {
    // render the component
    render(<UserForm />)

    // Manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    // Assertion - make sure the component is doing
    // what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', () => {
    // NOT THE BEST IMPLEMENTATION
    // const argList = []
    // const callback = (...args) => {
    //     argList.push(args)
    // }
    const mock = jest.fn();

    // Try to render my component
    render(<UserForm onUserAdd={mock} />) // onUserAdd={callback}

    // Find the two inputs
    // const [nameInput, emailInput] = screen.getAllByRole('textbox');
    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    })
    const emailInput = screen.getByRole('textbox', {
        name: /email/i
    })

    // Simulate typing in a name
    user.click(nameInput)
    user.keyboard('jane')

    // Simulate typing in an email
    user.click(emailInput)
    user.keyboard('jane@jane.com')

    // find the button
    const button = screen.getByRole('button');

    // Simulate clicking the button
    user.click(button);

    // Assertion to make sure 'onUserAdd' gets called with email/name
    // expect(argList).toHaveLength(1)
    // expect(argList[0][0]).toEqual({name: 'jane', email: 'jane@jane.com'})
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name: 'jane', email: 'jane@jane.com'})
    expect(mock).not.toHaveBeenCalledWith({name: 'Inna', email: 'inna@inna.com'})
})

test('empties the two inputs when is submitted', () => {
    render(<UserForm onUserAdd={() => {}} />)

    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const button = screen.getByRole('button')

    user.click(nameInput);
    user.keyboard('jane');
    user.click(emailInput);
    user.keyboard('jane@jane.com');

    user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
})
