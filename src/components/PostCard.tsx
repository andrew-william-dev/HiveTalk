import { MessageCircle, ArrowUp, ArrowDown, Share2 } from "lucide-react";
export default function PostCard({ posts, user, handleUpvote, hadnleDownVote, setModalImage }: { posts: any[], user: any, handleUpvote: any, hadnleDownVote: any, setModalImage: any }) {
    return (
        <>
            {
                posts.map((post: any) => (
                    <div
                        key={post._id}
                        className="bg-gray-800 w-[700px] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700 flex"
                    >
                        {/* Votes */}
                        <div className="flex flex-col items-center justify-start bg-gray-900 rounded-l-xl px-3 py-4 text-gray-400 gap-2">
                            <ArrowUp className={`cursor-pointer hover:text-amber-400 transition ${post?.upvotes?.length > 0 && post?.upvotes?.find((item: string) => item === user?.username) && "text-amber-400"}`} onClick={() => handleUpvote(post._id)} />
                            <span className="font-semibold text-white">
                                {post.upvotes?.length || 0}
                            </span>
                            <ArrowDown className={`cursor-pointer hover:text-amber-400 transition ${post?.downvotes?.length > 0 && post?.downvotes?.find((item: string) => item === user?.username) && "text-amber-400"}`} onClick={() => hadnleDownVote(post._id)} />
                        </div>

                        {/* Post body */}
                        <div className="flex-1 flex flex-col">
                            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-amber-400">{post.title}</h2>
                                <span className="text-sm text-gray-400">By {post.author}</span>
                            </div>

                            {post.coverImage && (
                                <img
                                    src={`${import.meta.env.VITE_APP_BACKEND_URL}${post.coverImage}`}
                                    alt="Cover"
                                    className="w-full h-64 object-cover transition-all duration-300 hover:opacity-50 cursor-pointer"
                                    onClick={() => setModalImage(`${import.meta.env.VITE_APP_BACKEND_URL}${post.coverImage}`)}
                                />
                            )}


                            <div className="px-6 py-4 text-gray-300">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: (() => {
                                            const tempDiv = document.createElement("div");
                                            tempDiv.innerHTML = post.content;
                                            const textContent = tempDiv.textContent || tempDiv.innerText || "";
                                            const words = textContent.split(/\s+/);
                                            if (words.length > 200) {
                                                return words.slice(0, 200).join(" ") + "...more";
                                            }
                                            return post.content;
                                        })(),
                                    }}
                                />
                            </div>


                            <div className="flex flex-wrap gap-2 mb-3 ml-6">
                                {post.tags.map((tag: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Footer actions */}
                            <div className="px-6 py-3 border-t border-gray-700 text-sm text-gray-400 flex gap-6">
                                <span className="flex items-center gap-1 cursor-pointer hover:text-amber-400">
                                    <MessageCircle /> {post.comments?.length || 0}
                                </span>
                                <span className="flex items-center gap-1 cursor-pointer hover:text-amber-400">
                                    <Share2 /> Share
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}