import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import WishListNavbar from "../WishlistNavbar";
import { CartProvider, useSearchProducts, useSnackBar } from "../cartContext";

const queryClient = new QueryClient();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSnackBar: jest.fn(),
  useSearchProducts: jest.fn(),
}));

describe("WishListNavbar", () => {
  test("renders favorite icon and item count", () => {
    const wishListItemCount = 3;
    const mockAddSnackbarItem = jest.fn();
    const mockSearchFilter = jest.fn();
    useSnackBar.mockReturnValue({ addSnackbarItem: mockAddSnackbarItem });
    useSearchProducts.mockReturnValue({ searchFilter: mockSearchFilter });

    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router>
            <WishListNavbar wishListItemCount={wishListItemCount} />
          </Router>
        </CartProvider>
      </QueryClientProvider>
    );

    const favoriteIcon = screen.getByTestId("FavoriteIcon");
    const itemCount = screen.getByText(wishListItemCount.toString());

    expect(favoriteIcon).toBeInTheDocument();
    expect(itemCount).toBeInTheDocument();
  });

  test("renders favorite icon without item count if count is zero", () => {
    const wishListItemCount = 0;
    const mockAddSnackbarItem = jest.fn();
    const mockSearchFilter = jest.fn();
    useSnackBar.mockReturnValue({ addSnackbarItem: mockAddSnackbarItem });
    useSearchProducts.mockReturnValue({ searchFilter: mockSearchFilter });

    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router>
            <WishListNavbar wishListItemCount={wishListItemCount} />
          </Router>
        </CartProvider>
      </QueryClientProvider>
    );

    const favoriteIcon = screen.getByTestId("FavoriteIcon");
    const itemCount = screen.queryByText(wishListItemCount.toString());

    expect(favoriteIcon).toBeInTheDocument();
    expect(itemCount).toBeNull();
  });

  test('navigates to wishlist page and clears search when favorite icon is clicked', () => {
    const wishListItemCount = 2;
    localStorage.setItem('signUp', 'Shubham01');
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const mockAddSnackbarItem = jest.fn();
    const mockSearchFilter = jest.fn();
    useSnackBar.mockReturnValue({ addSnackbarItem: mockAddSnackbarItem });
    useSearchProducts.mockReturnValue({ searchFilter: mockSearchFilter });

    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router>
            <WishListNavbar wishListItemCount={wishListItemCount} />
          </Router>
        </CartProvider>
      </QueryClientProvider>
    );

    const favoriteIcon = screen.getByTestId("FavoriteIcon");
    fireEvent.click(favoriteIcon);

    expect(mockNavigate).toHaveBeenCalledWith('/wishlist');
    expect(mockSearchFilter).toHaveBeenCalledWith('');
  });

  test('navigates to login page and shows snackbar when user is not logged in', () => {
    localStorage.clear();
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const mockAddSnackbarItem = jest.fn();
    const mockSearchFilter = jest.fn();
    useSnackBar.mockReturnValue({ addSnackbarItem: mockAddSnackbarItem });
    useSearchProducts.mockReturnValue({ searchFilter: mockSearchFilter });

    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router><WishListNavbar wishListItemCount={0} /></Router></CartProvider>
      </QueryClientProvider>);

    const favoriteIcon = screen.getByTestId("FavoriteIcon");
    fireEvent.click(favoriteIcon);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockAddSnackbarItem).toHaveBeenCalledWith(true, 'Login Required', 'info');
  });
})