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
                onCertClick={onCertClick}
            />
        </>
    );
}
