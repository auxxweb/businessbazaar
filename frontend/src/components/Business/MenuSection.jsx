/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MenuSection = ({ productSection, theme, product }) => {
  const settings = {
    dots: true,
    infinite: !productSection?.data?.length,
    autoplay: true,
    arrows: false,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: productSection?.data?.length ? 2 : 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      {productSection?.data?.some(
        (item) => item?.title || item?.description || item?.image || item?.link
      ) && (
        <Box maxWidth={"lg"} margin={"1rem"} padding={"2rem"} width={"100vw"}>
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={"flex-start"}
            gap={{ xs: "1rem", lg: "5rem" }}
            marginBottom={"5rem"}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "38px",
                  fontWeight: 700,
                  lineHeight: "54px",
                  letterSpacing: 0,
                  textTransform: "uppercase",
                }}
              >
                {productSection?.title}
              </Typography>
              <Box
                sx={{
                  border: productSection?.title ? `2px solid ${theme}` : "none", // Apply border only if title exists
                  width: "4rem",
                }}
              ></Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#3C4247",
                }}
              >
                {productSection?.description}
              </Typography>
            </Box>
          </Box>

          <Slider className=" " {...settings}>
            {productSection?.data?.map((item, index) => {
              // Check if all fields are empty for this item
              const isEmpty =
                !item?.title &&
                !item?.description &&
                !item?.image &&
                !item?.link;
              if (isEmpty) return null; // Skip rendering this item

              return (
                <div className="p-2" key={index}>
                  <Card
                    sx={{
                      marginTop: index % 2 !== 0 ? "8rem" : 0,
                      marginBottom: index % 2 === 0 ? "8rem" : 0,
                    }}
                    className="border shadow"
                  >
                    <CardMedia
                      sx={{ width: 280, height: 213, marginInline: "auto" }}
                      image={
                        item?.image
                          ? item?.image
                          : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                      }
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        mt={".5rem"}
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontSize={"1rem"}
                        lineHeight={"1rem"}
                      >
                        {item?.title}
                      </Typography>
                      <Typography
                        mt={".5rem"}
                        gutterBottom
                        variant="h5"
                        component="div"
                        lineHeight={"1rem"}
                        fontSize={"1.5rem"}
                        fontWeight={"600"}
                      >
                        {product && "₹"} {item?.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#636669", mt: ".5rem" }}
                      >
                        {item?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default MenuSection;
