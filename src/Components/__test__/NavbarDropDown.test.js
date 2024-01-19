import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBarSearchDropDown from "../NavbarDropDown";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useSearchbyDataList, useSearchProducts, useSearchByWishList, useSearchByCart, useSearchByCategory, CartProvider } from "../cartContext";
import { QueryClient, QueryClientProvider } from "react-query";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSearchbyDataList: jest.fn(),
  useSearchByCategory: jest.fn(),
  useSearchByWishList: jest.fn(),
  useSearchByCart: jest.fn(),
  useSearchProducts: jest.fn()
}));
const queryClient = new QueryClient();

describe("NavBarSearchDropDown", () => {
  beforeEach(() => {
    useLocation.mockReturnValue({
      pathname: "/",
    });
  });

  it("renders the search dropdown", () => {

    useSearchbyDataList.mockReturnValue({ searchByDataList: [], dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter })

    render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const categoryButton = screen.getByRole("button", { name: "Categories" });
    const searchInput = screen.getByPlaceholderText("Search");

    expect(categoryButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it("opens the dropdown menu on button click", () => {
    useSearchbyDataList.mockReturnValue({ searchByDataList: jest.fn(), dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter })

    render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const categoryButton = screen.getByRole("button", { name: "Categories" });
    fireEvent.click(categoryButton);
    const menu = screen.getByRole("menu");

    expect(menu).toBeInTheDocument();
  });

  test('searches products by text input', () => {
    ;
    const setSearchText = jest.fn();
    const mockProduct = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 100.99,
      qnty: 1
    }]
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });

    const { getByPlaceholderText } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });

    expect(mockSearchByDataList).toHaveBeenCalledWith('iPhone');
  });


  test('displays search results for categories', () => {
    const mockProduct = [{
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      price: 100.99,
      qnty: 1
    }]
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });

    useLocation.mockReturnValue({
      pathname: "/categories/smartphones",
    });
    const { getByPlaceholderText } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });

    expect(mockSearchCategories).toHaveBeenCalledWith('iPhone', 'smartphones');
  });

  test('displays search results for wishlist', () => {
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });
    useLocation.mockReturnValue({
      pathname: "/wishlist",
    });

    const { getByPlaceholderText } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });

    expect(mocksearchWishList).toHaveBeenCalledWith('iPhone');
  });

  test('displays search results for empty category', () => {
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });
    useLocation.mockReturnValue({
      pathname: "/categories/smartphones",
    });

    const { getByPlaceholderText } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: "ip" } });
    fireEvent.change(searchInput, { target: { value: "i" } });
    fireEvent.change(searchInput, { target: { value: "" } });
    fireEvent.keyUp(searchInput, { key: 'Enter', code: 'Enter' });

    expect(mockSearchByDataList).toHaveBeenCalledWith('');
    expect(mocksearchFilter).toHaveBeenCalledWith('');
  });

  test('displays search results for cart', () => {
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });
    useLocation.mockReturnValue({
      pathname: "/cart",
    });

    const { getByPlaceholderText } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });

    expect(mocksearchCarts).toHaveBeenCalledWith('iPhone');
  });


  test('calls onSearchMatch when search results match', () => {
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });

    const { getByPlaceholderText } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });

    expect(mockSearchByDataList).toHaveBeenCalledWith('iPhone');

    const searchIcon = screen.getByTestId("SearchOutlinedIcon");
    fireEvent.click(searchIcon);

    expect(mockSearchByDataList).toHaveBeenCalledWith('iPhone');
  });

  test('closes the menu on menu item click', () => {
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });

    const { getByText, getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const button = getByText('Categories');
    fireEvent.click(button);
    const menu = screen.getByRole("menu");

    expect(menu).toBeInTheDocument();

    const menuItem = getByTestId('ShoppingBasketOutlinedIcon');
    fireEvent.click(menuItem);
  });

  test('calls the search function on Enter key press', () => {
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });

    const { getByPlaceholderText } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    fireEvent.keyUp(searchInput, { key: 'Enter', code: 'Enter' });

    expect(mockSearchByDataList).toHaveBeenCalledWith('iPhone');
  });

  test('renders when search is empty', () => {
    const mockSearchByDataList = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchByDataList, dataList: [] });
    const mockSearchCategories = jest.fn();
    useSearchByCategory.mockReturnValue({ searchCategories: mockSearchCategories });
    const mocksearchWishList = jest.fn();
    useSearchByWishList.mockReturnValue({ searchWishList: mocksearchWishList });
    const mocksearchCarts = jest.fn();
    useSearchByCart.mockReturnValue({ searchCarts: mocksearchCarts });
    const mocksearchFilter = jest.fn();
    useSearchProducts.mockReturnValue({ searchFilter: mocksearchFilter });

    const { getByPlaceholderText } = render(<QueryClientProvider client={queryClient}><CartProvider><Router><NavBarSearchDropDown /></Router></CartProvider></QueryClientProvider>);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: '' } });
    const searchIcon = screen.getByTestId("SearchOutlinedIcon");
    fireEvent.click(searchIcon);

    expect(mockSearchByDataList).toHaveBeenCalledWith('');
  });
});