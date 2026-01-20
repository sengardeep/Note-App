import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto mt-10">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg text-[#00ff9d]"></div>
          </div>
        )}

        {notes.length === 0 && !isRateLimited && !loading && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="glass-panel p-8 rounded-2xl max-w-md">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00ff9d] to-[#00b8ff] bg-clip-text text-transparent">
                Welcome to Note App
              </h2>
              <p className="text-gray-400 mb-6">
                Capture your thoughts, ideas, and inspiration in a beautiful, distraction-free environment.
              </p>
              <NotesNotFound />
            </div>
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <>
            <h2 className="text-3xl font-bold mb-8 text-white pl-2 border-l-4 border-[#00ff9d]">
              My Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HomePage;
