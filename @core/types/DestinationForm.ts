export type Destination = {
    name: string;
    description: string;
    city: string;
    postalCode: string;
    street: string;
    country: string;
    latitude?: number | string;
    longitude?: number | string;
    obligatoryLeash: 'YES' | 'NO' | 'RECOMANDED';
    waterPoint: boolean;
    processionaryCaterpillarAlert: boolean;
    cyanobacteriaAlert: boolean;
    note: number;
    files?: File[];
    images: string[];
  };

export type DestinationFormPick = Pick<Destination, 'name'|'description'|'city'|'postalCode'|'street'|'country'>;

export type DestinationWithoutFiles = Pick<Destination, 'name'|'description'|'city'|'postalCode'|'street'|'country'|'latitude'|'longitude'|'obligatoryLeash'|'waterPoint'|'processionaryCaterpillarAlert'|'cyanobacteriaAlert'|'note'>;

export type DestinationWithoutImages = Pick<Destination, 'name'|'description'|'city'|'postalCode'|'street'|'country'|'latitude'|'longitude'|'obligatoryLeash'|'waterPoint'|'processionaryCaterpillarAlert'|'cyanobacteriaAlert'|'note'>;

export type DestinationWithoutFilesAndFilesImages = Pick<Destination, 'name'|'description'|'city'|'postalCode'|'street'|'country'|'latitude'|'longitude'|'obligatoryLeash'|'waterPoint'|'processionaryCaterpillarAlert'|'cyanobacteriaAlert'|'note'>;