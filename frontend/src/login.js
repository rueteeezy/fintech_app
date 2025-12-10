import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use the standard MUI Blue colors to match App.js
  const muiBlue = '#1976d2';
  const muiBlueLightAccent = '#e3f2fd';

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      // --- Simulate API call for demonstration ---
      console.log("Logging in with:", username, password);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
      // -------------------------------------------

      /* UNCOMMENT THIS WHEN READY TO CONNECT TO REAL BACKEND
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        let text = 'Login failed';
        try {
          const j = await res.json();
          text = j.error || text;
        } catch (_) {}
        throw new Error(text);
      }
      const j = await res.json();
      onLogin && onLogin(j.token, j.username);
      */

      // Mock successful login for now
      onLogin && onLogin("dummy-token", username);

    } catch (e) {
      setErr(e.message || 'Could not connect to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Inline small <style> block for keyframes and focus states */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shakeX { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%,50%,70% { transform: translateX(-4px); } 40%,60% { transform: translateX(4px); } }
        .fade-in { animation: floatIn 360ms ease both; }
        .fade-in-delay { animation: floatIn 360ms ease 80ms both; }
        .fade-in-delay-2 { animation: floatIn 360ms ease 140ms both; }
        .fade-in-delay-3 { animation: floatIn 360ms ease 220ms both; }
        .float-in { animation: floatIn 420ms cubic-bezier(.2,.9,.2,1) both; }
        .shake { animation: shakeX 420ms ease both; }
        /* Add blue focus ring to match MUI style */
        .login-input:focus { outline: none; border-color: ${muiBlue} !important; box-shadow: 0 0 0 2px ${muiBlueLightAccent} !important; }
        @media (max-width: 440px) { .card { width: 100% !important; box-sizing: border-box; } }`}</style>

      <form
        onSubmit={submit}
        style={styles.card}
        className={`card ${err ? 'shake' : ''}`}
        aria-live="polite"
      >
        <div style={styles.header}>
          {/* Updated Logo colors to MUI Blue */}
          <div style={{...styles.logoWrap, background: muiBlueLightAccent }} className="float-in" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="3" stroke={muiBlue} strokeWidth="1.5" fill={muiBlueLightAccent} />
                <path d="M6 10h12M6 14h7" stroke={muiBlue} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        {err && (
          <div style={styles.error} className="fade-in" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 9v4" stroke="#b91c1c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17h.01" stroke="#b91c1c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.29 3.86l-7 12A2 2 0 0 0 4.94 19h14.12a2 2 0 0 0 1.65-3.14l-7-12a2 2 0 0 0-3.42 0z" stroke="#b91c1c" strokeWidth="1.2" fill="#fee2e2" />
            </svg>
            <span style={{ marginLeft: 8 }}>{err}</span>
          </div>
        )}

        <label style={styles.field} className="fade-in-delay">
          <div style={styles.inputLabel}>Username</div>
          <div style={styles.inputWrap}>
            <div style={styles.iconLeft} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your.username"
              style={styles.input}
              className="login-input"
              autoComplete="username"
              aria-label="Username"
            />
          </div>
        </label>

        <label style={localStyles.field} className="fade-in-delay-2">
          <div style={styles.inputLabel}>Password</div>
          <div style={styles.inputWrap}>
            <div style={styles.iconLeft} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="11" width="18" height="10" rx="2" stroke="#6b7280" strokeWidth="1.2" />
                <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input}
              className="login-input"
              autoComplete="current-password"
              aria-label="Password"
            />
          </div>
        </label>

        <button type="submit" style={{ ...styles.button, opacity: loading ? 0.8 : 1 }} disabled={loading} aria-live="polite">
          {loading ? (
            <span style={styles.buttonContent}>
              <svg style={{ marginRight: 8, animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-3.36-6.36" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Signing in...
            </span>
          ) : (
            <span style={styles.buttonContent}>
              Sign in
            </span>
          )}
        </button>

        <div style={styles.meta} className="fade-in-delay-3">
          <label style={styles.remember}>
              {/* Added accentColor for the checkbox */}
            <input type="checkbox" style={{ marginRight: 8, accentColor: muiBlue }} /> Remember me
          </label>
          <a href="#" style={styles.forgot}>Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f4f6f8', // UPDATED: Matches App.js background
    padding: 20,
    fontFamily: 'Roboto, sans-serif', // UPDATED: Matches App.js font
  },
  card: {
    width: 400,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', // Slightly softer shadow
    padding: 32,
    boxSizing: 'border-box',
  },
  header: { textAlign: 'center', marginBottom: 24 },
  logoWrap: { display: 'inline-flex', padding: 8, borderRadius: 12, marginBottom: 16 },
  title: { margin: 0, fontSize: 24, fontWeight: 700, color: '#1e293b' },
  subtitle: { margin: '8px 0 0', fontSize: 14, color: '#64748b' },
  field: { display: 'block', marginTop: 20 },
  inputLabel: { fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  iconLeft: { position: 'absolute', left: 12, pointerEvents: 'none', color: '#94a3b8' },
  input: {
      width: '100%',
      padding: '12px 16px 12px 44px',
      borderRadius: 8,
      border: '1px solid #e2e8f0',
      fontSize: 15,
      boxSizing: 'border-box',
      transition: 'all 0.2s ease-in-out'
    },
  button: {
      marginTop: 24,
      width: '100%',
      padding: '12px 16px',
      borderRadius: 8,
      border: 'none',
      cursor: 'pointer',
      // UPDATED: Solid MUI Blue instead of indigo gradient
      background: '#1976d2',
      color: '#fff',
      fontWeight: 600,
      fontSize: 15,
      // UPDATED: Blue shadow
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
      transition: 'opacity 0.2s'
    },
  buttonContent: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  meta: { marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, color: '#64748b' },
  remember: { display: 'inline-flex', alignItems: 'center', cursor: 'pointer' },
  forgot: {
      // UPDATED: MUI Blue color
      color: '#1976d2',
      textDecoration: 'none',
      fontWeight: 500
    },
  error: { display: 'flex', alignItems: 'center', background: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: 8, marginBottom: 20, fontSize: 14, border: '1px solid #fecaca' },
};

// Helper to allow style overrides in the component
const localStyles = styles;