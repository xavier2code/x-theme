(function() {
    'use strict';
    
    const SELECTORS = {
        tabs: '.tabs',
        tabList: '.tab-list',
        tabBtn: '.tab-btn',
        tabPanel: '.tab-panel'
    };
    
    function activateTab(tabBtn) {
        const tabs = tabBtn.closest(SELECTORS.tabs);
        if (!tabs) return;
        
        const tabBtns = tabs.querySelectorAll(SELECTORS.tabBtn);
        const tabPanels = tabs.querySelectorAll(SELECTORS.tabPanel);
        
        tabBtns.forEach(btn => {
            const isSelected = btn === tabBtn;
            btn.setAttribute('aria-selected', String(isSelected));
            btn.setAttribute('tabindex', isSelected ? '0' : '-1');
        });
        
        const targetId = tabBtn.getAttribute('aria-controls');
        tabPanels.forEach(panel => {
            const isTarget = panel.id === targetId;
            panel.setAttribute('aria-hidden', String(!isTarget));
        });
    }
    
    function handleClick(e) {
        const tabBtn = e.target.closest(SELECTORS.tabBtn);
        if (!tabBtn) return;
        
        activateTab(tabBtn);
    }
    
    function handleKeydown(e) {
        const tabBtn = e.target.closest(SELECTORS.tabBtn);
        if (!tabBtn) return;
        
        const tabs = tabBtn.closest(SELECTORS.tabs);
        if (!tabs) return;
        
        const tabBtns = Array.from(tabs.querySelectorAll(SELECTORS.tabBtn));
        const currentIndex = tabBtns.indexOf(tabBtn);
        
        let newIndex = -1;
        
        if (e.key === 'ArrowRight') {
            newIndex = (currentIndex + 1) % tabBtns.length;
        } else if (e.key === 'ArrowLeft') {
            newIndex = (currentIndex - 1 + tabBtns.length) % tabBtns.length;
        } else if (e.key === 'Home') {
            newIndex = 0;
        } else if (e.key === 'End') {
            newIndex = tabBtns.length - 1;
        }
        
        if (newIndex >= 0) {
            e.preventDefault();
            tabBtns[newIndex].focus();
            activateTab(tabBtns[newIndex]);
        }
    }
    
    function init() {
        const tabs = document.querySelectorAll(SELECTORS.tabs);
        
        tabs.forEach(tab => {
            const tabBtns = tab.querySelectorAll(SELECTORS.tabBtn);
            const tabPanels = tab.querySelectorAll(SELECTORS.tabPanel);
            
            tabBtns.forEach(btn => {
                if (!btn.hasAttribute('role')) {
                    btn.setAttribute('role', 'tab');
                }
                
                if (!btn.hasAttribute('tabindex')) {
                    const isSelected = btn.getAttribute('aria-selected') === 'true';
                    btn.setAttribute('tabindex', isSelected ? '0' : '-1');
                }
            });
            
            tabPanels.forEach(panel => {
                if (!panel.hasAttribute('role')) {
                    panel.setAttribute('role', 'tabpanel');
                }
            });
        });
        
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeydown);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
