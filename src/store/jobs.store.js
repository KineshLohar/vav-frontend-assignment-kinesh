import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";




const useJobsStore = create(
    persist((set) => ({

        jobs: [
            {
                id: 3,
                title: "Senior Frontend Developer",
                status: "active",
                applications: 25,
                tags: "React, TypeScript, UI/UX",
                role: "developer",
                createdById: 0,
                minSalary: 80000,
                maxSalary: 120000,
                salaryType: "yearly",
                educationLevel: "bachelors",
                experienceLevel: "Senior",
                jobType: "Full-time",
                jobLevel: "advanced",
                expiryDate: "2025-12-31",
                createdAt: "2025-11-30",
                country: "India",
                city: "Mumbai",
                description: "We are looking for a highly skilled Senior Frontend Developer to join our growing team. You will be responsible for building scalable and high-performance web applications using React and TypeScript. The ideal candidate has a strong understanding of modern UI/UX principles, state management, and performance optimization. You will collaborate closely with designers, backend developers, and product managers to deliver seamless user experiences. Responsibilities include developing reusable components, improving application performance, implementing responsive designs, and ensuring cross-browser compatibility. Experience with testing frameworks, CI/CD pipelines, and accessibility standards is highly preferred.",
                fullyRemote: true
            },
            {
                id: 4,
                title: "Backend Developer (Node.js)",
                status: "active",
                applications: 18,
                tags: "Node.js, Express, MongoDB",
                role: "developer",
                createdById: 0,
                minSalary: 70000,
                maxSalary: 110000,
                salaryType: "yearly",
                educationLevel: "bachelors",
                experienceLevel: "intermediate",
                jobType: "Full-time",
                jobLevel: "Mid",
                expiryDate: "2026-11-30",
                created: "2026-03-30",
                country: "India",
                city: "Pune",
                description: "We are seeking a Backend Developer with strong experience in Node.js and Express to build robust and scalable APIs. You will be responsible for designing server-side logic, managing databases, and ensuring high performance and responsiveness of applications. The role involves integrating third-party services, optimizing database queries, and maintaining security and data protection standards. Familiarity with microservices architecture, RESTful APIs, and cloud platforms like AWS is a plus. You will also collaborate with frontend developers to ensure seamless integration of user-facing elements.",
                fullyRemote: false
            },
            {
                id: 5,
                title: "Full Stack Developer (MERN)",
                status: "active",
                applications: 30,
                tags: "MongoDB, Express, React, Node",
                role: "manager",
                createdById: 0,
                minSalary: 90000,
                maxSalary: 140000,
                salaryType: "yearly",
                educationLevel: "masters",
                experienceLevel: "Senior",
                jobType: "Full-time",
                jobLevel: "advanced",
                expiryDate: "2026-10-15",
                createdAt: "2026-02-15",
                country: "India",
                city: "Bangalore",
                description: "We are hiring a Full Stack Developer proficient in the MERN stack to work on end-to-end development of modern web applications. The candidate will be responsible for designing, developing, and maintaining both frontend and backend systems. You will work on building RESTful APIs, implementing responsive user interfaces, and optimizing application performance. Strong problem-solving skills and the ability to work in an agile environment are essential. Experience with DevOps practices, containerization (Docker), and cloud deployment will be an added advantage.",
                fullyRemote: true
            },
            {
                id: 6,
                title: "UI/UX Designer",
                status: "active",
                applications: 12,
                tags: "Figma, Adobe XD, Prototyping",
                role: "designer",
                createdById: 0,
                minSalary: 50000,
                maxSalary: 90000,
                salaryType: "yearly",
                educationLevel: "highschool",
                experienceLevel: "Mid-Level",
                jobType: "Contract",
                jobLevel: "beginner",
                expiryDate: "2026-09-20",
                createdAt: "2026-01-20",
                country: "India",
                city: "Delhi",
                description: "We are looking for a creative UI/UX Designer who can transform complex ideas into intuitive and engaging user experiences. You will be responsible for creating wireframes, prototypes, and high-fidelity designs for web and mobile applications. The role requires a deep understanding of user-centered design principles, usability testing, and interaction design. You will collaborate closely with developers and product teams to ensure that designs are implemented accurately. A strong portfolio demonstrating previous design projects is required.",
                fullyRemote: true
            },
            {
                id: 7,
                title: "DevOps Engineer",
                status: "active",
                applications: 20,
                tags: "AWS, Docker, CI/CD",
                role: "manager",
                createdById: 0,
                minSalary: 100000,
                maxSalary: 150000,
                salaryType: "yearly",
                educationLevel: "masters",
                experienceLevel: "intermediate",
                jobType: "Full-time",
                jobLevel: "Senior",
                expiryDate: "2027-07-01",
                createdAt: "2026-01-01",
                country: "India",
                city: "Hyderabad",
                description: "We are seeking a DevOps Engineer to manage and improve our cloud infrastructure and deployment pipelines. You will be responsible for automating processes, maintaining CI/CD pipelines, and ensuring system reliability and scalability. The ideal candidate has hands-on experience with AWS, Docker, Kubernetes, and infrastructure as code tools like Terraform. You will also monitor system performance, troubleshoot issues, and implement security best practices. Strong collaboration skills and the ability to work in a fast-paced environment are essential.",
                fullyRemote: false
            }
        ],


        addJob: (newJob) => set((state) => ({
            users: [...state.jobs, newJob]
        })),

        updateJob: (job) => set((state) => ({
            jobs: state.jobs.map((u) => {
                console.log("u", u);
                
                if (u.id === job.id) {
                    console.log("inside", u.id, job, {...u, ...job});
                    
                    return {
                        ...u,
                        ...job
                    }
                }
                return u
            })
        })),
        deleteJob: (id) => set((state) => ({
            jobs: state.jobs.filter(j => j.id !== id)
        })),
        resetDatabase: () => set({
            jobs: []
        })

    }), {
        name: "jobs-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export { useJobsStore };