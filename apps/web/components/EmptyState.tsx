'use client';

import React from 'react';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'Hiện tại quán chưa có món đồ uống nào trong danh mục.' }: EmptyStateProps) {
  return (
    <div
      data-testid="menu-empty-state"
      className="bg-stone-50 border-2 border-dashed border-stone-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center my-8"
    >
      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-3 shadow-inner">
        ☕
      </div>
      <h3 className="text-base font-semibold text-stone-800 mb-1">
        Thực đơn đang cập nhật
      </h3>
      <p className="text-sm text-stone-500 max-w-xs">
        {message}
      </p>
    </div>
  );
}
