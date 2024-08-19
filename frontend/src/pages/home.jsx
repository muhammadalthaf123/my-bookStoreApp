import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5656/books`)
      .then((response) => {
        if (response.data) {
          setBooks(response.data);
        } else {
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setBooks([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Books List</h1>
          <Link to="/books/create" className="flex items-center gap-2 bg-sky-600 text-white p-2 rounded-lg shadow hover:bg-sky-700 transition duration-300">
            <MdOutlineAddBox className="text-2xl" />
            <span className="text-lg font-medium">Add Book</span>
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-700">No</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-700">Title</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-700 hidden md:table-cell">Author</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-700 hidden md:table-cell">Publish Year</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-700">Operations</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <tr key={book._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b border-gray-300 text-center text-gray-600">{index + 1}</td>
                      <td className="py-2 px-4 border-b border-gray-300 text-center text-gray-600">{book.title}</td>
                      <td className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 hidden md:table-cell">{book.author}</td>
                      <td className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 hidden md:table-cell">{book.publishYear}</td>
                      <td className="py-2 px-4 border-b border-gray-300 text-center">
                        <div className="flex justify-center gap-4">
                          <Link to={`/books/details/${book._id}`} className="text-green-600 hover:text-green-800 transition duration-300">
                            <BsInfoCircle className="text-xl" />
                          </Link>
                          <Link to={`/books/edit/${book._id}`} className="text-yellow-600 hover:text-yellow-800 transition duration-300">
                            <AiOutlineEdit className="text-xl" />
                          </Link>
                          <Link to={`/books/delete/${book._id}`} className="text-red-600 hover:text-red-800 transition duration-300">
                            <MdOutlineDelete className="text-xl" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 px-4 text-center text-gray-600">No books available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
