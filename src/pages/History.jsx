import React from 'react';
import { History, Trash2, Copy, X, FileText, Sparkles, Calendar } from 'lucide-react';
import Seo from '../components/Seo.jsx';

const HistoryView = ({ history, onDelete, platforms }) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
  
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
  

export default function HistoryPage({ history, onDelete, platforms }) {
    return (
        <>
            <Seo
                title="히스토리 - ProLog"
                description="차곡차곡 쌓인 당신의 모든 기록을 한눈에."
            />
            <HistoryView history={history} onDelete={onDelete} platforms={platforms} />
        </>
    );
}
