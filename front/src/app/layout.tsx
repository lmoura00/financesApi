"use client"
import "./globals.css";
import HeaderProfile from "../components/headerProfile";
import HomePage from "./home/page";
import Header from "../components/header";
import { AuthProvider, useAuth } from "../components/contexts/AuthContext";
import {useCookies} from 'next-client-cookies'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookies = useCookies()
  const [token, setToken] = useState('')
  const router = useRouter()
  useEffect(()=>{
    const token = cookies.get("token")
    setToken(token)
    const obj = JSON.parse(localStorage.getItem('user'))
    console.log(obj)
    if(obj){
      router.push('/dashboard')
    }

  },[])

  return (
    <AuthProvider>
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}