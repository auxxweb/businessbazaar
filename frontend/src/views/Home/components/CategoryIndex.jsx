import PropTypes from "prop-types";
import Placeholder from "/images/placeholder.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion

const CategoryIndex = ({
  loading,
  categoryData,
  visibleCategories,
  loadMoreCategories,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoadMore = async () => {
    setButtonLoading(true);
    await loadMoreCategories();
    setButtonLoading(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="cat-section bg-white">
      <div className="container-fluid px-4">
        <div className="cat-grid">
          {categoryData.map((category, index) => (
            <motion.div
              className="cat-grid-item"
              key={category._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }} // Slightly scale up on hover
            >
              <Link
                to={`/category/${category._id}`}
                className="text-decoration-none"
              >
                <div className="cat-card">
                  <div className="cat-card-body">
                    <div className="cat-icon-wrapper">
                      <img
                        src={
                          category.image && category.image.length > 0
                            ? category.image
                            : Placeholder
                        }
                        alt={category.name}
                        className="cat-icon"
                      />
                    </div>
                    <h3 className="cat-title">{category.name}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* View More Card */}
          {visibleCategories <= categoryData.length && (
            <motion.div
              className="cat-grid-item"
              onClick={handleLoadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="cat-card cat-view-more">
                <div className="cat-card-body">
                  {loading ? (
                    <div className="cat-spinner"></div>
                  ) : (
                    <>
                      <div className="cat-icon-wrapper">
                        <i className="bi bi-plus-lg cat-plus-icon"></i>
                      </div>
                      <h3 className="cat-title">View More</h3>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style>
        {`
          .cat-section {
            padding: 20px 0;
          }

          .cat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 15px;
            padding: 10px;
          }

          .cat-grid-item {
            display: flex;
            justify-content: center;
          }

          .cat-card {
            width: 100px;
            height: 100px;
            border-radius: 12px;
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            border: 1px solid #eee;
          }

          .cat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .cat-card-body {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px;
          }

          .cat-icon-wrapper {
            width: 40px;
            height: 40px;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
          }

          .cat-icon {
            width: 30px;
            height: 30px;
            object-fit: contain;
            border-radius: 4px;
          }

          .cat-plus-icon {
            font-size: 20px;
            color: #666;
          }

          .cat-title {
            font-size: 0.75rem;
            font-weight: 500;
            color: #333;
            text-align: center;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            max-width: 100%;
          }

          .cat-view-more {
            border: 1px dashed #ddd;
            background: #fcfcfc;
          }

          .cat-view-more:hover {
            background: #f8f9fa;
          }

          .cat-spinner {
            border: 2px solid #f3f3f3;
            border-top: 2px solid #3498db;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .cat-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
            }

            .cat-card {
              width: 90px;
              height: 90px;
            }

            .cat-icon-wrapper {
              width: 35px;
              height: 35px;
            }

            .cat-icon {
              width: 25px;
              height: 25px;
            }

            .cat-title {
              font-size: 0.7rem;
            }
          }
        `}
      </style>
    </section>
  );
};

CategoryIndex.propTypes = {
  loading: PropTypes.bool.isRequired,
  categoryData: PropTypes.array.isRequired,
  visibleCategories: PropTypes.number.isRequired,
  loadMoreCategories: PropTypes.func.isRequired,
};

export default CategoryIndex;
