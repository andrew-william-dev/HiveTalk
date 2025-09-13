import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { useGetProfile } from "../queries/profile";
import PostCard from "../components/PostCard";
import { downvotePost, getDownvotedPosts, getPostsByUser, getUpvotedPosts, upvotePost } from "../queries/posts";
import toast from "react-hot-toast";
import { X } from "lucide-react";

type TabKeys = "posts" | "upvoted" | "downvoted";

interface UserProfile {
    username: string;
    email?: string;
    bio?: string;
    interests?: string[];
    dob?: string;
    location?: string;
    occupation?: string;
    website?: string;
    weblink?: string;
    profilePicUrl?: string;
    bannerPicUrl?: string;
}

export default function Profile() {
    const { user: authUser } = useAuth() as {
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
    const navigate = useNavigate();

    const [user, setUser] = useState<UserProfile | null>(null);
    const [activeTab, setActiveTab] = useState<TabKeys>("posts");
    const [posts, setPosts] = useState<any[]>([]);
    const [modalImage, setModalImage] = useState<string | null>(null);


    const [profilePic, setProfilePic] = useState<string>("https://picsum.photos/150?random=2");
    const [bannerPic, setBannerPic] = useState<string>("https://picsum.photos/400/150?random=3");

    const mockTabs: Record<TabKeys, string[]> = {
        posts: [],
        upvoted: [],
        downvoted: [],
    };

    useEffect(() => {
        if (authUser?.username) {
            useGetProfile(authUser?.username)
                .then((res) => {
                    setUser(res.data);
                    if (res.data.profilePicUrl) setProfilePic(`${import.meta.env.VITE_APP_BACKEND_URL}${res.data.profilePicUrl}`);
                    if (res.data.bannerPicUrl) setBannerPic(`${import.meta.env.VITE_APP_BACKEND_URL}${res.data.bannerPicUrl}`);
                })
                .catch(() => {
                    setUser(null);
                });
        }
    }, []);

    useEffect(() => {
        if (!authUser?.username) return;

        let fetcher;
        if (activeTab === "posts") fetcher = getPostsByUser;
        else if (activeTab === "upvoted") fetcher = getUpvotedPosts;
        else if (activeTab === "downvoted") fetcher = getDownvotedPosts;
        else return; // comments not implemented yet

        fetcher(authUser.username).then((res: any) => {
            setPosts(res.data || []);
        });
    }, [activeTab, authUser?.username]);

    const interestsArray = user?.interests?.map((i) => (i.startsWith("#") ? i : `#${i}`)) || [];

    const handleUpvote = async (id: string) => {
        try {
            await upvotePost(id, user?.username!);

            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post._id === id) {
                        const alreadyUpvoted = post.upvotes?.includes(user?.username);
                        // const alreadyDownvoted = post.downvotes?.includes(user?.username);

                        let newUpvotes = post.upvotes || [];
                        let newDownvotes = post.downvotes || [];

                        if (alreadyUpvoted) {
                            newUpvotes = newUpvotes.filter((u: string) => u !== user?.username);
                        } else {
                            newUpvotes = [...newUpvotes, user?.username];
                            newDownvotes = newDownvotes.filter((u: string) => u !== user?.username);
                        }

                        return {
                            ...post,
                            upvotes: newUpvotes,
                            downvotes: newDownvotes,
                        };
                    }
                    return post;
                })
            );
        } catch (err) {
            console.error("Error upvoting", err);
            toast.error("Failed to upvote");
        }
    };

    const hadnleDownVote = async (id: string) => {
        try {
            await downvotePost(id, user?.username!);

            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post._id === id) {
                        // const alreadyUpvoted = post.upvotes?.includes(user?.username);
                        const alreadyDownvoted = post.downvotes?.includes(user?.username);

                        let newUpvotes = post.upvotes || [];
                        let newDownvotes = post.downvotes || [];

                        if (alreadyDownvoted) {
                            newDownvotes = newDownvotes.filter((u: string) => u !== user?.username);
                        } else {
                            newDownvotes = [...newDownvotes, user?.username];
                            newUpvotes = newUpvotes.filter((u: string) => u !== user?.username);
                        }

                        return {
                            ...post,
                            upvotes: newUpvotes,
                            downvotes: newDownvotes,
                        };
                    }
                    return post;
                })
            );
        } catch (err) {
            console.error("Error upvoting", err);
            toast.error("Failed to upvote");
        }
    };

    return (
        <div className="flex gap-8 ml-[400px] h-[calc(100vh-130px)] p-10">
            {/* Main Section */}
            <div className="flex-1 w-[800px] flex flex-col gap-6">
                {/* Profile Header */}
                <div className="flex items-center gap-6">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-lg"
                    />
                    <h1 className="text-3xl font-bold text-amber-400">
                        {user?.username || "Guest"}
                    </h1>
                    <button
                        className="ml-auto px-4 py-2 bg-amber-400 text-black font-semibold rounded-lg shadow-md hover:bg-amber-300 transition"
                        onClick={() => navigate("/edit/profile")}
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-10 border-b border-gray-600 flex-nowrap">
                    {(Object.keys(mockTabs) as TabKeys[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-lg font-semibold transition ${activeTab === tab
                                ? "text-amber-400 border-b-2 border-amber-400"
                                : "text-gray-400 hover:text-amber-300"
                                }`}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex flex-col gap-6 items-center overflow-y-scroll mt-6 relative">
                    {posts.length > 0 ? (
                        <PostCard
                            posts={posts}
                            user={authUser}
                            handleUpvote={handleUpvote}
                            hadnleDownVote={hadnleDownVote}
                            setModalImage={setModalImage}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p className="text-lg">No content found</p>
                        </div>
                    )}
                </div>

            </div >
                {/* Sidebar */}
                <div className="w-[400px] flex flex-col h-full">
                    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden h-full">
                        {/* Banner */}
                        <div className="relative h-40 cursor-pointer">
                            <img
                                src={bannerPic}
                                alt="Banner"
                                className="w-full h-40 object-cover"
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="p-6 flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {user?.username || "Guest"}
                            </h2>

                            <div className="text-md text-gray-300">
                                {user?.bio || "No bio available. Complete your profile!"}
                            </div>
                            <br />
                            <hr />

                            {/* User Info Cards */}
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 transition">
                                    <span className="text-gray-300 text-sm font-semibold">DOB</span>
                                    <p className="text-amber-300 text-base">
                                        {user?.dob || "Add your date of birth"}
                                    </p>
                                </div>
                                <div className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 transition">
                                    <span className="text-gray-300 text-sm font-semibold">Location</span>
                                    <p className="text-amber-300 text-base">
                                        {user?.location || "Add your location"}
                                    </p>
                                </div>
                                <div className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 transition">
                                    <span className="text-gray-300 text-sm font-semibold">Occupation</span>
                                    <p className="text-amber-300 text-base">
                                        {user?.occupation || "Add your occupation"}
                                    </p>
                                </div>
                                <div className="bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 transition">
                                    <span className="text-gray-300 text-sm font-semibold">Website</span>
                                    <br />
                                    {user?.website && user?.weblink ? (
                                        <a
                                            href={user.weblink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-amber-400 underline text-base"
                                        >
                                            {user.website}
                                        </a>
                                    ) : (
                                        <p className="text-white text-base">Add your website</p>
                                    )}
                                </div>
                            </div>
                            <br />
                            <hr />

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
                                                {interest}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-xs">No interests added. Update your profile!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {modalImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30"
                    onClick={() => setModalImage(null)}
                >
                    <img
                        src={modalImage}
                        alt="Background Blur"
                        className="absolute inset-0 w-full h-full object-cover filter blur-lg"
                    />
                    <div className="relative z-10">
                        <X
                            className="absolute top-2 right-2 w-8 h-8 text-amber-400 cursor-pointer"
                            onClick={() => setModalImage(null)}
                        />
                        <img
                            src={modalImage}
                            alt="Modal"
                            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </div>);
}
