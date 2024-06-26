import axios, { AxiosInstance } from "axios";
import { envStore } from "../../envStore";

class AdjutorApi {
  private baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.baseURL = "https://adjutor.lendsqr.com/v2/";
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${envStore.adjutorApi}`,
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

    for (const endpoint of endpoints) {
      try {
        await this.axiosInstance.post(`verification/karma/${endpoint.value}`, {
          [endpoint.type]: endpoint.value,
        });
        return true; // Return true immediately if any request is successful
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          throw error; // Throw error for non-404 errors
        }
        // Continue to the next endpoint if the error is 404
      }
    }

    return false; // Return false if none of the requests were successful
  }
}

export default AdjutorApi;
