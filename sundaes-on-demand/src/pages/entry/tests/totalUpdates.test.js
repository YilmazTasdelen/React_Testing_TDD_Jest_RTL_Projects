import { render, screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';
import Options from '../Options';

test('update scoop subtotal when scoops change', () => {
    render(<Options optionType="scoops" />);

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
        { name: 'Vanilla ' }
    );
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopSubtotal).toHaveTextContent('2.00');


    //update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole(
        'spinbutton',
        { name: 'Chocolate' }
    );
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '1');
    expect(scoopSubtotal).toHaveTextContent('6.00');


});