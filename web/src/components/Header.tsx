import React, { useState, useEffect } from 'react';
import { ExternalLink, Menu, X, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tầm nhìn', href: '#vision' },
    { label: 'Thách thức', href: '#challenges' },
    { label: 'Quản lý học sinh', href: '#student-mgmt' },
    { label: 'Sổ điểm', href: '#gradebook' },
    { label: 'Web-Học-Tập', href: '#web-hoc-tap' },
    { label: 'Hệ sinh thái', href: '#ecosystem' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        backgroundColor: isScrolled
          ? 'rgba(248, 249, 246, 0.92)'
          : 'rgba(248, 249, 246, 0.6)',
        backdropFilter: 'blur(16px)',
        borderBottom: isScrolled
          ? '1px solid var(--border-subtle)'
          : '1px solid transparent',
        padding: isScrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="kiyo-container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brandmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            KIYOEDU<span style={{ color: 'var(--brand-accent)' }}>.</span>
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--text-muted)',
              background: 'var(--bg-surface)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              textTransform: 'uppercase',
            }}
          >
            2026
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-actions">
          <a
            href="https://github.com/0kiyo/kiyoedu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-card)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-primary)';
              e.currentTarget.style.color = 'var(--brand-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <span>GitHub</span>
            <ExternalLink size={13} />
          </a>

          <a
            href="#demo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-inverse)',
              background: 'var(--brand-primary)',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(36, 91, 69, 0.25)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand-primary)')}
          >
            <span>Trải nghiệm Demo</span>
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            padding: '8px',
            color: 'var(--text-primary)',
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '24px var(--gutter)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: 'var(--shadow-dropdown)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                padding: '6px 0',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <a
              href="https://github.com/0kiyo/kiyoedu"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span>Mã nguồn trên GitHub</span>
              <ExternalLink size={14} />
            </a>
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-inverse)',
                background: 'var(--brand-primary)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span>Trải nghiệm Demo</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
