import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuPage from '../app/page';

// Mock global fetch
const mockProducts = [
  {
    id: 'coffee-milk',
    name: 'Cà phê sữa',
    basePrice: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600',
    stock: 25,
    isActive: true,
    variants: [{ size: 'S', priceDelta: 0 }],
    toppings: [],
  },
  {
    id: 'americano',
    name: 'Americano',
    basePrice: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600',
    stock: 10,
    isActive: true,
    variants: [{ size: 'S', priceDelta: 0 }],
    toppings: [],
  },
];

describe('MenuPage (FR-01 UI Acceptance Criteria)', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('1. Loading state: renders loading skeleton while request is pending', () => {
    // Mock fetch pending promise
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    render(<MenuPage />);
    expect(screen.getByTestId('menu-loading-skeleton')).toBeInTheDocument();
  });

  it('2. Success state: renders product grid when API returns products', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    }) as jest.Mock;

    render(<MenuPage />);

    await waitFor(() => {
      expect(screen.getByTestId('products-grid')).toBeInTheDocument();
    });

    expect(screen.getByText('Cà phê sữa')).toBeInTheDocument();
    expect(screen.getByText('Americano')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
  });

  it('3. Empty state: renders empty notification when API returns empty array []', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }) as jest.Mock;

    render(<MenuPage />);

    await waitFor(() => {
      expect(screen.getByTestId('menu-empty-state')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Thực đơn đang cập nhật'),
    ).toBeInTheDocument();
  });

  it('4. Error state: renders error state with retry button when API fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as jest.Mock;

    render(<MenuPage />);

    await waitFor(() => {
      expect(screen.getByTestId('menu-error-state')).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Không thể tải thực đơn/i),
    ).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: /Thử lại ngay/i });
    expect(retryBtn).toBeInTheDocument();

    // Now mock success on retry
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    }) as jest.Mock;

    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getByTestId('products-grid')).toBeInTheDocument();
    });
  });
});
