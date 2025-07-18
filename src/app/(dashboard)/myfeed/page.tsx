"use client"

import { useEffect, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { FilterOptions, UnifiedCardData } from '@/libs/types';
import { MovieCard } from '@/components/MovieCard';
import { NewsCard } from '@/components/newsCard';
import { PostCard } from '@/components/postCard';
import { shuffleCards } from '@/constants/shuffleCards';
import { Button } from '@/components/ui/button';
import { Filter, FilterIcon, Newspaper, ShuffleIcon, Video, Waypoints } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { listOfNewsCategories, NewsCategory } from '@/constants/newsCategories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { listOfMovieGenres, MovieGenre } from '@/constants/movieGenreOptions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

export default function MyFeed() {
  const { content,switchSection,errorMessage } = useContent();
  const [currentOrderOfData, setCurrentOrderOfData] = useState<UnifiedCardData[]>([]);
  const [currentFilterOption, setCurrentFilterOption] = useState<FilterOptions>('shuffle');
  const [currentNewsCategory, setCurrentNewsCategory] = useState<NewsCategory|string>('');
  const [currentGenres,setCurrentGenres] = useState<MovieGenre[]>([]);

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

  console.log("Main Filters", currentFilterOption,currentGenres,currentNewsCategory);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className='text-2xl font-bold'>My Feed</h1>
      <div className='flex justify-between items-center flex-row gap-0'>

        <ToggleGroup variant="outline" type="single" value={currentFilterOption} onValueChange={(value)=>{
          setCurrentFilterOption(value)
          setCurrentNewsCategory('')
          setCurrentGenres([])
        }}>
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

      <div>
        <Sheet>
          <SheetTrigger><FilterIcon className='text-foreground cursor-pointer h-6 w-6'/></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter the Cards!!</SheetTitle>
              <SheetDescription>
                {
                  (currentFilterOption==='posts') &&
                  "As of Now there are no filters for Social Media Post Cards"
                }
                {
                  (currentFilterOption==='news' || currentFilterOption==='shuffle') &&
                  "Filter News Card by Category " 
                }
                
                {
                  (currentFilterOption==='shuffle') &&
                  "& Movie Cards by Genre" 
                }
                {
                  (currentFilterOption==='movies') &&
                  "Filter Movie Cards by Genre" 
                }

              </SheetDescription>
            </SheetHeader>
                {
                  (currentFilterOption==='news' || currentFilterOption==='shuffle') &&
                  (
                    <div className=' w-full flex justify-start items-center pl-4 gap-4'>

                      <p className='text-sm text-muted-foreground mr-2'> Category:</p>

                      <Select value={currentNewsCategory} onValueChange={setCurrentNewsCategory} >
                        <SelectTrigger className="max-w-2xl">
                          <SelectValue placeholder="Select a News category" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            listOfNewsCategories.map((category:NewsCategory) => (
                              <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    
                    </div>
                  )
                }
                {
                  (currentFilterOption==='movies' || currentFilterOption==='shuffle') &&
                  (
                    <div className=' w-full flex justify-start items-center p-2 pl-4 gap-4'>

                      <p className='text-sm text-muted-foreground mr-2'> Movie Genre:</p>

                      <Popover >
                        <PopoverTrigger>
                          {
                            currentGenres.length>0 ?
                            <div className='flex flex-row flex-wrap border rounded-xl p-2 gap-2 min-w-fit max-w-[70%]'>
                              {
                              currentGenres.map((genre:MovieGenre) => (
                                <div className='text-sm bg-accent rounded-3xl px-2' key={genre.id} >{genre.name}</div>
                              ))
                            }
                            </div>
                            :
                            <div className=' border rounded-xl p-2 '>
                              Select Movie Genres
                            </div>
                          }
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-2 flex flex-wrap gap-2'>
                           {
                            listOfMovieGenres.map((category:MovieGenre) => (
                              <label key={category.id} htmlFor={`${category.id}`} className='flex flex-row gap-2'>
                                <Checkbox 
                                id={`${category.id}`} 
                                checked={currentGenres.some((genre:MovieGenre) => genre.id === category.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setCurrentGenres([...currentGenres, category]);
                                  } else {
                                    setCurrentGenres(currentGenres.filter((genre:MovieGenre) => genre.id !== category.id));
                                  }
                                }}
                                />
                                <span className='text-sm '>{category.name}</span>
                              </label>
                            ))
                          }
                        </PopoverContent>
                      </Popover>

                      
                    </div>
                  )
                }

          </SheetContent>
        </Sheet>
      </div>
     
      </div>
      <main>
        {handleApiSituation()}
      </main>
    </div>
  );
}
