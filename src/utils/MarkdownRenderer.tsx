import { useEffect, useMemo } from 'react';
import React, { Children } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSupersub from 'remark-supersub';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

// Define TypeScript interfaces
interface MarkdownRendererProps {
  content: string;
  setZoomableImages?: (images: HTMLImageElement[]) => void;
  frontmatter?: Record<string, string | number | boolean | null>;
}

// Extend the default rehypeSanitize schema to allow <mark> and <iframe> tags with necessary attributes
const customSanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'mark', 'iframe'],
  attributes: {
    ...defaultSchema.attributes,
    mark: ['class'],
    iframe: [
      'src',
      'allow',
      'allowfullscreen',
      'frameborder',
      'title',
      'style',
    ],
  },
};

// Emoji mapping for shortcode replacement
const emojiMap: Record<string, string> = {
  ':smile:': '😊',
  ':heart:': '❤️',
  ':thumbsup:': '👍',
  ':rocket:': '🚀',
  ':star:': '⭐',
  ':fire:': '🔥',
  ':warning:': '⚠️',
  ':info:': 'ℹ️',
  ':check:': '✅',
  ':x:': '❌',
};

const processMarkdownContent = (content: string): string => {
  let processed = content;

  Object.entries(emojiMap).forEach(([code, emoji]) => {
    const escapedCode = code.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&');
    processed = processed.replace(new RegExp(escapedCode, 'g'), emoji);
  });

  processed = processed.replace(
    /==([\s\S]*?)==/g,
    '<mark class="bg-yellow-200 px-1 rounded">$1</mark>',
  );

  // Handle collapsible sections
  processed = processed.replace(
    /:::details\s+(.*?)\n([\s\S]*?):::/gim,
    '<details class="my-4 border border-gray-200 rounded-lg overflow-hidden">' +
      '<summary class="bg-gray-100 px-4 py-2 cursor-pointer font-medium text-gray-800 hover:bg-gray-200 transition-colors">$1</summary>' +
      '<div class="px-4 py-3 text-gray-700">$2</div>' +
      '</details>',
  );

  // Updated YouTube embeds
  processed = processed.replace(
    /\[youtube:\s*([\w-]+)\]/gim,
    (_, videoId) => `
<div class="my-8 mx-auto" style="max-width: 90%;">
  <div class="rounded-xl shadow-lg overflow-hidden aspect-video">
    <iframe 
      src="https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0"
      class="w-full h-full border-0 rounded-xl"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="eager"
      title="YouTube video player">
    </iframe>
  </div>
</div>
`,
  );

  return processed;
};

