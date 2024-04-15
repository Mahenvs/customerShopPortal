const Badge = ({ value }) => {
  return (
    <div className="relative m-auto bottom-[1.5rem] left-[0.3rem] z-20 ">
      <section className="flex w-6 h-6 rounded-full dark:bg-darkBadge bg-buttonBg text-otherColor justify-center absolute ">
        <span className="flex text-sm  m-auto text-white">{value}</span>
      </section>
    </div>
  );
};

export default Badge;
