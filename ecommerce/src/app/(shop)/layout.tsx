import Header from "@/components/header/Header";

export default function ShopLayout({ children }: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen overflow-x-hidden">
        <Header />
        { children }
    </main>
  );
}