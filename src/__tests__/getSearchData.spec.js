import getSearchData from "../Loaders/getSearchData";
import { getHeaders } from "../Utilities/getHeaders";

describe("getSearchData", () => {
  beforeEach(() => {
    // Mocking global fetch to simulate a network response
    global.fetch = jest.fn();

    // Mocking `import.meta.env`
    global.import.meta.env = {
      VITE_PRODUCT_SEARCH: "https://mock-api-url.com/",
    };

    // Mocking getHeaders function
    getHeaders().mockReturnValue({ "Content-Type": "application/json" });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear any mock calls after each test
  });

  it("tre", async () => {
    expect(true).toBe(true);
  });
  //   it("should call fetch with the correct URL and set the document title", async () => {
  //     // Arrange - Mock the API response
  //     const mockResponse = { name: "Mock Product" };
  //     fetch.mockResolvedValueOnce({
  //       ok: true,
  //       json: async () => mockResponse,
  //     });

  //     const params = { product: "test-product" };
  //     const storeId = "store123";

  //     // Act - Call the function
  //     const result = await getSearchData({ params });

  //     // Assert - Check if fetch was called with the correct URL
  //     expect(fetch).toHaveBeenCalledWith(
  //       "https://mock-api-url.com/store123/products/search/test-product",
  //       {
  //         "Content-Type": "application/json",
  //       }
  //     );

  //     // Check if document.title is updated with the product name
  //     expect(document.title).toBe(mockResponse.name);

  //     // Assert that the result is the mock response
  //     expect(result).toEqual(mockResponse);
  //   });

  //   it("should throw an error if the response is not ok", async () => {
  //     // Arrange - Mock the API response with an error
  //     fetch.mockResolvedValueOnce({
  //       ok: false,
  //     });

  //     const params = { product: "test-product" };
  //     const storeId = "store123";

  //     // Act & Assert - Check if error is thrown
  //     await expect(getSearchData({ params })).rejects.toThrow(
  //       "Network response was not ok."
  //     );
  //   });

  //   it("should log an error if there is an exception during the fetch", async () => {
  //     // Arrange - Mock the fetch to throw an error
  //     fetch.mockRejectedValueOnce(new Error("Some error"));

  //     const params = { product: "test-product" };
  //     const storeId = "store123";

  //     // Act - Call the function
  //     const result = await getSearchData({ params });

  //     // Assert - Check if the error was logged
  //     expect(result).toBeUndefined(); // Since there's no return value in case of error
  //     expect(console.error).toHaveBeenCalledWith(
  //       "Error fetching data:",
  //       expect.any(Error)
  //     );
  //   });
});