const MarkdownRenderer = ({
  content,
  setZoomableImages,
  frontmatter,
}: MarkdownRendererProps) => {
  const processedContent = useMemo(
    () => processMarkdownContent(content),
    [content],
  );
  useEffect(() => {
    const handleCopyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest(
        '.copy-code-btn',
      ) as HTMLButtonElement | null;
      if (button) {
        const code = button.getAttribute('data-code') || '';
        navigator.clipboard.writeText(code).then(() => {
          const successMessage = button.nextElementSibling as HTMLElement;
          if (successMessage) {
            successMessage.classList.remove('hidden');
            setTimeout(() => {
              successMessage.classList.add('hidden');
            }, 2000);
          }
        });
      }
    };

    document.addEventListener('click', handleCopyClick as EventListener);
    return () =>
      document.removeEventListener('click', handleCopyClick as EventListener);
  }, []);
  useEffect(() => {
    if (setZoomableImages) {
      const images = document.querySelectorAll('img[data-zoomable="true"]');
      setZoomableImages(Array.from(images) as HTMLImageElement[]);
    }
  }, [processedContent, setZoomableImages]);

  const components: Components = {
    h1: ({ children, ...props }) => (
      <h1
        {...props}
        className="text-3xl font-bold my-6 text-gray-800 group flex items-center"
      >
        {children}
        {props.id && (
          <a
            href={`#${props.id}`}
            className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
            </svg>
          </a>
        )}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        {...props}
        className="text-2xl font-bold my-5 text-gray-800 group flex items-center"
      >
        {children}
        {props.id && (
          <a
            href={`#${props.id}`}
            className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
            </svg>
          </a>
        )}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        {...props}
        className="text-xl font-bold my-4 text-gray-800 group flex items-center"
      >
        {children}
        {props.id && (
          <a
            href={`#${props.id}`}
            className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
            </svg>
          </a>
        )}
      </h3>
    ),
    p: ({ node, children, ...props }) => {
      const firstLine = node?.position?.start?.line;
      if (
        firstLine === 1 &&
        Array.isArray(children) &&
        children.length > 0 &&
        typeof children[0] === 'string' &&
        children[0].trim().length > 0
      ) {
        const firstChar = children[0].charAt(0);
        const restOfText = children[0].slice(1);
        return (
          <p {...props} className="my-4 text-gray-700 leading-relaxed">
            <span className="text-5xl float-left mr-3 font-serif text-blue-600 mt-1">
              {firstChar}
            </span>
            {restOfText}
            {children.slice(1)}
          </p>
        );
      }
      return (
        <p {...props} className="my-4 text-gray-700 leading-relaxed">
          {children}
        </p>
      );
    },
    blockquote: ({ node, children, ...props }) => {
      interface ExtendedNode {
        type: string;
        parent?: ExtendedNode;
      }
      let nestingLevel = 0;
      let currentNode: ExtendedNode | undefined = node as ExtendedNode;
      while (currentNode && currentNode.parent) {
        if (currentNode.parent.type === 'blockquote') {
          nestingLevel++;
        }
        currentNode = currentNode.parent;
      }
      const borderColorClasses = ['border-green-400 bg-green-50'];
      const borderClass =
        borderColorClasses[nestingLevel % borderColorClasses.length];
      const marginClass = nestingLevel > 0 ? 'ml-4' : '';
      const nestIndicator =
        nestingLevel > 0 ? (
          <div className="absolute -left-2 top-0 bottom-0 flex items-center">
            <div
              className={`w-1 h-full ${borderClass.split(' ')[0].replace('border-', 'bg-')}`}
            />
          </div>
        ) : null;
      return (
        <blockquote
          {...props}
          className={`border-l-4 ${borderClass} ${marginClass} pl-4 py-2 my-4 italic text-gray-700 rounded-r-md relative`}
        >
          {nestIndicator}
          {children}
        </blockquote>
      );
    },
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) => {
      if (inline) {
        return (
          <code
            {...props}
            className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
          >
            {children}
          </code>
        );
      }
      const codeText = Children.toArray(children).reduce(
        (acc, child) => (typeof child === 'string' ? acc + child : acc),
        '',
      );
      return (
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-900 my-1 group">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              className="copy-code-btn bg-gray-600 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-sm flex items-center"
              data-code={codeText}
              onClick={(e) => e.stopPropagation()}
              aria-label="Copy code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </button>
            <span className="copy-success-message hidden absolute top-[1px] bg-gray-600 text-white text-xs px-2 py-1 rounded shadow-sm">
              Copied!
            </span>
          </div>
          <div className="px-2 overflow-x-auto">
            <pre className="px-3 py-7">
              <code
                className={
                  className
                    ? `${className} font-mono text-sm text-gray-200 block whitespace-pre overflow-visible`
                    : 'font-mono text-sm text-gray-200 block whitespace-pre overflow-visible'
                }
                style={{ lineHeight: 0.8 }}
              >
                {children}
              </code>
            </pre>
          </div>
        </div>
      );
    },
    img: ({ src = '', alt = '', title, ...props }) => {
      const imageSrc =
        src === '' && frontmatter?.image ? frontmatter.image : src;
      return (
        <figure className="flex flex-col items-center my-6">
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              {...props}
              src={String(imageSrc)}
              alt={alt}
              title={title || alt || ''}
              className="max-w-full sm:max-w-md md:max-w-lg rounded-lg object-contain max-h-80 hover:scale-105 transition-transform duration-300"
              data-zoomable="true"
              loading="lazy"
            />
          </div>
          {title && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {title}
            </figcaption>
          )}
        </figure>
      );
    },
    sub: ({ children }) => <sub className="text-xs">{children}</sub>,
    sup: ({ children }) => <sup className="text-xs">{children}</sup>,
    mark: ({ children }) => (
      <mark className="bg-yellow-200 px-1 rounded">{children}</mark>
    ),
    details: ({ children, ...props }) => (
      <details
        className="my-4 border border-gray-200 rounded-lg overflow-hidden"
        {...props}
      >
        {children}
      </details>
    ),
    summary: ({ children }) => (
      <summary className="bg-gray-100 px-4 py-2 cursor-pointer font-medium text-gray-800 hover:bg-gray-200 transition-colors">
        {children}
      </summary>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6 rounded-lg shadow">
        <table
          {...props}
          className="min-w-full border border-gray-200 divide-y divide-gray-200"
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead {...props} className="bg-gray-50">
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody {...props} className="bg-white divide-y divide-gray-200">
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr
        {...props}
        className="hover:bg-gray-100 transition-colors duration-150"
      >
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        {...props}
        className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-r last:border-r-0 border-gray-200"
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        {...props}
        className="px-4 py-3 whitespace-normal text-sm text-gray-700 border-r last:border-r-0 border-gray-200"
      >
        {children}
      </td>
    ),
    ul: ({ children, ...props }) => (
      <ul {...props} className="list-disc pl-6 my-4">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="list-decimal pl-6 my-4">
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li {...props} className="mb-1 text-gray-700">
        {children}
      </li>
    ),
    a: ({ href = '#', children, ...props }) => (
      <a
        href={href}
        {...props}
        className="text-blue-600 hover:underline transition-colors duration-200"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children, ...props }) => (
      <strong {...props} className="font-bold">
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em {...props} className="italic">
        {children}
      </em>
    ),
    hr: ({ ...props }) => (
      <hr {...props} className="my-8 border-t border-gray-300" />
    ),
    input: ({ ...props }) => (
      <input
        {...props}
        disabled
        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
      />
    ),
  };

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkFrontmatter, remarkGfm, remarkSupersub]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, customSanitizeSchema],
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
