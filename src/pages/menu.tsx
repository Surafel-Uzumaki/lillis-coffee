"use client";
import React, { useState, useEffect, useRef } from "react";
import { drinks, foods } from "../data/products";
import { FiChevronDown, FiPhone } from "react-icons/fi";

interface MenuItem {
  id: number;
  name: string;
  nameAmharic: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
}

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showAllFoods, setShowAllFoods] = useState(false);
  const [showAllDrinks, setShowAllDrinks] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 6;

  // Get all unique categories
  const allCategories = Array.from(
    new Set([
      ...foods.flatMap((food: MenuItem) => food.categories),
      ...drinks.flatMap((drink: MenuItem) => drink.categories),
    ])
  );

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter items based on selected category
  const filteredFoods =
    selectedCategory === "all"
      ? foods
      : foods.filter((food: MenuItem) =>
          food.categories.includes(selectedCategory)
        );

  const filteredDrinks =
    selectedCategory === "all"
      ? drinks
      : drinks.filter((drink: MenuItem) =>
          drink.categories.includes(selectedCategory)
        );

  const visibleFoods = showAllFoods
    ? filteredFoods
    : filteredFoods.slice(0, ITEMS_PER_PAGE);
  const visibleDrinks = showAllDrinks
    ? filteredDrinks
    : filteredDrinks.slice(0, ITEMS_PER_PAGE);

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      

      <div className="relative h-[25vh] bg-white overflow-hidden border-b">
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 font-serif text-blue-950 tracking-tight">
            Our Menu
          </h1>
          <p className="text-blue-900/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Discover our carefully curated selection of premium drinks and
            delectable foods, crafted with passion and precision
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12 relative z-10">
        <div className="mb-16 max-w-5xl mx-auto">
          {isMobile ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white shadow-md rounded-2xl px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-all duration-300 border border-gray-100"
              >
                <span className="text-blue-950 font-semibold text-lg">
                  {selectedCategory === "all"
                    ? "All Categories"
                    : selectedCategory}
                </span>
                <FiChevronDown
                  className={`w-6 h-6 text-blue-950 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-xl max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent divide-y divide-gray-100 border border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 text-blue-950 transition-colors duration-200"
                  >
                    All Categories
                  </button>
                  {allCategories.map((category: string) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 text-blue-950 transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-blue-950 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                All Categories
              </button>
              {allCategories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-blue-950 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-20 max-w-7xl mx-auto">
          {filteredFoods.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center mb-12">
                <h2 className="text-4xl font-bold text-blue-950 font-serif">
                  Food
                </h2>
                <div className="flex-grow ml-6 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleFoods.map((food: MenuItem) => (
                  <div
                    key={food.id}
                    className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img
                        src={`/images/${food.image}`}
                        alt={food.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-blue-950">
                            {food.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {food.nameAmharic}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                          ${food.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-6 line-clamp-2 text-lg">
                        {food.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {food.categories.map((category: string) => (
                          <span
                            key={category}
                            className="px-4 py-1.5 bg-gray-50 text-blue-900 rounded-full text-sm font-medium border border-gray-100"
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={handleCall}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-300"
                      >
                        <FiPhone className="w-5 h-5" />
                        <span>Want it delivered? Call Us</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {filteredFoods.length > ITEMS_PER_PAGE && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setShowAllFoods(!showAllFoods)}
                    className="px-8 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-300 border border-gray-200"
                  >
                    {showAllFoods ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </section>
          )}

          {filteredDrinks.length > 0 && (
            <section>
              <div className="flex items-center mb-12">
                <h2 className="text-4xl font-bold text-blue-950 font-serif">
                  Drinks
                </h2>
                <div className="flex-grow ml-6 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleDrinks.map((drink: MenuItem) => (
                  <div
                    key={drink.id}
                    className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img
                        src={`/images/${drink.image}`}
                        alt={drink.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-blue-950">
                            {drink.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {drink.nameAmharic}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                          ${drink.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-6 line-clamp-2 text-lg">
                        {drink.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {drink.categories.map((category: string) => (
                          <span
                            key={category}
                            className="px-4 py-1.5 bg-gray-50 text-blue-900 rounded-full text-sm font-medium border border-gray-100"
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={handleCall}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-300"
                      >
                        <FiPhone className="w-5 h-5" />
                        <span>Want it delivered? Call Us</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {filteredDrinks.length > ITEMS_PER_PAGE && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setShowAllDrinks(!showAllDrinks)}
                    className="px-8 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-300 border border-gray-200"
                  >
                    {showAllDrinks ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
