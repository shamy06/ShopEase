import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import BreadCrumb from '../BreadCrumb';

describe('BreadCrumb', () => {
  test('should render "Home" when there are no pathnames', () => {
    render(
      <MemoryRouter>
        <BreadCrumb />
      </MemoryRouter>
    );

    const homeBreadcrumb = screen.getByText('Home');
    expect(homeBreadcrumb).toBeInTheDocument();
  });

  test('should render "Home" and capitalized pathnames when there are pathnames', () => {
    render(
      <MemoryRouter initialEntries={['/path1/path2']}>
        <Routes>
          <Route path="/path1/path2" element={<BreadCrumb />} />
        </Routes>
      </MemoryRouter>
    );

    const homeBreadcrumb = screen.getByText('Home');
    const path1Breadcrumb = screen.getByText('Path1');
    const path2Breadcrumb = screen.getByText('Path2');

    expect(homeBreadcrumb).toBeInTheDocument();
    expect(path1Breadcrumb).toBeInTheDocument();
    expect(path2Breadcrumb).toBeInTheDocument();
  });

  test('should render "Home" as a link when there are pathnames', () => {
    render(
      <MemoryRouter initialEntries={['/path1/path2']}>
        <Routes>
          <Route path="/path1/path2" element={<BreadCrumb />} />
        </Routes>
      </MemoryRouter>
    );

    const homeBreadcrumbLink = screen.getByRole('link', { name: 'Home' });
    expect(homeBreadcrumbLink).toBeInTheDocument();
  });

  test('should render the last pathname as non-link and capitalized', () => {
    render(
      <MemoryRouter initialEntries={['/path1/path2']}>
        <Routes>
          <Route path="/path1/path2" element={<BreadCrumb />} />
        </Routes>
      </MemoryRouter>
    );

    const path2Breadcrumb = screen.getByText('Path2');
    expect(path2Breadcrumb.tagName).toBe('P');
  });

  test('should render the last pathname as a link if it is not a number', () => {
    render(
      <MemoryRouter initialEntries={['/path1/123']}>
        <Routes>
          <Route path="/path1/123" element={<BreadCrumb />} />
        </Routes>
      </MemoryRouter>
    );

    const path1Breadcrumb = screen.getByText('Path1');
    const path2BreadcrumbLink = screen.getByRole('link', { name: 'Home' });

    expect(path1Breadcrumb).toBeInTheDocument();
    expect(path2BreadcrumbLink).toBeInTheDocument();
  });
});