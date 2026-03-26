(function() {
    'use strict';
    
    const SELECTORS = {
        tooltip: '.tooltip',
        tooltipText: '.tooltip-text'
    };
    
    function getPosition(tooltip, tooltipEl) {
        const rect = tooltip.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();
        const position = tooltipEl.dataset.position || 'top';
        
        let top, left;
        
        switch (position) {
            case 'bottom':
                top = rect.bottom + window.scrollY + 8;
                left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + window.scrollY + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left + window.scrollX - tooltipRect.width - 8;
                break;
            case 'right':
                top = rect.top + window.scrollY + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + window.scrollX + 8;
                break;
            case 'top':
            default:
                top = rect.top + window.scrollY - tooltipRect.height - 8;
                left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);
                break;
        }
        
        if (left < 8) left = 8;
        if (left + tooltipRect.width > window.innerWidth - 8) {
            left = window.innerWidth - tooltipRect.width - 8;
        }
        
        return { top, left };
    }
    
    function updatePosition(tooltip) {
        const tooltipText = tooltip.querySelector(SELECTORS.tooltipText);
        if (!tooltipText) return;
        
        const pos = getPosition(tooltip, tooltipText);
        tooltipText.style.top = pos.top + 'px';
        tooltipText.style.left = pos.left + 'px';
    }
    
    function handleMouseEnter(e) {
        const tooltip = e.target.closest(SELECTORS.tooltip);
        if (!tooltip) return;
        
        const tooltipText = tooltip.querySelector(SELECTORS.tooltipText);
        if (!tooltipText) return;
        
        tooltipText.style.position = 'fixed';
        updatePosition(tooltip);
    }
    
    function handleFocus(e) {
        const tooltip = e.target.closest(SELECTORS.tooltip);
        if (!tooltip) return;
        
        const tooltipText = tooltip.querySelector(SELECTORS.tooltipText);
        if (!tooltipText) return;
        
        tooltipText.style.position = 'fixed';
        updatePosition(tooltip);
    }
    
    function init() {
        const tooltips = document.querySelectorAll(SELECTORS.tooltip);
        
        tooltips.forEach(tooltip => {
            const tooltipText = tooltip.querySelector(SELECTORS.tooltipText);
            if (!tooltipText) return;
            
            if (!tooltipText.hasAttribute('role')) {
                tooltipText.setAttribute('role', 'tooltip');
            }
            
            if (!tooltip.hasAttribute('tabindex')) {
                tooltip.setAttribute('tabindex', '0');
            }
        });
        
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('focusin', handleFocus, true);
        window.addEventListener('resize', () => {
            const activeTooltips = document.querySelectorAll(SELECTORS.tooltip + ':hover, ' + SELECTORS.tooltip + ':focus-within');
            activeTooltips.forEach(updatePosition);
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
