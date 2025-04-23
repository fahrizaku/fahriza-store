//file: src/data/menuData.js

import { User, History } from "lucide-react";

const menuCategories = [
  {
    category: "Pasien",
    items: [
      {
        title: "Data Pasien",
        icon: <User size={20} />,
        href: "/pasien",
      },
      {
        title: "Riwayat Kunjungan",
        icon: <History size={20} />,
        href: "/pasien/riwayat-kunjungan",
      },
    ],
  },
];

export default menuCategories;
