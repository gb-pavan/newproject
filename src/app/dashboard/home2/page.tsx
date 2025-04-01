'use client';
import React, { useRef, useState, useEffect} from "react";
import { FaFacebook, FaGoogle, FaWhatsapp } from "react-icons/fa";
import {
  RiTeamLine,
  RiFileExcelLine,
  RiUserLine,
  RiLineChartLine,
  RiSettingsLine,
  RiListCheck,
  RiArrowLeftSLine,
  RiArrowRightSLine
} from "react-icons/ri";
import PipelineDisplay from "@/containers/editor/editContainer";
import { useRouter } from "next/navigation";


const Home2: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
    // Add state to control the visibility of the pipeline display
    const [showPipeline, setShowPipeline] = useState(false);
      const router = useRouter();

    useEffect(() => {
        const checkScroll = () => {
          const container = scrollContainerRef.current;
          if (container) {
            setShowLeftScroll(container.scrollLeft > 0);
            setShowRightScroll(
              container.scrollWidth > container.clientWidth &&
              container.scrollLeft < container.scrollWidth - container.clientWidth
            );
          }
        };
        
        // Initial check with a delay to ensure accurate measurements
        setTimeout(checkScroll, 200);
    
        // Set up resize observer
        const resizeObserver = new ResizeObserver(checkScroll);
        if (scrollContainerRef.current) {
          resizeObserver.observe(scrollContainerRef.current);
        }
        
        // Add scroll event listener
        const container = scrollContainerRef.current;
        if (container) {
          container.addEventListener('scroll', checkScroll);
        }
        
        // Force check on window resize
        window.addEventListener('resize', checkScroll);

        return () => {
          if (container) {
            container.removeEventListener('scroll', checkScroll);
          }
          window.removeEventListener('resize', checkScroll);
          resizeObserver.disconnect();
        };
    }, []);

    const handleAddRegion = () => {
      router.push("/dashboard/region");
    }

    // Explicitly defined scroll handlers
    const scrollLeft = () => {
      console.log("Left button clicked"); // Debug log
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    };

    const scrollRight = () => {
      console.log("Right button clicked"); // Debug log
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    };
    

    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex flex-1">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center mb-6">
              <div>
                <h1 className="text-xs text-gray-500">Hi, IntelliClick</h1>
              </div>
            </div>
             {/* Show pipeline if state is true */}
{showPipeline && (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium text-gray-800">Sales Pipeline Configuration</h2>
      <button 
        onClick={() => setShowPipeline(false)}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Close
      </button>
    </div>
    <PipelineDisplay />
  </div>
)}

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-gray-800">Get started</h2>
                <span className="text-xs text-purple-600 font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Setup Guide <span className="ml-1">›</span>
                </span>
              </div>
              
              {/* Scroll Container Section */}
              <div className="relative">
                {/* Move buttons outside scrollable area */}
                <div className="relative flex items-center">
                  {/* Left scroll button */}
                  <button 
                    type="button"
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full shadow-md p-1 text-gray-600 hover:text-purple-600 focus:outline-none"
                    onClick={scrollLeft}
                    style={{ pointerEvents: 'auto', cursor: showLeftScroll ? 'pointer' : 'not-allowed', opacity: showLeftScroll ? 1 : 0.5 }}
                  >
                    <RiArrowLeftSLine className="h-6 w-6" />
                  </button>
                  
                  {/* Scrollable container */}
                  <div 
                    ref={scrollContainerRef}
                    className="w-full overflow-x-auto pb-6 px-10"
                    style={{ 
                      scrollbarWidth: 'none', 
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <div className="flex space-x-4">
                      {/* Card components */}
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center min-w-[200px]">
                        <div className="bg-gray-100 p-3 rounded-full mb-3">
                          <RiTeamLine className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          Add Team
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          Collaborate with team at one location
                        </p>
                        <button className="rounded-full bg-purple-600 text-white text-xs py-1 px-3 mt-auto">
                          + Add team
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center min-w-[200px]">
                        <div className="bg-gray-100 p-3 rounded-full mb-3">
                          <RiFileExcelLine className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          Excel upload
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          Import your data flexibly
                        </p>
                        <button className="rounded-full bg-purple-600 text-white text-xs py-1 px-3 mt-auto">
                          + Import data
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center min-w-[200px]">
                        <div className="bg-gray-100 p-3 rounded-full mb-3">
                          <RiUserLine className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">Lead</h3>
                        <p className="text-xs text-gray-500 mb-3">
                          Connect with potential customers
                        </p>
                        <button className="rounded-full bg-purple-600 text-white text-xs py-1 px-3 mt-auto">
                          + Add lead
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center min-w-[200px]">
                        <div className="bg-gray-100 p-3 rounded-full mb-3">
                          <RiLineChartLine className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          Reports
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          Analyze your team performance
                        </p>
                        <button className="rounded-full bg-purple-600 text-white text-xs py-1 px-3 mt-auto">
                          Check reports
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center min-w-[200px]">
                        <div className="bg-gray-100 p-3 rounded-full mb-3">
                          <RiSettingsLine className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          Lead Fields
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          Create your custom lead fields
                        </p>
                        <button className="rounded-full bg-purple-600 text-white text-xs py-1 px-3 mt-auto">
                          + Custom Field
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center min-w-[200px]">
                        <div className="bg-gray-100 p-3 rounded-full mb-3">
                          <RiListCheck className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          Lead Stage
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          Configure your sales pipeline
                        </p>
                        <a 
                          href="/dashboard/home/pipeline"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-purple-600 text-white text-xs py-1 px-3 mt-auto inline-block"
                        >
                          + Lead Stage
                        </a>
                      </div>
                       <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center min-w-[200px]">
                        <div className="bg-gray-100 p-3 rounded-full mb-3">
                          <RiListCheck className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          Region
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          Configure your region
                        </p>
                        <a 
                          href="/dashboard/home/pipeline"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-purple-600 text-white text-xs py-1 px-3 mt-auto inline-block"
                          onClick={handleAddRegion}
                        >
                          + Add Region
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right scroll button */}
                  <button 
                    type="button"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full shadow-md p-1 text-gray-600 hover:text-purple-600 focus:outline-none"
                    onClick={scrollRight}
                    style={{ pointerEvents: 'auto', cursor: showRightScroll ? 'pointer' : 'not-allowed', opacity: showRightScroll ? 1 : 0.5 }}
                  >
                    <RiArrowRightSLine className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Rest of the component remains the same */}
            {/* Integrations */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Integrations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Facebook */}
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FaFacebook className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 mb-1">
                        Facebook
                      </h3>
                      <p className="text-xs text-gray-500">
                        Capture and instantly engage with Facebook leads.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-xs text-purple-600 mb-auto underline decoration-dotted">
                      How to use
                    </span>
                  </div>
                </div>

                {/* Google sheet */}
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FaGoogle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 mb-1">
                        Google sheet
                      </h3>
                      <p className="text-xs text-gray-500">
                        Capture and instantly engage with Google Sheet leads.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-xs text-purple-600 mb-auto underline decoration-dotted">
                      How to use
                    </span>
                  </div>
                </div>
              </div>
            </div>

          {/* Important Links */}
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Important Links
            </h2>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 text-xs text-purple-600"
              >
                <svg
                  className="h-4 w-4 mr-2 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Configure crm
              </a>
              <a
                href="#"
                className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 text-xs text-purple-600"
              >
                <svg
                  className="h-4 w-4 mr-2 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Configure call recording
              </a>
              <a
                href="#"
                className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 text-xs text-purple-600"
              >
                <svg
                  className="h-4 w-4 mr-2 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                How to start calling
              </a>
              <a
                href="#"
                className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 text-xs text-purple-600"
              >
                <svg
                  className="h-4 w-4 mr-2 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                Buy new Licenses
              </a>
              <a
                href="#"
                className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 text-xs text-purple-600"
              >
                <FaWhatsapp className="h-4 w-4 mr-2 text-purple-600" />
                Get Whatsapp Official API
              </a>
              <a
                href="#"
                className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 text-xs text-purple-600"
              >
                <svg
                  className="h-4 w-4 mr-2 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                Create Automation
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home2;