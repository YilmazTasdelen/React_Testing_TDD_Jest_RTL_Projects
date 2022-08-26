import { render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
//we  need these two for override some mock methods. we override them for error schenarios.
import { rest } from 'msw';
import { server } from '../../../mocks/server';


test('handles eeror for scoops and topping routes', async () => {
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

    const alerts = await screen.findAllByRole('alert', {
        name: 'An unexpected error ocurred. Please try again later.'
    });

    expect(alerts).toHaveLength(2);

});