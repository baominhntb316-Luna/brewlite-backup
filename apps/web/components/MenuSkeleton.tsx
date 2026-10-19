'use client';

import React from 'react';

export function MenuSkeleton() {
  return (
    <div data-testid="menu-loading-skeleton" className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-32 bg-stone-200 rounded-md animate-pulse" />
        <div className="h-4 w-20 bg-stone-200 rounded-md animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl border border-stone-100 p-3 flex flex-col space-y-3 animate-pulse"
          >
            <div className="aspect-[4/3] w-full bg-stone-200 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-stone-200 rounded" />
              <div className="h-5 w-1/2 bg-stone-200 rounded" />
            </div>
            <div className="h-9 w-full bg-stone-200 rounded-xl mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
