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
  MapPin
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for class merging
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
      active 
        ? "bg-primary/10 text-primary" 
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    )}
  >
    {icon}
    {label}
  </button>
);

const Sidebar = ({ activePage, onNavigate }) => (
  <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-10 hidden md:flex">
    <div className="p-6 flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
      <h1 className="text-2xl text-primary tracking-tight">
        <span className="font-bold">Pro</span><span className="font-light">Log</span>
      </h1>
    </div>
    
    <nav className="flex-1 px-4 space-y-2 mt-4">
      <SidebarItem 
        icon={<LayoutDashboard size={20} />} 
        label="대시보드" 
        active={activePage === 'dashboard'} 
        onClick={() => onNavigate('dashboard')}
      />
      <SidebarItem 
        icon={<TrendingUp size={20} />} 
        label="타임라인" 
        active={activePage === 'timeline'}
        onClick={() => onNavigate('timeline')}
      />
      <SidebarItem 
        icon={<History size={20} />} 
        label="히스토리" 
        active={activePage === 'history'}
        onClick={() => onNavigate('history')}
      />
      <SidebarItem 
        icon={<Settings size={20} />} 
        label="설정" 
        active={activePage === 'settings'}
        onClick={() => onNavigate('settings')}
      />
    </nav>

    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div>
          <p className="text-sm font-medium text-gray-900">사용자 이름</p>
          <p className="text-xs text-gray-500">대학생</p>
        </div>
      </div>
    </div>
  </aside>
);

const BottomNav = ({ activePage, onNavigate }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-20 md:hidden safe-area-bottom">
    <button 
      onClick={() => onNavigate('dashboard')}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-lg w-full transition-colors",
        activePage === 'dashboard' ? "text-primary" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <LayoutDashboard size={24} />
      <span className="text-[10px] font-medium">대시보드</span>
    </button>
    <button 
      onClick={() => onNavigate('timeline')}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-lg w-full transition-colors",
        activePage === 'timeline' ? "text-primary" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <TrendingUp size={24} />
      <span className="text-[10px] font-medium">타임라인</span>
    </button>
    <button 
      onClick={() => onNavigate('history')}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-lg w-full transition-colors",
        activePage === 'history' ? "text-primary" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <History size={24} />
      <span className="text-[10px] font-medium">히스토리</span>
    </button>
    <button 
      onClick={() => onNavigate('settings')}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-lg w-full transition-colors",
        activePage === 'settings' ? "text-primary" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <Settings size={24} />
      <span className="text-[10px] font-medium">설정</span>
    </button>
  </nav>
);

const Badge = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-primary text-sm font-medium rounded-full border border-blue-100">
    {icon}
    <span>{label}</span>
  </div>
);

