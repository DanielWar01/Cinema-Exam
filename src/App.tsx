import { useState } from 'react';
import './App.css'

function App() {
  const [seats, setSeats] = useState(
    Array(5).fill(null).map(() => Array(10).fill(false)) // 5 rows, 10 seats per row
  );

  const toggleSeat = (rowIndex, seatIndex) => {
    const newSeats = seats.map((row, rIndex) =>
      row.map((seat, sIndex) =>
        rIndex === rowIndex && sIndex === seatIndex ? !seat : seat
      )
    );
    setSeats(newSeats);
  };

  const handleReport = () => {
    const totalSeats = seats.flat().length;
    const bookedSeats = seats.flat().filter(seat => seat).length;
    const totalSales = bookedSeats * 10; // Assuming $10 per seat
    const occupancyRate = ((bookedSeats / totalSeats) * 100).toFixed(2);

    alert(`Reporte:\n- Boletas Vendidas: ${bookedSeats}\n- Total Ventas: $${totalSales}\n- Porcentaje de Ocupación: ${occupancyRate}%`);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif'}}>
      <header className='header' style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>CineMax - Sistema de Reservas</h1>
        <p>Selecciona tus asientos y genera un reporte.</p>
      </header>

      <section style={{
        minHeight: '70vh',
      }}>
        <h2 className='main-title'>Selección de Sillas</h2>
        <div style={{ display: 'grid', gap: '10px', justifyContent: 'center' }}>
          {seats.map((row, rowIndex) => (
            <div style={{ display: 'flex', gap: '5px' }} key={rowIndex}>
              {row.map((seat, seatIndex) => (
                <button
                  key={seatIndex}
                  onClick={() => toggleSeat(rowIndex, seatIndex)}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: seat ? 'green' : 'gray',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                ></button>
              ))}
            </div>
          ))}
        </div>
        <section style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={handleReport}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Generar Reporte
          </button>
        </section>
      </section>


      <footer>
        <p>Universidad Pedagógica y Tecnológica de Colombia</p>
        <p>Electiva II - Evaluación en Grupo</p>
        <p>Fecha: 10 de Diciembre de 2024</p>
      </footer>
    </div>
  );
}

export default App;