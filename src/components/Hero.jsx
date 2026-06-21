import React, { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import danielCoding from '../assets/daniel_coding.png';
import danielSoccer from '../assets/daniel_soccer.png';
import { MessageSquare, Briefcase, Terminal, Award, HelpCircle } from 'lucide-react';

export default function Hero() {
  const [activeMode, setActiveMode] = useState('coding'); // 'coding' or 'soccer'
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Canvas Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas sizes
    const resizeCanvas = () => {
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // MATRIX CODE RAIN SETUP (For 'coding' mode)
    const codeChars = ['0', '1', 'c', 'o', 'd', 'e', '{', '}', '=>', 'React', 'Python', 'AI', 'Java', 'SQL', 'PHP', 'QA', 'Linux'];
    const columns = Math.floor(canvas.width / 40);
    const drops = Array(columns).fill(0).map(() => Math.random() * -canvas.height);
    const dropSpeeds = Array(columns).fill(0).map(() => 1 + Math.random() * 3);

    // BOUNCING SOCCER BALLS SETUP (For 'soccer' mode)
    let balls = [];
    const gravity = 0.2;
    const friction = 0.98;

    const createBall = (x, y) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 12 + Math.random() * 12,
        color: ['#06b6d4', '#8b5cf6', '#10b981', '#ec4899'][Math.floor(Math.random() * 4)],
        bounciness: 0.7 + Math.random() * 0.15,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      };
    };

    // Initialize some balls for sports mode
    if (activeMode === 'soccer') {
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        balls.push(createBall(
          canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
          canvas.height * 0.2 + Math.random() * canvas.height * 0.3
        ));
      }
    }

    // Mouse interactivity
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleCanvasClick = (e) => {
      if (activeMode !== 'soccer') return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      // Spawn 3 new bouncing balls
      for (let i = 0; i < 3; i++) {
        balls.push(createBall(clickX, clickY));
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    // Animation Loop
    const draw = () => {
      // Semi-transparent overlay to create trails
      ctx.fillStyle = activeMode === 'coding' 
        ? 'rgba(10, 14, 26, 0.15)' 
        : 'rgba(10, 14, 26, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (activeMode === 'coding') {
        // Draw Matrix rain
        ctx.font = '14px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          const char = codeChars[Math.floor(Math.random() * codeChars.length)];
          const x = i * 40;
          const y = drops[i];

          // Glow effect for lead character
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#06b6d4';
          ctx.fillStyle = '#fff';
          ctx.fillText(char, x, y);

          // Trail character styling
          ctx.shadowBlur = 0;
          ctx.fillStyle = i % 2 === 0 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.4)';
          ctx.fillText(char, x, y - 20);

          drops[i] += dropSpeeds[i];

          // Reset to top if past viewport
          if (drops[i] > canvas.height) {
            drops[i] = Math.random() * -100;
            dropSpeeds[i] = 1 + Math.random() * 3;
          }
        }
      } else if (activeMode === 'soccer') {
        // Update & Draw bouncing balls
        balls.forEach((ball) => {
          // Physics
          ball.vy += gravity;
          ball.vx *= friction;
          ball.vy *= friction;
          
          ball.x += ball.vx;
          ball.y += ball.vy;
          ball.rotation += ball.rotationSpeed;

          // Boundary collisions
          // Bottom boundary
          if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.vy = -ball.vy * ball.bounciness;
            // Add slight roll friction
            ball.vx *= 0.95;
            ball.rotationSpeed = ball.vx * 0.05;
          }
          // Top boundary
          if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy = -ball.vy * ball.bounciness;
          }
          // Right boundary
          if (ball.x + ball.radius > canvas.width) {
            ball.x = canvas.width - ball.radius;
            ball.vx = -ball.vx * ball.bounciness;
          }
          // Left boundary
          if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx = -ball.vx * ball.bounciness;
          }

          // Mouse push repulsion
          const dx = ball.x - mouse.x;
          const dy = ball.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceDist = 120; // force radius

          if (dist < forceDist) {
            const force = (forceDist - dist) / forceDist;
            const pushAngle = Math.atan2(dy, dx);
            const pushX = Math.cos(pushAngle) * force * 1.5;
            const pushY = Math.sin(pushAngle) * force * 1.5;
            ball.vx += pushX;
            ball.vy += pushY - 0.1; // push slightly upwards too
          }

          // Draw ball
          ctx.save();
          ctx.translate(ball.x, ball.y);
          ctx.rotate(ball.rotation);

          // Glow shadow
          ctx.shadowBlur = 15;
          ctx.shadowColor = ball.color;

          // Outer circle
          ctx.beginPath();
          ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
          ctx.fillStyle = ball.color;
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#fff';
          ctx.stroke();

          // Soccer pattern lines
          ctx.shadowBlur = 0;
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.lineWidth = 1.5;
          
          // Center pentagon
          const pentaRadius = ball.radius * 0.35;
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
            const px = Math.cos(angle) * pentaRadius;
            const py = Math.sin(angle) * pentaRadius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
          ctx.fill();
          ctx.stroke();

          // Pattern radial lines
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
            const px = Math.cos(angle) * pentaRadius;
            const py = Math.sin(angle) * pentaRadius;
            const lx = Math.cos(angle) * ball.radius;
            const ly = Math.sin(angle) * ball.radius;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(lx, ly);
            ctx.stroke();
          }

          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Clean up event listeners and loop on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [activeMode]);

  return (
    <section id="home" className={styles.hero} ref={containerRef}>
      {/* Dynamic Canvas Background */}
      <canvas ref={canvasRef} className={styles.canvasBackground}></canvas>

      <div className={styles.container}>
        {/* Right: Intro Text */}
        <div className={styles.introContent}>
          <div className={styles.badge}>
            <Terminal size={14} className={styles.badgeIcon} />
            <span>הנדסאי תוכנה & Full-Stack Developer</span>
          </div>
          
          <h1 className={styles.title}>
            היי, אני <span className="gradient-text">דניאל</span>
          </h1>
          
          <p className={styles.description}>
            אני בונה פתרונות דיגיטליים מקצה לקצה – מאתרי אינטרנט מתקדמים ועד מערכות ניהול מבוזרות.
            כשותף-מייסד ב-<strong>GalilDevs</strong>, אני שואף להפוך רעיונות מורכבים למוצרים מדהימים ויעילים.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#contact" className="glow-btn">
              <span>בואו נדבר</span>
              <MessageSquare size={18} />
            </a>
            <a href="#about" className={styles.secondaryBtn}>
              <span>מידע נוסף אודותיי</span>
              <Award size={18} />
            </a>
          </div>
        </div>

        {/* Left: 3D Full-body Avatar Area with Toggles */}
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarCard}>
            <div className={styles.avatarFrame}>
              <div className={styles.avatarGlow} style={{
                background: activeMode === 'coding' 
                  ? 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'
              }}></div>
              
              {/* Flip transition wrapper */}
              <div className={`${styles.imageFlipContainer} ${activeMode === 'soccer' ? styles.isFlipped : ''}`}>
                <div className={styles.frontImage}>
                  <img 
                    src={danielCoding} 
                    alt="דניאל - מפתח קוד" 
                    className={styles.avatarImg} 
                  />
                </div>
                <div className={styles.backImage}>
                  <img 
                    src={danielSoccer} 
                    alt="דניאל - משחק כדורגל" 
                    className={styles.avatarImg} 
                  />
                </div>
              </div>
            </div>

            {/* Interaction Buttons Container */}
            <div className={styles.toggleContainer}>
              <button 
                onClick={() => setActiveMode('coding')} 
                className={`${styles.toggleBtn} ${activeMode === 'coding' ? styles.activeToggle : ''}`}
              >
                <span>💻 קוד במחשב</span>
              </button>
              <button 
                onClick={() => setActiveMode('soccer')} 
                className={`${styles.toggleBtn} ${activeMode === 'soccer' ? styles.activeToggle : ''}`}
              >
                <span>⚽ משחק כדורגל</span>
              </button>
            </div>
            
            {activeMode === 'soccer' && (
              <span className={styles.hintText}>
                <HelpCircle size={12} /> לחצו על הרקע למעלה כדי להקפיץ עוד כדורים!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ambient background glows */}
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
    </section>
  );
}
