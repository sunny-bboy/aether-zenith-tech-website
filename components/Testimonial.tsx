import React from 'react';
import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  imageSrc?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  position,
  company,
  rating,
  imageSrc,
}) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    return author
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {/* Quote Icon */}
      <div className="mb-4 text-primary-500 dark:text-primary-400">
        <svg
          className="w-10 h-10"
          fill="currentColor"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.722 6.422c-5.041 2.7-8.722 7.331-8.722 13.663 0 3.75 1.809 6.022 4.716 6.022 2.306 0 4.043-1.587 4.043-3.931 0-2.306-1.622-3.931-3.891-3.931-0.994 0-1.622 0.244-2.269 0.653-0.203-1.5-0.203-2.306-0.203-2.756 0-4.5 2.794-7.706 6.591-9.45l-0.266-0.269zM24.925 6.422c-5.041 2.7-8.722 7.331-8.722 13.663 0 3.75 1.809 6.022 4.716 6.022 2.306 0 4.041-1.587 4.041-3.931 0-2.306-1.622-3.931-3.891-3.931-0.994 0-1.622 0.244-2.269 0.653-0.203-1.5-0.203-2.306-0.203-2.756 0-4.5 2.794-7.706 6.591-9.45l-0.263-0.269z" />
        </svg>
      </div>

      {/* Quote Text */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{quote}</p>

      {/* Rating */}
      <div className="flex mb-4">{renderStars()}</div>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          {imageSrc ? (
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={imageSrc}
                alt={author}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium">
              {getInitials()}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {author}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial; 