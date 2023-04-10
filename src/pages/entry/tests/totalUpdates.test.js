import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import {OrderDetailsProvider} from "../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />, {wrapper: OrderDetailsProvider})

    // make sure total stats out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {exact: false})
    expect(scoopsSubtotal).toHaveTextContent('0.00')

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')
    expect(scoopsSubtotal).toHaveTextContent('6.00')
})

describe('grand total', () => {
    test('grand total updates properly if scoop is added first', async () => {
        render(<OrderEntry />)
        const grandTotal = screen.getByRole('heading', {
            name: /grand total: \$/i
        })

        // check that the grand total starts out at 0
        expect(grandTotal).toHaveTextContent('0.00')

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        })
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '2')
        expect(grandTotal).toHaveTextContent('4.00')

        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        })
        userEvent.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('5.50')
    })
    test('grand total updates properly if topping is added first', async () => {
        render(<OrderEntry />)
        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        })
        userEvent.click(cherriesCheckbox)
        const grandTotal = screen.getByRole('heading', {
            name: /grand total: \$/i
        })
        expect(grandTotal).toHaveTextContent('1.50')

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        })
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '2')
        expect(grandTotal).toHaveTextContent('5.50')
    })
    test('grand total updates properly if item is removed', async () => {
        render(<OrderEntry />)
        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        })
        userEvent.click(cherriesCheckbox)

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        })
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '2')

        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '1')

        const grandTotal = screen.getByRole('heading', {
            name: /grand total: \$/i
        })
        expect(grandTotal).toHaveTextContent('3.50')

        userEvent.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('2.00')
    })
})