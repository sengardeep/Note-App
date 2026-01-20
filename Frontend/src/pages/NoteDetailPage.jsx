import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import DeleteModal from "../components/DeleteModal";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
      setIsModalOpen(false);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost text-gray-400 hover:text-white">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Notes
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20 hover:border-red-500/40 rounded-xl"
          >
            <Trash2Icon className="h-5 w-5 mr-2" />
            Delete Note
          </button>
        </div>

        <div className="glass-panel rounded-2xl p-8">
          <div className="form-control mb-6">
            <label className="label mb-2">
              <span className="label-text text-gray-300 font-medium">Title</span>
            </label>
            <input
              type="text"
              placeholder="Note title"
              className="input input-glass w-full p-4 rounded-xl text-2xl font-bold bg-transparent border-transparent focus:border-[#00ff9d] focus:bg-white/5"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>

          <div className="form-control mb-8">
            <label className="label mb-2">
              <span className="label-text text-gray-300 font-medium">Content</span>
            </label>
            <textarea
              placeholder="Write your note here..."
              className="textarea input-glass w-full h-[50vh] p-4 rounded-xl text-lg leading-relaxed bg-transparent border-transparent focus:border-[#00ff9d] focus:bg-white/5 resize-none"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="btn bg-[#00ff9d] hover:bg-[#00cc7d] text-black border-none btn-glow rounded-xl px-8 font-bold text-lg min-w-[150px]"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
};
export default NoteDetailPage;
