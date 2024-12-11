import React, { useState } from 'react';

type Report = {
  bookedSeats: number;
  totalSales: number;
  occupancyRate: string;
};

function App() {
  const [seats, setSeats] = useState(
    Array(5).fill(null).map(() => Array(10).fill(false))
  );
  const [soldSeats, setSoldSeats] = useState(
    Array(5).fill(null).map(() => Array(10).fill(false))
  );
  const [report, setReport] = useState<Report | null>(null);

  const sellSeat = (rowIndex: number, seatIndex: number) => {
    if (soldSeats[rowIndex][seatIndex]) {
      alert('Esta silla ya ha sido vendida.');
      return;
    }

    const newSoldSeats = soldSeats.map((row, rIndex) =>
      row.map((seat, sIndex) =>
        rIndex === rowIndex && sIndex === seatIndex ? true : seat
      )
    );
    setSoldSeats(newSoldSeats);

    alert(`La silla en la fila ${rowIndex + 1}, columna ${seatIndex + 1} ha sido vendida.`);
  };

  const handleReport = () => {
    const totalSeats = seats.flat().length;
    const bookedSeats = soldSeats.flat().filter(seat => seat).length;
    const totalSales = bookedSeats * 10;
    const occupancyRate = ((bookedSeats / totalSeats) * 100).toFixed(2);

    setReport({
      bookedSeats,
      totalSales,
      occupancyRate,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            🎬 CineMax - Sistema de Reservas
          </h1>
          <p className="mt-2 text-blue-100">Selecciona tus asientos y vende las boletas</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center mb-6 text-blue-800">
            Selección de Sillas
          </h2>
          
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center text-gray-600">Pantalla</div>
            <div className="w-full h-2 bg-gray-300 mb-6 rounded-full"></div>
            
            <div className="grid grid-cols-10 gap-2 mb-6">
              {seats.map((row, rowIndex) => (
                row.map((seat, seatIndex) => (
                  <button
                    key={`${rowIndex}-${seatIndex}`}
                    onClick={() => sellSeat(rowIndex, seatIndex)}
                    className={`
                      w-10 h-10 rounded-md transition-all duration-300
                      ${soldSeats[rowIndex][seatIndex] 
                        ? 'bg-red-500 cursor-not-allowed opacity-70' 
                        : 'bg-blue-400 hover:bg-blue-500 cursor-pointer'}
                      flex items-center justify-center
                      shadow-md
                    `}
                    disabled={soldSeats[rowIndex][seatIndex]}
                  >
                    {soldSeats[rowIndex][seatIndex] ? '✖' : `${rowIndex + 1}-${seatIndex + 1}`}
                  </button>
                ))
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleReport}
                className="
                  bg-blue-600 text-white px-6 py-3 rounded-lg 
                  hover:bg-blue-700 transition-colors duration-300 
                  flex items-center gap-2 font-semibold shadow-md
                "
              >
                Generar Reporte
              </button>
            </div>
          </div>

          {report && (
            <div className="mt-8 bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Reporte de Ventas</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600">Boletas Vendidas</p>
                  <p className="text-2xl font-bold text-blue-700">{report.bookedSeats}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Ventas</p>
                  <p className="text-2xl font-bold text-green-700">${report.totalSales}</p>
                </div>
                <div>
                  <p className="text-gray-600">% Ocupación</p>
                  <p className="text-2xl font-bold text-purple-700">{report.occupancyRate}%</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-4 text-center">
        <p>Universidad Pedagógica y Tecnológica de Colombia</p>
        <p className="text-sm text-blue-200">Electiva II - Evaluación en Grupo</p>
        <p className="text-xs text-blue-300">Fecha: 10 de Diciembre de 2024</p>
      </footer>
    </div>
  );
}

export default App;