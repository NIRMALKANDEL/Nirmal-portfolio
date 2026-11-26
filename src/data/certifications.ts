export type Certification = {
  title: string;
  issuer: string;
  instructor?: string;
  credentialId?: string;
  image: string;
};

export const certifications: Certification[] = [
  {
    title: "Namaste Node.js",
    issuer: "NamasteDev",
    instructor: "Akshay Saini",
    credentialId: "D856E6F3D501CFB7E082683BA6B",
    image: "/certificates/namaste-nodejs.jpg",
  },
];
