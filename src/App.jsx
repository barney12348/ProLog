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
  Target
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
      <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
      <SidebarItem icon={<History size={20} />} label="History" />
      <SidebarItem icon={<Settings size={20} />} label="Settings" />
    </nav>

    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div>
          <p className="text-sm font-medium text-gray-900">User Name</p>
          <p className="text-xs text-gray-500">Student</p>
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
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Persona Settings</h2>
      <p className="text-gray-500 text-sm">AI adapts content based on this profile.</p>
    </div>
    <div className="flex gap-4">
      <Badge icon={<BookOpen size={14} />} label="Seoul Nat'l Univ." />
      <Badge icon={<Award size={14} />} label="Computer Science" />
      <Badge icon={<Target size={14} />} label="Product Manager" />
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
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
  const [genStatus, setGenStatus] = useState('idle'); // idle, generating, success
  const [resultText, setResultText] = useState('');

  const platforms = [
    { id: 'instagram', label: 'Instagram', icon: <Instagram size={18} /> },
    { id: 'blog', label: 'Naver Blog', icon: <FileText size={18} /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={18} /> },
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
      // Mock result based on tab
      const mocks = {
        instagram: "Finally won the 1st Prize! 🏆 It was a long journey, but every late night was worth it. \n\n#DataAnalysis #ProLog #Growth #UniversityLife #CodingDaily",
        blog: "Today, I want to share my experience participating in the National Data Science Hackathon. It wasn't just about winning; it was about the team synergy and the problem-solving process...\n\n[Read more below]",
        linkedin: "I am thrilled to announce that I have received the 1st Place Award in the 2024 Data Science Hackathon. \n\nThis experience honed my skills in Python and large-scale data processing. I'm grateful for my team's dedication. #DataScience #Achievement #CareerGrowth #Tech"
      };
      setResultText(mocks[activeTab]);
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <Sidebar />
      
      <main className="md:ml-64 p-6 md:p-12 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">안녕하세요, User님! 👋</h1>
          <p className="text-gray-600 text-lg">오늘의 성장을 기록해볼까요?</p>
        </header>

        <PersonaCard />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Input */}
          <div className="space-y-6">
            
            {/* Platform Selector */}
            <div className="bg-white p-1.5 rounded-xl border border-gray-200 flex gap-1 shadow-sm">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                    activeTab === p.id 
                      ? "bg-primary text-white shadow-md" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {p.icon}
                  {p.label}
                </button>
              ))}
            </div>

            {/* Upload Zone */}
            <div 
              onClick={handleUpload}
              className={cn(
                "group relative border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center text-center p-8 transition-all cursor-pointer overflow-hidden",
                uploadStatus === 'idle' ? "border-gray-300 bg-white hover:border-accent hover:bg-blue-50/50" : 
                uploadStatus === 'uploading' ? "border-accent bg-blue-50" : 
                "border-green-500 bg-green-50"
              )}
            >
              {uploadStatus === 'idle' && (
                <>
                  <div className="w-16 h-16 bg-blue-100 text-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Click or Drag Image Here</h3>
                  <p className="text-gray-500 mt-2 text-sm">Supports JPG, PNG (Max 10MB)</p>
                </>
              )}

              {uploadStatus === 'uploading' && (
                <div className="flex flex-col items-center animate-pulse">
                  <Loader2 size={40} className="text-accent animate-spin mb-4" />
                  <p className="text-accent font-medium">Uploading...</p>
                </div>
              )}

              {uploadStatus === 'success' && (
                <>
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-green-700">Upload Successful!</h3>
                  <p className="text-green-600 mt-2 text-sm">Image ready for analysis</p>
                  
                  {/* Fake Image Preview */}
                  <div className="absolute inset-0 -z-10 opacity-10 bg-[url('https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center" />
                </>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={uploadStatus !== 'success' || genStatus === 'generating'}
              className={cn(
                "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg",
                uploadStatus === 'success' && genStatus !== 'generating'
                  ? "bg-accent text-white hover:bg-blue-600 hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {genStatus === 'generating' ? (
                <>
                  <Loader2 className="animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  AI 글 생성하기 (Generate)
                </>
              )}
            </button>
          </div>

          {/* Right Column: Result */}
          <div className="h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full p-6 relative flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  Generated Content
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase">
                    {activeTab}
                  </span>
                </h3>
                {genStatus === 'success' && (
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-primary transition-colors" 
                    title="Copy to clipboard"
                  >
                    <Copy size={18} />
                  </button>
                )}
              </div>

              <div className="flex-1">
                {genStatus === 'idle' && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                    <Sparkles size={48} className="mb-4 text-gray-300" />
                    <p>Upload an image and generate to see results.</p>
                  </div>
                )}

                {genStatus === 'generating' && (
                  <div className="h-full flex flex-col items-center justify-center space-y-4">
                    <div className="w-full max-w-xs space-y-3">
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6"></div>
                    </div>
                    <p className="text-sm text-gray-500 animate-pulse">Drafting the perfect post...</p>
                  </div>
                )}

                {genStatus === 'success' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <textarea 
                      readOnly
                      className="w-full h-[300px] resize-none focus:outline-none text-gray-700 leading-relaxed bg-transparent"
                      value={resultText}
                    />
                  </div>
                )}
              </div>
              
              {genStatus === 'success' && (
                <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                   <button className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">Regenerate</button>
                   <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-blue-900">Save to History</button>
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
