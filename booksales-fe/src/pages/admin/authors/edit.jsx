import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthors, updateAuthor } from "../../../_service/authors";

export default function AuthorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [negara, setNegara] = useState("");

  useEffect(() => {
    const fetchSingleAuthor = async () => {
      const allAuthors = await getAuthors();
      const currentAuthor = allAuthors.find((a) => a.id === parseInt(id));
      if (currentAuthor) {
        setName(currentAuthor.name);
        setEmail(currentAuthor.email || "");
        setNegara(currentAuthor.negara || "");
      }
    };
    fetchSingleAuthor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAuthor(id, { name, email, negara });
      navigate("/admin/authors");
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui author");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-950 pt-24">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Edit Author
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nama Author
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Negara
            </label>
            <input
              type="text"
              value={negara}
              onChange={(e) => setNegara(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/admin/authors")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
