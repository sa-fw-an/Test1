export interface MenuItem {
  label: string;
  path: string;
}

export interface DropdownItem {
  label: string;
  items: MenuItem[];
}

const aboutItems: MenuItem[] = [
  { label: 'About Us', path: '/about-us' },
  { label: 'Mission', path: '/mission' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Contact Us', path: '/contact-us' },
  { label: 'FAQs', path: '/faqs' },
];

const newsItems: MenuItem[] = [
  { label: 'Community News', path: '/community-news' },
  { label: 'Events', path: '/events' },
  { label: 'Press Release', path: '/press-release' },
  { label: 'Sugar Stories', path: '/sugar-stories' },
];

export const dropdowns: Record<string, DropdownItem> = {
  about: { label: 'About', items: aboutItems },
  news: { label: 'News', items: newsItems },
};
