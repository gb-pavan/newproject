"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" && window.innerWidth <= 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} incentive={2}/>
      <div className="flex flex-grow">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isMobile={isMobile}
        />
        <main className="w-full p-4 flex flex-col flex-grow h-[calc(100vh-90px)] overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

