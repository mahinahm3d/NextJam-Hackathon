import Image from "next/image";
import { useState } from "react";
import { blogs } from "../../../data/products";
import Link from "next/link";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter blogs based on search query and category
  const filteredBlogs = blogs.filter((blog) => {
    return (
      (selectedCategory === "All" || blog.category === selectedCategory) &&
      (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div>
      <div className="py-16 ml-8 lg:ml-36 space-y-2">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="flex items-center gap-2">
          <Link href={"/"}>Home</Link>
          <p className="text-[#FB2E86]">Blog post</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-center px-6 lg:px-20 py-10">
        {/* Blog Posts Section */}
        <div className="lg:w-1/2">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="mb-10">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={870}
                  height={453}
                  className="w-[35rem] h-80 object-cover rounded-md"
                />
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{blog.author}</span>
                    <span>{blog.date}</span>
                    <span>{blog.category}</span>
                  </div>
                  <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
                  <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                  <a
                    href="#"
                    className="text-pink-500 font-semibold mt-2 inline-block"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No matching blogs found.</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 lg:pl-10 mt-10 lg:mt-0">
          {/* Search */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Search</h3>
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Categories</h3>
            <ul className="space-y-2 text-gray-600">
              {["All", "Women", "Men", "Kids"].map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer ${
                    selectedCategory === category ? "font-bold text-pink-500" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Recent Posts</h3>
            <ul className="space-y-2">
              {blogs.slice(0, 3).map((blog) => (
                <li key={blog.id} className="flex items-center space-x-4">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={500}
                    height={500}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-sm font-semibold">{blog.title}</h4>
                    <p className="text-sm text-gray-500">{blog.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-bold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["Design", "Technology", "Travel", "Fashion", "Food"].map(
                (tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-sm text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
