"use client"
import { Dispatch, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  if (!isOpen) return null;
  const variavel = useCookies()
  const rota = useRouter()
  const {logout, user} = useAuth()

  const deleteUser = () =>{
    variavel.remove('token')
    variavel.remove('next-auth.csrf-token')
    variavel.remove('next-auth.callback-url')
    logout()
    localStorage.removeItem("user"); 
    rota.push('/')
  } 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {/* Botão de Fechar */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black">Meu Perfil</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes/>
          </button>
        </div>

        {/* Informações do Usuário */}
        <div className="mt-4 text-center">
          <img
            src="/profile.jpg"
            alt="Foto de perfil"
            className="w-20 h-20 rounded-full mx-auto border-2 border-yellow-500"
          />
          <h4 className="text-xl font-semibold mt-2 text-black">{user.name}</h4>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <p className="text-gray-600 text-sm">{user.cpf}</p>
          <p className="text-gray-600 text-sm">{user.phone}</p>
        </div>

        {/* Botão de Logout */}
        <button
          onClick={() => {
            console.log("Usuário deslogado"); 
            deleteUser()
            onClose();
          }}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg"
        >
          Deslogar
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
