/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactsubmissions
 * Interface for ContactSubmissions
 */
export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  submitterName?: string;
  /** @wixFieldType text */
  submitterEmail?: string;
  /** @wixFieldType text */
  submissionSubject?: string;
  /** @wixFieldType text */
  submissionMessage?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: foodrecommendations
 * Interface for FoodRecommendations
 */
export interface FoodRecommendations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  foodImage?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  shopName?: string;
  /** @wixFieldType text */
  popularDish?: string;
  /** @wixFieldType text */
  priceRange?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: hiddengems
 * Interface for HiddenGems
 */
export interface HiddenGems {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  placeName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  recommendedActivity?: string;
  /** @wixFieldType text */
  estimatedBudget?: string;
}


/**
 * Collection ID: photogallery
 * Interface for PhotoGallery
 */
export interface PhotoGallery {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType date */
  dateTaken?: Date | string;
  /** @wixFieldType text */
  photographer?: string;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType text */
  major?: string;
}


/**
 * Collection ID: travelstories
 * Interface for TravelStories
 */
export interface TravelStories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  travelTips?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType date */
  publishDate?: Date | string;
  /** @wixFieldType text */
  category?: string;
}
