import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Toast.css';

// Short notes that rise from the bottom of the screen after something happens out of sight
// (an item added, a request that failed). One note shows at a time; a new one replaces it.
const ToastContext = createContext({ notify: () => {}, dismiss: () => {}, toast: null });

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);
    const timer = useRef(null);

    // tone: 'info' or 'error'. action: optional { label, to } link shown beside the message.
    const notify = useCallback((message, { tone = 'info', action } = {}) => {
        clearTimeout(timer.current);
        const id = Date.now();
        setToast({ id, message, tone, action });
        timer.current = setTimeout(() => {
            setToast((current) => (current && current.id === id ? null : current));
        }, tone === 'error' ? 6000 : 3500);
    }, []);

    const dismiss = useCallback(() => {
        clearTimeout(timer.current);
        setToast(null);
    }, []);

    return (
        <ToastContext.Provider value = {{ notify, dismiss, toast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}

// Rendered once inside the router (Layout), so the note's link can navigate.
export function ToastViewport() {
    const { toast, dismiss } = useContext(ToastContext);
    const { pathname } = useLocation();
    // No point offering "View cart" while already on the cart
    const action = toast?.action && toast.action.to !== pathname ? toast.action : null;

    return (
        <div className = "toast-viewport" aria-live = "polite">
            {toast && (
                <div key = {toast.id} className = {`toast toast-${toast.tone}`} role = {toast.tone === 'error' ? 'alert' : 'status'}>
                    <p className = "toast-message">{toast.message}</p>
                    {action && (
                        <Link to = {action.to} className = "toast-action" onClick = {dismiss}>{action.label}</Link>
                    )}
                    <button type = "button" className = "toast-close" aria-label = "Dismiss message" onClick = {dismiss}>
                        <svg viewBox = "0 0 16 16" aria-hidden = "true"><path d = "M3.5 3.5 L12.5 12.5 M12.5 3.5 L3.5 12.5" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
}
