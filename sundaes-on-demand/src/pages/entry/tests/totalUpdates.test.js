import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Options from '../Options';
import { OrderdetailProvider } from '../../../contexts/OrderDetail';

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderdetailProvider });

    //make sure total starts out $0.00
    // for the partial match exact:false
    const scoopSubtotal = screen.getByText(
        'Scoops total : $',
        { exact: false }
    );
    expect(scoopSubtotal).toHaveTextContent('0.00');
    //update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole(
        'spinbutton',
        { name: 'Vanilla' }
    );
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(scoopSubtotal).toHaveTextContent('2.00');


    //update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole(
        'spinbutton',
        { name: 'Chocolate' }
    );
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '1');
    expect(scoopSubtotal).toHaveTextContent('4.00');


});