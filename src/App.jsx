import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  History,
  Settings,
  UploadCloud,
  CheckCircle,
  Loader2,
  Copy,
  Sparkles,
  Instagram,
  FileText,
  Linkedin,
  Award,
  BookOpen,
  Target,
  PenTool,
  Hash,
  ScrollText,
  Camera,
  Briefcase,
  Pencil,
  X,
  Trash2,
  Calendar,
  TrendingUp,
  MapPin,
  PieChart,
  Download,
  Image as ImageIcon,
  Share2,
  Sun,
  Moon
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import ImageResizer from './components/ImageResizer';
import DexView from './components/DexView';
import { ALL_CERTIFICATES, getCertIcon } from './data/certificates';

// Utility for class merging
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 group relative overflow-hidden",
      active 
        ? "bg-primary/5 dark:bg-primary/10 text-primary dark:text-accent shadow-sm" 
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
    )}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
    <span className={cn("transition-transform duration-200", active ? "scale-110" : "group-hover:scale-110")}>
      {icon}
    </span>
    {label}
  </button>
);

const Sidebar = ({ activePage, onNavigate, darkMode, toggleDarkMode }) => (
  <aside className="w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-100 dark:border-gray-800 h-screen flex flex-col fixed left-0 top-0 z-20 hidden md:flex shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
    <div className="p-8 pb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">P</div>
        <h1 className="text-2xl text-gray-900 dark:text-white tracking-tight">
          <span className="font-extrabold">Pro</span><span className="font-light">Log</span>
        </h1>
      </div>
    </div>
    
    <nav className="flex-1 px-6 space-y-2 mt-8 overflow-y-auto custom-scrollbar">
      <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
      <SidebarItem 
        icon={<LayoutDashboard size={20} />} 
        label="대시보드" 
        active={activePage === 'dashboard'} 
        onClick={() => onNavigate('dashboard')}
      />
      <SidebarItem 
        icon={<Award size={20} />} 
        label="자격증 도감" 
        active={activePage === 'dex'}
        onClick={() => onNavigate('dex')}
      />
      <SidebarItem 
        icon={<TrendingUp size={20} />} 
        label="타임라인" 
        active={activePage === 'timeline'}
        onClick={() => onNavigate('timeline')}
      />
      <SidebarItem 
        icon={<PieChart size={20} />} 
        label="통계" 
        active={activePage === 'stats'}
        onClick={() => onNavigate('stats')}
      />
      <SidebarItem 
        icon={<History size={20} />} 
        label="히스토리" 
        active={activePage === 'history'}
        onClick={() => onNavigate('history')}
      />
    </nav>
    
    <div className="p-6 space-y-4">
      <button 
        onClick={toggleDarkMode}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm font-bold">테마 변경</span>
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 ring-2 ring-white group-hover:ring-primary/20 transition-all"></div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">사용자 이름</p>
          <p className="text-xs text-gray-500 truncate">대학생</p>
        </div>
        <Settings size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>
    </div>
  </aside>
);

const BottomNav = ({ activePage, onNavigate }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800 flex justify-around p-2 pb-safe z-50 md:hidden shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
    <button 
      onClick={() => onNavigate('dashboard')}
      className={cn(
        "flex flex-col items-center gap-1 p-3 rounded-2xl min-w-[64px] transition-all duration-200 active:scale-95",
        activePage === 'dashboard' ? "text-primary dark:text-accent bg-primary/5 dark:bg-primary/10" : "text-gray-400 dark:text-gray-500"
      )}
    >
      <LayoutDashboard size={24} className={activePage === 'dashboard' ? "fill-primary/20" : ""} />
      <span className="text-[10px] font-bold">홈</span>
    </button>
    <button 
      onClick={() => onNavigate('dex')}
      className={cn(
        "flex flex-col items-center gap-1 p-3 rounded-2xl min-w-[64px] transition-all duration-200 active:scale-95",
        activePage === 'dex' ? "text-primary dark:text-accent bg-primary/5 dark:bg-primary/10" : "text-gray-400 dark:text-gray-500"
      )}
    >
      <Award size={24} />
      <span className="text-[10px] font-medium">도감</span>
    </button>
    <button 
      onClick={() => onNavigate('timeline')}
      className={cn(
        "flex flex-col items-center gap-1 p-3 rounded-2xl min-w-[64px] transition-all duration-200 active:scale-95",
        activePage === 'timeline' ? "text-primary dark:text-accent bg-primary/5 dark:bg-primary/10" : "text-gray-400 dark:text-gray-500"
      )}
    >
      <TrendingUp size={24} />
      <span className="text-[10px] font-medium">타임라인</span>
    </button>
    <button 
      onClick={() => onNavigate('stats')}
      className={cn(
        "flex flex-col items-center gap-1 p-3 rounded-2xl min-w-[64px] transition-all duration-200 active:scale-95",
        activePage === 'stats' ? "text-primary dark:text-accent bg-primary/5 dark:bg-primary/10" : "text-gray-400 dark:text-gray-500"
      )}
    >
      <PieChart size={24} />
      <span className="text-[10px] font-medium">통계</span>
    </button>
    <button 
      onClick={() => onNavigate('history')}
      className={cn(
        "flex flex-col items-center gap-1 p-3 rounded-2xl min-w-[64px] transition-all duration-200 active:scale-95",
        activePage === 'history' ? "text-primary dark:text-accent bg-primary/5 dark:bg-primary/10" : "text-gray-400 dark:text-gray-500"
      )}
    >
      <History size={24} />
      <span className="text-[10px] font-medium">기록</span>
    </button>
  </nav>
);

