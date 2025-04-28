"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  Tag,
  Home,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Produk", href: "/admin/products", icon: ShoppingCart },
    { name: "Kategori", href: "/admin/categories", icon: Tag },
    { name: "Toko", href: "/supermarket/products", icon: Home },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(path);
  };

  return (
    <div>
      {/* Mobile sidebar toggle */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-4 sm:px-6 md:hidden">
        <button
          type="button"
          className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Buka sidebar</span>
        </button>
        <Link href="/admin" className="flex items-center">
          <span className="text-lg font-semibold text-purple-600">
            Admin Supermarket
          </span>
        </Link>
        <div className="w-12"></div> {/* Untuk keseimbangan layout */}
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all duration-300`}
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
              <span className="sr-only">Tutup sidebar</span>
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-xl font-bold text-purple-600">
                Admin Supermarket
              </span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-4 h-6 w-6 ${
                      isActive(item.href)
                        ? "text-purple-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-purple-600">
                Admin Supermarket
              </span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href)
                        ? "text-purple-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <Link
                  href="/admin/settings"
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Pengaturan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="md:pl-64">
        <main className="min-h-screen bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
