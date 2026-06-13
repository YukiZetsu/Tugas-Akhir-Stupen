import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres, deleteGenre } from "../../../_service/genres";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    fetchData();
  }, []);

const handleDelete = async (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus genre ini?")) {
    try {
      await deleteGenre(id);
      const data = await getGenres();
      setGenres(data);
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-950 pt-24">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Kelola Genre
          </h1>
          <Link
            to="/admin/genres/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            Tambah Genre
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Nama Genre</th>
                <th className="px-6 py-3">Deskripsi</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <tr
                    key={genre.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {genre.name}
                    </td>
                    <td className="px-6 py-4">{genre.description}</td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <Link
                        to={`/admin/genres/edit/${genre.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(genre.id)}
                        className="text-red-600 dark:text-red-400 hover:underline font-medium ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Tidak ada data genre.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
