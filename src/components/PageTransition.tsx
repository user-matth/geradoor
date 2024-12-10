"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AnimatedLinkProps {
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
}

export function AnimatedLink({ 
  href, 
  className = '', 
  target, 
  children, 
  ...props 
}: AnimatedLinkProps) {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    router.push(href);
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick} 
      className={className}
      {...(target ? { target } : {})} 
      {...props}
    >
      {children}
    </Link>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsExiting(true);
      return "Are you sure?"; // This message won't actually show in modern browsers
    };

    // Intercept all clicks on anchor tags
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        setIsExiting(true);
        
        setTimeout(() => {
          window.location.href = anchor.href;
        }, 300);
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isExiting ? 0 : 1,
        y: isExiting ? 20 : 0,
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
      style={{ 
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      {children}
    </motion.div>
  );
}