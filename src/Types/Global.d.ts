declare interface User {
  username: string;
  role: "admin" | "workplace";
  accessToken: string;
  iat: Number;
}

declare module "*.jpg";
declare module "*.css";

declare interface Favorite {
  _id: string;
}
declare interface Degree {
  _id: string;
  title: string;
  __v: Number;
}

declare interface ActivityOrientation {
  _id: string;
  title: string;
  __v: Number;
}

declare interface Job {
  title: string;
  authorDisplayName: string;
  author: string;
  companyName: string;
  body: {
    description: string;
    additionalInfo: string;
    contactInfo: {
      email: string;
      phoneNumber: string;
    };
    address: {
      streetaddress: string;
      zipcode: string;
      city: string;
    };
  };
  relevantDegrees: Degree[];
  relevantOrientations: ActivityOrientation[];
  _id: string;
}
