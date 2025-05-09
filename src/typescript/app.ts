// Define the structure of the resume data
interface ResumeData {
    basicInfo: {
        name: string;
        profession: string;
        email: string;
        website: string;
        phone: string;
        address: string;
        socials: Array<{
            platform: string;
            url: string;
            username: string;
        }>;
    };
    experiences: Array<{
        companyName: string;
        professionName: string;
        startingYear: string;
        leavingYear: string;
        cityCountry: string;
    }>;
    education: Array<{
        instituteName: string;
        qualification: string;
        yearOfEnd: string;
    }>;
    skills: Array<{
        skillName: string;
    }>;
    projects: Array<{
        projectName: string;
        projectUrl: string;
        projectDescription: string;
    }>;
}

// Predefined resume data (your data)
const predefinedResumeData: ResumeData = {
    basicInfo: {
        name: "TAIMOOR NADEEM",
        profession: "Full-stack web developer",
        email: "saadngaming@gmail.com",
        website: "https://figma-resume-builder.vercel.app/",
        phone: "03232823873",
        address: "DHA Phase 2 Ext, Karachi",
        socials: [
            {
                platform: "Instagram",
                url: "https://instagram.com/react_and_roll_saad",
                username: "react_and_roll_saad",
            },
            {
                platform: "Github",
                url: "https://github.com/SAAD-NADEEM",
                username: "SAAD-NADEEM",
            },
            {
                platform: "Linkedin",
                url: "https://linkedin.com/in/sa4d7k/",
                username: "sa4d7k",
            },
        ],
    },
    experiences: [], // No experience provided
    education: [
        {
            instituteName: "The Educators",
            qualification: "Matriculation",
            yearOfEnd: "2020",
        },
        {
            instituteName: "Aisha Bawany Govt Boys College",
            qualification: "Intermediate",
            yearOfEnd: "2022",
        },
        {
            instituteName: "Benazir Bhutto Shaheed University",
            qualification: "BSCS",
            yearOfEnd: "2025",
        },
        {
            instituteName: "GIAIC - 1st and 2nd Quarter ( NextJs )",
            qualification: "Web Development ( Nextjs & Typescript ) ",
            yearOfEnd: "2025",
        },
        {
            instituteName: "GIAIC 4th Quarter - Ongoing",
            qualification: "Agentic AI",
            yearOfEnd: "2025",
        },
    ],
    skills: [
        { skillName: "ReactJS/NextJS" },
        { skillName: "ShadeCN" },
        { skillName: "HTML" },
        { skillName: "CSS" },
        { skillName: "Javascript" },
        { skillName: "Typescript" },
        { skillName: "Python" },
        { skillName: "GeminiAI" },
        { skillName: "Streamlit" },
    ],
    projects: [
        {
            projectName: "AI RecipeGen",
            projectUrl: "https://recipegen-ai.netlify.app/",
            projectDescription: "An AI-powered recipe generator app made using ReactJs and GeminiAI.",
        },
        {
            projectName: "AI Nutritional App",
            projectUrl: "https://nutritional-powerhouse.netlify.app/",
            projectDescription: "An app to analyze nutritional content made using ReactJs and GeminiAI.",
        },
        {
            projectName: "Python RecipeGen",
            projectUrl: "https://recipegenv1.streamlit.app/",
            projectDescription: "A Python-based recipe generator.",
        },
        {
            projectName: "Morent - Rent A Car",
            projectUrl: "https://morent-renta-car.vercel.app/",
            projectDescription: "Just Dummy Rent a car service app using NextJS and SanityIO",
        },

    ],
};

// Function to retrieve or initialize resume data
function getOrInitializeResumeData(): ResumeData {
    // Retrieve the data from localStorage
    const resumeDataString = localStorage.getItem("resumeData");

    if (resumeDataString) {
        // If data exists, parse and return it
        return JSON.parse(resumeDataString) as ResumeData;
    } else {
        // If no data exists, save the predefined data to localStorage
        localStorage.setItem("resumeData", JSON.stringify(predefinedResumeData));
        console.log(
            "No resume data found in localStorage. Predefined data has been saved."
        );
        return predefinedResumeData;
    }
}

