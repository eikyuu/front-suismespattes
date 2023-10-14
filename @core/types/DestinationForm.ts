import { Country } from '../enum/Country';

export type Destination = {
    name: string;
    description: string;
    city: {
      label: string;
      postalCode: string;
      departmentCode: string;
    };
    street: string;
    country: keyof typeof Country;
    slug: string;
    category: {
      name: string;
    };
    latitude?: number | string;
    longitude?: number | string;
    obligatoryLeash: 'YES' | 'NO' | 'RECOMANDED';
    waterPoint: boolean;
    processionaryCaterpillarAlert: boolean;
    cyanobacteriaAlert: boolean;
    note: number;
    files?: File[];
    images: {
      name: string;
    }[];
  };

  export type Destinations = {
    destinations : Destination[],
    pagination: {
      limit: number;
      page: number;
      total: number;
      totalPages: number;
    }
  }

export type DestinationFormPick = Pick<Destination, 'name'|'description'|'city'| 'street'|'country'>;

export type DestinationWithoutFiles = Pick<Destination, 'name'|'description'|'city'| 'street'|'country'|'latitude'|'longitude'|'obligatoryLeash'|'waterPoint'|'processionaryCaterpillarAlert'|'cyanobacteriaAlert'|'note'>;

export type DestinationWithoutImages = Pick<Destination, 'name'|'description'|'city'| 'street'|'country'|'latitude'|'longitude'|'obligatoryLeash'|'waterPoint'|'processionaryCaterpillarAlert'|'cyanobacteriaAlert'|'note'>;

export type DestinationWithoutFilesAndFilesImages = Pick<Destination, 'name'|'description'|'city'| 'street'|'country'|'latitude'|'longitude'|'obligatoryLeash'|'waterPoint'|'processionaryCaterpillarAlert'|'cyanobacteriaAlert'|'note'>;