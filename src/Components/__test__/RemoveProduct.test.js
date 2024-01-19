import { render, fireEvent } from '@testing-library/react';
import { useWishList, useSnackBar } from '../cartContext';
import RemoveProduct from '../RemoveProduct';

jest.mock('../cartContext', () => ({
  useWishList: jest.fn(),
  useSnackBar: jest.fn(),
}));

describe('RemoveProductFromWishlist', () => {
  const mockedRemoveItem = jest.fn();
  const mockedAddSnackbarItem = jest.fn();

  beforeEach(() => {
    useWishList.mockReturnValue({
      removeWishListItem: mockedRemoveItem,
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

    const { getByTestId } = render(<RemoveProduct id={id} title={title} />);

    const icon = getByTestId('DeleteIcon');
    fireEvent.click(icon);

    expect(mockedRemoveItem).toHaveBeenCalledWith({ id });
    expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true, `${title}  is removed Successfully`, 'success');
  });
});