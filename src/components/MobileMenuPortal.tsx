import React from 'react';
import ReactDOM from 'react-dom';

interface MobileMenuPortalProps {
  children: React.ReactNode;
}

const MobileMenuPortal: React.FC<MobileMenuPortalProps> = ({ children }) => {
  if (typeof window === 'undefined') return null;
  return ReactDOM.createPortal(children, document.body);
};

export default MobileMenuPortal; 