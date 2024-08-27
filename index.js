document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://crudcrud.com/api/bb3a74ca3c674a0db6cb020e521469f5/students";
  const studentForm = document.getElementById("studentForm");
  const studentList = document.getElementById("studentList");
  const studentCountElement = document.querySelector("h2");

  
  function updateStudentCount() {
    const students = studentList.getElementsByTagName("li").length;
    studentCountElement.textContent = `All the Students: ${students}`;
  }


  function getStudents() {
    axios.get(apiUrl)
      .then(response => {
        const students = response.data;
        students.forEach(student => {
          displayStudentOnScreen(student);
        });
        updateStudentCount();  
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      });
  }

 
  getStudents();

 
  studentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const studentDetails = {
      studentName: event.target.studentName.value,
      mobile: event.target.mobile.value,
      address: event.target.address.value,
    };

    axios
      .post(apiUrl, studentDetails)
      .then((response) => {
        displayStudentOnScreen(response.data);
        saveToLocalStorage(response.data);
        updateStudentCount();  
      })
      .catch((error) => console.log(error));

  
    studentForm.reset();
  });

 
  function displayStudentOnScreen(studentDetails) {
    const studentItem = document.createElement("li");
    studentItem.appendChild(
      
    
      document.createTextNode(
        `${studentDetails.studentName} - ${studentDetails.mobile} - ${studentDetails.address}`
      )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    studentItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    studentItem.appendChild(editBtn);

    studentList.appendChild(studentItem);

   
    deleteBtn.addEventListener("click", function () {
      axios.delete(`${apiUrl}/${studentDetails._id}`)
        .then(() => {
          studentList.removeChild(studentItem);
          removeFromLocalStorage(studentDetails._id);
          updateStudentCount();  
        })
        .catch(error => {
          console.error("Error deleting student:", error);
        });
    });

   
    editBtn.addEventListener("click", function () {
     
      document.getElementById("studentName").value = studentDetails.studentName;
      document.getElementById("mobile").value = studentDetails.mobile;
      document.getElementById("address").value = studentDetails.address;

    axios.delete(`${apiUrl}/${studentDetails._id}`)
        .then(() => {
          studentList.removeChild(studentItem);
          removeFromLocalStorage(studentDetails._id);
          updateStudentCount(); 
        })
        .catch(error => {
          console.error("Error deleting student for edit:", error);
        });
    });
  }

  
  function saveToLocalStorage(student) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
  }


  function removeFromLocalStorage(studentId) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student._id !== studentId);
    localStorage.setItem("students", JSON.stringify(students));
  }
});
