import React from 'react';
import { Sun, Moon, Settings, Download } from 'lucide-react';
import Seo from '../components/Seo.jsx';


const PersonaCard = ({ persona, onUpdate, editable = true }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [tempPersona, setTempPersona] = React.useState(persona);
  
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
            {editable && (
              <button 
                onClick={() => setIsEditing(true)} 
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-accent hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
              >
                <Pencil size={16} />
              </button>
            )}
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

const SettingsView = ({ persona, onUpdate, darkMode, toggleDarkMode, history, setHistory }) => {

    const handleExportHistory = () => {
  
      if (history.length === 0) {
  
        alert('내보낼 히스토리가 없습니다.');
  
        return;
  
      }
  
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
  
        JSON.stringify(history, null, 2)
  
      )}`;
  
      const link = document.createElement("a");
  
      link.href = jsonString;
  
      link.download = "prolog-history.json";
  
      link.click();
  
    };
  
    const handleDeleteAllHistory = () => {
  
      if (window.confirm('정말 모든 히스토리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
  
        setHistory([]);
  
        alert('모든 히스토리가 삭제되었습니다.');
  
      }
  
    };
  
    return (
  
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
  
        <PersonaCard persona={persona} onUpdate={onUpdate} />
  
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
  
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
  
            <Sun size={20} className="text-primary dark:text-accent" />
  
            화면 설정
  
          </h3>
  
          <button 
  
            onClick={toggleDarkMode}
  
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  
          >
  
            <span className="text-sm font-bold">테마 변경</span>
  
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
  
          </button>
  
        </div>
  
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
  
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
  
            <Settings size={20} className="text-primary dark:text-accent" />
  
            계정 관리
  
          </h3>
  
          <div className="space-y-4">
  
            <button 
  
              onClick={() => {
  
                if (window.confirm('로그아웃 하시겠습니까?')) {
  
                  window.location.reload();
  
                }
  
              }}
  
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  
            >
  
              <span className="text-sm font-bold">로그아웃</span>
  
            </button>
  
            <button 
  
              onClick={() => alert('비밀번호 변경 기능은 현재 준비 중입니다.')}
  
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  
            >
  
              <span className="text-sm font-bold">비밀번호 변경</span>
  
            </button>
  
            <button 
  
              onClick={() => alert('회원 탈퇴 기능은 현재 준비 중입니다.')}
  
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
  
            >
  
              <span className="text-sm font-bold">회원 탈퇴</span>
  
            </button>
  
          </div>
  
        </div>
  
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
  
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
  
            <Download size={20} className="text-primary dark:text-accent" />
  
            데이터 관리
  
          </h3>
  
          <div className="space-y-4">
  
            <button 
  
              onClick={handleExportHistory}
  
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  
            >
  
              <span className="text-sm font-bold">히스토리 내보내기</span>
  
            </button>
  
            <button 
  
              onClick={handleDeleteAllHistory}
  
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
  
            >
  
              <span className="text-sm font-bold">히스토리 전체 삭제</span>
  
            </button>
  
          </div>
  
        </div>
  
      </div>
  
    );
  
  };

export default function SettingsPage({ persona, onUpdate, darkMode, toggleDarkMode, history, setHistory }) {
    return (
        <>
            <Seo
                title="설정 - ProLog"
                description="계정 및 알림 설정을 관리하세요."
            />
            <SettingsView 
                persona={persona}
                onUpdate={onUpdate}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                history={history}
                setHistory={setHistory}
            />
        </>
    );
}
