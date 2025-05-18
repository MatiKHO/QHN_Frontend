
import { Navbar } from "@/components/navbar";

 const DefaultLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
     
    </div>
  );
}

export default DefaultLayout;
