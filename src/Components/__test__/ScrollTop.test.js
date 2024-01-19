import { render, fireEvent } from '@testing-library/react';
import ScrollToTop from '../ScrollTop';

describe('ScrollToTop component', () => {

  it('Component should render without errors', () => {
    render(<ScrollToTop />);
  });

  it('component show the top button when scrolling down', () => {
    const scrollToMock = jest.fn();
    global.scrollTo = scrollToMock;

    const { getByTestId } = render(<ScrollToTop />);

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    expect(getByTestId('top-button')).toBeVisible();
  });

  it('should scroll to top when top button is clicked', () => {
    const scrollToMock = jest.fn();
    global.scrollTo = scrollToMock;

    const { getByTestId } = render(<ScrollToTop />);

    const topButton = getByTestId('top-button');
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    fireEvent.click(topButton);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});