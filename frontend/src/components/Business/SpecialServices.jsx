/* eslint-disable react/prop-types */
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CoreServices = ({ businessData }) => {

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  Arrow:false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
  return (
    <Box backgroundColor={"#F3F3F4"} padding={"5rem"}>
      <Container maxWidth={"lg"}>
        <Box
          maxWidth={"lg"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"2rem"}
        >
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
                {businessData?.specialServices?.title}
              </Typography>
              <Box
                sx={{
                  border: `2px solid ${businessData?.theme}`,
                  width: "4rem",
                }}
              ></Box>
            </Box>
            <Box maxWidth={"600px"}>
              <Typography
                sx={{
                  color: "#3C4247",
                }}
              >
                {businessData?.specialServices?.description}
              </Typography>
            </Box>
          </Box>
                  
        <Box sx={{ width: "100%" }}>
          {businessData?.specialServices?.data.length>3?(
          <Slider {...settings}>
            {businessData?.specialServices?.data.map((item, index) => (
              <Box  key={item?._id} padding={'5px'} display={'block'}> 
                <Box
               
                backgroundColor={"#ffffff"}
                padding={"1rem"}
                sx={{
                  borderTopLeftRadius: "40px",
                  borderBottomRightRadius: "40px",
                  // display: "flex",
                  // alignItems: "center",
                }}
              >
                <Box width={'100%'}>
                <Avatar
                  alt={item?.title}
                  src={item?.image}
                  sx={{
                    width: 107,
                    height: 90,
                    marginInline:'auto',
                    marginBlock:"10px",
                    "&:hover": {
                      backgroundColor: businessData?.theme,
                    },
                  }}
                />
                </Box>
                <Box>
                  <Typography fontWeight={"bold"} textAlign={"center"}>{item?.title}</Typography>
                  <Typography textAlign={"center"}>{item?.description}</Typography>
                </Box>
              </Box>
              </Box>
            ))}
          </Slider>
          ) : ( businessData?.specialServices?.data.map((item, index) => (
            <Box  key={item?._id} display={'flex'}>
                <Box padding={'5px'} display={'block'} width={{xs:"100%",md:"100%",lg:"40%"}}>
                <Box
                key={index}
                backgroundColor={"#ffffff"}
                padding={"1rem"}
                sx={{
                  borderTopLeftRadius: "40px",
                  borderBottomRightRadius: "40px",
                  // display: "flex",
                  // alignItems: "center",
                }}
              >
                <Box width={'100%'}>
                <Avatar
                  alt={item?.title}
                  src={item?.image}
                  sx={{
                    width: 107,
                    height: 90,
                    marginInline:'auto',
                    marginBlock:"10px",
                    "&:hover": {
                      backgroundColor: businessData?.theme,
                    },
                  }}
                />
                </Box>
                <Box>
                  <Typography fontWeight={"bold"} textAlign={"center"}>{item?.title}</Typography>
                  <Typography textAlign={"center"}>{item?.description}</Typography>
                </Box>
              </Box>
              </Box>
            </Box>
            ))
          )
        }
        </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CoreServices;
