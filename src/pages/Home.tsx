import { useState } from "react";
import { MessageCircle, ArrowUp, ArrowDown, Share2, X } from "lucide-react";

function Home() {
    const [modalImage, setModalImage] = useState<string | null>(null);

    const posts = Array.from({ length: 50 }, (_, i) => {
        const isLandscape = Math.random() > 0.5;
        const width = isLandscape ? 1920 : 720;
        const height = isLandscape ? 1080 : 1080;
        const image = Math.random() > 0.5 
            ? `https://picsum.photos/${width}/${height}?random=${i + 1}` 
            : null;

        return {
            id: i + 1,
            title: `Post Title #${i + 1}`,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Post number ${i + 1} content continues...`,
            author: `User${i + 1}`,
            votes: Math.floor(Math.random() * 500),
            comments: Math.floor(Math.random() * 100),
            image,
        };
    });

    return (
        <div className="flex flex-col gap-6 items-center mt-6 relative">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-gray-800 w-[700px] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700 flex"
                >
                    <div className="flex flex-col items-center justify-start bg-gray-900 rounded-l-xl px-3 py-4 text-gray-400 gap-2">
                        <ArrowUp className="cursor-pointer hover:text-amber-400 transition" />
                        <span className="font-semibold text-white">{post.votes}</span>
                        <ArrowDown className="cursor-pointer hover:text-amber-400 transition" />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-amber-400">{post.title}</h2>
                            <span className="text-sm text-gray-400">By {post.author}</span>
                        </div>

                        {post.image && (
                            <img
                                src={post.image}
                                alt="Post"
                                className="w-full h-64 object-cover transition-all duration-300 hover:opacity-50 cursor-pointer"
                                onClick={() => setModalImage(post.image)}
                            />
                        )}

                        <div className="px-6 py-4 text-gray-300">
                            <p>{post.content}</p>
                        </div>

                        <div className="px-6 py-3 border-t border-gray-700 text-sm text-gray-400 flex gap-6">
                            <span className="flex items-center gap-1 cursor-pointer hover:text-amber-400">
                                <MessageCircle /> {post.comments}
                            </span>
                            <span className="flex items-center gap-1 cursor-pointer hover:text-amber-400">
                                <Share2 /> Share
                            </span>
                        </div>
                    </div>
                </div>
            ))}

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
