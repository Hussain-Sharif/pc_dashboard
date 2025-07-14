'use client';



import { useEffect } from 'react';
import { useContent } from '../../../hooks/useContent';
// import { testReduxStore } from '../libs/test-redux';

export default function MyFeed() {
  const { content,switchSection,currentData,isLoading,hasError,errorMessage } = useContent();
//   const { content, userPrefs, currentData,switchSection, isLoading, hasError, errorMessage } = useContent();
  
  console.log(isLoading,hasError,errorMessage,'Current Data:', currentData);
  // for(const category of currentData.news){
  //   console.log(category.title)
  // }

  // Test Redux on mount
  useEffect(() => {
    // ✅ Only switch if the section isn't already correct!
    if (content.currentSection !== 'personalized') {
      switchSection('personalized');
    }
  }, [content.currentSection, switchSection]);

  const handleApiSituation=()=>{
    switch (key) {
      case value:
        
        break;
    
      default:
        break;
    }
  }


  return (
    <>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1>My Feed</h1>
            
        </div>
    </>
  );
}
