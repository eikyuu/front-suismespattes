export interface IInputs {
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
  }