import {useState, useEffect} from 'react';
import Header from './components/Header';
import Button from './components/Button';
import {formatDinero, calcularTotalPagar} from './helpers';

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);

    // calcular el pago mensual
    setPago(total / meses);
  }, [cantidad, meses, total])
  
  const MIN = 1000;
  const MAX = 20000;
  const STEP = 100;
  
  function handleChange(e) {
    setCantidad(+e.target.value);
  }
  function handleClickDecremento() {
    const valor = cantidad - STEP;

    if (valor < MIN) {
      alert('Monto no valido');
      return;
    }
    setCantidad(valor)
    
  }
  function handleClickIncremento() {
    const valor = cantidad + STEP;

    if (valor > MAX) {
      alert('Monto no valido');
      return;
    }
    setCantidad(valor)
    
  }
  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />
      <div className='flex justify-between my-6'>
        <Button 
          operador = "-"
          fn={handleClickDecremento}
        />

        <Button 
          operador = "+"
          fn={handleClickIncremento}
        />

      </div>
      <input 
        type="range"
        className='w-full h6  bg-gray-600 accent-lime-500 hover:accent-lime-600'
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>{formatDinero(cantidad)}</p>

      <h2 className='text-2xl font-extrabold to-gray-500 text-center'>
        Elige un <span className='text-indigo-600'>Plazo</span> a pagar
      </h2>

      <select 
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
        value={meses}
        onChange={e => setMeses(+e.target.value)}
      >
          <option value="6">6 meses</option>
          <option value="12">12 meses</option>
          <option value="24">24 meses</option>
      </select>

      <div className='my-5 space-y-3 bg-gray-50 p-5'>
        <h2 className='text-2xl font-extrabold to-gray-500 text-center'>
          Resumen <span className='text-indigo-600'>de pagos</span>
        </h2>
        <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatDinero(total)} Total a Pagar</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatDinero(pago)} Mensuales</p>
      </div>
      
    </div>

  )
}

export default App
