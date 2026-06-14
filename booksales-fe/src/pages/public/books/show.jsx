import { useEffect, useState } from "react";
import { showBook } from "../../../_service/books";
import { useParams, Link, useNavigate } from "react-router-dom";
import { bookImageStorage } from "../../../_api";
import { createTransaction } from "../../../_service/transactions";

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await showBook(id);
        setBook(bookData);
      } catch (error) {
        console.error("Gagal mengambil detail buku:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (quantity > book.stock) {
      alert(
        `Stok tidak mencukupi! Maksimal pembelian adalah ${book.stock} buku.`,
      );
      return;
    }

    try {
      const payload = {
        book_id: id,
        quantity: quantity,
      };

      await createTransaction(payload);
      alert("Pembelian berhasil!");
    } catch (error) {
      console.log(error);
      alert("Gagal melakukan pembelian, silakan coba lagi.");
    }
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Loading detail buku...
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased min-h-screen">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="mb-6">
            <Link
              to="/books"
              className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              ← Kembali ke Daftar Buku
            </Link>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="mx-auto h-full object-cover rounded"
                src={`${bookImageStorage}/books/${book.cover_photo}`}
                alt={book.title}
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {book.title}
              </h1>

              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Rp {Number(book.price).toLocaleString("id-ID")}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                  <p>
                    Genre:{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {book.genre?.name || "No Genre"}
                    </span>
                  </p>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <p>
                    Stok:{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {book.stock}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Jumlah Pembelian
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min={1}
                      max={book.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mt-1 block w-24 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 text-center block"
                  >
                    Beli Sekarang
                  </button>
                </form>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400 leading-relaxed">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
