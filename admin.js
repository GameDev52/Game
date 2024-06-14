document.addEventListener('DOMContentLoaded', function() {
    const programForm = document.getElementById('programForm');
    const programList = document.getElementById('programList');

    loadPrograms();

    programForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const details = document.getElementById('details').value;
        const category = document.getElementById('category').value;
        const highlight = document.getElementById('highlight').checked;
        
        const programs = JSON.parse(localStorage.getItem('programs')) || [];
        
        // Yeni program oluşturma
        const newProgram = {
            id: programs.length ? programs[programs.length - 1].id + 1 : 1, // ID'yi bir artır
            title: title,
            description: description,
            details: details,
            category: category,
            highlight: highlight
        };
        
        programs.push(newProgram);
        localStorage.setItem('programs', JSON.stringify(programs));
        alert('Program başarıyla eklendi!');
        
        // Formu temizle
        programForm.reset();
        
        // Programları tekrar yükle
        loadPrograms();
    });

    // Programları yükleme
    function loadPrograms() {
        // Mevcut program listesini temizle
        programList.innerHTML = '';
        const programs = JSON.parse(localStorage.getItem('programs')) || [];
        programs.forEach(program => {
            const programItem = document.createElement('div');
            programItem.classList.add('program-item');
            
            const programTitle = document.createElement('h2');
            programTitle.innerText = program.title;
            
            const programDescription = document.createElement('p');
            programDescription.innerText = program.description;
            
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Sil';
            deleteButton.addEventListener('click', function() {
                deleteProgram(program.id);
            });

            programItem.appendChild(programTitle);
            programItem.appendChild(programDescription);
            programItem.appendChild(deleteButton);
            
            programList.appendChild(programItem);
        });
    }

    // Programı silme
    function deleteProgram(id) {
        const programs = JSON.parse(localStorage.getItem('programs')) || [];
        const filteredPrograms = programs.filter(program => program.id !== id);
        localStorage.setItem('programs', JSON.stringify(filteredPrograms));
        alert('Program başarıyla silindi!');
        
        // Programları tekrar yükle
        loadPrograms();
    }
});