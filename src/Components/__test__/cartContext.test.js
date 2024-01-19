import { useContext } from 'react';
import { renderHook, act, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider, CartContext, useSearchProducts, useSearchByWishList, useSearchbyDataList } from '../cartContext';
import NavBarSearchDropDrown from '../NavbarDropDown';

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSearchbyDataList: jest.fn(),
  useSearchProducts: jest.fn(),
  useWishList: jest.fn(),
}));

describe('CartProvider', () => {
  const mockProduct = [
    { id: 1, title: 'Product 1' },
    { id: 2, title: 'Product 2' },
    { id: 3, title: 'Product 3' },
  ];

  const queryClient = new QueryClient();
  queryClient.setQueryData('elements', { data: mockProduct });

  test('addItem should add an item to the cart', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => { 
      result.current.addItem({ id: 1 })
    });

    expect(result.current.cartItems).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  test('removeItem should remove an item from the cart', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addItem({ id: 1 });
      result.current.addItem({ id: 2 });
    });
    act(() => {
      result.current.removeItem({ id: 1 });
    });

    expect(result.current.cartItems).toEqual([{ id: 2, title: 'Product 2' }]);
  });

  test('addItem should add an item to the wishList', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addWishListItem({ id: 1 });
    });

    expect(result.current.wishListItems).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  test('removeItem should remove an item from the wishList', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addWishListItem({ id: 1 });
      result.current.addWishListItem({ id: 2 });
    });
    act(() => {
      result.current.removeWishListItem({ id: 1 });
    });

    expect(result.current.wishListItems).toEqual([{ id: 2, title: 'Product 2' }]);
  });

  test('addItem should add an item to the buynow', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addBuynowItem({ id: 1 });
    });

    expect(result.current.buynowItems).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  test('removeItem should remove an item from the buynow', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addBuynowItem({ id: 1 });
      result.current.addBuynowItem({ id: 2 });
    });
    act(() => {
      result.current.removeBuynowItem({ id: 1 });
    });

    expect(result.current.buynowItems).toEqual([{ id: 2, title: 'Product 2' }]);
  });

  test('removeItem should remove an item from the buynow while moving out all the items from cart', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addItem({ id: 1 });
    });

    act(() => {
      result.current.addBuynowItem({ id: result.current.cartItems });
    });

    expect(result.current.buynowItems).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  test('searchByDataList should set dataList correctly when dataListItem is not empty', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    const dataListItem = 'Product 1';

    act(() => {
      result.current.searchByDataList(dataListItem);
    });

    expect(result.current.dataList).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  test('searchByDataList should set dataList to an empty array when dataListItem is empty', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    const dataListItem = ''; // Empty dataListItem

    act(() => {
      result.current.searchByDataList(dataListItem);
    });

    expect(result.current.dataList).toEqual([]);
  });

  test('searchFilter should set search correctly when searchText matches products', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.searchByDataList('Product 1');
    });

    const searchText = 'Product 1';
    act(() => {
      result.current.searchFilter(searchText);
    });

    expect(result.current.search).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  test('searchFilter should set search to "Product Not Found" when searchText does not match any product', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.searchByDataList('');
    });

    const searchText = 'Non-existent Product';

    act(() => {
      result.current.searchFilter(searchText);
    });

    expect(result.current.search).toBe('Product Not Found');
  });

  test('searchFilter should set search to an empty array when searchText is empty', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.searchByDataList('Product 1');
    });

    const searchText = '';

    act(() => {
      result.current.searchFilter(searchText);
    });

    expect(result.current.search).toEqual([]);
  });

  test('searchWishList should set dataList correctly when searchWishListext matches wishListItems', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addWishListItem({ id: 1 });
    });

    const searchWishListext = 'Product 1';

    act(() => {
      result.current.searchWishList(searchWishListext);
    });

    expect(result.current.dataList).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  test('searchWishList should set dataList to "Product not Found" when searchWishListext does not match any wishListItems and dataList is empty', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addWishListItem({ id: 1 });
      result.current.searchByDataList('');
    });

    const searchWishListext = 'Non-existent Product';

    act(() => {
      result.current.searchWishList(searchWishListext);
    });

    expect(result.current.dataList).toEqual([{ title: 'Product not Found' }]);
  });

  test('searchWishList should set dataList to an empty array when searchWishListext is empty', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addWishListItem({ id: 1 });
    });

    const searchWishListext = '';
    act(() => {
      result.current.searchWishList(searchWishListext);
    });

    expect(result.current.dataList).toEqual([]);
  });

  test('searchCart should set dataList correctly when searchWishListext matches CartItems', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addItem({ id: 1 });
    });

    const searchCarttext = 'Product 1';

    act(() => {
      result.current.searchCarts(searchCarttext);
    });

    expect(result.current.dataList).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  test('searchCart should set dataList to "Product not Found" when searchtext does not match any CartItems and dataList is empty', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addItem({ id: 1 });
      result.current.searchByDataList('');
    });

    const searchCarttext = 'Non-existent Product';

    act(() => {
      result.current.searchCarts(searchCarttext);
    });

    expect(result.current.dataList).toEqual([{ title: 'Product not Found' }]);
  });

  test('searchCart should set dataList to an empty array when searchtext is empty', () => {
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.addItem({ id: 1 });
    });

    const searchCarttext = '';
    act(() => {
      result.current.searchCarts(searchCarttext);
    });

    expect(result.current.dataList).toEqual([]);
  });

  test('searchCategories should set dataList correctly when searchCategoryText matches product category and title', () => {

    const mockCategoryProduct = [
      { id: 1, title: 'Product 1', category: "smartphones" },
      { id: 2, title: 'Product 2', category: "skin care" },
      { id: 3, title: 'Product 3', category: "smartphones" },
    ];

    queryClient.setQueryData('elements', { data: mockCategoryProduct });
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.searchByDataList("");
    });

    const searchCategoryText = 'Product 1';
    const categories = 'smartphones';

    act(() => {
      result.current.searchCategories(searchCategoryText, categories);
    });

    expect(result.current.dataList).toEqual([{ id: 1, title: 'Product 1', category: 'smartphones' }]);
  });

  test('searchCategories should set dataList to "Product not Found" when searchCategoryText does not match any product category and title', () => {

    const mockCategoryProduct = [
      { id: 1, title: 'Product 1', category: "smartphones" },
      { id: 2, title: 'Product 2', category: "skin care" },
      { id: 3, title: 'Product 3', category: "smartphones" },
    ];

    queryClient.setQueryData('elements', { data: mockCategoryProduct });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.searchByDataList("");
    });

    const searchCategoryText = 'Non-existent Product';
    const categories = 'Non-existent Category';

    act(() => {
      result.current.searchCategories(searchCategoryText, categories);
    });

    expect(result.current.dataList).toEqual([{ title: 'Product not Found' }]);
  });

  test('searchCategories should set dataList to an empty array when searchCategoryText is empty', () => {

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useContext(CartContext), { wrapper });

    act(() => {
      result.current.searchByDataList("");
    });

    const searchCategoryText = '';
    const categories = 'smartphones';

    act(() => {
      result.current.searchCategories(searchCategoryText, categories);
    });

    expect(result.current.dataList).toEqual([]);
  });

  test('should throw an search error if used outside CartProvider', () => {
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });

    expect(() => render(<QueryClientProvider client={queryClient}><Router><NavBarSearchDropDrown /></Router></QueryClientProvider>)).toThrowError(
      'useSearchByWishList must be used within a CartProvider'
    );
  });
});