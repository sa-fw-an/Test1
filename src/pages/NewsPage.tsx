import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchMarkdownPosts, Post } from '@/utils/markdownutils';
import Footer from '@/sections/Footer';
import Header from '@/sections/Header';
import { motion, AnimatePresence } from 'framer-motion';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Extract category from URL hash if present
  const getInitialCategory = (): string => {
    const hash = location.hash.replace('#', '');
    const validCategories = [
      'COMMUNITY NEWS',
      'EVENTS',
      'PRESS RELEASE',
      'SUGAR STORIES',
    ];
    return validCategories.includes(hash) ? hash : 'COMMUNITY NEWS';
  };

  const [activeCategory, setActiveCategory] =
    useState<string>(getInitialCategory());
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(4);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Categories for the navigation
  const categories = [
    'COMMUNITY NEWS',
    'EVENTS',
    'PRESS RELEASE',
    'SUGAR STORIES',
  ];

  // Load posts based on the active category
  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await fetchMarkdownPosts(activeCategory);
      setPosts(fetchedPosts);
      setDisplayCount(4);
      setHasMore(fetchedPosts.length > 4);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  // Load more posts when scrolling
  const loadMorePosts = useCallback(() => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prevCount) => {
        const newCount = prevCount + 3;
        setHasMore(newCount < posts.length);
        return newCount;
      });
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, [hasMore, isLoading, posts.length]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 },
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMorePosts]);

  useEffect(() => {
    // Update URL hash when category changes
    if (location.hash !== `#${activeCategory}`) {
      navigate(`#${activeCategory}`, { replace: true });
    }

    loadPosts();
  }, [activeCategory, navigate, location.hash, loadPosts]);

  const handlePostClick = (slug: string): void => {
    navigate(`/news/${slug}`);
  };

  const handleCategoryClick = (category: string): void => {
    setActiveCategory(category);
  };

  const visiblePosts = posts.slice(0, displayCount);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* News Header */}
        <h1 className="text-6xl font-bold text-center mb-8 text-blue-600">
          NEWS
        </h1>

        {/* Category Navigation */}
        <div className="relative flex justify-center mb-8 overflow-hidden">
          <div className="flex gap-3 py-2 px-4 overflow-x-auto scrollbar-hide snap-x">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-2.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category
                    ? 'font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md shadow-blue-200 dark:shadow-blue-900/30'
                    : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Fade indicators for scroll */}
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
        </div>

        {/* Category Title */}
        <h2 className="text-3xl font-script text-center mb-8 border-b pb-2 text-green-600">
          {activeCategory.charAt(0).toUpperCase() +
            activeCategory.slice(1).toLowerCase().replace('_', ' ')}
        </h2>

        {posts.length === 0 && !isLoading ? (
          <p className="text-center text-gray-600 mb-10">
            No posts found in this category.
          </p>
        ) : (
          <>
            {/* Featured Post (First Post) */}
            <AnimatePresence>
              {posts.length > 0 && (
                <motion.div
                  className="mb-12 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white"
                  onClick={() => handlePostClick(posts[0].slug)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative md:flex">
                    <div className="md:w-1/3 overflow-hidden">
                      <img
                        src={posts[0].image}
                        alt={posts[0].title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="md:w-2/3 p-8 flex flex-col justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 mb-4 rounded-full">
                          {posts[0].category}
                        </span>
                        <h3 className="text-2xl font-bold mb-4 text-blue-600">
                          {posts[0].title}
                        </h3>
                        <p className="text-gray-600 mb-4">{posts[0].excerpt}</p>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm mb-4 font-medium text-gray-500">
                          {posts[0].date}
                        </p>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(posts[0].slug);
                          }}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* More Posts Grid - Starting from the second post */}
            {visiblePosts.length > 1 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence>
                  {visiblePosts.slice(1).map((post, index) => (
                    <motion.div
                      key={post.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                      onClick={() => handlePostClick(post.slug)}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: (index % 3) * 0.1, // Staggered animation
                      }}
                    >
                      <div className="h-32 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex-grow">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 mb-3 rounded-full">
                          {post.category}
                        </span>
                        <h3 className="text-xl font-bold mb-3 text-blue-600 hover:underline">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="px-6 pb-6 pt-2 flex justify-between items-center mt-auto">
                        <p className="text-sm font-medium text-gray-500">
                          {post.date}
                        </p>
                        <button
                          className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(post.slug);
                          }}
                        >
                          Read More
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Loading Indicator */}
            {posts.length > 0 && (
              <div
                ref={loadingRef}
                className="flex justify-center items-center h-24 my-8"
              >
                {isLoading && hasMore ? (
                  <motion.div
                    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ) : hasMore ? (
                  <p className="text-gray-500">Scroll for more</p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500"
                  >
                    No more posts to load
                  </motion.p>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
