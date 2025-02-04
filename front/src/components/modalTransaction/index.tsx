import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { useCookies } from "next-client-cookies";

interface ModalTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTransactions: () => void;
}

const ModalTransaction: React.FC<ModalTransactionProps> = ({
  isOpen,
  onClose,
  refreshTransactions,
}) => {
  if (!isOpen) return null;

  const [type, setType] = useState<"entrada" | "saida">("entrada");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [token, setToken] = useState("");
  const variaveis = useCookies();

  useEffect(() => {
    const token = variaveis.get("token");
    setToken(token);

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, [variaveis]);

  const handleSubmit = async () => {
    if (!amount || !categoryId) {
      setMessage("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transation`,
        {
          amount: parseFloat(amount),
          type: type === "entrada" ? 0 : 1,
          categoryId: parseInt(categoryId),
          description: description.toString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Transação adicionada!");
      refreshTransactions();
      onClose();
    } catch (error) {
      console.error("Erro na API:", error);
      setMessage("Erro ao adicionar transação.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-[90%] max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl text-gray-400 hover:text-white"
          >
            <AiOutlineClose />
          </button>

          <h1 className="text-2xl font-bold mb-4 text-white">Nova Transação</h1>

          <div className="flex mb-4 space-x-4">
            <button
              onClick={() => setType("entrada")}
              className={`w-full py-2 rounded-lg transition duration-300 ease-in-out ${
                type === "entrada"
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 text-gray-300"
              } hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400`}
            >
              Entrada
            </button>
            <button
              onClick={() => setType("saida")}
              className={`w-full py-2 rounded-lg transition duration-300 ease-in-out ${
                type === "saida"
                  ? "bg-red-500 text-white"
                  : "bg-gray-600 text-gray-300"
              } hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400`}
            >
              Saída
            </button>
          </div>

          <input
            type="number"
            placeholder="Quantia"
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Selecione a Categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Descrição"
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="w-full bg-yellow-500 text-black py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Adicionar
          </button>

          {message && <p className="text-white mt-2">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default ModalTransaction;
