document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("nameInput");
    const saveNameBtn = document.getElementById("saveNameBtn");
    const displayName = document.getElementById("displayName");
  
    function saveName() {
      const name = nameInput.value.trim();
      if (name) {
        localStorage.setItem("userName", name);
        displaySavedName();
      }
    }
  
    function displaySavedName() {
      const savedName = localStorage.getItem("userName");
      displayName.textContent = savedName ? `Ваше имя: ${savedName}` : "";
    }
  
    saveNameBtn.addEventListener("click", saveName);
  
    displaySavedName();
  });
  