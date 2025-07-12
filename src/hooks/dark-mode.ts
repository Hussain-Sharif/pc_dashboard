// hooks/useDarkMode.ts
import { useAppDispatch, useAppSelector } from "@/store/store"
import { toggleDarkMode, setDarkModeFromStorage } from "@/store/slices/userPrefsSlice"
import { useEffect } from 'react'

export const useDarkMode = () => {
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector(state => state.userPrefs.darkMode)
  
  // HERE: Initialize from localStorage on app startup
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) {
      const isDark = savedMode === 'true'
      dispatch(setDarkModeFromStorage(isDark)) // 🎯 USED HERE!
    } else {
      // Fallback to system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      dispatch(setDarkModeFromStorage(systemPrefersDark)) // 🎯 USED HERE TOO!
    }
  }, [dispatch])
  
  const toggle = () => dispatch(toggleDarkMode())
  
  return { darkMode, toggle }
}
