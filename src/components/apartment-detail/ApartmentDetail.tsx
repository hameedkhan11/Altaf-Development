"use client";

import React, { useState } from "react";
import { CldImage } from "next-cloudinary";

// Type definitions
interface ApartmentDetails {
  title: string;
  subtitle: string;
  area: string;
  floor: string;
  totalPrice: string;
  ratePerSqft: string;
  downPayment: string;
  remainingAmount: string;
  quarterlyInstallment: string;
  paymentPlan: string;
  balcony: string;
  facingCharges: string;
  mainImage: string;
  thumbnails: string[];
}

export type ApartmentType = "studio" | "1 bed" | "2 bed";

type ApartmentDataMap = Record<ApartmentType, ApartmentDetails>;

// Apartment data structure
const apartmentData: ApartmentDataMap = {
  studio: {
    title: "Studio Apartment Detail",
    subtitle: "Modern Living Space",
    area: "798 sqft",
    floor: "14th floor",
    totalPrice: "13,167,000",
    ratePerSqft: "16,500",
    downPayment: "3,291,750",
    remainingAmount: "9,875,250",
    quarterlyInstallment: "617,203",
    paymentPlan: "4 years",
    balcony: "Yes",
    facingCharges: "10% corner, 5% facing views",
    mainImage: "imgi_4465_75695c101476497.5f1fdce588c62_ouxylj",
    thumbnails: [
      "imgi_4465_75695c101476497.5f1fdce588c62_ouxylj",
      "imgi_4462_6eaff2101476497.5f1fdce589b13_alar4b",
      "imgi_4459_b753ad101476497.5f1fdce58ae62_mej60a",
    ],
  },
  "1 bed": {
    title: "1 Bed Apartment Detail",
    subtitle: "Luxury One Bedroom Suite",
    area: "945 sqft",
    floor: "14th floor",
    totalPrice: "15,592,500",
    ratePerSqft: "16,500",
    downPayment: "3,898,125",
    remainingAmount: "11,694,375",
    quarterlyInstallment: "730,898",
    paymentPlan: "4 years",
    balcony: "Yes",
    facingCharges: "10% corner, 5% facing views",
    mainImage: "imgi_4442_b10d4f101476497.5f1fdce5873f0_czr5uk",
    thumbnails: [
      "imgi_4442_b10d4f101476497.5f1fdce5873f0_czr5uk",
      "imgi_4462_6eaff2101476497.5f1fdce589b13_alar4b",
      "imgi_4459_b753ad101476497.5f1fdce58ae62_mej60a",
    ],
  },
  "2 bed": {
    title: "2 Bed Apartment Detail",
    subtitle: "Premium Two Bedroom Residence",
    area: "1,641 sqft",
    floor: "14th floor",
    totalPrice: "27,076,500",
    ratePerSqft: "16,500",
    downPayment: "6,769,125",
    remainingAmount: "20,307,375",
    quarterlyInstallment: "1,269,210",
    paymentPlan: "4 years",
    balcony: "Yes",
    facingCharges: "10% corner, 5% facing views",
    mainImage: "imgi_4465_75695c101476497.5f1fdce588c62_ouxylj",
    thumbnails: [
      "imgi_4465_75695c101476497.5f1fdce588c62_ouxylj",
      "imgi_4462_6eaff2101476497.5f1fdce589b13_alar4b",
      "imgi_4459_b753ad101476497.5f1fdce58ae62_mej60a",
    ],
  },
};

interface ApartmentDetailPageProps {
  type: ApartmentType;
  showNavigation?: boolean;
}

