const apiClient = (dept) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (dept === 'cs') resolve([{ id: 'cs101', name: 'Intro to CS' }, { id: 'cs102', name: 'Data Structures' }]);
      else if (dept === 'math') resolve([{ id: 'math101', name: 'Calculus I' }, { id: 'math102', name: 'Linear Algebra' }]);
      else resolve([]);
    }, 500);
  });
};

export default apiClient; 
