import useGetCategories from "../Hooks/useGetCategories";
import {useSelector} from 'react-redux';
import Shimmer from "./Shimmer";

const Categories = () =>{
    useGetCategories();

    const categories = useSelector((store) => store.product.categories)
    console.log(categories);
    return <>
    {!categories ? <Shimmer/> :
        categories.map((item,index) => {
        return (<div key={index} className="list-none py-2 text-base font-medium px-1">
            <li className="px-1 py-2 text-blue-400">{item?.categoryName}
            ({"2"})</li>
            {/* <li className="px-1 py-2 ">Electronics(1)</li> */}
        </div>)
        })
    }
    </>
}

export default Categories;