//file: src/app/supermarket/products/page.jsx
"use client";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Plus, Minus } from "lucide-react";
import Image from "next/image";

// Fungsi untuk memformat harga
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Komponen Filter
const Filter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(["Semua"]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [onlyDiscount, setOnlyDiscount] = useState(false);

  // Ambil daftar kategori
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(["Semua", ...data.map((cat) => cat.name)]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({ category, priceRange, sortBy, onlyDiscount });
  };

  const handlePriceChange = (e) => {
    const newRange = [...priceRange];
    newRange[e.target.dataset.index] = parseInt(e.target.value);
    setPriceRange(newRange);
    onFilterChange({
      category: selectedCategory,
      priceRange: newRange,
      sortBy,
      onlyDiscount,
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    onFilterChange({
      category: selectedCategory,
      priceRange,
      sortBy: e.target.value,
      onlyDiscount,
    });
  };

  const handleDiscountChange = (e) => {
    setOnlyDiscount(e.target.checked);
    onFilterChange({
      category: selectedCategory,
      priceRange,
      sortBy,
      onlyDiscount: e.target.checked,
    });
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-between w-full bg-white p-3 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Filter & Urutkan</span>
        </div>
        <span className="text-sm text-gray-500">
          {selectedCategory !== "Semua" && `${selectedCategory} • `}
          {sortBy === "price-asc" && "Harga Terendah"}
          {sortBy === "price-desc" && "Harga Tertinggi"}
          {sortBy === "popularity" && "Terpopuler"}
          {sortBy === "newest" && "Terbaru"}
        </span>
      </button>

      <div className={`md:block ${isOpen ? "block" : "hidden"} mt-4 md:mt-0`}>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 md:border-0 md:shadow-none md:p-0">
          {/* Filter Kategori */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-2">Kategori</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedCategory === category
                      ? "bg-purple-100 text-purple-700 font-medium"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Harga */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-2">Rentang Harga</h3>
            <div className="space-y-3">
              <div className="flex justify-between gap-4">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={priceRange[0]}
                  data-index="0"
                  onChange={handlePriceChange}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={priceRange[1]}
                  data-index="1"
                  onChange={handlePriceChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>

          {/* Filter Diskon */}
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="onlyDiscount"
                checked={onlyDiscount}
                onChange={handleDiscountChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <label
                htmlFor="onlyDiscount"
                className="ml-2 text-sm text-gray-700"
              >
                Hanya tampilkan produk diskon
              </label>
            </div>
          </div>

          {/* Sorting */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Urutkan</h3>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="popularity">Terpopuler</option>
              <option value="newest">Terbaru</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen kartu produk tetap sama
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-40 object-cover"
        />
        {product.isNewArrival && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
            Baru
          </div>
        )}
        {product.discountPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            )}
            % OFF
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        <div className="text-xs text-gray-500 mb-2">
          {product.stock <= 10 ? (
            <span className="text-red-500">
              Sisa {product.stock} {product.unit}
            </span>
          ) : (
            <span>Stok tersedia</span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            {product.discountPrice ? (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="font-semibold text-red-600">
                  {formatPrice(product.discountPrice)}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-gray-800">
                {formatPrice(product.price)}
              </span>
            )}
            <div className="text-xs text-gray-500">per {product.unit}</div>
          </div>
        </div>

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mr-2">
            <button
              onClick={decrementQuantity}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-sm">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              disabled={quantity >= product.stock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium">
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

// Halaman utama
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Mengambil data dari API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleFilterChange = ({
    category,
    priceRange,
    sortBy,
    onlyDiscount,
  }) => {
    setLoading(true);
    let filtered = [...products];

    // Filter berdasarkan pencarian
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
      );
    }

    // Filter berdasarkan kategori
    if (category && category !== "Semua") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter berdasarkan rentang harga
    filtered = filtered.filter((product) => {
      const price = product.discountPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter hanya produk diskon
    if (onlyDiscount) {
      filtered = filtered.filter((product) => product.discountPrice !== null);
    }

    // Sortir hasil
    switch (sortBy) {
      case "price-asc":
        filtered.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case "price-desc":
        filtered.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case "newest":
        filtered.sort(
          (a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)
        );
        break;
      default: // popularity
        filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange({
      category: "Semua",
      priceRange: [0, 100000],
      sortBy: "popularity",
      onlyDiscount: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Belanja Supermarket
      </h1>
      <p className="text-gray-500 text-sm mb-4">
        Semua kebutuhan dapur dan rumah tangga Anda tersedia di sini
      </p>

      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Cari produk supermarket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Cari
          </button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filter - tersembunyi di mobile, tampil di desktop */}
        <div className="md:w-1/4">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        {/* Daftar Produk */}
        <div className="md:w-3/4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-200"></div>
                  <div className="p-3">
                    <div className="h-2 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 mb-2">
                Tidak ada produk yang ditemukan
              </p>
              <p className="text-sm text-gray-400">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  Menampilkan {filteredProducts.length} produk
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
