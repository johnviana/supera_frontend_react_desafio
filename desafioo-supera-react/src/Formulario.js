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

      const calcularSaldos = (dadosTransferencias) => {
        let total = 0;
        let totalPorPeriodo = 0;
    
        for (let i = 0; i < dadosTransferencias.length; i++) {
          total += dadosTransferencias[i].valor;
        }
    
        setSaldoTotal(total);
        setSaldoPorPeriodo(totalPorPeriodo);
      };
      const renderTransferencias = () => {
        return transferencias.map(transferencia => (
          <tr key={transferencia.id}>
            <td>{transferencia.dataTransferencia}</td>
            <td>{transferencia.valor}</td>
            <td>{transferencia.tipo}</td>
            <td>{transferencia.nomeOperadorTransacao}</td>
          </tr>
        ));
      };

}
export default Formulario;