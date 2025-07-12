'use client';



import { useEffect } from 'react';
import { useContent } from '../../hooks/useContent';
// import { testReduxStore } from '../libs/test-redux';

export default function MyFeed() {
  const { switchSection,  } = useContent();
//   const { content, userPrefs, currentData,switchSection, isLoading, hasError, errorMessage } = useContent();
  
  // Test Redux on mount
  useEffect(() => {
     switchSection('personalized')
   }, [switchSection])
  return (
    <>
      
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1>My Feed</h1>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
        </div>
    </>
  );
}
