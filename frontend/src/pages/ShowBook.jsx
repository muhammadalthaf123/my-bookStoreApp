import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://my-bookstoreapp-6.onrender.com/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 mx-auto max-w-md">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="text-gray-600">{book._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Title:</span>
              <span className="text-gray-600">{book.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Author:</span>
              <span className="text-gray-600">{book.author}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Publish Year:</span>
              <span className="text-gray-600">{book.publishYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Create Time:</span>
              <span className="text-gray-600">{new Date(book.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Last Update Time:</span>
              <span className="text-gray-600">{new Date(book.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