const ApartmentDetailPage: React.FC<ApartmentDetailPageProps> = ({
  type,
}) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // Validate the type and get apartment data
  const apartment: ApartmentDetails | undefined = apartmentData[type];

  // If invalid type, show error
  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Apartment Not Found</h1>
          <p className="text-gray-600">
            The apartment type &quot;{type}&quot; is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Main Content */}
      <div className="mx-auto py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Left Side - Images */}
          <div className="space-y-3 sm:space-y-4 lg:col-span-3">
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <CldImage
                fill
                src={apartment.thumbnails[selectedImage]}
                alt={apartment.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {apartment.thumbnails.map((thumb: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[4/3] overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-black" : ""
                  }`}
                >
                  <CldImage
                    fill
                    src={thumb}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-2">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-light">
                  {apartment.title}
                </h3>
              </div>
              <p className="text-sm sm:text-sm md:text-base mt-1">
                {apartment.subtitle}
              </p>
            </div>

            {/* Apartment Specifications */}
            <div className="bg-white space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1">
                {/* Area */}
                <div
                  className="flex items-center justify-between py-3 sm:py-4 border-b"
                  style={{ borderColor: "rgb(140,46,71)" }}
                >
                  <span
                    className="text-sm sm:text-base md:text-base lg:text-lg font-medium tracking-wide"
                    style={{ color: "rgb(140, 46, 71)" }}
                  >
                    Area
                  </span>
                  <span className="text-sm sm:text-base md:text-base">
                    {apartment.area}
                  </span>
                </div>

                {/* Floor */}
                <div
                  className="flex items-center justify-between py-3 sm:py-4 border-b"
                  style={{ borderColor: "rgb(140,46,71)" }}
                >
                  <span
                    className="text-sm sm:text-base md:text-base lg:text-lg tracking-wide font-medium"
                    style={{ color: "rgb(140, 46, 71)" }}
                  >
                    Floor
                  </span>
                  <span className="text-sm sm:text-base md:text-base lg:text-lg">
                    {apartment.floor}
                  </span>
                </div>

                {/* Rate per sqft */}
                <div
                  className="flex items-center justify-between py-3 sm:py-4 border-b"
                  style={{ borderColor: "rgb(140,46,71)" }}
                >
                  <span
                    className="text-sm sm:text-base md:text-base lg:text-lg tracking-wide font-medium"
                    style={{ color: "rgb(140, 46, 71)" }}
                  >
                    Rate per sqft
                  </span>
                  <span className="text-sm sm:text-base md:text-base">
                    PKR {apartment.ratePerSqft}
                  </span>
                </div>

                {/* Balcony */}
                <div
                  className="flex items-center justify-between py-3 sm:py-4 border-b"
                  style={{ borderColor: "rgb(140,46,71)" }}
                >
                  <span
                    className="text-sm sm:text-base md:text-base lg:text-lg tracking-wide font-medium"
                    style={{ color: "rgb(140, 46, 71)" }}
                  >
                    Balcony
                  </span>
                  <span className="text-sm sm:text-base md:text-base">
                    {apartment.balcony}
                  </span>
                </div>
              </div>

              <div className="">
                <div className="grid grid-cols-1">
                  {/* Total Amount */}
                  <div
                    className="flex items-center justify-between py-3 sm:py-4 border-b"
                    style={{ borderColor: "rgb(140,46,71)" }}
                  >
                    <span
                      className="text-sm sm:text-base md:text-base lg:text-lg font-medium tracking-wide"
                      style={{ color: "rgb(140, 46, 71)" }}
                    >
                      Total Amount
                    </span>
                    <span className="text-sm sm:text-base md:text-base">
                      PKR {apartment.totalPrice}
                    </span>
                  </div>

                  {/* Down Payment */}
                  <div
                    className="flex items-center justify-between py-3 sm:py-4 border-b"
                    style={{ borderColor: "rgb(140,46,71)" }}
                  >
                    <span
                      className="text-sm sm:text-base md:text-base lg:text-lg font-medium tracking-wide"
                      style={{ color: "rgb(140, 46, 71)" }}
                    >
                      Down Payment (25%)
                    </span>
                    <span className="text-sm sm:text-base md:text-base">
                      PKR {apartment.downPayment}
                    </span>
                  </div>

                  {/* Remaining Amount */}
                  <div
                    className="flex items-center justify-between py-3 sm:py-4 border-b"
                    style={{ borderColor: "rgb(140,46,71)" }}
                  >
                    <span
                      className="text-sm sm:text-base md:text-base lg:text-lg font-medium tracking-wide"
                      style={{ color: "rgb(140, 46, 71)" }}
                    >
                      Remaining Amount (75%)
                    </span>
                    <span className="text-sm sm:text-base md:text-base">
                      PKR {apartment.remainingAmount}
                    </span>
                  </div>

                  {/* Quarterly Installments */}
                  <div
                    className="flex items-center justify-between py-3 sm:py-4 border-b"
                    style={{ borderColor: "rgb(140,46,71)" }}
                  >
                    <span
                      className="text-sm sm:text-sm md:text-base lg:text-lg font-medium tracking-wide"
                      style={{ color: "rgb(140, 46, 71)" }}
                    >
                      16 Quarterly Installments
                    </span>
                    <span className="text-sm sm:text-sm md:text-base">
                      PKR {apartment.quarterlyInstallment}
                    </span>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="grid grid-cols-1">
                  {/* Payment Plan */}
                  <div
                    className="flex items-center justify-between py-3 sm:py-4 border-b"
                    style={{ borderColor: "rgb(140,46,71)" }}
                  >
                    <span
                      className="text-sm sm:text-base md:text-base lg:text-lg font-medium tracking-wide"
                      style={{ color: "rgb(140, 46, 71)" }}
                    >
                      Payment Plan
                    </span>
                    <span className="text-sm sm:text-base md:text-base">
                      {apartment.paymentPlan}
                    </span>
                  </div>

                  {/* Facing Charges */}
                  <div
                    className="flex items-center justify-between py-3 sm:py-4 border-b"
                    style={{ borderColor: "rgb(140,46,71)" }}
                  >
                    <span
                      className="text-sm sm:text-base md:text-base lg:text-lg font-medium tracking-wide"
                      style={{ color: "rgb(140, 46, 71)" }}
                    >
                      Facing Charges
                    </span>
                    <span className="text-sm sm:text-sm md:text-base">
                      {apartment.facingCharges}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailPage;
