document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    let isTransitioning = false;
    
    // Show web projects by default
    filterProjects('web');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isTransitioning) return; // Prevent multiple clicks during transition
            
            const filterValue = button.getAttribute('data-filter');
            const currentActive = document.querySelector('.filter-btn.active');
            
            // Don't do anything if the same button is clicked
            if (currentActive === button) return;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with smooth transition
            filterProjects(filterValue);
        });
    });
    
    function filterProjects(category) {
        isTransitioning = true;
        
        const visibleCards = Array.from(projectCards).filter(card => 
            !card.classList.contains('hidden') && !card.classList.contains('fade-out')
        );
        const targetCards = Array.from(projectCards).filter(card => 
            card.getAttribute('data-category') === category
        );
        
        // Phase 1: Fade out current projects
        visibleCards.forEach(card => {
            if (card.getAttribute('data-category') !== category) {
                card.classList.add('fade-out');
            }
        });
        
        // Phase 2: After fade out completes, hide old cards and show new ones
        setTimeout(() => {
            let staggerDelay = 0;
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (cardCategory === category) {
                    // Show and fade in target cards with stagger
                    card.classList.remove('hidden', 'fade-out');
                    card.style.display = 'flex';
                    
                    // Force reflow to ensure display change is applied
                    card.offsetHeight;
                    
                    // Add fade-in class with staggered delay for smooth entrance
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 50 + staggerDelay);
                    
                    staggerDelay += 100; // 100ms stagger between cards
                } else {
                    // Hide non-target cards
                    card.classList.add('hidden');
                    card.classList.remove('fade-in');
                    card.style.display = 'none';
                }
            });
            
            // Reset transition lock after all animations complete
            const maxDelay = staggerDelay + 200;
            setTimeout(() => {
                isTransitioning = false;
                // Clean up classes
                projectCards.forEach(card => {
                    card.classList.remove('fade-in', 'fade-out');
                });
            }, maxDelay);
            
        }, 350); // Wait for fade-out animation to complete
    }
    
    // Change navbar styling on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('#navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Reveal animations when scrolling
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
      // Simple hover effect for project cards is handled by CSS
});
