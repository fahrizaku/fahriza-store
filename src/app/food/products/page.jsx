//file: src/app/food/products/page.jsx
"use client";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Plus, Minus } from "lucide-react";
import Image from "next/image";

// Data makanan dummy
const dummyFoods = [
  {
    id: 1,
    name: "Nasi Ayam Penyet",
    category: "Makanan Utama",
    price: 25000,
    discountPrice: 22000,
    rating: 4.8,
    reviewCount: 235,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 50,
    unit: "porsi",
    description: "Nasi dengan ayam penyet, sambal, dan lalapan segar",
  },
  {
    id: 2,
    name: "Bakso Sapi Jumbo",
    category: "Makanan Utama",
    price: 30000,
    discountPrice: 28000,
    rating: 4.7,
    reviewCount: 186,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 75,
    unit: "mangkok",
    description: "Bakso daging sapi pilihan dengan kuah gurih dan mie",
  },
  {
    id: 3,
    name: "Nasi Goreng Spesial",
    category: "Makanan Utama",
    price: 28000,
    discountPrice: null,
    rating: 4.5,
    reviewCount: 120,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 60,
    unit: "porsi",
    description: "Nasi goreng dengan telur, ayam, dan sayuran pilihan",
  },
  {
    id: 4,
    name: "Jus Alpukat",
    category: "Minuman",
    price: 15000,
    discountPrice: 12000,
    rating: 4.6,
    reviewCount: 98,
    image: "/api/placeholder/500/500",
    isNewArrival: true,
    stock: 45,
    unit: "gelas",
    description: "Jus alpukat segar dengan susu kental manis",
  },
  {
    id: 5,
    name: "Mie Ayam Bakso",
    category: "Makanan Utama",
    price: 27000,
    discountPrice: 24000,
    rating: 4.4,
    reviewCount: 78,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 30,
    unit: "mangkok",
    description: "Mie ayam dengan bakso sapi dan pangsit goreng",
  },
  {
    id: 6,
    name: "Es Teh Manis",
    category: "Minuman",
    price: 8000,
    discountPrice: null,
    rating: 4.3,
    reviewCount: 56,
    image: "/api/placeholder/500/500",
    isNewArrival: true,
    stock: 100,
    unit: "gelas",
    description: "Teh manis dingin dengan es batu",
  },
  {
    id: 7,
    name: "Sate Ayam Madura",
    category: "Makanan Utama",
    price: 35000,
    discountPrice: 32000,
    rating: 4.7,
    reviewCount: 65,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 25,
    unit: "porsi",
    description: "10 tusuk sate ayam dengan bumbu kacang khas Madura",
  },
  {
    id: 8,
    name: "Es Jeruk Peras",
    category: "Minuman",
    price: 10000,
    discountPrice: null,
    rating: 4.8,
    reviewCount: 42,
    image: "/api/placeholder/500/500",
    isNewArrival: true,
    stock: 80,
    unit: "gelas",
    description: "Jeruk segar diperas dengan es batu",
  },
  {
    id: 9,
    name: "Martabak Manis Coklat Keju",
    category: "Cemilan",
    price: 45000,
    discountPrice: 40000,
    rating: 4.6,
    reviewCount: 210,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 40,
    unit: "porsi",
    description: "Martabak manis dengan topping coklat dan keju",
  },
  {
    id: 10,
    name: "Bubur Ayam",
    category: "Sarapan",
    price: 18000,
    discountPrice: 15000,
    rating: 4.5,
    reviewCount: 95,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 55,
    unit: "mangkok",
    description: "Bubur nasi dengan ayam suwir, kacang, dan kerupuk",
  },
  {
    id: 11,
    name: "Pisang Goreng Crispy",
    category: "Cemilan",
    price: 12000,
    discountPrice: 10000,
    rating: 4.4,
    reviewCount: 87,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 65,
    unit: "porsi",
    description: "5 potong pisang goreng dengan tepung crispy",
  },
  {
    id: 12,
    name: "Ayam Geprek",
    category: "Makanan Utama",
    price: 22000,
    discountPrice: 20000,
    rating: 4.7,
    reviewCount: 154,
    image: "/api/placeholder/500/500",
    isNewArrival: false,
    stock: 70,
    unit: "porsi",
    description: "Ayam goreng tepung yang digeprek dengan sambal pedas",
  },
];

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
  const categories = [
    "Semua",
    "Makanan Utama",
    "Minuman",
    "Cemilan",
    "Sarapan",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [onlyDiscount, setOnlyDiscount] = useState(false);

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
          <SlidersHorizontal className="w-5 h-5 text-orange-600" />
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
                      ? "bg-orange-100 text-orange-700 font-medium"
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
                  max="50000"
                  step="5000"
                  value={priceRange[0]}
                  data-index="0"
                  onChange={handlePriceChange}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="50000"
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
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 rounded"
              />
              <label
                htmlFor="onlyDiscount"
                className="ml-2 text-sm text-gray-700"
              >
                Hanya tampilkan menu promo
              </label>
            </div>
          </div>

          {/* Sorting */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Urutkan</h3>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="popularity">Terpopuler</option>
              <option value="newest">Menu Baru</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen kartu makanan
const FoodCard = ({ food }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < food.stock) {
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
          src={food.image}
          alt={food.name}
          width={500}
          height={500}
          className="w-full h-40 object-cover"
        />
        {food.isNewArrival && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Menu Baru
          </div>
        )}
        {food.discountPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {Math.round(((food.price - food.discountPrice) / food.price) * 100)}
            % OFF
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1">{food.category}</p>
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
          {food.name}
        </h3>

        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {food.description}
        </p>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(food.rating))}
            {"☆".repeat(5 - Math.floor(food.rating))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({food.reviewCount})
          </span>
        </div>

        <div className="text-xs text-gray-500 mb-2">
          {food.stock <= 10 ? (
            <span className="text-red-500">
              Sisa {food.stock} {food.unit}
            </span>
          ) : (
            <span>Stok tersedia</span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            {food.discountPrice ? (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(food.price)}
                </span>
                <span className="font-semibold text-red-600">
                  {formatPrice(food.discountPrice)}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-gray-800">
                {formatPrice(food.price)}
              </span>
            )}
            <div className="text-xs text-gray-500">per {food.unit}</div>
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
              disabled={quantity >= food.stock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-medium">
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
};

// Halaman utama
export default function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulasi fetching data
    const fetchFoods = () => {
      setLoading(true);
      // Gunakan setTimeout untuk mensimulasikan network delay
      setTimeout(() => {
        setFoods(dummyFoods);
        setFilteredFoods(dummyFoods);
        setLoading(false);
      }, 1000);
    };

    fetchFoods();
  }, []);

  const handleFilterChange = ({
    category,
    priceRange,
    sortBy,
    onlyDiscount,
  }) => {
    let filtered = [...foods];

    // Filter berdasarkan pencarian
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (food) =>
          food.name.toLowerCase().includes(search) ||
          food.category.toLowerCase().includes(search)
      );
    }

    // Filter berdasarkan kategori
    if (category && category !== "Semua") {
      filtered = filtered.filter((food) => food.category === category);
    }

    // Filter berdasarkan rentang harga
    filtered = filtered.filter((food) => {
      const price = food.discountPrice || food.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter hanya menu promo
    if (onlyDiscount) {
      filtered = filtered.filter((food) => food.discountPrice !== null);
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

    setFilteredFoods(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange({
      category: "Semua",
      priceRange: [0, 50000],
      sortBy: "popularity",
      onlyDiscount: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Menu Makanan & Minuman
      </h1>
      <p className="text-gray-500 text-sm mb-4">
        Berbagai pilihan makanan dan minuman lezat siap dipesan
      </p>

      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Cari menu makanan atau minuman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white px-3 py-1 rounded-md text-sm"
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

        {/* Daftar Menu */}
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
          ) : filteredFoods.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 mb-2">
                Tidak ada menu yang ditemukan
              </p>
              <p className="text-sm text-gray-400">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  Menampilkan {filteredFoods.length} menu
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFoods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
