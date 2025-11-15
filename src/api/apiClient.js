const apiClient = {
  loadPeople: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: "Sabal", email: "sabaladhikari@email.com", department: "BCA", course: "Advance Dot Net" },
          { name: "Shrijan", email: "srijan@email.com", department: "CSIT", course: "AI" },
        ]);
      }, 500);
    });
  },


};

export default apiClient;
