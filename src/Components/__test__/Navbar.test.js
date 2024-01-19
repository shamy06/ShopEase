import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../Navbar";
import { CartProvider } from "../cartContext";

const queryClient=new QueryClient();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test("test Navbar Icon component", () => {
    render(<QueryClientProvider client={queryClient}><CartProvider><Router><Navbar/></Router></CartProvider></QueryClientProvider>);
    
    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
  });
  
  test("test Navbar Logout component", () => {
    render(<QueryClientProvider client={queryClient}><CartProvider><Router><Navbar/></Router></CartProvider></QueryClientProvider>);
    
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("test Navbar Categories component", () => {
    render(<QueryClientProvider client={queryClient}><CartProvider><Router><Navbar/></Router></CartProvider></QueryClientProvider>);
   
    expect(screen.getByRole("button",{name:/Categories/i})).toBeInTheDocument();    
    expect(screen.getByTestId("ArrowDropDownIcon")).toBeInTheDocument();
  });

  test("test Navbar Search component", () => {
    render(<QueryClientProvider client={queryClient}><CartProvider><Router><Navbar/></Router></CartProvider></QueryClientProvider>);

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();    
    expect(screen.getByTestId("SearchOutlinedIcon")).toBeInTheDocument();
  });

  test("test Navbar navigate to home component", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    
    render(<QueryClientProvider client={queryClient}><CartProvider><Router><Navbar/></Router></CartProvider></QueryClientProvider>);

    const handelClick=screen.getByText(/Shopping Cart/i)
    fireEvent.click(handelClick)
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });