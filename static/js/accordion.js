(function() {
    'use strict';
    
    const SELECTORS = {
        accordion: '.accordion',
        trigger: '.accordion-trigger',
        content: '.accordion-content'
    };
    
    function toggleAccordion(item, forceClose = false) {
        const trigger = item.querySelector(SELECTORS.trigger);
        const content = item.querySelector(SELECTORS.content);
        
        if (!trigger || !content) return;
        
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        
        if (forceClose) {
            trigger.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
            content.style.maxHeight = '0';
        } else {
            const newState = !isOpen;
            trigger.setAttribute('aria-expanded', String(newState));
            content.setAttribute('aria-hidden', String(!newState));
            content.style.maxHeight = newState ? content.scrollHeight + 'px' : '0';
        }
    }
    
    function handleTriggerClick(e) {
        const trigger = e.target.closest(SELECTORS.trigger);
        if (!trigger) return;
        
        const accordion = trigger.closest(SELECTORS.accordion);
        if (!accordion) return;
        
        const allowMultiple = accordion.dataset.multiple === 'true';
        
        if (!allowMultiple) {
            const allItems = accordion.querySelectorAll('.accordion-item');
            allItems.forEach(item => {
                if (item.contains(trigger)) {
                    toggleAccordion(item);
                } else {
                    toggleAccordion(item, true);
                }
            });
        } else {
            const item = trigger.closest('.accordion-item');
            toggleAccordion(item);
        }
    }
    
    function handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const trigger = e.target.closest(SELECTORS.trigger);
            if (trigger) {
                e.preventDefault();
                trigger.click();
            }
        }
    }
    
    function init() {
        const accordions = document.querySelectorAll(SELECTORS.accordion);
        
        accordions.forEach(accordion => {
            const items = accordion.querySelectorAll('.accordion-item');
            
            items.forEach(item => {
                const trigger = item.querySelector(SELECTORS.trigger);
                const content = item.querySelector(SELECTORS.content);
                
                if (!trigger || !content) return;
                
                if (trigger.hasAttribute('aria-expanded')) {
                    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                    content.setAttribute('aria-hidden', String(!isExpanded));
                    if (!isExpanded) {
                        content.style.maxHeight = '0';
                    }
                }
            });
        });
        
        document.addEventListener('click', handleTriggerClick);
        document.addEventListener('keydown', handleKeydown);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
