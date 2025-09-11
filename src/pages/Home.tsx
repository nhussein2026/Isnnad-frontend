import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <section className="py-12">
          <h1 className="text-3xl font-bold mb-3">Welcome to Isnnad</h1>
          <p>Short landing intro...</p>
        </section>

        <section id="about" className="py-12">
          <h2 className="text-2xl font-semibold mb-2">About</h2>
          <p>About us content...</p>
        </section>

        <section id="contact" className="py-12 bg-gray-50 rounded p-6">
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p>Email: contact@example.com</p>
        </section>

      </main>
    </>
  );
}
