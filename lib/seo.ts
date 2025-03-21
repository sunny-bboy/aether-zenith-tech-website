import { NextSeoProps } from 'next-seo';
import { useTranslation } from '../hooks/useTranslation';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title: string;
    description: string;
    url?: string;
    locale?: string;
    site_name?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    cardType?: string;
    site?: string;
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
  }>;
}

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export const getHomeSEO = (): SEOProps => {
  return {
    title: 'Aether Zenith Tech | Innovative Software Solutions',
    description: 'Aether Zenith Tech provides cutting-edge AI-driven financial solutions, cloud computing, web & app development, and digital transformation strategies.',
    canonical: 'https://aetherzenith.tech',
    openGraph: {
      title: 'Aether Zenith Tech | Innovative Software Solutions',
      description: 'Cutting-edge AI-driven financial solutions, cloud computing, web & app development, and digital transformation strategies.',
      url: 'https://aetherzenith.tech',
      site_name: 'Aether Zenith Tech',
      images: [
        {
          url: 'https://aetherzenith.tech/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Aether Zenith Tech',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@aetherzenith',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'software development, AI solutions, cloud computing, digital transformation, web development, app development',
      },
    ],
  };
};

export const getAboutSEO = (): SEOProps => {
  return {
    title: 'About Us | Aether Zenith Tech',
    description: 'Learn about Aether Zenith Tech, our mission, values, and the team behind our innovative software solutions.',
    canonical: 'https://aetherzenith.tech/about',
    openGraph: {
      title: 'About Us | Aether Zenith Tech',
      description: 'Learn about Aether Zenith Tech, our mission, values, and the team behind our innovative software solutions.',
      url: 'https://aetherzenith.tech/about',
      site_name: 'Aether Zenith Tech',
      images: [
        {
          url: 'https://aetherzenith.tech/images/about/team.jpg',
          width: 1200,
          height: 630,
          alt: 'Aether Zenith Tech Team',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@aetherzenith',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'about us, company mission, company values, tech team, software development company',
      },
    ],
  };
};

export const getContactSEO = (): SEOProps => {
  return {
    title: 'Contact Us | Aether Zenith Tech',
    description: 'Get in touch with Aether Zenith Tech. Contact us for inquiries about our services, partnerships, or career opportunities.',
    canonical: 'https://aetherzenith.tech/contact',
    openGraph: {
      title: 'Contact Us | Aether Zenith Tech',
      description: 'Get in touch with Aether Zenith Tech. Contact us for inquiries about our services, partnerships, or career opportunities.',
      url: 'https://aetherzenith.tech/contact',
      site_name: 'Aether Zenith Tech',
      images: [
        {
          url: 'https://aetherzenith.tech/images/contact.jpg',
          width: 1200,
          height: 630,
          alt: 'Contact Aether Zenith Tech',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@aetherzenith',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'contact us, get in touch, inquiries, software development services, tech support',
      },
    ],
  };
};

export const getServicesSEO = (): SEOProps => {
  return {
    title: 'Our Services | Aether Zenith Tech',
    description: 'Explore our comprehensive range of software development services including AI solutions, cloud computing, web & app development, and digital transformation.',
    canonical: 'https://aetherzenith.tech/services',
    openGraph: {
      title: 'Our Services | Aether Zenith Tech',
      description: 'Explore our comprehensive range of software development services including AI solutions, cloud computing, web & app development, and digital transformation.',
      url: 'https://aetherzenith.tech/services',
      site_name: 'Aether Zenith Tech',
      images: [
        {
          url: 'https://aetherzenith.tech/images/services.jpg',
          width: 1200,
          height: 630,
          alt: 'Aether Zenith Tech Services',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@aetherzenith',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'software services, AI solutions, cloud computing, web development, app development, digital transformation',
      },
    ],
  };
};

export const getLocationsSEO = (): SEOProps => {
  return {
    title: 'Our Locations | Aether Zenith Tech',
    description: 'Discover Aether Zenith Tech offices around the world. Find your nearest location and get in touch with our local teams.',
    canonical: 'https://aetherzenith.tech/locations',
    openGraph: {
      title: 'Our Locations | Aether Zenith Tech',
      description: 'Discover Aether Zenith Tech offices around the world. Find your nearest location and get in touch with our local teams.',
      url: 'https://aetherzenith.tech/locations',
      site_name: 'Aether Zenith Tech',
      images: [
        {
          url: 'https://aetherzenith.tech/images/locations.jpg',
          width: 1200,
          height: 630,
          alt: 'Aether Zenith Tech Global Locations',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@aetherzenith',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'global offices, locations, international presence, software development company locations',
      },
    ],
  };
};

export const getServiceSEO = (service: any): SEOProps => {
  return {
    title: `${service.title} | Aether Zenith Tech`,
    description: service.description?.substring(0, 160) || `Learn about our ${service.title} service at Aether Zenith Tech.`,
    canonical: `https://aetherzenith.tech/services/${service.id}`,
    openGraph: {
      title: `${service.title} | Aether Zenith Tech`,
      description: service.description?.substring(0, 160) || `Learn about our ${service.title} service at Aether Zenith Tech.`,
      url: `https://aetherzenith.tech/services/${service.id}`,
      site_name: 'Aether Zenith Tech',
      images: [
        {
          url: `https://aetherzenith.tech/images/services/${service.id}.jpg`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@aetherzenith',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: `${service.title}, software development, tech solutions, ${service.keywords?.join(', ') || ''}`,
      },
    ],
  };
};

export const getLocationSEO = (location: any): SEOProps => {
  return {
    title: `${location.name}, ${location.country} Office | Aether Zenith Tech`,
    description: location.description?.substring(0, 160) || `Visit our ${location.name} office in ${location.country}. Get in touch with our local team.`,
    canonical: `https://aetherzenith.tech/locations/${location.id}`,
    openGraph: {
      title: `${location.name}, ${location.country} Office | Aether Zenith Tech`,
      description: location.description?.substring(0, 160) || `Visit our ${location.name} office in ${location.country}. Get in touch with our local team.`,
      url: `https://aetherzenith.tech/locations/${location.id}`,
      site_name: 'Aether Zenith Tech',
      images: [
        {
          url: `https://aetherzenith.tech/images/locations/${location.id}.jpg`,
          width: 1200,
          height: 630,
          alt: `${location.name} Office`,
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@aetherzenith',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: `${location.name}, ${location.country}, office location, software development, tech solutions`,
      },
    ],
  };
};

export const getServiceLocationSEO = (service: any, location: any): SEOProps => {
  return {
    title: `${service.title} in ${location.name}, ${location.country} | Aether Zenith Tech`,
    description: `Learn about our ${service.title} services in ${location.name}, ${location.country}. Contact our local team for tailored solutions.`,
    canonical: `https://aetherzenith.tech/services/${service.id}/${location.id}`,
    openGraph: {
      title: `${service.title} in ${location.name}, ${location.country} | Aether Zenith Tech`,
      description: `Learn about our ${service.title} services in ${location.name}, ${location.country}. Contact our local team for tailored solutions.`,
      url: `https://aetherzenith.tech/services/${service.id}/${location.id}`,
      site_name: 'Aether Zenith Tech',
      images: [
        {
          url: `https://aetherzenith.tech/images/services/${service.id}-${location.id}.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.title} in ${location.name}`,
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@aetherzenith',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: `${service.title}, ${location.name}, ${location.country}, local services, software development, tech solutions`,
      },
    ],
  };
};

/**
 * Get default SEO data for the website
 */
export function getDefaultSEO(): SEOData {
  return {
    title: 'Aether Zenith Tech | Innovative Software Solutions',
    description: 'Aether Zenith Tech provides cutting-edge AI-driven financial solutions, cloud computing, web & app development, and digital transformation strategies.',
    keywords: 'software development, AI solutions, cloud computing, digital transformation, web development, app development',
    ogImage: 'https://aetherzenith.tech/images/og-image.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };
}

/**
 * Get SEO data for the About page
 */
export function getAboutPageSEO(): SEOData {
  return {
    title: 'About Us | Aether Zenith Tech',
    description: 'Learn about Aether Zenith Tech, our mission, values, and the team behind our innovative software solutions.',
    keywords: 'about us, company mission, company values, tech team, software development company',
    ogImage: 'https://aetherzenith.tech/images/about/team.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };
}

/**
 * Get SEO data for the Contact page
 */
export function getContactPageSEO(): SEOData {
  return {
    title: 'Contact Us | Aether Zenith Tech',
    description: 'Get in touch with Aether Zenith Tech. Contact us for inquiries about our services, partnerships, or career opportunities.',
    keywords: 'contact us, get in touch, inquiries, software development services, tech support',
    ogImage: 'https://aetherzenith.tech/images/contact.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };
}

/**
 * Get SEO data for the Services page
 */
export function getServicesPageSEO(): SEOData {
  return {
    title: 'Our Services | Aether Zenith Tech',
    description: 'Explore our comprehensive range of software development services including AI solutions, cloud computing, web & app development, and digital transformation.',
    keywords: 'software services, AI solutions, cloud computing, web development, app development, digital transformation',
    ogImage: 'https://aetherzenith.tech/images/services.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };
}

/**
 * Get SEO data for the Blog page
 */
export function getBlogPageSEO(): SEOData {
  return {
    title: 'Blog | Aether Zenith Tech',
    description: 'Read the latest insights, news, and articles about software development, AI, cloud computing, and digital transformation from Aether Zenith Tech.',
    keywords: 'blog, tech blog, software development blog, AI insights, cloud computing news, digital transformation articles',
    ogImage: 'https://aetherzenith.tech/images/blog.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };
}

/**
 * Get SEO data for a specific blog post
 */
export function getBlogPostSEO(post: any): SEOData {
  return {
    title: `${post.title} | Aether Zenith Tech Blog`,
    description: post.excerpt || 'Read this insightful article from Aether Zenith Tech about software development, AI, cloud computing, and digital transformation.',
    keywords: `${post.tags?.join(', ') || ''}, blog post, tech article, software development`,
    ogImage: post.featuredImage || 'https://aetherzenith.tech/images/blog.jpg',
    ogType: 'article',
    twitterCard: 'summary_large_image',
  };
} 