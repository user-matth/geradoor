"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { DoorOpen, Minus } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';
import { AnimatedLink } from './PageTransition';

const Navbar: React.FC = () => {
  const currentPath = usePathname();
  return (
    <motion.div
      className="w-screen border-b border-[#2b2b2b] bg-[#111111] flex p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className='w-full flex flex-row'>
        <div className="flex items-center gap-2">
          <Button variant="link" className='bg-yellow-500 shadow-md shadow-[#ebb305] h-9 w-9 rounded-lg'>
            <DoorOpen className="w-4 h-4" />
          </Button>
          Geradoor
        </div>
        <div className="ms-auto hidden lg:inline md:inline">
          <Button variant="ghost" asChild>
            <AnimatedLink href={'/'} className={currentPath === '/' ? '' : 'text-zinc-500'}>
              CPF
            </AnimatedLink>
          </Button>
          <Button variant="ghost" asChild>
            <AnimatedLink href={'/cnpj'} className={currentPath === '/cnpj' ? '' : 'text-zinc-500'}>
              CNPJ
            </AnimatedLink>
          </Button>
          <Button variant="ghost" asChild>
            <AnimatedLink href={'/cartao-de-credito'} className={currentPath === '/cartao-de-credito' ? '' : 'text-zinc-500'}>
              Cartão de Crédito
            </AnimatedLink>
          </Button>
          <Button variant="ghost" asChild>
            <AnimatedLink href={'/qr-code'} className={currentPath === '/qr-code' ? '' : 'text-zinc-500'}>
              QRCode
            </AnimatedLink>
          </Button>
          <Button variant="ghost" asChild>
            <AnimatedLink href={'/whatsapp'} className={currentPath === '/whatsapp' ? '' : 'text-zinc-500'}>
              Whatsapp
            </AnimatedLink>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
