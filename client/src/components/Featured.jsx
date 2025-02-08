import React from "react";

export default function Featured() {
    const companies = [
        { name: "TechCrunch", image: "/companies/tc.png" },
        { name: "Forbes", image: "/companies/forbes.png" },
        { name: "BUSINESS INSIDER", image: "/companies/bi.png" },
        { name: "On Deck", image: "/companies/ondeck.png" },
        { name: "THE WALL STREET JOURNAL", image: "/companies/wsj.png" },
        { name: "CNBC", image: "/companies/cnbc.png" }
    ];
  
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 cursor-default">
                Featured and seen in
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                {companies.map((company) => (
                    <div 
                        key={company.name}
                        className="px-4 py-3 rounded-2xl relative group cursor-pointer w-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px]"
                    >
                        <div className="absolute inset-0 bg-zinc-900 rounded-2xl transition-opacity duration-500 ease-in-out group-hover:opacity-0"></div>
                        <img 
                            src={company.image} 
                            alt={company.name} 
                            className="relative h-6 sm:h-8 md:h-10 object-contain w-full" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}