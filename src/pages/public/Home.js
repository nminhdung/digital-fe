/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  Banner,
  DealDaily,
  Sidebar,
  FeatureProducts,
  NewArrivals,
  BestSeller,
  Loading
} from "../../components";

import icons from "../../utils/icons";

const { FaAngleRight } = icons;

const Home = () => {
  const newProducts = useSelector((state) => state.products.products);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const { categories, brands } = useSelector((state) => state.app)
  const navigate = useNavigate()
  console.log(brands)
  return (
    <>
      <div className=" w-full xl:w-main grid grid-cols-10 gap-4">
        <div className="hidden md:block md:col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-10 md:col-span-7 ">
          <Banner />
        </div>
      </div>

      <div className="w-full xl:w-main grid grid-cols-10 gap-4 mt-6">
        <div className="col-span-10 lg:col-span-3">
          <DealDaily />
        </div>

        <div className=" col-span-10 lg:col-span-7 ">
          <BestSeller />
        </div>
      </div>
      <div className="my-8 w-full xl:w-main">
        <FeatureProducts />
      </div>
      <div className="my-8 w-full xl:w-main">
        <NewArrivals products={newProducts} />
      </div>
      <div className="my-8 w-full xl:w-main">
        <h3 className="font-semibold capitalize text-[20px] border-b-2 border-main cursor-pointer text-black">
          hot collections
        </h3>
        {categories.length === 0 && <div className="flex items-center justify-center h-full mt-8"><Loading /></div>}
        <div className="grid lg:grid-cols-3 gap-4 mt-4">
          {categories.map((cate) => {
            return (
              <div key={cate._id} className="border flex p-8 gap-4 w-full shadow-md">
                <img
                  src={cate.image}
                  alt="cate-image"
                  className="object-contain min-w-[180px] max-h-[150px] "
                />
                <div className="text-gray-700">
                  <h3 className="text-base uppercase font-semibold">
                    {cate.title}
                  </h3>

                  <ul>
                    {brands.map((brand, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center gap-1 text-gray-500 cursor-pointer hover:underline"
                          onClick={() => {
                            navigate({
                              pathname: `/${cate.title}`,
                              search: createSearchParams({
                                brand: brand.title,
                              }).toString()
                            })
                          }}
                        >
                          <FaAngleRight size={15} />
                          {brand.title}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </>
  );
};

export default Home;
