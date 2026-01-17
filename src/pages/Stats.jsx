import React from 'react';
import { FileText, Target, Sparkles, PieChart } from 'lucide-react';
import Seo from '../components/Seo.jsx';

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

export default function Stats({ history, categories, platforms }) {
    return (
        <>
            <Seo
                title="통계 - ProLog"
                description="데이터로 보는 나의 커리어 강점과 활동 패턴입니다."
            />
            <StatsView history={history} categories={categories} platforms={platforms} />
        </>
    );
}
