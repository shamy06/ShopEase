import { render, fireEvent } from '@testing-library/react';
import { useCart, useSnackBar } from '../cartContext';
import RemoveProductFromCart from '../RemoveProductFromCart';

jest.mock('../cartContext', () => ({
  useCart: jest.fn(),
  useSnackBar: jest.fn(),
}));

describe('RemoveProductFromCart', () => {
  const mockedRemoveItem = jest.fn();
  const mockedAddSnackbarItem = jest.fn();

  beforeEach(() => {
    useCart.mockReturnValue({
      removeItem: mockedRemoveItem,
    });
    useSnackBar.mockReturnValue({
      addSnackbarItem: mockedAddSnackbarItem,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls removeItem and shows success snackbar on icon click', () => {
    const id = 1;
    const title = 'Product 1';

    const { getByTestId } = render(<RemoveProductFromCart id={id} title={title} />)
    
    const icon = getByTestId('DeleteIcon');
    fireEvent.click(icon);

    expect(mockedRemoveItem).toHaveBeenCalledWith({ id });
    expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true, `${title}  is removed Successfully`, 'success');
  });
});