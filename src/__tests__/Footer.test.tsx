import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer Component", () => {
  test("renders About section text", () => {
    render(<Footer />);
    const aboutText = screen.getByText(/discover top-rated movies/i);
    expect(aboutText).toBeInTheDocument();
  });

  test("renders Categories section with all items", () => {
    render(<Footer />);
    const categories = ["Movies", "TV Series", "Drama", "Documentaries"];
    categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test("renders Support section with all items", () => {
    render(<Footer />);
    const supportItems = ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"];
    supportItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Movie Explorer. All rights reserved.`)).toBeInTheDocument();
  });
  test('renders main footer heading', () => {
  render(<Footer />);
  expect(screen.getByText("🎬 Movie Explorer")).toBeInTheDocument();
});
test('renders section headings', () => {
  render(<Footer />);
  expect(screen.getByText("Categories")).toBeInTheDocument();
  expect(screen.getByText("Support")).toBeInTheDocument();
});
test('renders category links as anchor elements', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: /movies/i })).toBeInTheDocument();
});
test('footer has correct class styling', () => {
  render(<Footer />);
  const footer = screen.getByRole('contentinfo'); 
  expect(footer).toHaveClass('bg-black', 'text-gray-400', 'px-6', 'py-16');
});

});
