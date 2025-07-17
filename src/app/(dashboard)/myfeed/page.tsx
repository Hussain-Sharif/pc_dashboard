"use client"

import { useEffect, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { FilterOptions, UnifiedCardData } from '@/libs/types';
import { MovieCard } from '@/components/MovieCard';
import { NewsCard } from '@/components/newsCard';
import { PostCard } from '@/components/postCard';
import { shuffleCards } from '@/libs/shuffleCards';
import { Button } from '@/components/ui/button';
import { Filter, Newspaper, ShuffleIcon, Video, Waypoints } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function MyFeed() {
  const { content,switchSection,errorMessage } = useContent();
  const [currentOrderOfData, setCurrentOrderOfData] = useState<UnifiedCardData[]>([]);
  const [currentFilterOption, setCurrentFilterOption] = useState<FilterOptions>('shuffle');

  // Sync local state with Redux data when unifiedContent changes!
  useEffect(() => {
    if (content.unifiedContent && content.unifiedContent.length > 0 && currentFilterOption === 'shuffle') {
      setCurrentOrderOfData(shuffleCards(content.unifiedContent));
    }
    if(currentFilterOption === 'news'){
      setCurrentOrderOfData(content.unifiedContent.filter((item:UnifiedCardData) => item.type === 'news'));
    }
    if(currentFilterOption === 'movies'){
      setCurrentOrderOfData(content.unifiedContent.filter((item:UnifiedCardData) => item.type === 'movie'));
    }
    if(currentFilterOption === 'posts'){
      setCurrentOrderOfData(content.unifiedContent.filter((item:UnifiedCardData) => item.type === 'post'));
    }
  }, [content.unifiedContent,currentFilterOption]);

  useEffect(() => {
    if (content.currentSection !== 'personalized') {
      switchSection('personalized');
    }
  }, [content.currentSection, switchSection]);

  const handleSuccessSituation = () => {
    console.log("While showing content", currentOrderOfData, content.unifiedContent);
    return (
    <div className="content-start columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
  {currentOrderOfData.map((item: UnifiedCardData) => {
    switch (item.type) {
      case 'movie':
        return <MovieCard key={item.id} data={item}  />;
      case 'news':
        return <NewsCard key={item.id} data={item} />;
      case 'post':
        return <PostCard key={item.id} data={item}  />;
      default:
        return null;
    }
  })}
</div>

    )
  }

  const handleApiSituation = () => {
    switch (content.currentAllContentSituation) {
      case 'loading':
        return 'Loading...';
      case 'success':
        return handleSuccessSituation();
      case 'error':
        return 'There is some Error please Try Again...';
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className='text-2xl font-bold'>My Feed</h1>
      <div className='flex flex-row gap-0'>

        <ToggleGroup variant="outline" type="single" value={currentFilterOption} onValueChange={setCurrentFilterOption}>
      <ToggleGroupItem value="shuffle" aria-label='shuffle'>

          <ShuffleIcon/>

      </ToggleGroupItem>
      <ToggleGroupItem value="news" aria-label='news'>
          <Newspaper/>
      </ToggleGroupItem>
      <ToggleGroupItem value="movies" aria-label='movies'>
          <Video/>
      </ToggleGroupItem>
      <ToggleGroupItem value="posts" aria-label='posts'>
          <Waypoints/>
      </ToggleGroupItem>
    
    </ToggleGroup>
     
      </div>
      <main>
        {handleApiSituation()}
      </main>
    </div>
  );
}
