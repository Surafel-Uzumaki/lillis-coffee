"use client";
import Head from "next/head";
import { CupHot, Flower1, HeartFill, Trophy } from "react-bootstrap-icons";
import { NextPage } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

// Configure Google Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [1, 0.77, 0.47, 0.97],
    },
  },
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
};

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface ProcessStep {
  title: string;
  description: string;
  side: "left" | "right";
  image: string;
  alt: string;
}

const AboutUs: NextPage = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  // const [ctaRef, ctaInView] = useInView({
  //   triggerOnce: true,
  //   threshold: 0.2,
  // });

  const { scrollYProgress } = useScroll();
  const yPosHero = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const yPosValues = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const values: ValueCard[] = [
    {
      icon: <Flower1 className="text-4xl text-amber-700" />,
      title: "Sustainability",
      description:
        "We partner directly with organic farmers committed to eco-friendly practices that protect our planet.",
      image: "/images/beans.jpg",
      alt: "Organic coffee farming",
    },
    {
      icon: <HeartFill className="text-4xl text-amber-700" />,
      title: "Community",
      description:
        "More than coffee - we're a gathering place where connections are made and relationships flourish.",
      image: "/images/beans.jpg",
      alt: "People enjoying coffee together",
    },
    {
      icon: <Trophy className="text-4xl text-amber-700" />,
      title: "Excellence",
      description:
        "From bean selection to final pour, we obsess over every detail to deliver perfection in your cup.",
      image: "/images/beans.jpg",
      alt: "Artisan coffee preparation",
    },
  ];

  const processSteps: ProcessStep[] = [
    {
      title: "Bean Selection",
      description:
        "Our coffee experts travel worldwide to source only the top 2% of specialty grade Arabica beans, building direct relationships with sustainable farms.",
      side: "left",
      image: "/images/beans.jpg",
      alt: "Coffee beans being selected",
    },
    {
      title: "Artisan Roasting",
      description:
        "Using traditional drum roasters, we carefully develop each bean's unique flavor profile in small 12kg batches for optimal consistency and quality.",
      side: "right",
      image: "/images/beans.jpg",
      alt: "Coffee beans roasting",
    },
    {
      title: "Quality Assurance",
      description:
        "Every batch undergoes rigorous testing by our Q-certified team through daily cuppings to ensure it meets our exacting standards before serving.",
      side: "left",
      image: "/images/beans.jpg",
      alt: "Coffee quality testing",
    },
  ];

  return (
    <div className={`${playfair.variable} ${montserrat.variable} `}>
      <Head>
        <title>Our Story | Lillis Coffee - Artisan Roasters Since 2012</title>
        <meta
          name="description"
          content="Discover the passion behind Lillis Coffee - from our sustainable sourcing to artisan roasting process that creates your perfect cup."
        />
      </Head>

      {/* Modern Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden "
      >
        <motion.div
          className="absolute inset-0 z-0 bg-[url('/images/products/lilis.jpg')] bg-cover bg-center"
          style={{ y: yPosHero }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-1 "></div>

        <div className="relative z-10 text-center max-w-4xl py-32 sm:py-40 lg:py-48">
          <motion.div variants={staggerContainer}>
            <motion.h1
              variants={textReveal}
              className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
            >
              Crafting Coffee <span className="italic">With</span> Purpose
            </motion.h1>
            <motion.p
              variants={textReveal}
              className="font-montserrat text-lg md:text-xl lg:text-2xl text-amber-100 max-w-2xl mx-auto mb-10"
            >
              Specialty coffee roasted with intention since 2012
            </motion.p>
            <motion.div variants={textReveal}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(180, 83, 9, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full font-medium font-montserrat transition-all duration-300 shadow-lg"
              >
                Discover Our Process ↓
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 md:py-32 px-6 max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <motion.div variants={fadeInUp} className="w-full lg:w-1/2 relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/5] min-h-[300px] shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 0.77, 0.47, 0.97] }}
            >
              <Image
                src="/images/hero.jpg"
                alt="Founder Emma Lillis"
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
            <motion.div
              variants={scaleUp}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl w-60 sm:w-72 mt-4 sm:mt-0"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3">
                <CupHot className="text-amber-700 text-3xl" />
                <div>
                  <h3 className="font-montserrat font-bold text-lg">
                    Est. 2012
                  </h3>
                  <p className="font-montserrat text-sm text-gray-600">
                    Serving exceptional coffee for over a decade
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} className="w-full lg:w-1/2">
            <motion.span
              variants={textReveal}
              className="font-montserrat font-semibold text-amber-600 uppercase tracking-wider mb-4 block"
            >
              Our Journey
            </motion.span>
            <motion.h2
              variants={textReveal}
              className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              From Humble Beginnings to Community Staple
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="space-y-5 font-montserrat text-gray-700 text-lg"
            >
              <motion.p variants={textReveal}>
                What began as a single coffee cart in Portland &apos;s farmers
                market has blossomed into three bustling cafés...
              </motion.p>
              <motion.p variants={textReveal}>
                Founder Emma Lillis started with a simple vision: to create
                spaces where exceptional coffee and human connection could
                flourish equally.
              </motion.p>
              <motion.p variants={textReveal}>
                We remain proudly independent, allowing us to stay true to our
                values while innovating in sustainable coffee practices.
              </motion.p>
            </motion.div>
            <motion.div variants={textReveal} className="mt-8">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#b45309",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-8 py-3 rounded-full font-montserrat font-medium transition-all duration-300"
              >
                Meet Our Team →
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        ref={valuesRef}
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-24 md:py-32 bg-amber-50 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-[url('/images/beans.jpg')] bg-cover bg-center opacity-6"
          style={{ y: yPosValues }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          >
            <motion.span
              variants={textReveal}
              className="font-montserrat font-semibold text-amber-600 uppercase tracking-wider text-sm md:text-base mb-3 md:mb-4 block"
            >
              What Guides Us
            </motion.span>
            <motion.h2
              variants={textReveal}
              className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              variants={textReveal}
              className="font-montserrat text-lg md:text-xl text-gray-600"
            >
              These principles shape every decision we make, from bean sourcing
              to customer experience
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
              >
                {/* <motion.div
                  className="relative h-48 w-full min-h-[200px] overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div> */}
                <div className="p-8">
                  <motion.div
                    className="flex justify-center mb-6"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-amber-100 p-4 rounded-full">
                      {item.icon}
                    </div>
                  </motion.div>
                  <motion.h3
                    className="font-playfair text-2xl font-bold text-center text-gray-900 mb-4"
                    whileHover={{ color: "#b45309" }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="font-montserrat text-gray-600 text-center"
                    whileHover={{ color: "#4b5563" }}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Roasting Process */}
      <motion.section
        ref={processRef}
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-24 md:py-32 px-6 max-w-7xl mx-auto"
      >
        <motion.div
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <motion.span
            variants={textReveal}
            className="font-montserrat font-semibold text-amber-600 uppercase tracking-wider text-sm md:text-base mb-3 md:mb-4 block"
          >
            Our Craft
          </motion.span>
          <motion.h2
            variants={textReveal}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
          >
            The Art & Science of Our Roast
          </motion.h2>
          <motion.p
            variants={textReveal}
            className="font-montserrat text-lg md:text-xl text-gray-600"
          >
            Precision and passion combine to create our signature flavor
            profiles
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="space-y-24 md:space-y-32"
        >
          {processSteps.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`flex flex-col ${
                item.side === "left" ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              <motion.div
                className="md:w-1/2 w-full relative aspect-video rounded-xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                />
                <motion.div
                  className={`absolute -top-4 ${
                    item.side === "left" ? "-right-4" : "-left-4"
                  } w-16 h-16 rounded-full bg-amber-700 border-4 border-white flex items-center justify-center z-10 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="font-montserrat font-bold text-white text-xl">
                    {index + 1}
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                className="md:w-1/2 w-full"
                variants={staggerContainer}
              >
                <motion.h3
                  variants={textReveal}
                  className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  variants={textReveal}
                  className="font-montserrat text-gray-700 text-lg"
                >
                  {item.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      {/* <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-24 md:py-32 bg-amber-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/beans.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={staggerContainer}>
            <motion.h2
              variants={textReveal}
              className="font-playfair text-4xl md:text-5xl font-bold mb-8 leading-tight"
            >
              Ready to Experience <br /> True Craft Coffee?
            </motion.h2>
            <motion.p
              variants={textReveal}
              className="font-montserrat text-xl mb-10 max-w-2xl mx-auto"
            >
              Visit us to taste the difference that careful sourcing and artisan
              roasting makes.
            </motion.p>
            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <motion.button
                variants={textReveal}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-amber-900 hover:bg-amber-100 px-8 py-4 rounded-full font-montserrat font-bold transition-all duration-300 shadow-lg"
              >
                Find a Location
              </motion.button>
              <motion.button
                variants={textReveal}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#fff",
                  color: "#b45309",
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white hover:bg-white hover:text-amber-900 px-8 py-4 rounded-full font-montserrat font-bold transition-all duration-300 shadow-lg"
              >
                View Our Menu
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section> */}
    </div>
  );
};

export default AboutUs;
