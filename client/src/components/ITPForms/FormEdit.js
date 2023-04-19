import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById } from './formapi';

const segments = [
  { name: 'Sub - Part Dimensiol', order: 1 },
  { name: 'Final Part Measurement', order: 2 },
  { name: 'Paint Report', order: 3 },
  { name: 'Qoating Report', order: 4 },
  { name: 'Product Packing Standart', order: 5 },
  { name: 'Loading Check', order: 6 },
];

const FormEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [activeSegment, setActiveSegment] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await getFormById(id);
        setForm(formData);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchData();
  }, [id]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (form) {
      const finalPartMeasurementStep = form.steps.find(
        (step) => step.name === 'Final Part Measurement'
      );

      if (finalPartMeasurementStep) {
        setRows(finalPartMeasurementStep.substeps);
      }
    }
  }, [form]);

  const addRow = () => {
    const newRow = {
      id: `new-${Date.now()}`,
      name: '',
      technical_drawing_numbering: '',
      tools: '',
      description: '',
      actual_dimension: '',
      lower_tolerance: '',
      upper_tolerance: '',
    };
    setRows([...rows, newRow]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e, rowId) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      handleFileUpload(file, rowId);
    } else {
      alert('Lütfen sadece PNG veya JPEG dosyaları yükleyin.');
    }
  };

  const handleFileUpload = (e, rowId) => {
    const file = e.target.files[0];
    console.log(`File uploaded for row: ${rowId}`);
    console.log('File:', file);
  };
  
  const handleSegmentClick = (order) => {
    setActiveSegment(order);
  };

  const renderSegmentContent = () => {
    switch (activeSegment) {
      case 1:
        return renderSubPartDimensiol();
      case 2:
        return renderFinalPartMeasurement();
      case 3:
        return renderPaintReport();
      case 4:
        return renderQoatingReport();
      default:
        return null;
    }
  };

  const renderSubPartDimensiol = () => {
    return (
      <div>
        {form.steps[0].substeps.map((substep) => (
          <div key={substep.id}>
            <h3>{substep.name}</h3>
            <p>{substep.description}</p>
            <p>{`Actual dimension: ${substep.actual_dimension}`}</p>
            <p>{`Tolerances: ${substep.lower_tolerance}-${substep.upper_tolerance}`}</p>
            <img src={substep.example_visual_url} alt={substep.name} />
          </div>
        ))}
      </div>
    );
  };

  const renderFinalPartMeasurement = () => {
    if (!form) return null;
  
    return (
      <div>
        <table className="measurement-table">
          <thead>
            <tr>
              <th>İsim</th>
              <th>Teknik Çizim Numarası</th>
              <th>Kullanılan Aletler</th>
              <th>Açıklama</th>
              <th>Gerçek Boyut</th>
              <th>Alt Tolerans</th>
              <th>Üst Tolerans</th>
              <th>Example Visual</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
                <td>
                  <input type="text" value={row.name} />
                </td>
                <td>
                  <input type="text" value={row.technical_drawing_numbering} />
                </td>
                <td>
                  <input type="text" value={row.tools} />
                </td>
                <td>
                  <input type="text" value={row.description} />
                </td>
                <td>
                  <input type="text" value={row.actual_dimension} />
                </td>
                <td>
                  <input type="text" value={row.lower_tolerance} />
                </td>
                <td>
                  <input type="text" value={row.upper_tolerance} />
                </td>
                <td>
                <div
                  className="dropzone"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, row.id)}
                >
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleFileUpload(e.target.files[0], row.id)}
                  />
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow}>Satır Ekle</button>
      </div>
    );
  };

  
  const renderPaintReport = () => {
    return (
      <div>
        {form.steps[2].substeps.map((substep) => (
          <div key={substep.id}>
            <h3>{substep.name}</h3>
            <p>{substep.description}</p>
            <p>{`Actual dimension: ${substep.actual_dimension}`}</p>
            <p>{`Tolerances: ${substep.lower_tolerance}-${substep.upper_tolerance}`}</p>
            <img src={substep.example_visual_url} alt={substep.name} />
          </div>
        ))}
      </div>
    );
  };
  
  const renderQoatingReport = () => {
    return (
      <div>
        {form.steps[3].substeps.map((substep) => (
          <div key={substep.id}>
            <h3>{substep.name}</h3>
            <p>{substep.description}</p>
            <p>{`Actual dimension: ${substep.actual_dimension}`}</p>
            <p>{`Tolerances: ${substep.lower_tolerance}-${substep.upper_tolerance}`}</p>
            <img src={substep.example_visual_url} alt={substep.name} />
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h1>ITP Formu</h1>
      {form ? (
        <div>
          <h2>Product Name: {form.product_name || form.product?.name}</h2>
          <h2>Vendor Name: {form.vendor_name || form.vendor?.name}</h2>
            <div className="segments">
                {segments.map((segment) => (
                <button
                    key={segment.order}
                    onClick={() => handleSegmentClick(segment.order)}
                    className={activeSegment === segment.order ? 'active' : ''}
                >
                    {segment.name}
                </button>
                ))}
            </div>
            <div className="segment-content">{renderSegmentContent()}</div>
        </div>
      ) : (
        <p>Form yükleniyor...</p>
      )}
    </div>
  );
};

export default FormEdit;