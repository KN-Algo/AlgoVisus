import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SquareArrowLeft, Eye, EyeOff } from "lucide-react";



export default function EyeAccommodation(){
    return(
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-10 relative">

            {/* Przycisk powrotu do AlgoVisus - strona glowna */}
            <Link
                to="/App"
                className="absolute left-6 top-10 p-3 bg-white text-black rounded-full 
                flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-gray-50"
            >
                <SquareArrowLeft size={20} strokeWidth={2}/>
            </Link>

                <h1 className="text-4xl font-bold mb-6">Trening Akomodacji</h1>
                <p className="text-lg text-gray-700 mb-10 max-w-2xl text-center">
                    Ćwiczenie polega na ...
                </p>
    

                <div className="flex gap-4">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">
                        Rozpocznij Trening
                    </button>
                    
                    <button className="bg-gray-300 text-black px-6 py-3 rounded hover:bg-gray-400 transition-colors">
                        Zakończ Trening
                    </button>
                </div>
        </div>
    )


}