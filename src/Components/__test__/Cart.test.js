import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider, useCart } from '../cartContext';
import Cart from '../Cart';
import Buynow from '../Buynow';

const queryClient = new QueryClient;

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useCart: jest.fn(),
}));

test('renders empty cart message when cart is empty', () => {
  useCart.mockReturnValue({ cartItems: [], totalPrices: 0, removeItem: jest.fn(), search: "" });

  render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Cart /></Router></CartProvider></QueryClientProvider>);

  const emptyCartMessage = screen.getByText(/cart is empty/i);

  expect(emptyCartMessage).toBeInTheDocument();
});

test('renders cart items when cart is not empty', () => {
  const mockCartItems = [
    { id: 1, title: 'Product 1', price: 10, category: 'Category 1', qnty: 1 },
    { id: 2, title: 'Product 2', price: 20, category: 'Category 2', qnty: 2 },
  ];
  useCart.mockReturnValue({ cartItems: mockCartItems, totalPrices: 50, removeItem: jest.fn(), search: '' });

  render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Cart /></Router></CartProvider></QueryClientProvider>);

  const productElements = screen.getAllByTestId('productTitle');

  expect(productElements).toHaveLength(2);
});

test('renders Search products when wishlist and search is not empty', () => {

  const mockCartItems = [
    { id: 1, title: 'Product 1', image: 'product1.jpg', price: 10 },
    { id: 2, title: 'Product 2', image: 'product2.jpg', price: 20 },
  ];
  useCart.mockReturnValue({ cartItems: mockCartItems, totalPrices: 50, removeItem: jest.fn(), search: mockCartItems });

  const { getByText } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Cart /></Router></CartProvider></QueryClientProvider>);

  expect(getByText('Product 1')).toBeInTheDocument();
  expect(getByText('Product 2')).toBeInTheDocument();
});

describe('Cart Quantity', () => {
  test('should render the initial quantity value', () => {
    const product = [{
      id: 1,
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 3
    }];
    useCart.mockReturnValue({ cartItems: product, totalPrices: 50, removeItem: jest.fn(), search: '' });

    const { container } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Cart /></Router></CartProvider></QueryClientProvider>);

    expect(container).toHaveTextContent('Quantity3');
  });

  test('should increase quantity when the plus icon is clicked', () => {
    const product = [{
      id: 1,
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 3
    }];
    useCart.mockReturnValue({ cartItems: product, totalPrices: 50, removeItem: jest.fn(), search: '' });

    const { getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Cart /></Router></CartProvider></QueryClientProvider>);

    const plusIcon = getByTestId('AddOutlinedIcon');
    fireEvent.click(plusIcon);

    expect(product[0].qnty).toBe(4);
  });

  test('should decrease quantity when the minus icon is clicked', () => {
    const product = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 3
    }];
    useCart.mockReturnValue({
      cartItems: product, totalPrices: 50, removeItem: jest.fn(), search: ''
    });

    const { getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Cart /></Router></CartProvider></QueryClientProvider>);

    const minusIcon = getByTestId('RemoveOutlinedIcon');
    fireEvent.click(minusIcon);

    expect(product[0].qnty).toBe(2);
  });

  test('should not decrease quantity below 1', () => {
    const product = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 1
    }];
    useCart.mockReturnValue({
      cartItems: product, totalPrices: 50, removeItem: jest.fn(), search: ''
    });

    const { getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Cart /></Router></CartProvider></QueryClientProvider>);

    const minusIcon = getByTestId('RemoveOutlinedIcon');
    fireEvent.click(minusIcon);

    expect(product[0].qnty).toBe(1);
  });
});

test('should throw an buynow error if used outside CartProvider', () => {
  expect(() => render(<QueryClientProvider client={queryClient}><Router><Buynow /></Router></QueryClientProvider>)).toThrowError(
    'useBuynow must be used within a CartProvider'
  );
});