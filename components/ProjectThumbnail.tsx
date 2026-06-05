interface ProjectThumbnailProps {
  projectId: number;
}

export default function ProjectThumbnail({ projectId }: ProjectThumbnailProps) {
  const uid = `proj${projectId}`;

  if (projectId === 10) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1e1e22" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      <rect x="28" y="22" width="130" height="162" rx="6" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.7" opacity="0.55" />
      <rect x="42" y="36" width="90" height="7" rx="2" fill="#c6c6c8" opacity="0.3" />
      <rect x="42" y="48" width="65" height="4" rx="2" fill="#c6c6c8" opacity="0.15" />
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x="42" y={60+i*13} width={70+(i%3)*16} height="4" rx="2" fill="#c6c6c8" opacity="0.11" />
      ))}
      <rect x="28" y="22" width="130" height="2" rx="1" fill="#c6c6c8" opacity="0.5">
        <animate attributeName="y" values="26;176;26" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.8s" repeatCount="indefinite" />
      </rect>
      <circle cx="200" cy="100" r="18" fill="#1c1c1f" stroke="#c6c6c8" strokeWidth="0.8" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="200" y="104" textAnchor="middle" fontSize="9" fill="#c6c6c8" opacity="0.45" fontFamily="monospace">AI</text>
      <line x1="158" y1="100" x2="180" y2="100" stroke="#c6c6c8" strokeWidth="0.8" opacity="0.2" />
      <line x1="220" y1="100" x2="242" y2="100" stroke="#c6c6c8" strokeWidth="0.8" opacity="0.2" />
      <rect x="242" y="22" width="138" height="162" rx="6" fill="#0e0e10" stroke="#2e2e32" strokeWidth="0.8" opacity="0.7" />
      {[
        {t:'\\documentclass{article}', delay:'0s'},
        {t:'\\begin{document}', delay:'0.3s'},
        {t:'  \\section*{Experience}', delay:'0.6s'},
        {t:'  \\textbf{Engineer}', delay:'0.9s'},
        {t:'  Reduced latency 40\\%', delay:'1.2s'},
        {t:'  \\begin{itemize}', delay:'1.5s'},
        {t:'    \\item Built...', delay:'1.8s'},
        {t:'  \\end{itemize}', delay:'2.1s'},
        {t:'\\end{document}', delay:'2.4s'},
      ].map((row, i) => (
        <text key={i} x="250" y={38+i*17} fontSize="6.5" fill="#c6c6c8" fontFamily="monospace" opacity="0">
          {row.t}
          <animate attributeName="opacity" values="0;0.35;0.35" dur="3.5s" repeatCount="indefinite" begin={row.delay} />
        </text>
      ))}
      <rect x="250" y="174" width="5" height="8" rx="1" fill="#c6c6c8" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0;0.5" dur="0.9s" repeatCount="indefinite" />
      </rect>
    </svg>
  );

  if (projectId === 9) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1e1e22" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      {[
        {x:28, y:28, w:130, role:'user'},
        {x:28, y:70, w:110, role:'ai'},
        {x:28, y:112, w:140, role:'user'},
        {x:28, y:154, w:100, role:'ai'},
      ].map((b, i) => (
        <g key={i} opacity="0">
          <rect x={b.x} y={b.y} width={b.w} height={26} rx={b.role==='user' ? '10 10 10 2' : '10 10 2 10'} fill={b.role==='user' ? '#252528' : '#1c1c1f'} stroke="#c6c6c8" strokeWidth="0.5" opacity="0.65" />
          <rect x={b.x+12} y={b.y+10} width={b.w-32} height="4" rx="2" fill="#c6c6c8" opacity="0.25" />
          <animate attributeName="opacity" values="0;1;1" dur={`${5+i}s`} repeatCount="indefinite" begin={`${i*0.7}s`} />
        </g>
      ))}
      <line x1="200" y1="16" x2="200" y2="184" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.1" />
      <text x="216" y="32" fontSize="8" fill="#c6c6c8" opacity="0.3" fontFamily="monospace">CURRICULUM</text>
      {[0,1,2,3,4].map(i => (
        <g key={i} opacity="0">
          <circle cx="224" cy={50+i*28} r="5" fill="none" stroke="#c6c6c8" strokeWidth="0.8" opacity="0.4" />
          <polyline points={`220,${50+i*28} 223,${54+i*28} 229,${46+i*28}`} fill="none" stroke="#c6c6c8" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
            <animate attributeName="opacity" values="0;0.7;0.7" dur={`${4+i}s`} repeatCount="indefinite" begin={`${i*0.5+0.5}s`} />
          </polyline>
          <rect x="236" y={46+i*28} width={90+(i%3)*18} height="5" rx="2" fill="#c6c6c8" opacity="0.18" />
          <animate attributeName="opacity" values="0;1;1" dur={`${4+i}s`} repeatCount="indefinite" begin={`${i*0.5}s`} />
        </g>
      ))}
    </svg>
  );

  if (projectId === 1) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1e1e22" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      {[50, 100, 150].flatMap(y1 => ([40, 80, 120, 160]).map(y2 => (
        <line key={`${y1}-${y2}`} x1="80" y1={y1} x2="200" y2={y2} stroke="#c6c6c8" strokeWidth="0.5" opacity="0.07" />
      )))}
      {[40, 80, 120, 160].flatMap(y1 => ([65, 135]).map(y2 => (
        <line key={`${y1}-${y2}`} x1="200" y1={y1} x2="320" y2={y2} stroke="#c6c6c8" strokeWidth="0.5" opacity="0.07" />
      )))}
      {[50, 100, 150].map((y, i) => (
        <circle key={i} cx="80" cy={y} r="7" fill="#141416" stroke="#c6c6c8" strokeWidth="1" opacity="0.55">
          <animate attributeName="opacity" values="0.55;0.9;0.55" dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} />
        </circle>
      ))}
      {[40, 80, 120, 160].map((y, i) => (
        <circle key={i} cx="200" cy={y} r="7" fill="#141416" stroke="#c6c6c8" strokeWidth="1" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.85;0.5" dur={`${2.1 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
        </circle>
      ))}
      {[65, 135].map((y, i) => (
        <circle key={i} cx="320" cy={y} r="9" fill="#1c1c1f" stroke="#c6c6c8" strokeWidth="1.2" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur={`${1.6 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
        </circle>
      ))}
      <polyline points="30,185 60,175 90,188 120,170 150,180 180,168 210,178 240,165 270,178 300,172 330,182 370,175" fill="none" stroke="#c6c6c8" strokeWidth="1.2" opacity="0.18">
        <animate attributeName="points"
          values="30,185 60,175 90,188 120,170 150,180 180,168 210,178 240,165 270,178 300,172 330,182 370,175;30,180 60,188 90,172 120,183 150,170 180,182 210,172 240,180 270,170 300,178 330,173 370,182;30,185 60,175 90,188 120,170 150,180 180,168 210,178 240,165 270,178 300,172 330,182 370,175"
          dur="3s" repeatCount="indefinite" />
      </polyline>
    </svg>
  );

  return null;
}
