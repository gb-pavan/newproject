'use client';
import React, { useEffect, useState } from "react";
import ContactCard from "./contactCard";
import LeadDetails from "./detailCard";
import ButtonContainer from "./buttonContainer";
import Timeline from "./timeline";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import SearchBox from "@/components/SearchBox";
import AddTask from "./addTask";
import { useParams } from "next/navigation";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import { TableInstance } from "@/services/table.service";
import { IRowDetail } from "@/interfaces";

const leadData = {
  "Lead Source": "Webinar",
  "Lead Age": "35 Days",
  "Lead Owner": "Nilesh Patel",
  "Bord": "CBSE",
  "Assignee": "Prashant Kumar",
  "Address": "Nawada",
  "Created by": "Mother",
  "Class": "6th",
  "Mother Occupation": "Teacher",
  "Father Occupation": "Accountant",
  "Created on": "20-Jan-2025",
  "Modified on": "17-Jan-2025",
  "Alternative no": "India3216290798",
  "Parents name": "Alexandra Atkins",
  "School name": "Delhi Public School, R.K. Puram",
  "Interact with": "Mother",
  "City": "Mumbai",
  "State": "Maharashtra",
  "Percentage": "71%",
  "Tags": "",
};

const timelineData = [
  {
    month: "Feb",
    year: "2025",
    items: [
      { date: "10", time: "12:12 PM", description: "👁 Viewed Landing Page, and spent 1 second.", badge: "+12", badgeColor: "bg-blue-500" },
      { date: "15", time: "04:15 PM", description: "Lead Owner changed from Nilesh Patel, Intelliclick to Prashant Singh Intelliclick." },
    ],
  },
  {
    month: "Jan",
    year: "2025",
    items: [
      { date: "15", time: "12:00 PM", description: "📞 Call to Abhishek Kumar (abhishek@azuyo.com)" },
      { date: "18", time: "04:15 PM", description: "📌 Follow Up Call: Ishank Ahuja - UPSC CSE\nLearner has selected UPSC CSE-6 months\nOwner: Utkarsh Rai Created By: Iash Rai on 16 Jul 2020 12:11 PM" },
      { date: "25", time: "10:15 PM", description: "📄 Document Collection Added by Venda Singh.", badge: "+20", badgeColor: "bg-yellow-500" },
      { date: "26", time: "11:15 PM", description: "🎓 Education Application Added by ir Singh.", badge: "+25", badgeColor: "bg-orange-500" },
    ],
  },
  {
    month: "Dec",
    year: "2024",
    items: [
      { date: "10", time: "12:12 PM", description: "📧 Email received from client to start class Added by Sandeep Purushothaman.", badge: "+5", badgeColor: "bg-[#E4EDFA] text-[#184574]" },
    ],
  },
];

const DetailedPage: React.FC = () => {
  const [btnClicked, setBtnClicked] = useState<string>("");
  const [detailedRow, setDetailedRow] = useState<IRowDetail | null>(null);
  const params = useParams(); // Use useParams instead of router.query
  const id = params.id;

  const handleTaskSubmit = () => {
    console.log("submitted");
    setBtnClicked("");
  };

  const handleCancelTask = () => {
    setBtnClicked("");
  };

  useEffect(() => {
    if (!id) return; // Wait until id is available
    
    // Fetch the lead data using the ID
    async function fetchLeadData() {
      try {
        const response = await TableInstance.getFullDetails(id as string);
        console.log("lead full",response);
        setDetailedRow(response);
        } catch (error) {
        handleError(error as AxiosError, false);
      }
    }    
    fetchLeadData();
  }, [id]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-wrap w-full">
        {/* Left sidebar with contact card and lead details */}
        <div className="w-full lg:w-2/5 pr-4 lg:pr-8">
          {/* Add Lead Details text above the contact card */}
          <div className="mb-4">
            <div className="text-[#000000] text-[18px] font-semibold ml-6">Lead Details</div>
          </div>
          <ContactCard
            name={detailedRow?.name ?? ""}
            status="Enroll"
            phone={detailedRow?.phone ?? ""}
            email={detailedRow?.fields?.email ?? ""}
            location={detailedRow?.region ?? ""}
            rating={Number(detailedRow?.fields?.percentage) ?? ""}
          />
          <LeadDetails details={leadData} />
        </div>
        
        {/* Right section with task form, leads list and timeline */}
        <div className="w-full lg:w-3/5 pl-4 lg:pl-8 mt-6 lg:mt-0">
          {/* Button container */}
          <ButtonContainer setBtn={setBtnClicked} />
          
          {/* Consistent container width for all elements */}
          <div className="flex flex-col space-y-6 w-full">
            {/* Add Task section - only shown when button is clicked */}
            {btnClicked === "CreateTask" && (
              <div className="w-full">
                <AddTask 
                  onSubmit={handleTaskSubmit} 
                  onCancel={handleCancelTask}
                  leadName="Nilesh Patel" 
                />
              </div>
            )}
            
            {/* All Leads section */}
            <div className="rounded-[22px] border border-black w-full">
              <div className="p-6">
                <div className="flex justify-between w-full">
                  <span className="text-[17px] font-[700] text-[#0D2167]">All Leads</span>
                  <button className="bg-[#0D2167] text-white px-4 py-2 rounded-md">+ Add a Condition</button>
                </div>

                <div className="flex justify-between items-center gap-10 p-2">
                  <SearchBox iconSize={32} placeholder="Search" iconColor="#0D2167" />
                  <div className="flex items-center gap-3">
                    <MdKeyboardArrowLeft size={24} color="#0D2167" />
                    {1}
                    <MdOutlineKeyboardArrowRight size={24} color="#0D2167" />
                  </div>
                  <IoSettingsOutline size={24} color="#0D2167" />
                </div>
              </div>
            </div>
            
            {/* Timeline container */}
            <Timeline sections={timelineData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;

