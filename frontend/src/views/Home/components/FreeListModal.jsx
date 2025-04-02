import React from "react";

const FreeListModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Brand Information</h3>
            <p>
              <strong>Brand Name:</strong> {data.brandName}
            </p>
            {data.logo && (
              <div className="mt-2">
                <img
                  src={data.logo || "/placeholder.svg"}
                  alt={`${data.brandName} logo`}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>{data.address.buildingName}</p>
            <p>{data.address.streetName}</p>
            <p>{data.address.landMark}</p>
            <p>
              {data.address.district}, {data.address.state} {data.address.pinCode}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
            <p>
              <strong>Primary:</strong> {data.contactDetails.primaryCountryCode} {data.contactDetails.primaryNumber}
            </p>
            <p>
              <strong>Secondary:</strong> {data.contactDetails.secondaryCountryCode} {data.contactDetails.secondaryNumber}
            </p>
            <p>
              <strong>WhatsApp:</strong> {data.contactDetails.whatsappCountryCode} {data.contactDetails.whatsAppNumber}
            </p>
            <p>
              <strong>Email:</strong> {data.contactDetails.email}
            </p>
            <p>
              <strong>Website:</strong> {data.contactDetails.website}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p>{data.description}</p>
          </div>
        </div>

        {data.enconnectUrl && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Auxxbay URL</h3>
            <a
              href={data.enconnectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data.enconnectUrl}
            </a>
          </div>
        )}

        {data.images && data.images.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${data.name} image ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeListModal;
