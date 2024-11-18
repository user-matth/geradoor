"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatCPF, generateCPF } from './utils/cpf_gen';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

const CPFGenerator: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    const newCpf = generateCPF();
    setCpf(newCpf);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cpf);
    setCopied(true);
    toast("Deu tudo certo", {
      description: "CPF copiado para a área de transferência",
      action: {
        label: "Cancelar",
        onClick: () => console.log("Cancelar"),
      },
    });
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="max-w-[500px] w-full h-full flex flex-col space-y-4 items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-6 my-5">
          <h1 className="text-4xl font-semibold tracking-tighter">Gerador de CPF</h1>
          <p className="text-lg text-muted-foreground font-normal leading-6 tracking-tighter text-center">Utilize nosso gerador de cpf, basta clicar em "Gerar CPF" e pronto, um novo número de CPF válido será gerado.</p>
        </div>
        <Button className='w-full max-w-[300px] mt-8' onClick={handleGenerate}>Gerar CPF</Button>
        <div className="flex space-x-2 w-full max-w-[300px] mx-auto">
          <Input readOnly type="text" placeholder="CPF" className='bg-background' value={formatCPF(cpf)} />
          <Button variant="outline" onClick={copyToClipboard}>
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CPFGenerator;
