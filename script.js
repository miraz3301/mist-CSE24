fetch("students.json")
    .then(res => res.json())
    .then(students => {

        const grid = document.querySelector(".grid");
        students.forEach(s => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="avatar">
                    <img src="${s.image}" alt="${s.name}">
                </div>

                <div class="name">${s.name}</div>
                <div class="role">${s.role}</div>
                <div class="tag">${s.section}</div>

                <div class="socials">
                    <a href="${s.facebook}" class="fb" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                    </a>

                    <a href="${s.linkedin}" class="linkedin" target="_blank">
                        <i class="fab fa-linkedin-in"></i>
                    </a>

                    <button onclick="copyPhone('${s.phone}')">
                        <i class="fas fa-phone"></i>
                    </button>
                </div>
            `;

            grid.appendChild(card);
        });

        
        const searchInput = document.querySelector(".search-bar input");

        searchInput.addEventListener("input", function () {
            const value = this.value.toLowerCase();
            const cards = document.querySelectorAll(".card");

            cards.forEach(card => {
                const name = card.querySelector(".name").textContent.toLowerCase();
                card.style.display = name.includes(value) ? "block" : "none";
            });
        });

    });
