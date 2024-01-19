import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Imageslider from '../Imageslider';

describe('Imageslider', () => {
  const thumbnails = [
    'thumbnail1.jpg',
    'thumbnail2.jpg',
    'thumbnail3.jpg'
  ];

  test('should render the initial thumbnail image', () => {
    const { container } = render(<Imageslider thumbnails={thumbnails} />);
    
    expect(container.querySelector('#productDetaileMain-Image')).toHaveAttribute('src', thumbnails[0]);
  });

  test('should change the main image when a thumbnail is clicked', () => {
    const { getAllByAltText, container } = render(<Imageslider thumbnails={thumbnails} />);
    
    const thumbnailImage = getAllByAltText('title');
    fireEvent.click(thumbnailImage[0]);

    expect(container.querySelector('#productDetaileMain-Image')).toHaveAttribute('src', thumbnailImage[0].getAttribute('src'));
  })

  test('should render all the thumbnail images', () => {
    const { container } = render(<Imageslider thumbnails={thumbnails} />);
    
    const thumbnailImages = container.querySelectorAll('#productDetaileImage');
    expect(thumbnailImages.length).toBe(thumbnails.length);
  });
});
