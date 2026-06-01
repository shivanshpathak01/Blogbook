import { Link } from "react-router-dom";

export const Pagenotfound=()=>{
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf7f2] text-black px-6">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-gray-700">
        Oops! The page you’re looking for doesn’t exist.
      </p>

     <div className="flex gap-5">
       <Link
        to="/"
        className="px-6 py-3 rounded-full bg-black text-white text-lg hover:opacity-90"
      >
        Go back home
      </Link>
      
      <Link
        to="/blogs"
        className="px-6 py-3 rounded-full bg-black text-white text-lg hover:opacity-90"
      >
        Go back blogs
      </Link>
     </div>
    </div>
  );
}