const TimelineView = ({ history, categories }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
        <TrendingUp size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">타임라인을 채울 기록이 없습니다.</p>
        <p className="text-sm">성취를 기록하고 나만의 성장 궤적을 확인하세요.</p>
      </div>
    );
  }

  // Sort history by date (newest first) - assuming id or a date string
  const sortedHistory = [...history].sort((a, b) => b.id - a.id);

  return (
    <div className="relative max-w-4xl mx-auto py-10 px-4">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 -translate-x-1/2 hidden md:block"></div>
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 md:hidden"></div>

      <div className="space-y-12">
        {sortedHistory.map((item, index) => {
          const categoryIcon = categories.find(c => c.id === item.category)?.icon || <Sparkles size={16} />;
          const isEven = index % 2 === 0;

          return (
            <div key={item.id} className={cn(
              "relative flex flex-col md:flex-row items-center",
              isEven ? "md:flex-row-reverse" : ""
            )}>
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm -translate-x-1/2 z-10"></div>

              {/* Date Label (Desktop) */}
              <div className={cn(
                "hidden md:block w-1/2 px-12 text-sm font-bold text-primary",
                isEven ? "text-left" : "text-right"
              )}>
                {item.date}
              </div>

              {/* Card */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
                  <div className="md:hidden text-xs font-bold text-primary mb-2 flex items-center gap-1">
                    <Calendar size={12} />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-blue-50 text-primary rounded-lg">
                      {categoryIcon}
                    </div>
                    <span className="text-xs font-semibold text-blue-600">{item.categoryLabel}</span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap line-clamp-3">
                    {item.text}
                  </p>
                  
                  {/* Decorative corner */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary/5 rounded-tr-2xl rounded-bl-3xl -z-10 group-hover:scale-110 transition-transform"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Starting point indicator */}
      <div className="mt-16 text-center">
        <div className="inline-flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <MapPin size={20} />
          </div>
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">커리어 여정 시작</p>
        </div>
      </div>
    </div>
  );
};

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
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-2">
           <h2 className="text-lg font-semibold text-gray-900">페르소나 수정</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">대학교</label>
            <input 
              type="text" 
              value={tempPersona.university} 
              onChange={(e) => setTempPersona({...tempPersona, university: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div>
             <label className="block text-xs font-medium text-gray-500 mb-1">전공</label>
            <input 
              type="text" 
              value={tempPersona.major} 
              onChange={(e) => setTempPersona({...tempPersona, major: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div>
             <label className="block text-xs font-medium text-gray-500 mb-1">희망 직무</label>
            <input 
              type="text" 
              value={tempPersona.jobGoal} 
              onChange={(e) => setTempPersona({...tempPersona, jobGoal: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={handleCancel} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">취소</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90">저장</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:border-primary/30 transition-colors">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
          페르소나 설정
          <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-primary transition-colors">
            <Pencil size={16} />
          </button>
        </h2>
        <p className="text-gray-500 text-sm">AI가 이 프로필을 바탕으로 콘텐츠를 생성합니다.</p>
      </div>
      <div className="flex gap-4">
        <Badge icon={<BookOpen size={14} />} label={persona.university} />
        <Badge icon={<Award size={14} />} label={persona.major} />
        <Badge icon={<Target size={14} />} label={persona.jobGoal} />
      </div>
    </div>
  );
};

const HistoryView = ({ history, onDelete, platforms }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
        <History size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">아직 저장된 기록이 없습니다.</p>
        <p className="text-sm">콘텐츠를 생성하고 '저장하기'를 눌러보세요.</p>
      </div>
    );
  }

  const getPlatformInfo = (platformId) => {
    return platforms.find(p => p.id === platformId) || { label: '알 수 없음', icon: <FileText size={16} /> };
  };

  return (
    <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item) => {
          const platform = getPlatformInfo(item.platform);
          return (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative group hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-medium">
                    {item.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-md">
                    {platform.icon}
                    {platform.label}
                  </span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-gray-800 text-sm line-clamp-4 whitespace-pre-wrap mb-4 leading-relaxed">
                {item.text}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-gray-50 pt-3 mt-auto">
                <Calendar size={12} />
                {item.date}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedItem(null)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
                  {selectedItem.categoryLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold">
                  {getPlatformInfo(selectedItem.platform).icon}
                  {getPlatformInfo(selectedItem.platform).label}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1 ml-2">
                  <Calendar size={14} />
                  {selectedItem.date}
                </span>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto">
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedItem.text}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex justify-end gap-3">
              <button 
                onClick={() => {
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    onDelete(selectedItem.id);
                    setSelectedItem(null);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
              >
                <Trash2 size={16} />
                삭제하기
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(selectedItem.text);
                  alert('복사되었습니다!');
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white hover:bg-gray-800 rounded-xl transition-all shadow-lg shadow-gray-200 font-medium text-sm active:scale-95"
              >
                <Copy size={16} />
                내용 복사
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- Main App ---

function App() {
  const [activePage, setActivePage] = useState('dashboard'); // dashboard, history, settings
  const [activeTab, setActiveTab] = useState('instagram');
  const [category, setCategory] = useState('award'); // award, certificate, activity, project
  const [tone, setTone] = useState('emotional'); // emotional, professional, witty
  const [keywords, setKeywords] = useState('');
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
  const [genStatus, setGenStatus] = useState('idle'); // idle, generating, success
  const [resultText, setResultText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);
  
  const [persona, setPersona] = useState({
    university: '서울대학교',
    major: '컴퓨터공학',
    jobGoal: '서비스 기획자'
  });

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('prolog_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('prolog_history', JSON.stringify(history));
  }, [history]);

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
    { id: 'award', label: '수상/상장', icon: <Award size={16} /> },
    { id: 'certificate', label: '자격증', icon: <ScrollText size={16} /> },
    { id: 'activity', label: '대외활동', icon: <Camera size={16} /> },
    { id: 'project', label: '인턴/실무', icon: <Briefcase size={16} /> },
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
    
    // Simulate upload delay
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
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      
      <main className="md:ml-64 p-6 md:p-12 pb-24 md:pb-12 max-w-6xl mx-auto flex-1">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {activePage === 'dashboard' && '안녕하세요, 사용자님! 👋'}
              {activePage === 'timeline' && '성장 타임라인 📅'}
              {activePage === 'history' && '히스토리 🕒'}
              {activePage === 'settings' && '설정 ⚙️'}
            </h1>
            <p className="text-gray-500 text-sm md:text-lg">
              {activePage === 'dashboard' && '어떤 성취를 기록하고 싶으신가요? ProLog가 당신의 경험을 빛나는 콘텐츠로 만들어드립니다.'}
              {activePage === 'timeline' && '시간의 흐름에 따른 당신의 눈부신 성취를 확인하세요.'}
              {activePage === 'history' && '지금까지 생성한 기록들을 모아보세요.'}
              {activePage === 'settings' && '계정 및 알림 설정을 관리하세요.'}
            </p>
          </div>
          {/* Mobile Logo */}
          <div className="md:hidden">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
          </div>
        </header>

        {activePage === 'dashboard' && (
          <>
            <PersonaCard persona={persona} onUpdate={setPersona} />

            {/* Intro / Content Section for SEO & User Experience */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-8 border border-blue-100">
               <h2 className="text-lg font-bold text-gray-800 mb-2">💡 ProLog 사용 가이드</h2>
               <p className="text-sm text-gray-600 leading-relaxed">
                 <strong>ProLog</strong>는 단순한 기록 도구가 아닙니다. 여러분의 소중한 경험(자격증, 수상, 대외활동, 인턴십)을 증빙하는 사진 한 장만 있으면, 
                 각 플랫폼(인스타그램, 블로그, 링크드인)의 특성에 맞는 <strong>고품질의 퍼스널 브랜딩 원고</strong>를 AI가 자동으로 작성해드립니다. 
                 취업 준비와 자기 브랜딩, 이제 ProLog로 똑똑하게 시작하세요.
               </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Input (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Input Settings Panel */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  
                  {/* 1. Category Selector */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">기록 유형 선택</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setCategory(c.id)}
                          className={cn(
                            "flex items-center justify-center gap-2 py-3 px-2 text-sm font-medium rounded-xl border transition-all",
                            category === c.id 
                              ? "bg-blue-50 border-primary text-primary ring-1 ring-primary" 
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
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
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">업로드할 플랫폼</label>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                      {platforms.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveTab(p.id)}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeTab === p.id 
                              ? "bg-white text-primary shadow-sm ring-1 ring-black/5" 
                              : "text-gray-500 hover:text-gray-900"
                          )}
                        >
                          {p.icon}
                          <span className="hidden sm:inline">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Tone Selector */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <PenTool size={16} /> 톤앤매너
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tones.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTone(t.id)}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                            tone === t.id
                              ? "bg-primary text-white border-primary shadow-md"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Keywords */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Hash size={16} /> 핵심 키워드 (선택)
                    </label>
                    <input 
                      type="text" 
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="예: 팀워크, 밤샘, 성장, 뿌듯함"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Upload Zone */}
                <div 
                  onClick={handleUploadClick}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  className={cn(
                    "group relative border-2 border-dashed rounded-2xl h-56 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer overflow-hidden",
                    uploadStatus === 'idle' ? "border-gray-300 bg-white hover:border-primary/50 hover:bg-blue-50/30" : 
                    uploadStatus === 'uploading' ? "border-primary bg-blue-50/50" : 
                    "border-green-500 bg-green-50/50"
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
                    <>
                      <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">증빙 자료 업로드</h3>
                      <p className="text-gray-400 mt-1 text-xs">이미지를 드래그하거나 클릭하여 선택하세요</p>
                      <p className="text-gray-300 mt-1 text-[10px]">JPG, PNG (최대 10MB)</p>
                    </>
                  )}

                  {uploadStatus === 'uploading' && (
                    <div className="flex flex-col items-center animate-pulse">
                      <Loader2 size={32} className="text-primary animate-spin mb-3" />
                      <p className="text-primary font-medium text-sm">업로드 중...</p>
                    </div>
                  )}

                  {uploadStatus === 'success' && selectedImage && (
                    <>
                      <div className="absolute inset-0 w-full h-full">
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <CheckCircle size={32} className="text-white mb-2" />
                          <p className="text-white text-sm font-bold">변경하려면 클릭</p>
                        </div>
                      </div>
                      <button 
                        onClick={resetUpload}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg z-20 transition-transform hover:scale-110"
                      >
                        <X size={18} />
                      </button>
                    </>
                  )}
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={uploadStatus !== 'success' || genStatus === 'generating'}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95",
                    uploadStatus === 'success' && genStatus !== 'generating'
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  {genStatus === 'generating' ? (
                    <>
                      <Loader2 className="animate-spin" />
                      분석 및 작성 중...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      AI 글 생성하기
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Result (7 cols) */}
              <div className="lg:col-span-7 h-full">
                <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 h-full p-8 relative flex flex-col min-h-[600px]">
                  
                  {/* Result Header */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        {category === 'certificate' && <ScrollText size={20} className="text-primary" />}
                        {category === 'award' && <Award size={20} className="text-primary" />}
                        {category === 'activity' && <Camera size={20} className="text-primary" />}
                        {category === 'project' && <Briefcase size={20} className="text-primary" />}
                        생성된 콘텐츠
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        선택하신 <strong>{categories.find(c => c.id === category)?.label}</strong> 유형에 맞춰 작성되었습니다.
                      </p>
                    </div>
                    
                    {genStatus === 'success' && (
                      <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 font-medium transition-colors border border-gray-200" 
                      >
                        <Copy size={16} />
                        복사하기
                      </button>
                    )}
                  </div>

                  {/* Result Content */}
                  <div className="flex-1 relative">
                    {genStatus === 'idle' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                          <PenTool size={40} className="text-gray-300" />
                        </div>
                        <p className="text-lg font-medium text-gray-400">왼쪽에서 유형을 선택하고<br/>증빙 자료를 업로드하세요.</p>
                      </div>
                    )}

                    {genStatus === 'generating' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                        <div className="w-full max-w-md space-y-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-full"></div>
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6"></div>
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-full"></div>
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-4/5"></div>
                        </div>
                        <p className="text-gray-500 animate-pulse font-medium">
                          {category === 'certificate' && '자격증 번호와 발급 기관을 확인하는 중... 🔍'}
                          {category === 'award' && '수상의 기쁨을 글로 표현하는 중... 🏆'}
                          {category === 'activity' && '현장의 분위기를 담아내는 중... 📸'}
                          {category === 'project' && '실무 경험을 회고하는 중... 💼'}
                        </p>
                      </div>
                    )}

                    {genStatus === 'success' && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                        <textarea 
                          readOnly
                          className="w-full flex-1 resize-none focus:outline-none text-gray-800 leading-8 text-lg bg-transparent p-2 whitespace-pre-wrap"
                          value={resultText}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Result Footer */}
                  {genStatus === 'success' && (
                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center mt-auto">
                      <p className="text-xs text-gray-400">AI 생성 결과는 사실 여부를 확인해주세요.</p>
                      <div className="flex gap-3">
                        <button 
                          onClick={handleGenerate}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          다시 생성
                        </button>
                        <button 
                          onClick={handleSaveToHistory}
                          className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                        >
                          저장하기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          </>
        )}

        {activePage === 'timeline' && (
          <TimelineView history={history} categories={categories} />
        )}

        {activePage === 'history' && (
          <HistoryView history={history} onDelete={handleDeleteHistory} platforms={platforms} />
        )}

        {activePage === 'settings' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64 text-gray-400">
             <Settings size={48} className="mb-4 opacity-20" />
             <p>설정 페이지 준비 중입니다.</p>
          </div>
        )}

        {/* Footer for AdSense Compliance */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm pb-8">
          <p className="mb-2">&copy; 2026 ProLog. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="/privacy.html" target="_blank" className="hover:text-gray-600 transition-colors">개인정보처리방침</a>
            <span>|</span>
            <a href="/terms.html" target="_blank" className="hover:text-gray-600 transition-colors">이용약관</a>
          </div>
        </footer>
      </main>

      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

export default App;