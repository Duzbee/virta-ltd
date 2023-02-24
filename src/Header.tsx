import logo from "./assets/images/logo.svg";

function Header() {
  return (
    <div className="flex md:items-center flex-col md:flex-row md:p-5">
      <img className="w-28 md:mr-36 mb-6 md:mb-0" src={logo} />
      <div className="font-bold text-[20px] ml-4">Virta platform compatible countries</div>
    </div>
  );
}

export default Header;
