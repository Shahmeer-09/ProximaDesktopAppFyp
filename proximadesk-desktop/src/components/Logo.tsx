import circle from "../assets/circle.png";
const Logo = () => {
  return (
    <div className=" flex items-center  ">
      <img
        src={circle}
        alt="logo"
        className=" object-center object-cover  bg-no-repeat  h-10 w-10 "
      />
      <h5 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold  text-md  ">
        ProximaDesk
      </h5>
    </div>
  );
};

export default Logo;
