import React from 'react'
import { useExamStore } from '@/stores/examStore'

export const QuestionPalette: React.FC = () => {
  const { 
    selectedExam, 
    currentSectionIndex, 
    currentQuestionIndex, 
    answers, 
    setCurrentQuestion 
  } = useExamStore()

  if (!selectedExam) return null

  const currentSection = selectedExam.sections[currentSectionIndex]
  
  // Calculate question indices for current section
  let sectionStartIndex = 0
  for (let i = 0; i < currentSectionIndex; i++) {
    sectionStartIndex += selectedExam.sections[i].questions.length
  }
  
  const sectionQuestions = currentSection.questions.map((_, index) => ({
    globalIndex: sectionStartIndex + index,
    localIndex: index,
    answer: answers[sectionStartIndex + index]
  }))

  const getStatusClass = (answer: any, globalIndex: number) => {
    const isActive = globalIndex === currentQuestionIndex
    let baseClass = "w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center "
    
    if (isActive) {
      baseClass += "ring-4 ring-primary-300 "
    }
    
    switch (answer?.status) {
      case 'answered':
        return baseClass + "bg-green-500 text-white hover:bg-green-600"
      case 'not-answered':
        return baseClass + "bg-red-500 text-white hover:bg-red-600"
      case 'marked':
        return baseClass + "bg-purple-500 text-white hover:bg-purple-600"
      case 'marked-answered':
        return baseClass + "bg-green-500 text-white hover:bg-green-600 relative"
      case 'not-visited':
      default:
        return baseClass + "bg-slate-400 text-white hover:bg-slate-500"
    }
  }

  const getStatusCounts = () => {
    const counts = {
      answered: 0,
      'not-answered': 0,
      marked: 0,
      'marked-answered': 0,
      'not-visited': 0
    }
    
    sectionQuestions.forEach(({ answer }) => {
      if (answer?.status) {
        counts[answer.status as keyof typeof counts]++
      }
    })
    
    return counts
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* Section Title */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">
          {currentSection.name}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {currentSection.questions.length} questions
        </p>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {sectionQuestions.map(({ globalIndex, localIndex, answer }) => (
          <button
            key={globalIndex}
            onClick={() => setCurrentQuestion(globalIndex)}
            className={getStatusClass(answer, globalIndex)}
            title={`Question ${localIndex + 1} - ${answer?.status || 'not-visited'}`}
          >
            {localIndex + 1}
            {answer?.status === 'marked-answered' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white">
                <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-slate-700 border-b pb-2">
          Question Status
        </h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
              <span className="text-slate-700">Answered</span>
            </div>
            <span className="font-semibold text-slate-600">
              {statusCounts.answered + statusCounts['marked-answered']}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
              <span className="text-slate-700">Not Answered</span>
            </div>
            <span className="font-semibold text-slate-600">
              {statusCounts['not-answered']}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-slate-400 rounded mr-3"></div>
              <span className="text-slate-700">Not Visited</span>
            </div>
            <span className="font-semibold text-slate-600">
              {statusCounts['not-visited']}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded mr-3 relative">
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
              </div>
              <span className="text-slate-700">Marked for Review</span>
            </div>
            <span className="font-semibold text-slate-600">
              {statusCounts.marked + statusCounts['marked-answered']}
            </span>
          </div>
        </div>
      </div>

      {/* Section Progress */}
      <div className="mt-8 pt-6 border-t">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Section Progress</h4>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((statusCounts.answered + statusCounts['marked-answered']) / sectionQuestions.length) * 100}%` 
            }}
          ></div>
        </div>
        <p className="text-xs text-slate-600 mt-2">
          {statusCounts.answered + statusCounts['marked-answered']} of {sectionQuestions.length} answered
        </p>
      </div>
    </div>
  )
}