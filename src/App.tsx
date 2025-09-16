import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ExamSelectionScreen } from '@/components/screens/ExamSelectionScreen'
import { InstructionsScreen } from '@/components/screens/InstructionsScreen'
import { ExamScreen } from '@/components/screens/ExamScreen'
import { ResultsScreen } from '@/components/screens/ResultsScreen'
import { ReviewScreen } from '@/components/screens/ReviewScreen'
import { LoadingScreen } from '@/components/screens/LoadingScreen'
import { useExamStore } from '@/stores/examStore'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Toaster } from '@/components/common/Toaster'

const App: React.FC = () => {
  const { currentScreen } = useExamStore()

  const screenComponents = {
    selection: ExamSelectionScreen,
    loading: LoadingScreen,
    instructions: InstructionsScreen,
    exam: ExamScreen,
    results: ResultsScreen,
    review: ReviewScreen,
  }

  const CurrentScreenComponent = screenComponents[currentScreen]

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-screen w-screen"
          >
            <CurrentScreenComponent />
          </motion.div>
        </AnimatePresence>
        <Toaster />
      </div>
    </ErrorBoundary>
  )
}

export default App