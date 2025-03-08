import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMarkdownPosts, Post } from '@/utils/posts-utils';
import Footer from '@/sections/Footer';
import Header from '@/sections/Header';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeIn,
  slideInBottom,
  bounce,
  simpleFadeIn,
} from '@/styles/Animations';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  const validCategories = [
    'COMMUNITY NEWS',
    'EVENTS',
    'PRESS RELEASE',
    'SUGAR STORIES',
  ];

  const getInitialCategory = (): string => {
    const formattedCategory = category
      ? category.toUpperCase().replace('-', ' ')
      : '';
    return validCategories.includes(formattedCategory)
      ? formattedCategory
      : 'COMMUNITY NEWS';
  };

  const [activeCategory, setActiveCategory] =
    useState<string>(getInitialCategory());
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await fetchMarkdownPosts(activeCategory);
      setPosts(fetchedPosts);
      setDisplayCount(4);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    const categoryPath = activeCategory.toLowerCase().replace(' ', '-');
    if (category !== categoryPath) {
      navigate(`/news/${categoryPath}`, { replace: true });
    }
    loadPosts();
  }, [activeCategory, navigate, category, loadPosts]);

  const handlePostClick = (slug: string): void => {
    navigate(`/news/${activeCategory.toLowerCase().replace(' ', '-')}/${slug}`);
  };

  const handleCategoryClick = (category: string): void => {
    setActiveCategory(category);
  };

  const visiblePosts = posts.slice(0, displayCount);
  const hasMorePosts = posts.length > displayCount;

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-10">
        <motion.h1
          className="text-7xl font-bold font-Caveat text-center mb-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          NEWS
        </motion.h1>

        <div className="mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {validCategories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-5 py-2 rounded-lg transition-all duration-200 font-medium ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                  variants={bounce}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.h2
          className="text-5xl font-Caveat text-center mb-8 border-b pb-2 text-green-600"
          variants={slideInBottom}
          initial="hidden"
          animate="visible"
        >
          {activeCategory.charAt(0).toUpperCase() +
            activeCategory.slice(1).toLowerCase().replace('_', ' ')}
        </motion.h2>

        {posts.length === 0 && !isLoading ? (
          <p className="text-center text-gray-600 mb-10">
            No posts found in this category.
          </p>
        ) : (
          <>
            <AnimatePresence>
              {posts.length > 0 && (
                <motion.div
                  className="mb-12 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white"
                  onClick={() => handlePostClick(posts[0].slug)}
                  variants={simpleFadeIn}
                  initial="hidden"
                  animate="visible"
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
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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

            {visiblePosts.length > 1 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {visiblePosts.slice(1).map((post) => (
                    <motion.div
                      key={post.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                      onClick={() => handlePostClick(post.slug)}
                      variants={simpleFadeIn}
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
                          className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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

            {hasMorePosts && (
              <div className="flex justify-center my-10">
                <motion.button
                  onClick={handleShowMore}
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg shadow-md hover:shadow-lg duration-300 font-medium"
                  variants={bounce}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isLoading ? (
                    <motion.div
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'linear',
                      }}
                    />
                  ) : (
                    'Show More'
                  )}
                </motion.button>
              </div>
            )}

            {isLoading && posts.length === 0 && (
              <div className="flex justify-center items-center h-24 my-8">
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
