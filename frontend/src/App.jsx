function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-xl rounded-xl bg-white p-8 text-center shadow-md">
        <h1 className="text-3xl font-bold text-slate-900">
          Task Manager
        </h1>

        <p className="mt-3 text-slate-600">
          Frontend setup completed successfully.
        </p>

        <button
          type="button"
          className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Get Started
        </button>
      </section>
    </main>
  );
}

export default App;