import { GetStaticProps } from 'next';
import Head from 'next/head';
import type { MouseEvent } from 'react';
import Layout from '../components/Layout';
import { FaGithub, FaExternalLinkAlt, FaBrain, FaChartBar, FaComments, FaBriefcase, FaDownload, FaRobot, FaSearch, FaCalendarAlt, FaGraduationCap, FaMagic } from 'react-icons/fa';
import { getMockProjects, getMockPersonalInfo, Project, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Projects.module.css';

const PROJECT_ICONS: Record<number, JSX.Element> = {
  10: <FaMagic />,
  9: <FaGraduationCap />,
  1: <FaBrain />,
  2: <FaChartBar />,
  3: <FaComments />,
  4: <FaBriefcase />,
  5: <FaDownload />,
  6: <FaRobot />,
  7: <FaSearch />,
  8: <FaCalendarAlt />,
};

function ProjectThumbnail({ projectId }: { projectId: number }) {
  const uid = `proj${projectId}`;

  if (projectId === 10) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1e1e22" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      {/* Left: PDF resume document */}
      <rect x="28" y="22" width="130" height="162" rx="6" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.7" opacity="0.55" />
      <rect x="42" y="36" width="90" height="7" rx="2" fill="#c6c6c8" opacity="0.3" />
      <rect x="42" y="48" width="65" height="4" rx="2" fill="#c6c6c8" opacity="0.15" />
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x="42" y={60+i*13} width={70+(i%3)*16} height="4" rx="2" fill="#c6c6c8" opacity="0.11" />
      ))}
      {/* Scan line over document */}
      <rect x="28" y="22" width="130" height="2" rx="1" fill="#c6c6c8" opacity="0.5">
        <animate attributeName="y" values="26;176;26" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.8s" repeatCount="indefinite" />
      </rect>
      {/* Center: arrow with gear/AI indicator */}
      <circle cx="200" cy="100" r="18" fill="#1c1c1f" stroke="#c6c6c8" strokeWidth="0.8" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="200" y="104" textAnchor="middle" fontSize="9" fill="#c6c6c8" opacity="0.45" fontFamily="monospace">AI</text>
      <line x1="158" y1="100" x2="180" y2="100" stroke="#c6c6c8" strokeWidth="0.8" opacity="0.2" />
      <line x1="220" y1="100" x2="242" y2="100" stroke="#c6c6c8" strokeWidth="0.8" opacity="0.2" />
      {/* Right: LaTeX code output appearing */}
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
      {/* Blinking cursor */}
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
      {/* Left: chat bubbles */}
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
      {/* Divider */}
      <line x1="200" y1="16" x2="200" y2="184" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.1" />
      {/* Right: curriculum checklist */}
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
      {/* Connection lines L1→L2 */}
      {([50,100,150] as number[]).flatMap(y1 => ([40,80,120,160] as number[]).map(y2 => (
        <line key={`${y1}-${y2}`} x1="80" y1={y1} x2="200" y2={y2} stroke="#c6c6c8" strokeWidth="0.5" opacity="0.07" />
      )))}
      {/* Connection lines L2→L3 */}
      {([40,80,120,160] as number[]).flatMap(y1 => ([65,135] as number[]).map(y2 => (
        <line key={`${y1}-${y2}`} x1="200" y1={y1} x2="320" y2={y2} stroke="#c6c6c8" strokeWidth="0.5" opacity="0.07" />
      )))}
      {/* L1 nodes */}
      {[50,100,150].map((y, i) => (
        <circle key={i} cx="80" cy={y} r="7" fill="#141416" stroke="#c6c6c8" strokeWidth="1" opacity="0.55">
          <animate attributeName="opacity" values="0.55;0.9;0.55" dur={`${1.8+i*0.4}s`} repeatCount="indefinite" begin={`${i*0.25}s`} />
        </circle>
      ))}
      {/* L2 nodes */}
      {[40,80,120,160].map((y, i) => (
        <circle key={i} cx="200" cy={y} r="7" fill="#141416" stroke="#c6c6c8" strokeWidth="1" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.85;0.5" dur={`${2.1+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.3}s`} />
        </circle>
      ))}
      {/* L3 nodes */}
      {[65,135].map((y, i) => (
        <circle key={i} cx="320" cy={y} r="9" fill="#1c1c1f" stroke="#c6c6c8" strokeWidth="1.2" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur={`${1.6+i*0.5}s`} repeatCount="indefinite" begin={`${i*0.4}s`} />
        </circle>
      ))}
      {/* Waveform */}
      <polyline points="30,185 60,175 90,188 120,170 150,180 180,168 210,178 240,165 270,178 300,172 330,182 370,175" fill="none" stroke="#c6c6c8" strokeWidth="1.2" opacity="0.18">
        <animate attributeName="points"
          values="30,185 60,175 90,188 120,170 150,180 180,168 210,178 240,165 270,178 300,172 330,182 370,175;30,180 60,188 90,172 120,183 150,170 180,182 210,172 240,180 270,170 300,178 330,173 370,182;30,185 60,175 90,188 120,170 150,180 180,168 210,178 240,165 270,178 300,172 330,182 370,175"
          dur="3s" repeatCount="indefinite" />
      </polyline>
    </svg>
  );

  if (projectId === 2) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1e1e22" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      <line x1="50" y1="155" x2="260" y2="155" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.2" />
      {([
        {x:65,h:60,d:'0s',dur:'3s'},{x:105,h:95,d:'0.15s',dur:'3.5s'},{x:145,h:45,d:'0.3s',dur:'4s'},
        {x:185,h:110,d:'0.45s',dur:'3.2s'},{x:225,h:75,d:'0.6s',dur:'3.8s'},
      ]).map((b, i) => (
        <rect key={i} x={b.x} y={155-b.h} width="28" height={b.h} rx="2" fill="#c6c6c8" opacity="0.2">
          <animate attributeName="height" values={`0;${b.h};${b.h}`} dur={b.dur} repeatCount="indefinite" begin={b.d} />
          <animate attributeName="y" values={`155;${155-b.h};${155-b.h}`} dur={b.dur} repeatCount="indefinite" begin={b.d} />
          <animate attributeName="opacity" values="0.2;0.3;0.2" dur={`${2.5+i*0.3}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="290" y={48+i*22} width={40+(i%3)*18} height="5" rx="2" fill="#c6c6c8" opacity="0.12" />
          <rect x={338+(i%3)*18} y={48+i*22} width="28" height="5" rx="2" fill="#c6c6c8" opacity="0.07" />
        </g>
      ))}
      <rect x="285" y="42" width="100" height="1" fill="#c6c6c8" opacity="0.3">
        <animate attributeName="y" values="42;148;42" dur="3s" repeatCount="indefinite" />
      </rect>
    </svg>
  );

  if (projectId === 3) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1a1a1e" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      <g opacity="0">
        <rect x="30" y="28" width="150" height="34" rx="12" fill="#252528" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.7" />
        <rect x="46" y="38" width="65" height="5" rx="2" fill="#c6c6c8" opacity="0.28" />
        <rect x="46" y="48" width="95" height="5" rx="2" fill="#c6c6c8" opacity="0.18" />
        <animate attributeName="opacity" values="0;1;1;1;0;0" dur="7s" repeatCount="indefinite" begin="0s" />
      </g>
      <g opacity="0">
        <rect x="220" y="78" width="150" height="34" rx="12" fill="#1c1c1f" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.7" />
        <rect x="236" y="88" width="85" height="5" rx="2" fill="#c6c6c8" opacity="0.28" />
        <rect x="236" y="98" width="55" height="5" rx="2" fill="#c6c6c8" opacity="0.18" />
        <animate attributeName="opacity" values="0;0;0;1;1;0" dur="7s" repeatCount="indefinite" begin="0s" />
      </g>
      <g opacity="0">
        <rect x="30" y="126" width="190" height="34" rx="12" fill="#252528" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.7" />
        <rect x="46" y="136" width="105" height="5" rx="2" fill="#c6c6c8" opacity="0.28" />
        <rect x="46" y="146" width="75" height="5" rx="2" fill="#c6c6c8" opacity="0.18" />
        <animate attributeName="opacity" values="0;0;0;0;1;1" dur="7s" repeatCount="indefinite" begin="0s" />
      </g>
      <rect x="268" y="145" width="92" height="30" rx="10" fill="none" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.22" />
      {[298,314,330].map((cx, i) => (
        <circle key={i} cx={cx} cy="160" r="4" fill="#c6c6c8" opacity="0.35">
          <animate attributeName="opacity" values="0.35;0.75;0.35" dur="1s" repeatCount="indefinite" begin={`${i*0.22}s`} />
        </circle>
      ))}
      {[0,1,2].map(i => (
        <circle key={i} cx="370" cy="22" r={14+i*10} fill="none" stroke="#c6c6c8" strokeWidth="0.7">
          <animate attributeName="r" values={`${14+i*10};${24+i*10};${14+i*10}`} dur="2.5s" repeatCount="indefinite" begin={`${i*0.35}s`} />
          <animate attributeName="opacity" values={`${0.14-i*0.04};0;${0.14-i*0.04}`} dur="2.5s" repeatCount="indefinite" begin={`${i*0.35}s`} />
        </circle>
      ))}
    </svg>
  );

  if (projectId === 4) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1e1e22" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      <rect x="48" y="18" width="150" height="170" rx="6" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.7" opacity="0.55" />
      <rect x="62" y="32" width="105" height="7" rx="2" fill="#c6c6c8" opacity="0.28" />
      <rect x="62" y="46" width="72" height="4" rx="2" fill="#c6c6c8" opacity="0.14" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x="62" y={58+i*14} width={75+(i%3)*18} height="4" rx="2" fill="#c6c6c8" opacity="0.11" />
      ))}
      <rect x="48" y="18" width="150" height="2" rx="1" fill="#c6c6c8" opacity="0.55">
        <animate attributeName="y" values="22;178;22" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.55;0.25;0.55" dur="2.6s" repeatCount="indefinite" />
      </rect>
      <rect x="228" y="38" width="135" height="126" rx="8" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.5" />
      <text x="295" y="63" textAnchor="middle" fontSize="9" fill="#c6c6c8" opacity="0.35" fontFamily="monospace">MATCH SCORE</text>
      <text x="295" y="100" textAnchor="middle" fontSize="30" fill="#c6c6c8" fontFamily="monospace" fontWeight="300">
        <animate attributeName="opacity" values="0;0.65;0.65;0" dur="3s" repeatCount="indefinite" />
        87%
      </text>
      <rect x="248" y="114" width="94" height="4" rx="2" fill="#2a2a2e" />
      <rect x="248" y="114" width="0" height="4" rx="2" fill="#c6c6c8" opacity="0.5">
        <animate attributeName="width" values="0;82;82;0" dur="3s" repeatCount="indefinite" />
      </rect>
      <text x="295" y="138" textAnchor="middle" fontSize="8" fill="#c6c6c8" opacity="0.22" fontFamily="monospace">ANALYZING...</text>
    </svg>
  );

  if (projectId === 5) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0e0e10" /><stop offset="100%" stopColor="#161618" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      <rect x="28" y="18" width="344" height="166" rx="8" fill="#0e0e10" stroke="#2e2e32" strokeWidth="1" />
      <rect x="28" y="18" width="344" height="26" rx="8" fill="#1a1a1c" />
      <rect x="28" y="34" width="344" height="10" fill="#1a1a1c" />
      <circle cx="50" cy="31" r="4.5" fill="#ff5f57" opacity="0.7" />
      <circle cx="66" cy="31" r="4.5" fill="#febc2e" opacity="0.7" />
      <circle cx="82" cy="31" r="4.5" fill="#28c840" opacity="0.7" />
      {([
        {label:'file_01.zip',fill:0.92,d:'0s',dur:'3s'},
        {label:'data_02.mp4',fill:0.6,d:'0.5s',dur:'4.2s'},
        {label:'arch_03.tar',fill:0.35,d:'1s',dur:'5.5s'},
        {label:'docs_04.pdf',fill:0.12,d:'1.5s',dur:'7s'},
      ]).map((row, i) => (
        <g key={i}>
          <rect x="46" y={56+i*30} width="248" height="6" rx="3" fill="#2a2a2e" />
          <rect x="46" y={56+i*30} width="0" height="6" rx="3" fill="#c6c6c8" opacity="0.42">
            <animate attributeName="width" values={`0;${248*row.fill};${248*row.fill}`} dur={row.dur} repeatCount="indefinite" begin={row.d} />
          </rect>
          <text x="46" y={71+i*30} fontSize="7.5" fill="#c6c6c8" opacity="0.28" fontFamily="monospace">{row.label}</text>
          <text x="302" y={63+i*30} fontSize="7.5" fill="#c6c6c8" opacity="0.2" fontFamily="monospace">{Math.round(row.fill*100)}%</text>
        </g>
      ))}
    </svg>
  );

  if (projectId === 6) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1e1e22" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      <rect x="30" y="75" width="110" height="50" rx="8" fill="#1c1c1f" stroke="#c6c6c8" strokeWidth="1" opacity="0.65" />
      <text x="85" y="96" textAnchor="middle" fontSize="8" fill="#c6c6c8" opacity="0.45" fontFamily="monospace">PROMPT</text>
      <text x="85" y="110" textAnchor="middle" fontSize="7" fill="#c6c6c8" opacity="0.25" fontFamily="monospace">JSON input</text>
      <circle cx="220" cy="100" r="20" fill="#1c1c1f" stroke="#c6c6c8" strokeWidth="1" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="220" y="104" textAnchor="middle" fontSize="8" fill="#c6c6c8" opacity="0.45" fontFamily="monospace">AI</text>
      {(['GPT-4o','Claude','Llama'] as string[]).map((name, i) => (
        <g key={i}>
          <rect x="300" y={38+i*52} width="72" height="26" rx="5" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.6" opacity="0.45" />
          <text x="336" y={55+i*52} textAnchor="middle" fontSize="7.5" fill="#c6c6c8" opacity="0.35" fontFamily="monospace">{name}</text>
        </g>
      ))}
      <line x1="140" y1="100" x2="198" y2="100" stroke="#c6c6c8" strokeWidth="0.8" opacity="0.2" />
      <circle cx="170" cy="100" r="3" fill="#c6c6c8" opacity="0">
        <animate attributeName="cx" values="142;196;142" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.55;0" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {([51,103,155] as number[]).map((y, i) => (
        <g key={i}>
          <line x1="240" y1="100" x2="300" y2={y} stroke="#c6c6c8" strokeWidth="0.7" opacity="0.14" />
          <circle cx="240" cy="100" r="2.5" fill="#c6c6c8" opacity="0">
            <animate attributeName="cx" values="242;298;242" dur={`${1.9+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.35}s`} />
            <animate attributeName="cy" values={`100;${y};100`} dur={`${1.9+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.35}s`} />
            <animate attributeName="opacity" values="0;0.5;0" dur={`${1.9+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.35}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );

  if (projectId === 7) return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#161618" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      <rect x="28" y="18" width="344" height="166" rx="8" fill="#0e0e10" stroke="#2e2e32" strokeWidth="1" />
      <rect x="28" y="18" width="344" height="28" rx="8" fill="#1a1a1c" />
      <rect x="28" y="36" width="344" height="10" fill="#1a1a1c" />
      <rect x="88" y="25" width="224" height="14" rx="7" fill="#252528" />
      <rect x="96" y="29" width="90" height="5" rx="2" fill="#c6c6c8" opacity="0.18" />
      {[0,1,2,3,4,5].map(i => (
        <g key={i} opacity="0">
          <rect x="48" y={56+i*20} width={210+(i%3)*28} height="7" rx="2" fill="#c6c6c8" opacity="0.13" />
          <rect x={268+(i%2)*14} y={56+i*20} width="64" height="7" rx="2" fill="#c6c6c8" opacity="0.09" />
          <animate attributeName="opacity" values="0;1;1" dur={`${4+i*0.8}s`} repeatCount="indefinite" begin={`${i*0.4}s`} />
        </g>
      ))}
      <rect x="42" y="50" width="320" height="14" rx="3" fill="#c6c6c8" opacity="0.03">
        <animate attributeName="y" values="50;172;50" dur="3.2s" repeatCount="indefinite" />
      </rect>
      <rect x="42" y="50" width="320" height="1" fill="#c6c6c8" opacity="0.22">
        <animate attributeName="y" values="50;172;50" dur="3.2s" repeatCount="indefinite" />
      </rect>
    </svg>
  );

  // projectId === 8: Date Validity Checker
  return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141416" /><stop offset="100%" stopColor="#1e1e22" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#bg${uid})`} />
      <rect x="88" y="18" width="224" height="166" rx="8" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.7" opacity="0.5" />
      <rect x="88" y="18" width="224" height="32" rx="8" fill="#252528" opacity="0.8" />
      <rect x="88" y="40" width="224" height="10" fill="#252528" opacity="0.8" />
      <text x="200" y="37" textAnchor="middle" fontSize="10" fill="#c6c6c8" opacity="0.45" fontFamily="monospace">JUNE  2019</text>
      {(['S','M','T','W','T','F','S']).map((d, i) => (
        <text key={i} x={103+i*30} y={65} textAnchor="middle" fontSize="8" fill="#c6c6c8" opacity="0.22" fontFamily="monospace">{d}</text>
      ))}
      {[...Array(5)].map((_, row) =>
        [...Array(7)].map((_, col) => {
          const day = row * 7 + col + 1;
          if (day > 30) return null;
          const isTarget = day === 15;
          return (
            <g key={`${row}-${col}`}>
              {isTarget && (
                <rect x={92+col*30} y={72+row*22} width={22} height={18} rx="4" fill="#c6c6c8" opacity="0">
                  <animate attributeName="opacity" values="0;0.18;0.18;0" dur="4s" repeatCount="indefinite" begin="1s" />
                </rect>
              )}
              <text x={103+col*30} y={85+row*22} textAnchor="middle" fontSize="9"
                fill="#c6c6c8" opacity={isTarget ? 0.65 : 0.14} fontFamily="monospace">{day}</text>
            </g>
          );
        })
      )}
      <g opacity="0">
        <polyline points="285,88 298,106 330,74" fill="none" stroke="#c6c6c8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" begin="1s" />
      </g>
    </svg>
  );
}

