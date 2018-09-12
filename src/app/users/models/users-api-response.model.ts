/**
 * Simplified api interface for randomusers.me responses
 *
 * @export
 * @interface UsersApiResponse
 */
export interface UsersApiResponse {
  results: UserApiResponseResult[];
  info: {
    seed: string;
  };
}

export interface UserApiResponseResult {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  email: string;
  phone: string;
  login: {
    uuid: string;
  };
}
