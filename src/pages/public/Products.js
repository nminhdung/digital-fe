import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { BreadCumbs, Product } from "../../components";
import { FilterProduct, SortProduct } from "../../components";
import { Paginate } from "../../components";
import * as api from "../../api";
import { sorts } from "../../utils/constants";

const Products = () => {
  const { category } = useParams();
  const [data, setData] = useState(null);
  const [activeClick, setActiveClick] = useState("");
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  const fetchProductsByCategory = async (queries) => {
    if (category && category !== 'products') queries.category = category
    const response = await api.apiGetProducts(queries);

    if (response.success) {
      setData(response);
    }
  };
  const changeFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick("");
      } else {
        setActiveClick(name);
      }
    },
    [activeClick]
  );
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    let paramsList = [];
    for (let i of params.entries()) {
      paramsList.push(i);
    }
    const queries = {};
    for (let i of paramsList) {
      queries[i[0]] = i[1];
    }
    let priceQuery = {};
    if (queries.from && queries.to) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.from) {
        queries.price = { gte: queries.from };
      }
      if (queries.to) {
        queries.price = { lte: queries.to };
      }
    }

    delete queries.from;
    delete queries.to;
    console.log(queries);
    console.log(paramsList);

    const q = { ...queries, ...priceQuery };
  
    // console.log(q);
    fetchProductsByCategory({
      ...q,
      limit: +process.env.REACT_APP_ITEM_PERPAGE,
    });
    window.scrollTo(0, 0)
  }, [params, sort, category]);
  useEffect(() => {
    const paramsList = [];
    //giu lai cac truong filter truoc do
    for (let i of params.entries()) {
      paramsList.push(i);
    }
    const queries = {};
    for (let i of paramsList) {
      queries[i[0]] = i[1];
    }
    //###############################
    if (sort) {
      queries.sort = sort;
    } else delete queries.sort;
    // Nếu dùng fetch sau khi filter có thể fix được lỗi back về trang trước
    fetchProductsByCategory(queries);
    // Dùng navigate thì có thể tạo được nhứng field filter trên thanh search nhưng găp lỗi back về trang trước
    // navigate({
    //   pathname: location.pathname,
    //   search: createSearchParams(queries).toString(),
    // });
  }, [sort]);
  return (
    <div className="w-full">
      <div className="bg-gray-100 h-[81px] flex justify-center items-center">
        <div className="xl:w-main w-full">
          <h3 className="font-bold uppercase">{category}</h3>
          <BreadCumbs category={category} />
        </div>
      </div>
      <div className="xl:w-main w-full mx-auto border p-4 flex flex-col md:flex-row gap-1 md:gap-0 justify-between mt-8">
        <div className="md:flex-8 flex flex-col gap-2">
          <span className="font-semibold text-sm">Filter by:</span>
          <div className="flex gap-2">
            <FilterProduct
              name="price"
              activeClick={activeClick}
              changeFilter={changeFilter}
              fetchProductsByCategory={fetchProductsByCategory}
              type="input"
            />
            <FilterProduct
              name="color"
              activeClick={activeClick}
              changeFilter={changeFilter}
              fetchProductsByCategory={fetchProductsByCategory}
            />
          </div>
        </div>
        <div className="md:flex-2 flex flex-col gap-2 w-full">
          <span className="font-semibold text-sm">Sort by:</span>
          <SortProduct options={sorts} value={sort} changeValue={changeValue} />
        </div>
      </div>
      <div className="xl:w-main mx-auto mt-8">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-y-4 mx-[-10px]">
          {data?.listProduct?.map((item) => {
            return <Product key={item._id} productData={item} normal={true} />;
          })}
          {data?.listProduct?.length === 0 && <h1>Products are coming soon...</h1>}
        </div>
      </div>
      <div className="xl:w-main mx-auto mt-8 flex ">
        <Paginate totalProduct={data?.counts} />
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Products;
