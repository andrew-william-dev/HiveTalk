import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { downvotePost, getPosts, upvotePost } from "../queries/posts";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import PostCard from "../components/PostCard";

function Home() {
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchPosts = async () => {
        try {
            const { data } = await getPosts();
            setPosts(data); // assuming BE returns array of posts
        } catch (err) {
            console.error("Error fetching posts", err);
            toast.error("Failed to load posts");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full text-white">
                Loading posts...
            </div>
        );
    }

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
        <div className="flex flex-col gap-6 items-center mt-6 relative">
            <PostCard posts={posts} user={user} handleUpvote={handleUpvote} hadnleDownVote={hadnleDownVote} setModalImage={setModalImage} />

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
        </div>
    );
}

export default Home;
