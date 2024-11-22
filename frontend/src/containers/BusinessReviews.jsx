import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import Rating from '@mui/material/Rating';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { createBusinessReview, getAllBusinessReviews } from "../Functions/functions";
import { useParams } from "react-router";
import { formatDate } from "../utils/app.utils";
import Loader from "../components/Loader/Loader";

const BusinessReviews = ({ theme, secondaryTheme, bgBanner }) => {
    const { id } = useParams()
    const [visible, setVisible] = useState(false)
    const [review, setReview] = useState({
        rating: "",
        name: "",
        review: "",
    });
    const [allReviews, setAllReviews] = useState(null)

    useEffect(() => {
        const fetchReview = async () => {
            const response = await getAllBusinessReviews({ businessId: id });
            console.log(response, "---------------------");
            setAllReviews(response?.data?.data);
        };
        fetchReview();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        createBusinessReview({
            ...review,
            businessId: id,
        }).then((response) => {
            setReviewLoading(false)
            setReview({
                rating: "",
                name: "",
                review: "",
            })
            if (response?.data) {
                toast.success("Thank you for your review!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    style: {
                        backgroundColor: "#38a20e", // Custom red color for error
                        color: "#FFFFFF", // White text
                    },
                });
                setreviewFetch(!reviewFetch);
                setVisible(false);
            }
        }).catch((err) => {
            setReview({
                rating: "",
                name: "",
                review: "",
            })
            setReviewLoading(false)
            console.log(err.message);
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div style={{ minHeight: "100vh", marginTop: "90px" }} className="banner-section position-relative">
                <div style={{ backgroundImage: `url(${bgBanner})`, opacity: '0.2', backgroundPosition: "center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', zIndex: -1 }} className="position-absolute top-0 start-0 w-100 h-100 "></div>
                {visible && <ReviewModal
                    visible={visible}
                    setVisible={setVisible}
                    handleInputChange={handleInputChange}
                    handleReviewSubmit={handleSubmit}
                    theme={theme}
                    secondaryTheme={secondaryTheme}
                    setReview={setReview}
                    review={review}
                />}
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center py-4 align-items-center mx-auto ">
                            <button style={{ backgroundColor: theme }} className="btn theme text-white radius-theme" onClick={(() => setVisible(true))}>write Review</button>
                        </div>
                        {allReviews && allReviews?.map((item) => (
                            <div data-aos="zoom-out" key={item?._id} className="  testi-slide col-12 col-md-6 col-lg-4  mx-auto  p-3  " >
                                <div
                                    className={`p-3  rounded shadow position-relative bg-white  `}
                                >
                                    <div className="row ">
                                        <div className="col-2 ">
                                            <img
                                                width={50}
                                                height={50}
                                                src="/src/assets/images/user.png"
                                                alt={item?.name}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="col-10">
                                            <h3 className="fs-20 p-0 m-0 ms-4">
                                                {item?.name}
                                            </h3>
                                            <div className="text-warning text-center mt-0 m-0">
                                                {[...Array(Math.floor(item?.rating))].map(
                                                    (star, i) => (
                                                        <i key={i} className="bi bi-star-fill"></i>
                                                    ),
                                                )}
                                                {item?.rating % 1 !== 0 && (
                                                    <i className="bi bi-star-half"></i>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100 mt-4">
                                        <p className='w-100' style={{ whiteSpace: 'pre' }}>{item?.review} </p>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <p>{formatDate(item?.createdAt ?? '')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessReviews;


export const ReviewModal = ({
    visible,
    setVisible,
    handleInputChange,
    handleReviewSubmit,
    setReview,
    theme,
    secondaryTheme,
    reviewLoading,
    review
}) => {
    return (
        <Dialog
            header="Write a Review"
            visible={visible}
            onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}

            style={{ minWidth: "50vw", borderRadius: '12px', overflow: "hidden" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        >
            <div className="container ">
                <form onSubmit={handleReviewSubmit}>
                    <div className=" mb-3 d-flex justify-content-center">
                        <Rating
                            name="simple-controlled"
                            value={review.rating}
                            color="warning"
                            onChange={(event, newValue) => {
                                setReview({ ...review, rating: newValue })
                            }}
                        />
                    </div>

                    <div className="">
                        <InputText
                            keyfilter="text"
                            placeholder="Full Name"
                            className="w-100"
                            value={review.name}
                            name="name"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Description Input Field */}
                    <div className=" mt-3">
                        <div className="w-100 d-flex justify-content-center">
                            <InputTextarea
                                value={review.review} // Bind the description from state
                                onChange={handleInputChange} // Update description in state
                                rows={5}
                                cols={30}
                                name="review" // Important: use `name` for targeting in handleInputChange
                                placeholder="Write your review here..."
                                className="w-100"
                            />
                        </div>
                    </div>

                    <div className="col-12 mt-3 text-center">
                        {reviewLoading ?
                            <div class="spinner-border" style={{ color: theme }} role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div> : <button type="submit" className="btn-theme2 btn  theme radius  ">
                                Submit Review
                            </button>}
                    </div>
                </form>
            </div>
        </Dialog>
    )
}