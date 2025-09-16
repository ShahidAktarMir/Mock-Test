import React from 'react'
import { TrendingUp, TrendingDown, Lightbulb, Clock } from 'lucide-react'
import type { PerformanceAnalysis } from '@/types/exam'

interface PerformanceAnalysisProps {
  analysis: PerformanceAnalysis
}

export const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = ({ analysis }) => {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Performance Analysis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths & Weaknesses */}
        <div className="space-y-6">
          {/* Strengths */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Strengths</h3>
            </div>
            <div className="space-y-2">
              {analysis.strengths.length > 0 ? (
                analysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-slate-700">{strength}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No specific strengths identified</p>
              )}
            </div>
          </div>
          
          {/* Weaknesses */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Areas for Improvement</h3>
            </div>
            <div className="space-y-2">
              {analysis.weaknesses.length > 0 ? (
                analysis.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-slate-700">{weakness}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No specific weaknesses identified</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Recommendations & Time Analysis */}
        <div className="space-y-6">
          {/* Recommendations */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Lightbulb className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Recommendations</h3>
            </div>
            <div className="space-y-2">
              {analysis.recommendations.length > 0 ? (
                analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-slate-700">{recommendation}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">Keep up the good work!</p>
              )}
            </div>
          </div>
          
          {/* Time Management */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Time Management</h3>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Average per question</p>
                  <p className="font-semibold text-slate-900">
                    {Math.floor(analysis.timeManagement.averageTimePerQuestion / 60)}:
                    {(analysis.timeManagement.averageTimePerQuestion % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Efficiency</p>
                  <p className={`font-semibold capitalize ${
                    analysis.timeManagement.efficiency === 'excellent' ? 'text-green-600' :
                    analysis.timeManagement.efficiency === 'good' ? 'text-blue-600' :
                    analysis.timeManagement.efficiency === 'average' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {analysis.timeManagement.efficiency.replace('-', ' ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}