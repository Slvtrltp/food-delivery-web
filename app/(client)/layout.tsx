import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { UserProvider } from "../user-provider";
import { CartProvider } from "./CartContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <UserProvider />
      <Header />
      {children}
      <Footer />
    </CartProvider>
  );
}
