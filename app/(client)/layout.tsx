import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { CartProvider } from "./CartContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
    </CartProvider>
  );
}
