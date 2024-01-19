import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useSnackBar } from '../cartContext';
import CustomizedSnackbars from '../Snackbar';

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSnackBar: jest.fn(),
}));

test('renders snackbar with correct message and type when open', () => {
  useSnackBar.mockReturnValue({
    snackbarOpen: true,
    snackbarMessage: 'Success!',
    snackbarType: 'success',
    addSnackbarItem: jest.fn(),
  });

  render(<CustomizedSnackbars />);

  const snackbar = screen.getByRole('alert');

  expect(snackbar).toBeInTheDocument();
  expect(snackbar).toHaveTextContent('Success!');
  expect(snackbar).toHaveClass('MuiAlert-filledSuccess');
});

test('does not render snackbar when closed', () => {
  useSnackBar.mockReturnValue({
    snackbarOpen: false,
    snackbarMessage: 'Error!',
    snackbarType: 'error',
    addSnackbarItem: jest.fn(),
  });

  render(<CustomizedSnackbars />);

  const snackbar = screen.queryByRole('alert');

  expect(snackbar).toBeNull();
});

test('calls addSnackbarItem with correct arguments when reason is not clickaway', () => {
  const addSnackbarItemMock = jest.fn();
  useSnackBar.mockReturnValue({
    snackbarOpen: true,
    snackbarMessage: 'Success!',
    snackbarType: 'success',
    addSnackbarItem: addSnackbarItemMock,
  });

  render(<CustomizedSnackbars />);

  fireEvent.click(screen.getByTestId('CloseIcon'));

  expect(addSnackbarItemMock).toHaveBeenCalled();

});

test('does not call addSnackbarItem when reason is clickaway', () => {
  const addSnackbarItemMock = jest.fn();
  useSnackBar.mockReturnValue({
    snackbarOpen: true,
    snackbarMessage: 'Success!',
    snackbarType: 'success',
    addSnackbarItem: addSnackbarItemMock,
  });

  render(<CustomizedSnackbars />);

  fireEvent.click(screen.getByRole('alert'), { reason: 'clickaway' });

  expect(addSnackbarItemMock).not.toHaveBeenCalled();

});