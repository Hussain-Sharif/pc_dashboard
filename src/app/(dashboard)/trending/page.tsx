'use client'
import { useContent } from '@/hooks/useContent'
import { useEffect } from 'react'

export default function TrendingPage() {
  const {  switchSection } = useContent()
  
  useEffect(() => {
    switchSection('trending')
  }, [switchSection])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Trending Content</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
    </div>
  )
}
