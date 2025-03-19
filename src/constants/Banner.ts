export interface BannerConfig {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  theme?: 'primary' | 'success' | 'warning' | 'sale' | 'info';
  isExternalLink?: boolean;
}

export interface IconProps {
  theme: 'primary' | 'success' | 'warning' | 'sale' | 'info';
}

export const bannerConfigs = {
  donation: {
    title:
      'Help us reach our goal - $15,000 needed for our new community center (Mock Text for display)',
    description:
      'Your contribution makes a difference in our community. Join 230 others who have already donated.',
    buttonText: 'Donate Now',
    buttonLink: '/donate',
    theme: 'primary' as const,
  },

  sale: {
    title:
      'Flash Sale! 48 Hours Only - 40% OFF All Premium Templates (Mock Text for display)',
    description: 'Use code FLASH40 at checkout. Ends Sunday at midnight.',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    theme: 'sale' as const,
  },

  newRelease: {
    title:
      'New Product Launch! Introducing our AI-powered design tools (Mock Text for display)',
    buttonText: 'Learn More',
    buttonLink: '/products',
    theme: 'info' as const,
  },

  limitedOffer: {
    title:
      'Limited Time Offer - Early Bird Tickets Available (Mock Text for display)',
    description: 'Register now and save 30% on conference tickets',
    buttonText: 'Register',
    buttonLink: '/volunteer',
    theme: 'warning' as const,
  },

  announcement: {
    title:
      'Important Announcement: System maintenance scheduled (Mock Text for display)',
    description:
      'Our platform will be down for maintenance on March 15th from 2-4 AM UTC',
    buttonText: 'Read More',
    buttonLink: 'https://www.example.com',
    theme: 'info' as const,
    isExternalLink: true,
  },

  successStory: {
    title:
      'Success Story: How Our Tools Helped a Small Business Thrive (Mock Text for display)',
    description: 'Read about how our solutions transformed a local business.',
    buttonText: 'Read Story',
    buttonLink: '/news/sugar-stories',
    theme: 'success' as const,
  },

  webinar: {
    title:
      'Upcoming Webinar: Mastering the Art of Digital Marketing (Mock Text for display)',
    description: 'Join us live on March 25th. Seats are limited!',
    buttonText: 'Register Now',
    buttonLink: 'https://www.example.com',
    theme: 'info' as const,
    isExternalLink: true,
  },

  feedback: {
    title: 'We Value Your Feedback',
    description:
      'Take our short survey and help us improve your experience. (Mock Text for display)',
    buttonText: 'Give Feedback',
    buttonLink: '/contact-us',
    theme: 'info' as const,
  },

  seasonalPromo: {
    title:
      'Spring Sale! Refresh Your Wardrobe with 30% OFF (Mock Text for display)',
    description: 'New season, new styles. Use code SPRING30 at checkout.',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    theme: 'sale' as const,
  },

  securityUpdate: {
    title: 'Security Update: Protect Your Account (Mock Text for display)',
    description:
      'Enable two-factor authentication to enhance your account security.',
    buttonText: 'Learn How',
    buttonLink: 'https://www.example.com',
    theme: 'warning' as const,
    isExternalLink: true,
  },
};
