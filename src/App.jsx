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
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for class merging
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

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

const Badge = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-primary text-sm font-medium rounded-full border border-blue-100">
    {icon}
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

// --- Main App ---

function App() {
  const [activeTab, setActiveTab] = useState('instagram');
  const [category, setCategory] = useState('award'); // award, certificate, activity, project
  const [tone, setTone] = useState('emotional'); // emotional, professional, witty
  const [keywords, setKeywords] = useState('');
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
  const [genStatus, setGenStatus] = useState('idle'); // idle, generating, success
  const [resultText, setResultText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  
  const [persona, setPersona] = useState({
    university: '서울대학교',
    major: '컴퓨터공학',
    jobGoal: '서비스 기획자'
  });

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
      <Sidebar />
      
      <main className="md:ml-64 p-6 md:p-12 max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">안녕하세요, 사용자님! 👋</h1>
          <p className="text-gray-500 text-lg">어떤 성취를 기록하고 싶으신가요?</p>
        </header>

        <PersonaCard persona={persona} onUpdate={setPersona} />

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