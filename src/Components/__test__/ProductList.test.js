import React from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { getProduct } from "../Util/UserTestAPI";
import ProductList from "../ProductList";
import { CartProvider, useSearchProducts } from "../cartContext";

const queryClient = new QueryClient();

jest.mock("axios");

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSearchProducts: jest.fn(),
}));

test("test parent component", () => {
  useSearchProducts.mockReturnValue({
    search: []
  });

  render(<QueryClientProvider client={queryClient}><CartProvider><ProductList /></CartProvider></QueryClientProvider>);

  const ProductListTest = screen.getByText(/Loading/i);

  expect(ProductListTest).toBeInTheDocument();
});

describe("fetch Products List", () => {
  describe("test fetch product successful", () => {
    it("Should return a product item", async () => {
      const mockFakeProductItem = [{
        "id": "1",
        "title": "iPhone 9",
        "subTitle": "APPLE iPhone 9 (Black, 64 GB)"
      },
      {
        "id": "7",
        "title": "Reamlme C30",
        "subTitle": "realme C30 (Bamboo Green, 32 GB)  (2 GB RAM)",
        "shortDescription": "2 GB RAM | 32 GB ROM | Expandable Upto 1 TB · 16.51 cm (6.5 inch) HD+ Display · 8MP Rear Camera.",
        "description": "Explore your inner self and be outspoken about it with the realme C30 smartphone which reflects your persona to the whole world with its intuitive nature. Powered by the Unisoc T612 processor, you can seamlessly multitask and get things done at your convenience. Furthermore, an 8 MP AI-driven rear camera and a 5 MP selfie camera allow you to capture stunning images with exceptional imagery. Moreover, this phone boasts 3 card slots which support a dual SIM setup with two slots and allow you to enjoy up to 1 TB of internal storage with the third slot.",
        "brand": "Realme",
        "price": 1499.0,
        "rating": 4,
        "qnty": 1,
        "category": "smartphones",
        "image": "https://m.media-amazon.com/images/I/410AvIMf2vL._SX300_SY300_QL70_FMwebp_.jpg",
        "thumbnails": [
          "https://m.media-amazon.com/images/I/410AvIMf2vL._SX300_SY300_QL70_FMwebp_.jpg",
          "https://m.media-amazon.com/images/I/51tLXun6YdL._SY550_.jpg",
          "https://m.media-amazon.com/images/I/51UfViCaJSL._SX679_.jpg",
          "https://m.media-amazon.com/images/I/51YDbXKVciL._SY550_.jpg",
          "https://m.media-amazon.com/images/I/419pg5MCFSL._SY550_.jpg"
        ],
        "memory": "64 GB",
        "color": "Bamboo Green",
        "modelNumber": "RMX3581",
        "os": "Android 10"
      }
      ]

      axios.get.mockResolvedValueOnce(mockFakeProductItem);
      const result = await getProduct();

      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/product/viewAll"
      );
      expect(result).toEqual(mockFakeProductItem);
    });

    it("renders search component as search is not empty ", async () => {
      useSearchProducts.mockReturnValue({
        search: [{
          id: 1,
          title: "iPhone 9",
          subTitle: "APPLE iPhone 9 (Black, 64 GB)",
          category: "smartphones",
        }]
      });
      queryClient.setQueryData("elements", {
        data: [{
          id: 1,
          title: "iPhone 9",
          subTitle: "APPLE iPhone 9 (Black, 64 GB)",
          category: "smartphones",
        }]
      });

      render(<QueryClientProvider client={queryClient}><CartProvider><Router>< ProductList /></Router></CartProvider></QueryClientProvider>);

      expect(screen.getByText(/iPhone 9/i)).toBeInTheDocument();
    });

    it("renders search component as search is empty ", async () => {
      useSearchProducts.mockReturnValue({
        search: []
      });
      queryClient.setQueryData("elements", {
        data: [{
          id: 1,
          title: "iPhone 9",
          subTitle: "APPLE iPhone 9 (Black, 64 GB)",
          category: "smartphones",
        }]
      });

      render(<QueryClientProvider client={queryClient}><CartProvider><Router>< ProductList /></Router></CartProvider></QueryClientProvider>);

      expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
    });
  });
});