declare interface ICar {
  carId: number;
  carMark: string;
  carModel: string;
  carNumber: string;
  createdAt: null | string;
  updatedAt: null | string;
}

declare interface IDriver {
  car: ICar;
  createdAt: string;
  dateBirth: string;
  driverId: number;
  fullName: string;
  updatedAt: string;
}

declare interface IAlertSite {
  AlertSite: {
    open: {
      status: any;
      go: boolean;
    };
    vertical: string;
    horizontal: string;
    message: string;
  };
}

declare interface IStoreSite {
  StoreSite: {
    cars: ICar[];
    drivers: IDriver[];
  };
}

declare interface MainTemplate {
  children: any;
  pageTitle?: any;
  className?: string;
}
