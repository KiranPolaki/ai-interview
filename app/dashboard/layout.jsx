import Header from "./_components/Header";
function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36 py-6">{children}</div>
    </div>
  );
}

export default DashboardLayout;
