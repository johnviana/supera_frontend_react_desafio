import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
      fetchData();
    }, []);
  

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/transferencias';
    
        const params = {};
       if (dataInicio) {
          const dataFimFormatada = moment(dataInicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
          params.dataTransferencia = dataFimFormatada;
        };
        if (dataFim) {
          const dataFimFormatada = moment(dataFim, 'DD/MM/YYYY').format('YYYY-MM-DD');
          params.dataTransferencia = dataFimFormatada;
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
          calcularSaldos(data);
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
      return (
        <div className="pesquisa-transferencias">
          <h2>Pesquisa de Transferências</h2>
          <div className="form-group">
            <label>Data de Início:</label>
            <input className="form-control" type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Data de Fim:</label>
            <input className="form-control" type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nome do Operador:</label>
            <input type="text" className="form-control" value={operador} onChange={e => setOperador(e.target.value)} />
          </div>
          <button className="pesquisa-button" onClick={fetchData}>Pesquisar</button>
    
          {transferencias.length > 0 ? (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Dados</th>
                    <th>Valências</th>
                    <th>Tipo</th>
                    <th>Nome do Operador</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTransferencias()}
                </tbody>
              </table>
    
              <div className="saldos">
                <p>Saldo Total: {saldoTotal}</p>
              </div>
            </div>
          ) : (
            <p className="no-results">Nenhum resultado encontrado.</p>
          )}
        </div>
      );
    };


export default Formulario;