import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useTranslation } from '../../../hooks/useTranslation';
import { getServiceById, getAllServiceIds } from '../../../lib/services';
import { getLocationById, getAllLocationIds } from '../../../lib/locations';
import { getServiceLocationSEO } from '../../../lib/seo';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import CTASection from '../../../components/CTASection';
import LocationMap from '../../../components/LocationMap';

interface ServiceLocationPageProps {
  service: any;
  location: any;
  localCaseStudies: any[];
}

const ServiceLocationPage: React.FC<ServiceLocationPageProps> = ({ 
  service, 
  location, 
  localCaseStudies 
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        {Object.entries(getServiceLocationSEO(service, location)).map(([key, value]) => {
          if (key === 'title' || key === 'description') {
            return <meta key={key} name={key} content={value as string} />;
          }
          return null;
        })}
        <title>{getServiceLocationSEO(service, location).title as string}</title>
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {service.title} {t('services.inLocation')} {location.name}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {t('services.locationSpecificSubtitle', { service: service.title, location: location.name })}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="#contact">
                  <a className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                    {t('common.contactUs')}
                  </a>
                </Link>
                <Link href={`/services/${service.id}`}>
                  <a className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                    {t('services.viewAllLocations')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Service Overview */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {t('services.overviewTitle')}
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                {/* Location-Specific Approach */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {t('services.locationApproachTitle', { location: location.name })}
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300">
                      {t('services.locationApproachDescription', { 
                        service: service.title, 
                        location: location.name,
                        country: location.country
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Benefits */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {t('services.benefitsTitle')}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Local Case Studies */}
                {localCaseStudies.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                      {t('services.localCaseStudiesTitle', { location: location.name })}
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-8">
                      {localCaseStudies.map((caseStudy, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                          <div className="md:flex">
                            <div className="md:flex-shrink-0 relative h-48 md:h-auto md:w-48">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                              <div className="absolute inset-0 flex items-center justify-center text-white">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {caseStudy.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {caseStudy.description}
                              </p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <span className="mr-3">{caseStudy.industry}</span>
                                <span>•</span>
                                <span className="mx-3">{caseStudy.year}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Contact Form */}
                <div id="contact" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {t('services.contactTitle', { service: service.title, location: location.name })}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    {t('services.contactDescription', { service: service.title, location: location.name })}
                  </p>
                  
                  <ContactForm 
                    onSuccess={() => {}}
                    onError={() => {}}
                    initialValues={{
                      service: service.id,
                      location: location.id
                    }}
                  />
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Location Information */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {location.name} {t('locations.office')}
                  </h3>
                  
                  <div className="mb-6 h-48 rounded-lg overflow-hidden">
                    <LocationMap
                      latitude={location.coordinates.lat}
                      longitude={location.coordinates.lng}
                      popupText={`${location.name} Office`}
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
                  
                  <div className="mt-6">
                    <Link href={`/locations/${location.id}`}>
                      <a className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center">
                        {t('locations.viewOfficeDetails')}
                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
                
                {/* Service Details */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {t('services.serviceDetails')}
                  </h3>
                  
                  <div className="space-y-4">
                    {service.technologies && service.technologies.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                          {t('services.technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech: string, index: number) => (
                            <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                          {t('services.deliverables')}
                        </h4>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                          {service.deliverables.map((deliverable: string, index: number) => (
                            <li key={index}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {service.timeline && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                          {t('services.typicalTimeline')}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">{service.timeline}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Link href={`/services/${service.id}`}>
                      <a className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center">
                        {t('services.viewFullServiceDetails')}
                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
                
                {/* Key Industries */}
                {location.keyIndustries && location.keyIndustries.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      {t('locations.keyIndustries')}
                    </h3>
                    
                    <ul className="space-y-3">
                      {location.keyIndustries.map((industry: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="ml-2 text-gray-700 dark:text-gray-300">{industry}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
  const serviceIds = getAllServiceIds();
  const locationIds = getAllLocationIds();
  
  const paths: { params: { service: string; location: string } }[] = [];
  
  // Generate all possible combinations of service and location
  serviceIds.forEach(serviceId => {
    locationIds.forEach(locationId => {
      paths.push({
        params: {
          service: serviceId,
          location: locationId
        }
      });
    });
  });
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const serviceId = params?.service as string;
  const locationId = params?.location as string;
  
  const service = getServiceById(serviceId);
  const location = getLocationById(locationId);
  
  if (!service || !location) {
    return {
      notFound: true,
    };
  }
  
  // Get case studies specific to this service and location
  // This is a placeholder - in a real app, you would fetch this data from your API or database
  const localCaseStudies = [
    {
      title: `${service.title} for ${location.keyIndustries[0]} in ${location.name}`,
      description: `A leading ${location.keyIndustries[0]} company in ${location.name} leveraged our ${service.title} to transform their operations.`,
      industry: location.keyIndustries[0],
      year: '2023'
    },
    {
      title: `${service.title} Implementation at ${location.keyIndustries[1]} Enterprise`,
      description: `We helped a major ${location.keyIndustries[1]} organization in ${location.country} implement ${service.title} solutions.`,
      industry: location.keyIndustries[1],
      year: '2022'
    }
  ];
  
  return {
    props: {
      service,
      location,
      localCaseStudies
    },
  };
};

export default ServiceLocationPage; 