import React from 'react'
import { motion } from 'framer-motion'
import { useExamStore } from '@/stores/examStore'

export const QuestionDisplay: React.FC = () => {
  const { 
    selectedExam, 
    currentQuestionIndex, 
    answers, 
    updateAnswer 
  } = useExamStore()

  if (!selectedExam) return null

  const allQuestions = selectedExam.sections.flatMap(section => section.questions)
  const currentQuestion = allQuestions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestionIndex]

  if (!currentQuestion) return null

  const handleOptionSelect = (option: string) => {
    updateAnswer(currentQuestion.id, option)
  }

  return (
    <motion.div
      key={currentQuestionIndex}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="card p-8 h-full"
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-slate-800">
            Question {currentQuestionIndex + 1}
          </span>
          <div className="ml-4 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            {currentQuestion.topic}
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-slate-500">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            +{selectedExam.marking.correct} marks
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            {selectedExam.marking.incorrect} marks
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-8">
        <p className="text-lg text-slate-900 leading-relaxed font-medium">
          {currentQuestion.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = currentAnswer?.selectedAnswer === option
          const optionLabel = String.fromCharCode(65 + index) // A, B, C, D
          
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative"
            >
              <input
                type="radio"
                id={`option-${index}`}
                name="question-option"
                value={option}
                checked={isSelected}
                onChange={() => handleOptionSelect(option)}
                className="sr-only"
              />
              <label
                htmlFor={`option-${index}`}
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-900 shadow-md'
                    : 'border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50'
                }`}
              >
                {/* Option Circle */}
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-semibold text-sm ${
                  isSelected
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-slate-300 text-slate-500'
                }`}>
                  {optionLabel}
                </div>
                
                {/* Option Text */}
                <span className="flex-1 text-slate-800 font-medium">
                  {option}
                </span>
                
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </label>
            </motion.div>
          )
        })}
      </div>

      {/* Question Info */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center space-x-6">
            <span>Difficulty: <span className={`font-semibold ${
              currentQuestion.difficulty === 'easy' ? 'text-green-600' :
              currentQuestion.difficulty === 'medium' ? 'text-yellow-600' :
              'text-red-600'
            }`}>{currentQuestion.difficulty}</span></span>
            <span>Expected Time: {Math.floor(currentQuestion.timeToSolve / 60)}:{(currentQuestion.timeToSolve % 60).toString().padStart(2, '0')}</span>
          </div>
          <span>Previous Year Frequency: {currentQuestion.previousYearFrequency}/10</span>
        </div>
      </div>
    </motion.div>
  )
}