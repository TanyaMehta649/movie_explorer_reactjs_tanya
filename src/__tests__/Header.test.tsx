import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";


const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

describe("Header Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderWithRouter = () => render(<Header />, { wrapper: BrowserRouter });

  test("renders default welcome message when no user is present", () => {
    renderWithRouter();
    expect(screen.getByText(/Welcome to Movie Explorer/i)).toBeInTheDocument();
  });






  test("logout clears localStorage and redirects", () => {
    setLocalStorage("user", { username: "Tanya" });
    localStorage.setItem("token", "123abc");

    renderWithRouter();
    fireEvent.click(screen.getByTitle("Profile"));
    fireEvent.click(screen.getByRole("button", { name: /Logout/i }));

    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  test("shows 'Add Movie' link for supervisor role", () => {
    setLocalStorage("user", { username: "Tanya", role: "supervisor" });
    renderWithRouter();
    expect(screen.getByText(/Add Movie/i)).toBeInTheDocument();
  });

  test("does not show 'Add Movie' link for regular user", () => {
    setLocalStorage("user", { username: "Tanya", role: "viewer" });
    renderWithRouter();
    expect(screen.queryByText(/Add Movie/i)).not.toBeInTheDocument();
  });

  test("renders navigation links", () => {
    renderWithRouter();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });
 
  
  

  
test("displays user email and role in dropdown", () => {
  setLocalStorage("user", {
    username: "Tanya",
    email: "tanya@example.com",
    role: "viewer"
  });

  renderWithRouter();
  fireEvent.click(screen.getByTitle("Profile"));

  expect(screen.getByText(/Email: tanya@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/Role: viewer/i)).toBeInTheDocument();
});
test("shows fallback values when user data is incomplete", () => {
  setLocalStorage("user", {});

  renderWithRouter();
  fireEvent.click(screen.getByTitle("Profile"));

  expect(screen.getByText(/Welcome, User/i)).toBeInTheDocument();
  expect(screen.getByText(/Email: user@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/Role: user/i)).toBeInTheDocument();
});

});
