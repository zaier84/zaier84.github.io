import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }) {
  return (
    <div className="bg-bg-primary text-text-primary min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
