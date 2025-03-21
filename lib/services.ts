import fs from 'fs';
import path from 'path';

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  fullDescription: string;
  benefits: string[];
  technologies: string[];
  caseStudies: {
    title: string;
    description: string;
  }[];
}

/**
 * Get all services from the services.json file
 */
export function getAllServices() {
  try {
    const servicesDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(servicesDirectory, 'services.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const services = JSON.parse(fileContents);
    
    return services;
  } catch (error) {
    console.error('Error loading services:', error);
    return [];
  }
}

/**
 * Get a specific service by ID
 */
export function getServiceById(id: string) {
  const services = getAllServices();
  return services.find((service: any) => service.id === id) || null;
}

/**
 * Get all service IDs for static path generation
 */
export function getAllServiceIds() {
  const services = getAllServices();
  return services.map((service: any) => ({
    params: {
      service: service.id,
    },
  }));
}

/**
 * Get related services based on categories
 */
export function getRelatedServices(currentServiceId: string, limit: number = 3) {
  const allServices = getAllServices();
  const currentService = getServiceById(currentServiceId);
  
  if (!currentService) return [];
  
  // Filter out the current service and sort by relevance (shared categories)
  const relatedServices = allServices
    .filter((service: any) => service.id !== currentServiceId)
    .map((service: any) => {
      // Calculate relevance score based on shared categories
      const sharedCategories = service.categories.filter((category: string) => 
        currentService.categories.includes(category)
      );
      
      return {
        ...service,
        relevanceScore: sharedCategories.length,
      };
    })
    .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
  
  return relatedServices;
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: string) {
  const services = getAllServices();
  return services.filter((service: any) => 
    service.categories.includes(category)
  );
}

/**
 * Get all service categories
 */
export function getAllServiceCategories() {
  const services = getAllServices();
  const categoriesSet = new Set<string>();
  
  services.forEach((service: any) => {
    service.categories.forEach((category: string) => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet);
}

export const getServicePaths = () => {
  return getAllServices().map((service: Service) => ({
    params: {
      service: service.id,
    },
  }));
};

export const getServiceSlugs = (): string[] => {
  return getAllServices().map((service: Service) => service.id);
}; 