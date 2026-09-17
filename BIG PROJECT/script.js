// ============================================
// Comprehensive JavaScript Utility Script
// Supports index.html and style.css functionality
// ============================================

/**
 * DOM Ready Handler - Ensures all DOM elements are loaded before execution
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  initializeApp();
});

/**
 * Initialize Application - Main entry point for all functionality
 */
function initializeApp() {
  setupEventListeners();
  setupNavigationMenu();
  setupFormValidation();
  setupInteractiveElements();
  setupThemeToggle();
  setupScrollEffects();
  setupModalFunctionality();
  setupDataAttributes();
  console.log('Application initialized successfully');
}

/**
 * Setup Event Listeners - Attach click, hover, and input events
 */
function setupEventListeners() {
  // Button click handlers
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
    button.addEventListener('mouseover', handleButtonHover);
    button.addEventListener('mouseout', handleButtonUnhover);
  });

  // Link handlers
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });

  // Window resize handler
  window.addEventListener('resize', handleWindowResize);
  
  // Window scroll handler
  window.addEventListener('scroll', handleWindowScroll);
}

/**
 * Handle Button Click Events
 */
function handleButtonClick(event) {
  const button = event.target;
  const actionType = button.getAttribute('data-action');
  
  button.classList.add('clicked');
  setTimeout(() => button.classList.remove('clicked'), 300);
  
  console.log('Button clicked:', button.textContent, 'Action:', actionType);
  
  if (actionType === 'submit') {
    event.preventDefault();
  }
}

/**
 * Handle Button Hover Effect
 */
function handleButtonHover(event) {
  event.target.classList.add('hover-state');
}

/**
 * Handle Button Unhover Effect
 */
function handleButtonUnhover(event) {
  event.target.classList.remove('hover-state');
}

/**
 * Handle Link Click with Navigation
 */
function handleLinkClick(event) {
  const link = event.target;
  const href = link.getAttribute('href');
  
  if (href && href.startsWith('#')) {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      console.log('Navigated to:', targetId);
    }
  }
}

/**
 * Setup Navigation Menu - Responsive menu handling
 */
function setupNavigationMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  function toggleMobileMenu() {
    if (navMenu) {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    }
  }
  
  function closeMobileMenu() {
    if (navMenu) {
      navMenu.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
    }
  }
}

/**
 * Setup Form Validation - Validate form inputs and display errors
 */
function setupFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', validateForm);
  });
  
  function validateForm(event) {
    event.preventDefault();
    
    const inputs = this.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
        showError(input);
      } else {
        clearError(input);
      }
    });
    
    if (isValid) {
      console.log('Form is valid');
      // Process form submission
      submitForm(this);
    }
  }
  
  function validateInput(input) {
    const value = input.value.trim();
    const type = input.getAttribute('type');
    
    if (!value) return false;
    if (type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (type === 'tel') return /^[\d\-\+\s\(\)]{10,}$/.test(value);
    
    return true;
  }
  
  function showError(input) {
    input.classList.add('input-error');
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    errorMsg.textContent = `${input.name} is required`;
    input.parentNode.appendChild(errorMsg);
  }
  
  function clearError(input) {
    input.classList.remove('input-error');
    const errorMsg = input.parentNode.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
  }
}

/**
 * Submit Form - Handle form data submission
 */
function submitForm(form) {
  const formData = new FormData(form);
  console.log('Form submitted with data:', Object.fromEntries(formData));
  
  // Here you can add AJAX submission or other logic
  alert('Form submitted successfully!');
  form.reset();
}

/**
 * Setup Interactive Elements - Animations and interactions
 */
function setupInteractiveElements() {
  const interactiveElements = document.querySelectorAll('[data-interactive]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('click', handleInteractiveClick);
    element.addEventListener('mouseover', addActiveClass);
    element.addEventListener('mouseout', removeActiveClass);
  });
  
  function handleInteractiveClick(event) {
    const action = this.getAttribute('data-action');
    console.log('Interactive action:', action);
    toggleClass(this, 'toggled');
  }
  
  function addActiveClass() {
    this.classList.add('active');
  }
  
  function removeActiveClass() {
    this.classList.remove('active');
  }
}

/**
 * Setup Theme Toggle - Dark/Light mode switching
 */
function setupThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', switchTheme);
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  }
  
  function switchTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

/**
 * Setup Scroll Effects - Add animations on scroll
 */
function setupScrollEffects() {
  const scrollElements = document.querySelectorAll('[data-scroll]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  scrollElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Setup Modal Functionality - Open and close modals
 */
function setupModalFunctionality() {
  const modals = document.querySelectorAll('.modal');
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('.modal-close');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });
  
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  
  modals.forEach(modal => {
    modal.addEventListener('click', handleModalBackdropClick);
  });
  
  function openModal(event) {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.classList.add('modal-open');
    }
  }
  
  function closeModal(event) {
    const modal = this.closest('.modal');
    if (modal) {
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  }
  
  function handleModalBackdropClick(event) {
    if (event.target === this) {
      this.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  }
}

/**
 * Setup Data Attributes - Process custom data attributes
 */
function setupDataAttributes() {
  const dataElements = document.querySelectorAll('[data-*]');
  dataElements.forEach(element => {
    const dataset = element.dataset;
    if (dataset.tooltip) {
      element.setAttribute('title', dataset.tooltip);
    }
  });
}

/**
 * Utility: Toggle Class on Element
 */
function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

/**
 * Handle Window Resize
 */
function handleWindowResize() {
  const width = window.innerWidth;
  console.log('Window resized to:', width);
  
  if (width < 768) {
    document.body.classList.add('mobile');
    document.body.classList.remove('desktop');
  } else {
    document.body.classList.add('desktop'); 
    document.body.classList.remove('mobile');
  }
}

/**
 * Handle Window Scroll
 */
function handleWindowScroll() {
  const scrollTop = window.scrollY;
  const header = document.querySelector('header');
  
  if (scrollTop > 100 && header) {
    header.classList.add('sticky');
  } else if (header) {
    header.classList.remove('sticky');
  }
}

/**
 * Utility: Add Animation to Element
 */
function addAnimation(element, animationName, duration = 600) {
  element.style.animation = `${animationName} ${duration}ms ease-in-out`;
}

/**
 * Utility: Show Notification
 */
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Export functions for external use
window.appUtils = {
  toggleClass,
  addAnimation,
  showNotification,
  submitForm
};
