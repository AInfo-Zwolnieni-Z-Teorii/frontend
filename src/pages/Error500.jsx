const Error500 = () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
        <h1 className="text-6xl font-bold text-red-500">500</h1>
        <p className="mt-4 text-xl text-gray-700">Wystąpił błąd serwera.</p>
        <a href="/" className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
          Powrót do strony głównej
        </a>
      </div>
    );
  };
  
  export default Error500;