import { getHeaders } from "../Utilities/getHeaders";

const getData = ({ params }) => {
  console.log(params);

  const url = import.meta.env.VITE_API_GET_STORE_CUST + params.storeDomain;

  const fetchProduct = async (storeId) => {
    const searchProdUrl =
      import.meta.env.VITE_PRODUCT_SEARCH +
      storeId +
      "/products/search/" +
      params.product;
    try {
      const response = await fetch(searchProdUrl, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();

      document.title = result.name;

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();

      const productResponse = await fetchProduct(result.id);
      document.title = result.name;
      return {
        ...productResponse[0],
        ...result,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return fetchData();
};

export default getData;
