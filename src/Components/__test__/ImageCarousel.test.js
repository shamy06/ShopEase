import React from "react";
import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ImageCarousel from "../imageCarousel";
import { mainCarouselSettings, NextBtn, PreviousBtn } from "../Util/imageCarouselSettings";
import { CartProvider, useSearchbyDataList } from "../cartContext";

const queryClient = new QueryClient();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSearchbyDataList: jest.fn(),
}));

describe("ImageCarousel", () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      image: "product_1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      image: "product_2.jpg",
    },
    {
      id: 3,
      title: "Product 3",
      image: "product_3.jpg",
    },
  ];

  it("should render the carousel with product images", () => {
    const mockSearchDatalist = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchDatalist });

    const { getAllByAltText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><ImageCarousel products={products} /></CartProvider></Router></QueryClientProvider>);

    products.forEach((product) => {
      const imageElements = getAllByAltText(`Product ${product.id}`);
      expect(imageElements.length).toBe(2);
      expect(imageElements[0].getAttribute("src")).toBe(product.image);
    });
  });

  it("should render the carousel with click on product images", () => {
    const mockSearchDatalist = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchDatalist });
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);

    const { getAllByAltText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><ImageCarousel products={products} /></CartProvider></Router></QueryClientProvider>);

    products.forEach((product) => {
      const imageElements = getAllByAltText(`Product ${product.id}`);
      expect(imageElements.length).toBe(2);
      expect(imageElements[0].getAttribute("src")).toBe(product.image);
      fireEvent.click(imageElements[0]);
    });
  });

  test('should clear the search data list on click', () => {
    const product = [
      {
        id: 1,
        title: 'Product 1',
        image: 'image1.jpg',
      },
    ];
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);
    const mockSearchDatalist = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchDatalist });

    const { getByTestId } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><ImageCarousel products={product} /></CartProvider></Router></QueryClientProvider>);

    const carouselContainer = getByTestId('image-carousel');
    fireEvent.click(carouselContainer);

    expect(mockSearchDatalist).toHaveBeenCalledWith('');
  })


  it("should render the carousel with click on product images", () => {
    const products = [
      {
        id: 1,
        title: "Product 1",
        image: "product_1.jpg",
      },
    ]
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const mockSearchDatalist = jest.fn();
    useSearchbyDataList.mockReturnValue({ searchByDataList: mockSearchDatalist });

    const { getAllByAltText } = render(<QueryClientProvider client={queryClient}><Router><CartProvider><ImageCarousel products={products} /></CartProvider></Router></QueryClientProvider>);

    const imageElements = getAllByAltText('Product 1');
    fireEvent.click(imageElements[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/product/1');
  });

  test('should have the correct number of breakpoints', () => {
    expect(mainCarouselSettings.responsive).toHaveLength(6);
  });

  test('should have the correct slidesToShow and slidesToScroll values for each breakpoint', () => {
    const breakpoints = mainCarouselSettings.responsive;

    expect(breakpoints[0].settings.slidesToShow).toBe(3);
    expect(breakpoints[0].settings.slidesToScroll).toBe(2);

    expect(breakpoints[1].settings.slidesToShow).toBe(2);
    expect(breakpoints[1].settings.slidesToScroll).toBe(2);

    expect(breakpoints[2].settings.slidesToShow).toBe(2);
    expect(breakpoints[2].settings.slidesToScroll).toBe(2);

    expect(breakpoints[3].settings.slidesToShow).toBe(1);
    expect(breakpoints[3].settings.slidesToScroll).toBe(1);

    expect(breakpoints[4].settings.slidesToShow).toBe(1);
    expect(breakpoints[4].settings.slidesToScroll).toBe(1);

    expect(breakpoints[5].settings.slidesToShow).toBe(1);
    expect(breakpoints[5].settings.slidesToScroll).toBe(1);
  });

  test('should have arrows set to true for each breakpoint', () => {
    const breakpoints = mainCarouselSettings.responsive;

    breakpoints.forEach((breakpoint) => {
      expect(breakpoint.settings.arrows).toBe(true);
    });
  });

  describe('PreviousBtn', () => {
    test('should call onClick function when clicked', () => {
      const onClickMock = jest.fn();

      const { getByTestId } = render(
        <PreviousBtn className="previous-btn" onClick={onClickMock} />
      );

      const previousBtn = getByTestId('slick-prev');
      fireEvent.click(previousBtn);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  test('should call onClick function when clicked', () => {
    const onClickMock = jest.fn();

    const { getByTestId } = render(
      <NextBtn className="next-btn" onClick={onClickMock} />
    );

    const nextBtn = getByTestId('slick-next');
    fireEvent.click(nextBtn);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

});