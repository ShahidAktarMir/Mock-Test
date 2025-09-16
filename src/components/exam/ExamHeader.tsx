import React from 'react'
import { Clock, AlertTriangle } from 'lucide-react'
import { useExamStore } from '@/stores/examStore'
import { useUIStore } from '@/stores/uiStore'
import { formatTime } from '@/utils/timeUtils'

export const ExamHeader: React.FC = () => {
  const { 
    selectedExam, 
    timeRemaining, 
    sectionTimeRemaining,
    submitExam 
  } = useExamStore()
  const { openModal } = useUIStore()

  if (!selectedExam) return null

  const handleSubmit = () => {
    openModal('submit-confirmation')
  }

  const isTimeRunningOut = timeRemaining < 300 // Less than 5 minutes
  const isSectionTimeRunningOut = sectionTimeRemaining && sectionTimeRemaining < 120 // Less than 2 minutes

  return (
    <header className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Exam Title */}
        <div>
          <h1 className="text-xl font-bold">{selectedExam.title}</h1>
          <p className="text-primary-100 text-sm opacity-90">
            {selectedExam.description}
          </p>
        </div>

        {/* Timers and Controls */}
        <div className="flex items-center space-x-6">
          {/* Section Timer */}
          {selectedExam.isSectionalTimed && sectionTimeRemaining !== null && (
            <div className={`flex items-center px-4 py-2 rounded-lg backdrop-blur-sm ${
              isSectionTimeRunningOut 
                ? 'bg-red-500/20 border border-red-300/30' 
                : 'bg-black/20 border border-white/20'
            }`}>
              <div className="text-right mr-3">
                <p className="text-xs opacity-80">Section Time</p>
                <div className="flex items-center">
                  <Clock className={`w-4 h-4 mr-2 ${
                    isSectionTimeRunningOut ? 'text-red-300' : 'text-white'
                  }`} />
                  <span className={`text-lg font-mono font-bold ${
                    isSectionTimeRunningOut ? 'text-red-100' : 'text-white'
                  }`}>
                    {formatTime(sectionTimeRemaining)}
                  </span>
                </div>
              </div>
              {isSectionTimeRunningOut && (
                <AlertTriangle className="w-5 h-5 text-red-300 animate-pulse" />
              )}
            </div>
          )}

          {/* Main Timer */}
          <div className={`flex items-center px-4 py-2 rounded-lg backdrop-blur-sm ${
            isTimeRunningOut 
              ? 'bg-red-500/20 border border-red-300/30' 
              : 'bg-black/20 border border-white/20'
          }`}>
            <div className="text-right mr-3">
              <p className="text-xs opacity-80">Total Time</p>
              <div className="flex items-center">
                <Clock className={`w-4 h-4 mr-2 ${
                  isTimeRunningOut ? 'text-red-300' : 'text-white'
                }`} />
                <span className={`text-lg font-mono font-bold ${
                  isTimeRunningOut ? 'text-red-100' : 'text-white'
                }`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
            {isTimeRunningOut && (
              <AlertTriangle className="w-5 h-5 text-red-300 animate-pulse" />
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Submit Test
          </button>
        </div>
      </div>
    </header>
  )
}