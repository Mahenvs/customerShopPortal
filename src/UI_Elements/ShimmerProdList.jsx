import Button from "../UI_Elements/Button";

const ShimmerProdList = () => {
  const data = [
    { name: "1" },
    { name: "1" },
    { name: "1" },
    { name: "1" },
    { name: "1" },
    { name: "1" },
    { name: "1" },
  ];
  return data?.map((item, index) => {
    return (
      // <>
      <div
        key={index}
        className="
        shadow-lg py-12 flex gap-4 my-4"
      >
        <section className="w-1/4 p-4 "></section>
        <section className="w-2/4">
          <h1 className="text-lg text-gray-700 font-medium"></h1>
        </section>
        <section className="justify-end items-end self-end"></section>
      </div>
      // </>
    );
  });
};

export default ShimmerProdList;
