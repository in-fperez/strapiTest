/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useCallback, useEffect } from 'react';
import './App.css';
import calculationsRequest from '../../../api/calculations';
import freeCodeCampLogo from '../../imagenes/freecodecamp-logo.png';
import Boton from '../../components/Boton/Boton';
import Pantalla from '../../components/Pantalla/Pantalla';
import BotonClear from '../../components/BotonClear/BotonClear';
import { useState } from 'react';
import { evaluate } from 'mathjs';


const App = () => {
  const [input, setInput] = useState('');
  const [calculations, setCalculations] = useState(null);

  useEffect(() => {
      calculationsRequest.getCalculations().then(res => {
        setCalculations(res.data);
      });
  }, [setCalculations]);

  const agregarInput = val => {
    setInput(input + val);
  };

  const calcularResultado = () => {
    if (input) {
      setInput(evaluate(input));
    } else {
      alert("Por favor ingrese valores para realizar los cálculos.");
    }
  };

  return (
    <div className='App'>
      <div className='freecodecamp-logo-contenedor'>
        <img 
          src={freeCodeCampLogo}
          className='freecodecamp-logo'
          alt='Logo de freeCodeCamp' />
      </div>
      {calculations?.roles.some((rol) => rol.code === 'strapi-super-admin') && <div className='contenedor-calculadora' style={{backgroundColor: 'green'}}>Eres admin y puedes ver esto</div>}
      <div className='contenedor-calculadora'>
        <Pantalla input={input}/>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarInput}>+</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarInput}>-</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarInput}>*</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarInput}>/</Boton>
        </div>
        <div className='fila'>
          <BotonClear manejarClear={() => setInput('')}>
            Clear
          </BotonClear>
        </div>
      </div>
    </div>
  );
};

export default App;
