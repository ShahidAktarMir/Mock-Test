import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X, CheckCircle, XCircle } from 'lucide-react'
import { useExamStore } from '@/stores/examStore'

export const ReviewScreen: React.FC = () => {
  const { selectedExam, answers, setCurrentScreen } = useExamStore()
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  if (!selectedExam || !answers.length) {
    return null
  }

  const allQuestions = selectedExam.sections.flatMap(section => section.questions)
  const currentQuestion = allQuestions[currentReviewIndex]
  const currentAnswer = answers[currentReviewIndex]
  
  const isCorrect = currentAnswer.selectedAnswer === currentQuestion.correctAnswer
  const wasAttempted = currentAnswer.selectedAnswer !== null

  const handlePrevious = () => {
    if (currentReviewIndex > 0) {
      setCurrentReviewIndex(currentReviewIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentReviewIndex < allQuestions.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1)
    }
  }

  const handleClose = () => {
    setCurrentScreen('results')
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-slate-800 text-white rounded-t-2xl">
            <h1 className="text-2xl font-bold">Answer Review</h1>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Question Content */}
          <div className="p-8">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-lg font-semibold text-slate-700">
                  Question {currentReviewIndex + 1}
                </span>
                {wasAttempted && (
                  <div className={`ml-3 flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isCorrect 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-1" />
                        Incorrect
                      </>
                    )}
                  </div>
                )}
                {!wasAttempted && (
                  <div className="ml-3 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    Not Attempted
                  </div>
                )}
              </div>
              <div className="text-sm text-slate-500">
                Topic: {currentQuestion.topic}
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <p className="text-lg text-slate-900 leading-relaxed">
                {currentQuestion.text}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = option === currentAnswer.selectedAnswer
                const isCorrectOption = option === currentQuestion.correctAnswer
                
                let optionClass = "p-4 border-2 rounded-xl transition-all duration-200 "
                
                if (isCorrectOption) {
                  optionClass += "border-green-500 bg-green-50 text-green-900"
                } else if (isSelected && !isCorrectOption) {
                  optionClass += "border-red-500 bg-red-50 text-red-900"
                } else {
                  optionClass += "border-slate-200 bg-slate-50 text-slate-700"
                }

                return (
                  <div key={index} className={optionClass}>
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        isCorrectOption 
                          ? 'border-green-500 bg-green-500' 
                          : isSelected 
                            ? 'border-red-500 bg-red-500' 
                            : 'border-slate-300'
                      }`}>
                        {(isCorrectOption || isSelected) && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                      {isCorrectOption && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                      )}
                      {isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-red-600 ml-2" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-sm font-bold">?</span>
                </div>
                Explanation
              </h4>
              <p className="text-blue-800 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between p-6 border-t bg-slate-50 rounded-b-2xl">
            <button
              onClick={handlePrevious}
              disabled={currentReviewIndex === 0}
              className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <span className="font-semibold text-slate-700">
              {currentReviewIndex + 1} of {allQuestions.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentReviewIndex === allQuestions.length - 1}
              className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}