"use client";
import { useState } from "react";
import Image from "next/image";
import { TbPigMoney } from "react-icons/tb";
import ProfileModal from "../profileModal";

const HeaderProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Logo com Ícone */}
        <h2 className="flex items-center text-3xl font-bold text-white">
          <TbPigMoney className="text-4xl text-yellow-500 mr-2" />
          FinancePig
        </h2>

        {/* Botão do Perfil */}
        <button onClick={() => setIsProfileOpen(true)} className="flex items-center space-x-3">
          <Image
            src="/profile.jpg"
            alt="Foto de perfil"
            width={40}
            height={40}
            className="rounded-full border-2 border-yellow-500"
          />
        </button>
      </div>

      {/* Modal de Perfil */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
};

export default HeaderProfile;
