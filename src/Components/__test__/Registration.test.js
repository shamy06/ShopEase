import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "../cartContext";
import Registration from "../Registration";

const queryClient = new QueryClient();

test("Registration Header ", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const registerElement = screen.getByText("Create Account")

  expect(registerElement).toBeInTheDocument();
})

test("test Empty  username", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const btn = screen.getByRole("button", { name: /Register/i });
  const inputValue = screen.getByLabelText("FullName")
  fireEvent.change(inputValue, { target: { value: "" } });
  fireEvent.click(btn);
  const message = screen.getByTestId('Registraion_fail');

  expect(message).toHaveTextContent('please enter name')
});

test("test alphnumeric username text", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const inputValue = screen.getByLabelText("UserName")
  fireEvent.change(inputValue, { target: { value: "@#@!@" } });
  const message = screen.getByTestId("Registraion_fail2");

  expect(message).toHaveTextContent('username should be alphanumeric only')
});

test("test empty  username Registration", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const inputValue = screen.getByLabelText("FullName")
  fireEvent.change(inputValue, { target: { value: "shubham" } });
  const btn = screen.getByRole("button", { name: /Register/i });
  fireEvent.click(btn);
  const message = screen.getByTestId("Registraion_fail3");

  expect(message).toHaveTextContent('please enter username')
});

test("test invalid  email Registration", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const inputValue = screen.getByLabelText("Email")
  fireEvent.change(inputValue, { target: { value: "shubhamee" } });
  const btn = screen.getByRole("button", { name: /Register/i });
  fireEvent.click(btn);
  const message = screen.getByTestId("Registraion_fail4");

  expect(message).toHaveTextContent('email should contain @ and . in it')
});

test("test empty  username Registration", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const inputValue = screen.getByLabelText("FullName")
  fireEvent.change(inputValue, { target: { value: "shubham" } });
  const usernameValue = screen.getByLabelText("UserName")
  fireEvent.change(usernameValue, { target: { value: "shubham02" } });
  const btn = screen.getByRole("button", { name: /Register/i });
  fireEvent.click(btn);
  const message = screen.getByTestId("Registraion_fail5");

  expect(message).toHaveTextContent('please enter email')
});

test("test invalid  password Registration", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const inputValue = screen.getByLabelText("Password")
  fireEvent.change(inputValue, { target: { value: "sjkdjks" } });
  const btn = screen.getByRole("button", { name: /Register/i });
  fireEvent.click(btn);
  const message = screen.getByTestId("Registraion_fail6");

  expect(message).toHaveTextContent('password should be followed(ex:Ab@1)')
});

test("test empty  password Registration", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const inputValue = screen.getByLabelText("FullName")
  fireEvent.change(inputValue, { target: { value: "shubham" } });
  const usernameValue = screen.getByLabelText("UserName")
  fireEvent.change(usernameValue, { target: { value: "shubham02" } });
  const emailValue = screen.getByLabelText("Email")
  fireEvent.change(emailValue, { target: { value: "shubham@gmail.com" } });
  const btn = screen.getByRole("button", { name: /Register/i });
  fireEvent.click(btn);
  const message = screen.getByTestId("Registraion_fail7");

  expect(message).toHaveTextContent('please enter password')
});

test("test invalid confirm password Registration", () => {
  render(<QueryClientProvider client={queryClient}><CartProvider><Router><Registration /></Router></CartProvider></QueryClientProvider>);

  const inputValue = screen.getByLabelText("FullName")
  fireEvent.change(inputValue, { target: { value: "shubham" } });
  const usernameValue = screen.getByLabelText("UserName")
  fireEvent.change(usernameValue, { target: { value: "shubham02" } });
  const emailValue = screen.getByLabelText("Email")
  fireEvent.change(emailValue, { target: { value: "shubham02@gmail.com" } });
  const passwordValue = screen.getByLabelText("ConfirmPassword")
  fireEvent.change(passwordValue, { target: { value: "Shubham02@" } });
  const btn = screen.getByRole("button", { name: /Register/i });
  fireEvent.click(btn);
  const message = screen.getByTestId("Registraion_fail8");

  expect(message).toHaveTextContent('password does not match')
});

test("test new user registration and route navigation", () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
  });

  render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <MemoryRouter history={history}>
          <Registration />
        </MemoryRouter>
      </CartProvider>
    </QueryClientProvider>
  );

  const inputValue = screen.getByLabelText("FullName")
  fireEvent.change(inputValue, { target: { value: "shubham" } });
  const usernameValue = screen.getByLabelText("UserName")
  fireEvent.change(usernameValue, { target: { value: "shubham02" } });
  const emailValue = screen.getByLabelText("Email")
  fireEvent.change(emailValue, { target: { value: "shubham02@gmail.com" } });
  const passwordValue = screen.getByLabelText("Password")
  fireEvent.change(passwordValue, { target: { value: "Shubham02@" } });
  const cnfpasswordValue = screen.getByLabelText("ConfirmPassword")
  fireEvent.change(cnfpasswordValue, { target: { value: "Shubham02@" } });
  const btn = screen.getByRole("button", { name: /Register/i });
  fireEvent.click(btn);

  expect(history.location.pathname).toBe('/');
});