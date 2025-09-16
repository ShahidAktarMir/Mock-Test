import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ToastMessage, LoadingState } from '@/types/ui'

interface UIState {
  // Toast notifications
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
  
  // Loading states
  loadingStates: Record<string, LoadingState>
  setLoading: (key: string, state: LoadingState) => void
  clearLoading: (key: string) => void
  
  // Modal states
  modals: Record<string, boolean>
  openModal: (key: string) => void
  closeModal: (key: string) => void
  
  // Theme
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  
  // Sidebar
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Fullscreen
  isFullscreen: boolean
  setFullscreen: (fullscreen: boolean) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      // Toast notifications
      toasts: [],
      
      addToast: (toast) => {
        const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const newToast: ToastMessage = {
          id,
          duration: 5000,
          ...toast
        }
        
        set(state => ({
          toasts: [...state.toasts, newToast]
        }))
        
        // Auto remove toast after duration
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id)
          }, newToast.duration)
        }
      },
      
      removeToast: (id) => {
        set(state => ({
          toasts: state.toasts.filter(toast => toast.id !== id)
        }))
      },
      
      clearToasts: () => set({ toasts: [] }),
      
      // Loading states
      loadingStates: {},
      
      setLoading: (key, state) => {
        set(prevState => ({
          loadingStates: {
            ...prevState.loadingStates,
            [key]: state
          }
        }))
      },
      
      clearLoading: (key) => {
        set(prevState => {
          const { [key]: removed, ...rest } = prevState.loadingStates
          return { loadingStates: rest }
        })
      },
      
      // Modal states
      modals: {},
      
      openModal: (key) => {
        set(state => ({
          modals: { ...state.modals, [key]: true }
        }))
      },
      
      closeModal: (key) => {
        set(state => ({
          modals: { ...state.modals, [key]: false }
        }))
      },
      
      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      // Sidebar
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // Fullscreen
      isFullscreen: false,
      setFullscreen: (fullscreen) => set({ isFullscreen: fullscreen })
    }),
    { name: 'UIStore' }
  )
)