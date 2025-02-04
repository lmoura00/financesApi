"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ModalTransaction from "../../components/modalTransaction";
import ModalCategory from "../../components/modalCategory";
import { useCookies } from "next-client-cookies";
import { useAuth } from "../../components/contexts/AuthContext";
import HeaderProfile from "../../components/headerProfile";
import { format } from "date-fns";
import { Bar, Pie } from "react-chartjs-2";  
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { useRouter } from "next/navigation";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Transaction {
  id: number;
  type: "entrada" | "saida";
  amount: number;
  category: string;
  description: string | null;
  date: string;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [predictedBalance, setPredictedBalance] = useState(0);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const { user } = useAuth();
  const cookies = useCookies();
  const routes = useRouter()
  useEffect(() => {
    if (user) {
      fetchTransactions();
      categoryFetch();
    }
    else{
      routes.push('/')
    }
  }, [user]);

  const categoryFetch = async () => {
    try {
      const token = cookies.get("token");
      if (!token) return;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Resposta de CATEGORIAS da API:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = cookies.get("token");
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transation`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const categories = await fetchCategories();

      const formattedTransactions = response.data.map((t: any) => {
        const category = categories.find((c) => c.id === t.categoryId);
        const categoryName = category ? category.name : `Categoria não encontrada para ID: ${t.categoryId}`;
        const date = new Date(t.createdAt);
        const formattedDate = isNaN(date.getTime()) ? "Data inválida" : format(date, "dd/MM/yyyy");

        return {
          ...t,
          type: t.type === 0 ? "entrada" : "saida",
          date: formattedDate,
          category: categoryName,
        };
      });

      setTransactions(formattedTransactions);
      calculateBalances(formattedTransactions);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = cookies.get("token");
      if (!token) return [];
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      return [];
    }
  };

  const calculateBalances = (transactions: Transaction[]) => {
    const totalEntrada = transactions.reduce(
      (total, t) => (t.type === "entrada" ? total + t.amount : total),
      0
    );

    const totalSaida = transactions.reduce(
      (total, t) => (t.type === "saida" ? total + t.amount : total),
      0
    );

    const saldoAtual = totalEntrada;
    const saldoPrevisto = saldoAtual - totalSaida;

    setBalance(saldoAtual);
    setPredictedBalance(saldoPrevisto);
  };

  const chartData = {
    labels: ["Entrada", "Saída"],
    datasets: [
      {
        label: "Valor",
        data: [
          transactions.filter((t) => t.type === "entrada").reduce((sum, t) => sum + t.amount, 0),
          transactions.filter((t) => t.type === "saida").reduce((sum, t) => sum + t.amount, 0),
        ],
        backgroundColor: ["rgba(34, 197, 94, 0.5)", "rgba(239, 68, 68, 0.5)"],  
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],  
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <HeaderProfile />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        {/* INICIO DO TOPBAR */}
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Sua situação financeira:</h1>
            <div className="space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
              >
                + Adicionar Transação
              </button>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                + Adicionar Categoria
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400">Saldo Atual</p>
              <h2 className="text-xl font-bold">R${balance.toFixed(2)}</h2>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400">Saldo Previsto</p>
              <h2
                className={`text-xl font-bold ${predictedBalance >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                R${predictedBalance.toFixed(2)}
              </h2>
            </div>
          </div>
          {/* FINAL DO TOPBAR */}

          {/* INICIO DA TABELA */}
          <h2 className="text-lg font-bold mb-4">Histórico</h2>
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2">Tipo</th>
                  <th className="py-2">Descrição</th>
                  <th className="py-2">Quantia</th>
                  <th className="py-2">Categoria</th>
                  <th className="py-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-2 text-center text-gray-400">
                      Não há transações cadastradas
                    </td>
                  </tr>
                ) : (
                  transactions.map((t) => (
                    <tr key={t.id} className="border-b border-gray-600">
                      <td className={t.type === "entrada" ? "text-green-400" : "text-red-400"}>
                        {t.type === "entrada" ? "Entrada" : "Saída"}
                      </td>
                      <td className="py-2">{t.description || "Sem descrição"}</td>
                      <td className="py-2">R${t.amount.toFixed(2)}</td>
                      <td className="py-2">{t.category}</td>
                      <td className="py-2">{t.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* FIM DA TABELA */}

          {/* GRÁFICO */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Entradas e Saídas</h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <Bar data={chartData} options={{ responsive: true }} />
            </div>
          </div>
          {/* FIM DO GRÁFICO */}
        </div>

        <ModalTransaction
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refreshTransactions={fetchTransactions}
        />

        <ModalCategory
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          refreshCategories={categoryFetch}
        />
      </div>
    </>
  );
};

export default Dashboard;
