import { useState } from "react";
import ReactQuill from "react-quill-new";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { createPost } from "../queries/posts";
import toast from "react-hot-toast";
import "react-quill-new/dist/quill.snow.css";
import "../styles/quill-custom.css";

export default function CreatePost() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState<File | null>(null);

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                const tag = tagInput.startsWith('#') ? tagInput.trim() : '#' + tagInput.trim();
                setTags([...tags, tag]);
            }
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error("You need to login to post!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("username", user.username);
            formData.append("author", user.username);
            formData.append("title", title);
            formData.append("content", content);
            tags.forEach((tag) => formData.append("tags[]", tag));
            if (coverImage) {
                formData.append("coverImage", coverImage);
            }

            createPost(
                formData
            );

            toast.success("Post published successfully!");
            navigate("/home");
        } catch (err) {
            console.error("Error creating post", err);
            toast.error("Failed to publish post. Try again!");
        }
    };

    return (
        <div className="relative w-full bg- max-w-4xl flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-24">
                {/* Title */}
                <input
                    type="text"
                    placeholder="Title of your story..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-5xl font-extrabold bg-transparent text-white placeholder-gray-500 focus:outline-none border-b border-gray-700 pb-3"
                />

                {/* Tags */}
                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                            >
                                {tag}
                                <button
                                    type="button"
                                    className="text-gray-800 hover:text-red-600"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Press Enter to add tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        className="w-full px-2 py-2 text-lg bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>

                {/* Cover Image Upload */}
                <div>
                    <label className="text-white cursor-pointer h-1/2 w-3/4">
                        Upload Cover
                        <input type="file" className="hidden" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
                    </label>
                    {coverImage && (
                        <img src={URL.createObjectURL(coverImage)} className="h-36 w-64 mt-6" alt="" />
                    )}
                </div>


                <hr className="border-gray-700" />

                {/* Content */}
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="Start writing your story..."
                    className="rounded-lg bg-gray-800 text-white quill-dark min-h-[400px]"
                />
            </form>

            {/* Fixed Publish Button */}
            <div className="fixed bottom-6 right-12">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold text-gray-900 shadow-lg transition"
                >
                    Publish
                </button>
            </div>
        </div>
    );
}
