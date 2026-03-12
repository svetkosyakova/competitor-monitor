import axios from "axios";

export const fetchSiteContent = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching site:", error);
    return null;
  }
};