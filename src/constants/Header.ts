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

export const dropdowns: Record<string, DropdownItem> = {
  about: { label: 'About', items: aboutItems },
};
