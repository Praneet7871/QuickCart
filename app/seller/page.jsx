'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from 'axios';

const AddProduct = () => {

  const { getToken} = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [modelFiles, setModelFiles] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description',description);
    formData.append('category',category);
    formData.append('price',price);
    formData.append('offerprice',offerPrice);

    for (let i=0;i<files.length;i++) {
      formData.append('images', files[i]);
    }
    for (let i = 0; i < modelFiles.length; i++) {
  formData.append('models', modelFiles[i]);
}


    try {
      const token = await getToken();
      const {data} = await axios.post('/api/product/add', formData, {
        headers: {Authorization: `Bearer ${token}`}});
        if(data.success){
      toast.success(data.message);
      setFiles([]);
      setName('');
      setDescription('');
      setCategory('Earphone');
      setPrice('');
      setOfferPrice('');
    } else{
      toast.error(data.message);
    }
    } catch (error) {
       // Handle actual network/server errors here
  toast.error('Something went wrong. Please try again.');
  console.error('Error:', error);
    }



  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between text-white font-normal">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">

            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                <Image
                  key={index}
                  className="max-w-24 cursor-pointer rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={1000}
                  height={1000}
                />
              </label>
            ))}

          </div>

<div>
  <p className="text-base font-medium mt-4">3D Model Files</p>

  <label className="inline-block mt-2 px-4 py-2 cursor-pointer text-white rounded-md border border-white/20 backdrop-blur-md bg-white/10 hover:bg-white/20 transition duration-200">
    Choose Files To Upload
    <input
      type="file"
      accept=".glb,.obj,.fbx,.stl"
      multiple
      onChange={(e) => setModelFiles(Array.from(e.target.files))}
      className="hidden"
    />
  </label>
</div>





        </div>
        <div className="flex flex-col gap-1 max-w-md rounded-lg">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md rounded-lg">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>
        <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">
          ADD
        </button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;