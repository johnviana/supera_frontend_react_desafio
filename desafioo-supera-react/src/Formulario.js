import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';

function Formulario () {
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [operador, setOperador] = useState('');
    const [transferencias, setTransferencias] = useState([]);
    const [saldoTotal, setSaldoTotal] = useState(0);
    const [saldoPorPeriodo, setSaldoPorPeriodo] = useState(0);

}
export default Formulario;