import { defineStore } from 'pinia'
import { ref, watch } from 'vue'


export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localstorage.getItem('theme') || 'light')
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme',theme.value)
    updateHTMLClass()
  }
  const updateHTMLClass = () => {
    document.documentElement.classList.remove('light','dark')
    document.documentElement.classList.add(theme.value)
  }
  updateHTMLClass()
  watch(theme, () => {
    updateHTMLClass()
  })
  return {theme,toggleTheme}
})
