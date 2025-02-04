
'use client'

import React, { useState } from 'react';
import { TbPigMoney } from 'react-icons/tb';
import ModalLogin from '../modalLogin/index';  
import ModalRegister from '../modalRegister/index';  

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <header className="flex justify-between w-full mt-8 px-8">
      <h2 className="flex items-center text-3xl font-bold text-white">
          <TbPigMoney className="text-4xl text-yellow-500 mr-2" />
          FinancePig
      </h2>
      <div className="text-white">
        <button className="bg-[#4B4040] px-4 py-2 rounded-lg mr-7"onClick={() => setIsLoginModalOpen(true)}>
          ENTRAR
        </button>
        <button className="bg-[#4B4040] px-4 py-2 rounded-lg" onClick={() => setIsRegisterModalOpen(true)}>
           CADASTRAR
        </button>
      </div>

      {/* Modals */}
      <ModalLogin
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <ModalRegister
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </header>
  );
};

export default Header;
