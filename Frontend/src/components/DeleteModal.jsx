import { AlertTriangleIcon, XIcon } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-md rounded-2xl p-6 relative animate-in zoom-in-95 duration-200 border border-red-500/20 shadow-[0_0_50px_-12px_rgba(239,68,68,0.25)]">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                    <XIcon className="size-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                        <AlertTriangleIcon className="size-8 text-red-500" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">Delete Note?</h3>
                    <p className="text-gray-400 mb-8">
                        Are you sure you want to delete this note? This action cannot be undone.
                    </p>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="btn flex-1 bg-white/5 hover:bg-white/10 text-white border-none h-12 text-base font-medium rounded-xl"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="btn flex-1 bg-red-500 hover:bg-red-600 text-white border-none h-12 text-base font-medium rounded-xl shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)]"
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
