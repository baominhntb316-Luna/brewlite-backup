'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { MenuSkeleton } from '../components/MenuSkeleton';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBaseUrl}/products`, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Máy chủ phản hồi mã lỗi HTTP ${res.status}`);
      }

      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể kết nối đến máy chủ BrewLite API. Vui lòng kiểm tra kết nối mạng.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSelectProduct = (product: Product) => {
    setSelectedCount((prev) => prev + 1);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            B
          </div>
          <div>
            <h1 className="font-extrabold text-stone-900 text-lg leading-tight">
              BrewLite
            </h1>
            <p className="text-stone-500 text-xs">Cà phê không tiền mặt</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            Quầy mở cửa
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 flex-1">
        {/* Banner */}
        <div className="mb-5 bg-gradient-to-r from-amber-800 to-amber-950 rounded-2xl p-4 text-white shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-amber-300 font-semibold text-xs uppercase tracking-wider">
              Khởi đầu ngày mới
            </span>
            <h2 className="text-xl font-bold mt-1 mb-1">
              Thực đơn hôm nay ☕
            </h2>
            <p className="text-amber-100/90 text-xs leading-relaxed max-w-[240px]">
              Đặt trước đồ uống trên điện thoại, nhận ngay tại quầy không cần xếp hàng.
            </p>
          </div>
          <div className="absolute -right-4 -bottom-6 text-7xl opacity-20 select-none">
            ☕
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-stone-900 text-base">
            Món nổi bật
          </h3>
          {!loading && !error && (
            <span className="text-xs text-stone-500">
              {products.length} món sẵn có
            </span>
          )}
        </div>

        {/* State Rendering: Loading, Error, Empty, or Data */}
        {loading && <MenuSkeleton />}

        {!loading && error && (
          <ErrorState error={error} onRetry={fetchProducts} />
        )}

        {!loading && !error && products.length === 0 && (
          <EmptyState />
        )}

        {!loading && !error && products.length > 0 && (
          <div
            data-testid="products-grid"
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleSelectProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Sticky Action Bar (Cart Preview) */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="w-full max-w-md p-3 pointer-events-auto">
          <button
            type="button"
            className="w-full bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="bg-amber-800 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {selectedCount}
              </span>
              <span className="text-sm">Xem giỏ hàng</span>
            </div>
            <span className="text-xs font-normal text-amber-200">
              Bước 1 / 3
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}
