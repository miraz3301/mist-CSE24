fetch("students.json")
    .then(res => res.json())
    .then(students => {
        const grid = document.querySelector(".grid");

        students.forEach(s => {
            const card = `
            <div class="card">
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
            </div>
            `;

            grid.innerHTML += card;
        });
    });
