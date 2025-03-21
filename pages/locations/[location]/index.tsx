import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { useTranslation } from '../../../hooks/useTranslation';
import { getLocationById, getAllLocationIds } from '../../../lib/locations';
import { getServiceById } from '../../../lib/services';
import { getLocationSEO } from '../../../lib/seo';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ServiceCard from '../../../components/ServiceCard';
import LocationMap from '../../../components/LocationMap';
import CTASection from '../../../components/CTASection';

interface LocationPageProps {
  location: any;
  services: any[];
}

const LocationPage: React.FC<LocationPageProps> = ({ location, services }) => {
  const router = useRouter();
  const { t } = useTranslation();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Head>
        {Object.entries(getLocationSEO(location)).map(([key, value]) => {
          if (key === 'title' || key === 'description') {
            return <meta key={key} name={key} content={value as string} />;
          }
          return null;
        })}
        <title>{getLocationSEO(location).title as string}</title>
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{location.name}</h1>
              <p className="text-2xl text-gray-300 mb-8">{location.country}</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Map */}
                <div className="mb-12 rounded-xl overflow-hidden shadow-lg h-[400px]">
                  <LocationMap
                    latitude={location.coordinates.lat}
                    longitude={location.coordinates.lng}
                    popupText={`${location.name} Office`}
                    zoom={15}
                    height="100%"
                    width="100%"
                  />
                </div>
                
                {/* Description */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    About Our {location.name} Office
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300">{location.description}</p>
                  </div>
                </div>
                
                {/* Key Industries */}
                {location.keyIndustries && location.keyIndustries.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                      {t('locations.officeDetail.keyIndustries')}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {location.keyIndustries.map((industry: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">{industry}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Services Offered */}
                {services.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                      {t('locations.officeDetail.servicesOffered')}
                    </h2>
                    
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {services.map((service) => (
                        <motion.div key={service.id} variants={itemVariants}>
                          <ServiceCard
                            title={service.title}
                            description={service.shortDescription}
                            icon={service.icon}
                            iconBg={service.iconBg}
                            href={`/services/${service.id}/${location.id}`}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {t('locations.officeDetail.contactInfo')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                        <p className="text-gray-700 dark:text-gray-300">{location.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <a href={`mailto:${location.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                          {location.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <a href={`tel:${location.phone}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                          {location.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Office Details */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Office Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('locations.officeDetail.teamSize')}</p>
                        <p className="text-gray-700 dark:text-gray-300">{location.teamSize} professionals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('locations.officeDetail.established')}</p>
                        <p className="text-gray-700 dark:text-gray-300">{location.established}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Button */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {t('locations.officeDetail.contactUs')}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Interested in our services in {location.name}? Contact us to discuss your specific needs.
                  </p>
                  
                  <Link href={`/contact?location=${location.id}`}>
                    <a className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-3 px-4 rounded-lg transition-colors duration-300">
                      {t('common.contactUs')}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllLocationIds();
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locationId = params?.location as string;
  const location = getLocationById(locationId);
  
  if (!location) {
    return {
      notFound: true,
    };
  }
  
  // Get services offered at this location
  const services = location.services
    ? location.services.map((serviceId: string) => getServiceById(serviceId)).filter(Boolean)
    : [];
  
  return {
    props: {
      location,
      services,
    },
  };
};

export default LocationPage; 