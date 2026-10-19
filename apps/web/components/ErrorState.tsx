'use client';

import React from 'react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div
      data-testid="menu-error-state"
      className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center flex flex-col items-center justify-center my-8 shadow-sm"
    >
      <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-3">
        ⚠️
      </div>
      <h3 className="text-base font-semibold text-red-900 mb-1">
        Không thể tải thực đơn
      </h3>
      <p className="text-sm text-red-700 max-w-sm mb-4">
        {error}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
      >
        Thử lại ngay
      </button>
    </div>
  );
}
