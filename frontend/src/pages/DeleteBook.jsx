import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://my-bookstoreapp-6.onrender.com/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check the console.");
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white border border-red-300 rounded-lg shadow-md p-6 mx-auto max-w-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Are you sure you want to delete this book?
          </h3>
          <p className="text-gray-600 mb-6">
            This action cannot be undone.
          </p>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-300 w-full"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
