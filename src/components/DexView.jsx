import React, { useState } from 'react';
import { 
  Lock, 
  CheckCircle, 
  Clock, 
  Search, 
  Award
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Define local cn utility to avoid import errors
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CATEGORY_TABS = [
  { id: 'all', label: '전체' },
  { id: 'tech', label: '국가기술' },
  { id: 'special', label: '국가전문' },
  { id: 'global', label: '국제/해외' },
  { id: 'language', label: '어학' },
];

const DexView = ({ certificates, onCertClick }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedIssuer, setSelectedIssuer] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 0. Extract Unique Issuers for 'tech' category
  const techIssuers = ['all', ...new Set(certificates.filter(c => c.type === 'tech').map(c => c.issuer))];

  // 1. Filter Logic
  const filteredCerts = certificates.filter(cert => {
    const matchesTab = activeTab === 'all' || cert.type === activeTab;
    const matchesIssuer = activeTab !== 'tech' || selectedIssuer === 'all' || cert.issuer === selectedIssuer;
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesIssuer && matchesSearch;
  });

  // Reset issuer filter when changing tabs
  React.useEffect(() => {
    if (activeTab !== 'tech') setSelectedIssuer('all');
  }, [activeTab]);

  // 2. Stats Calculation
  const totalCount = certificates.length;
  const acquiredCount = certificates.filter(c => c.status === 'acquired').length;
  const progressPercentage = totalCount > 0 ? Math.round((acquiredCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Header & Progress */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Award className="text-primary dark:text-accent" />
              자격증 도감
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              총 <span className="text-primary dark:text-accent font-bold">{totalCount}개</span>의 자격증 중 
              <span className="text-gray-900 dark:text-white font-bold"> {acquiredCount}개</span>를 수집했습니다!
            </p>
          </div>
          <div className="w-full md:w-1/3 space-y-2">
             <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>달성률</span>
                <span>{progressPercentage}%</span>
             </div>
             <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-blue-400 dark:from-accent dark:to-blue-600 transition-all duration-1000 ease-out relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                </div>
             </div>
          </div>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      </div>

      {/* 2. Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md py-4 -my-4 px-2">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                activeTab === tab.id
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Issuer Filter (For all specific tabs) */}
          {activeTab !== 'all' && (
            <select
              value={selectedIssuer}
              onChange={(e) => setSelectedIssuer(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium focus:border-primary outline-none dark:text-white"
            >
              <option value="all">모든 기관</option>
              {currentIssuers.filter(i => i !== 'all').map(issuer => (
                <option key={issuer} value={issuer}>{issuer}</option>
              ))}
            </select>
          )}

          {/* Search */}
          <div className="relative w-full md:w-64">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
               type="text" 
               placeholder="자격증 검색..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
             />
          </div>
        </div>
      </div>

      {/* 3. Certificate Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredCerts.map((cert) => (
          <div 
            key={cert.id}
            onClick={() => onCertClick(cert)}
            className={cn(
              "group relative flex flex-col items-center p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
              cert.status === 'acquired' 
                ? "bg-white dark:bg-gray-900 border-primary/20 dark:border-accent/30 shadow-lg shadow-blue-100/50 dark:shadow-none hover:-translate-y-1"
                : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 grayscale hover:grayscale-0 hover:bg-white dark:hover:bg-gray-800"
            )}
          >
            {/* Status Badge */}
            <div className="absolute top-3 right-3 z-10">
              {cert.status === 'acquired' && <CheckCircle size={20} className="text-primary dark:text-accent fill-blue-100 dark:fill-blue-900/50" />}
              {cert.status === 'pending' && <Clock size={20} className="text-orange-500 fill-orange-100 dark:fill-orange-900/20" />}
              {cert.status === 'locked' && <Lock size={18} className="text-gray-300 dark:text-gray-600" />}
            </div>

            {/* Icon */}
            <div className={cn(
              "w-16 h-16 mb-4 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110",
              cert.status === 'acquired' ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20" : "bg-gray-100 dark:bg-gray-800"
            )}>
               {cert.icon}
            </div>

            {/* Info */}
            <div className="text-center space-y-1">
              <h3 className={cn(
                "font-bold text-sm md:text-base",
                cert.status === 'acquired' ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
              )}>
                {cert.name}
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">{cert.issuer}</p>
            </div>

            {/* Unlock Hint Overlay (Hover) */}
            {cert.status === 'locked' && (
               <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                  <p className="text-white text-xs font-bold px-3 py-1.5 border border-white/30 rounded-full">
                     눌러서 인증하기
                  </p>
               </div>
            )}
             {cert.status === 'pending' && (
               <div className="absolute inset-0 bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center">
                  <p className="text-orange-600 dark:text-orange-400 text-xs font-bold bg-white/80 dark:bg-black/60 px-2 py-1 rounded-md">
                     심사 중...
                  </p>
               </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default DexView;
