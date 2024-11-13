/* eslint-disable no-unused-vars */
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// const baseUrl = "http://localhost:5000"
const baseUrl = "https://server.instant-connect.in";

export const fetchCategories = async (limit) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/category?limit=${limit}`,
      config
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;
    if (data.success) {
      return data;
    } else {
      console.error("Failed to fetch categories");
    }
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

export const fetchBusiness = async (page, limit, search, location) => {
  try {
    console.log(location, "location");
    const query = {
      page: page,
      limit: limit,
    };

    if (search) {
      query.searchTerm = search;
    }

    if (location.lat && location.lon) {
      query.lat = location.lat;
      query.lon = location.lon;
    }

    const response = await axios.get(`${baseUrl}/api/v1/business`, {
      params: query,
      ...config,
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;

    if (data.success) {
      return data;
    } else {
      console.error("Failed to fetch Business");
    }
  } catch (error) {
    console.error("Error fetching Business:", error.message);
  }
};

export const fetchSearchCategory = async (search) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/category?page=1&limit=10&searchTerm=${search}`,
      config
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;

    if (data.success) {
      return data;
    } else {
      console.error("Failed to fetch Search Value");
    }
  } catch (error) {
    console.error("Error fetching Search Value:", error.message);
  }
};

export const fetchBusinessTemplate = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/business/${id}`,
      config
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = response.data;
    if (data.success) {
      return data;
    } else {
      console.error("Failed to fetch Search Value");
    }
  } catch (error) {
    console.error("Failed to fetch Business Site Details");
  }
};

export const getAllReviews = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/review`, config);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch reviews");
  }
};
export const getAllBusinessReviews = async ({
  page = 1,
  limit = 10,
  businessId,
}) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/business-review/${businessId}?page=${page}&limit=${limit}`,
      config
    );
    console.log(response, "reveiws---reviews");

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch reviews");
  }
};

export const CreateBusinessDetails = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/business/`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    if (data.success) {
      return data; // Successfully created business details
    } else {
      console.error(
        "Failed to create business details:",
        data.message || "Unknown error"
      );
      throw new Error(data.message || "Failed to create business details");
    }
  } catch (error) {
    console.error(
      "Error occurred while fetching business site details:",
      error.message
    );
    throw error; // Propagate the error
  }
};
export const createReveiw = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/review/`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    if (data.success) {
      return data; // Successfully created business details
    } else {
      console.error("Failed to add review:", data.message || "Unknown error");
      throw new Error(data.message || "Failed to add review");
    }
  } catch (error) {
    console.error("failed add review:", error.message);
    throw error; // Propagate the error
  }
};
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/contact_forms`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (data.success) {
      return data; // Successfully created business details
    } else {
      console.error("Failed to submit form:", data.message || "Unknown error");
      throw new Error(data.message || "Failed to submit form");
    }
  } catch (error) {
    console.error("failed to submit form:", error.message);
    throw error; // Propagate the error
  }
};
export const submitNewsLetter = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/contact_forms/news-letter`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (data.success) {
      return data; // Successfully created business details
    } else {
      console.error("Failed to submit form:", data.message || "Unknown error");
      throw new Error(data.message || "Failed to submit form");
    }
  } catch (error) {
    console.error("failed to submit form:", error.message);
    throw error; // Propagate the error
  }
};

export const createBusinessReview = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/business-review`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (data.success) {
      return data; // Successfully created business details
    } else {
      console.error("Failed to add review:", data.message || "Unknown error");
      throw new Error(data.message || "Failed to add review");
    }
  } catch (error) {
    console.error("failed add review:", error.message);
    throw error; // Propagate the error
  }
};
export const checkBusinessExists = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/business/check`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;
    if (data.success) {
      return data; // Successfully created business details
    } else {
      console.error(
        "Failed to create business details:",
        data.message || "Unknown error"
      );
      throw new Error(data.message || "Failed to create business details");
    }
  } catch (error) {
    console.error(
      "Error occurred while fetching business site details:",
      error.message
    );
    throw error; // Propagate the error
  }
};

export const FetchPlans = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/plans`, config); // Use backticks for template literals

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;
    if (data.success) {
      return data;
    } else {
      console.error("Failed to fetch categories");
    }
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};
export const fetchBanners = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/banner`, config); // Use backticks for template literals

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;
    if (data.success) {
      return data?.data;
    } else {
      console.error("Failed to fetch categories");
    }
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

export const getCategoryData = async ({
  categoryId,
  searchTerm = "",
  page = 1,
  limit = 10,
}) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/category/${categoryId}?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
      config
    );

    if (response.status !== 200) {
      throw new Error("HTTP status: " + response.status);
    }
    const data = response.data;

    if (data.success) {
      return data;
    } else {
      console.error("Failed to fetch category data");
    }
  } catch (error) {
    console.log("Error fetching category", error.message);
  }
};

export const getCategoryBusiness = async (page, categoryId,searchTerm,limit) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/business/category/${categoryId}?page=${page}&&searchTerm=${searchTerm}&&limit=${limit}`
    );

    if (response.status !== 200) {
      throw new Error("HTTP status: " + response.status);
    }
    const data = response.data;

    if (data.success) {
      return data;
    } else {
      console.log("Failed to fetch business based on category");
    }
  } catch (error) {
    console.log("Error fetching business", error.message);
  }
};

export const getTermsAndConditions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/admin-terms`);
    if (response.status !== 200) {
      throw new Error("HTTP status: " + response.status);
    }
    const data = response.data;

    if (data.success) {
      return data;
    } else {
      console.log("Failed to fetch terms & conditions");
    }
  } catch (error) {
    console.log("Error fetching terms & conditions", error.message);
  }
};

export const getBusinessTermsAndConditions = async (businessId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/terms_and_conditions/business/${businessId}`
    );
    if (response.status !== 200) {
      throw new Error("HTTP status: " + response.status);
    }
    const data = response.data;

    if (data.success) {
      return data;
    } else {
      console.log("Failed to fetch business terms & conditions");
    }
  } catch (error) {
    console.log("Error fetching business terms & conditions", error.message);
  }
};
