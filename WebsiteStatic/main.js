// Portfolio data storage
const portfolioData = {
    personal: {
        name: '',
        email: '',
        phone: '',
        location: '',
        profileImage: null
    },
    description: {
        type: 'professional',
        content: ''
    },
    education: [],
    skills: [],
    achievements: [],
    experience: [],
    projects: []
};

// Elements
const sectionItems = document.querySelectorAll('.section-item');
const editorSections = document.querySelectorAll('.editor-section');

// Personal info elements
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const locationInput = document.getElementById('location');
const btnUploadImage = document.getElementById('btn-upload-image');
const imageUpload = document.getElementById('image-upload');
const btnRemoveImage = document.getElementById('btn-remove-image');
const profileImagePreview = document.getElementById('profile-image-preview');
const profileIcon = document.getElementById('profile-icon');

// Preview elements
const previewName = document.getElementById('preview-name');
const previewEmail = document.getElementById('preview-email');
const previewPhone = document.getElementById('preview-phone');
const previewLocation = document.getElementById('preview-location');
const previewProfileImage = document.getElementById('preview-profile-image');
const previewProfileIcon = document.getElementById('preview-profile-icon');
const previewDescription = document.getElementById('preview-description');

// Description elements
const descriptionTypeSelect = document.getElementById('description-type');
const descriptionContentTextarea = document.getElementById('description-content');

// Education elements
const institutionInput = document.getElementById('institution');
const degreeInput = document.getElementById('degree');
const educationDatesInput = document.getElementById('education-dates');
const btnAddEducation = document.getElementById('btn-add-education');
const previewEducationList = document.getElementById('preview-education-list');

// Skills elements
const skillNameInput = document.getElementById('skill-name');
const skillProficiencySelect = document.getElementById('skill-proficiency');
const btnAddSkill = document.getElementById('btn-add-skill');
const previewSkillsList = document.getElementById('preview-skills-list');

// Experience elements
const companyInput = document.getElementById('company');
const jobTitleInput = document.getElementById('job-title');
const experienceDatesInput = document.getElementById('experience-dates');
const jobDescriptionTextarea = document.getElementById('job-description');
const btnAddExperience = document.getElementById('btn-add-experience');
const previewExperienceList = document.getElementById('preview-experience-list');

// Elements for achievements
const achievementTitleInput = document.getElementById('achievement-title');
const achievementDescriptionTextarea = document.getElementById('achievement-description');
const achievementDateInput = document.getElementById('achievement-date');
const btnAddAchievement = document.getElementById('btn-add-achievement');
const previewAchievementsList = document.createElement('div'); // We'll add this to the preview

// Elements for projects
const projectTitleInput = document.getElementById('project-title');
const projectDescriptionTextarea = document.getElementById('project-description');
const projectLinkInput = document.getElementById('project-link');
const btnAddProject = document.getElementById('btn-add-project');
const previewProjectsList = document.createElement('div'); // We'll add this to the preview

// Section switching
sectionItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        sectionItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all editor sections
        editorSections.forEach(section => section.classList.add('hidden'));
        
        // Show the selected section
        const sectionId = item.getAttribute('data-section');
        document.getElementById(`${sectionId}-section`).classList.remove('hidden');
    });
});

// Image upload functionality
btnUploadImage.addEventListener('click', () => {
    imageUpload.click();
});

imageUpload.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            portfolioData.personal.profileImage = event.target.result;
            updateProfileImage();
        };
        
        reader.readAsDataURL(e.target.files[0]);
    }
});

btnRemoveImage.addEventListener('click', () => {
    portfolioData.personal.profileImage = null;
    updateProfileImage();
});

function updateProfileImage() {
    if (portfolioData.personal.profileImage) {
        profileImagePreview.src = portfolioData.personal.profileImage;
        profileImagePreview.style.display = 'block';
        profileIcon.style.display = 'none';
        
        previewProfileImage.src = portfolioData.personal.profileImage;
        previewProfileImage.style.display = 'block';
        previewProfileIcon.style.display = 'none';
    } else {
        profileImagePreview.style.display = 'none';
        profileIcon.style.display = 'block';
        
        previewProfileImage.style.display = 'none';
        previewProfileIcon.style.display = 'flex';
    }
}

// Personal info update
fullNameInput.addEventListener('input', () => {
    portfolioData.personal.name = fullNameInput.value;
    previewName.textContent = fullNameInput.value || 'Your Name';
});

