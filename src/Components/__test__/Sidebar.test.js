import { render, fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Sidebar', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders sidebar with menu items', () => {
    const { getByText } = render(<Sidebar />);

    const homeMenuItem = getByText('Home');
    const wishlistMenuItem = getByText('Wishlist');
    const cartMenuItem = getByText('Cart');
    const checkoutMenuItem = getByText('Checkout');

    expect(homeMenuItem).toBeInTheDocument();
    expect(wishlistMenuItem).toBeInTheDocument();
    expect(cartMenuItem).toBeInTheDocument();
    expect(checkoutMenuItem).toBeInTheDocument();
  });

  test('navigates to the selected path on menu item click', () => {
    const { getByText } = render(<Sidebar />);

    const cartMenuItem = getByText('Cart');
    fireEvent.click(cartMenuItem);

    expect(mockedNavigate).toHaveBeenCalledWith('/cart');
  });

  test('shows and hides the sidebar when menu icon is clicked', () => {
    const { getByTestId, container } = render(<Sidebar />);

    const menuIcon = getByTestId('DehazeIcon');
    const sidebar = container.querySelector('.menu');

    expect(sidebar.classList.contains('active')).toBe(false);

    fireEvent.click(menuIcon);

    expect(sidebar.classList.contains('active')).toBe(true);
  });

  test('closes the sidebar when close icon is clicked', () => {
    const { getByTestId, container } = render(<Sidebar />);
    const menuIcon = getByTestId('DehazeIcon');
    const sidebar = container.querySelector('.menu');

    expect(sidebar.classList.contains('active')).toBe(false);

    fireEvent.click(menuIcon);

    expect(sidebar.classList.contains('active')).toBe(true);

    fireEvent.click(menuIcon);

    expect(sidebar.classList.contains('active')).toBe(false);
  });
});