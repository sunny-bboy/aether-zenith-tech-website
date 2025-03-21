import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useTranslation } from '../../hooks/useTranslation';
import { getAllLocations, getAllCountries } from '../../lib/locations';
import { getDefaultSEO } from '../../lib/seo';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LocationMap from '../../components/LocationMap';
import CTASection from '../../components/CTASection';

interface LocationsPageProps {
  locations: any[];
  countries: string[];
}

const LocationsPage: React.FC<LocationsPageProps> = ({ locations, countries }) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  // Filter locations by selected country
  const filteredLocations = selectedCountry
    ? locations.filter((location) => location.country === selectedCountry)
    : locations;
  
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
        <title>{`${t('locations.title')} | Aether Zenith`}</title>
        <meta name="description" content={t('locations.subtitle')} />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('locations.title')}</h1>
              <p className="text-xl text-gray-300 mb-8">{t('locations.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Country Filter */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedCountry(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCountry === null
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  All Locations
                </button>
                
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCountry === country
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Locations Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredLocations.map((location) => (
                <motion.div key={location.id} variants={itemVariants}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                    {/* Map */}
                    <div className="h-48 relative">
                      <LocationMap
                        latitude={location.coordinates.lat}
                        longitude={location.coordinates.lng}
                        popupText={`${location.name} Office`}
                        zoom={13}
                        height="100%"
                        width="100%"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-grow">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {location.name}
                      </h2>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                        {location.country}
                      </p>
                      
                      <div className="mb-6">
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {location.address}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          <a href={`mailto:${location.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                            {location.email}
                          </a>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          <a href={`tel:${location.phone}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                            {location.phone}
                          </a>
                        </p>
                      </div>
                      
                      {/* Key Industries */}
                      {location.keyIndustries && location.keyIndustries.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {t('locations.officeDetail.keyIndustries')}:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {location.keyIndustries.slice(0, 3).map((industry: string, index: number) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-xs"
                              >
                                {industry}
                              </span>
                            ))}
                            {location.keyIndustries.length > 3 && (
                              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-xs">
                                +{location.keyIndustries.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 pb-6">
                      <Link href={`/locations/${location.id}`}>
                        <a className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-3 px-4 rounded-lg transition-colors duration-300">
                          View Details
                        </a>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const locations = getAllLocations();
  const countries = getAllCountries();
  
  return {
    props: {
      locations,
      countries,
    },
  };
}

export default LocationsPage; 