export class WalkForm {
  public data: { [key: string]: any } = {};

  public setValue(e: any): void { 
    const { name, value } = e.target;
    this.data[name] = value;
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(this.data);
  };

  public validateName = (name: string) => {
    const errors: any = {};

    switch (true) {
        case name.length === 0:
            errors.name = 'Le nom est obligatoire';
            break;
        case name.length < 3:
            errors.name = 'Le nom doit contenir au moins 3 caractères';
            break;
        case name.length > 50:
            errors.name = 'Le nom doit contenir au maximum 50 caractères';
            break;
        default:
            break;
    }
  }
    
}
