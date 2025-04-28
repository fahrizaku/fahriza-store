//file: src/app/supermarket/_components/Navigation.jsx
"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  RefreshCw,
  Home,
  Search,
  ShoppingBag,
  Heart,
  Menu,
} from "lucide-react";
import menuCategories from "@/data/menuData";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [mountTimeout, setMountTimeout] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Tunggu sampai komponen di-mount sepenuhnya
  useEffect(() => {
    setMounted(true);

    // Set timeout untuk menampilkan tombol refresh jika mounting gagal
    const mountTimer = setTimeout(() => {
      if (!mounted) {
        setMountTimeout(true);
      }
    }, 3000);

    return () => {
      clearTimeout(mountTimer);
    };
  }, [mounted]);

  // Menangani status navigasi
  useEffect(() => {
    if (!mounted) return;

    // Membuat event listener untuk perubahan rute
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };

    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
    };

    window.addEventListener("popstate", handleRouteChangeStart);

    // Membersihkan event listener
    return () => {
      window.removeEventListener("popstate", handleRouteChangeStart);
    };
  }, [mounted, pathname]);

  const handleRefresh = () => {
    // Muat ulang halaman
    window.location.reload();
  };

  // Fungsi navigasi kustom untuk menampilkan status loading
  const handleNavigation = (href) => {
    // Hanya set status loading dan navigasi jika bukan halaman saat ini
    if (href !== pathname) {
      setIsNavigating(true);
      router.push(href);
    }
    setIsMenuOpen(false);
  };

  // Tutup menu yang diperluas saat navigasi di perangkat mobile
  useEffect(() => {
    setIsNavigating(false);
    setIsMenuOpen(false);
  }, [pathname]);

  // Mendefinisikan item navigasi mobile
  const mobileNavItems = [
    {
      title: "Beranda",
      href: "/supermarket/products",
      icon: <Home className="w-5 h-5" />,
    },
    {
      title: "Cari",
      href: "/search",
      icon: <Search className="w-5 h-5" />,
    },
    {
      title: "Keranjang",
      href: "/cart",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      title: "Wishlist",
      href: "/wishlist",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "Menu",
      href: "#",
      icon: <Menu className="w-5 h-5" />,
      action: () => setIsMenuOpen((prev) => !prev),
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white fixed w-full top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4">
          {/* Bagian Logo */}
          <Link href="/" className="flex items-center gap-3 py-3">
            <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl shadow-sm">
              <ShoppingBag
                className="w-6 h-6 text-purple-600"
                strokeWidth={1.8}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
                <span className="text-purple-700">Toko</span>
                <span className="text-gray-600">Kita</span>
              </h1>
            </div>
          </Link>

          {/* Sisi kanan header */}
          {!mounted ? (
            <div className="p-2">
              {mountTimeout ? (
                <button
                  onClick={handleRefresh}
                  className="flex items-center p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Segarkan</span>
                </button>
              ) : (
                <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Untuk layar yang lebih besar, kita bisa memiliki beberapa ikon header di sini */}
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/search"
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Search className="w-5 h-5 text-gray-500" />
                </Link>
                <Link
                  href="/wishlist"
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Heart className="w-5 h-5 text-gray-500" />
                </Link>
                <Link
                  href="/cart"
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Overlay Loading Navigasi */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/70 z-[60] flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          <p className="mt-4 text-purple-600 font-medium">
            Sedang memuat halaman...
          </p>
        </div>
      )}

      {/* Menu Navigasi Mobile (ketika diperluas) */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            role="presentation"
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />

          {/* Konten Menu */}
          <div className="md:hidden fixed bottom-16 left-0 right-0 z-50 bg-white rounded-t-xl shadow-lg overflow-y-auto max-h-[70vh]">
            <nav className="p-4">
              {menuCategories.map((category, index) => (
                <div
                  key={category.category}
                  className={`${index !== 0 ? "mt-6" : ""}`}
                >
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {category.category}
                  </h2>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href || "#"}
                        className={`flex items-center w-full px-4 py-2 text-sm rounded-lg transition-all duration-200
                        ${
                          pathname === item.href
                            ? "bg-purple-100 text-purple-600 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100 hover:text-purple-500"
                        }`}
                        onClick={(e) => {
                          if (item.href) {
                            e.preventDefault();
                            handleNavigation(item.href);
                          }
                        }}
                      >
                        <span
                          className={`mr-3 transition-colors duration-200 ${
                            pathname === item.href
                              ? "text-purple-500"
                              : "text-gray-400 group-hover:text-purple-500"
                          }`}
                        >
                          {item.icon}
                        </span>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Padding bawah */}
              <div className="h-8"></div>
            </nav>
          </div>
        </>
      )}

      {/* Sidebar Desktop */}
      <aside
        aria-label="Navigasi Utama"
        className="hidden md:block fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 
          bg-white shadow-lg overflow-y-auto"
      >
        <nav className="mt-4">
          {menuCategories.map((category, index) => (
            <div
              key={category.category}
              className={`px-4 ${index !== 0 ? "mt-6" : ""}`}
            >
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {category.category}
              </h2>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href || "#"}
                    className={`flex items-center w-full px-4 py-2 text-sm rounded-lg transition-all duration-200
                    ${
                      pathname === item.href
                        ? "bg-purple-100 text-purple-600 font-medium shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 hover:text-purple-500"
                    }`}
                    onClick={(e) => {
                      if (item.href) {
                        e.preventDefault();
                        handleNavigation(item.href);
                      }
                    }}
                  >
                    <span
                      className={`mr-3 transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-purple-500"
                          : "text-gray-400 group-hover:text-purple-500"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Spasi di bagian bawah */}
          <div className="px-4 mt-6 pb-16">
            <div className="h-16"></div>
          </div>
        </nav>
      </aside>

      {/* Navigasi Bawah Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-16">
          {mobileNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full text-xs ${
                pathname === item.href
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-purple-500"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (item.action) {
                  item.action();
                } else {
                  handleNavigation(item.href);
                }
              }}
            >
              <div
                className={`${
                  pathname === item.href ? "text-purple-600" : "text-gray-500"
                }`}
              >
                {item.icon}
              </div>
              <span className="mt-1">{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
