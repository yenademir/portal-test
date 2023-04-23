const API_URL = "http://localhost:3001";

export const createWork = async (workData) => {
  const response = await fetch(`${API_URL}/works`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workData),
  });

  if (!response.ok) {
    throw new Error(`Error creating work: ${response.statusText}`);
  }

  return await response.json();
};

export const createWorkStep = async (workStepData) => {
  const response = await fetch(`${API_URL}/worksteps`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(workStepData),
    });
  
    if (!response.ok) {
      throw new Error(`Error creating workstep: ${response.statusText}`);
    }
  
    return await response.json();
  };

export const getWorkById = async (work_id) => {
    const response = await fetch(`${API_URL}/works/${work_id}`);
    const data = await response.json();
    return data;
  };

export const getProductById = async (product_id) => {
    const response = await fetch(`${API_URL}/products/${product_id}`);
    const data = await response.json();
    return data;
  };

  export const postQRQuestions = async (qrQuestionData) => {
    const response = await fetch(`${API_URL}/qr_questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(qrQuestionData),
    });
  
    if (!response.ok) {
      throw new Error(`Error posting QR question data: ${response.statusText}`);
    }
  
    return await response.json();
  };

  export const updateWorkStepStatus = async (step_id, status) => {
    const response = await fetch(`${API_URL}/worksteps/${step_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
  
    if (!response.ok) {
      throw new Error(`Error updating work step status: ${response.statusText}`);
    }
  
    return await response.json();
  };

  export const getQRQuestionsByWorkId = async (work_id) => {
    const response = await fetch(`${API_URL}/qr_questions/work/${work_id}`);
  
    if (!response.ok) {
      throw new Error(`Error fetching QR questions by work id: ${response.statusText}`);
    }
  
    return await response.json();
  };

  export const updateQRQuestion = async (id, updateData) => {
    const response = await fetch(`${API_URL}/qr_questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
  
    if (!response.ok) {
      throw new Error(`Error updating QR question: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getVendors = async () => {
    const response = await fetch(`${API_URL}/vendors`);
  
    if (!response.ok) {
      throw new Error(`Error fetching vendors: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`);
  
    if (!response.ok) {
      throw new Error(`Error fetching customers: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getUsers = async () => {
    const response = await fetch(`${API_URL}/api/allusers`);
  
    if (!response.ok) {
      throw new Error(`Error fetching all users: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
  
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
  
    return await response.json();
  }; 