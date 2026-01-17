import Seo from '../components/Seo.jsx';
import React from 'react';
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
  Moon,
  Star,
  Link,
  Check,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import ImageResizer from '../components/ImageResizer.jsx';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Badge = ({ icon, label }) => (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm whitespace-nowrap">
      <span className="text-primary dark:text-accent">{icon}</span>
      <span>{label}</span>
    </div>
  );
  
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
  
  const CardPreview = ({ image, categoryLabel, date, text, persona, onDownload }) => {
    const cardRef = React.useRef(null);
  
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
              alt={`${categoryLabel}: ${text.substring(0, 50)}`}
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

const RecommendationView = ({ certificates, wishlist, persona, onCertClick }) => {
    const recommendations = React.useMemo(() => {
      const acquiredCerts = certificates.filter(c => c.status === 'acquired');
      const wishlistedCerts = certificates.filter(c => wishlist.includes(c.id));
      
      // 1. Gather user's keywords
      let userKeywords = new Set();
      [...acquiredCerts, ...wishlistedCerts].forEach(c => {
        c.keywords.forEach(k => userKeywords.add(k.toLowerCase()));
      });
      if (persona.major) userKeywords.add(persona.major.toLowerCase());
      if (persona.jobGoal) userKeywords.add(persona.jobGoal.toLowerCase());
  
      if (userKeywords.size === 0) return [];
  
      // 2. Score other certificates
      const recommendations = certificates
        .filter(c => c.status !== 'acquired' && !wishlist.includes(c.id))
        .map(cert => {
          let score = 0;
          cert.keywords.forEach(k => {
            if (userKeywords.has(k.toLowerCase())) {
              score++;
            }
          });
          return { ...cert, score };
        })
        .filter(c => c.score > 0)
        .sort((a, b) => b.score - a.score);
  
      // 3. Return top 3
      return recommendations.slice(0, 3);
    }, [certificates, wishlist, persona]);
  
    if (recommendations.length === 0) {
      return null; // Don't render if there's nothing to recommend
    }
  
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Sparkles size={20} className="text-primary dark:text-accent" />
          맞춤 자격증 추천
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map(cert => (
            <div 
              key={cert.id} 
              onClick={() => onCertClick(cert)}
              className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md cursor-pointer transition-all"
            >
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 shadow-sm text-2xl group-hover:scale-110 transition-transform">
                {cert.icon}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{cert.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default function Dashboard({
  persona,
  setPersona,
  certificates,
  wishlist,
  setSelectedCert,
  activeTab,
  setActiveTab,
  category,
  setCategory,
  tone,
  setTone,
  keywords,
  setKeywords,
  uploadStatus,
  setUploadStatus,
  genStatus,
  setGenStatus,
  resultMode,
  setResultMode,
  resultText,
  setResultText,
  selectedImage,
  setSelectedImage,
  showResizer,
  setShowResizer,
  showOnboarding,
  setShowOnboarding,
  platforms,
  categories,
  tones,
  handleFile,
  handleGenerate,
  handleSaveToHistory,
  copyToClipboard
}) {
    const fileInputRef = React.useRef(null);
  
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
  
    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <Seo
                title="ProLog - AI 커리어 기록 서비스"
                description="ProLog는 대학생과 취업 준비생을 위한 AI 커리어 기록 서비스입니다. 자격증, 수상 경력, 대외활동 사진을 업로드하면 SNS 및 포트폴리오용 텍스트를 자동으로 생성해줍니다."
            />
            <PersonaCard persona={persona} onUpdate={setPersona} editable={false} />
            <RecommendationView
                certificates={certificates}
                wishlist={wishlist}
                persona={persona}
                onCertClick={setSelectedCert}
            />
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
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
                <div className="lg:col-span-7 h-full">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 h-full p-8 md:p-10 relative flex flex-col min-h-[600px] transition-all">
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
                        <div className="flex-1 relative">
                            {genStatus === 'idle' && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 dark:text-gray-700">
                                    <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-6 rotate-3">
                                        <PenTool size={40} className="text-gray-300 dark:text-gray-700" />
                                    </div>
                                    <p className="text-lg font-bold text-gray-400 dark:text-gray-600 text-center">왼쪽에서 자료를 업로드하면<br />여기에 글이 작성됩니다.</p>
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
                                                onDownload={() => { }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
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
    )
}

