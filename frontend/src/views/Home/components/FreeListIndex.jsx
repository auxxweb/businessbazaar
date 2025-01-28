import React, { useState } from "react";
import { FaLock, FaDollarSign } from "react-icons/fa";

const FreeListCard = ({ data, onCardClick }) => {
  return (
    <div
      className="crypto_card border-0 rounded-4 overflow-hidden"
      onClick={() => onCardClick(data)}
    >
      <div className="crypto_card_header position-relative">
        <img
          src={data.logo || `/placeholder.svg?height=240&width=400`}
          alt={data.name}
          className="w-full h-60 object-cover"
        />
      </div>
      <div className="crypto_card_content">
        <h5 className="crypto_title">{data.name}</h5>
        <p className="crypto_brand text-sm text-gray-500">{data.brandName}</p>
        <p className="crypto_description text-gray-600 text-sm line-clamp-2">
          {data.description}
        </p>
      </div>
    </div>
  );
};

const Modal = ({ data, onClose }) => (
  <div className="modal_overlay">
    <div className="modal_content">
      <button className="modal_close" onClick={onClose}>
        ✖
      </button>
      <h2 className="modal_title">{data.name}</h2>
      <p className="modal_brand">Brand: {data.brandName}</p>
      <img
        src={data.logo || `/placeholder.svg`}
        alt={data.name}
        className="modal_image"
      />
      <div className="modal_section">
        <h4>Address:</h4>
        <p>{data.address.buildingName}</p>
        <p>{data.address.streetName}</p>
        <p>{data.address.landMark}</p>
        <p>{data.address.district}, {data.address.state}, {data.address.pinCode}</p>
      </div>
      <div className="modal_section">
        <h4>Contact Details:</h4>
        <p>Primary: {data.contactDetails.primaryNumber}</p>
        <p>Secondary: {data.contactDetails.secondaryNumber}</p>
        <p>WhatsApp: {data.contactDetails.whatsAppNumber}</p>
        <p>Email: {data.contactDetails.email}</p>
        <p>Website: {data.contactDetails.website}</p>
      </div>
      <p className="modal_description">{data.description}</p>
    </div>
    <style jsx>{`
      .modal_overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .modal_content {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        max-width: 600px;
        width: 90%;
        position: relative;
      }
      .modal_close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }
      .modal_image {
        width: 100%;
        height: auto;
        margin: 1rem 0;
      }
      .modal_section {
        margin-bottom: 1rem;
      }
      .modal_title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
    `}</style>
  </div>
);

const FreeListIndex = ({ freelist }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="crypto_container">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3 text-3xl md:text-4xl lg:text-5xl">
          Discover the Top Profiles
        </h1>
        <p
          className="text-muted mx-auto text-sm md:text-base lg:text-lg"
          style={{ maxWidth: "800px" }}
        >
          Explore the most popular profile listings in your area through our
          local profile directory listing, highly rated by locals and visitors
          alike.
        </p>
      </div>
      <div className="crypto_grid">
        {freelist && freelist.length > 0 ? (
          freelist.map((card) => (
            <div key={card._id} className="crypto_grid_item">
              <FreeListCard data={card} onCardClick={handleCardClick} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No profiles available.</p>
        )}
      </div>
      {selectedCard && (
        <Modal data={selectedCard} onClose={handleCloseModal} />
      )}

      <style jsx>{`
        .crypto_container {
          padding: 3rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .crypto_grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        .crypto_card {
          background: white;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }
        .crypto_card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        .crypto_card_header {
          height: 240px;
          overflow: hidden;
        }
        .crypto_card_content {
          padding: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default FreeListIndex;
