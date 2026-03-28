const Logo = ({ toggleSidebar, isDarkMode }) => {
  return (
    <div
      onClick={toggleSidebar}
      className={`size-10 aspect-square border-2 ${
        isDarkMode ? "border-zinc-300" : "boder-zinc-700"
      }  rounded-full p-2`}
    >
      <div
        className={`relative size-full border-4 ${
          isDarkMode ? "border-zinc-300" : "border-zinc-700"
        } rounded-full`}
      >
        <span className=" absolute -right-1.5 -top-1 size-1 bg-zinc-600 rounded-full"></span>
      </div>
    </div>
  );
};

export default Logo;
