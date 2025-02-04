"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';  

interface ModalRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalRegister: React.FC<ModalRegisterProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async() => {

    if (!name || !cpf || !email || !phone || !password) {
      setMessage('Todos os campos são obrigatórios.');
      return;
  }

  try {
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
              name,
              cpf,
              email,
              phone,
              password,
          }
      );
      setMessage('Usuário criado com sucesso!');
      console.log('Resposta da API:', response.data);
  } catch (error) {
      console.error('Erro na API:', error);
      setMessage(error.response?.data?.message || 'Ocorreu um erro durante o registro.');
  }
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Senha:', password);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
        {/* Ícone de Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose />
        </button>

        <h1 className="text-2xl font-bold mb-4">Cadastre-se</h1>

        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
            CPF
          </label>
          <input
            id="senha"
            type="string"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Digite seu cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            id="telefone"
            type="telefone"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        

        <div className="flex justify-between items-center">
          <button
            className="bg-[#4B4040] text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ModalRegister;
