import axios from "axios";

const randomUser = axios.create({
  baseURL: "https://randomuser.me/api/",
});

export const getUser = async (n: number) => {
  try {
    const response = await randomUser.get(`?results=${n}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
