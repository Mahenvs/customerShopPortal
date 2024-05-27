const Shimmer = () => {
  const data = [
    { name: "1" },
    { name: "1" },
    { name: "1" },
    { name: "1" },
    { name: "1" },
    { name: "1" },
    { name: "1" },
  ];
  return data?.map((item,index) => {
    return (
      
        <div key={index} className="shadow-lg p-1 flex gap-4 bg-gray-100 mb-1 ">
          <section className="w-1/4 p-4 "></section>
          <section className="w-2/4">
            <h1 className="text-lg text-gray-700 font-medium"></h1>
          </section>
          <section className="justify-end  items-end self-end">
            {/* <Button title="" class="px-2 h-10  h-fit p-2 "></Button> */}
          </section>
        </div>
      
    );
  });
};

export default Shimmer;
