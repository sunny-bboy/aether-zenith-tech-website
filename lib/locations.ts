import fs from 'fs';
import path from 'path';

export interface Location {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  keyIndustries: string[];
  localCaseStudies: {
    title: string;
    description: string;
  }[];
}

/**
 * Get all locations from the locations.json file
 */
export function getAllLocations() {
  try {
    const locationsDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(locationsDirectory, 'locations.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const locations = JSON.parse(fileContents);
    
    return locations;
  } catch (error) {
    console.error('Error loading locations:', error);
    return [];
  }
}

/**
 * Get a specific location by ID
 */
export function getLocationById(id: string) {
  const locations = getAllLocations();
  return locations.find((location: any) => location.id === id) || null;
}

/**
 * Get all location IDs for static path generation
 */
export function getAllLocationIds() {
  const locations = getAllLocations();
  return locations.map((location: any) => ({
    params: {
      location: location.id,
    },
  }));
}

/**
 * Get locations by country
 */
export function getLocationsByCountry(country: string) {
  const locations = getAllLocations();
  return locations.filter((location: any) => 
    location.country.toLowerCase() === country.toLowerCase()
  );
}

/**
 * Get all countries where we have locations
 */
export function getAllCountries() {
  const locations = getAllLocations();
  const countriesSet = new Set<string>();
  
  locations.forEach((location: any) => {
    countriesSet.add(location.country);
  });
  
  return Array.from(countriesSet);
}

/**
 * Get locations that specialize in a specific industry
 */
export function getLocationsByIndustry(industry: string) {
  const locations = getAllLocations();
  return locations.filter((location: any) => 
    location.keyIndustries && location.keyIndustries.includes(industry)
  );
}

/**
 * Get all industries across all locations
 */
export function getAllIndustries() {
  const locations = getAllLocations();
  const industriesSet = new Set<string>();
  
  locations.forEach((location: any) => {
    if (location.keyIndustries) {
      location.keyIndustries.forEach((industry: string) => {
        industriesSet.add(industry);
      });
    }
  });
  
  return Array.from(industriesSet);
}

export const getLocationsByRegion = (region: string): Location[] => {
  return getAllLocations().filter((location: Location) => location.region === region);
};

export const getLocationPaths = () => {
  return getAllLocations().map((location: Location) => ({
    params: {
      location: location.id,
    },
  }));
};

export const getLocationSlugs = (): string[] => {
  return getAllLocations().map((location: Location) => location.id);
};

export const getServiceLocationPaths = (serviceSlugs: string[]) => {
  const paths: { params: { service: string; location: string } }[] = [];

  serviceSlugs.forEach((serviceSlug) => {
    getAllLocations().forEach((location: Location) => {
      paths.push({
        params: {
          service: serviceSlug,
          location: location.id,
        },
      });
    });
  });

  return paths;
}; 