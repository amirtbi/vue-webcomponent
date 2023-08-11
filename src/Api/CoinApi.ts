import ApiClass from "./axiosConfig";

const apiClass = new ApiClass();
const basePath = {
  prefix: "/prices",
};

export const fetchPrices = (pair: string): Promise<any> => {
  return apiClass.get(`${basePath.prefix}/${pair}/buy`);
};