emailInput.addEventListener('input', () => {
    portfolioData.personal.email = emailInput.value;
    previewEmail.textContent = emailInput.value || 'email@example.com';
});

phoneInput.addEventListener('input', () => {
    portfolioData.personal.phone = phoneInput.value;
    previewPhone.textContent = phoneInput.value || '(123) 456-7890';
});

locationInput.addEventListener('input', () => {
    portfolioData.personal.location = locationInput.value;
    previewLocation.textContent = locationInput.value || 'City, State, Country';
});

// Description update
descriptionTypeSelect.addEventListener('change', () => {
    portfolioData.description.type = descriptionTypeSelect.value;
});

descriptionContentTextarea.addEventListener('input', () => {
    portfolioData.description.content = descriptionContentTextarea.value;
    previewDescription.textContent = descriptionContentTextarea.value || 'Dedicated professional with experience in the field. A brief description of your skills and career objectives will appear here.';
});

// Add education entry
btnAddEducation.addEventListener('click', () => {
    if (institutionInput.value && degreeInput.value) {
        const education = {
            institution: institutionInput.value,
            degree: degreeInput.value,
            dates: educationDatesInput.value
        };
        
        portfolioData.education.push(education);
        updateEducationPreview();
        
        // Clear inputs
        institutionInput.value = '';
        degreeInput.value = '';
        educationDatesInput.value = '';
    }
});

function updateEducationPreview() {
    if (portfolioData.education.length > 0) {
        let html = '';
        portfolioData.education.forEach(edu => {
            html += `
                <div class="education-item">
                    <h3>${edu.degree}, ${edu.institution}</h3>
                    <p>${edu.dates}</p>
                </div>
            `;
        });
        previewEducationList.innerHTML = html;
    } else {
        previewEducationList.innerHTML = '<p>Your education background will appear here.</p>';
    }
}

// Add skill entry
btnAddSkill.addEventListener('click', () => {
    if (skillNameInput.value) {
        const skill = {
            name: skillNameInput.value,
            proficiency: skillProficiencySelect.value
        };
        
        portfolioData.skills.push(skill);
        updateSkillsPreview();
        
        // Clear inputs
        skillNameInput.value = '';
        skillProficiencySelect.value = 'beginner';
    }
});

function updateSkillsPreview() {
    if (portfolioData.skills.length > 0) {
        let html = '';
        portfolioData.skills.forEach(skill => {
            const ratingValue = 
                skill.proficiency === 'beginner' ? '2/5' :
                skill.proficiency === 'intermediate' ? '3/5' :
                skill.proficiency === 'advanced' ? '4/5' : '5/5';
            
            html += `
                <div class="skill-item">
                    <span>${skill.name}</span>
                    <span style="float: right;">${ratingValue}</span>
                </div>
            `;
        });
        previewSkillsList.innerHTML = html;
    } else {
        previewSkillsList.innerHTML = '<p>Your skills will appear here.</p>';
    }
}

// Add experience entry
btnAddExperience.addEventListener('click', () => {
    if (companyInput.value && jobTitleInput.value) {
        const experience = {
            company: companyInput.value,
            title: jobTitleInput.value,
            dates: experienceDatesInput.value,
            description: jobDescriptionTextarea.value
        };
        
        portfolioData.experience.push(experience);
        updateExperiencePreview();
        
        // Clear inputs
        companyInput.value = '';
        jobTitleInput.value = '';
        experienceDatesInput.value = '';
        jobDescriptionTextarea.value = '';
    }
});

function updateExperiencePreview() {
    if (portfolioData.experience.length > 0) {
        let html = '';
        portfolioData.experience.forEach(exp => {
            html += `
                <div class="experience-item">
                    <h3>${exp.title} at ${exp.company}, ${exp.dates}</h3>
                    <p>${exp.description}</p>
                </div>
            `;
        });
        previewExperienceList.innerHTML = html;
    } else {
        previewExperienceList.innerHTML = '<p>Your work experience will appear here.</p>';
    }
}

// Add achievement entry
btnAddAchievement.addEventListener('click', () => {
    if (achievementTitleInput.value) {
        const achievement = {
            title: achievementTitleInput.value,
            description: achievementDescriptionTextarea.value,
            date: achievementDateInput.value
        };
        
        portfolioData.achievements.push(achievement);
        updateAchievementsPreview();
        
        // Clear inputs
        achievementTitleInput.value = '';
        achievementDescriptionTextarea.value = '';
        achievementDateInput.value = '';
        
        // Force an update of the preview
        document.getElementById('btn-preview').click();
    }
});

