import { BsFillTelephoneFill } from "react-icons/bs";

const TopNavbar = () => {
  return (
    <div className="w-full bg-orange-500 text-white text-sm">
      <div className="w-11/12 mx-auto px-4 py-2 flex justify-between items-center">
        <p className="hidden md:block"><span className="text-white inline-block"><BsFillTelephoneFill /></span> Call us: +880 1234 567 890</p>
        <div className="flex gap-4">
          <a href="mailto:support@sugary.com" className="">
            ✉️ support@sugary.com
          </a>
          <a href="/help" className="hover:text-orange-500">
            
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
