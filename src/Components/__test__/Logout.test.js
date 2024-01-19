import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider, useSnackBar } from "../cartContext";
import Logout from "../Logout";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
  
  jest.mock('../cartContext', () => ({
    ...jest.requireActual('../cartContext'),
    useSnackBar: jest.fn(),
  }));

const queryClient=new QueryClient();

describe("Logout", () => {    
  const mockedAddSnackbarItem = jest.fn();
  const mockedNavigate = jest.fn();

  beforeEach(() => {
   
  useSnackBar.mockReturnValue({
    addSnackbarItem: mockedAddSnackbarItem,
  });
    useNavigate.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders login and register links for logged-out user", () => {

    render(
        <QueryClientProvider client={queryClient}>
        <CartProvider>
        <Router>
        <Logout/>
        </Router>
        </CartProvider>
        </QueryClientProvider>
        );

    const loginLink = screen.getByRole("link", { name: "Login" });
    const registerLink = screen.getByRole("link", { name: "Register" });

    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("renders home component when click on log-out link", () => {
    localStorage.setItem("signUp","shubham02");

    render(
        <QueryClientProvider client={queryClient}>
        <CartProvider>
        <Router>
        <Logout/>
        </Router>
        </CartProvider>
        </QueryClientProvider>
        );

    expect(screen.getByText(/welcome shubham02/i)).toBeInTheDocument();

    const loginLink = screen.getByTestId("ExitToAppIcon");
    fireEvent.click(loginLink);
    localStorage.removeItem("signUp")

    expect(mockedNavigate).toHaveBeenCalledWith('/');
    expect(mockedNavigate).toHaveBeenCalledWith(0);
    expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true, "Successfully LOGOUT!!", "success");
  });
});
