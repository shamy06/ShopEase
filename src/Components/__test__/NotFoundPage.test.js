import { render, screen } from '@testing-library/react';
import { CartProvider, CartContext, useSearchProducts, useSearchByCart, useSearchByWishList, useSearchByCategory, useSearchbyDataList } from '../cartContext';
import NotFoundPage from '../NotFoundPage';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBarSearchDropDrown from '../NavbarDropDown';
import { QueryClient, QueryClientProvider } from "react-query";

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSearchByWishList: jest.fn(),
  useSearchbyDataList: jest.fn(),
  useSearchProducts: jest.fn()
}));

const queryClient = new QueryClient();

test('renders placeOrder react', () => {
  render(<NotFoundPage />);

  const OrderElement = screen.getByText("Page Not Found")

  expect(OrderElement).toBeInTheDocument();
});

test('should throw an search error if used outside CartProvider', () => {
  const mockSearchByDataList = jest.fn();
  useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
  const mocksearchFilter = jest.fn();
  useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });
  const mockWishListItems = jest.fn();
  const mocksearchWishList = jest.fn();
  useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });

  expect(() => render(<QueryClientProvider client={queryClient}><Router><NavBarSearchDropDrown /></Router></QueryClientProvider>)).toThrowError(
    'useSearchByCart must be used within a CartProvider'
  );
});