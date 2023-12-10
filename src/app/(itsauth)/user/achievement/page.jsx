"use client";

import { UploadButton, UploadDropzone, Uploader } from "@/lib/uploadthing";
import { FileText, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AchievementPage() {

  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const { handleSubmit, register, reset } = useForm();
  async function onSubmit(data) {
    data.productImageUrl = imageUrl;
    data.pdfUrl = pdfUrl;
    console.log(data);
  }


  return (
    <>
      <div className="col-lg-12">
        <h1>Achievement Page</h1>
        <div className="w-full max-w-3xl p-8 my-16 bg-white border border-gray-200 rounded-lg shadow mx-auto">
      
      <UploadButton
        endpoint="profilePicture"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
            >
              Product Title
            </label>
            <div className="mt-2">
              <input
                {...register("title")}
                type="text"
                name="title"
                id="title"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                placeholder="Type the Course title"
              />
            </div>
          </div>
          <div className="col-span-full">
            <div className="flex justify-between items-center mb-4">
              <label
                htmlFor="course-image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload PDF
              </label>
              {pdfUrl && (
                <button
                  onClick={() => setPdfUrl("")}
                  type="button"
                  className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Change PDF</span>
                </button>
              )}
            </div>
            {pdfUrl ? (
              <a
                className="flex space-x-3 items-center text-purple-600"
                target="_blank"
                href={pdfUrl}
              >
                <FileText />
                <span>View PDF</span>
              </a>
            ) : (
              <UploadDropzone
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                  setPdfUrl(res[0].fileUrl);
                  // Do something with the response
                  console.log("Files: ", res);
                  alert("Upload Completed");
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            )}
          </div>
          <div className="col-span-full">
            <div className="flex justify-between items-center mb-4">
              <label
                htmlFor="course-image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Image
              </label>
              {imageUrl && (
                <button
                  onClick={() => setImageUrl("")}
                  type="button"
                  className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Change Image</span>
                </button>
              )}
            </div>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Product image"
                width={1000}
                height={667}
                className="w-full h-64 object-cover"
              />
            ) : (
              <UploadDropzone
                endpoint="productImage"
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].fileUrl);
                  // Do something with the response
                  console.log("Files: ", res);
                  alert("Upload Completed");
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span>Save Product</span>
        </button>
      </form> */}
    </div>
      </div>
    </>
  );
}
