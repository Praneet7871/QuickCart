'use client'
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {

  const { router ,getToken ,user} = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSellerProduct = async () => {
    try {
       const token = await getToken();
       const {data}= await axios.get('/api/product/seller-list', {headers:{Authorization: `Bearer ${token}`}})
      if(data.success){
        setProducts(data.products);
      setLoading(false);
      } else {
        toast.error(data.message);
   
      } }catch (error) {
      toast.error(error.nessage)
    }
  }

  useEffect(() => {
    if(user){

      fetchSellerProduct();
    }
  }, [user])

  return (
  <div className="flex-1 min-h-screen flex flex-col justify-between">
    {loading ? (
      <Loading />
    ) : (
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-2xl font-semibold text-white">All Products</h2>

        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-md mx-auto">
          <table className="w-full table-fixed text-sm text-gray-200">
            <thead className="uppercase tracking-wide text-left border-b border-white/10">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-4">Product</th>
                <th className="px-4 py-4 max-sm:hidden">Category</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4 max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-t border-white/10 hover:bg-white/5 transition-colors duration-150"
                >
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center gap-3">
                    <div className="bg-gray-300/20 p-2 rounded-lg">
                      <Image
                        src={product.image[0]}
                        alt="product Image"
                        className="w-16 h-16 object-cover rounded-md"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <span className="truncate">{product.name}</span>
                  </td>

                  <td className="px-4 py-3 max-sm:hidden">{product.category}</td>

                  <td className="px-4 py-3">${product.offerPrice}</td>

                  <td className="px-4 py-3 max-sm:hidden">
                    <button
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/90 hover:bg-orange-600 transition rounded-md text-sm"
                    >
                      <span className="hidden md:inline">Visit</span>
                      <Image
                        className="h-4 w-4"
                        src={assets.redirect_icon}
                        alt="redirect_icon"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
    <Footer />
  </div>
);

};

export default ProductList;