import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExamHeader } from '@/components/exam/ExamHeader'
import { SectionTabs } from '@/components/exam/SectionTabs'
import { QuestionDisplay } from '@/components/exam/QuestionDisplay'
import { QuestionPalette } from '@/components/exam/QuestionPalette'
import { ExamControls } from '@/components/exam/ExamControls'
import { useExamStore } from '@/stores/examStore'
import { useTimer } from '@/hooks/useTimer'

export const ExamScreen: React.FC = () => {
  const { 
    selectedExam, 
    currentSession, 
    timeRemaining, 
    sectionTimeRemaining,
    setTimeRemaining,
    setSectionTimeRemaining,
    submitExam
  } = useExamStore()

  // Main timer
  useTimer({
    initialTime: timeRemaining,
    onTick: (time) => setTimeRemaining(time),
    onComplete: () => submitExam(),
    isActive: !!currentSession && !currentSession.isPaused
  })

  // Section timer (if applicable)
  useTimer({
    initialTime: sectionTimeRemaining || 0,
    onTick: (time) => setSectionTimeRemaining(time),
    onComplete: () => {
      // Handle section time completion
      // This would typically move to next section or submit
    },
    isActive: !!selectedExam?.isSectionalTimed && !!currentSession && !currentSession.isPaused
  })

  if (!selectedExam || !currentSession) {
    return null
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <ExamHeader />
      
      {/* Section Tabs */}
      {selectedExam.sections.length > 1 && <SectionTabs />}
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Question Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="flex-1 p-6 overflow-y-auto">
            <QuestionDisplay />
          </div>
          
          {/* Controls */}
          <div className="border-t bg-white p-4">
            <ExamControls />
          </div>
        </motion.div>
        
        {/* Question Palette */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-80 border-l bg-white hidden lg:block"
        >
          <QuestionPalette />
        </motion.div>
      </div>
    </div>
  )
}