import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post(`http://localhost:5656/books/`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console.");
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-4">
      <BackButton />
      <h1 className="text-3xl font-semibold my-6 text-gray-800">Create Book</h1>
      {loading && <Spinner />}
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <button
          onClick={handleSaveBook}
          className="w-full bg-sky-600 text-white py-2 rounded-lg shadow hover:bg-sky-700 transition duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
