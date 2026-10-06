import React, { useRef, useEffect, useState } from 'react';
import { RotateCw, Eye, Layers, Sparkles, Box, RefreshCw } from 'lucide-react';

export const Hero3DValve: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotationY, setRotationY] = useState(0.4);
  const [rotationX, setRotationX] = useState(0.2);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [materialMode, setMaterialMode] = useState<'wcb' | 'ss316' | 'brass' | 'wireframe'>('ss316');
  const [explodedView, setExplodedView] = useState(false);

  // Animation Loop for 3D Render Canvas
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentRotY = rotationY;

    const render = () => {
      if (autoRotate && !isDragging) {
        currentRotY += 0.008;
        setRotationY(currentRotY);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // Pipeline Liquid Flow Glow Background
      const bgGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 260);
      bgGrad.addColorStop(0, 'rgba(30, 58, 138, 0.35)');
      bgGrad.addColorStop(0.6, 'rgba(15, 23, 42, 0.95)');
      bgGrad.addColorStop(1, 'rgba(6, 13, 26, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Grid / Flow Lines
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.12)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3D Projection Helpers
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        let rx = x * cosY - z * sinY;
        let rz = x * sinY + z * cosY;
        // Rotate X
        let ry = y * cosX - rz * sinX;
        rz = y * sinX + rz * cosX;

        const scale = 360 / (360 + rz);
        return {
          x: cx + rx * scale,
          y: cy + ry * scale,
          scale,
          rz
        };
      };

      // Material Color Profiles
      let mainColor = '#94A3B8'; // Steel
      let highlightColor = '#E2E8F0';
      let strokeColor = '#334155';
      let glowColor = 'rgba(59, 130, 246, 0.4)';

      if (materialMode === 'wcb') {
        mainColor = '#475569';
        highlightColor = '#94A3B8';
        strokeColor = '#1E293B';
        glowColor = 'rgba(220, 38, 38, 0.3)';
      } else if (materialMode === 'brass') {
        mainColor = '#D97706';
        highlightColor = '#FBBF24';
        strokeColor = '#78350F';
        glowColor = 'rgba(245, 158, 11, 0.4)';
      } else if (materialMode === 'wireframe') {
        mainColor = 'transparent';
        highlightColor = '#38BDF8';
        strokeColor = '#38BDF8';
        glowColor = 'rgba(56, 189, 248, 0.5)';
      }

      // Explosion Offset Factor
      const exp = explodedView ? 45 : 0;

      // 1. Valve Flange Left
      const p1 = project(-110 - exp, -60, -60);
      const p2 = project(-110 - exp, 60, -60);
      const p3 = project(-110 - exp, 60, 60);
      const p4 = project(-110 - exp, -60, 60);

      // 2. Valve Main Center Body Spherical Hub
      const centerP = project(0, 0, 0);

      // Render 3D Valve Body Segments
      // Left Flange Face
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      if (materialMode !== 'wireframe') {
        const flangeGrad = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
        flangeGrad.addColorStop(0, mainColor);
        flangeGrad.addColorStop(1, highlightColor);
        ctx.fillStyle = flangeGrad;
        ctx.fill();
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Right Flange Face
      const pr1 = project(110 + exp, -60, -60);
      const pr2 = project(110 + exp, 60, -60);
      const pr3 = project(110 + exp, 60, 60);
      const pr4 = project(110 + exp, -60, 60);

      ctx.beginPath();
      ctx.moveTo(pr1.x, pr1.y);
      ctx.lineTo(pr2.x, pr2.y);
      ctx.lineTo(pr3.x, pr3.y);
      ctx.lineTo(pr4.x, pr4.y);
      ctx.closePath();
      if (materialMode !== 'wireframe') {
        ctx.fillStyle = mainColor;
        ctx.fill();
      }
      ctx.stroke();

      // Central Sphere / Gate Bonnet Cylinder
      ctx.beginPath();
      ctx.arc(centerP.x, centerP.y, 65 * centerP.scale, 0, Math.PI * 2);
      if (materialMode !== 'wireframe') {
        const sphereGrad = ctx.createRadialGradient(
          centerP.x - 20,
          centerP.y - 20,
          10,
          centerP.x,
          centerP.y,
          70 * centerP.scale
        );
        sphereGrad.addColorStop(0, highlightColor);
        sphereGrad.addColorStop(0.7, mainColor);
        sphereGrad.addColorStop(1, '#0F172A');
        ctx.fillStyle = sphereGrad;
        ctx.fill();
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Valve Stem & Handwheel Assembly (Top Bonnet)
      const stemBase = project(0, -60 - exp * 0.5, 0);
      const stemTop = project(0, -140 - exp * 1.5, 0);

      // Stem Line
      ctx.beginPath();
      ctx.moveTo(stemBase.x, stemBase.y);
      ctx.lineTo(stemTop.x, stemTop.y);
      ctx.lineWidth = 12 * stemTop.scale;
      ctx.strokeStyle = materialMode === 'wireframe' ? strokeColor : '#DC2626'; // Flame Red Stem
      ctx.stroke();

      // Handwheel Outer Ring
      ctx.beginPath();
      ctx.ellipse(
        stemTop.x,
        stemTop.y,
        70 * stemTop.scale,
        22 * stemTop.scale,
        0,
        0,
        Math.PI * 2
      );
      if (materialMode !== 'wireframe') {
        ctx.fillStyle = '#DC2626';
        ctx.fill();
      }
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Handwheel Spokes
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
        const spX = stemTop.x + Math.cos(angle + rotationY) * 65 * stemTop.scale;
        const spY = stemTop.y + Math.sin(angle + rotationY) * 20 * stemTop.scale;
        ctx.beginPath();
        ctx.moveTo(stemTop.x, stemTop.y);
        ctx.lineTo(spX, spY);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Glowing Center Valve Seat Badge
      ctx.beginPath();
      ctx.arc(centerP.x, centerP.y, 20 * centerP.scale, 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.fill();

      // Floating Annotations
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px "IBM Plex Mono"';
      ctx.fillText('API 6D TRUNNION SEAT', centerP.x + 35, centerP.y - 40);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerP.x, centerP.y);
      ctx.lineTo(centerP.x + 30, centerP.y - 45);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotationY, rotationX, autoRotate, materialMode, explodedView, isDragging]);

  // Drag Interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotationY((prev) => prev + deltaX * 0.01);
    setRotationX((prev) => Math.max(-0.5, Math.min(0.5, prev + deltaY * 0.01)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-[480px] lg:h-[560px] rounded-2xl glass-panel border border-slate-700/60 overflow-hidden shadow-2xl group select-none">
      
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={560}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating Control Toolbar Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-navy-900/80 backdrop-blur border border-slate-700/80 px-3 py-1.5 rounded-full pointer-events-auto">
          <Sparkles className="w-4 h-4 text-flame-500 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-200">
            Interactive 3D Valve Assembly
          </span>
        </div>

        {/* Rotation Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur border transition-all pointer-events-auto ${
            autoRotate
              ? 'bg-flame-600/20 text-flame-400 border-flame-500/40'
              : 'bg-navy-900/80 text-slate-400 border-slate-700'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
          <span>{autoRotate ? 'Auto Orbit ON' : 'Paused'}</span>
        </button>
      </div>

      {/* Material & View Selector Floating Dock */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 bg-navy-900/90 backdrop-blur border border-slate-700/80 p-2.5 rounded-xl">
        
        {/* Materials */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Material:</span>
          <button
            onClick={() => setMaterialMode('ss316')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              materialMode === 'ss316' ? 'bg-slate-200 text-navy-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            SS316 Stainless
          </button>
          <button
            onClick={() => setMaterialMode('wcb')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              materialMode === 'wcb' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            WCB Steel
          </button>
          <button
            onClick={() => setMaterialMode('brass')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              materialMode === 'brass' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bronze/Brass
          </button>
          <button
            onClick={() => setMaterialMode('wireframe')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              materialMode === 'wireframe' ? 'bg-sky-500 text-navy-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            CAD Wireframe
          </button>
        </div>

        {/* Exploded View Toggle */}
        <button
          onClick={() => setExplodedView(!explodedView)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
            explodedView
              ? 'bg-flame-600 text-white shadow-md'
              : 'bg-navy-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>{explodedView ? 'Assembly Intact' : 'Exploded CAD'}</span>
        </button>

      </div>

      {/* Drag Hint */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden md:flex flex-col items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-8 h-12 rounded-full border-2 border-slate-400 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-flame-500 rounded-full animate-bounce"></div>
        </div>
        <span className="text-[10px] font-mono text-slate-400">DRAG 360°</span>
      </div>

    </div>
  );
};
