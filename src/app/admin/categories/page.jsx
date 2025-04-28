//file : src/app/admin/categories/page.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Fetch kategori
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Gagal memuat data kategori");
        }
        const data = await response.json();
        setCategories(data);
        setFilteredCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Filter kategori berdasarkan pencarian
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(categories);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(query)
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  // Handle pencarian
  const handleSearch = (e) => {
    e.preventDefault();
    // Search dihandle oleh useEffect di atas
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Kategori</h1>
          <p className="text-gray-500">
            Tambah, edit, dan hapus kategori produk
          </p>
        </div>
        <Link
          href="/admin/categories/add"
          className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Tambah Kategori
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Cari kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </form>
      </div>

      {/* Daftar Kategori */}
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-500">Memuat data kategori...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-2">
            Tidak ada kategori yang ditemukan
          </p>
          <p className="text-sm text-gray-400">
            {categories.length === 0
              ? "Belum ada kategori yang ditambahkan. Klik 'Tambah Kategori' untuk menambahkan kategori baru."
              : "Coba ubah kata kunci pencarian Anda."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Kategori
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah Produk
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Dalam versi lengkap, bisa menampilkan jumlah produk dalam kategori ini */}
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/categories/edit/${category.id}`}
                        className="text-purple-600 hover:text-purple-900 inline-flex items-center mr-3"
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-900 inline-flex items-center">
                        <Trash2 className="w-4 h-4 mr-1" /> Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
