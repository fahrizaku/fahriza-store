"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  MinusCircle,
  PlusCircle,
  Link,
} from "lucide-react";
import { dummyFoods } from "@/data/foodProducts";
import MediaGallery from "./_components/MediaGallery"; // Pastikan Anda membuat file MediaGallery.jsx di folder components

// Fungsi untuk memformat harga
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      // Simulasi fetching data
      setTimeout(() => {
        const foundProduct = dummyFoods.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(foundProduct || null);
        setLoading(false);
      }, 500);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && (!product.stock || newQuantity <= product.stock)) {
      setQuantity(newQuantity);
    }
  };

  // Mengkonversi product.image menjadi media jika media tidak ada
  const getMediaArray = (product) => {
    if (!product) return [];

    // Jika sudah memiliki property media, gunakan itu
    if (product.media && product.media.length > 0) {
      // Pastikan semua properti yang diperlukan ada
      return product.media.map((item) => ({
        type: item.type || "image",
        url: item.url || "",
        thumbnail: item.thumbnail || item.url || "",
        caption: item.caption || "",
      }));
    }

    // Jika tidak, buat media array dari image
    if (product.image) {
      return [
        {
          type: "image",
          url: product.image,
          thumbnail: product.image,
          caption: product.name,
        },
      ];
    }

    return [];
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="animate-pulse">
          <div className="h-5 sm:h-6 w-20 sm:w-24 bg-gray-200 rounded mb-4 sm:mb-6"></div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="w-full md:w-1/2 h-64 sm:h-80 bg-gray-200 rounded-lg mb-4 md:mb-0"></div>
            <div className="w-full md:w-1/2">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 mb-4 sm:mb-6"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded mb-4 sm:mb-6 w-3/4"></div>
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3 mb-4 sm:mb-6"></div>
              <div className="h-10 sm:h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Kembali</span>
        </button>
        <div className="text-center py-8 sm:py-12">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Produk Tidak Ditemukan
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Maaf, produk yang Anda cari tidak tersedia
          </p>
        </div>
      </div>
    );
  }

  const mediaArray = getMediaArray(product);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 font-medium"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Kembali</span>
      </button>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Media Gallery */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <MediaGallery media={mediaArray} />

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {product.isNewArrival && (
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                Menu Baru
              </div>
            )}
            {product.discountPrice && (
              <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                {Math.round(
                  ((product.price - product.discountPrice) / product.price) *
                    100
                )}
                % Diskon
              </div>
            )}
            {product.stock <= 10 && product.stock > 0 && (
              <div className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                Sisa {product.stock} {product.unit}
              </div>
            )}
            {product.stock <= 0 && (
              <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                Stok Habis
              </div>
            )}
          </div>
        </div>

        {/* Detail Produk */}
        <div className="w-full md:w-1/2">
          {/* Nama Produk */}
          <div className="border-b border-gray-200 pb-3 mb-3">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>

          {/* Rating dan Review */}
          <div className="border-b border-gray-200 pb-3 mb-3">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill={
                      index < Math.floor(product.rating)
                        ? "currentColor"
                        : "none"
                    }
                    strokeWidth={index < Math.floor(product.rating) ? 0 : 2}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-500 ml-2">
                ({product.reviewCount} ulasan)
              </span>
            </div>
          </div>

          {/* Harga Produk */}
          <div className="border-b border-gray-200 pb-3 mb-3">
            {product.discountPrice ? (
              <div className="flex flex-col">
                <span className="text-sm sm:text-base text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-red-600">
                  {formatPrice(product.discountPrice)}
                </span>
              </div>
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                {formatPrice(product.price)}
              </span>
            )}
            <div className="text-xs sm:text-sm text-gray-500 mt-1">
              per {product.unit}
            </div>
          </div>

          {/* Media Summary */}
          {mediaArray.length > 0 && (
            <div className="border-b border-gray-200 pb-3 mb-3">
              <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
                Media
              </h3>
              <p className="text-sm text-gray-600">
                {mediaArray.filter((m) => m.type === "image").length} foto
                {mediaArray.filter((m) => m.type === "video").length > 0 &&
                  ` • ${
                    mediaArray.filter((m) => m.type === "video").length
                  } video`}
              </p>
            </div>
          )}

          {/* Deskripsi Produk */}
          <div className="border-b border-gray-200 pb-3 mb-3">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
              Deskripsi
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {product.description}
            </p>
          </div>

          {/* Informasi Ketersediaan */}
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
              Ketersediaan
            </h3>
            <p
              className={`text-sm sm:text-base ${
                product.stock <= 0
                  ? "text-red-500 font-medium"
                  : product.stock <= 10
                  ? "text-orange-500 font-medium"
                  : "text-green-600 font-medium"
              }`}
            >
              {product.stock <= 0
                ? "Stok Habis"
                : product.stock <= 10
                ? `Sisa ${product.stock} ${product.unit}`
                : "Stok Tersedia"}
            </p>
          </div>

          {/* Informasi Pembelian */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            {product.stock > 0 ? (
              <>
                <div className="flex items-center mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base text-gray-700 mr-3 sm:mr-4 font-medium">
                    Jumlah:
                  </span>
                  <div className="flex items-center border border-gray-300 bg-white rounded-md">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-1 sm:p-2 text-gray-500 hover:text-gray-700"
                      disabled={quantity <= 1}
                    >
                      <MinusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <span className="px-3 sm:px-4 text-sm sm:text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-1 sm:p-2 text-gray-500 hover:text-gray-700"
                      disabled={quantity >= product.stock}
                    >
                      <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>

                <button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 sm:py-3 rounded-lg flex items-center justify-center text-sm sm:text-base font-medium"
                  onClick={() =>
                    alert(
                      `Menambahkan ${quantity} ${product.unit} ${product.name} ke keranjang`
                    )
                  }
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span>Tambahkan ke Keranjang</span>
                </button>
              </>
            ) : (
              <button
                className="w-full bg-gray-300 text-gray-500 py-2 sm:py-3 rounded-lg flex items-center justify-center cursor-not-allowed text-sm sm:text-base font-medium"
                disabled
              >
                <span>Stok Habis</span>
              </button>
            )}
          </div>

          {/* Share buttons */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Bagikan:</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rekomendasi produk serupa */}
      <div className="mt-8 sm:mt-12">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Menu Serupa
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {dummyFoods
            .filter(
              (item) =>
                item.id !== product.id && item.category === product.category
            )
            .slice(0, 4)
            .map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <Link href={`/food/products/${relatedProduct.id}`}>
                  <div className="relative">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    {relatedProduct.discountPrice && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        {Math.round(
                          ((relatedProduct.price -
                            relatedProduct.discountPrice) /
                            relatedProduct.price) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <div className="mt-1">
                      {relatedProduct.discountPrice ? (
                        <span className="font-semibold text-red-600 text-sm">
                          {formatPrice(relatedProduct.discountPrice)}
                        </span>
                      ) : (
                        <span className="font-semibold text-gray-800 text-sm">
                          {formatPrice(relatedProduct.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
