import { render, screen } from '@testing-library/react';
import Wishlist from '../Wishlist';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Cart from '../Cart';
import ProductList from '../ProductList';
import NavBarSearchDropDrown from '../NavbarDropDown';
import { CartProvider, useWishList } from '../cartContext';

const queryClient = new QueryClient

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useWishList: jest.fn(),
}));

test('renders empty message when wishlist is empty', () => {
  useWishList.mockReturnValue({
    wishListItems: [],
    search: []
  });
  const { getByText } = render(<QueryClientProvider client={queryClient}><CartProvider ><Wishlist wishListItems={[]} /></CartProvider></QueryClientProvider>);
  const emptyMessage = getByText('WishList is Empty!!');
  expect(emptyMessage).toBeInTheDocument();
});

test('renders wishlist products when wishlist is not empty', () => {

  const mockWishListItems = [
    { id: 1, title: 'Product 1', image: 'product1.jpg', price: 10 },
    { id: 2, title: 'Product 2', image: 'product2.jpg', price: 20 },
  ];
  useWishList.mockReturnValue({
    wishListItems: mockWishListItems,
    search: []
  });
  const { getByText } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Wishlist /></Router></CartProvider></QueryClientProvider>);

  expect(getByText('Product 1')).toBeInTheDocument();
  expect(getByText('Product 2')).toBeInTheDocument();
});

test('renders Search products when wishlist and search is not empty', () => {
  const mockWishListItems = [
    { id: 1, title: 'Product 1', image: 'product1.jpg', price: 10 },
    { id: 2, title: 'Product 2', image: 'product2.jpg', price: 20 },
  ];
  useWishList.mockReturnValue({
    wishListItems: mockWishListItems,
    search: mockWishListItems
  });

  const { getByText } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Wishlist /></Router></CartProvider></QueryClientProvider>);
  
  expect(getByText('Product 1')).toBeInTheDocument();
  expect(getByText('Product 2')).toBeInTheDocument();
});

test('renders wishlist products to buynow component', () => {
  const mockWishListItems = [
    { id: 1, title: 'Product 1', image: 'product1.jpg', price: 10 },
    { id: 2, title: 'Product 2', image: 'product2.jpg', price: 20 },
  ];
  useWishList.mockReturnValue({
    wishListItems: mockWishListItems,
    search: []
  });

  const { getByText } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Wishlist /></Router></CartProvider></QueryClientProvider>);
  
  expect(getByText('Product 1')).toBeInTheDocument();
  expect(getByText('Product 2')).toBeInTheDocument();
});

test('should throw an buynow error if used outside CartProvider', () => {
  expect(() => render(<QueryClientProvider client={queryClient}><Router><Cart /></Router></QueryClientProvider>)).toThrowError(
    'useCart must be used within a CartProvider'
  );

});

test('should throw an search error if used outside CartProvider', () => {
  expect(() => render(<QueryClientProvider client={queryClient}><Router><ProductList /></Router></QueryClientProvider>)).toThrowError(
    'useSearchProducts must be used within a CartProvider'
  );
});

test('should throw an search error if used outside CartProvider', () => {
  expect(() => render(<QueryClientProvider client={queryClient}><Router><NavBarSearchDropDrown /></Router></QueryClientProvider>)).toThrowError(
    'useSearchByDataList must be used within a CartProvider'
  );
});