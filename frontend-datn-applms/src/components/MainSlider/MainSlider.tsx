import { Divider } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { VITE_ASSET_URL } from "../../layout/Header/Header";

const MainSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  type Slide = {
    id: number;
    imageUrl: string;
  };
  const slides: Slide[] = [
    {
      id: 1,
      imageUrl: `${VITE_ASSET_URL}/banner1.png`
    },
    {
      id: 2,
      imageUrl: `${VITE_ASSET_URL}/banner2.png`
    },
    {
      id: 3,
      imageUrl: `${VITE_ASSET_URL}/banner3.png`
    }
  ];

  const CarouselSlide = ({ imageUrl }: Slide) => {
    return (
      <div>
        <div>
          <img
            src={imageUrl}
            alt="Course Image"
            style={{
              width: "100%",
              maxWidth: "100%", 
              // padding: "0 36px 36px" 
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide) => (
          <CarouselSlide key={slide.id} {...slide} />
        ))}
      </Slider>
      <Divider sx={{ border: "none" }} />
    </div>
  );
};

export default MainSlider;
