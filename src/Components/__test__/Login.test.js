import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider, useSnackBar } from "../cartContext";
import Login from "../Login";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../cartContext', () => ({
  ...jest.requireActual('../cartContext'),
  useSnackBar: jest.fn(),
}));

const queryClient = new QueryClient();

test("test Empty  username", () => {
  const mockedAddSnackbarItem = jest.fn();
  useSnackBar.mockReturnValue({
    addSnackbarItem: mockedAddSnackbarItem,
  });

  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Login /></Router></CartProvider></QueryClientProvider>);

  const btn = screen.getByRole("button", { name: /Login/i });
  const inputValue = screen.getByLabelText("UserName")
  fireEvent.change(inputValue, { target: { value: "" } });
  fireEvent.click(btn);
  const message = screen.getByTestId('fail');

  expect(message).toHaveTextContent('please enter username')
});

test("test alphnumeric username text", () => {
  const mockedAddSnackbarItem = jest.fn();
  useSnackBar.mockReturnValue({
    addSnackbarItem: mockedAddSnackbarItem,
  });

  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Login /></Router></CartProvider></QueryClientProvider>);
  const inputValue = screen.getByLabelText("UserName")
  fireEvent.change(inputValue, { target: { value: "@#@!@" } });
  const message = screen.getByTestId('fail2');

  expect(message).toHaveTextContent('username should be alphanumeric only')
});

test("test Invalid  username Login", () => {
  localStorage.setItem("userData", JSON.stringify([{
    "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham"
  }]))
  const mockedAddSnackbarItem = jest.fn();
  useSnackBar.mockReturnValue({
    addSnackbarItem: mockedAddSnackbarItem,
  });

  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Login /></Router></CartProvider></QueryClientProvider>);

  const inputValue = screen.getByLabelText("UserName")
  fireEvent.change(inputValue, { target: { value: "fjdfjdfjk12" } });
  const btn = screen.getByRole("button", { name: /Login/i });
  fireEvent.click(btn);
  const message = screen.getByTestId('fail3');

  expect(message).toHaveTextContent('username is invalid')
});

test("test Empty  password Login", () => {
  const mockedAddSnackbarItem = jest.fn();
  useSnackBar.mockReturnValue({
    addSnackbarItem: mockedAddSnackbarItem,
  });

  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Login /></Router></CartProvider></QueryClientProvider>);
  const inputValue = screen.getByLabelText("UserName")
  fireEvent.change(inputValue, { target: { value: "shubham02" } });
  const inputpassword = screen.getByLabelText("Password")
  fireEvent.change(inputpassword, { target: { value: "" } });
  const btn = screen.getByRole("button", { name: /Login/i });
  fireEvent.click(btn);
  const message = screen.getByTestId('fail4');

  expect(message).toHaveTextContent('please enter password')
});


test("test Invalid  password Login", () => {
  localStorage.setItem("userData", JSON.stringify([{
    "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "password": "Abcd@1"
  }]))
  const mockedAddSnackbarItem = jest.fn();
  useSnackBar.mockReturnValue({
    addSnackbarItem: mockedAddSnackbarItem,
  });

  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Login /></Router></CartProvider></QueryClientProvider>);
  const inputValue = screen.getByLabelText("UserName")
  fireEvent.change(inputValue, { target: { value: "shubham02" } });
  const inputpassword = screen.getByLabelText("Password")
  fireEvent.change(inputpassword, { target: { value: "Ac1" } });
  const btn = screen.getByRole("button", { name: /Login/i });
  fireEvent.click(btn);
  const message = screen.getByTestId('fail5');

  expect(message).toHaveTextContent('password is invalid')
});

test("test password  username Login", () => {
  localStorage.setItem("userData", JSON.stringify([{
    "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "password": "Abcd@1"
  }]))
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);
  const mockedAddSnackbarItem = jest.fn();
  useSnackBar.mockReturnValue({
    addSnackbarItem: mockedAddSnackbarItem,
  });

  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Login /></Router></CartProvider></QueryClientProvider>);

  const inputValue1 = screen.getByLabelText("UserName");
  const inputpassword = screen.getByLabelText("Password");
  fireEvent.change(inputpassword, { target: { value: "Abcd@1" } });
  fireEvent.change(inputValue1, { target: { value: "shubham02" } });
  const btn = screen.getByRole("button", { name: /Login/i });
  fireEvent.click(btn);

  expect(mockNavigate).toHaveBeenCalledWith('/');
  expect(mockedAddSnackbarItem).toHaveBeenCalledWith(true, "LoggedIn Successfully", "success");
});

test("test Login Home Route", () => {
  localStorage.setItem("signUp", "shubham02")
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);
  const mockedAddSnackbarItem = jest.fn();
  useSnackBar.mockReturnValue({
    addSnackbarItem: mockedAddSnackbarItem,
  });

  render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Login />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );

  expect(mockNavigate).toHaveBeenCalledWith('/');
});