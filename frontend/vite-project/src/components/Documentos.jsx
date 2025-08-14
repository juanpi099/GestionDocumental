// Documentos.jsx
import React, { useState } from 'react';
import './Documentos.css';

function Documentos() {
  const [documentos, setDocumentos] = useState([
    {
      id: 1,
      titulo: 'Manual de Usuario',
      autor: 'Juan Pérez',
      tipo: 'Manual de operación',
      fecha: '2023-11-01',
      archivo: { name: 'manual_usuario.pdf' },
    },
    {
      id: 2,
      titulo: 'Informe Técnico',
      autor: 'Ana López',
      tipo: 'Informe técnico',
      fecha: '2023-10-15',
      archivo: { name: 'informe_tecnico.docx' },
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [documentoEditado, setDocumentoEditado] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [tipo, setTipo] = useState('Carta de no conformidad');
  const [fecha, setFecha] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const tiposOpciones = [
    'Carta de no conformidad',
    'Informe técnico',
    'Manual de operación',
    'Registro de mantenimiento',
    'Solicitud de servicio',
  ];

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje('Por favor, adjunte un archivo.');
      return;
    }

    if (documentoEditado) {
      setDocumentos((prevDocumentos) =>
        prevDocumentos.map((doc) =>
          doc.id === documentoEditado.id
            ? { ...doc, titulo, autor, tipo, fecha, archivo }
            : doc
        )
      );
      setMensaje('Documento actualizado exitosamente');
    } else {
      const nuevoDocumento = {
        id: documentos.length + 1,
        titulo,
        autor,
        tipo,
        fecha,
        archivo,
      };
      setDocumentos((prevDocumentos) => [...prevDocumentos, nuevoDocumento]);
      setMensaje('Documento registrado exitosamente');
    }

    limpiarFormulario();
  };

  const manejarEliminar = (id) => {
    setDocumentos((prevDocumentos) =>
      prevDocumentos.filter((documento) => documento.id !== id)
    );
    setMensaje('Documento eliminado exitosamente');
  };

  const manejarEdicion = (documento) => {
    setDocumentoEditado(documento);
    setTitulo(documento.titulo);
    setAutor(documento.autor);
    setTipo(documento.tipo);
    setFecha(documento.fecha);
    setArchivo(documento.archivo);
    setMostrarFormulario(true);
  };

  const limpiarFormulario = () => {
    setDocumentoEditado(null);
    setTitulo('');
    setAutor('');
    setTipo('Carta de no conformidad');
    setFecha('');
    setArchivo(null);
    setMostrarFormulario(false);
  };

  const manejarArchivo = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
  };

  return (
    <div className="documentos-container">
      <h2 className="documentos-header">Gestión de Documentos</h2>
      {mensaje && <p className="documentos-mensaje">{mensaje}</p>}

      {!mostrarFormulario && (
        <button
          onClick={() => setMostrarFormulario(true)}
          className="btn-abrir-formulario"
        >
          Registrar Documento
        </button>
      )}

      {mostrarFormulario && (
        <form onSubmit={manejarEnvio} className="documentos-form">
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label>Autor:</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />

          <label>Tipo:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {tiposOpciones.map((opcion, idx) => (
              <option key={idx} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>

          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <label>Archivo:</label>
          <input
            type="file"
            onChange={manejarArchivo}
            accept=".pdf,.docx,.txt,.png,.jpg"
            required
          />

          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              {documentoEditado ? 'Guardar Cambios' : 'Registrar'}
            </button>
            <button
              type="button"
              onClick={limpiarFormulario}
              className="btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <table className="documentos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.titulo}</td>
              <td>{doc.autor}</td>
              <td>{doc.tipo}</td>
              <td>{doc.fecha}</td>
              <td>{doc.archivo?.name}</td>
              <td>
                <button
                  onClick={() => manejarEdicion(doc)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => manejarEliminar(doc.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Documentos;
