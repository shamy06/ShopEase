import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, useNavigate, useParams } from "react-router-dom";
import { CartProvider, useSearchProducts, useBuynow } from "../cartContext";
import { CommonCarouselProducts } from "../Util/CommonCarouselComponets";
import ProductDetails from "../Product";
import Categories from "../Categories";

jest.mock("../Imageslider");

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSearchProducts: jest.fn(),
  useBuynow: jest.fn()
}));


describe("ProductDetails", () => {
  const mockProduct = [{
    id: "1",
    title: "iPhone 9",
    subTitle: "APPLE iPhone 9 (Black, 64 GB)",
    category: "smartphones",
  }, {
    id: "2",
    title: "iPhone X",
    subTitle: "APPLE iPhone X (Black, 64 GB)",
    category: "smartphones",
  }, {
    id: "3",
    title: "Redmi 9",
    subTitle: "Redmi 9 (Black, 64 GB)",
    category: "smartphones",
  }, {
    id: "4",
    title: "Realme 9",
    subTitle: "Realme  9 (Black, 64 GB)",
    category: "smartphones",
  },
  {
    id: "5",
    title: "Realme 8",
    subTitle: "Realme  9 (Black, 64 GB)",
    category: "smartphones",
  },
  {
    id: "6",
    title: "Realme 5",
    subTitle: "Realme  9 (Black, 64 GB)",
    category: "smartphones",
  },
  {
    id: "7",
    title: "Realme 6",
    subTitle: "Realme  9 (Black, 64 GB)",
    category: "smartphones",
  }
  ]
  let queryClient;

  beforeAll(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("renders product details correctly", async () => {
    const mockProductId = 1;
    const mockProduct = {
      id: mockProductId,
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
    };
    useSearchProducts.mockReturnValue({ search: '' });
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });
    useParams.mockReturnValue({ id: '1' });
    queryClient.setQueryData("elements", { data: [mockProduct] });

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );
    });

    expect(screen.getByText(/Product Description/i)).toBeInTheDocument();

    const message = screen.getByTestId("Add");
    expect(message).toHaveTextContent("Add Cart");

    const buynowMessage = screen.getByTestId("Buy");
    expect(buynowMessage).toHaveTextContent("Buy Now");

    const message2 = screen.getByTestId("similar-products2");
    expect(message2).toHaveTextContent('Similar Products');
    expect(screen.getByTestId("FavoriteIcon")).toBeInTheDocument();

    const sepcificationMessage = screen.getByTestId("specification");
    expect(sepcificationMessage).toHaveTextContent('Specifications');

    const productDescription = screen.getByTestId("productTitle");
    expect(productDescription).toHaveTextContent(`${mockProduct.subTitle}`);

    const productRating = screen.getByTestId("Rating");
    expect(productRating).toHaveTextContent(/Ratings/i);
  });

  it("renders search component as search is not empty ", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });
    useSearchProducts.mockReturnValue({
      search: [{
        id: 1,
        title: "iPhone 9",
        subTitle: "APPLE iPhone 9 (Black, 64 GB)",
        category: "smartphones",
      }]
    });
    useParams.mockReturnValue({ id: '1' });
    queryClient.setQueryData("elements", { data: mockProduct });

    render(<QueryClientProvider client={queryClient}><Router><CartProvider>< ProductDetails /></CartProvider></Router></QueryClientProvider>);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it("should render the similar product images", () => {
    const mockProductId = 1;
    const mockProduct2 = {
      id: mockProductId,
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
    };

    const { getAllByTestId } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><CommonCarouselProducts products={[mockProduct2]} /></CartProvider></Router></QueryClientProvider>);

    const imageElements = getAllByTestId("similar-products3");

    expect(imageElements).toHaveLength(2);
  });

  it("renders child components product details correctly", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const { getAllByAltText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><CommonCarouselProducts products={mockProduct} /></CartProvider></Router></QueryClientProvider>);

    const imageElements = getAllByAltText(/iPhone \d/);
    fireEvent.click(imageElements[0])

    expect(mockNavigate).toHaveBeenCalledWith('/product/1');
  });

  test('should render component with valid product ID', () => {
    localStorage.setItem("userData", JSON.stringify([{
      "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [],
      recentProductId: ['1', '2'],
    }]))
    localStorage.setItem("signUp", "shubham02")
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    queryClient.setQueryData("elements", { data: mockProduct });
    const mockWindowWidths = [150];
    mockWindowWidths.forEach((width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      useSearchProducts.mockReturnValue({ search: '' });
      useParams.mockReturnValue({ id: '1' });

      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );

      const recentItem = screen.getAllByTestId("Recentproducts6")

      expect(recentItem).toHaveLength(2);
    });
  });

  test('renders RecentlyViewedProductsCarousel where recentProductsLength is greater than or equal to 6', () => {
    localStorage.setItem("userData", JSON.stringify([{
      "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [],
      recentProductId: ['1', '2', '3', '4', '5', '6', '7'],
    }]))
    localStorage.setItem("signUp", "shubham02")

    queryClient.setQueryData("elements", { data: mockProduct });
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    useParams.mockReturnValue({ id: '1' });
    useSearchProducts.mockReturnValue({ search: '' });

    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router>
            <ProductDetails />
          </Router>
        </CartProvider>
      </QueryClientProvider>
    );

    const recentItem = screen.getByTestId("Recently-products2")

    expect(recentItem).toBeInTheDocument();
  });

  test('renders RecentlyViewedProductsCarousel recentProductsLength is equal to 3 and wodth between 830 and 950', () => {
    localStorage.setItem("userData", JSON.stringify([{
      "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [],
      recentProductId: ['1', '2', '3'],
    }]))
    localStorage.setItem("signUp", "shubham02")

    queryClient.setQueryData("elements", { data: mockProduct });
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const mockWindowWidths = [850];
    mockWindowWidths.forEach((width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      useParams.mockReturnValue({ id: '1' });
      useSearchProducts.mockReturnValue({ search: '' });

      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );

      if (width > 830 && width <= 950) {
        const recentItem = screen.getAllByTestId("Recentproducts3")
        expect(recentItem).toHaveLength(3);

        const imageElements = screen.getAllByTestId("handleProduct");
        fireEvent.click(imageElements[0])

        expect(mockNavigate).toHaveBeenCalledWith('/product/1');
      } else {
        const recentItem = screen.getByTestId("Recentproducts5")
        expect(recentItem).toBeInTheDocument();
      }

    });
  });

  test('renders RecentlyViewedProductsCarousel recentProductsLength is equal to 2 and wodth between 830 and 670', () => {
    localStorage.setItem("userData", JSON.stringify([{
      "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [],
      recentProductId: ['1', '2']
    }]))
    localStorage.setItem("signUp", "shubham02")
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    queryClient.setQueryData("elements", { data: mockProduct });
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    const mockWindowWidths = [800];
    mockWindowWidths.forEach((width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      useParams.mockReturnValue({ id: '1' });
      useSearchProducts.mockReturnValue({ search: '' });

      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );

      if (width > 670 && width <= 830) {
        const recentItem = screen.getAllByTestId("Recentproducts2")
        expect(recentItem).toHaveLength(2);

        const imageElements = screen.getAllByTestId("handleProduct");
        fireEvent.click(imageElements[0])

        expect(mockNavigate).toHaveBeenCalledWith('/product/1');

      } else {
        const recentItem = screen.getByTestId("Recentproducts5")
        expect(recentItem).toBeInTheDocument();
      }

    });
  });

  test('renders RecentlyViewedProductsCarousel recentProductsLength is equal to 4 and width over 951', () => {
    localStorage.setItem("userData", JSON.stringify([{
      "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [],
      recentProductId: ['1', '2', '3', '4']
    }]))
    localStorage.setItem("signUp", "shubham02")

    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const mockWindowWidths = [980];
    mockWindowWidths.forEach((width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      queryClient.setQueryData("elements", { data: mockProduct });
      useParams.mockReturnValue({ id: '1' });
      useSearchProducts.mockReturnValue({ search: '' });

      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );

      const recentItem = screen.getAllByTestId("Recentproducts4")
      expect(recentItem).toHaveLength(4);

      const imageElements = screen.getAllByTestId("handleProduct");
      fireEvent.click(imageElements[0])

      expect(mockNavigate).toHaveBeenCalledWith('/product/1');
    });
  });

  test('renders RecentlyViewedProductsCarousel recentProductsLength is equal to 5 and width over 951', () => {
    localStorage.setItem("userData", JSON.stringify([{
      "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [],
      recentProductId: ['1', '2', '3', '4', '5']
    }]))
    localStorage.setItem("signUp", "shubham02")
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const mockWindowWidths = [980];
    mockWindowWidths.forEach((width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      queryClient.setQueryData("elements", { data: mockProduct });
      useParams.mockReturnValue({ id: '1' });
      useSearchProducts.mockReturnValue({ search: '' });
      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );

      const recentItem = screen.getAllByTestId("Recentproducts4")
      expect(recentItem).toHaveLength(5);

      const imageElements = screen.getAllByTestId("handleProduct");
      fireEvent.click(imageElements[0])

      expect(mockNavigate).toHaveBeenCalledWith('/product/1');
    });
  });

  test('renders RecentlyViewedProductsCarousel recentProductsLength is equal to 3 and wodth between 830 and 670', () => {
    localStorage.setItem("userData", JSON.stringify([{
      "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [],
      recentProductId: ['1', '2', '3']
    }]))
    localStorage.setItem("signUp", "shubham02")

    queryClient.setQueryData("elements", { data: mockProduct });
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const mockWindowWidths = [830];
    mockWindowWidths.forEach((width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      useParams.mockReturnValue({ id: '1' });
      useSearchProducts.mockReturnValue({ search: '' });

      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );

      if (width > 670 && width <= 830) {
        const recentItem = screen.getAllByTestId("Recentproducts3")
        expect(recentItem).toHaveLength(3);

        const imageElements = screen.getAllByTestId("handleProduct");
        fireEvent.click(imageElements[0])

        expect(mockNavigate).toHaveBeenCalledWith('/product/1');
      } else {
        const recentItem = screen.getByTestId("Recentproducts5")
        expect(recentItem).toBeInTheDocument();
      }
    });
  });

  test("renders product details to buynow correctly", async () => {
    const mockProductId = 1;
    const mockProduct = {
      id: mockProductId,
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
    };
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    useSearchProducts.mockReturnValue({ search: '' });
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ id: '1' });
    queryClient.setQueryData("elements", { data: [mockProduct] });

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );
    });

    expect(screen.getByText(/Product Description/i)).toBeInTheDocument();
    const buynowMessage = screen.getAllByTestId("CurrencyRupeeIcon");

    fireEvent.click(buynowMessage[0])

    expect(mockNavigate).toHaveBeenCalledWith('/buynow');
  });

  test("renders product details to buynow but login renders", async () => {
    const mockProductId = 1;
    const mockProduct = {
      id: mockProductId,
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
    };
    localStorage.clear();

    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    useSearchProducts.mockReturnValue({ search: '' });
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ id: '1' });
    queryClient.setQueryData("elements", { data: [mockProduct] });

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );
    });

    expect(screen.getByText(/Product Description/i)).toBeInTheDocument();

    const buynowMessage = screen.getAllByTestId("CurrencyRupeeIcon");
    fireEvent.click(buynowMessage[0])

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('renders RecentlyViewedProductsCarousel recentProductsLength is equal to 2 and wodth between 100', () => {
    localStorage.setItem("userData", JSON.stringify([{
      "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [],
      recentProductId: ['1', '2']
    }]))
    localStorage.setItem("signUp", "shubham02")

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    queryClient.setQueryData("elements", { data: mockProduct });
    const mockedAddItem = jest.fn();
    useBuynow.mockReturnValue({
      addBuynowItem: mockedAddItem,
      buynowItems: [],
    });

    const mockWindowWidths = [100];
    mockWindowWidths.forEach((width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      useParams.mockReturnValue({ id: '1' });
      useSearchProducts.mockReturnValue({ search: '' });

      render(
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Router>
              <ProductDetails />
            </Router>
          </CartProvider>
        </QueryClientProvider>
      );

      if (width > 50 && width <= 200) {
        const recentItem = screen.getAllByTestId("Recentproducts6")
        expect(recentItem).toHaveLength(2);

        const imageElements = screen.getAllByTestId("handleProduct");
        fireEvent.click(imageElements[0])

        expect(mockNavigate).toHaveBeenCalledWith('/product/1');

      } else {
        const recentItem = screen.getByTestId("Recentproducts5")
        expect(recentItem).toBeInTheDocument();
      }
    });
  });

  test('should throw an search error if used outside CartProvider', () => {
    expect(() => render(<QueryClientProvider client={queryClient}><Router><Categories /></Router></QueryClientProvider>)).toThrowError(
      'useSearchByCategory must be used within a CartProvider'
    );
  });
});