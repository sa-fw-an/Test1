export const renderMarkdown = (markdown: string): string => {
  let html = markdown;

  // Convert headers
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 class="text-xl font-bold my-4 text-gray-800">$1</h3>',
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 class="text-2xl font-bold my-5 text-gray-800">$1</h2>',
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-3xl font-bold my-6 text-gray-800">$1</h1>',
  );

  // Convert bold
  html = html.replace(
    /\*\*(.*?)\*\*/gim,
    '<strong class="font-bold">$1</strong>',
  );

  // Convert italic
  html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');

  // Convert links
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    '<a href="$2" class="text-blue-600 hover:underline transition-colors duration-200">$1</a>',
  );

  // Convert code blocks with proper styling
  html = html.replace(
    /```(.*?)\n([\s\S]*?)```/gm,
    '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-gray-800"><code class="font-mono text-sm">$2</code></pre>',
  );

  // Convert inline code
  html = html.replace(
    /`(.*?)`/gim,
    '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>',
  );

  // Improved table handling
  const tableRegex = /^\|(.+)\|(\r?\n\|[-|\s]+\|)(\r?\n\|.+\|)+/gm;
  html = html.replace(tableRegex, function (match) {
    const rows = match.split('\n').filter((row) => row.trim() !== '');

    // Start building the table
    let tableHtml =
      '<div class="overflow-x-auto my-6 rounded-lg shadow"><table class="min-w-full border border-gray-200 divide-y divide-gray-200">';

    // Process each row
    rows.forEach((row, index) => {
      // Skip separator row (the one with |------|)
      if (row.match(/^\|[-|\s]+\|$/)) {
        return;
      }

      // Extract cells from the row
      const cells = row
        .split('|')
        .filter((cell) => cell.trim() !== '')
        .map((cell) => cell.trim());

      if (index === 0) {
        // This is the header row
        tableHtml += '<thead class="bg-gray-50"><tr>';
        cells.forEach((cell) => {
          tableHtml += `<th class="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-r last:border-r-0 border-gray-200">${cell}</th>`;
        });
        tableHtml +=
          '</tr></thead><tbody class="bg-white divide-y divide-gray-200">';
      } else if (index > 1) {
        // Skip the separator row (index 1)
        // These are data rows
        tableHtml += `<tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-150">`;
        cells.forEach((cell) => {
          tableHtml += `<td class="px-4 py-3 whitespace-normal text-sm text-gray-700 border-r last:border-r-0 border-gray-200">${cell}</td>`;
        });
        tableHtml += '</tr>';
      }
    });

    tableHtml += '</tbody></table></div>';
    return tableHtml;
  });

  // Convert unordered lists
  html = html.replace(/^\s*[/*-] (.+)$/gim, function (_match, content) {
    return `<ul class="list-disc pl-6 my-3"><li class="mb-1 text-gray-700">${content}</li></ul>`;
  });
  // Join adjacent list items
  html = html.replace(/<\/ul>\s*<ul class="list-disc pl-6 my-3">/gim, '');

  // Convert ordered lists
  html = html.replace(
    /^\s*(\d+)\. (.+)$/gim,
    function (_match, _number, content) {
      return `<ol class="list-decimal pl-6 my-3"><li class="mb-1 text-gray-700">${content}</li></ol>`;
    },
  );
  // Join adjacent ordered list items
  html = html.replace(/<\/ol>\s*<ol class="list-decimal pl-6 my-3">/gim, '');

  // Convert blockquotes
  html = html.replace(
    /^\s*>(.+)$/gim,
    '<blockquote class="border-l-4 border-blue-300 pl-4 py-2 my-4 italic text-gray-700 bg-blue-50 rounded-r-md">$1</blockquote>',
  );

  // Handle horizontal rules
  html = html.replace(
    /^\s*[-*_]{3,}\s*$/gim,
    '<hr class="my-8 border-t border-gray-300">',
  );

  // Convert paragraphs - do this last to avoid conflicts
  html = html.replace(
    /^(?!<[a-z]|\s*$)(.+)$/gim,
    '<p class="my-4 text-gray-700 leading-relaxed">$1</p>',
  );

  // Style first paragraph's first letter (if it exists)
  html = html.replace(
    /<p class="my-4 text-gray-700 leading-relaxed">(\w)/,
    '<p class="my-4 text-gray-700 leading-relaxed"><span class="text-5xl float-left mr-3 font-serif text-blue-600 mt-1">$1</span>',
  );

  // Remove extra line breaks
  html = html.replace(/\n/gim, ' ');

  // Make images smaller and centered with responsive sizing
  html = html.replace(
    /!\[(.*?)\]\((.*?)\)/gim,
    '<div class="flex justify-center my-6"><img src="$2" alt="$1" class="max-w-full sm:max-w-md md:max-w-lg rounded-lg shadow-md object-contain max-h-80" /></div>',
  );

  return html;
};

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  slug: string;
  author: string;
  description: string;
  tags: string[];
  image: string;
}

// Function to parse frontmatter from markdown content
export const parseFrontmatter = (
  content: string,
): { frontmatter: { [key: string]: string | string[] }; content: string } => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(content);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterString = match[1];
  const mainContent = match[2];

  // Parse frontmatter
  const frontmatter: Record<string, string | string[]> = {};
  const lines = frontmatterString.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // Convert comma-separated strings to arrays
      if (key === 'tags' && value) {
        const tagsArray = value.split(',').map((tag) => tag.trim());
        frontmatter[key] = tagsArray;
      } else {
        frontmatter[key] = value;
      }
    }
  }

  return { frontmatter, content: mainContent };
};

// Function to fetch and parse markdown files
export const fetchMarkdownPosts = async (
  category?: string,
): Promise<Post[]> => {
  try {
    // For Vite, use import.meta.glob to import all markdown files
    const markdownFiles = import.meta.glob('@/constants/posts/*.md', {
      query: '?raw',
      import: 'default',
    });

    const allPosts: Post[] = [];

    for (const [filePath, importFn] of Object.entries(markdownFiles)) {
      try {
        // Import the file content
        const fileContent = await importFn();

        // Parse frontmatter
        const { frontmatter, content } = parseFrontmatter(
          fileContent as string,
        );

        // Extract filename without extension to use as ID
        const fileName = filePath.split('/').pop()?.replace('.md', '') || '';

        const post: Post = {
          id: fileName,
          title: Array.isArray(frontmatter.title)
            ? frontmatter.title.join(' ')
            : frontmatter.title || 'Untitled',
          excerpt: Array.isArray(frontmatter.excerpt)
            ? frontmatter.excerpt.join(' ')
            : frontmatter.excerpt || '',
          content,
          category: Array.isArray(frontmatter.category)
            ? frontmatter.category.join(' ')
            : frontmatter.category || 'UNCATEGORIZED',
          date: Array.isArray(frontmatter.date)
            ? frontmatter.date.join(' ')
            : frontmatter.date || 'No date',
          slug: Array.isArray(frontmatter.slug)
            ? frontmatter.slug.join(' ')
            : frontmatter.slug || fileName,
          author: Array.isArray(frontmatter.author)
            ? frontmatter.author.join(' ')
            : frontmatter.author || 'Sugar Labs',
          description: Array.isArray(frontmatter.description)
            ? frontmatter.description.join(' ')
            : frontmatter.description || 'Writer and contributor at Sugar Labs',
          tags: Array.isArray(frontmatter.tags)
            ? frontmatter.tags
            : frontmatter.tags
              ? [frontmatter.tags]
              : [],
          image: Array.isArray(frontmatter.image)
            ? frontmatter.image.join(' ')
            : frontmatter.image || '/assets/Images/teach.jpg',
        };

        allPosts.push(post);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }

    // Sort posts by date (newest first)
    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

    // Filter by category if specified
    return category
      ? sortedPosts.filter((post) => post.category === category)
      : sortedPosts;
  } catch (error) {
    console.error('Error fetching markdown posts:', error);
    return [];
  }
};

// Function to get a single post by slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const allPosts = await fetchMarkdownPosts();
  return allPosts.find((post) => post.slug === slug) || null;
};
