import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createWork,
  createWorkStep,
  getVendors,
  getCustomers,
  getUsers,
  getProducts,
  createWorkProduct,
} from './worksapi';
import './CreateWorkOrder.css';
import Select from 'react-select';

const CreateWorkOrder = () => {
  const navigate = useNavigate();
  const [workData, setWorkData] = useState({
    order_number: '',
    project_number: '',
    vendor_id: '',
    customer_id: '',
    quality_responsible_id: '',
    inspector_id: null,
    foreman_id: null,
    work_type: 'Order',
    state: '',
    status: '',
    creator_name: null,
    creation_date: new Date().toISOString(),
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [qualityResponsibles, setQualityResponsibles] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [foremen, setForemen] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchVendors();
    fetchCustomers();
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await getVendors(); // Adjust this with your API call
      setVendors(response.data);
    } catch (error) {
      // console.error('Error fetching vendors:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers(); // Adjust this with your API call
      setCustomers(response.data);
    } catch (error) {
      // console.error('Error fetching customers:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers(); // Adjust this with your API call
      const qualityRes = response.data.filter(
        user => user.role === 'Quality Responsible'
      );
      const inspectorRes = response.data.filter(
        user => user.role === 'Inspector'
      );
      const foremanRes = response.data.filter(user => user.role === 'Foreman');
      setQualityResponsibles(qualityRes);
      setInspectors(inspectorRes);
      setForemen(foremanRes);
    } catch (error) {
      // console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts(); // Adjust this with your API call
      setProducts(response.data);
    } catch (error) {
      // console.error('Error fetching products:', error);
    }
  };

  const handleProductChange = selectedOptions => {
    if (selectedOptions) {
      const selectedProducts = selectedOptions.map(option => {
        const productId = Number(option.value); // Geçerli bir sayıya dönüştürme
        return productId;
      });
      setSelectedProducts(selectedProducts);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleChange = e => {
    setWorkData({ ...workData, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const createdWork = await createWork(workData);
      const workStepData = {
        work_id: createdWork.work.id,
        step_name: 'New Work',
        timestamp: new Date().toISOString(),
        state: 'New Work',
        status: 'Open',
      };
      const createdWorkStep = await createWorkStep(workStepData);

      for (const productId of selectedProducts) {
        await createWorkProduct({
          work_id: createdWork.work.id,
          product_id: productId,
        });
      }
      navigate(`/workorders`);
    } catch (error) {
      // console.error('Error creating work and workstep:', error);
    }
  };

  return (
    <div className="create-work-order">
      <h1>Create Work Order</h1>
      <form onSubmit={handleSave}>
        <div className="cwo-form-group">
          <label htmlFor="order_number">Order Number</label>
          <input
            type="text"
            name="order_number"
            id="order_number"
            className="cwo-form-control"
            value={workData.order_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="cwo-form-group">
          <label htmlFor="project_number">Project Number</label>
          <input
            type="text"
            name="project_number"
            id="project_number"
            className="cwo-form-control"
            value={workData.project_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="cwo-form-group">
          <label htmlFor="vendor_id">Vendor</label>
          <select
            name="vendor_id"
            id="vendor_id"
            className="cwo-form-control"
            value={workData.vendor_id}
            onChange={handleChange}
          >
            <option value="">Select Vendor</option>
            {vendors.map(vendor => (
              <option key={vendor.odooid} value={vendor.odooid}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="cwo-form-group">
          <label htmlFor="customer_id">Customer</label>
          <select
            name="customer_id"
            id="customer_id"
            className="cwo-form-control"
            value={workData.customer_id}
            onChange={handleChange}
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer.odooid} value={customer.odooid}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="cwo-form-group">
          <label htmlFor="quality_responsible_id">Quality Responsible</label>
          <select
            name="quality_responsible_id"
            id="quality_responsible_id"
            className="cwo-form-control"
            value={workData.quality_responsible_id}
            onChange={handleChange}
          >
            <option value="">Select Quality Responsible</option>
            {qualityResponsibles.map(qr => (
              <option key={qr.id} value={qr.id}>
                {qr.name}
              </option>
            ))}
          </select>
        </div>
        <div className="cwo-form-group">
          <label htmlFor="inspector_id">Inspector</label>
          <select
            name="inspector_id"
            id="inspector_id"
            className="cwo-form-control"
            value={workData.inspector_id}
            onChange={handleChange}
          >
            <option value="">Select Inspector</option>
            {inspectors.map(inspector => (
              <option key={inspector.id} value={inspector.id}>
                {inspector.name}
              </option>
            ))}
          </select>
        </div>
        <div className="cwo-form-group">
          <label htmlFor="foreman_id">Foreman</label>
          <select
            name="foreman_id"
            id="foreman_id"
            className="cwo-form-control"
            value={workData.foreman_id}
            onChange={handleChange}
          >
            <option value="">Select Foreman</option>
            {foremen.map(foreman => (
              <option key={foreman.id} value={foreman.id}>
                {foreman.name}
              </option>
            ))}
          </select>
        </div>
        <div className="cwo-form-group">
          <label htmlFor="product_id">Product</label>

          <Select
            name="product_id"
            id="product_id"
            className="cwo-form-control"
            onChange={handleProductChange}
            options={products.map(product => ({
              value: product.odooid,
              label: product.name,
            }))}
            isMulti
            isSearchable
          />
        </div>
        <div className="cwo-form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            className="cwo-form-control"
            value={workData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="cwo-form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            id="status"
            className="cwo-form-control"
            value={workData.status}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="cwo-btn cwo-btn-primary">
          Save Work Order
        </button>
      </form>
    </div>
  );
};

export default CreateWorkOrder;
