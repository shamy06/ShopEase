import React from "react";
import { useCart, useSnackBar } from "../cartContext";
import { render, fireEvent } from "@testing-library/react";
import AddtoCart from "../AddToCart";

jest.mock('../cartContext', () => ({
  useCart: jest.fn(),
  useSnackBar: jest.fn(),
}));

describe('AddtoCart', () => {
  const mockedAddItem = jest.fn();
  const mockedAddSnackbarItem = jest.fn();

  beforeEach(() => {
    useCart.mockReturnValue({
      addItem: mockedAddItem,
      cartItems: [],
    });

    useSnackBar.mockReturnValue({
      addSnackbarItem: mockedAddSnackbarItem,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls addItem and shows success snackbar on button click', () => {
    const id = 1;
    const title = 'Product 1';

    const { getByText } = render(<AddtoCart id={id} title={title} />);

    const button = getByText('Add Cart');
    fireEvent.click(button);

    expect(mockedAddItem).toHaveBeenCalledWith({ "id": 1 });
    expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true, `${title} is added to cart Successfully`, 'success');
  });

  test('shows info snackbar if item is already in cart', () => {
    const id = 1;
    const title = 'Product 1';

    useCart.mockReturnValue({
      addItem: mockedAddItem,
      cartItems: [{ id: 1 }],
    });

    const { getByText } = render(<AddtoCart id={id} title={title} />);

    const button = getByText('Add Cart');
    fireEvent.click(button);

    expect(mockedAddItem).not.toHaveBeenCalled();
    expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true, `${title} is already added`, 'info');
  });
});