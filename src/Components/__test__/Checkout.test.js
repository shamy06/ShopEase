import { render, fireEvent, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "../cartContext";
import Checkout from "../Checkout";

const queryClient = new QueryClient();

describe("Checkout component", () => {
    test("renders without errors", () => {
        localStorage.setItem("userData", "[]")
        render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);
    });

    test("handles input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Maharashtra",
                "City": "Pune",
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        const emailInput = getByLabelText("Email Id");
        const pincodeInput = getByLabelText("Pincode");
        const address1Input = getByLabelText("Address1");
        fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
        fireEvent.change(pincodeInput, { target: { value: "123456" } });
        fireEvent.change(address1Input, { target: { value: "123 Main St" } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
    })

    test("handles new address button click correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: []
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByText } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);
        
        const addAddressButton = getByText("Add Address");
        fireEvent.click(addAddressButton);
    });

    test("handles empty Name input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Maharashtra",
                "City": "Pune",
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        fireEvent.change(fullNameInput, { target: { value: null } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
        const nameError = screen.getByText(/please enter name/i);

        expect(nameError).toBeInTheDocument();
    })

    test("handles empty Mobile input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Maharashtra",
                "City": "Pune",
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: null } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
        const nameError = screen.getByText(/please enter mobile/i);

        expect(nameError).toBeInTheDocument();
    })

    test("handles invalid Mobile input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Maharashtra",
                "City": "Pune",
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: "2323443459504@##$434" } });
        const mobileError = screen.getByText(/only numeric and 10 digits/i);

        expect(mobileError).toBeInTheDocument();
    })

    test("handles empty Email input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Maharashtra",
                "City": "Pune",
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        const emailInput = getByLabelText("Email Id");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.change(emailInput, { target: { value: null } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
        const emailError = screen.getByText(/please enter email/i);

        expect(emailError).toBeInTheDocument();
    })

    test("handles Invalid Email input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Maharashtra",
                "City": "Pune",
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        const emailInput = getByLabelText("Email Id");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.change(emailInput, { target: { value: "shd" } });
        const emailError = screen.getByText(/email should have @ and . in it/i);

        expect(emailError).toBeInTheDocument();
    })

    test("handles empty pincode input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Maharashtra",
                "City": "Pune",
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        const emailInput = getByLabelText("Email Id");
        const pincodeInput = getByLabelText("Pincode");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.change(emailInput, { target: { value: "abcd@gmail.com" } });
        fireEvent.change(pincodeInput, { target: { value: null } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
        const pincodeError = screen.getByText(/please enter pincode/i);

        expect(pincodeError).toBeInTheDocument();
    })

    test("handles empty address input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Maharashtra",
                "City": "Pune",
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        const emailInput = getByLabelText("Email Id");
        const pincodeInput = getByLabelText("Pincode");
        const address1Input = getByLabelText("Address1");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.change(emailInput, { target: { value: "abcd@gmail.com" } });
        fireEvent.change(pincodeInput, { target: { value: "422321" } });
        fireEvent.change(address1Input, { target: { value: null } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
        const addressError = screen.getByText(/please enter address/i);

        expect(addressError).toBeInTheDocument();
    })

    test("handles empty country input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": null,
                "State": null,
                "City": null,
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        const emailInput = getByLabelText("Email Id");
        const pincodeInput = getByLabelText("Pincode");
        const address1Input = getByLabelText("Address1");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.change(emailInput, { target: { value: "abcd@gmail.com" } });
        fireEvent.change(pincodeInput, { target: { value: "422321" } });
        fireEvent.change(address1Input, { target: { value: "123 street" } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
        const countryError = screen.getByText(/please choose country/i);

        expect(countryError).toBeInTheDocument();
    })

    test("handles empty state input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": null,
                "City": null,
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        const emailInput = getByLabelText("Email Id");
        const pincodeInput = getByLabelText("Pincode");
        const address1Input = getByLabelText("Address1");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.change(emailInput, { target: { value: "abcd@gmail.com" } });
        fireEvent.change(pincodeInput, { target: { value: "422321" } });
        fireEvent.change(address1Input, { target: { value: "123 street" } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
        const stateError = screen.getByText(/please choose state/i);

        expect(stateError).toBeInTheDocument();
    })

    test("handles empty City input changes correctly", () => {
        localStorage.setItem("userData", JSON.stringify([{
            "userName": "shubham02", "emailId": "Shubham@gmail.com", "name": "shubham", "mobile": 8009590204, address: [{
                "Address1": "addressOne",
                "Address2": "addressTwo",
                "Country": "India",
                "State": "Mahrashtra",
                "City": null,
                "Pincode": "401101"
            }]
        }]))
        localStorage.setItem("signUp", "shubham02")

        const { getByLabelText, getByTestId, getByRole } = render(<QueryClientProvider client={queryClient}><CartProvider><Checkout /></CartProvider></QueryClientProvider>);

        const addAddress = getByTestId("EditIcon");
        fireEvent.click(addAddress);
        const fullNameInput = getByLabelText("FullName");
        const mobileInput = getByLabelText("Mobile No");
        const emailInput = getByLabelText("Email Id");
        const pincodeInput = getByLabelText("Pincode");
        const address1Input = getByLabelText("Address1");
        fireEvent.change(fullNameInput, { target: { value: "shubham" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.change(emailInput, { target: { value: "abcd@gmail.com" } });
        fireEvent.change(pincodeInput, { target: { value: "422321" } });
        fireEvent.change(address1Input, { target: { value: "123 street" } });
        const saveAddressButton = getByRole("button", { name: "Save" });
        fireEvent.click(saveAddressButton);
        const cityError = screen.getByText(/please choose city/i);

        expect(cityError).toBeInTheDocument();
    })
});