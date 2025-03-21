import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  iconBg?: string;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  iconBg = 'bg-primary-100 dark:bg-primary-900/30',
  href,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col"
    >
      {/* Icon */}
      <div className={`w-14 h-14 ${iconBg} rounded-lg flex items-center justify-center mb-5`}>
        {/* If icon is a URL, render an image */}
        {icon.startsWith('http') || icon.startsWith('/') ? (
          <img src={icon} alt={title} className="w-8 h-8" />
        ) : (
          // Otherwise, render the icon as SVG or font icon
          <span className="text-primary-600 dark:text-primary-400 text-2xl">{icon}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-5 flex-grow">
        {description}
      </p>

      {/* Link */}
      <Link href={href}>
        <a className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
          Learn More
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </Link>
    </motion.div>
  );
};

export default ServiceCard; 