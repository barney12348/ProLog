import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Check, 
  Square, 
  Smartphone, 
  Monitor, 
  Layout, 
  Maximize2,
  Image as ImageIcon,
  Columns
} from 'lucide-react';

const ASPECT_RATIOS = [
  { id: 'original', label: 'Original', ratio: null, icon: <ImageIcon size={18} /> },
  { id: 'square', label: 'Square', ratio: 1, icon: <Square size={18} /> },
  { id: 'portrait', label: 'Portrait', ratio: 4/5, icon: <Layout size={18} /> }, // 4:5 (Instagram)
  { id: 'landscape', label: 'Landscape', ratio: 1.91/1, icon: <Monitor size={18} /> }, // 1.91:1
  { id: 'story', label: 'Story', ratio: 9/16, icon: <Smartphone size={18} /> }, // 9:16
  { id: 'cinema', label: '16:9', ratio: 16/9, icon: <Maximize2 size={18} /> },
];

const BACKGROUND_COLORS = [
  '#ffffff', // White
  '#000000', // Black
  '#f3f4f6', // Gray-100
  '#fee2e2', // Red-100
  '#dbeafe', // Blue-100
  '#d1fae5', // Green-100
  '#fef3c7', // Yellow-100
];

const ImageResizer = ({ imageSrc, onSave, onCancel }) => {
  const [selectedRatio, setSelectedRatio] = useState('square');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [padding, setPadding] = useState(0); // For "border" effect
  const canvasRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Draw the image onto the canvas whenever dependencies change
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // 1. Determine Target Dimensions
      let targetWidth, targetHeight;
      const originalRatio = img.width / img.height;
      const targetRatioValue = ASPECT_RATIOS.find(r => r.id === selectedRatio)?.ratio || originalRatio;

      // Logic to determine canvas size. 
      // We'll base it on the largest dimension of the original image to maintain quality.
      const maxDim = Math.max(img.width, img.height);
      
      if (targetRatioValue >= 1) {
        // Landscape or Square target
        targetWidth = maxDim;
        targetHeight = maxDim / targetRatioValue;
      } else {
        // Portrait target
        targetHeight = maxDim;
        targetWidth = maxDim * targetRatioValue;
      }

      // Set canvas size
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 2. Fill Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Draw Image (Fit Center)
      // Calculate scaled dimensions to fit within canvas minus padding
      const availableWidth = targetWidth - (padding * 2);
      const availableHeight = targetHeight - (padding * 2);

      const scale = Math.min(
        availableWidth / img.width,
        availableHeight / img.height
      );

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const x = (targetWidth - drawWidth) / 2;
      const y = (targetHeight - drawHeight) / 2;

      // Optional: Shadow effect behind image if there's padding/background visible
      if (scale < 1 || padding > 0) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
      }

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
      
      // Reset shadow
      ctx.shadowColor = "transparent";
      
      // Update preview URL for simple display if needed, but we rely on canvas being visible
    };

    img.src = imageSrc;

  }, [imageSrc, selectedRatio, bgColor, padding]);

  const handleSave = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      onSave(dataUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-2xl">
        
        {/* Left: Canvas Preview Area */}
        <div className="flex-1 bg-gray-100 relative flex items-center justify-center p-8 overflow-hidden">
           {/* Checkerboard pattern for transparency indication (though we fill bg) */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" 
                style={{ 
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }}>
           </div>
           
           <div className="relative shadow-2xl shadow-black/20" style={{ maxHeight: '100%', maxWidth: '100%' }}>
              <canvas 
                ref={canvasRef} 
                className="max-w-full max-h-[70vh] object-contain block"
              />
           </div>
        </div>

        {/* Right: Controls */}
        <div className="w-full md:w-96 bg-white border-l border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900">이미지 편집</h3>
            <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* 1. Ratio Selection */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">비율 (Canvas Size)</label>
              <div className="grid grid-cols-3 gap-3">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                      selectedRatio === ratio.id 
                        ? 'bg-primary/5 border-primary text-primary ring-1 ring-primary/20' 
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {ratio.icon}
                    <span className="text-[10px] font-bold">{ratio.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Background Color */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">배경 색상</label>
              <div className="flex flex-wrap gap-3">
                {BACKGROUND_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBgColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${
                      bgColor === color ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* 3. Padding/Border Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">여백 (Padding)</label>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{padding}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-3">
            <button 
              onClick={handleSave}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2 active:scale-95"
            >
              <Check size={18} />
              편집 완료 & 적용
            </button>
            <p className="text-center text-xs text-gray-400">
              이미지가 선택한 비율에 맞춰 자동으로 리사이징됩니다.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImageResizer;
