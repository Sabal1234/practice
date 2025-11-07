const apiClient = {
  loadPeople: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: "Sabal", email: "sabaladhikari@email.com", department: "Computer Science", course: "CS101" },
          { name: "Shrijan", email: "srijan@email.com", department: "Math", course: "MT101" },
        ]);
      }, 500);
    });
  },

  savePeople: (people) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(people);
      }, 500);
    });
  },
};

export default apiClient;
