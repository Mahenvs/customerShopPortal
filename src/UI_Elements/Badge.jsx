const Badge = ({ value }) => {
  return (
    <div className="relative m-auto bottom-[1.5rem] left-[0.3rem] z-20 ">
      <section className="flex w-6 h-6 rounded-full bg-red-400 justify-center absolute ">
        <span className="flex text-sm  m-auto text-white">{value}</span>
      </section>
    </div>
  );
};

export default Badge;
