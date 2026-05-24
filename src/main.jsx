import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { App } from '@/App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
