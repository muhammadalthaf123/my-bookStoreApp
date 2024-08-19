import React, { useState, useEffect } from "react";
import BackButton from "../components/Backbutton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookstore-41.onrender.com/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check the console.");
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`https://my-bookstoreapp-6.onrender.com/books/${id}`, data)
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 mx-auto max-w-md">
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Publish Year</label>
              <input
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <button
              className="bg-sky-600 text-white py-2 px-4 rounded-lg shadow hover:bg-sky-700 transition duration-300 w-full"
              onClick={handleEditBook}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
