const dummyPosts = [
  {
    id: 1,
    image: "https://picsum.photos/seed/post1/400/400",
    likes: 124,
    comments: 8,
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/post2/400/400",
    likes: 89,
    comments: 3,
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/post3/400/400",
    likes: 256,
    comments: 14,
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/post4/400/400",
    likes: 43,
    comments: 1,
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/post5/400/400",
    likes: 178,
    comments: 22,
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/post6/400/400",
    likes: 312,
    comments: 9,
  },
];

const Posts = () => {
  return (
    <div className="w-full">
      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-2"></div>

      {/* Section label */}
      <div className="flex justify-center gap-8 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        <span className="border-t-2 border-black dark:border-white pt-3 text-black dark:text-white -mt-[13px]">
          Posts
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1">
        {dummyPosts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square group cursor-pointer overflow-hidden"
          >
            <img
              src={post.image}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white font-semibold">
              <span className="flex items-center gap-1">
                {/* Heart icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                {/* Comment icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z"
                    clipRule="evenodd"
                  />
                </svg>
                {post.comments}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
