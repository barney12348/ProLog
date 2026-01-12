import React, { useState, useEffect } from 'react';
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
  Hash
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for class merging
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Sidebar = () => (
  <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-10 hidden md:flex">
    <div className="p-6 flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
      <h1 className="text-2xl text-primary tracking-tight">
        <span className="font-bold">Pro</span><span className="font-light">Log</span>
      </h1>
    </div>
    
    <nav className="flex-1 px-4 space-y-2 mt-4">
      <SidebarItem icon={<LayoutDashboard size={20} />} label="대시보드" active />
      <SidebarItem icon={<History size={20} />} label="히스토리" />
      <SidebarItem icon={<Settings size={20} />} label="설정" />
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

const SidebarItem = ({ icon, label, active }) => (
  <button 
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
      active 
        ? "bg-primary/10 text-primary" 
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    )}
  >
    {icon}
    {label}
  </button>
);

const PersonaCard = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">페르소나 설정</h2>
      <p className="text-gray-500 text-sm">AI가 이 프로필을 바탕으로 콘텐츠를 생성합니다.</p>
    </div>
    <div className="flex gap-4">
      <Badge icon={<BookOpen size={14} />} label="서울대학교" />
      <Badge icon={<Award size={14} />} label="컴퓨터공학" />
      <Badge icon={<Target size={14} />} label="서비스 기획자" />
    </div>
  </div>
);

const Badge = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-primary text-sm font-medium rounded-full border border-blue-100">
    {icon}
    <span>{label}</span>
  </div>
);

// --- Main App ---

