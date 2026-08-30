import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Plan Trip', href: '/plan-trip' },
  { label: 'Saved Trips', href: '/saved-trips' },
  { label: 'About', href: '/about' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const serifStyle = { fontFamily: 'var(--font-serif)' } as const;

  return (
    <>
      {/* Full-width wrapper so the pill stays viewport-centered
          (Framer Motion y-animation would otherwise overwrite translateX) */}
      <div
        className="fixed inset-x-0 z-50 flex justify-center pointer-events-none"
        style={{ top: 20, paddingLeft: 16, paddingRight: 16 }}
      >
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto"
        style={{ maxWidth: '100%' }}
        aria-label="Main navigation"
      >
        <div
          className="flex items-center gap-1 px-3 py-2 transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(247, 244, 239, 0.96)'
              : 'rgba(247, 244, 239, 0.88)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid rgba(26, 24, 20, 0.10)',
            borderRadius: '9999px',
            boxShadow: scrolled
              ? '0 4px 24px rgba(26, 24, 20, 0.08), 0 1px 4px rgba(26, 24, 20, 0.06)'
              : '0 2px 12px rgba(26, 24, 20, 0.06)',
          }}
        >
          {/* Logo mark */}
          <Link
            to="/"
            className="flex items-center gap-2 pl-1 pr-3 mr-1"
            style={{ borderRight: '1px solid rgba(26, 24, 20, 0.10)' }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#1A1814',
                flexShrink: 0,
              }}
            >
              {/* Minimal compass SVG */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#F7F4EF" strokeWidth="1"/>
                <path d="M7 3.5 L8.2 6.8 L7 6.2 L5.8 6.8 Z" fill="#C85F3C"/>
                <path d="M7 10.5 L5.8 7.2 L7 7.8 L8.2 7.2 Z" fill="#F7F4EF" opacity="0.6"/>
              </svg>
            </div>
            <span
              className="text-sm font-medium tracking-tight hidden sm:block font-serif"
              style={{ color: '#1A1814', letterSpacing: '-0.02em', ...serifStyle }}
            >
              TripSmart
            </span>
          </Link>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-3.5 py-1.5 text-sm font-medium font-serif transition-colors duration-200"
                  style={{
                    color: isActive ? '#1A1814' : '#6B6560',
                    borderRadius: '9999px',
                    background: isActive ? 'rgba(26, 24, 20, 0.06)' : 'transparent',
                    letterSpacing: '-0.02em',
                    ...serifStyle,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#1A1814';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#6B6560';
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Auth area */}
          <div className="flex items-center gap-1 pl-1 ml-1" style={{ borderLeft: '1px solid rgba(26, 24, 20, 0.10)' }}>
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium font-serif transition-colors duration-200"
                  style={{
                    color: '#1A1814',
                    borderRadius: '9999px',
                    background: dropdownOpen ? 'rgba(26, 24, 20, 0.06)' : 'transparent',
                    letterSpacing: '-0.02em',
                    ...serifStyle,
                  }}
                  onClick={() => setDropdownOpen(prev => !prev)}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(26, 24, 20, 0.06)'}
                  onMouseLeave={e => {
                    if (!dropdownOpen) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <div
                    className="flex items-center justify-center text-xs font-bold"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#C85F3C',
                      color: '#FFFFFF',
                      flexShrink: 0,
                    }}
                  >
                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                  </div>
                  <span className="hidden sm:block">{user?.name?.split(' ')[0]}</span>
                  {/* Chevron indicator */}
                  <svg
                    width="10" height="6" viewBox="0 0 10 6" fill="none"
                    style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="#1A1814" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Click-controlled dropdown */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 top-full mt-2 w-48 py-1 z-50"
                      style={{
                        background: '#F7F4EF',
                        border: '1px solid rgba(26, 24, 20, 0.10)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 8px 24px rgba(26, 24, 20, 0.10)',
                      }}
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2.5 text-sm transition-colors duration-150 font-serif"
                        style={{ color: '#1A1814', borderRadius: '0.5rem' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(26, 24, 20, 0.05)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/my-trips"
                        className="block px-4 py-2.5 text-sm transition-colors duration-150 font-serif"
                        style={{ color: '#1A1814', borderRadius: '0.5rem' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(26, 24, 20, 0.05)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        My Trips
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2.5 text-sm transition-colors duration-150 font-serif"
                        style={{ color: '#1A1814', borderRadius: '0.5rem' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(26, 24, 20, 0.05)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        Settings
                      </Link>
                      <div style={{ borderTop: '1px solid rgba(26, 24, 20, 0.08)', margin: '4px 8px' }} />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 font-serif"
                        style={{ color: '#C85F3C', borderRadius: '0.5rem' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(200, 95, 60, 0.06)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-sm font-medium font-serif transition-colors duration-200"
                  style={{
                    color: '#6B6560',
                    borderRadius: '9999px',
                    letterSpacing: '-0.02em',
                    ...serifStyle,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#1A1814';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(26, 24, 20, 0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#6B6560';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-1.5 text-sm font-medium font-serif transition-all duration-200"
                  style={{
                    color: '#F7F4EF',
                    background: '#1A1814',
                    borderRadius: '9999px',
                    letterSpacing: '-0.02em',
                    ...serifStyle,
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#C85F3C'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1A1814'}
                >
                  Get started
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col items-center justify-center gap-[5px] p-2"
              style={{ borderRadius: '9999px' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
                style={{ width: 16, height: 1.5, background: '#1A1814', borderRadius: 2 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="block"
                style={{ width: 16, height: 1.5, background: '#1A1814', borderRadius: 2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
                style={{ width: 16, height: 1.5, background: '#1A1814', borderRadius: 2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-20 left-4 right-4 z-40"
          >
            <div
              className="overflow-hidden"
              style={{
                background: 'rgba(247, 244, 239, 0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(26, 24, 20, 0.10)',
                borderRadius: '1rem',
              }}
            >
              <div className="py-2 px-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-3 text-sm font-medium font-serif transition-colors duration-150"
                      style={{
                        color: isActive ? '#C85F3C' : '#1A1814',
                        borderRadius: '0.5rem',
                        background: isActive ? 'rgba(200, 95, 60, 0.08)' : 'transparent',
                        letterSpacing: '-0.02em',
                        ...serifStyle,
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div style={{ borderTop: '1px solid rgba(26, 24, 20, 0.08)', margin: '8px 0' }} />
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="block px-4 py-3 text-sm font-medium" style={{ color: '#1A1814', borderRadius: '0.5rem' }}>
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-sm font-medium"
                      style={{ color: '#C85F3C', borderRadius: '0.5rem' }}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 px-2 pb-2">
                    <Link
                      to="/login"
                      className="flex-1 text-center px-4 py-2.5 text-sm font-medium"
                      style={{
                        color: '#1A1814',
                        border: '1px solid rgba(26, 24, 20, 0.15)',
                        borderRadius: '0.5rem',
                      }}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="flex-1 text-center px-4 py-2.5 text-sm font-medium"
                      style={{
                        color: '#F7F4EF',
                        background: '#1A1814',
                        borderRadius: '0.5rem',
                      }}
                    >
                      Get started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
