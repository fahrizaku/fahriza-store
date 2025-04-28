//file: src/app/admin/categories/add/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddCategoryPage() {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validasi
      if (!categoryName.trim()) {
        throw new Error("Nama kategori wajib diisi");
      }

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Gagal menambahkan kategori");
      }

      setSuccess("Kategori berhasil ditambahkan!");
      setCategoryName(""); // Reset form

      // Redirect setelah 2 detik
      setTimeout(() => {
        router.push("/admin/categories");
      }, 2000);
    } catch (error) {
      console.error("Error adding category:", error);
      setError(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/categories"
          className="inline-flex items-center text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Kategori
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Tambah Kategori Baru
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="categoryName"
            >
              Nama Kategori *
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Masukkan nama kategori"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Menambahkan..." : "Tambah Kategori"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
