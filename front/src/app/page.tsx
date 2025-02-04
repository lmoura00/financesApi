"use client"
import Header from "../components/header";
import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ModalLogin from '../components/modalLogin'; 
export default function HomePage() {
 const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <>
    <Header/>
      <div className="flex flex-row">
        <div className="mx-8 mt-20">
            <span className="text-white leading-tight text-7xl">
                Organize suas finanças <span className="block">Conquiste seus</span> <span className="block">objetivos.</span>
            </span>

            <button className="text-white bg-[#4B4040] px-4 py-2 rounded-lg mt-6" onClick={() => setIsLoginModalOpen(true)}>
                Comece Agora
            </button>

        </div>
        <div className=" ml-20 max-h-80 max-w-80 flex mt-24 min-w-500" >
            <DotLottieReact
              src="https://lottie.host/093afa5a-6fc8-4b73-909a-c1776db96f98/C07e9igkc4.lottie"
              loop
              autoplay
              />
        </div>
      </div>
      <ModalLogin
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <footer className="flex bottom-5 absolute text-center align-middle justify-center items-center content-center w-screen">
        <h3 className="text-white text-center">FEITO PARA A MATÉRIA DE DESENVOLVIMENTO FRONT-END</h3>
      </footer>

    </>
  );
}