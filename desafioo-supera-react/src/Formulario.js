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

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/transferencias';
    
        const params = {};
        
        if (dataInicio) {
          const dataInicioFormatada = moment(dataInicio, 'DD/MM/YYYY').format('YYYY-MM-DD');
          params.startDate = dataInicioFormatada;
        }
        if (dataFim) {
          const dataFimFormatada = moment(dataFim, 'DD/MM/YYYY').format('YYYY-MM-DD');
          params.endDate = dataFimFormatada;
        }
        if (operador) {
          params.nomeOperadorTransacao = operador;
        }
    
        try {
          const response = await axios.get(url, { params });
          const data = response.data.map(transferencia => {
            const { dataTransferencia } = transferencia;
            const dataTransferenciaFormatada = moment(dataTransferencia).format('DD/MM/YYYY');
            return { ...transferencia, dataTransferencia: dataTransferenciaFormatada };
          });
          setTransferencias(data);
        } catch (error) {
          console.error(error);
        }
      };

}
export default Formulario;