// Function to populate the UI with resume data
function populateUI(resumeData: ResumeData): void {
    // Basic Info
    const nameElement = document.querySelector(".profile h1");
    const professionElement = document.querySelector(".profile p");
    const emailElement = document.querySelector(".adress-item:nth-child(1) p");
    const websiteElement = document.querySelector(".adress-item:nth-child(2) p");
    const phoneElement = document.querySelector(".adress-item:nth-child(3) p");
    const addressElement = document.querySelector(".adress-item:nth-child(4) p");

    if (nameElement) nameElement.textContent = resumeData.basicInfo.name;
    if (professionElement)
        professionElement.textContent = resumeData.basicInfo.profession;
    if (emailElement) emailElement.textContent = resumeData.basicInfo.email;
    if (websiteElement) websiteElement.textContent = resumeData.basicInfo.website;
    if (phoneElement) phoneElement.textContent = resumeData.basicInfo.phone;
    if (addressElement) addressElement.textContent = resumeData.basicInfo.address;

    // Socials
    const socialItems = document.querySelectorAll(".social-item");
    resumeData.basicInfo.socials.forEach((social, index) => {
        if (socialItems[index]) {
            const socialLink = socialItems[index].querySelector("a");
            const socialPlatform = socialItems[index].querySelector("h1");
            const socialUsername = socialItems[index].querySelector("p");

            if (socialLink) socialLink.setAttribute("href", social.url);
            if (socialPlatform) socialPlatform.textContent = social.platform;
            if (socialUsername) socialUsername.textContent = `@${social.username}`;
        }
    });

    // Education
    const educationWrapper = document.querySelector(".education-wrapper");
    if (educationWrapper) {
        educationWrapper.innerHTML = resumeData.education
            .map(
                (edu) => `
            <div class="eduaction-card col spacing-small">
                <h2 class="body text-400 bold">${edu.instituteName}</h2>
                <div class="row education-space">
                    <p class="body text-300 semibold">${edu.qualification}</p>
                    <p class="body text-200">${edu.yearOfEnd}</p>
                </div>
            </div>
        `
            )
            .join("");
    }

    // Skills
    const skillWrapper = document.querySelector(".skill-wrapper");
    if (skillWrapper) {
        skillWrapper.innerHTML = resumeData.skills
            .map(
                (skill) => `
            <li class="skill-card">
                <p class="text-200 heading-2 semibold">${skill.skillName}</p>
            </li>
        `
            )
            .join("");
    }

    // experiences
    const experiencesWrapper = document.querySelector(".card-wrapper");
    if (experiencesWrapper) {
        if (resumeData.experiences) {
            experiencesWrapper.innerHTML = resumeData.experiences
                .map(
                    (exp) => `
                    <div class="card row spacing-medium">
                    <div class="logo-primary">
                        <img src="/assets/logos/google-logo.svg" alt="company logo">
                    </div>
                    <div class="card-heading-ctn row">
                        <div class="col spacing-small">
                            <h2 class="body text-300">${exp.professionName}</h2>
                            <p class="body semibold text-400">${exp.companyName}</p>
                        </div>
                        <div class="card-details col spacing-small">
                            <p class="body bold text-300">${exp.startingYear} - ${exp.leavingYear}</p>
                            <div class="card-location">
                                <img src="/assets/icons/location.svg" alt="location icon">
                                <p class="body text-300">${exp.cityCountry}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
                )
                .join("");
        }
    }
    // Projects
    const projectsWrapper = document.querySelector(".projects-wrapper");
    if (projectsWrapper) {
        if (resumeData.projects) {
            projectsWrapper.innerHTML = resumeData.projects
                .map(
                    (project) => `
                <div class="project-card col">
                    <div class="project-details-ctn col spacing-small card">
                        <h2 class="body bold text-400">${project.projectName}</h2>
                        <p class="body text-300">${project.projectDescription}</p>
                        <div class="row project-link-ctn spacing-small text-100">
                            <div class="icon-secondary project-icon">
                                <img src="/assets/icons/link.svg" alt="link icon">
                            </div>
                            <a class="body bold auto-block" href="${project.projectUrl}">${project.projectUrl}</a>
                        </div>
                    </div>
                </div>
            `
                )
                .join("");
        }
    }
}

function goToForm() {
    window.location.href = "form.html";
}
function printResume() {
    // Open the browser's print dialog
    window.print();
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve or initialize resume data
    const resumeData = getOrInitializeResumeData();

    // Populate the UI with the resume data
    populateUI(resumeData);
});

const profileUpload = document.getElementById("profile-upload") as HTMLInputElement;
const profileImage = document.getElementById("profileImage") as HTMLImageElement;

// Load profile picture from localStorage
const loadProfilePicture = (): void => {
    const savedImage: string | null = localStorage.getItem("profilePicture");
    if (savedImage) {
        profileImage.src = savedImage;
    }
};

// Handle profile picture change
const handleProfileChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const file: File = target.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
            const imageUrl: string = e.target.result as string;
            profileImage.src = imageUrl;
            localStorage.setItem("profilePicture", imageUrl);
        }
    };

    reader.readAsDataURL(file);
};

// Load saved profile picture when page loads
window.addEventListener("DOMContentLoaded", loadProfilePicture);

// Add event listener for file upload
profileUpload.addEventListener("change", handleProfileChange);
