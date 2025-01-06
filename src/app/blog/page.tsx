"use client";

import Image from "next/image";
import { useState } from "react";
import { blogs } from "../../../data/products";
import Link from "next/link";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const [sortOption, setSortOption] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [viewCounts, setViewCounts] = useState({});
  const [activeAuthor, setActiveAuthor] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Filtered Blogs based on search, tags, and author
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = activeTag ? blog.tags.includes(activeTag) : true;
    const matchesAuthor = activeAuthor ? blog.author === activeAuthor : true;
    return matchesSearch && matchesTag && matchesAuthor;
  });

  // Sort Blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Favorite Toggle
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  // Increment View Count
  const incrementViewCount = (id) => {
    setViewCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  // Calculate Read Time
  const calculateReadTime = (excerpt) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = excerpt.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Header Section */}
      <div className="py-16 ml-8 lg:ml-36 space-y-2">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="flex items-center gap-2">
          <Link href={"/"}>Home</Link>
          <p className="text-[#FB2E86]">Blog post</p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="px-6 lg:px-20">
        <button
          onClick={toggleDarkMode}
          className="mb-6 text-sm text-pink-500 font-semibold"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row lg:justify-center px-6 lg:px-20 py-10">
        {/* Blog Posts Section */}
        <div className="lg:w-1/2">
          {currentBlogs.length ? (
            currentBlogs.map((blog) => (
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
                  <p className="text-sm text-gray-500">
                    {calculateReadTime(blog.excerpt)} min read
                  </p>
                  <Link
                    href={`/blog/${blog.id}`}
                    onClick={() => incrementViewCount(blog.id)}
                    className="text-pink-500 font-semibold mt-2 inline-block"
                  >
                    Read More
                  </Link>
                  <button
                    onClick={() => toggleFavorite(blog.id)}
                    className={`text-sm ml-4 ${
                      favorites.includes(blog.id) ? "text-pink-500" : "text-gray-500"
                    }`}
                  >
                    {favorites.includes(blog.id) ? "★ Favorited" : "☆ Favorite"}
                  </button>
                  <p className="text-sm text-gray-500">
                    Views: {viewCounts[blog.id] || 0}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No blog posts match your search.</p>
          )}

          {/* Pagination */}
          <div className="mt-6">
            {Array.from(
              { length: Math.ceil(filteredBlogs.length / blogsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === index + 1 ? "bg-pink-500 text-white" : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
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
              <li>Women (21)</li>
              <li>Men (15)</li>
              <li>Kids (9)</li>
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
                  <button
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeTag === tag
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Popular Blogs */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Popular Blogs</h3>
            <ul className="space-y-2">
              {blogs
                .sort((a, b) => b.views - a.views)
                .slice(0, 3)
                .map((blog) => (
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
                      <p className="text-xs text-gray-400">
                        {blog.views} views
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Subscribe to our Newsletter</h3>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="bg-pink-500 text-white font-semibold rounded-lg py-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
