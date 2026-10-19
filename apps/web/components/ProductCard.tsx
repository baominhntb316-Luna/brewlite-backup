'use client';

import React from 'react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.basePrice);

  return (
    <div
      data-testid="product-card"
      className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
            isOutOfStock ? 'grayscale opacity-60' : ''
          }`}
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          {isOutOfStock ? (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              Hết hàng
            </span>
          ) : (
            <span className="bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              Còn {product.stock}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-stone-900 text-base line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-amber-800 font-bold text-lg mb-3">
            {formattedPrice}
          </p>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => onSelect?.(product)}
          className={`w-full py-2 px-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-1 ${
            isOutOfStock
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : 'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800'
          }`}
        >
          {isOutOfStock ? 'Tạm hết món' : 'Chọn món'}
        </button>
      </div>
    </div>
  );
}
