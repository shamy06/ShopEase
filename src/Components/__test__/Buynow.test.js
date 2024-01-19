import React from 'react';
import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider, useBuynow, useSearchProducts } from '../cartContext';
import Buynow from '../Buynow';
import Wishlist from '../Wishlist';

const queryClient = new QueryClient();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useBuynow: jest.fn(),
  useSearchProducts: jest.fn()
}));

describe('Buynow', () => {
  const mockProduct = [{
    id: "1",
    title: "iPhone 9",
    subTitle: "APPLE iPhone 9 (Black, 64 GB)",
    category: "smartphones",
    price: 100.99,
    qnty: 1
  }]

  test('should render the empty buynow component without errors', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useBuynow.mockReturnValue({ buynowItems: [], removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });

    render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test('should render the buynow items component without errors', () => {
    useBuynow.mockReturnValue({ buynowItems: mockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });

    render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);

    expect(screen.getByRole("heading", { name: "APPLE iPhone 9 (Black, 64 GB)" })).toBeInTheDocument();
  });

  test('should render the search buynow items component without errors', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useBuynow.mockReturnValue({ buynowItems: mockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: mockProduct });
    
    render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test('renders invalid coupon code error message', () => {
    useBuynow.mockReturnValue({ buynowItems: mockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    const { getByLabelText, getByText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'NEW20' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
    const errorMessage = getByText('The Coupon only for price above ₹499 only.');
    
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders invalid coupon code error message', () => {
    useBuynow.mockReturnValue({ buynowItems: mockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });

    const { getByLabelText, getByText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'NEW5' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
    const errorMessage = getByText('The Coupon only for price above ₹1,599 only.');
    
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders invalid coupon code error message', () => {
    useBuynow.mockReturnValue({ buynowItems: mockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    const { getByLabelText, getByText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'NEW200' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
    const errorMessage = getByText('The Coupon only for price above ₹999 only.');
    
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders invalid coupon code error message', () => {
    useBuynow.mockReturnValue({ buynowItems: mockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    const { getByLabelText, getByText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'INVALIDCODE' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
    const errorMessage = getByText('The Coupon code is not valid.');
    
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders valid NEW20 coupon discounted price', () => {
    const couponmockProduct = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 89900.00,
      qnty: 1
    }]
    useBuynow.mockReturnValue({ buynowItems: couponmockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    const { getByLabelText, getByText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'NEW20' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
  });

  test('renders valid NEW5 coupon discounted price', () => {
    const couponmockProduct = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 89900.00,
      qnty: 1
    }]
    useBuynow.mockReturnValue({ buynowItems: couponmockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    const { getByLabelText, getByText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'NEW5' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
  });

  test('renders valid NEW200 coupon discounted price', () => {
    const couponmockProduct = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 89900.00,
      qnty: 1
    }]
    useBuynow.mockReturnValue({ buynowItems: couponmockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    const { getByLabelText, getByText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'NEW200' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
  });

  test('should render the place order from buynow component without errors', () => {
    const mockProducts = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 10.99,
      qnty: 1
    }, {
      id: "2",
      title: "iPhone X",
      subTitle: "APPLE iPhone X (Black, 64 GB)",
      category: "smartphones",
      price: 10.99,
      qnty: 1
    }
    ]
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useBuynow.mockReturnValue({ buynowItems: mockProducts, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const placeOrder = screen.getByRole("button", { name: "Place Order" });
    fireEvent.click(placeOrder)
    
    expect(mockNavigate).toHaveBeenCalledWith("/placeorder");
  });

  test('should render the initial quantity value', () => {
    const product = [{
      id: 1,
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 3
    }];

    useBuynow.mockReturnValue({ buynowItems: product, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });

    const { container } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Buynow /></Router></CartProvider></QueryClientProvider>);

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
    useBuynow.mockReturnValue({ buynowItems: product, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });

    const { getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Buynow /></Router></CartProvider></QueryClientProvider>);

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
    useBuynow.mockReturnValue({ buynowItems: product, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });

    const { getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Buynow /></Router></CartProvider></QueryClientProvider>);

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
    useBuynow.mockReturnValue({ buynowItems: product, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });

    const { getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider ><Router><Buynow /></Router></CartProvider></QueryClientProvider>);

    const minusIcon = getByTestId('RemoveOutlinedIcon');
    fireEvent.click(minusIcon);

    expect(product[0].qnty).toBe(1);
  });

  test('should render the delete buynow items component without errors', () => {
    const mockedRemoveItem = jest.fn();
    useBuynow.mockReturnValue({ buynowItems: mockProduct, removeBuynowItem: mockedRemoveItem });
    useSearchProducts.mockReturnValue({ search: [] });

    render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
   
    expect(screen.getByRole("heading", { name: "APPLE iPhone 9 (Black, 64 GB)" })).toBeInTheDocument();
   
    const icon = screen.getByTestId('DeleteIcon');
    fireEvent.click(icon);
   
    expect(mockedRemoveItem).toHaveBeenCalledWith({ "id": "1" });
  });

  test('renders NEW200 Valid coupon code message and then remove it', () => {
    const couponmockProduct = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 89900.00,
      qnty: 1
    }]
    useBuynow.mockReturnValue({ buynowItems: couponmockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    const { getByLabelText, getByText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'NEW200' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
    const removeButton = getByText('Remove');
    fireEvent.click(removeButton);
    const applyButtonagain = getByText('Apply');
   
    expect(applyButtonagain).toBeInTheDocument();
  });

  test('renders NEW200 Valid coupon code message and then decrese the qnty of product', () => {
    const couponmockProduct = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 8990.00,
      qnty: 2
    }]
    useBuynow.mockReturnValue({ buynowItems: couponmockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    const { getByLabelText, getByText, getByTestId } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><Buynow /></CartProvider></Router></QueryClientProvider>);
    
    const couponInput = getByLabelText('Apply Coupon');
    fireEvent.change(couponInput, { target: { value: 'NEW200' } });
    const applyButton = getByText('Apply');
    fireEvent.click(applyButton);
    const minusIcon = getByTestId('RemoveOutlinedIcon');
    fireEvent.click(minusIcon);
    
    expect(couponmockProduct[0].qnty).toBe(1);
  });

  test('should throw an snackbar error if used outside CartProvider', () => {
    const couponmockProduct = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 8990.00,
      qnty: 2
    }]
    useBuynow.mockReturnValue({ buynowItems: couponmockProduct, removeBuynowItem: jest.fn() });
    useSearchProducts.mockReturnValue({ search: [] });
    
    expect(() => render(<QueryClientProvider client={queryClient}><Router><Buynow /></Router></QueryClientProvider>)).toThrowError(
      'Snackbar must be used within a CartProvider'
    );
    
  });

  test('should throw an buynow error if used outside CartProvider', () => {
    expect(() => render(<QueryClientProvider client={queryClient}><Router><Wishlist /></Router></QueryClientProvider>)).toThrowError(
      'useWishList must be used within a CartProvider'
    );
  });
});