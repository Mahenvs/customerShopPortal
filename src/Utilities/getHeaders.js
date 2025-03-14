const username = "user";
const password = "market";
const basicAuthToken1 = btoa(`${username}:${password}`);
export const basicAuthToken = btoa(
  `${import.meta.env.VITE_USER}:${import.meta.env.VITE_PASSWORD}`
);

export function getHeaders() {
  return {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicAuthToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
}

export function getPostHeaders(body) {
  return {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuthToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export const header = () => {
  return {
    Authorization: "Basic " + basicAuthToken,
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  };
};

export const headers = () => {
  return {
    headers: {
      Authorization: `Basic ${basicAuthToken}`,
      "Content-Type": "application/json",
    },
  };
};
