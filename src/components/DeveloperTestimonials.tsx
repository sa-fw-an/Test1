import { motion } from 'framer-motion';
import { Marquee } from '@/components/magicui/Marquee';
import { developertestimonials } from '@/constants/VolunteerAndDev/DeveloperTestimonials';
import { stats } from '@/constants/Stats';
import {
  testimonialCard,
  testimonialHeading,
  decorativeElement,
  testimonialText,
  avatarReveal,
  marqueeContainer,
} from '@/styles/Animations';

const ReviewCard = ({
  img,
  name,
  username,
  body,
  delay = 0,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-xl p-6 flex flex-col items-center text-center min-h-[250px] h-auto w-[350px] shadow-lg border border-gray-200 dark:border-gray-700 mx-2 justify-between"
      variants={testimonialCard}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay }}
    >
      {/* Quote Icon */}
      <motion.img
        src={stats.apostrophie}
        alt="double-quotes"
        className="w-10 h-10 self-start opacity-70"
        variants={decorativeElement}
      />

      {/* Feedback Text */}
      <motion.p
        className="text-gray-700 dark:text-gray-300 mt-2"
        variants={testimonialText}
      >
        {body}
      </motion.p>

      {/* User Info */}
      <div className="flex items-center mt-4 space-x-3 text-left">
        <motion.img
          src={img}
          alt={name}
          className="w-12 h-12 rounded-full border border-gray-300"
          variants={avatarReveal}
        />
        <motion.div variants={testimonialText}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{username}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export function DeveloperTestimonials() {
  return (
    <div className="w-full p-6">
      {/* Heading Section with Hearts */}
      <motion.div
        className="flex items-center justify-center gap-4 md:gap-6 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={marqueeContainer}
      >
        {/* Left Heart */}
        <motion.img
          src={stats.leftHeart}
          alt="Heart Left"
          className="w-8 md:w-12 lg:w-16 fill-current text-red-500 border-none shadow-none"
          variants={decorativeElement}
          animate="float"
          custom={1}
        />

        <div className="relative flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
          {/* Left Apostrophe (Hidden Below 400px) */}
          <motion.img
            src={stats.apostrophie}
            alt="Apostrophe Left"
            className="w-8 md:w-12 lg:w-16 -translate-y-2 block max-[400px]:hidden"
            variants={decorativeElement}
            custom={2}
          />

          <motion.h2
            className="font-bold tracking-wider font-Caveat text-3xl md:text-5xl lg:text-6xl text-gray-800 text-center"
            variants={testimonialHeading}
          >
            <span className="text-5xl font-bold font-[Caveat]">
              What do developers say
              <br />
              about their journey?
            </span>
          </motion.h2>

          {/* Right Apostrophe (Flipped, Hidden Below 400px) */}
          <motion.img
            src={stats.apostrophie}
            alt="Apostrophe Right"
            className="w-8 md:w-12 lg:w-16 -translate-y-2 scale-x-[-1] block max-[400px]:hidden"
            variants={decorativeElement}
            custom={3}
          />
        </div>

        {/* Right Heart */}
        <motion.img
          src={stats.rightHeart}
          alt="Heart Right"
          className="w-8 md:w-12 lg:w-16 fill-current text-red-500 border-none shadow-none"
          variants={decorativeElement}
          animate="float"
          custom={4}
        />
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="relative flex flex-col items-center justify-center w-full overflow-hidden mt-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={marqueeContainer}
      >
        <Marquee pauseOnHover className="w-full flex">
          {developertestimonials.map((review, index) => (
            <ReviewCard
              key={review.username}
              {...review}
              delay={index * 0.05}
            />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </motion.div>
    </div>
  );
}
