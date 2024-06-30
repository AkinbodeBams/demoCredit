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

        if (response.ok) {
          return true;
        }

        if (response.status === 404) {
          continue;
        }
      } catch (error) {
        console.error("Error calling adjutorApi.checkCustomerKarma:", error);
        throw new Error("Unable to Create User , try again ");
      }
    }

    return false;
  }
}

export default new AdjutorApi();
