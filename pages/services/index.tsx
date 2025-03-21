import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import { useTranslation } from '../../hooks/useTranslation';
import { getAllServices } from '../../lib/services';
import { getServicesPageSEO } from '../../lib/seo';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceCard from '../../components/ServiceCard';
import CTASection from '../../components/CTASection';

interface ServicesPageProps {
  services: any[];
}

const ServicesPage: React.FC<ServicesPageProps> = ({ services }) => {
  const { t } = useTranslation();
  
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
        {Object.entries(getServicesPageSEO()).map(([key, value]) => {
          if (key === 'title' || key === 'description') {
            return <meta key={key} name={key} content={value as string} />;
          }
          return null;
        })}
        <title>{getServicesPageSEO().title as string}</title>
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('services.title')}</h1>
              <p className="text-xl text-gray-300 mb-8">{t('services.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {services.map((service) => (
                <motion.div key={service.id} variants={itemVariants}>
                  <ServiceCard
                    title={service.title}
                    description={service.shortDescription}
                    icon={service.icon}
                    iconBg={service.iconBg}
                    href={`/services/${service.id}`}
                  />
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
  const services = getAllServices();
  
  return {
    props: {
      services,
    },
  };
}

export default ServicesPage; 