interface ProjectsProps {
  projects: Project[];
  personalInfo: PersonalInfo;
}

function updatePointerPosition(event: MouseEvent<HTMLElement>) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  target.style.setProperty('--pointer-x', `${x}%`);
  target.style.setProperty('--pointer-y', `${y}%`);
}


export default function Projects({ projects, personalInfo }: ProjectsProps) {
  return (
    <>
      <Head>
        <title>Projects - Achyut</title>
        <meta name="description" content="Portfolio of projects by Achyut" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.projectsSection}>
          <div className="container">
            <h1 className="section-title">My Projects</h1>
            <p className={styles.subtitle}>
              A collection of projects showcasing my work in cloud-native systems, multimodal AI, and full-stack web development.
            </p>

            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={styles.cardWrapper}
                  style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                >
                  <div
                    className={styles.projectCard}
                    onMouseMove={updatePointerPosition}
                  >
                    <div className={styles.projectThumbnail}>
                      <ProjectThumbnail projectId={project.id} />
                      <div className={styles.thumbnailOverlay} />
                      <div className={styles.thumbnailBadge}>
                        {PROJECT_ICONS[project.id]}
                      </div>
                    </div>

                    <div className={styles.projectContent}>
                      <h3 className={styles.projectTitle}>{project.title.rendered}</h3>

                      <div
                        className={styles.projectDescription}
                        dangerouslySetInnerHTML={{ __html: project.content.rendered }}
                      />

                      {project.acf?.technologies && (
                        <div className={styles.technologies}>
                          {project.acf.technologies.split(/[,·]/).map((tech, i) => (
                            <span key={i} className={styles.techTag}>{tech.trim()}</span>
                          ))}
                        </div>
                      )}

                      <div className={styles.projectLinks}>
                        {project.acf?.github_url && (
                          <a href={project.acf.github_url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            <FaGithub /> GitHub
                          </a>
                        )}
                        {project.acf?.project_url && (
                          <a href={project.acf.project_url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            <FaExternalLinkAlt /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = getMockProjects();
  const personalInfo = getMockPersonalInfo();
  return { props: { projects, personalInfo } };
};
