document.addEventListener("DOMContentLoaded", () => {
    const monsterList = document.getElementById("monster-list");
    const loadMoreButton = document.getElementById("load-more-btn");
    const createMonsterForm = document.getElementById("create-monster-form");
  
    let currentPage = 1; // To keep track of the current page of monsters
  
    // Function to fetch and display monsters
    function fetchMonsters(page = 1) {
      fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          // Clear the previous list before rendering new ones
          if (page === 1) {
            monsterList.innerHTML = ''; // Clear for the first page load
          }
  
          monsters.forEach(monster => {
            const monsterDiv = document.createElement("div");
            monsterDiv.classList.add("monster");
  
            const monsterName = document.createElement("h3");
            monsterName.textContent = monster.name;
  
            const monsterAge = document.createElement("p");
            monsterAge.textContent = `Age: ${monster.age}`;
  
            const monsterDescription = document.createElement("p");
            monsterDescription.textContent = `Description: ${monster.description}`;
  
            monsterDiv.append(monsterName, monsterAge, monsterDescription);
            monsterList.appendChild(monsterDiv);
          });
        })
        .catch(error => console.error("Error fetching monsters:", error));
    }
  
    // Function to create a new monster
    function createMonster(event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
  
      const newMonster = {
        name,
        age: parseFloat(age),
        description,
      };
  
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newMonster),
      })
        .then(response => response.json())
        .then(monster => {
          // Clear the form after submitting
          createMonsterForm.reset();
          // Add the new monster to the list (first page)
          fetchMonsters(1);
        })
        .catch(error => console.error("Error creating monster:", error));
    }
  
    // Event listener for the "Create Monster" form
    createMonsterForm.addEventListener("submit", createMonster);
  
    // Event listener for the "Load More Monsters" button
    loadMoreButton.addEventListener("click", () => {
      currentPage += 1;
      fetchMonsters(currentPage);
    });
  
    // Initial fetch to load the first 50 monsters when the page loads
    fetchMonsters();
  });
  