function App() {
  const [activeTab, setActiveTab] = useState('instagram');
  const [tone, setTone] = useState('emotional'); // emotional, professional, witty
  const [keywords, setKeywords] = useState('');
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
  const [genStatus, setGenStatus] = useState('idle'); // idle, generating, success
  const [resultText, setResultText] = useState('');

  const platforms = [
    { id: 'instagram', label: '인스타그램', icon: <Instagram size={18} /> },
    { id: 'blog', label: '네이버 블로그', icon: <FileText size={18} /> },
    { id: 'linkedin', label: '링크드인', icon: <Linkedin size={18} /> },
  ];

  const tones = [
    { id: 'emotional', label: '감성적인 🌿' },
    { id: 'professional', label: '전문적인 💼' },
    { id: 'witty', label: '유쾌한 ⚡' },
  ];

  const handleUpload = () => {
    if (uploadStatus === 'success') return;
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
    }, 1000);
  };

  const handleGenerate = () => {
    if (uploadStatus !== 'success') return;
    
    setGenStatus('generating');
    setResultText('');
    
    setTimeout(() => {
      setGenStatus('success');
      
      // Mock result logic based on Tone & Platform
      let text = "";
      
      if (activeTab === 'instagram') {
        if (tone === 'emotional') text = "밤늦게까지 이어진 해커톤, 몸은 힘들었지만 마음은 그 어느 때보다 뜨거웠다. 🔥\n함께해 준 팀원들이 있었기에 가능했던 1등. \n이 순간을 잊지 않고 더 성장하고 싶다.\n\n#새벽감성 #성장기록 #해커톤 #팀워크 #대학생활";
        else if (tone === 'professional') text = "[2024 데이터 사이언스 해커톤 대상 수상]\n\n지난 주말, 48시간의 치열한 고민 끝에 대상을 수상했습니다.\n데이터 전처리 과정에서의 난관을 극복하며 실무적인 인사이트를 얻을 수 있었습니다.\n함께 고생한 팀원들에게 감사를 전합니다.\n\n#DataScience #Hackathon #Award #Career";
        else text = "아니 이게 되네? 😲 해커톤 1등 실화입니까?\n진짜 에너지드링크 10캔 마신 보람이 있다 ㅋㅋㅋ\n우리 팀원들 진짜 고생했고 뒷풀이 가자!! 🍖\n\n#해커톤우승 #코딩노예해방 #고기먹자 #개발자일상";
      } else if (activeTab === 'blog') {
        if (tone === 'emotional') text = "문득, 치열했던 지난 주말을 돌아봅니다. 해커톤이라는 도전은 저에게 단순한 수상이 아닌, 한계에 도전하는 과정이었습니다...";
        else if (tone === 'professional') text = "본 포스팅에서는 2024 데이터 사이언스 해커톤에서 대상을 수상한 프로젝트의 기술적 회고를 다룹니다. 특히 시계열 데이터 분석에 사용한 방법론을 중심으로...";
        else text = "여러분! 저 드디어 해냈습니다!! ㅋㅋㅋ 맨날 코딩하느라 밤샌다고 징징거렸는데, 결국 해커톤 1등을 거머쥐었습니다! (박수 짝짝짝)";
      } else {
        text = "2024 데이터 사이언스 해커톤 1위 수상 소식을 공유합니다. \n\n이번 프로젝트를 통해 실제 데이터를 다루는 역량을 키울 수 있었습니다. 앞으로도 데이터 기반의 의사결정을 내리는 PM으로 성장하겠습니다.";
      }
      
      if (keywords) {
        text += `\n\n(추가 키워드 반영: ${keywords})`;
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
      <Sidebar />
      
      <main className="md:ml-64 p-6 md:p-12 max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">안녕하세요, 사용자님! 👋</h1>
          <p className="text-gray-500 text-lg">오늘의 특별한 순간을 기록으로 남겨보세요.</p>
        </header>

        <PersonaCard />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Platform & Tone Selector */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-5">
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

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <PenTool size={16} /> 톤앤매너 (말투)
                </label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                        tone === t.id
                          ? "bg-primary text-white border-primary shadow-md transform scale-105"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

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

            {/* 2. Upload Zone */}
            <div 
              onClick={handleUpload}
              className={cn(
                "group relative border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer overflow-hidden",
                uploadStatus === 'idle' ? "border-gray-300 bg-white hover:border-primary/50 hover:bg-blue-50/30" : 
                uploadStatus === 'uploading' ? "border-primary bg-blue-50/50" : 
                "border-green-500 bg-green-50/50"
              )}
            >
              {uploadStatus === 'idle' && (
                <>
                  <div className="w-14 h-14 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={28} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">사진 업로드</h3>
                  <p className="text-gray-400 mt-1 text-xs">JPG, PNG (최대 10MB)</p>
                </>
              )}

              {uploadStatus === 'uploading' && (
                <div className="flex flex-col items-center animate-pulse">
                  <Loader2 size={32} className="text-primary animate-spin mb-3" />
                  <p className="text-primary font-medium text-sm">업로드 중...</p>
                </div>
              )}

              {uploadStatus === 'success' && (
                <>
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3 animate-bounce">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-base font-semibold text-green-700">업로드 완료!</h3>
                  
                  {/* Fake Image Preview */}
                  <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center" />
                </>
              )}
            </div>

            {/* 3. Generate Button */}
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
                  AI가 글을 쓰는 중...
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
                    생성된 콘텐츠
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {activeTab === 'instagram' && '인스타그램 감성에 맞춘 게시글입니다.'}
                    {activeTab === 'blog' && '블로그 포스팅을 위한 초안입니다.'}
                    {activeTab === 'linkedin' && '비즈니스 네트워크를 위한 글입니다.'}
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
                    <p className="text-lg font-medium text-gray-400">왼쪽에서 사진을 올리고<br/>AI 생성을 시작해보세요.</p>
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
                      {tone === 'emotional' && '감성을 한 스푼 담는 중... 🌿'}
                      {tone === 'professional' && '전문적인 용어를 고르는 중... 💼'}
                      {tone === 'witty' && '재미있는 드립을 생각하는 중... ⚡'}
                    </p>
                  </div>
                )}

                {genStatus === 'success' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                    <textarea 
                      readOnly
                      className="w-full flex-1 resize-none focus:outline-none text-gray-800 leading-8 text-lg bg-transparent p-2"
                      value={resultText}
                    />
                  </div>
                )}
              </div>
              
              {/* Result Footer */}
              {genStatus === 'success' && (
                <div className="pt-6 border-t border-gray-100 flex justify-between items-center mt-auto">
                   <p className="text-xs text-gray-400">AI가 생성한 글은 검토 후 사용하세요.</p>
                   <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">다시 생성</button>
                    <button className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">저장하기</button>
                   </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;
