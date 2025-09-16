import React from 'react'
import { Bookmark, SkipForward, RotateCcw, Save } from 'lucide-react'
import { useExamStore } from '@/stores/examStore'

export const ExamControls: React.FC = () => {
  const { 
    selectedExam,
    currentQuestionIndex,
    currentSectionIndex,
    answers,
    updateAnswer,
    markQuestion,
    setCurrentQuestion
  } = useExamStore()

  if (!selectedExam) return null

  const allQuestions = selectedExam.sections.flatMap(section => section.questions)
  const currentQuestion = allQuestions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestionIndex]
  
  // Calculate section boundaries
  let sectionStartIndex = 0
  for (let i = 0; i < currentSectionIndex; i++) {
    sectionStartIndex += selectedExam.sections[i].questions.length
  }
  const sectionEndIndex = sectionStartIndex + selectedExam.sections[currentSectionIndex].questions.length - 1

  const handleClearResponse = () => {
    if (currentQuestion) {
      updateAnswer(currentQuestion.id, null)
    }
  }

  const handleMarkForReview = () => {
    if (currentQuestion) {
      const isCurrentlyMarked = currentAnswer?.status === 'marked' || currentAnswer?.status === 'marked-answered'
      markQuestion(currentQuestion.id, !isCurrentlyMarked)
    }
  }

  const handleSaveAndNext = () => {
    // Move to next question in current section
    if (currentQuestionIndex < sectionEndIndex) {
      setCurrentQuestion(currentQuestionIndex + 1)
    }
  }

  const isLastQuestionInSection = currentQuestionIndex === sectionEndIndex
  const hasAnswer = currentAnswer?.selectedAnswer !== null
  const isMarked = currentAnswer?.status === 'marked' || currentAnswer?.status === 'marked-answered'

  return (
    <div className="flex items-center justify-between">
      {/* Left Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleMarkForReview}
          className={`btn flex items-center ${
            isMarked 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          <Bookmark className={`w-4 h-4 mr-2 ${isMarked ? 'fill-current' : ''}`} />
          {isMarked ? 'Unmark' : 'Mark for Review'}
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleClearResponse}
          disabled={!hasAnswer}
          className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear Response
        </button>

        {!isLastQuestionInSection ? (
          <button
            onClick={handleSaveAndNext}
            className="btn-success flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save & Next
            <SkipForward className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <div className="text-sm text-slate-600 px-4 py-2 bg-slate-100 rounded-lg">
            Last question in section
          </div>
        )}
      </div>
    </div>
  )
}