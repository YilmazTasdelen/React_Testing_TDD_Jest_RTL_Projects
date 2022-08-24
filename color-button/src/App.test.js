import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Button has correct initial collor', () => {
  render(<App />);
  // find an element with a role of button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to blue',
  });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
});

test('buton turns blue when clicked', () => {
  render(<App />);
  // find an element with a role of button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to blue',
  });
  // click the button
  fireEvent.click(colorButton);

  // expect the bacground color turn to be blue after click
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  expect(colorButton.textContent).toBe('Change to red');
});


test('check button is enabled and checkbox is not checked at the start', () => {
  render(<App />);
  // check  that the button starts out enabled 
  const colorButton = screen.getByRole('button', {
    name: 'Change to blue',
  });
  expect(colorButton).toBeEnabled();

  //check out the checkbox starts out unchecked 
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

});

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'Disable button',
  });
  const button = screen.getByRole('button', {
    name: 'Change to blue',
  });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});


test('disable button has gray background and reverts to red', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', {
    name: 'Disable button',
  });
  const button = screen.getByRole('button', {
    name: 'Change to blue',
  });

  //disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: gray');
  // enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: red');

});


test('disable button has gray background and reverts to blue', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', {
    name: 'Disable button',
  });
  const button = screen.getByRole('button', {
    name: 'Change to blue',
  });

  //disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: gray');
  // enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: blue');

});