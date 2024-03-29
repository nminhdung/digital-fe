import React, { useState, useEffect } from "react";
import * as api from "../../api";
import Loading from "../Common/Loading";
import ProductCard from "./ProductCard";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await api.apiGetProducts({
      limit: 9,
      sort: "-totalRatings",
    });
    if (res.success) {
      setProducts(res.listProduct);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="uppercase text-[20px] font-semibold py-4  border-b-2 border-main">
        Feature Products
      </h3>
      {products?.length === 0 ? <div className="flex items-center justify-center h-full mt-8"><Loading /></div> :
        <div className="grid lg:grid-cols-3  gap-6   mt-4">

          {products?.map((product) => {
            return <ProductCard key={product._id} data={product} />;
          })}
        </div>
      }

      <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-6">
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt="banner"
          className="w-full h-full object-cover col-span-2 row-span-2"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661"
          alt="banner"
          className="w-full h-full object-cover col-span-1 row-span-1"
        />{" "}
        <img
          className="w-full h-full object-cover col-span-1 row-span-2"
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt="banner"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661"
          alt="banner"
          className="w-full h-full object-cover  col-span-1 row-span-1"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
