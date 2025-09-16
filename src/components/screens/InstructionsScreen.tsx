import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, AlertTriangle, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react'
import { useExamStore } from '@/stores/examStore'

export const InstructionsScreen: React.FC = () => {
  const { selectedExam, setCurrentScreen, startExam } = useExamStore()
  const [hasReadInstructions, setHasReadInstructions] = useState(false)

  if (!selectedExam) {
    return null
  }

  const totalQuestions = selectedExam.sections.reduce((sum, section) => sum + section.questions.length, 0)
  const totalDuration = Math.floor(selectedExam.totalDuration / 60)

  const handleStartExam = () => {
    if (!hasReadInstructions) return
    startExam()
  }

  const handleBack = () => {
    setCurrentScreen('selection')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-3xl font-bold text-slate-900">Exam Instructions</h1>
            </div>
            <h2 className="text-xl text-primary-600 font-semibold">{selectedExam.title}</h2>
            <p className="text-slate-600 mt-2">{selectedExam.description}</p>
          </div>

          {/* Exam Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Duration</p>
              <p className="text-lg font-bold text-slate-900">{totalDuration} minutes</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Questions</p>
              <p className="text-lg font-bold text-slate-900">{totalQuestions}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Correct</p>
              <p className="text-lg font-bold text-slate-900">+{selectedExam.marking.correct}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Incorrect</p>
              <p className="text-lg font-bold text-slate-900">{selectedExam.marking.incorrect}</p>
            </div>
          </div>

          {/* Sections */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Test Sections</h3>
            <div className="space-y-3">
              {selectedExam.sections.map((section, index) => (
                <div key={section.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-900">{section.name}</h4>
                    <p className="text-sm text-slate-600">{section.questions.length} questions</p>
                  </div>
                  {selectedExam.isSectionalTimed && (
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Time Limit</p>
                      <p className="font-semibold text-slate-900">{Math.floor(section.duration / 60)} minutes</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Important Instructions</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="space-y-4">
                {selectedExam.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-slate-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Guidelines */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">General Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  The clock will be set at the server
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Question palette shows status of each question
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Click on question numbers to navigate directly
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Use 'Save & Next' to save your answer
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  'Mark for Review' to revisit questions
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  'Clear Response' to remove selected answer
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hasReadInstructions}
                onChange={(e) => setHasReadInstructions(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-2 border-slate-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-slate-700 font-medium">
                I have read and understood all the instructions above
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Selection
            </button>
            
            <button
              onClick={handleStartExam}
              disabled={!hasReadInstructions}
              className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Test
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}