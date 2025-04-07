interface LeadDetailsProps {
    details: Record<string, string>;
  }
  
  const LeadDetails: React.FC<LeadDetailsProps> = ({ details }) => {
    return (
      <div className="max-w-2xl w-[524px] mx-auto shadow-md">
        <table className="w-full border-collapse border border-black">
          <tbody>
            {Object.entries(details).map(([key, value], index) => (
              <tr key={key} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-[9px]`}>
                <td className="border px-4 py-2 font-semibold">{key}:</td>
                <td className="border px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default LeadDetails;

  