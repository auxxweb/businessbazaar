import PropTypes from "prop-types";
import Placeholder from "/images/placeholder.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const CategoryIndex = ({
  loading,
  categoryData,
  visibleCategories,
  loadMoreCategories,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleLoadMore = async () => {
    await loadMoreCategories();
  };

  return (
    <section className="bg-white ">
      <div className="container-">
        <div className="row g-2 custom-row-cols">
          {categoryData.map((category) => (
            <div className="custom-col"  key={category._id}>
              <Link
                to={`/category/${category._id}`}
                className="text-decoration-none"
              >
                <div
                  className="card h-100 w-78 border-3 shadow-sm"
                  style={{
                    borderRadius: "12px",
                    transition: "all 0.2s ease-in-out",
                    width:'84%'
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div
                    className="card-body  d-flex  align-items-center justify-content-center"
                    style={{ height: "120px"}}
                  >
                    <div
                      className="mb-2 d-flex align-items-center justify-content-center bg-light rounded-3"
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <img
                        src={
                          category.image && category.image.length > 0
                            ? category.image
                            : Placeholder
                        }
                        alt={category.name}
                        className="img-fluid"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <h3
                      className="card-title text-center small text-dark"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        maxWidth: "100%",
                      }}
                    >
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {visibleCategories <= categoryData.length && (
          <div className="row mt-5">
            <div className="col-12 text-center">
              {loading ? (
                <div
                  className="spinner-border text-dark"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderWidth: "2px",
                  }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button
                  onClick={handleLoadMore}
                  className="btn btn-dark rounded-pill px-4 py-2"
                  disabled={buttonLoading}
                >
                  View More
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
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
