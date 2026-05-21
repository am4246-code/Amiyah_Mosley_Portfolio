document.addEventListener('DOMContentLoaded', () => {
    // --- YOUR PROJECT DATA ---
    // Fill this array with your projects.
    // For project images, you can use direct links or local files.
    // Recommended image size: 300x300 pixels.
    const projects = [
        {
            id: 'project1',
            title: 'RollCount - Facial Attendance (completed)',
            description: 'An attendance management system for instructors that utilizes live webcam feed and facial recognition programs, like YuNet and LBPH to identify a student, mark their presence, and log it in a data chart.',
            tech: ['Python', 'OpenCV', 'dlib', 'Face Recognition'],
            imageUrl: '', // No live demo for a desktop app
            githubUrl: 'https://github.com/am4246-code/RollCount-Facial_Attendance-Taker'
        },
        {
            id: 'project2',
            title: 'HydroSync - Smart Irrigation (unfinished)',
            description: 'A water intake tracker website that allows users to determine how much water they should be drinking based on factors that can affect this like age, gender, and weight. It also utilizes a tracking system that helps users track their daily and weekly water intake.',
            tech: ['TypeScript', 'React', 'Supabase','CSS', 'HTML', 'PLpgSQL'],
            imageUrl: 'assets/login.png', // Consider creating a new image for  to the web interface if applicable
            githubUrl: 'https://github.com/am4246-code/hydrosync'
        },
       
        // Add more projects here...
    ];

    // --- DOM ELEMENT REFERENCES ---
    const projectListContainer = document.getElementById('project-list-container');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectTechStack = document.getElementById('project-tech-stack');
    const projectLinks = document.getElementById('project-links');
    const vinylRecord = document.getElementById('vinyl-record');
    const vinylLabelImg = document.getElementById('vinyl-label-img');
    const tonearm = document.querySelector('.tonearm');
    const musicNotes = document.getElementById('music-notes');

    // --- FUNCTIONS ---

    /**
     * Populates the project list "record crate"
     */
    function renderProjectList() {
        projectListContainer.innerHTML = ''; // Clear existing projects
        projects.forEach(project => {
            const sleeve = document.createElement('div');
            sleeve.className = 'project-sleeve';
            sleeve.dataset.projectId = project.id; // Use data attribute to link to project data
            
            sleeve.innerHTML = `
                <img src="${project.imageUrl}" alt="${project.title} cover art">
                <div class="sleeve-title">${project.title}</div>
            `;

            sleeve.addEventListener('click', () => {
                displayProject(project.id);
            });

            projectListContainer.appendChild(sleeve);
        });
    }

    /**
     * Displays the details for a selected project
     * @param {string} projectId The ID of the project to display
     */
    function displayProject(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        // Update project details text
        projectTitle.textContent = project.title;
        projectDescription.textContent = project.description;

        // Animate the music notes
        projectTitle.classList.remove('animate-notes'); // Remove class to allow re-triggering
        // This is a trick to restart the animation
        void projectTitle.offsetWidth; // Triggers a reflow
        projectTitle.classList.add('animate-notes'); // Add class to play animation


        // Update tech stack
        projectTechStack.innerHTML = '';
        project.tech.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            projectTechStack.appendChild(techTag);
        });

        // Update links
        let linksHTML = '';
        // Only show the Live Demo link if the URL is not '#'
        if (project.liveUrl && project.liveUrl !== '#') {
            linksHTML += `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>`;
        }
        linksHTML += `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub Repo</a>`;
        projectLinks.innerHTML = linksHTML;
        
        // Update the vinyl record
        vinylLabelImg.src = project.imageUrl;
        vinylRecord.classList.add('playing');
        tonearm.classList.add('playing');

        // Trigger music note animation
        musicNotes.classList.remove('playing');
        void musicNotes.offsetWidth; // Trigger reflow to restart animation
        musicNotes.classList.add('playing');
    }


    // --- INITIALIZATION ---
    renderProjectList();
});
