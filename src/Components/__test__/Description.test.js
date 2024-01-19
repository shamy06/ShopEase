import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Description from "../Description";
import { BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import { CartProvider } from "../cartContext";
import { QueryClient, QueryClientProvider } from "react-query";


jest.mock("react-router-dom", () => {
    const originalModule = jest.requireActual("react-router-dom");
    return {
        ...originalModule,
        useLocation: () => ({
            pathname: "/wishlist",
        }),
        useNavigate: jest.fn(),
    };
});

jest.mock("../RemoveProduct", () => () => (
    <button data-testid="remove-product-button">Remove Product</button>
));

const queryClient = new QueryClient();

describe("Description", () => {
    const mockProduct = {
        id: 1,
        image: "product-image.jpg",
        title: "Product Title",
        rating: 4,
        price: 10.99,
        category: "Product Category",
    };

    it("renders product details correctly", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Router>
                        <Description
                            id={mockProduct.id}
                            image={mockProduct.image}
                            title={mockProduct.title}
                            rating={mockProduct.rating}
                            price={mockProduct.price}
                            category={mockProduct.category}
                        />
                    </Router>
                </CartProvider>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("productTitle")).toHaveTextContent(
            mockProduct.title
        );
        expect(screen.getByRole("heading", { name: mockProduct.title })).toBeInTheDocument();
    });

    it("handles click event and navigates to product detail", () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Router>
                        <Description
                            id={mockProduct.id}
                            image={mockProduct.image}
                            title={mockProduct.title}
                            rating={mockProduct.rating}
                            price={mockProduct.price}
                            category={mockProduct.category}
                        />
                    </Router>
                </CartProvider>
            </QueryClientProvider>
        );

        const imageElement = screen.getByRole("presentation", { name: mockProduct.title });
        fireEvent.click(imageElement);

        expect(mockNavigate).toHaveBeenCalledWith(`/product/${mockProduct.id}`);
    });

    it("renders remove product button when rendered in wishlist", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Router>
                        <Description
                            id={mockProduct.id}
                            image={mockProduct.image}
                            title={mockProduct.title}
                            rating={mockProduct.rating}
                            price={mockProduct.price}
                            category={mockProduct.category}
                        />
                    </Router>
                </CartProvider>
            </QueryClientProvider>
        );

        expect(
            screen.getByTestId("remove-product-button")
        ).toBeInTheDocument();
    });

    it("renders remove product button when rendered in wishlist", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Router>
                        <Description
                            id={mockProduct.id}
                            image={mockProduct.image}
                            title={mockProduct.title}
                            rating={mockProduct.rating}
                            price={mockProduct.price}
                            category={mockProduct.category}
                        />
                    </Router>
                </CartProvider>
            </QueryClientProvider>
        );

        expect(
            screen.getByTestId("remove-product-button")
        ).toBeInTheDocument();
    });

    it("updates the rating value on change", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Router>
                        <Description
                            id={mockProduct.id}
                            image={mockProduct.image}
                            title={mockProduct.title}
                            rating={mockProduct.rating}
                            price={mockProduct.price}
                            category={mockProduct.category}
                        />
                    </Router>
                </CartProvider>
            </QueryClientProvider>
        );

        const ratingElement = screen.getByLabelText("3 Stars");
        const newValue = 3;
        fireEvent.change(ratingElement, { target: { value: newValue } });

        expect(ratingElement.value).toBe(newValue.toString());
    });
})
