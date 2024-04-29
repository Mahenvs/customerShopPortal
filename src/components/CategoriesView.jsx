import useGetCategories from "../Hooks/useGetCategories";
import Card from "../UI_Elements/Card";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setActiveCategory } from "../store/productSlice";
import { Heading } from "../UI_Elements/Heading";

const CategoriesView = () => {
  useGetCategories();
  
  const dispatch = useDispatch();
  const categoriesList = useSelector((store) => store.product.categories);
  
  const handleActiveCategory = (id) => {
    dispatch(setActiveCategory(id));
  };
  return (
    <div className="flex flex-col mx-60 ">
      <Heading>Categories</Heading>
      <div className="list-none py-1 text-base  font-medium w-full pl-1 flex flex-row flex-wrap ">
        {categoriesList?.map((item, index) => {
          return (
            <Card
            key={index}
              class="p-14 flex"
              onClick={() => handleActiveCategory(item?.categoryId)}
            >
              <NavLink to={"../?categoryId=" + item?.categoryId} className="text-lg ">
                {item?.categoryName}({item?.productCount})
              </NavLink>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesView;
