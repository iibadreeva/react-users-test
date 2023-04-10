// import {render, screen} from "@testing-library/react";
import {render, screen} from "../../../test-utils/testing-libary-utils";
import Options from "../Options";
import {OrderDetailsProvider} from "../../../contexts/OrderDetails";
import userEvent from "@testing-library/user-event";

// src/mocks/server.js, handlers.js
// связь src/setupTests.js
test('displays image for each scoop option from server', async () => {
    // render(<Options optionType="scoops" />, {wrapper: OrderDetailsProvider})
    render(<Options optionType="scoops" />)

    // find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2)

    // confirm alt text of images
    const altText = scoopImages.map(el => el.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})
test.skip('displays image for each toppings option from server', async () => {
    render(<Options optionType="toppings" />)

    // find images
    const scoopImages = await screen.findAllByRole('img', { name: /toppings$/i })
    expect(scoopImages).toHaveLength(3)

    // confirm alt text of images
    const altText = scoopImages.map(el => el.alt)
    expect(altText).toEqual([
        'Cherries toppings',
        'MSMs toppings',
        'Hot fudge toppings'
    ])
})

test("don't update total if scoops input is invalid", async () => {
    render(<Options optionType="scoops" />)

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '-1')

    // make sure scoops subtotal hasn't updated
    const scoopsSubtotal = screen.getByText('Scoops total: $0.00')
    expect(scoopsSubtotal).toBeInTheDocument()
})