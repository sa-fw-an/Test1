export interface MatrixLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
}

export const matrixLinks: MatrixLink[] = [
  {
    id: 'organization',
    title: 'Organization',
    description:
      "Discussion about our organization's projects, events, and planning.",
    url: 'https://matrix.to/#/#sugar:matrix.org',
    icon: 'building',
  },
  {
    id: 'webdev',
    title: 'Web Development',
    description:
      'Join our web development community room to discuss web technologies, frameworks, and best practices.',
    url: 'https://matrix.to/#/#sugarlabs-web:matrix.org',
    icon: 'code',
  },
  {
    id: 'mbdev',
    title: 'Music Blocks Development',
    description:
      'Music Blocks software development discussions and coding challenges.',
    url: 'https://matrix.to/#/#musicblocksdev:matrix.org',
    icon: 'terminal',
  },
  {
    id: 'sugarizerdev',
    title: 'Sugarizer Development',
    description:
      'Sugarizer software development discussions and coding challenges.',
    url: 'https://matrix.to/#/#sugarizer:matrix.org',
    icon: 'terminal',
  },
];
