import { renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import useGetTheme from "../../Hooks/useGetTheme";
import { setTheme } from "../../store/appConfigSlice";
// Mocking the dispatch function and localStorage
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("useGetTheme", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock); // Return the mocked dispatch

    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should dispatch setTheme with the value from localStorage (dark)", () => {
    // Mock the localStorage value to return 'dark'
    localStorage.getItem.mockReturnValueOnce("dark");

    // Render the hook
    renderHook(() => useGetTheme());

    // Check if dispatch was called with the expected action
    expect(dispatchMock).toHaveBeenCalledWith(setTheme("dark"));
  });

  it('should dispatch setTheme with "light" if localStorage is null', () => {
    // Mock the localStorage value to return null
    localStorage.getItem.mockReturnValueOnce(null);

    // Render the hook
    renderHook(() => useGetTheme());

    // Check if dispatch was called with the default theme "light"
    expect(dispatchMock).toHaveBeenCalledWith(setTheme("light"));
  });
});
