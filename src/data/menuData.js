import {
  Package,
  Users,
  Stethoscope,
  FileText,
  User,
  LayoutDashboard,
  Folder,
  History,
  Microscope,
  Car,
  Database,
} from "lucide-react";

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
