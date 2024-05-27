import { Link } from "react-router-dom";

export const StoreInfo = ({ storeDomainResource, storeImg, storeName }) => {
  return (
    <Link
      to={"/" + storeDomainResource}
      className="w-1/5 ml-40 mr-10 flex items-center text-ellipsis"
    >
      <section className="w-1/4 p-1 rounded dark:border-none">
        <img src={storeImg} className="rounded" />
      </section>
      <span
        title={storeName?.toUpperCase()}
        className="px-3 font-medium text-lg truncate"
      >
        {storeName?.toUpperCase()}
      </span>
    </Link>
  );
};
