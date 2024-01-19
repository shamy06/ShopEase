import { render, screen } from '@testing-library/react';
import PlaceOrder from '../finalOrder';

test('renders placeOrder react', () => {
  render(<PlaceOrder />);

  const OrderElement = screen.getByText("Your order has been placed.");

  expect(OrderElement).toBeInTheDocument();
});