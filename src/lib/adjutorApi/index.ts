import axios, { AxiosInstance } from "axios";
import { envStore } from "../../envStore";

class AdjutorApi {
  private baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor(bearerToken: string) {
    this.baseURL = "https://adjutor.lendsqr.com/v2/";
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  public async checkCustomerKarma(
    bvn: string,
    phoneNumber?: string,
    email?: string
  ): Promise<boolean> {
    const endpoints = [
      { type: "bvn", value: bvn },
      { type: "phoneNumber", value: phoneNumber },
      { type: "email", value: email },
    ].filter((endpoint) => endpoint.value);

    const requests = endpoints.map((endpoint) =>
      this.axiosInstance
        .post(`verification/karma/${endpoint.value}`, {
          [endpoint.type]: endpoint.value,
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return null;
          } else {
            throw error;
          }
        })
    );

    const results = await Promise.all(requests);
    const validResult = results.find((result) => result !== null);

    if (validResult) {
      return true;
    } else {
      return false;
    }
  }
}

export default AdjutorApi;
