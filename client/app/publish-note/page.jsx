"use client";
import React, { useState } from "react";
import Lottie from "lottie-react";
import contributeanimation from "/public/contribute animation.json";
import { publishNotesAPI } from "@/apiCalls";
import { DOCUMENT_TYPES, SUBJECT_OPTIONS, BRANCH_OPTIONS } from "@/constant";
import ClipLoader from "react-spinners/ClipLoader";

import { isLoaded, isSignedIn, useUser } from "@clerk/nextjs";
import ScreenLoader from "@/components/ScreenLoader";
import { sendEmail } from "@/services/emailService";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [document_type, setDocumentType] = useState("");
  const [subject, setSubject] = useState("");
  const [author, setAuthor] = useState("Anonymous");
  const [branch, setBranch] = useState("");
  const [college, setCollege] = useState("");
  const [file, setFile] = useState(null);

  const [isUploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("document_type", document_type);
      formData.append("subject", subject);
      formData.append("subject_code", "000000");
      if (user) {
        formData.append("author", user.emailAddresses[0].emailAddress);
      }

      formData.append("branch", branch);
      formData.append("college", college);
      formData.append("file", file);

      setUploading(true);
      setFile(null);

      const response = await publishNotesAPI(formData);

      const messageContent = `Title: ${title}\nContent: ${content}\nCollege: ${college}\nSubject: ${subject}\nBranch: ${branch}`;
      await sendEmail(
        { name: "Edudoc", email: "edudoc.community@gmail.com" },
        user.emailAddresses[0].emailAddress,
        messageContent
      );

      setTitle("");
      setContent("");
      setFile("");
      setCollege("");
      setAuthor("");
      setDocumentType("");
      setSubject("");

      setSuccessMessage(response.message);
      alert(response.message + "\nConfirmation email has been sent to your registered mail!");
    } catch (error) {
      setErrorMessage("Failed to upload. Please try again.");
    }

    setUploading(false);
  };
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="w-screen h-screen bg-p[#fffff7] flex flex-col justify-center items-center">
        <h1 className="lg:text-2xl text-md font-light">
          Be logged in to contribute any document !
        </h1>
      </div>
    );
  }
  if (isUploading) {
    return <ScreenLoader />;
  }

  return (
    <div className="container mx-auto px-4 bg-[#fffff7]">
      <div className="flex lg:flex-row items-center justify-center gap-5 md:min-h-screen p-5">
        <div className="lg:w-1/2 h-full flex justify-center md:justify-start items-center pt-28">
          <Lottie
            animationData={contributeanimation}
            loop={true}
            className="w-[100%] h-auto hidden lg:block"
          />
        </div>
        <div className="lg:w-1/2 h-full flex flex-col justify-center items-center pt-20">
          <h2 className="text-3xl font-bold p-5">Contribute a Note</h2>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md shadow-2xl rounded px-8 pb-8 mb-4"
          >
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700">
                Content:
              </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="college" className="block text-gray-700">
                College:
              </label>
              <input
                type="text"
                id="college"
                name="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700">
                Subject:
              </label>
              <select
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="branch" className="block text-gray-700">
                Branch:
              </label>
              <select
                id="branch"
                name="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                {BRANCH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Type:</label>
              <div>
                {DOCUMENT_TYPES.map((type) => (
                  <label key={type.value}>
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={document_type === type.value}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="mr-2"
                    />
                    {type.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700">
                Upload PDF File:
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept=".pdf"
                name="file"
                className="mt-1 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded focus:outline-none"
            >
              {isUploading ? (
                <ClipLoader
                  color={"black"}
                  loading={isUploading}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="text-black w-10% h-10% border-1"
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
          {errorMessage && (
            <div className="text-red-600 my-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 my-4">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
