"use client";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { products } from "../data/products";
import { motion } from "framer-motion";
import { useState } from "react";
import "../app/globals.css";

const Products: NextPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(4); // Now starts at 4
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);
  const productsToShow = filteredProducts.slice(0, visibleProducts);
  const hasMoreProducts = filteredProducts.length > visibleProducts;
  const canViewLess = visibleProducts > 4;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setIsDropdownOpen(false);
    setVisibleProducts(4); // Reset to initial count when category changes
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => Math.min(prev + 4, filteredProducts.length)); // Load 4 more, but not beyond total
  };

  const viewLessProducts = () => {
    setVisibleProducts((prev) => Math.max(4, prev - 4)); // Show less, minimum of 4
  };

  return (
    <>
      <Head>
        <title>Our Products | Lillis Coffee Shop</title>
        <meta
          name="description"
          content="Discover our premium coffee, tea, pastries and merchandise"
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[10vh] md:h-[20vh] bg-white flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-white z-0"></div>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/images/coffee-beans-pattern.png')] opacity-10"></div>
          </div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4 font-serif tracking-tight">
              Our Products
            </h1>
            <p className="text-xl text-amber-900 underline max-w-2xl mx-auto font-light">
              Handcrafted with care, served with love
            </p>
          </motion.div>
        </motion.div>

        {/* Category Filters */}
        <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center mb-16"
          >
            {/* Desktop Category Buttons (hidden on mobile) */}
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all ${
                    activeCategory === category
                      ? "bg-amber-800 text-white shadow-lg"
                      : "bg-white text-amber-800 shadow-md hover:shadow-lg"
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Mobile Dropdown (visible on mobile) */}
            <div className="md:hidden w-full max-w-xs relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-6 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all flex justify-between items-center ${
                  activeCategory
                    ? "bg-amber-800 text-white shadow-lg"
                    : "bg-white text-amber-800 shadow-md"
                }`}
              >
                {activeCategory === "all" ? "All Categories" : activeCategory}
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </motion.button>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden border border-amber-100"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full px-6 py-3 text-left text-sm uppercase tracking-wider font-medium transition-colors ${
                        activeCategory === category
                          ? "bg-amber-100 text-amber-800"
                          : "text-gray-700 hover:bg-amber-50"
                      }`}
                    >
                      {category === "all" ? "All Categories" : category}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {productsToShow.map((product) => (
              <motion.div
                key={product.id}
                variants={item}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white rounded-xl shadow-xl overflow-hidden border border-amber-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-amber-800 text-white text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-amber-900 font-serif">
                      {product.name}
                    </h3>
                    <span className="text-lg font-bold text-amber-800">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {product.description}
                  </p>
                  <Link
                    href={`/productdetail?id=${product.id}`}
                    className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-amber-800 border border-amber-800 rounded-full group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-amber-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center gap-2 text-sm font-medium tracking-wide">
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
                {product.featured && (
                  <div className="absolute top-0 left-0 bg-amber-600 text-white px-4 py-1 text-xs font-bold tracking-wider rounded-br-xl">
                    Featured
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Load More / View Less Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-12 space-x-4"
          >
            {hasMoreProducts && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMoreProducts}
                className="px-8 py-3 bg-white text-amber-800 border-2 border-amber-800 rounded-full font-medium tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                View More
                <span className="ml-2 text-xs bg-amber-800 text-white px-2 py-1 rounded-full">
                  +{Math.min(4, filteredProducts.length - visibleProducts)}
                </span>
              </motion.button>
            )}

            {canViewLess && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={viewLessProducts}
                className="px-8 py-3 bg-white text-amber-800 border-2 border-amber-800 rounded-full font-medium tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                View Less
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className=" text-amber-800 py-10  mt-4"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
              Can&apos;t Decide?
              <br /> Come To Our Cafe and Try Our Tasting Flight
            </h2>
           
          
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Products;
