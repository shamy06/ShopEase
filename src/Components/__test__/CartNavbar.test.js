import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CartNavbar from "../CartNavbar";

describe("CartNavbar", () => {
  test("renders cart icon and item count", () => {
    const cartsItemCount = 5;
    render(
      <Router>
        <CartNavbar cartsItemCount={cartsItemCount} />
      </Router>
    );

    const cartIcon = screen.getByRole("link", { a: /cart/i });
    const cartCount = screen.getByText(cartsItemCount.toString());

    expect(cartIcon).toBeInTheDocument();
    expect(cartCount).toBeInTheDocument();
  });

  test("renders cart icon without item count if count is zero", () => {
    const cartsItemCount = 0;
    render(
      <Router>
        <CartNavbar cartsItemCount={cartsItemCount} />
      </Router>
    );

    const cartIcon = screen.getByRole("link", { a: /cart/i });
    const cartCount = screen.queryByText(cartsItemCount.toString());

    expect(cartIcon).toBeInTheDocument();
    expect(cartCount).toBeNull();
  });

  test("renders a Link component with correct destination", () => {
    render(
      <Router>
        <CartNavbar cartsItemCount={0} />
      </Router>
    );

    const linkElement = screen.getByRole("link", { a: /cart/i });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/cart");
  });
});