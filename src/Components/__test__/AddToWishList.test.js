import { render, fireEvent, getByTestId, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import AddtoWishList from '../AddToWishList';
import { useSnackBar, useWishList } from '../cartContext';

jest.mock('../cartContext', () => ({
  useSnackBar: jest.fn(),
  useWishList: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('AddtoWishList', () => {
  const mockedAddWishListItem = jest.fn();
  const mockedRemoveWishListItem = jest.fn();
  const mockedAddSnackbarItem = jest.fn();
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    useWishList.mockReturnValue({
      addWishListItem: mockedAddWishListItem,
      removeWishListItem: mockedRemoveWishListItem,
      wishListItems: [],
    });
    useSnackBar.mockReturnValue({
      addSnackbarItem: mockedAddSnackbarItem,
    });
    useNavigate.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls addWishListItem and shows success snackbar on button click when logged in', () => {
    const id = 1;
    const title = 'Product 1';
    localStorage.setItem('signUp', 'Shubham01');

    const { getByTestId } = render(<AddtoWishList id={id} title={title} />);

    const button = getByTestId('FavoriteIcon');
    fireEvent.click(button);

    expect(mockedAddWishListItem).toHaveBeenCalledWith({ id });
    expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true,`${title}  is added to wishlist Successfully`, 'success');
  });

  test('calls removeWishListItem and shows success snackbar on button click when Item already in wishlist', () => {
    const id = 1;
    const title = 'Product 1';
    localStorage.setItem('signUp', 'Shubham01');

    useWishList.mockReturnValue({
      addWishListItem: mockedAddWishListItem,
      removeWishListItem: mockedRemoveWishListItem,
      wishListItems: [{ id }],
    });

    const { getByTestId } = render(<AddtoWishList id={id} title={title} />);

    const button = getByTestId('FavoriteIcon');
    fireEvent.click(button);

    expect(mockedRemoveWishListItem).toHaveBeenCalledWith({ id });
    expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true,`${title}  is removed Successfully`, 'success');
  });

  test('shows info snackbar and navigates to login page on button click when not logged in', () => {
    const id = 1;
    const title = 'Product 1';
    localStorage.clear();

    const { getByTestId } = render(<AddtoWishList id={id} title={title} />);

    const button = getByTestId('FavoriteIcon');
    fireEvent.click(button);

    expect(mockedAddWishListItem).not.toHaveBeenCalled();
    expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true, 'Login is Required', 'info');
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});