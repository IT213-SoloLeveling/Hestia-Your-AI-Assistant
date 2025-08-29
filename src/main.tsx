import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // Service Worker registered successfully
        console.log('SW registered successfully');
      })
      .catch((registrationError) => {
        // Service Worker registration failed
        console.log('SW registration failed:', registrationError);
      });
  });
} else {
  console.log('Service Worker not supported');
}

createRoot(document.getElementById("root")!).render(<App />);
