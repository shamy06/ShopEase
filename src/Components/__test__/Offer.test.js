import { render, screen } from '@testing-library/react';
import { Offers } from '../PriceFormat';
  
  test('renders Offers react', () => {
    render(<Offers/>);
   
    const OfferElement = screen.queryByText("Get Rs.200 instant discount on your First Purchase above ₹999. Coupon code -NEW200.")
   
    expect(OfferElement).toBeInTheDocument();
  });