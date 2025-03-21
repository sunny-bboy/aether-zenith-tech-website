import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
  };
  categories?: string[];
  readTime?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  slug,
  coverImage,
  date,
  author,
  categories = [],
  readTime,
}) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image */}
      <Link href={`/blog/${slug}`} className="block relative h-48 md:h-60 overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          width={800}
          height={400}
          className="object-cover transition-transform hover:scale-105 duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs font-medium px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800/40 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">
          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Author */}
          <div className="flex items-center">
            {author.avatar ? (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center mr-3">
                {author.name.charAt(0)}
              </div>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {author.name}
            </span>
          </div>

          {/* Date and Read Time */}
          <div className="text-xs text-gray-500 dark:text-gray-500">
            <span>{formattedDate}</span>
            {readTime && (
              <>
                <span className="mx-1">•</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 