'use client';
import { Globe2, Link2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { UnifiedCardData } from '@/libs/types';

interface NewsCardProps {
  data: UnifiedCardData;
}

export function NewsCard({ data }: NewsCardProps) {
  return (
    <div className={cn(
      "mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-lg bg-white dark:bg-black/70 border border-gray-200 dark:border-gray-700 transition hover:shadow-xl flex flex-col"
    )}>
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-44 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Globe2 className="h-4 w-4" />
          {data.sourceName || "Unknown"}
        </div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mt-1">
          {data.title}
        </h3>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{data.description}</p>
        <div className="mt-2 flex flex-row justify-between items-end flex-1">
          <span className="text-xs text-gray-400">{data.metaPrimary}</span>
          <a
            href={data.callToActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:underline font-medium"
          >
            <Link2 className="w-3 h-3" /> Read more
          </a>
        </div>
      </div>
    </div>
  );
}
