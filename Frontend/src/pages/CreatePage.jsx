import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-6 text-gray-400 hover:text-white">
          <ArrowLeftIcon className="size-5 mr-2" />
          Back to Notes
        </Link>

        <div className="glass-panel rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-white">Create New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-6">
              <label className="label mb-2">
                <span className="label-text text-gray-300 font-medium">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter note title..."
                className="input input-glass w-full p-4 rounded-xl text-lg placeholder-gray-600 focus:placeholder-gray-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control mb-8">
              <label className="label mb-2">
                <span className="label-text text-gray-300 font-medium">Content</span>
              </label>
              <textarea
                placeholder="Write your thoughts here..."
                className="textarea input-glass w-full h-64 p-4 rounded-xl text-base leading-relaxed placeholder-gray-600 focus:placeholder-gray-500 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn bg-[#00ff9d] hover:bg-[#00cc7d] text-black border-none btn-glow rounded-xl px-8 font-bold text-lg min-w-[150px]"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
