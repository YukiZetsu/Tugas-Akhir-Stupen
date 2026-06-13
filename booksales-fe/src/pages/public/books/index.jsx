import { useEffect, useState } from "react";
import { getBooks } from "../../../_service/books";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await getBooks();
      if (booksData && booksData.data) {
        setBooks(booksData.data);
      } else {
        setBooks(booksData);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="bg-gray-50 pt-28 pb-8 min-h-screen antialiased dark:bg-gray-900 md:pt-32 md:pb-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
            Daftar Koleksi Buku
          </h1>

          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {Array.isArray(books) && books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-56 w-full">
                      <Link to={`/books/show/${book.id}`}>
                        <img
                          className="mx-auto h-full object-cover rounded"
                          src={`${bookImageStorage}/books/${book.cover_photo}`}
                          alt={book.title}
                        />
                      </Link>
                    </div>

                    <div className="pt-6">
                      <Link
                        to={`/books/show/${book.id}`}
                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        {book.title}
                      </Link>

                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          Genre:{" "}
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {book.genre?.name || "No Genre"}
                          </span>
                        </p>

                        <span className="text-gray-300 dark:text-gray-600">
                          |
                        </span>

                        <p>
                          Stok:{" "}
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {book.stock}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
                      Rp {Number(book.price).toLocaleString("id-ID")}
                    </p>

                    <Link
                      to={`/books/show/${book.id}`}
                      className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      View Detail
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-4">
                No books found
              </p>
            )}
          </div>

          <div className="w-full text-center mt-6">
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Show more
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
