import { useEffect, useState } from "react";
import { fetchBusinessTemplate } from "../Functions/functions";
import { useParams } from "react-router-dom";

const useBusiness = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const businessDetails = await fetchBusinessTemplate(id);
      setBusinessData(businessDetails?.data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return {
    loading,
    businessData,
  };
};

export default useBusiness;
