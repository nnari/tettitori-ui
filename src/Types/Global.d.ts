declare interface User {
  username: string;
  role: "admin" | "workplace";
  accessToken: string;
  iat: Number;
}

declare module "*.jpg";
declare module "*.css";

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
  _id: string;
  title: string;
  relevantDegrees: Degree[];
  relevantOrientations: ActivityOrientation[];
  authorDisplayName: string;
  author: string;
  body: {
    description: string;
    contactInfo: string;
    address: string;
  };
}
