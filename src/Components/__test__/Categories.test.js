import React from 'react';
import { render, screen } from '@testing-library/react';
import {  QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router,useParams } from 'react-router-dom';
import { CartProvider, useSearchByCategory } from '../cartContext';
import Categories from '../Categories';

const queryClient=new QueryClient;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSearchByCategory: jest.fn(),
}));

test('renders search component when search is not empty', () => {
  useParams.mockReturnValue({ category: 'smartphones' });
  useSearchByCategory.mockReturnValue({ search: { id: 1, title: 'iPhone 9', category: 'smartphones' } });
    const mockData = [
      { id: 1, title: 'iPhone 9', category: 'smartphones' },
      { id: 2, title: 'iPhone X', category: 'smartphones' },
    ];
    queryClient.setQueryData('elements', {data:mockData});

  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CartProvider>
      <Categories />
      </CartProvider>
      </Router>
    </QueryClientProvider>
  );

  const searchComponent = screen.getByText('iPhone 9');

  expect(searchComponent).toBeInTheDocument();
});

test('renders product template when search is empty', () => {
  useParams.mockReturnValue({ category: 'smartphones' });
  useSearchByCategory.mockReturnValue({ search: '' });

  const mockData = [
    { id: 1, title: 'Product 1', category: 'smartphones' },
    { id: 2, title: 'Product 2', category: 'smartphones' },
  ];
  queryClient.setQueryData('elements', {data:mockData});

  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CartProvider>
      <Categories />
      </CartProvider>
      </Router>
    </QueryClientProvider>
  );

  const productTemplate = screen.getAllByTestId('productTitle');
  
  expect(productTemplate).toHaveLength(2);
});