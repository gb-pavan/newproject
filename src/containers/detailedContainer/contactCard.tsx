import { CiStar } from "react-icons/ci";
import { MdSpeed } from "react-icons/md";
import { PiPhoneLight } from "react-icons/pi";
import { SlEnvelopeOpen } from "react-icons/sl";
import { PiMapPinLine } from "react-icons/pi";
import { RiPhoneFill } from "react-icons/ri";
import CustomDropdown2 from "@/components/MyDropdown2";
import { IStatus } from "@/interfaces/tableFilterTypes";
import { mapStatusToDropdownOptions } from "@/utils/helpers";
interface ContactCardProps {
  name: string;
  status: string;
  phone: string;
  email: string;
  location: string;
  rating: number;
  statusInfo :IStatus[];
}

const ContactCard: React.FC<ContactCardProps> = ({ name, status, phone, email, location, rating,statusInfo }) => {

  const handleStatusChange = (newValues: string[]) => {
    console.log("status chagne");
  };
  return (
    <div className="max-w-xl mx-auto w-[524px] bg-[#F8D0FE] rounded-2xl shadow-lg overflow-hidden border border-black">
      <div className="p-4">
        <div className="flex gap-2">
          <div>
            <CiStar size={28} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black text-[28px]">{name}</h2>
            {/* <p className="text-gray-600 text-[23px]">{status}</p> */}
            <CustomDropdown2
              options={mapStatusToDropdownOptions(statusInfo, { showCheckbox: false,addDeco:false })}
              // selectedValues={query.filters.find(each => each.field === "status")?.value || []}
              onChange={handleStatusChange}
              multiSelect={true}
              defaultValue="Status"
            />
          </div>
        </div>
        

        <div className="mt-4 space-y-6 text-black">
          <div className="flex items-center gap-2">
            <PiPhoneLight className="text-xl" size={28} />
            <span className="text-[18px]">{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <SlEnvelopeOpen size={28} />
            <span className="text-[18px]">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <PiMapPinLine  className="text-xl" size={28} />
            <span className="text-[18px]">{location}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#E446EF26] p-3 border-t border-black rounded-2xl">
        <div className="flex flex-col items-center">
          <MdSpeed className="text-2xl text-green-600" size={36} />
          <span className="text-[20px]">+{rating}</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full">
            <RiPhoneFill size={24} />          
          </button>
          <p className="text-[20px]">Call</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
