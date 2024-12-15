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

const Sidebar: React.FC = () => {
  const currentPath = usePathname();

  return (
    <div className="bg-[#111] h-full dark:bg-primary-dark-2 pointer-events-auto relative w-[280px] flex flex-col items-center overflow-y-scroll p-6 sm:overflow-y-visible">
      <div className="mx-auto hidden lg:flex md:flex flex-col items-start w-full space-y-2">
        <AnimatedLink href={'/'} className={currentPath === '/' ? '' : 'text-zinc-500' + 'hover:text-white transition-colors text-sm'}>CPF</AnimatedLink>
        <AnimatedLink href={'/cnpj'} className={currentPath === '/cnpj' ? '' : 'text-zinc-500' + ' hover:text-white transition-colors text-sm'}>CNPJ</AnimatedLink>
        <AnimatedLink href={'/cartao-de-credito'} className={currentPath === '/cartao-de-credito' ? '' : 'text-zinc-500' + ' hover:text-white transition-colors text-sm'}>Cartão de Crédito</AnimatedLink>
        <AnimatedLink href={'/qr-code'} className={currentPath === '/qr-code' ? '' : 'text-zinc-500' + ' hover:text-white transition-colors text-sm'}>QRCode</AnimatedLink>
        <AnimatedLink href={'/whatsapp'} className={currentPath === '/whatsapp' ? '' : 'text-zinc-500' + ' hover:text-white transition-colors text-sm'}>Whatsapp</AnimatedLink>
      </div>
    </div>
  );
};

export default Sidebar;
