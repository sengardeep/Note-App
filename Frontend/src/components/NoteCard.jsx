import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const NoteCard = ({ note, setNotes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
      toast.success("Note deleted successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link
        to={`/note/${note._id}`}
        className="glass-card rounded-xl p-6 group relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00ff9d] to-[#00b8ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex flex-col h-full">
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00ff9d] transition-colors">
            {note.title}
          </h3>
          <p className="text-gray-400 line-clamp-3 text-sm leading-relaxed mb-6 flex-grow">
            {note.content}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <span className="text-xs text-gray-500 font-medium">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <PenSquareIcon className="size-4" />
              </div>
              <button
                className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
};
export default NoteCard;
