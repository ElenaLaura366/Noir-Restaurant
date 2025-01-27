export interface Menu {
    category: string;
    description?: string;
    items: MenuItem[];
  }
  
  export interface MenuItem {
    name: string;
    description: string;
    price: number;
  }  