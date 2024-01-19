import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Quantity from '../Quantity';

describe('Quantity', () => {
  test('should render the initial quantity value', () => {
    const product = {
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 3
    };

    const { container } = render(<Quantity product={product} />);

    expect(container).toHaveTextContent('Quantity3');
  });

  test('should increase quantity when the plus icon is clicked', () => {
    const product = {
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 3
    };

    const { getByTestId } = render(<Quantity product={product} />);

    const plusIcon = getByTestId('AddOutlinedIcon');
    fireEvent.click(plusIcon);

    expect(product.qnty).toBe(4);
  });

  test('should decrease quantity when the minus icon is clicked', () => {
    const product = {
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 3
    };
    const { getByTestId } = render(<Quantity product={product} />);

    const minusIcon = getByTestId('RemoveOutlinedIcon');
    fireEvent.click(minusIcon);

    expect(product.qnty).toBe(2);
  });

  test('should not decrease quantity below 1', () => {
    const product = {
      id: "1",
      title: "iPhone 9",
      subTitle: "APPLE iPhone 9 (Black, 64 GB)",
      category: "smartphones",
      qnty: 1
    };

    const { getByTestId } = render(<Quantity product={product} />);

    const minusIcon = getByTestId('RemoveOutlinedIcon');
    fireEvent.click(minusIcon);

    expect(product.qnty).toBe(1);
  });
});