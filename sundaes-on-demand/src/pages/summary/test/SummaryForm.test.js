import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('İnitial conditions', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i
    });

    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', {
        name: /confirm order/i
    });

    expect(confirmButton).toBeDisabled();
});

test('CheckBox enables button on first click and disable on second click', async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i
    });

    const confirmButton = screen.getByRole('button', {
        name: /confirm order/i
    });

    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
});

test('popover respons to hover', async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i
    });

    const confirmButton = screen.getByRole('button', {
        name: /confirm order/i
    });

    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
});