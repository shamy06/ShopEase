import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

test('renders Footer react', () => {
  render(<Footer />);

  const linkElement = screen.getByText(/Shopping Cart © 2022/i);

  expect(linkElement).toBeInTheDocument();
});