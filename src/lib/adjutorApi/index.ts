import { envStore } from "../../envStore";

class AdjutorApi {
  private baseURL: string;

  constructor() {
    this.baseURL = "https://adjutor.lendsqr.com/v2/";
  }

  public async checkCustomerKarma(
    domain?: string | null,
    bvn?: string,
    phoneNumber?: string | null,
    email?: string | null
  ): Promise<boolean> {
    const endpoints = [
      { type: "bvn", value: bvn },
      { type: "phoneNumber", value: phoneNumber },
      { type: "email", value: email },
      { type: "domain", value: domain },
    ].filter((endpoint) => endpoint.value);

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(
          `${this.baseURL}verification/karma/${endpoint.value}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${envStore.adjutorApi}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.status);

        if (response.ok) {
          console.log(await response.json());

          return true; // Record found, user is blacklisted
        }

        if (response.status === 400) {
          continue; // Record not found, check next endpoint
        }

        // throw new Error(`HTTP error! Status: ${response.status}`);
      } catch (error) {
        // Log the error for debugging purposes
        console.error("Error calling adjutorApi.checkCustomerKarma:", error);
        throw new Error("Unable to Create User , try again ");
      }
    }

    return false; // No blacklisting record found for any endpoint
  }
}

export default new AdjutorApi();
