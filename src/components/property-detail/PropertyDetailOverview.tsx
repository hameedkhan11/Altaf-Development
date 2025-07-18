// // Example of how to update PropertyOverview component interface
// import React from "react";
// import { PropertyDetail } from "@/lib/types"; // Changed from Property to PropertyDetail

// interface PropertyOverviewProps {
//   property: PropertyDetail; // Changed from Property to PropertyDetail
// }

// export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ property }) => {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Property Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Property Details</h3>
//           <ul className="space-y-2 text-gray-600">
//             <li>Property Type: {property.type}</li>
//             <li>Bedrooms: {property.bedrooms}</li>
//             <li>Bathrooms: {property.bathrooms}</li>
//             <li>Size: {property.size} sqft</li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Pricing Information</h3>
//           <ul className="space-y-2 text-gray-600">
//             <li>Rate per sqft: PKR {property.rate.toLocaleString()}</li>
//             <li>Total Price: PKR {property.totalPrice}</li>
//             <li>Down Payment: PKR {property.downPayment.toLocaleString()}</li>
//             <li>Quarterly Installment: PKR {property.quarterlyInstallment.toLocaleString()}</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };