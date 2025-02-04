
import { useState } from "react";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { AiOutlineClose } from "react-icons/ai";

interface ModalCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  refreshCategories: () => void;
}

const ModalCategory: React.FC<ModalCategoryProps> = ({
  isOpen,
  onClose,
  refreshCategories,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const cookies = useCookies();

  const handleSubmit = async () => {
    if (!name) {
      setMessage("O nome da categoria é obrigatório.");
      return;
    }

    try {
      const token = cookies.get("token");
      if (!token) return;

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Categoria adicionada com sucesso!");
      refreshCategories();  // Atualiza as categorias no dashboard
      onClose();  // Fecha o modal
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      setMessage("Erro ao adicionar categoria.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-white"
        >
          <AiOutlineClose />
        </button>

        <h1 className="text-2xl font-bold mb-4 text-white">Nova Categoria</h1>

        <input
          type="text"
          placeholder="Nome da Categoria"
          className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="w-full bg-yellow-500 text-black py-2 rounded-lg"
          onClick={handleSubmit}
        >
          Adicionar Categoria
        </button>

        {message && <p className="text-white mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default ModalCategory;
