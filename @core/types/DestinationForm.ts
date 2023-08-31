export type DestinationForm = {
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
    images?: File[];
  };

export type DestinationFormPick = Pick<DestinationForm, 'name'|'description'|'city'|'postalCode'|'street'|'country'>;

export type Destination = {
  name: string;
  description: string;
  city: string;
  postalCode: string;
  street: string;
  country: string;
  latitude?: number;
  longitude?: number;
  obligatoryLeash: 'YES' | 'NO' | 'RECOMANDED';
  waterPoint: boolean;
  processionaryCaterpillarAlert: boolean;
  cyanobacteriaAlert: boolean;
  note: number;
  images: {
    name: string;
  };
  files?: File[];
}