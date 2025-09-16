import React from 'react'
import { CheckCircle, XCircle, Clock, Target } from 'lucide-react'
import type { SectionalResult } from '@/types/exam'

interface SectionalResultsProps {
  results: SectionalResult[]
}

export const SectionalResults: React.FC<SectionalResultsProps> = ({ results }) => {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Section-wise Performance</h2>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={result.sectionId} className="border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {result.sectionName}
              </h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                result.cutoffMet 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {result.cutoffMet ? 'Cutoff Met' : 'Below Cutoff'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-slate-600">Score</p>
                <p className="text-xl font-bold text-slate-900">
                  {result.score.toFixed(1)}
                </p>
                <p className="text-xs text-slate-500">
                  / {result.maxScore}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-slate-600">Correct</p>
                <p className="text-xl font-bold text-green-600">
                  {result.correct}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-sm text-slate-600">Incorrect</p>
                <p className="text-xl font-bold text-red-600">
                  {result.incorrect}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-6 h-6 bg-slate-400 rounded"></div>
                </div>
                <p className="text-sm text-slate-600">Unattempted</p>
                <p className="text-xl font-bold text-slate-600">
                  {result.unattempted}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">%</span>
                </div>
                <p className="text-sm text-slate-600">Accuracy</p>
                <p className="text-xl font-bold text-purple-600">
                  {result.accuracy.toFixed(1)}%
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm text-slate-600">Time</p>
                <p className="text-xl font-bold text-orange-600">
                  {Math.floor(result.timeTaken / 60)}m
                </p>
                <p className="text-xs text-slate-500">
                  {result.timeTaken % 60}s
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Progress</span>
                <span>{result.attempted} / {result.attempted + result.unattempted} attempted</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(result.attempted / (result.attempted + result.unattempted)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}