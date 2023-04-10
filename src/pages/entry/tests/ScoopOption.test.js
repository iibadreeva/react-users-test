import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOptions";

test('indicate if scoop count is non-init or out of range', async () => {
    render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />)

    // expect input tot be invalid with negative number
    const vanillaInput = screen.getByRole('spinbutton');
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '-1')
    expect(vanillaInput).toHaveClass('is-invalid')

    // replace with decimal input
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2.5')
    expect(vanillaInput).toHaveClass('is-invalid')

    // replace with input that's to high
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '11')
    expect(vanillaInput).toHaveClass('is-invalid')

    // replace with valid input
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '3')
    expect(vanillaInput).not.toHaveClass('is-invalid')
})
