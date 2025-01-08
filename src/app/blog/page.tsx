"use client";

import Image from "next/image";
import { blogs } from "../../../data/products";
import Link from "next/link";

const BlogPage = () => {
  return (
    <div>
      <div className="py-16 ml-8 lg:ml-36 space-y-2">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="flex item center gap-2 ">
          <Link href={"/"}>Home</Link>
          
          <p className="text-[#FB2E86]">Blog post</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-center px-6 lg:px-20 py-10">
        {/* Blog Posts Section */}
        <div className="lg:w-1/2">
          {blogs.map((blog) => (
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
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 lg:pl-10 mt-10 lg:mt-0">
          {/* Search */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Search</h3>
            <input
              type="text"
              placeholder="Search here"
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


i didn't want to change apperance just wanna add functionality

so my new code is:

import Image from "next/image";
import { useState } from "react";
import { blogs } from "../../../data/products";
import Link from "next/link";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  // Filtered Blogs based on search or tags
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = activeTag ? blog.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    setActiveTag(tag === activeTag ? "" : tag); // Toggle active tag
  };

  return (
    <div>
      {/* Header Section */}
      <div className="py-16 ml-8 lg:ml-36 space-y-2">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="flex items-center gap-2">
          <Link href={"/"}>Home</Link>
          <p className="text-[#FB2E86]">Blog post</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row lg:justify-center px-6 lg:px-20 py-10">
        {/* Blog Posts Section */}
        <div className="lg:w-1/2">
          {filteredBlogs.length ? (
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
                  <Link
                    href={/blog/${blog.id}}
                    className="text-pink-500 font-semibold mt-2 inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No blog posts match your search.</p>
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
                    className={px-3 py-1 rounded-full text-sm ${
                      activeTag === tag
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }}
                  >
                    {tag}
                  </button>
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


   
