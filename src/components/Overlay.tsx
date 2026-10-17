// A full-screen panel with a title and a close button. Escape also closes it.

import { useEffect, type ReactNode } from 'react';

export function Overlay({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="overlay-inner">
        <header className="overlay-header">
          <h2>{title}</h2>
          <button onClick={onClose} autoFocus>
            Close
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
