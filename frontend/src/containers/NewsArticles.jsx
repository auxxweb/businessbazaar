import React, { useEffect, useState } from 'react'
import PlaceholderBanner from "../assets/images/BannerPlaceholder.png";
import { fetchNewsArticles } from '../Functions/functions';
import { useParams } from 'react-router';
import { formatDate } from '../utils/app.utils';

function NewsArticles({ colorTheme }) {

    const [newsData, setNewsData] = useState([]);
    const [bannerData,setBannerData] = useState(null)
    const { id } = useParams();

    useEffect(() => {
         fetchNewsArticles(id).then((response)=>{
            if(response.success){
                setNewsData(response.data.data.filter((item)=> !item?.isBanner))
                const [data] = response?.data?.data.filter((item)=>item?.isBanner)
                if (!data) {
                    setBannerData(response?.data?.data[0])
                }else{
                    setBannerData(data)
                }
            }
            })
    }, [id])

    return (
        <>
            <section className="h-auto">
                <div className="container mt-2 p-top">
                    <div className="col-12 mt-5 text-center text-lg-start">
                        <h1 className="fw-bold text-center">News & Articles</h1>
                    </div>
                    <div className="row align-items-center banner-section shadow-lg py-3 " style={{ borderRadius: "15px" }}>
                        <div className="col-12 col-lg-6 text-end  overflow-hidden">
                        <LinkPreview url={bannerData?.link} />
                        </div>
                        {/* Text Content */}
                        <div className="col-12 col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <h1 className="text-start text-dark fw-bold david-font fw-bold  text-center text-sm-start">
                                        {bannerData?.title}
                                    </h1>
                                </div>
                                <div className="col-12">
                                    <p className="text-secondary text-center text-lg-start david-font">
                                        {bannerData?.description}
                                    </p>
                                </div>
                                <div className="mt-3 col-12">
                                    <div className="row">
                                        <div className="col-6 d-flex align-items-center">
                                            <p style={{ fontStyle: "italic", fontSize: " 12px" }} className='p-0 m-0 '>Date Published:{formatDate(bannerData?.createdAt)}</p>
                                        </div>
                                        <div className="col-6 ">
                                            <a
                                                style={{ backgroundColor: colorTheme }}
                                                target='_blank'
                                                href={newsData[2]?.link}
                                                className="btn btn-dark text-white radius-theme box-shadow theme w-100 p-1">
                                                visit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-auto mb-4">
                <div className="container ">
                    <div className="row">
                        {newsData.map((item) => (
                            <div className="col-12 col-lg-4 mx-1 mx-auto">
                                <div className="row align-items-center banner-section shadow-lg rounded mx-1 ">
                                    <div className="col-12  pt-3">
                                         <LinkPreview url={item?.link} />
                                    </div>
                                    <div className="col-12 ">
                                        <div className="row align-items-center">
                                            <div className="col-12">
                                                <p className="text-start text-dark fw-bold david-font fw-bold  text-center text-sm-start">
                                                    {item?.title}
                                                </p>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-secondary text-start text-xs-start david-font">
                                                    {item?.description}
                                                </p>
                                            </div>
                                            <div className="mb-3 col-12">
                                                <div className="row">
                                                    <div className="col-6 d-flex align-items-center">
                                                        <p className='m-0 p-0' style={{ fontStyle: "italic", fontSize: " 10px" }}>Date Published:{formatDate(item?.createdAt)}</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <a
                                                            target='_blank'
                                                            href={item?.link}
                                                            style={{ backgroundColor: colorTheme }}
                                                            className="btn btn-dark text-white radius-theme box-shadow theme w-100 p-1">
                                                            visit
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewsArticles

function LinkPreview({ url }) {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.text();

        const isYouTubeVideo = isYouTubeURL(url);
        if (isYouTubeVideo) {
          const videoId = extractYouTubeVideoId(url);
          const videoThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

          setPreviewData({
            videoId,
            videoThumbnail,
          });
          setLoading(false);
        } else {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          const title = doc.querySelector('title')?.textContent || '';
          const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
          const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

          setPreviewData({
            title,
            description,
            image,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const isYouTubeURL = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const extractYouTubeVideoId = (url) => {
    const videoIdRegex = /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : '';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!previewData) {
    return (
        <div className='overflow-hidden  rounded'  style={{ cursor: 'pointer' }}>
      <img src={PlaceholderBanner} alt="Link Preview"  className='w-100 h-100'/>
    </div>
    )
  }

  const handleClick = () => {
    window.open(url, '_blank');
  };

  if (previewData.videoId) {
    return (
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        <img src={previewData.videoThumbnail} alt="Video Thumbnail" />
      </div>
    );
  }
  return (
    <div className='overflow-hidden  rounded' onClick={handleClick} style={{ cursor: 'pointer' }}>
       {previewData.image && <img src={previewData?.image } alt="Link Preview"  className='w-100 h-100'/>}
    </div>
  );
}
