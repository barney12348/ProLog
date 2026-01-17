import React from 'react';
import { TrendingUp, Sparkles, MapPin, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Seo from '../components/Seo.jsx';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const TimelineView = ({ history, categories }) => {
    if (history.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400 dark:text-gray-600">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <TrendingUp size={40} className="text-gray-300 dark:text-gray-700" />
          </div>
          <p className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">기록이 비어있어요</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">성취를 기록하고 나만의 타임라인을 만들어보세요.</p>
        </div>
      );
    }
  
    const sortedHistory = [...history].sort((a, b) => b.id - a.id);
  
    return (
      <div className="relative max-w-4xl mx-auto py-8 md:py-16 px-4">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800 -translate-x-1/2 hidden md:block"></div>
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800 md:hidden"></div>
  
        <div className="space-y-12">
          {sortedHistory.map((item, index) => {
            const categoryIcon = categories.find(c => c.id === item.category)?.icon || <Sparkles size={16} />;
            const isEven = index % 2 === 0;
  
            return (
              <div key={item.id} className={cn(
                "relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0",
                isEven ? "md:flex-row-reverse" : ""
              )}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-[3px] border-primary dark:border-accent shadow-sm -translate-x-[9px] md:-translate-x-1/2 z-10 top-0 md:top-auto mt-1 md:mt-0"></div>
  
                {/* Date (Desktop) */}
                <div className={cn(
                  "hidden md:block w-1/2 px-12 text-sm font-bold text-gray-400 dark:text-gray-500",
                  isEven ? "text-left" : "text-right"
                )}>
                  {item.date}
                </div>
  
                {/* Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                  <div className="bg-white dark:bg-gray-900 p-5 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-black/20 hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1.5">
                      <Calendar size={12} />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-accent rounded-xl">
                        {categoryIcon}
                      </div>
                      <span className="text-xs font-bold text-blue-600 dark:text-accent bg-blue-50/50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{item.categoryLabel}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap line-clamp-3 font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-20 text-center">
           <div className="inline-flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center text-primary dark:text-accent">
                 <MapPin size={24} />
              </div>
              <span className="text-xs font-bold text-gray-300 dark:text-gray-700 tracking-[0.2em] uppercase">Start of Journey</span>
           </div>
        </div>
      </div>
    );
  };
  

export default function Timeline({ history, categories }) {
    return (
        <>
            <Seo
                title="타임라인 - ProLog"
                description="시간의 흐름에 따른 당신의 눈부신 성취를 확인하세요."
            />
            <TimelineView history={history} categories={categories} />
        </>
    );
}
