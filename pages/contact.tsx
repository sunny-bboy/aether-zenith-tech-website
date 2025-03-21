import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { useTranslation } from '../hooks/useTranslation';
import { getAllLocations } from '../lib/locations';
import { getAllServices } from '../lib/services';
import { getContactSEO } from '../lib/seo';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import LocationMap from '../components/LocationMap';

interface ContactPageProps {
  locations: any[];
  services: any[];
}

const ContactPage: React.FC<ContactPageProps> = ({ locations, services }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  
  // Get location and service from query params if available
  useEffect(() => {
    if (router.query.location) {
      const locationId = router.query.location as string;
      const location = locations.find(loc => loc.id === locationId);
      if (location) {
        setSelectedLocation(location);
      }
    }
  }, [router.query, locations]);

  const handleFormSuccess = () => {
    setFormSuccess(true);
    setFormError(false);
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormError = () => {
    setFormSuccess(false);
    setFormError(true);
  };

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Head>
        {Object.entries(getContactSEO()).map(([key, value]) => {
          if (key === 'title' || key === 'description') {
            return <meta key={key} name={key} content={value as string} />;
          }
          return null;
        })}
        <title>{getContactSEO().title as string}</title>
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeInUpVariants}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                {t('contact.hero.title')}
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeInUpVariants}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-300 mb-8"
              >
                {t('contact.hero.subtitle')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {t('contact.form.title')}
                  </h2>
                  
                  {formSuccess && (
                    <div className="mb-8 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
                      <p className="font-medium">{t('contact.form.successMessage')}</p>
                    </div>
                  )}
                  
                  {formError && (
                    <div className="mb-8 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg">
                      <p className="font-medium">{t('contact.form.errorMessage')}</p>
                    </div>
                  )}
                  
                  <ContactForm 
                    onSuccess={handleFormSuccess}
                    onError={handleFormError}
                    initialValues={{
                      service: router.query.service as string || '',
                      location: router.query.location as string || ''
                    }}
                  />
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="lg:col-span-1">
                {/* Headquarters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {t('contact.headquarters.title')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('contact.email')}</p>
                        <a href="mailto:info@aetherzenith.tech" className="text-primary-600 dark:text-primary-400 hover:underline">
                          info@aetherzenith.tech
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('contact.phone')}</p>
                        <a href="tel:+1-555-123-4567" className="text-primary-600 dark:text-primary-400 hover:underline">
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Office Selector */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {t('contact.offices.title')}
                  </h3>
                  
                  <div className="mb-4">
                    <label htmlFor="office-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.offices.selectLabel')}
                    </label>
                    <select
                      id="office-select"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={selectedLocation ? selectedLocation.id : ''}
                      onChange={(e) => {
                        const locationId = e.target.value;
                        const location = locations.find(loc => loc.id === locationId);
                        setSelectedLocation(location || null);
                      }}
                    >
                      <option value="">{t('contact.offices.selectDefault')}</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}, {location.country}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedLocation && (
                    <div>
                      <div className="mb-4 h-48 rounded-lg overflow-hidden">
                        <LocationMap
                          latitude={selectedLocation.coordinates.lat}
                          longitude={selectedLocation.coordinates.lng}
                          popupText={`${selectedLocation.name} Office`}
                          zoom={15}
                          height="100%"
                          width="100%"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('contact.address')}</p>
                            <p className="text-gray-700 dark:text-gray-300">{selectedLocation.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('contact.email')}</p>
                            <a href={`mailto:${selectedLocation.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                              {selectedLocation.email}
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
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('contact.phone')}</p>
                            <a href={`tel:${selectedLocation.phone}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                              {selectedLocation.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Social Media */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {t('contact.social.title')}
                  </h3>
                  
                  <div className="flex space-x-4">
                    <a 
                      href="https://twitter.com/aetherzenith" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 p-3 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com/company/aetherzenith" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 p-3 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a 
                      href="https://github.com/aetherzenith" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 p-3 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a 
                      href="https://facebook.com/aetherzenith" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 p-3 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('contact.faq.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('contact.faq.subtitle')}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {[1, 2, 3, 4, 5].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6 bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t(`contact.faq.questions.${index}.question`)}
                      </h3>
                      <span className="ml-6 flex-shrink-0 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                      <p>{t(`contact.faq.questions.${index}.answer`)}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const locations = getAllLocations();
  const services = getAllServices();
  
  return {
    props: {
      locations,
      services,
    },
  };
};

export default ContactPage; 