import React from "react";

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#3F72AF] rounded-md text-white p-3 my-4 font-bold uppercase text-sm text-center ">
            {children}
        </div>
    );
}
