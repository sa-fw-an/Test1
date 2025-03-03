import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import {
  heroContent,
  images,
  ImageConfig,
  mission,
} from '../constants/Info.ts';
import {
  fadeIn,
  simpleFadeIn,
  subtleRise,
  simpleGridContainer,
} from '../styles/Animations';

const Info: React.FC = () => {
  const renderImageCard = (key: string, image: ImageConfig) => (
    <motion.div
      key={key}
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
                 transition-all duration-500 bg-white"
      variants={subtleRise}
      whileHover="hover"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full max-h-80 md:h-96 object-cover transform group-hover:scale-105 
                   transition-all duration-700 ease-out"
        loading="lazy"
      />
      {image.caption && (
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                   to-transparent p-4 md:p-8"
        >
          <p className="text-white font-medium text-lg md:text-xl">
            {image.caption}
          </p>
        </div>
      )}
    </motion.div>
  );

  const renderCarouselItem = (key: string, image: ImageConfig) => (
    <div key={key} className="relative">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      {image.caption && (
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                   to-transparent p-4"
        >
          <p className="text-white font-normal text-base">{image.caption}</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-Inter">
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-20">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-8 max-w-7xl">
            <motion.div
              className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl 
                       transform hover:scale-[1.01] transition-all duration-500 
                       ease-out bg-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={simpleFadeIn}
            >
              <img
                src={images.main.src}
                alt={images.main.alt}
                className="w-full h-[500px] md:h-[700px] object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/70 
                         via-black/50 to-transparent"
              />
              <motion.div
                className="absolute top-1/2 left-2 md:left-12 transform -translate-y-1/2 
                         text-white max-w-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleRise}
              >
                <h1
                  className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 
                           leading-tight tracking-tight animate-fade-in font-display"
                >
                  {heroContent.title}
                </h1>
                <p
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 
                           animate-fade-in-delayed font-light"
                >
                  {heroContent.description}
                </p>
              </motion.div>
            </motion.div>

            {/* Desktop Image Grid */}
            <motion.div
              className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={simpleGridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {Object.entries(images)
                .filter(([key]) => key.startsWith('bottom'))
                .map(([key, image]) => renderImageCard(key, image))}
            </motion.div>

            {/* Mobile Carousel */}
            <motion.div
              className="md:hidden"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={5000}
                transitionTime={500}
                className="rounded-2xl overflow-hidden"
                stopOnHover
                swipeable
                emulateTouch
              >
                {Object.entries(images)
                  .filter(([key]) => key.startsWith('bottom'))
                  .map(([key, image]) => renderCarouselItem(key, image))}
              </Carousel>
            </motion.div>
          </section>

          {/* Mission Section */}
          <motion.section
            className="grid md:grid-cols-2 gap-10 md:gap-20 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={simpleFadeIn}
          >
            <div className="space-y-8 md:space-y-10">
              <div
                className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r 
                         from-red-500/10 to-orange-500/10 rounded-full"
              >
                <span
                  className="text-4xs md:text-sm font-bold text-red-600 tracking-wider 
                           uppercase"
                >
                  Empowering Young Learners
                </span>
              </div>
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-black space-y-2 
                         font-display tracking-tight"
                variants={subtleRise}
              >
                <span className="font-bold tracking-wider font-Caveat text-8xl">
                  Our Mission?
                </span>
                <div>
                  <div
                    className="text-transparent bg-clip-text bg-gradient-to-r 
                              from-red-500 to-orange-500 font-Caveat text-8xl"
                  >
                    Authentic
                  </div>
                  <span className="font-semibold">Problem</span>
                  <br />
                  <span className="font-semibold">Solving</span>
                </div>
              </motion.h2>

              <motion.h4
                className="text-lg md:text-xl font-bold text-gray-800"
                variants={subtleRise}
              >
                Igniting Curiosity through Project Based Learning
              </motion.h4>

              <p className="text-gray-600 text-base md:text-lg font-Roboto">
                Empowering Young Minds with Hands-on Learning, Transforming
                Curiosity into Discovery and Innovation.
              </p>
            </div>

            <motion.div className="relative" variants={subtleRise}>
              <div className="bg-auto rounded-2xl overflow-hidden shadow-xl">
                {/* Card on Top Left */}
                <motion.div
                  className="absolute top-2 left-2 md:top-2 md:left-2 bg-auto
                    backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg 
                    max-w-xs md:max-w-sm transform hover:scale-105 
                    transition-all duration-300 ease-out z-10 border-2 border-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2n text-gray-900 font-AnonymousPro">
                    Project Based Learning
                  </h3>
                  <p className="text-white text-xs md:text-sm">
                    Empowering learners and educators with hands-on
                    project-based tools that enable creation and real-world
                    problem-solving.
                  </p>
                </motion.div>

                {/* Background Image */}
                <motion.img
                  src={mission.learnImage}
                  alt="Students learning"
                  className="w-full rounded-2xl transform hover:scale-105 
                 transition-all duration-500 ease-out"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                />

                {/* Card on Bottom Right */}
                <motion.div
                  className="absolute bottom-4 right-4 md:bottom-2 md:right-2 bg-auto
                    backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg 
                    max-w-xs md:max-w-sm transform hover:scale-105 
                    transition-all duration-300 ease-out z-10 border-2 border-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-md md:text-lg font-bold mb-1 md:mb-2 text-amber-100 font-AnonymousPro">
                    Challenge and Fun: It's hard fun.
                  </h3>
                  <p className="text-white text-xs md:text-sm leading-snug">
                    Bringing interactive, meaningful experiences that make
                    education exciting and impactful.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>
        </main>
      </div>
    </>
  );
};

export default Info;