const Badge = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm whitespace-nowrap">
    <span className="text-primary dark:text-accent">{icon}</span>
    <span>{label}</span>
  </div>
);

const PersonaCard = ({ persona, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempPersona, setTempPersona] = useState(persona);

  const handleSave = () => {
    onUpdate(tempPersona);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempPersona(persona);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg shadow-gray-100 dark:shadow-black/20 border border-primary/20 dark:border-primary/40 mb-8 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 ring-2 ring-primary/5">
        <div className="flex justify-between items-center mb-2">
           <h2 className="text-lg font-bold text-gray-900 dark:text-white">페르소나 수정</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">대학교</label>
            <input 
              type="text" 
              value={tempPersona.university} 
              onChange={(e) => setTempPersona({...tempPersona, university: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium focus:bg-white dark:focus:bg-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white"
            />
          </div>
          <div>
             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">전공</label>
            <input 
              type="text" 
              value={tempPersona.major} 
              onChange={(e) => setTempPersona({...tempPersona, major: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium focus:bg-white dark:focus:bg-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white"
            />
          </div>
          <div>
             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">희망 직무</label>
            <input 
              type="text" 
              value={tempPersona.jobGoal} 
              onChange={(e) => setTempPersona({...tempPersona, jobGoal: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium focus:bg-white dark:focus:bg-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
          <button onClick={handleCancel} className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">취소</button>
          <button onClick={handleSave} className="px-5 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-blue-600 shadow-md shadow-blue-200 dark:shadow-black/20 transition-all active:scale-95">저장 완료</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-10 flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:shadow-md transition-all duration-300">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          나의 페르소나
          <button 
            onClick={() => setIsEditing(true)} 
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-accent hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
          >
            <Pencil size={16} />
          </button>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">AI가 이 정보를 바탕으로 맞춤형 콘텐츠를 생성합니다.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge icon={<BookOpen size={16} />} label={persona.university} />
        <Badge icon={<Award size={16} />} label={persona.major} />
        <Badge icon={<Target size={16} />} label={persona.jobGoal} />
      </div>
    </div>
  );
};

const CardPreview = ({ image, categoryLabel, date, text, persona, onDownload }) => {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
        download(dataUrl, `prolog-card-${Date.now()}.png`);
        onDownload();
      } catch (err) {
        console.error('Error generating image:', err);
        alert('이미지 저장 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Capture Area */}
      <div 
        ref={cardRef}
        className="relative w-full aspect-square max-w-[400px] bg-gray-900 rounded-none overflow-hidden shadow-2xl flex flex-col justify-end group select-none"
      >
        {/* Background Image */}
        {image && (
          <img 
            src={image} 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 p-8 text-white space-y-4">
          <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-bold tracking-wider uppercase">
                {categoryLabel}
              </span>
              <span className="text-[10px] font-medium opacity-80 tracking-widest uppercase">
                {date}
              </span>
            </div>
            <div className="flex items-center gap-1 opacity-80">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xs font-bold tracking-tighter">ProLog</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-bold leading-relaxed line-clamp-3 text-shadow-sm">
              {text.split('\n')[0].replace(/(\[.*?\])/g, '').trim()} {/* Taking first line as title-ish */}
            </p>
            <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed font-light">
               {text.replace(text.split('\n')[0], '').trim()}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between text-[10px] text-gray-400 font-medium tracking-wide">
             <div className="flex gap-2">
               <span>{persona.university}</span>
               <span>•</span>
               <span>{persona.major}</span>
             </div>
             <div>@{persona.jobGoal}</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={handleDownload}
        className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95 font-bold"
      >
        <Download size={18} />
        이미지로 저장하기
      </button>
      <p className="text-xs text-gray-400">인스타그램(1:1) 사이즈에 최적화되어 있습니다.</p>
    </div>
  );
};

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

const StatsView = ({ history, categories, platforms }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
        <PieChart size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">분석할 데이터가 없습니다.</p>
        <p className="text-sm">기록을 쌓으면 통계를 확인하실 수 있습니다.</p>
      </div>
    );
  }

  // 1. Calculate Category Counts
  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: history.filter(item => item.category === cat.id).length
  }));
  
  const totalCount = history.length;

  // 2. Calculate Platform Counts
  const platformCounts = platforms.map(p => ({
    ...p,
    count: history.filter(item => item.platform === p.id).length
  }));

  // 3. Find most active month (simple implementation)
  const monthCounts = history.reduce((acc, item) => {
    const month = item.date.substring(0, 7); 
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  
  const bestMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0] || ['-', 0];


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">총 기록 수</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalCount}개</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-accent rounded-full flex items-center justify-center">
            <FileText size={24} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">최다 기록 유형</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {categoryCounts.sort((a, b) => b.count - a.count)[0].label}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
            <Target size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">가장 열정적인 달</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{bestMonth[0]}</p>
          </div>
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center">
            <Sparkles size={24} />
          </div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category Breakdown (Bar Chart representation) */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <PieChart size={20} className="text-primary dark:text-accent" />
            활동 유형 분석
          </h3>
          <div className="space-y-4">
            {categoryCounts.map((cat) => {
              const percentage = Math.round((cat.count / totalCount) * 100) || 0;
              return (
                <div key={cat.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      {cat.icon} {cat.label}
                    </span>
                    <span className="text-gray-500 dark:text-gray-500">{cat.count}회 ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-primary dark:bg-accent h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center">
             💡 팁: 다양한 활동을 골고루 경험하여 육각형 인재로 거듭나세요!
          </p>
        </div>

        {/* Platform Breakdown & Insights */}
        <div className="space-y-6">
           {/* Platform Usage */}
           <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">플랫폼 활용도</h3>
              <div className="flex justify-around items-end h-32 mb-2">
                 {platformCounts.map((p) => {
                   const height = p.count > 0 ? (p.count / totalCount) * 100 : 5; // min height 5%
                   return (
                     <div key={p.id} className="flex flex-col items-center gap-2 w-1/3 group">
                        <div className="text-xs font-bold text-primary dark:text-accent opacity-0 group-hover:opacity-100 transition-opacity mb-1">{p.count}회</div>
                        <div 
                          className="w-12 bg-blue-100 dark:bg-blue-900/40 rounded-t-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors relative"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium flex flex-col items-center gap-1">
                          {p.icon}
                          <span className="text-xs">{p.label}</span>
                        </div>
                     </div>
                   );
                 })}
              </div>
           </div>

           {/* Simple Insight Text */}
           <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
             <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">🚀 성장 리포트</h4>
             <p className="text-sm text-indigo-700 dark:text-indigo-400 leading-relaxed">
               사용자님은 현재 <strong>{categoryCounts.sort((a,b)=>b.count-a.count)[0].label}</strong> 관련 활동에 강점이 있으시네요. 
               {totalCount < 5 ? ' 아직 초기 단계지만 꾸준히 기록하면 멋진 포트폴리오가 될 거예요!' : ' 꾸준한 기록이 돋보입니다! 이제 다른 분야의 경험도 넓혀보시는 건 어떨까요?'}
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};

const HistoryView = ({ history, onDelete, platforms }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400 dark:text-gray-600">
        <History size={48} className="mb-6 opacity-20" />
        <p className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">아직 기록이 없어요</p>
        <p className="text-sm dark:text-gray-500">첫 번째 기록을 생성해보세요!</p>
      </div>
    );
  }

  const getPlatformInfo = (platformId) => {
    return platforms.find(p => p.id === platformId) || { label: '알 수 없음', icon: <FileText size={16} /> };
  };

  return (
    <>
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item) => {
          const platform = getPlatformInfo(item.platform);
          return (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary dark:group-hover:bg-accent group-hover:text-white dark:group-hover:text-gray-900 transition-colors">
                    {platform.icon}
                  </span>
                  <div className="flex flex-col">
                     <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">{platform.label}</span>
                     <span className="text-xs font-bold text-gray-900 dark:text-white">{item.categoryLabel}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-4 whitespace-pre-wrap mb-6 leading-relaxed flex-1">
                {item.text}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium">
                  <Calendar size={12} />
                  {item.date}
                </div>
                <span className="text-xs font-bold text-primary dark:text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  자세히 보기 <Sparkles size={10} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedItem(null)}>
          <div 
            className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    {getPlatformInfo(selectedItem.platform).icon}
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{getPlatformInfo(selectedItem.platform).label}</span>
                 </div>
                 <span className="text-gray-300 dark:text-gray-700">|</span>
                 <span className="text-sm font-bold text-primary dark:text-accent">{selectedItem.categoryLabel}</span>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 dark:text-gray-200 leading-8 whitespace-pre-wrap font-medium">
                {selectedItem.text}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 flex justify-end gap-3">
              <button 
                onClick={() => {
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    onDelete(selectedItem.id);
                    setSelectedItem(null);
                  }
                }}
                className="flex items-center gap-2 px-5 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold text-sm"
              >
                <Trash2 size={18} />
                삭제
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(selectedItem.text);
                  alert('복사되었습니다!');
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-all shadow-lg shadow-gray-200 dark:shadow-black/20 font-bold text-sm active:scale-95"
              >
                <Copy size={18} />
                전체 복사
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('instagram');
  const [category, setCategory] = useState('award'); 
  const [tone, setTone] = useState('emotional');
  const [keywords, setKeywords] = useState('');
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
  const [genStatus, setGenStatus] = useState('idle'); // idle, generating, success
  const [resultMode, setResultMode] = useState('text'); // text, card
  const [resultText, setResultText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResizer, setShowResizer] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [persona, setPersona] = useState({
    university: '서울대학교',
    major: '컴퓨터공학',
    jobGoal: '서비스 기획자'
  });
  
  // Initialize certificates from data file
  const [certificates, setCertificates] = useState(() => {
    // 1. Load all certificates with default 'locked' status
    const initialCerts = ALL_CERTIFICATES.map(cert => ({
      ...cert,
      status: 'locked',
      icon: getCertIcon(cert)
    }));

    // 2. Mock: Set some as 'acquired' or 'pending' for demo purposes
    const demoAcquiredIds = ['tech_001', 'tech_008', 'tech_501']; // 정보처리기사, 컴활1급, 한식조리
    const demoPendingIds = ['tech_101', 'spec_009']; // 전기기사, 공인중개사

    return initialCerts.map(cert => {
      if (demoAcquiredIds.includes(cert.id)) return { ...cert, status: 'acquired' };
      if (demoPendingIds.includes(cert.id)) return { ...cert, status: 'pending' };
      return cert;
    });
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('prolog_dark_mode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('prolog_dark_mode', darkMode);
  }, [darkMode]);

  const handleSaveToHistory = () => {
    if (!resultText) return;
    
    const newItem = {
      id: Date.now(),
      text: resultText,
      category: category,
      categoryLabel: categories.find(c => c.id === category)?.label,
      date: new Date().toLocaleDateString(),
      platform: activeTab
    };
    
    setHistory([newItem, ...history]);
    alert('히스토리에 저장되었습니다!');
  };

  const handleDeleteHistory = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setHistory(history.filter(item => item.id !== id));
    }
  };

  const platforms = [
    { id: 'instagram', label: '인스타그램', icon: <Instagram size={18} /> },
    { id: 'blog', label: '블로그', icon: <FileText size={18} /> },
    { id: 'linkedin', label: '링크드인', icon: <Linkedin size={18} /> },
  ];

  const categories = [
    { id: 'award', label: '수상/상장', icon: <Award size={18} /> },
    { id: 'certificate', label: '자격증', icon: <ScrollText size={18} /> },
    { id: 'activity', label: '대외활동', icon: <Camera size={18} /> },
    { id: 'project', label: '인턴/실무', icon: <Briefcase size={18} /> },
  ];

  const tones = [
    { id: 'emotional', label: '감성적인 🌿' },
    { id: 'professional', label: '전문적인 💼' },
    { id: 'witty', label: '유쾌한 ⚡' },
  ];

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setUploadStatus('uploading');
    
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setUploadStatus('success');
      };
      reader.readAsDataURL(file);
    }, 800);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const resetUpload = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
    setUploadStatus('idle');
    setGenStatus('idle');
    setResultText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadClick = () => {
    if (uploadStatus === 'success') return;
    fileInputRef.current?.click();
  };

  const handleGenerate = () => {
    if (uploadStatus !== 'success') return;
    
    setGenStatus('generating');
    setResultText('');
    
    setTimeout(() => {
      setGenStatus('success');
      
      let text = "";
      
      // Mock logic based on Category & Tone
      if (category === 'certificate') {
        // 자격증 모드: 구체적인 정보 포함
        if (tone === 'professional') {
           text = `[자격증 취득 안내]\n\n• 자격명: 정보처리기사\n• 발급기관: 한국산업인력공단\n• 취득일자: 2024.06.15\n\n지난 3개월간 퇴근 후 매일 2시간씩 투자했던 노력이 결실을 맺었습니다. ${persona.university} ${persona.major} 전공생으로서 소프트웨어 공학의 기초를 다시 한번 탄탄히 다질 수 있었습니다. 앞으로 ${persona.jobGoal}로서 더욱 전문성 있게 성장하겠습니다. #자기계발 #정보처리기사 #자격증 #합격`;
        } else {
           text = `드디어 합격했다! 😭\n정보처리기사, 진짜 애증의 자격증...\n\n맨날 떨어질까봐 조마조마했는데 합격 목걸이 걸었습니다. 응원해준 친구들 다 고마워! 오늘 치킨 먹는다.\n\n📅 취득일: 2024.06.15\n📜 발급처: 큐넷\n\n#정처기 #기사자격증 #공부끝 #합격인증 #${persona.major} #${persona.jobGoal}꿈나무`;
        }
      } else if (category === 'award') {
        // 수상 모드: 스토리텔링
        if (tone === 'emotional') text = `밤늦게까지 이어진 해커톤, 몸은 힘들었지만 마음은 그 어느 때보다 뜨거웠다. 🔥\n함께해 준 팀원들이 있었기에 가능했던 대상 수상. \n이 트로피보다 빛나는 건 우리가 함께한 시간들이다.\n\n#새벽감성 #성장기록 #해커톤 #팀워크 #${persona.university}`;
        else text = `[2024 데이터 사이언스 해커톤 대상 수상]\n\n치열했던 48시간의 해커톤 여정이 '대상'이라는 값진 결과로 마무리되었습니다. 데이터 전처리의 난관을 팀원들과의 협업으로 극복하며, 문제 해결의 본질을 배울 수 있었습니다. ${persona.jobGoal}로 나아가는 큰 발판이 되리라 확신합니다.`;
      } else if (category === 'activity') {
        // 활동 모드: 현장감
        text = `GDG DevFest 2024 현장 스케치 📸\n\n수많은 개발자들의 열기로 가득했던 코엑스! \n특히 'AI 에이전트의 미래' 세션에서 많은 영감을 받았습니다. \n\n✔️ Key Takeaways:\n1. LLM은 도구일 뿐, 핵심은 기획이다.\n2. 프롬프트 엔지니어링의 중요성\n3. 커뮤니티의 힘\n\n좋은 에너지 잔뜩 받아갑니다! #DevFest #개발자컨퍼런스 #네트워킹 #성장 #${persona.major}`;
      } else {
        // 실무 모드
        text = `[인턴십 중간 회고]\n\n어느덧 서비스 기획팀 인턴 2개월 차입니다. \n${persona.university}에서는 배울 수 없었던 '실제 유저 데이터'를 다루며 매일 깨지고 배우는 중입니다. \n사수님의 꼼꼼한 피드백 덕분에 기획서 퀄리티가 조금씩 나아지는 게 느껴져 뿌듯하네요. 남은 1개월도 후회 없이 달리겠습니다! 🏃‍♂️`;
      }
      
      if (keywords) {
        text += `\n\n(✨ Key Point: ${keywords})`;
      }

      setResultText(text);
    }, 2000);
  };

  const copyToClipboard = () => {

    navigator.clipboard.writeText(resultText);
    alert('클립보드에 복사되었습니다!');
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950 selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage} 
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      <main className="md:ml-72 p-6 md:p-12 pb-28 md:pb-12 max-w-7xl mx-auto flex-1">
        {/* Header */}
        <header className="mb-10 flex justify-between items-end animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
              {activePage === 'dashboard' && '안녕하세요, 사용자님! 👋'}
              {activePage === 'dex' && '나의 자격증 도감 🏆'}
              {activePage === 'timeline' && '성장 타임라인 📅'}
              {activePage === 'stats' && '활동 통계 📊'}
              {activePage === 'history' && '히스토리 🕒'}
              {activePage === 'settings' && '설정 ⚙️'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg font-medium leading-relaxed max-w-2xl">
              {activePage === 'dashboard' && '오늘의 성취를 기록하고, 나만의 커리어 스토리를 완성하세요.'}
              {activePage === 'dex' && '보유한 자격증을 인증하고 도감을 완성해보세요.'}
              {activePage === 'timeline' && '시간의 흐름에 따른 당신의 눈부신 성취를 확인하세요.'}
              {activePage === 'stats' && '데이터로 보는 나의 커리어 강점과 활동 패턴입니다.'}
              {activePage === 'history' && '차곡차곡 쌓인 당신의 모든 기록을 한눈에.'}
              {activePage === 'settings' && '계정 및 알림 설정을 관리하세요.'}
            </p>
          </div>
          {/* Mobile Logo & Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
             <button 
               onClick={() => setDarkMode(!darkMode)}
               className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400"
             >
               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200">P</div>
          </div>
        </header>

        {activePage === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <PersonaCard persona={persona} onUpdate={setPersona} />

            {/* Intro / Content Section */}
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl mb-10 border border-blue-100/50 dark:border-blue-800/30 backdrop-blur-sm relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <Sparkles size={18} className="text-primary dark:text-accent" />
                    ProLog 사용 꿀팁
                 </h2>
                 <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                   사진 한 장만 올려보세요. <strong>ProLog AI</strong>가 상황에 딱 맞는 글을 3초 만에 써드립니다. 
                   <br className="hidden md:block" />자격증, 수상, 인턴십... 어떤 경험이든 멋진 포트폴리오로 만들어드릴게요.
                 </p>
               </div>
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Input (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Input Settings Panel */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                  
                  {/* 1. Category Selector */}
                  <div>
                    <label className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 block flex items-center gap-2">
                       <Target size={16} className="text-gray-400" />
                       기록 유형
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setCategory(c.id)}
                          className={cn(
                            "flex items-center justify-center gap-2 py-3.5 px-3 text-sm font-bold rounded-xl border transition-all duration-200 active:scale-95",
                            category === c.id 
                              ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300"
                          )}
                        >
                          {c.icon}
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Platform Selector */}
                  <div>
                    <label className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 block flex items-center gap-2">
                       <Instagram size={16} className="text-gray-400" />
                       업로드 플랫폼
                    </label>
                    <div className="flex bg-gray-50 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700">
                      {platforms.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveTab(p.id)}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-200",
                            activeTab === p.id 
                              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5" 
                              : "text-gray-400 hover:text-gray-600"
                          )}
                        >
                          <span className={activeTab === p.id ? "text-primary dark:text-accent" : ""}>{p.icon}</span>
                          <span className="hidden sm:inline">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Tone Selector */}
                  <div>
                    <label className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <PenTool size={16} className="text-gray-400" /> 
                      글 분위기 (Tone)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tones.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTone(t.id)}
                          className={cn(
                            "px-4 py-2.5 rounded-full text-sm font-bold border transition-all duration-200 active:scale-95",
                            tone === t.id
                              ? "bg-gray-900 dark:bg-white dark:text-gray-900 text-white border-gray-900 shadow-md"
                              : "bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                          )}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Keywords */}
                  <div>
                    <label className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <Hash size={16} className="text-gray-400" /> 
                      핵심 키워드
                    </label>
                    <input 
                      type="text" 
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="예: 팀워크, 밤샘, 성장, 뿌듯함"
                      className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 dark:text-white font-medium placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Upload Zone */}
                <div className="relative">
                  {showOnboarding && uploadStatus === 'idle' && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-[200px] z-30 animate-bounce">
                      <div className="bg-primary text-white p-3 rounded-2xl shadow-xl text-xs font-bold text-center relative">
                        사진을 먼저 올려보세요! ✨
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45"></div>
                      </div>
                    </div>
                  )}
                  <div 
                    onClick={() => {
                      handleUploadClick();
                      setShowOnboarding(false);
                    }}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    className={cn(
                      "group relative border-2 border-dashed rounded-3xl h-64 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer overflow-hidden duration-300",
                      uploadStatus === 'idle' ? "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/5" : 
                      uploadStatus === 'uploading' ? "border-primary bg-primary/5 dark:bg-primary/10" : 
                      "border-green-500 bg-white dark:bg-gray-900"
                    )}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={(e) => handleFile(e.target.files[0])} 
                      className="hidden" 
                      accept="image/*"
                    />

                    {uploadStatus === 'idle' && (
                      <div className="transition-transform duration-300 group-hover:-translate-y-2">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-accent rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-sm">
                          <UploadCloud size={32} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">증빙 자료 업로드</h3>
                        <p className="text-gray-400 text-sm">또는 파일을 여기로 드래그하세요</p>
                      </div>
                    )}

                    {uploadStatus === 'uploading' && (
                      <div className="flex flex-col items-center animate-pulse">
                        <Loader2 size={40} className="text-primary animate-spin mb-4" />
                        <p className="text-gray-900 dark:text-white font-bold text-lg">이미지 분석 중...</p>
                        <p className="text-gray-500 text-sm">잠시만 기다려주세요</p>
                      </div>
                    )}

                    {uploadStatus === 'success' && selectedImage && (
                      <>
                        <div className="absolute inset-0 w-full h-full">
                          <img src={selectedImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md mb-2">
                                <CheckCircle size={32} className="text-white" />
                            </div>
                            <p className="text-white text-sm font-bold">이미지 변경하기</p>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2 z-20">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowResizer(true);
                            }}
                            className="w-9 h-9 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-primary dark:text-accent rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                            title="이미지 편집 (리사이징)"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            onClick={resetUpload}
                            className="w-9 h-9 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={uploadStatus !== 'success' || genStatus === 'generating'}
                  className={cn(
                    "w-full py-4.5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 relative overflow-hidden",
                    uploadStatus === 'success' && genStatus !== 'generating'
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none"
                  )}
                >
                  {genStatus === 'generating' ? (
                    <>
                      <Loader2 className="animate-spin" />
                      ProLog AI가 글을 쓰는 중...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} className={uploadStatus === 'success' ? "animate-pulse" : ""} />
                      AI 글 생성하기
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Result (7 cols) */}
              <div className="lg:col-span-7 h-full">
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 h-full p-8 md:p-10 relative flex flex-col min-h-[600px] transition-all">
                  
                  {/* Result Header */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl flex items-center gap-2.5">
                        {category === 'certificate' && <ScrollText size={24} className="text-primary dark:text-accent" />}
                        {category === 'award' && <Award size={24} className="text-primary dark:text-accent" />}
                        {category === 'activity' && <Camera size={24} className="text-primary dark:text-accent" />}
                        {category === 'project' && <Briefcase size={24} className="text-primary dark:text-accent" />}
                        생성된 결과
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
                        <strong>{categories.find(c => c.id === category)?.label}</strong> 유형에 최적화된 콘텐츠입니다.
                      </p>
                    </div>
                    
                    {genStatus === 'success' && (
                      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        <button 
                          onClick={() => setResultMode('text')}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                            resultMode === 'text' ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
                          )}
                        >
                          <FileText size={14} />
                          글
                        </button>
                        <button 
                          onClick={() => setResultMode('card')}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                            resultMode === 'card' ? "bg-white dark:bg-gray-700 text-primary dark:text-accent shadow-sm" : "text-gray-400 hover:text-gray-600"
                          )}
                        >
                          <ImageIcon size={14} />
                          카드
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Result Content */}
                  <div className="flex-1 relative">
                    {genStatus === 'idle' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 dark:text-gray-700">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-6 rotate-3">
                          <PenTool size={40} className="text-gray-300 dark:text-gray-700" />
                        </div>
                        <p className="text-lg font-bold text-gray-400 dark:text-gray-600 text-center">왼쪽에서 자료를 업로드하면<br/>여기에 글이 작성됩니다.</p>
                      </div>
                    )}

                    {genStatus === 'generating' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 px-8">
                        <div className="w-full space-y-5">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-1/3"></div>
                           </div>
                          <div className="space-y-3">
                             <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-full"></div>
                             <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-full"></div>
                             <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-5/6"></div>
                          </div>
                          <div className="space-y-3 pt-4">
                             <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-full"></div>
                             <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-4/5"></div>
                          </div>
                        </div>
                        <p className="text-primary dark:text-accent animate-pulse font-bold text-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm">
                           ✨ 마법을 부리는 중...
                        </p>
                      </div>
                    )}

                    {genStatus === 'success' && (
                      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col">
                        {resultMode === 'text' ? (
                          <textarea 
                            readOnly
                            className="w-full flex-1 resize-none focus:outline-none text-gray-800 dark:text-gray-200 leading-[1.8] text-lg bg-transparent p-2 whitespace-pre-wrap font-medium custom-scrollbar"
                            value={resultText}
                          />
                        ) : (
                          <div className="flex-1 flex items-center justify-center py-4">
                            <CardPreview 
                              image={selectedImage}
                              categoryLabel={categories.find(c => c.id === category)?.label}
                              date={new Date().toLocaleDateString()}
                              text={resultText}
                              persona={persona}
                              onDownload={() => {}}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Result Footer */}
                  {genStatus === 'success' && resultMode === 'text' && (
                    <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center mt-auto gap-4 animate-in fade-in">
                      <p className="text-xs text-gray-400 font-medium">AI 생성 결과는 사실 여부를 꼭 확인해주세요.</p>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button 
                          onClick={copyToClipboard}
                          className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
                        >
                          복사
                        </button>
                        <button 
                          onClick={handleGenerate}
                          className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
                        >
                          다시 생성
                        </button>
                        <button 
                          onClick={handleSaveToHistory}
                          className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-gray-200 dark:shadow-black/20 active:scale-95"
                        >
                          저장하기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        )}

        {activePage === 'dex' && (
          <DexView 
            certificates={certificates} 
            onCertClick={(cert) => {
              if (cert.status === 'locked') {
                if (window.confirm(`${cert.name} 자격증을 인증하시겠습니까? (증빙 서류 업로드)`)) {
                   // Mock process
                   const newCerts = certificates.map(c => 
                     c.id === cert.id ? { ...c, status: 'pending' } : c
                   );
                   setCertificates(newCerts);
                   alert('인증 요청이 접수되었습니다! (관리자 승인 대기 중)');
                }
              }
            }} 
          />
        )}

        {activePage === 'timeline' && (
          <TimelineView history={history} categories={categories} />
        )}

        {activePage === 'stats' && (
          <StatsView history={history} categories={categories} platforms={platforms} />
        )}

        {activePage === 'history' && (
          <HistoryView history={history} onDelete={handleDeleteHistory} platforms={platforms} />
        )}

        {activePage === 'settings' && (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-80 text-gray-400">
             <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Settings size={40} className="opacity-20" />
             </div>
             <p className="text-lg font-bold">설정 페이지 준비 중입니다.</p>
             <p className="text-sm mt-2">곧 프로필 수정 기능을 만나보실 수 있어요.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-200 text-center text-gray-400 text-sm pb-10">
          <p className="mb-3 font-medium">&copy; 2026 ProLog. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="/privacy.html" target="_blank" className="hover:text-gray-900 transition-colors font-medium">개인정보처리방침</a>
            <span className="text-gray-300">|</span>
            <a href="/terms.html" target="_blank" className="hover:text-gray-900 transition-colors font-medium">이용약관</a>
          </div>
        </footer>
      </main>

      {showResizer && (
        <ImageResizer 
          imageSrc={selectedImage}
          onSave={(newImage) => {
            setSelectedImage(newImage);
            setShowResizer(false);
          }}
          onCancel={() => setShowResizer(false)}
        />
      )}

      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

export default App;
