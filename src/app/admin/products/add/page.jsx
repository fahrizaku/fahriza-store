// file: src/app/admin/products/add/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    rating: "4.0",
    reviewCount: "0",
    image: "/images/products/placeholder.jpg",
    isNewArrival: false,
    stock: "10",
    unit: "pcs",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, category: data[0].name }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Gagal memuat kategori. Silakan coba lagi.");
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validasi data
      if (!formData.name || !formData.category || !formData.price) {
        throw new Error("Nama, kategori, dan harga produk wajib diisi");
      }

      // Konversi nilai sebelum dikirim ke API
      const productData = {
        ...formData,
        price: parseInt(formData.price),
        discountPrice: formData.discountPrice
          ? parseInt(formData.discountPrice)
          : null,
        rating: parseFloat(formData.rating),
        reviewCount: parseInt(formData.reviewCount),
        stock: parseInt(formData.stock),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Gagal menambahkan produk");
      }

      setSuccess("Produk berhasil ditambahkan!");

      // Reset form setelah berhasil
      setFormData({
        name: "",
        category: categories.length > 0 ? categories[0].name : "",
        price: "",
        discountPrice: "",
        rating: "4.0",
        reviewCount: "0",
        image: "/images/products/placeholder.jpg",
        isNewArrival: false,
        stock: "10",
        unit: "pcs",
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        router.push("/admin/products");
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Produk
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Tambah Produk Baru
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
          {/* Informasi Dasar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Nama Produk *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="category"
              >
                Kategori *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                {categories.length === 0 ? (
                  <option value="">Memuat kategori...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Harga */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="price"
              >
                Harga (Rp) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="discountPrice"
              >
                Harga Diskon (Rp)
              </label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
              />
              <p className="mt-1 text-xs text-gray-500">
                Kosongkan jika tidak ada diskon
              </p>
            </div>
          </div>

          {/* Stok dan Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="stock"
              >
                Stok
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="unit"
              >
                Satuan
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="pcs, kg, botol, dll"
              />
            </div>
          </div>

          {/* Rating dan Review */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="rating"
              >
                Rating (1-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="1"
                max="5"
                step="0.1"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="reviewCount"
              >
                Jumlah Review
              </label>
              <input
                type="number"
                id="reviewCount"
                name="reviewCount"
                value={formData.reviewCount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>

          {/* Gambar dan Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="image"
              >
                URL Gambar
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="/images/products/nama-gambar.jpg"
                />
                <button
                  type="button"
                  className="px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
                  title="Unggah Gambar (fitur ini belum tersedia)"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Gunakan URL relatif dari folder public
              </p>
            </div>

            <div className="flex items-center h-full pt-6">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded mr-2"
                />
                Tandai sebagai produk baru
              </label>
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Menambahkan..." : "Tambah Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
