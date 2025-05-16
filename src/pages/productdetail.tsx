import { NextPage } from "next";
import Head from "next/head";
import "../app/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { products } from "../data/products";
import { motion } from "framer-motion";

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Convert id to number and find product
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, 3);

  const handleOrderClick = () => {
    const phoneNumber = "+1234567890";
    const message = `Hi, I'd like to order ${product.name}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Head>
        <title>{product.name} | Lillis Coffee Shop</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-gray-100 shadow-sm"
        >
          <div className="container mx-auto px-6 py-5">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-amber-800 font-medium transition group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Menu
            </Link>
          </div>
        </motion.div>

        {/* Product Detail */}
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-16"
          >
            {/* Product Image */}
            <div className="lg:w-1/2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-square shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.featured && (
                  <div className="absolute top-6 left-6 bg-amber-600 text-white px-4 py-1.5 text-xs font-bold tracking-wider rounded-full shadow-md">
                    Featured
                  </div>
                )}
              </motion.div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="mb-6">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight font-serif"
              >
                {product.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-amber-700 mb-8"
              >
                {product.price}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="prose max-w-none text-gray-600 mb-10 leading-relaxed"
              >
                <p className="text-lg">{product.description}</p>
              </motion.div>

              {/* Category-specific details */}
              {product.category === "coffee" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-10 bg-gray-50 p-8 rounded-xl border border-gray-100"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-serif">
                    Brewing Details
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>Origin: Ethiopia, Yirgacheffe Region</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>Roast Level: Medium (City+)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>Flavor Profile: Citrus, Jasmine, Stone Fruit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>
                        Recommended Brew Methods: Pour Over, Chemex, Aeropress
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>Altitude: 1,900 - 2,200 meters</span>
                    </li>
                  </ul>
                </motion.div>
              )}

              {/* Order Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                {/* Call Button - Now on Top */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => (window.location.href = "tel:+1234567890")}
                  className="w-full py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.929a11.997 11.997 0 0011.424 0l-1.549-.93a1 1 0 01-.54-1.059l.74-4.435a1 1 0 01.986-.836H17a1 1 0 011 1v9.5a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
                  </svg>
                  <span className="text-lg font-medium">Call Us Now</span>
                </motion.button>

                {/* WhatsApp Button - Now Second, Styled Like WhatsApp */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOrderClick}
                  className="w-full py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl hover:from-[#128C7E] hover:to-[#075E54] transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-lg font-medium">
                    Order via WhatsApp
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-28"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-10 pb-2 border-b border-gray-100 font-serif">
                You Might Also Enjoy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((related) => (
                  <motion.div
                    key={related.id}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="h-64 relative">
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 right-4 bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                        {related.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                        {related.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {related.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-amber-700">
                          {related.price}
                        </span>
                        <Link
                          href={`/productdetail?id=${related.id}`}
                          className="inline-flex items-center text-gray-600 hover:text-amber-700 font-medium group transition"
                        >
                          View Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
