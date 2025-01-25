import React from "react"
import { FaLock, FaDollarSign } from "react-icons/fa"

const CryptoCard = ({ data }) => {
  
  return (
    <div className="crypto_card border-0 rounded-4 overflow-hidden">
      <div className="crypto_card_header position-relative">
        <img src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" alt="" />
       
      </div>
      <div className="crypto_card_content">
        <h5 className="crypto_title">{data.name}</h5>
        <p className="crypto_description">{data.description}</p>

        <div className="crypto_metrics">
          <div className="crypto_metric_item">
            <span className="crypto_metric_icon">👥</span>
            <span className="crypto_metric_value">{data.name}</span>
          </div>
          <div className="crypto_metric_item">
            <span className="crypto_metric_icon">⚡</span>
            <span className="crypto_metric_value">{data.name}</span>
          </div>
        </div>

        <div className="crypto_tags">
          {/* {data.tags.map((tag, index) => (
            <span key={index} className="crypto_tag">
              <span className="crypto_tag_icon">{tag.icon}</span>
              <span className="crypto_tag_text">{tag.name}</span>
            </span>
          ))} */}
        </div>
      </div>
    </div>
  )
}

const FreeListIndex = ({freelist}) => {

  
 
  return (
    <div className="crypto_container">
         <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Discover the Top Profiles</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Explore the most popular profile listings in your area through our local profile directory listing, highly
            rated by locals and visitors alike. Our platform makes it easy to find top-rated profiles based on customer
            reviews and expert recommendations.
          </p>
        </div>
      <div className="crypto_grid">
      {freelist && freelist.length > 0 ? (
          freelist.map((card) => (
            <div key={card._id} className="crypto_grid_item">
              <CryptoCard data={card} />
            </div>
          ))
        ) : (
          <p>No profiles available.</p>
        )}
      </div>

      <style jsx>{`
        .crypto_container {
          padding: 3rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .crypto_grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .crypto_card {
          background: white;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .crypto_card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .crypto_card_header {
          height: 240px;
          background: #f8f9fa;
          overflow: hidden;
        }

        .crypto_diagonal_strip {
          position: absolute;
          top: -20px;
          left: -20px;
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #000 0%, #333 100%);
          transform: rotate(-10deg);
        }

        .crypto_logo_container {
          position: absolute;
          top: 25px;
          left: 15px;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .crypto_icons {
          top: 15px;
          right: 15px;
          display: flex;
          gap: 0.5rem;
        }

        .crypto_card_content {
          padding: 1.5rem;
        }

        .crypto_title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .crypto_description {
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .crypto_metrics {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .crypto_metric_item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .crypto_metric_icon {
          opacity: 0.5;
        }

        .crypto_metric_value {
          font-weight: 600;
        }

        .crypto_tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .crypto_tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.375rem 0.75rem;
          background-color: #f8f9fa;
          border-radius: 100px;
          font-size: 0.875rem;
          color: #4a5568;
          white-space: nowrap;
        }

        .crypto_tag_icon {
          font-size: 1.1rem;
          line-height: 1;
        }

        .crypto_tag_text {
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .crypto_card_content {
            padding: 1.25rem;
          }
          
          .crypto_tag {
            padding: 0.25rem 0.5rem;
            font-size: 0.8rem;
          }
          
          .crypto_grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default FreeListIndex

