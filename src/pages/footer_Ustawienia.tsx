import { Link } from "react-router-dom";


function Ustawienia() {
  return (
    <div className="min-h-screen w-full px-8 text-center bg-gray-400 flex flex-col justify-center">
      <h1 className="text-5xl font-bold">Ustawienia</h1>

      {/* Powiadomienia */}
      <Link
        to="/Powiadomienia"
        className="px-6 py-3 bg-white text-black rounded-full shadow-lg active:scale-95 transition-all font-semibold"
      >
        Powiadomienia
      </Link>

    </div>
  );
}

export default Ustawienia;