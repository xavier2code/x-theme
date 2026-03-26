(function() {
    'use strict';
    
    const SELECTORS = {
        modal: '.modal',
        modalOpen: '[data-modal-open]',
        modalClose: '.modal-close',
        modalOverlay: '.modal-overlay',
        modalContent: '.modal-content'
    };
    
    let activeModal = null;
    let previousFocus = null;
    
    function openModal(modal) {
        if (!modal) return;
        
        previousFocus = document.activeElement;
        activeModal = modal;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        const closeBtn = modal.querySelector(SELECTORS.modalClose);
        if (closeBtn) {
            closeBtn.focus();
        }
        
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
    
    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('open');
        document.body.style.overflow = '';
        activeModal = null;
        
        if (previousFocus) {
            previousFocus.focus();
            previousFocus = null;
        }
    }
    
    function handleOpenClick(e) {
        const trigger = e.target.closest(SELECTORS.modalOpen);
        if (!trigger) return;
        
        e.preventDefault();
        const modalId = trigger.dataset.modalOpen;
        if (!modalId) return;
        
        const modal = document.getElementById(modalId);
        if (modal) {
            openModal(modal);
        }
    }
    
    function handleCloseClick(e) {
        const closeBtn = e.target.closest(SELECTORS.modalClose);
        if (!closeBtn) return;
        
        const modal = closeBtn.closest(SELECTORS.modal);
        if (modal) {
            closeModal(modal);
        }
    }
    
    function handleOverlayClick(e) {
        if (!e.target.classList.contains('modal-overlay')) return;
        
        const modal = e.target.closest(SELECTORS.modal);
        if (modal) {
            closeModal(modal);
        }
    }
    
    function handleKeydown(e) {
        if (!activeModal) return;
        
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal(activeModal);
            return;
        }
        
        if (e.key === 'Tab') {
            const focusableElements = activeModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) return;
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
    
    function init() {
        document.addEventListener('click', handleOpenClick);
        document.addEventListener('click', handleCloseClick);
        document.addEventListener('click', handleOverlayClick);
        document.addEventListener('keydown', handleKeydown);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
