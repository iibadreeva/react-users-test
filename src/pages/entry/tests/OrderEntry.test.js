import {render, screen, waitFor} from "../../../test-utils/testing-libary-utils";
import {rest} from 'msw'
import OrderEntry from "../OrderEntry";
import {server} from '../../../mocks/server'

test.skip('handles error for scoops toppings routes', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req,res,ctx) =>
            res(ctx.status(500))
        ),
        rest.get('http://localhost:3030/toppings', (req,res,ctx) =>
            res(ctx.status(500))
        )
    );

    render(<OrderEntry />)

    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts).toHaveLength(2)
    })
})

test('nota real test', () => {})