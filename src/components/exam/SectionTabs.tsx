import React from 'react'
import { useExamStore } from '@/stores/examStore'

export const SectionTabs: React.FC = () => {
  const { 
    selectedExam, 
    currentSectionIndex, 
    setCurrentSection 
  } = useExamStore()

  if (!selectedExam || selectedExam.sections.length <= 1) return null

  const canSwitchSections = selectedExam.allowSectionSwitch

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="flex">
        {selectedExam.sections.map((section, index) => {
          const isActive = index === currentSectionIndex
          const isDisabled = !canSwitchSections && index !== currentSectionIndex
          
          return (
            <button
              key={section.id}
              onClick={() => canSwitchSections && setCurrentSection(index)}
              disabled={isDisabled}
              className={`flex-1 px-6 py-4 text-sm font-semibold border-b-4 transition-all duration-200 ${
                isActive
                  ? 'text-primary-600 border-primary-600 bg-primary-50'
                  : isDisabled
                    ? 'text-slate-400 border-transparent cursor-not-allowed'
                    : 'text-slate-600 border-transparent hover:text-primary-600 hover:border-primary-300 hover:bg-slate-50'
              }`}
            >
              <div className="text-center">
                <div className="font-bold">{section.name}</div>
                <div className="text-xs opacity-75 mt-1">
                  {section.questions.length} questions
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}