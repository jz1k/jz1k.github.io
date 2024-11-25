document.addEventListener('DOMContentLoaded', function() {
    // Scroll smooth effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade in effect on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // Hover effect on projects
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            projects.forEach(p => {
                if (p !== project) {
                    p.style.opacity = '0.5';
                }
            });
        });

        project.addEventListener('mouseleave', () => {
            projects.forEach(p => {
                p.style.opacity = '1';
            });
        });
    });

    // Hover effect on skills-icons
    const skills = document.querySelectorAll('.skills-icons img');

    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skills.forEach(s => {
                if (s !== skill) {
                    s.style.opacity = '0.5';
                }
            });
        });

        skill.addEventListener('mouseleave', () => {
            skills.forEach(s => {
                s.style.opacity = '1';
            });
        });
    });
});
