document.addEventListener('DOMContentLoaded', function() {
    const programs = JSON.parse(localStorage.getItem('programs')) || [];
    
    loadPrograms(programs, "anasayfa");
    
    document.querySelector('.navbar').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const category = event.target.getAttribute('data-category');
            if (category) {
                loadPrograms(programs, category);
            }
        }
    });
});

function loadPrograms(programs, category) {
    const programList = document.getElementById('program-list');
    programList.innerHTML = '';
    programs
        .filter(program => {
            if (category === "anasayfa") {
                return program.highlight;
            }
            return program.category === category;
        })
        .forEach(program => {
            const programItem = document.createElement('div');
            programItem.classList.add('program-item');
            programItem.addEventListener('click', () => viewProgramDetails(program));
            const programTitle = document.createElement('h2');
            programTitle.innerText = program.title;
            const programDescription = document.createElement('p');
            programDescription.innerText = program.description;
            programItem.appendChild(programTitle);
            programItem.appendChild(programDescription);
            programList.appendChild(programItem);
        });
}

function viewProgramDetails(program) {
    const programDetailsWindow = window.open('', '_blank');
    programDetailsWindow.document.write(`
        <html>
        <head>
            <title>${program.title}</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #2e2e2e;
                    color: #f4f4f4;
                }
                .header {
                    background-color: #111;
                    padding: 20px;
                    text-align: center;
                }
                .header h1 {
                    color: white;
                    font-size: 2em;
                }
                .content {
                    padding: 40px 20px;
                    max-width: 900px;
                    margin: 40px auto;
                    background-color: #444;
                    border: 1px solid #555;
                    border-radius: 8px;
                    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                }
                .content h2 {
                    color: #ffa500;
                    margin-top: 0;
                }
                .content p {
                    line-height: 1.6;
                }
                .back-button {
                    display: block;
                    text-align: center;
                    margin-top: 20px;
                    padding: 10px;
                    background-color: #555;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .back-button:hover {
                    background-color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${program.title}</h1>
            </div>
            <div class="content">
                <h2>Program Detayları</h2>
                <p>${program.details}</p>
                <a href="#" class="back-button" onclick="window.close(); return false;">Geri Dön</a>
            </div>
        </body>
        </html>
    `);
}