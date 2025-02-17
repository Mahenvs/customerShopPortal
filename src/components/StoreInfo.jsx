import { Link } from "react-router-dom";

export const StoreInfo = ({ storeDomainResource, storeImg, storeName }) => {
  return (
    <Link
      to={"/" + storeDomainResource}
      className="flex w-1/5 mx-5 lg:ml-60  items-center text-ellipsis"
    >
      <section className="w-1/4 p-[1px] lg:p-1 rounded dark:border-none">
        <img src={storeImg} className=" rounded" />
      </section>
      <span
        title={storeName?.toUpperCase()}
        className="px-3 font-medium text-sm md:text-lg lg:text-2xl truncate"
      >
        {storeName?.toUpperCase()}
      </span>
    </Link>
  );
};
