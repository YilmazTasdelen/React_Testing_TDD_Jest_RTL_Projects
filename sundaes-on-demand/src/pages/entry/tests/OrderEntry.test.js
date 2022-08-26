import { render, screen, waitFor } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
//we  need these two for override some mock methods. we override them for error schenarios.
import { rest } from 'msw';
import { server } from '../../../mocks/server';


test.only('handles eeror for scoops and topping routes', async () => {
    //ovver ride mock services for error 
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
            res(ctx.status(500))
        ),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
            res(ctx.status(500))
        ),
    );

    // then render the component and test
    render(<OrderEntry />);

    // const alerts = await screen.findAllByRole('alert', {
    //     name: 'An unexpected error ocurred. Please try again later.'
    // });
    /**we need to wait until lboth mock server calls the fail. Buto code in line between 22 - 24
     * await until one of the calls and but we expecting 2 500 error status. Thats why we use wait for instead of 
     * just await findallbyrole
     */
    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });

});