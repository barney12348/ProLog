import React from 'react';
import { Award, Star, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/Seo.jsx';


const MyPageView = ({ certificates, wishlist, onNavigate }) => {

    const acquiredCertificates = certificates.filter(c => c.status === 'acquired');
  
    const wishlistedCertificates = certificates.filter(c => wishlist.includes(c.id));

    const navigate = useNavigate();
  
    return (
  
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
  
        <div className="md:hidden">
  
          <button 
  
            onClick={() => navigate('/settings')}
  
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  
          >
  
            <span className="text-sm font-bold">설정</span>
  
            <Settings size={18} />
  
          </button>
  
        </div>
  
        {/* Acquired Certificates */}
  
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
  
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
  
            <Award size={20} className="text-primary dark:text-accent" />
  
            보유 자격증
  
          </h3>
  
          {acquiredCertificates.length > 0 ? (
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
              {acquiredCertificates.map(cert => (
  
                <div key={cert.id} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
  
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 shadow-sm">
  
                    {cert.icon}
  
                  </div>
  
                  <div>
  
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{cert.name}</p>
  
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer}</p>
  
                  </div>
  
                </div>
  
              ))}
  
            </div>
  
          ) : (
  
            <p className="text-gray-500 dark:text-gray-400 text-sm">아직 보유한 자격증이 없습니다.</p>
  
          )}
  
        </div>
  
        {/* Wishlist Certificates */}
  
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
  
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
  
            <Star size={20} className="text-yellow-400 dark:text-yellow-500" />
  
            목표 자격증
  
          </h3>
  
          {wishlistedCertificates.length > 0 ? (
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
              {wishlistedCertificates.map(cert => (
  
                <div key={cert.id} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
  
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 shadow-sm">
  
                    {cert.icon}
  
                  </div>
  
                  <div>
  
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{cert.name}</p>
  
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer}</p>
  
                  </div>
  
                </div>
  
              ))}
  
            </div>
  
          ) : (
  
            <div className="text-center py-8">
  
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">아직 목표로 설정한 자격증이 없습니다.</p>
  
              <button
  
                onClick={() => navigate('/dex')}
  
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
  
              >
  
                도감에서 목표 설정하기
  
              </button>
  
            </div>
  
          )}
  
        </div>
  
      </div>
  
    );
  
  };

export default function MyPage({ certificates, wishlist }) {
    const navigate = useNavigate();
    return (
        <>
            <Seo
                title="마이페이지 - ProLog"
                description="사용자 정보를 확인하고 수정할 수 있습니다."
            />
            <MyPageView certificates={certificates} wishlist={wishlist} onNavigate={(page) => navigate(`/${page}`)} />
        </>
    );
}
