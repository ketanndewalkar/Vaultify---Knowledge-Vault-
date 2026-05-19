import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PageHeader = () => {
  const [breadcrumb, setBreadcrumb] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(()=>{
    const pathParts = location.pathname.split("/").filter(Boolean).map(part => part.charAt(0).toUpperCase() + part.slice(1));
    setBreadcrumb(pathParts)
  },[location])

  return (
    <div className="bg-white border-b border-gray-300 px-4 md:px-6 py-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2">

      <div className="flex items-center gap-3 flex-wrap">

        <button onClick={()=>navigate(-1)}className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm">
          ← Back
        </button>

        <div className="text-sm text-gray-600 flex flex-wrap">

          {breadcrumb?.map((item, index) => (
            <span key={index}>
              {item}

              {index !== breadcrumb.length - 1 && (
                <span className="mx-2">›</span>
              )}

            </span>
          ))}

        </div>

      </div>


    </div>
  );
};

export default PageHeader;