function updateAchievementsPreview() {
    // Create the achievements section if it doesn't exist yet
    let achievementsSection = document.getElementById('preview-achievements-section');
    if (!achievementsSection) {
        achievementsSection = document.createElement('div');
        achievementsSection.id = 'preview-achievements-section';
        achievementsSection.className = 'resume-section';
        achievementsSection.innerHTML = '<h2>Achievements</h2>';
        achievementsSection.appendChild(previewAchievementsList);
        
        // Add it before skills section
        const skillsSection = document.getElementById('preview-skills-section');
        if (skillsSection) {
            skillsSection.parentNode.insertBefore(achievementsSection, skillsSection);
        } else {
            // If skills section doesn't exist yet, add to the end of resume preview
            document.getElementById('resume-preview').appendChild(achievementsSection);
        }
    }
    
    if (portfolioData.achievements.length > 0) {
        let html = '';
        portfolioData.achievements.forEach(achievement => {
            html += `
                <div class="achievement-item">
                    <h3>${achievement.title} ${achievement.date ? `(${achievement.date})` : ''}</h3>
                    <p>${achievement.description}</p>
                </div>
            `;
        });
        previewAchievementsList.innerHTML = html;
    } else {
        previewAchievementsList.innerHTML = '<p>Your achievements will appear here.</p>';
    }
}

// Add project entry
btnAddProject.addEventListener('click', () => {
    if (projectTitleInput.value) {
        const project = {
            title: projectTitleInput.value,
            description: projectDescriptionTextarea.value,
            link: projectLinkInput.value
        };
        
        portfolioData.projects.push(project);
        updateProjectsPreview();
        
        // Clear inputs
        projectTitleInput.value = '';
        projectDescriptionTextarea.value = '';
        projectLinkInput.value = '';
        
        // Force an update of the preview
        document.getElementById('btn-preview').click();
    }
});

function updateProjectsPreview() {
    // Create the projects section if it doesn't exist yet
    let projectsSection = document.getElementById('preview-projects-section');
    if (!projectsSection) {
        projectsSection = document.createElement('div');
        projectsSection.id = 'preview-projects-section';
        projectsSection.className = 'resume-section';
        projectsSection.innerHTML = '<h2>Projects</h2>';
        projectsSection.appendChild(previewProjectsList);
        
        // Add it to the end of resume preview
        document.getElementById('resume-preview').appendChild(projectsSection);
    }
    
    if (portfolioData.projects.length > 0) {
        let html = '';
        portfolioData.projects.forEach(project => {
            html += `
                <div class="project-item">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    ${project.link ? `<a href="${project.link}" target="_blank">${project.link}</a>` : ''}
                </div>
            `;
        });
        previewProjectsList.innerHTML = html;
    } else {
        previewProjectsList.innerHTML = '<p>Your projects will appear here.</p>';
    }
}

// Simple preview refresh - updated to include achievements and projects
document.getElementById('btn-preview').addEventListener('click', () => {
    updateProfileImage();
    updateEducationPreview();
    updateSkillsPreview();
    updateExperiencePreview();
    updateAchievementsPreview();
    updateProjectsPreview();
});

// Full preview functionality
document.getElementById('btn-full-preview').addEventListener('click', () => {
    // Create modal container
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.zIndex = '1000';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.padding = '20px';
    modal.style.boxSizing = 'border-box';
    modal.style.overflow = 'auto';
    
    // Create preview content
    const previewContent = document.createElement('div');
    previewContent.style.backgroundColor = 'white';
    previewContent.style.width = '100%';
    previewContent.style.maxWidth = '850px';
    previewContent.style.maxHeight = '95vh';
    previewContent.style.overflow = 'auto';
    previewContent.style.padding = '30px';
    previewContent.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    previewContent.style.position = 'relative';
    
    // Clone the resume preview
    const resumeClone = document.getElementById('resume-preview').cloneNode(true);
    resumeClone.style.transform = 'none';
    resumeClone.style.boxShadow = 'none';
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#333';
    closeBtn.onclick = () => document.body.removeChild(modal);
    
    // Add everything to the DOM
    previewContent.appendChild(closeBtn);
    previewContent.appendChild(resumeClone);
    modal.appendChild(previewContent);
    document.body.appendChild(modal);
});

