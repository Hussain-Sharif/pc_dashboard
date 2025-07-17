'use client';
import { UserCircle2, ArrowUpRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { UnifiedCardData } from '@/libs/types';
import Image from 'next/image';

interface PostCardProps {
  data: UnifiedCardData;
}

export function PostCard({ data }: PostCardProps) {
  return (
    <div className={cn(
      "mb-4 break-inside-avoid h-fit rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-black/70 shadow-sm p-4 flex flex-col gap-2 transition hover:shadow-md"
)}>
      <div className="flex items-center gap-3 mb-1">
        {data.authorImageUrl ? (
          <img
            src={data.authorImageUrl}
            alt={data.authorName}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <UserCircle2 className="w-9 h-9 text-gray-300 dark:text-gray-700" />
        )}
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{data.authorName}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{data.metaPrimary}</div>
        </div>
      </div>
      <p className="text-[15px] mb-1 text-gray-800 dark:text-gray-100">
        {data.description}
      </p>
      <a
        href={data.callToActionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs inline-flex items-center text-blue-700 hover:underline dark:text-blue-300"
      >
        View Original <ArrowUpRight className="ml-1 w-3 h-3" />
      </a>
    </div>
  );
}
