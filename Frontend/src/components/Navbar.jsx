import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Note App</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to={"/create"}
              className="btn bg-[#00ff9d] hover:bg-[#00cc7d] text-black border-none btn-glow rounded-xl px-6 font-medium"
            >
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