// PDF Export functionality
document.getElementById('btn-export').addEventListener('click', () => {
    // Create a hidden clone of the resume
    const resumeContainer = document.createElement('div');
    resumeContainer.style.position = 'absolute';
    resumeContainer.style.left = '-9999px';
    resumeContainer.style.top = '-9999px';
    
    const resumeClone = document.getElementById('resume-preview').cloneNode(true);
    resumeClone.style.transform = 'none';
    resumeClone.style.width = '830px'; // A4 width at 96 DPI
    resumeClone.style.boxShadow = 'none';
    resumeClone.style.padding = '0';
    resumeClone.style.margin = '0';
    
    resumeContainer.appendChild(resumeClone);
    document.body.appendChild(resumeContainer);
    
    // Use html2pdf.js for PDF generation
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = function() {
        const name = portfolioData.personal.name || 'resume';
        const filename = `${name.toLowerCase().replace(/\s+/g, '_')}_portfolio.pdf`;
        
        const opt = {
            margin: [10, 10, 10, 10],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(resumeClone).save().then(() => {
            document.body.removeChild(resumeContainer);
        });
    };
    
    document.body.appendChild(script);
});

// Initialize with example data
function initializeWithExampleData() {
    fullNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    locationInput.value = "";
    
    previewName.textContent = "Your name";
    previewEmail.textContent = "@gmail.com";
    previewPhone.textContent = "Your phone number";
    previewLocation.textContent = "Your location";
    previewTitle.textContent = "Your profession";
    
    descriptionContentTextarea.value = "Your short description.";
    previewDescription.textContent = "Dedicated Psychologist with vast experience providing patients with innovative treatment to navigate psychological struggles. Committed to serving as an ongoing support through diagnosis evaluation, and implementation of treatment. Experienced in collaborating with other related service providers to ensure patients are supported wholly.";
    
    // Add experience
    portfolioData.experience = [
        {
            company: "Edmond Counseling Center",
            title: "Psychologist",
            dates: "04/2017-04/2020",
            description: "• Conducted through neurological assessments prior to treatment.\n• Collaborated with multi-disciplinary teams to effectively coordinate patient care.\n• Implemented treatments that decreased mental health issues and rehabilitation barriers.\n• Studied human behavior and implemented short-term and long-term treatment plans.\n• Utilized empathy and a strong attention to detail."
        },
        {
            company: "East Way Healthcare Center",
            title: "Psychologist",
            dates: "06/2014-03/2017",
            description: "• Provided behavioral health services to patients who experience psychological difficulties.\n• Developed and implemented treatment plans to help patients live their healthiest life.\n• Conducted thorough psychological screenings and assessments.\n• Conferred with clinical staff to ensure optimal patient care.\n• Demonstrated a thorough knowledge of psychological counseling theory."
        }
    ];
    
    // Add education
    portfolioData.education = [
        {
            institution: "The University of Oklahoma, Norman",
            degree: "Doctor of Psychology",
            dates: "09/2008-04/2014"
        }
    ];
    
    // Add skills
    portfolioData.skills = [
        {
            name: "Neurological Assessments",
            proficiency: "expert"
        },
        {
            name: "Cognitive Behavioral Therapy",
            proficiency: "expert"
        },
        {
            name: "Advanced Research Skills",
            proficiency: "expert"
        },
        {
            name: "Knowledge of Psychological Theory",
            proficiency: "expert"
        }
    ];
    
    updateExperiencePreview();
    updateEducationPreview();
    updateSkillsPreview();
    
    // Initialize achievements and projects sections
    updateAchievementsPreview();
    updateProjectsPreview();
}

// Initialize the app
initializeWithExampleData();

// Make sure the title element exists
document.addEventListener('DOMContentLoaded', function() {
    // Check if previewTitle exists, if not create it
    if (!window.previewTitle) {
        const previewNameElement = document.getElementById('preview-name');
        if (previewNameElement) {
            const parent = previewNameElement.parentNode;
            const titleElement = document.createElement('p');
            titleElement.id = 'preview-title';
            titleElement.textContent = 'Your title';
            
            // Insert after preview-name
            if (previewNameElement.nextSibling) {
                parent.insertBefore(titleElement, previewNameElement.nextSibling);
            } else {
                parent.appendChild(titleElement);
            }
            
            window.previewTitle = titleElement;
        }
    }
    
    // Make sure achievement and project sections exist from the start
    updateAchievementsPreview();
    updateProjectsPreview();
});