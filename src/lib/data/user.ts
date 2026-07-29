import { Address, User } from "@/lib/types";

export const currentUser: User = {
  name: "Aashish Adhikari",
  email: "aashishad67@gmail.com",
  avatarSeed: "aashish-adhikari",
  memberSince: "2023-11-02",
};

export const addresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    fullName: "Aashish Adhikari",
    line1: "482 Birchwood Lane",
    line2: "Apt 3B",
    city: "Kathmandu",
    state: "Bagmati",
    zip: "44600",
    country: "Nepal",
    phone: "+977 98-1234-5678",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    fullName: "Aashish Adhikari",
    line1: "Techspace Tower, Floor 6",
    city: "Lalitpur",
    state: "Bagmati",
    zip: "44700",
    country: "Nepal",
    phone: "+977 98-8765-4321",
  },
];
