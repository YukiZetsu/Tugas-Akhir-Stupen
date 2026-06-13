import { useEffect, useState } from "react";
import { showBook } from "../../../_service/books";
import { useParams, Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

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
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
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

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <Link
                  to="/books"
                  className="text-white mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </Link>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
