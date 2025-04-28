"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Tag,
  TrendingUp,
  Package,
  DollarSign,
  Users,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch produk untuk mendapatkan jumlah
        const productsResponse = await fetch("/api/products");
        const categoriesResponse = await fetch("/api/categories");

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Gagal memuat data statistik");
        }

        const products = await productsResponse.json();
        const categories = await categoriesResponse.json();

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Data dummy untuk statistik tambahan
  const additionalStats = {
    orders: 142,
    revenue: "Rp 12.450.000",
    customers: 58,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse"
            >
              <div className="h-8 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Produk */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <ShoppingCart className="w-10 h-10 text-purple-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Produk
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.totalProducts}
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/products"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Kelola Produk →
              </Link>
            </div>
          </div>

          {/* Kategori */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Tag className="w-10 h-10 text-blue-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Kategori
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.totalCategories}
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/categories"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Kelola Kategori →
              </Link>
            </div>
          </div>

          {/* Trending */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="w-10 h-10 text-green-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">Top Seller</p>
                <h3 className="text-xl font-bold text-gray-800">
                  Beras Premium 5kg
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/reports/best-selling"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Lihat Laporan →
              </Link>
            </div>
          </div>

          {/* Pesanan */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Package className="w-10 h-10 text-amber-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Pesanan
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {additionalStats.orders}
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="#"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Kelola Pesanan →
              </Link>
            </div>
          </div>

          {/* Pendapatan */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="w-10 h-10 text-emerald-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">Pendapatan</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {additionalStats.revenue}
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="#"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Laporan Keuangan →
              </Link>
            </div>
          </div>

          {/* Pelanggan */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Users className="w-10 h-10 text-indigo-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">Pelanggan</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {additionalStats.customers}
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="#"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Kelola Pelanggan →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activities (Dummy) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Produk baru ditambahkan: Sayur Bayam Organik 250gr
              </p>
              <p className="text-xs text-gray-500">5 menit yang lalu</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Kategori baru: Minuman Kesehatan
              </p>
              <p className="text-xs text-gray-500">1 jam yang lalu</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Stock update: Minyak Goreng 2L (75 → 70)
              </p>
              <p className="text-xs text-gray-500">3 jam yang lalu</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Link
            href="#"
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            Lihat semua aktivitas →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/products/add"
          className="bg-purple-50 border border-purple-100 p-4 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-purple-600 mb-2" />
          <h3 className="font-medium text-purple-800">Tambah Produk</h3>
          <p className="text-sm text-purple-600 mt-1">
            Tambah produk baru ke inventory
          </p>
        </Link>

        <Link
          href="/admin/categories/add"
          className="bg-blue-50 border border-blue-100 p-4 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Tag className="w-6 h-6 text-blue-600 mb-2" />
          <h3 className="font-medium text-blue-800">Tambah Kategori</h3>
          <p className="text-sm text-blue-600 mt-1">
            Buat kategori produk baru
          </p>
        </Link>

        <Link
          href="#"
          className="bg-green-50 border border-green-100 p-4 rounded-lg hover:bg-green-100 transition-colors"
        >
          <Package className="w-6 h-6 text-green-600 mb-2" />
          <h3 className="font-medium text-green-800">Kelola Pesanan</h3>
          <p className="text-sm text-green-600 mt-1">
            Lihat dan proses pesanan baru
          </p>
        </Link>

        <Link
          href="#"
          className="bg-amber-50 border border-amber-100 p-4 rounded-lg hover:bg-amber-100 transition-colors"
        >
          <TrendingUp className="w-6 h-6 text-amber-600 mb-2" />
          <h3 className="font-medium text-amber-800">Laporan</h3>
          <p className="text-sm text-amber-600 mt-1">Lihat laporan penjualan</p>
        </Link>
      </div>
    </div>
  );
}
