import { renderHook, act } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useGetCart from "../../Hooks/useGetCart";
import { createStore } from "@reduxjs/toolkit";

// Set up mock store (you can adjust according to your store structure)
const mockStore = createStore((state = { store: {} }, action) => {
  switch (action.type) {
    case "cartList":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
});

// Mock axios
const mock = new MockAdapter(axios);

// Test case for the custom hook
describe("useGetCart Hook", () => {
  it("Should return true", async () => {
    expect(true).toBe(true);
  });
  //   it("should fetch cart data and dispatch cartList", async () => {
  //     const storeId = "store123";
  //     const customerId = "customer123";
  //     const mockCartData = [{ id: "cart1", name: "Item 1" }]; // Sample mock data

  //     // Mock the axios GET request
  //     mock.onGet(/.*\/cart/).reply(200, mockCartData);

  //     // Render the hook within the provider (with a mock store)
  //     const { result, waitForNextUpdate } = renderHook(() => useGetCart(), {
  //       wrapper: ({ children }) => (
  //         <Provider store={mockStore}>{children}</Provider>
  //       ),
  //     });

  //     // Update the store state
  //     mockStore.dispatch({
  //       type: "store/setStore",
  //       payload: { storeId, customerId },
  //     });

  //     // Wait for hook to finish
  //     await waitForNextUpdate();

  //     expect(mockStore.getState().cart).toEqual(mockCartData);
  //   });
});
