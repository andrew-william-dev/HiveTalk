import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { useUpdateProfile } from "../queries/profile";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const { user } = useAuth() as {
        user: {
            username: string;
            email?: string;
            bio: string;
            interests?: string[];
            dob?: string;
            location?: string;
            occupation?: string;
            website?: string;
            weblink?: string;
            profilePicUrl?: string;
            bannerPicUrl?: string;
        } | null;
    };
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const { setUser } = useAuth()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        bio: user?.bio || "",
        interests: user?.interests?.join(", ") || "",
        dob: user?.dob || "",
        location: user?.location || "",
        occupation: user?.occupation || "",
        website: user?.website || "",
        weblink: user?.weblink || "",
    });

    const [profilePic, setProfilePic] = useState<string>(`${import.meta.env.VITE_APP_BACKEND_URL}${user?.profilePicUrl}` || "https://picsum.photos/400/150?random=2");
    const [bannerPic, setBannerPic] = useState<string>(`${import.meta.env.VITE_APP_BACKEND_URL}${user?.bannerPicUrl}` || "https://picsum.photos/400/150?random=3");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email || "");
        form.append("bio", formData.bio);
        form.append("interests", formData.interests);
        form.append("dob", formData.dob || "");
        form.append("location", formData.location || "");
        form.append("occupation", formData.occupation || "");
        form.append("website", formData.website || "");
        form.append("weblink", formData.weblink || "");
        form.append("oldname", user?.username || "")

        if (profileFile) form.append("profilePic", profileFile);
        if (bannerFile) form.append("bannerPic", bannerFile);

        useUpdateProfile(form).then((data : any) => {
            const {_id,__v, ...info} =data.data
            setUser(info)
            navigate('/profile')
        })
    };

    const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileFile(e.target.files[0]);
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setBannerFile(e.target.files[0]);
            setBannerPic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const interestsArray = formData.interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i);

    return (
        <div className="flex gap-8 ml-[400px] h-[calc(100vh-130px)] p-10">
            {/* Main Section */}
            <div className="flex-1 w-[800px] flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center gap-6 flex-shrink-0">
                    <h1 className="text-3xl font-bold text-amber-400">Edit Profile</h1>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6 p-6 bg-gray-800 rounded-xl shadow-lg"
                    >
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-semibold">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-semibold">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-semibold">Interests (comma separated)</label>
                            <input
                                type="text"
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                placeholder="Gaming / #Gaming"
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-semibold">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-semibold">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-semibold">Occupation</label>
                            <input
                                type="text"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-semibold">Website</label>
                            <input
                                type="text"
                                name="website"
                                placeholder="WebPage Name"
                                value={formData.website}
                                onChange={handleChange}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <input
                                type="text"
                                name="weblink"
                                placeholder="WebPage URL"
                                value={formData.weblink}
                                onChange={handleChange}
                                className="px-4 py-2 rounded-lg mt-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg shadow-md hover:bg-amber-300 transition"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>

            {/* Sidebar Preview */}
            <div className="w-[400px] flex flex-col h-full">
                <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden h-full relative">
                    {/* Banner */}
                    <div className="relative h-40 cursor-pointer">
                        <img src={bannerPic} alt="Banner" className="w-full h-40 object-cover" />
                        <label className="absolute inset-0 bg-black bg-opacity-40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer">
                            Change
                            <input type="file" className="hidden" onChange={handleBannerUpload} />
                        </label>
                    </div>

                    {/* Profile pic and username overlay */}
                    <div className="absolute top-32 left-4 flex items-center gap-4">
                        <div className="relative w-24 h-24 cursor-pointer">
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-lg"
                            />
                            <label className="absolute inset-0 bg-black bg-opacity-40 text-white flex items-center justify-center opacity-0 hover:opacity-100 rounded-full transition cursor-pointer">
                                Change
                                <input type="file" className="hidden" onChange={handleProfileUpload} />
                            </label>
                        </div>
                        <h2 className="text-2xl font-semibold text-white ">{formData.username}</h2>
                    </div>

                    {/* Preview info below */}
                    <div className="p-6 pt-20 flex flex-col gap-4 h-full">
                        {/* Bio */}
                        <div className="text-md text-gray-300">
                            {formData.bio || "No bio available"}
                        </div>

                        {/* Email */}
                        <div className="text-gray-400">
                            <p>{formData.email}</p>
                        </div>

                        <br />
                        <hr />

                        {/* User Info as cards */}
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {formData.dob && (
                                <div className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 transition">
                                    <span className="text-gray-300 text-sm font-semibold">DOB</span>
                                    <p className="text-white text-base">{formData.dob}</p>
                                </div>
                            )}
                            {formData.location && (
                                <div className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 transition">
                                    <span className="text-gray-300 text-sm font-semibold">Location</span>
                                    <p className="text-white text-base">{formData.location}</p>
                                </div>
                            )}
                            {formData.occupation && (
                                <div className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 transition">
                                    <span className="text-gray-300 text-sm font-semibold">Occupation</span>
                                    <p className="text-white text-base">{formData.occupation}</p>
                                </div>
                            )}
                            {formData.website && (
                                <div className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 transition">
                                    <span className="text-gray-300 text-sm font-semibold">Website</span> <br />
                                    <a
                                        href={formData.weblink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-amber-400 underline text-base"
                                    >
                                        {formData.website}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Interests */}
                        <div className="mt-6">
                            <h3 className="text-gray-300 font-semibold mb-2">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {interestsArray.length > 0 ? (
                                    interestsArray.map((interest, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs"
                                        >
                                            {interest.startsWith("#") ? interest : `#${interest}`}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-xs">No interests added</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
