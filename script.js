/**
 * ==============================================================================
 * AISHWARYA KOTESH - PORTFOLIO INTERACTIVE LOGIC & AI ASSISTANT
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. THEME TOGGLE (DARK / LIGHT MODE & SYSTEM PREFERENCE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    function getInitialTheme() {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved) return saved;
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }
    }

    applyTheme(getInitialTheme());

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = htmlElement.getAttribute('data-theme') || 'dark';
            const target = current === 'dark' ? 'light' : 'dark';
            applyTheme(target);
            localStorage.setItem('portfolio-theme', target);
        });
    }

    // System theme change listener
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /* ==========================================================================
       2. MOBILE NAVIGATION MENU
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on clicking any navigation link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==========================================================================
       3. SKILLS CATEGORY FILTER
       ========================================================================== */
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    /* ==========================================================================
       4. INTERACTIVE AI CHAT ASSISTANT (TRAINED ON RESUME DATA)
       ========================================================================== */
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');

    // Contextual knowledge base derived directly from resume.pdf
    const aiKnowledge = {
        education: "🎓 **Aishwarya Kotesh's Education Details:**\n1. **B.E. in Information Science and Engineering (2025–2029)** at Adichunchanagiri Institute of Technology (AIT), Chikkamagaluru, VTU — **Aggregate: 84%**\n2. **Pre-University Course (PUC) (2025)** at Kumadvathi Science & Commerce PU College, Shikaripura — **78%**\n3. **SSLC / 10th Standard (2023)** at Karnataka Public School, Hithala (KSEB) — **81.92%**",
        
        skills: "🛠️ **Technical Skills from Resume:**\n• **Programming Languages**: C, Python\n• **Core Concepts**: Object-Oriented Programming (OOPs), Data Structures & Algorithms (DSA)\n• **AI/ML**: Fundamentals of Artificial Intelligence and Machine Learning\n• **Tools**: Arduino IDE, Embedded C/C++, Git, GitHub\n• **Soft Skills**: Communication, English, Teamwork",
        
        projects: "💻 **Featured Projects from Resume:**\n1. **IoT Based Smart Kitchen**: IoT system with real-time kitchen safety, appliance monitoring, and gas/flame sensors using Arduino IDE & Embedded C/C++.\n2. **Smart Waste Segregation System**: Automated system that separates metal and non-metal waste using inductive sensors and Arduino for eco-friendly waste management.",
        
        experience: "🏆 **Experience & Hackathons:**\n• **Smart India Hackathon (SIH) – Participant**: Contributed to national level innovative problem-solving and team-based rapid project development.\n• **Certifications**: Smart India Hackathon (SIH) Certificate of Participation.",
        
        contact: "📞 **Contact Details:**\n• **Phone**: +91 8431634708\n• **Email**: aishu3646243@gmail.com\n• **LinkedIn**: [linkedin.com/in/aishwarya-k-5b069538a](https://linkedin.com/in/aishwarya-k-5b069538a)\n• **GitHub**: [github.com/aishwarya-ise](https://github.com/aishwarya-ise)",
        
        resume: "📜 You can download Aishwarya's official PDF resume by clicking the [Download Resume](resume.pdf) button or through the navigation menu and contact cards!",
        
        about: "Aishwarya Kotesh is an Information Science Engineering student at Adichunchanagiri Institute of Technology (VTU) with an 84% aggregate, passionate about C, Python, IoT systems, and AI/ML fundamentals.",
        
        video: "You can watch Aishwarya's personal introduction video located in the About section above!"
    };

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}-msg`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'msg-avatar';
        avatarDiv.innerHTML = sender === 'ai' 
            ? '<i class="fa-solid fa-robot"></i>' 
            : '<i class="fa-solid fa-user"></i>';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'msg-bubble';

        // Parse markdown bold and newlines
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: #6366f1; text-decoration: underline;">$1</a>')
            .replace(/\n/g, '<br>');

        bubbleDiv.innerHTML = `<p>${formattedText}</p><span class="msg-time">Just now</span>`;

        msgDiv.appendChild(avatarDiv);
        msgDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(msgDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateAIResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('education') || q.includes('college') || q.includes('marks') || q.includes('percentage') || q.includes('school') || q.includes('puc') || q.includes('sslc') || q.includes('vtu') || q.includes('ait') || q.includes('qualification')) {
            return aiKnowledge.education;
        } else if (q.includes('skill') || q.includes('language') || q.includes('python') || q.includes('c language') || q.includes('oops') || q.includes('dsa') || q.includes('tech')) {
            return aiKnowledge.skills;
        } else if (q.includes('project') || q.includes('kitchen') || q.includes('waste') || q.includes('iot') || q.includes('arduino')) {
            return aiKnowledge.projects;
        } else if (q.includes('hackathon') || q.includes('sih') || q.includes('experience') || q.includes('certificate') || q.includes('certif')) {
            return aiKnowledge.experience;
        } else if (q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('email') || q.includes('reach') || q.includes('number') || q.includes('linkedin') || q.includes('github')) {
            return aiKnowledge.contact;
        } else if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('pdf')) {
            return aiKnowledge.resume;
        } else if (q.includes('video') || q.includes('intro')) {
            return aiKnowledge.video;
        } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
            return "Hello! I am Aishwarya Kotesh's AI Assistant. How can I help you explore Aishwarya's education at AIT (84%), IoT projects, skills, or contact info?";
        } else {
            return `Aishwarya Kotesh is pursuing B.E. in Information Science and Engineering at AIT Chikkamagaluru (84% aggregate). Feel free to ask about Aishwarya's IoT Smart Kitchen project, Smart Waste Segregation, C/Python skills, Smart India Hackathon participation, or direct contact (+91 8431634708 / aishu3646243@gmail.com).`;
        }
    }

    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userText = chatInput.value.trim();
            if (!userText) return;

            appendMessage('user', userText);
            chatInput.value = '';

            setTimeout(() => {
                const aiReply = generateAIResponse(userText);
                appendMessage('ai', aiReply);
            }, 400);
        });
    }

    // Quick Prompt Chips
    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.getAttribute('data-question');
            if (question) {
                appendMessage('user', question);
                setTimeout(() => {
                    const aiReply = generateAIResponse(question);
                    appendMessage('ai', aiReply);
                }, 350);
            }
        });
    });

    // Clear Chat
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            chatMessages.innerHTML = `
                <div class="chat-msg ai-msg">
                    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-bubble">
                        <p>👋 Chat reset! Ask me anything about Aishwarya's education, IoT projects, skills, or contact info.</p>
                        <span class="msg-time">Just now</span>
                    </div>
                </div>
            `;
        });
    }

    /* ==========================================================================
       5. CONTACT FORM INTERACTION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;

            if (formFeedback) {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your message has been sent. Aishwarya Kotesh will reach out to you shortly.`;
            }

            contactForm.reset();
            setTimeout(() => {
                if (formFeedback) formFeedback.style.display = 'none';
            }, 6000);
        });
    }

    /* ==========================================================================
       6. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section.section');
    const navItems = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

});
