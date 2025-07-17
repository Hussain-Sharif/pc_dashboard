'use client';
import { Star, ExternalLink } from 'lucide-react';
import { cn } from "@/lib/utils";
import { UnifiedCardData } from '@/libs/types';

interface MovieCardProps {
  data: UnifiedCardData;
}

export function MovieCard({ data }: MovieCardProps) {
  return (
    <div className={cn(
      "mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-[#101114] relative flex flex-col justify-between transition hover:shadow-2xl"
    )}>
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-52 object-cover"
        />
      )}
      <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 rounded text-yellow-400 flex items-center text-xs">
        <Star className="w-3 h-3 mr-1" /> {data.metaPrimary}
      </div>
      <div className="p-4 flex flex-col flex-1 bg-neutral-200 dark:bg-neutral-800">
        <div className="text-sm font-bold  dark:text-white mb-1">
          {data.title}
        </div>
        <p className="text-xs dark:text-gray-400 text-gray-900 line-clamp-4">{data.description}</p>
        <div className="flex flex-row justify-between items-end mt-3">
          <span className="text-xs dark:text-gray-500 text-gray-900">{data.metaSecondary}</span>
          <a
            href={data.callToActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 font-medium text-xs dark:bg-white/10 bg-black/10 hover:bg-black/20 dark:hover:bg-white/20 rounded text-blue-700 dark:text-blue-100"
          >
            <ExternalLink className="w-3 h-3" /> See details
          </a>
        </div>
      </div>
    </div>
  );
}
