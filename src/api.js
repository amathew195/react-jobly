import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token;
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle.
   * Returns an object {description, handle, jobs(array), logoUrl, name, numEmployees}
   */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  /** Get all companies
   * Returns an array of companies - [{description, handle,logoUrl, name,
   * numEmployees}....]
   */
  static async getCompanies(data) {
    let res = await this.request("companies", data);
    return res.companies;
  }

  /** Get all jobs
   * Returns an array of jobs - [{companyHandle, companyName, equity, id, salary,
   * title}...]
   */
  static async getJobs(data) {
    let res = await this.request("jobs", data);
    return res.jobs;
  }

  /** Signup user  */
  static async authenticateSignUpAndGetToken(data) {
    let res = await this.request("auth/register", data, "POST");
    this.token = res.token;
    return res.token;
  }

  /** Login user
   * Returns token object: {token: "token"}
   */
  static async authenticateLoginAndGetToken(data) {
    let res = await this.request("auth/token", data, "POST");
    this.token = res.token;
    return res.token;
  }

  /** Get user details and returns object.
   * Accepts username and token.
   * Returns user object: {
   * username,
   * firstName,
   * lastName,
   * email,
   * isAdmin,
   * applications: []
   * }
   */
  static async getUserDetails(username, token) {
    this.token = token;
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Updates user details and returns object.
   * Returns user object:
   * {
   * username,
   * firstName,
   * lastName,
   * email,
   * isAdmin
   * }
   */

  static async editProfileAndGetUserDetails(username, data, token) {
    console.log("username in api editProfile", username);
    this.token = token;
    let res = await this.request(`users/${username}`, data, "PATCH");
    return res.user;
  }
}

export default JoblyApi;
