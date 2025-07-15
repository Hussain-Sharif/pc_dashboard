'use client';



import { useEffect } from 'react';
import { useContent } from '../../../hooks/useContent';

// import { testReduxStore } from '../libs/test-redux';

export default function MyFeed() {
  
  const { content,switchSection,currentData,errorMessage } = useContent();
//   const { content, userPrefs, currentData,switchSection, isLoading, hasError, errorMessage } = useContent();
  
  console.log(content.currentAllContentSituation,errorMessage,'Current Data:',content.unifiedContent);
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


  const handleSuccessSituation=()=>{
    return (
      <>
        HI suex
      </>
    )
  }

  const handleApiSituation=()=>{
    switch (content.currentAllContentSituation) {
      case 'loading':
        return 'Loading...';
      case 'success':
        return handleSuccessSituation()
      case 'error':
        return 'Loading...';
      default:
        return null;
    }
  }


  return (
    <>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className='text-2xl'>My Feed</h1>
            <main>
                {handleApiSituation()}
            </main>
        </div>
    </>
  );
}
