import React from 'react';
import DexView from '../components/DexView.jsx';
import Seo from '../components/Seo.jsx';

export default function Dex({ certificates, wishlist, setWishlist, handleAcquireCert }) {
    return (
        <>
            <Seo
                title="자격증 도감 - ProLog"
                description="내가 보유한 자격증과 목표 자격증을 확인하고 관리해보세요."
            />
            <DexView
                certificates={certificates}
                wishlist={wishlist}
                onToggleWishlist={(id) => {
                    setWishlist(prev =>
                        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
                    );
                }}
                onCertClick={(cert) => {
                    if (cert.status === 'locked') {
                        if (window.confirm(`'${cert.name}' 자격증을 보유 중이신가요? 인증(이미지 업로드)을 시작합니다.`)) {
                            handleAcquireCert(cert.id);
                        }
                    } else if (cert.status === 'acquired') {
                        alert(`이미 획득한 자격증입니다! (${cert.issuer})`);
                    }
                }}
            />
        </>
    );
}
