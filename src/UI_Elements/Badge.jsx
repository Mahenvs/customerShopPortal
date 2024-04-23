const Badge = ({ value }) => {
  return (
    <div className="relative m-auto bottom-[1.5rem] left-[-0.7rem] right-[-1rem] z-20 ">
      <section className="flex w-5 h-5 rounded-full dark:bg-darkBadge text-white bg-red-600 justify-center absolute ">
        <span className="flex text-xs  m-auto text-white">{value}</span>
      </section>
    </div>
  );
};

export default Badge;
