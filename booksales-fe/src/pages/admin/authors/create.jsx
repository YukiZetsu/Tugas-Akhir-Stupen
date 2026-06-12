import { useState } from "react";
import { createAuthor } from "../../../_service/authors";
import { useNavigate } from "react-router-dom";

export default function AuthorCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [negara, setNegara] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAuthor({ name, email, negara });
      navigate("/admin/authors");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan author! Pastikan email belum terdaftar.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a New Author
        </h2>
        <form onSubmit={handleSubmit}>
          {/* INPUT 1: NAME */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Type author name (e.g. Tere Liye)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* INPUT 2: EMAIL */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="e.g. tereliye@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* INPUT 3: NEGARA */}
          <div className="mb-4">
            <label
              htmlFor="negara"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country (Negara)
            </label>
            <input
              type="text"
              id="negara"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="e.g. Indonesia, Japan"
              value={negara}
              onChange={(e) => setNegara(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            Save Author
          </button>
        </form>
      </div>
    </section>
  );
}
