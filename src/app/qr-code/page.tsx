"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react"; // Importando corretamente
import FooterSection from "@/components/FooterSection";
import NavbarSection from "@/components/NavbarSection";
import { ArrowLeft } from "lucide-react";

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [qrCodeValue, setQrCodeValue] = useState<string | null>("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme || "dark");
    }
  }, [theme]);

  const handleGenerate = () => {
    if (!inputValue) {
      toast.error("Por favor, preencha o link antes de gerar o QR Code");
      return;
    }
    setQrCodeValue(inputValue);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen relative overflow-hidden">
      <motion.div
        className="pattern absolute inset-0 -z-10 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <NavbarSection />

      {!qrCodeValue && (
        <motion.div
          className="max-w-screen-sm w-full h-full flex flex-col space-y-2 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col items-center justify-center space-y-3 my-5">
            <h1 className="text-4xl font-semibold tracking-tighter">Gerador de QRCode</h1>
            <p className="text-lg text-zinc-700 dark:text-zinc-400 font-normal leading-6 tracking-tighter text-center">
              Preencha o link que deseja
              <br />
              para criar um QRCode
            </p>
          </div>
          <div className="flex space-x-2 w-full max-w-[250px] mx-auto">
            <Input
              type="text"
              placeholder="https://"
              className="bg-background"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <Button className="w-full max-w-[250px] mt-8" onClick={handleGenerate}>
            Criar
          </Button>
        </motion.div>
      )}

      {qrCodeValue && (
        <motion.div
          className="max-w-screen-sm w-full h-full flex flex-col space-y-2 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant='link' onClick={() => setQrCodeValue(null)}>
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <QRCodeSVG
            value={qrCodeValue}
            size={200}
            fgColor={theme === "dark" ? "white" : "black"} // Cor do código QR
            bgColor={theme === "dark" ? "black" : "white"} // Cor de fundo
          />
        </motion.div>
      )}

      <FooterSection toggleTheme={toggleTheme} />
    </div>
  );
};

export default QRCodeGenerator;
