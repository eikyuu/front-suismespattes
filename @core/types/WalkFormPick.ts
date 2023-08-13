export type WalkForm = {
    name: string;
    description: string;
    city: string;
    postalCode: string;
    street: string;
    country: string;
    obligatoryLeash: 'YES' | 'NO' | 'RECOMANDED';
    waterPoint: boolean;
    processionaryCaterpillarAlert: boolean;
    cyanobacteriaAlert: boolean;
    note: number;
    files: File[];
  };

export type WalkFormPick = Pick<WalkForm, 'name'|'description'|'city'|'postalCode'|'street'|'country'>;