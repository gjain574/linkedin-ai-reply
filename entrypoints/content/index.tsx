import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import "@/assets/tailwind.css";
import AssistantIcon from '@/assets/assistant.svg';

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const extensionUI = await createShadowRootUi(ctx, {
      name: 'linkedin-ai-assistant',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        const app = document.createElement('div');
        container.append(app);

        // Create a root on the extension UI container and render a component
        const root = ReactDOM.createRoot(app);
        root.render(<App />);

        return root;
      },
      onRemove: (root) => {
        // Unmount the root when the extension UI is removed
        root?.unmount();
      },
    });

    const initializeUI = () => {
      // The required element is not available immediately, so use a MutationObserver to watch for changes in the DOM
      const observer = new MutationObserver((mutations, obs) => {
        const messageContainers = document.querySelectorAll('.msg-form__msg-content-container.msg-form__message-texteditor');
        messageContainers.forEach((messageContainer) => {
          if (messageContainer && messageContainer instanceof HTMLElement && !messageContainer.querySelector('.linkedin-ai-assistant-icon')) {
            addAssistant(messageContainer);
          }
        });
      });

      // Start observing the document with the configured parameters
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const addAssistant = (container: HTMLElement) => {
      const iconContainerStyles = `
        cursor: pointer; 
        margin-left: 10px; 
        width: 30px; 
        height: 30px; 
        background-color: #fff; 
        border-radius: 100%;
        position: absolute;
        bottom: 20px;
        right: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      `;

      const iconContainer = document.createElement('div');  
      iconContainer.className = 'linkedin-ai-assistant-icon';
      iconContainer.style.cssText = iconContainerStyles;
      container.appendChild(iconContainer);

      const svgIcon = document.createElement('img');
      svgIcon.src = AssistantIcon;
      svgIcon.style.cssText = 'width: 15px; height: 15px; z-index: 20;';
      iconContainer.appendChild(svgIcon);

      // Add a unique identifier to the container
      const uniqueId = `linkedin-ai-assistant-container-${Date.now()}`;
      container.dataset.aiAssistantId = uniqueId;
      console.log('uniqueId', uniqueId);

      // Add click event listener to open modal
      iconContainer.addEventListener('click', () => {
        // Send message to the shadow root
        const shadowRoot = document.querySelector('linkedin-ai-assistant')?.shadowRoot;
        shadowRoot?.dispatchEvent(new CustomEvent('message-to-app', {
          detail: { 
            action: 'openModal',
            containerId: uniqueId
          }
        }));
      });
    }

    // Mount the extension UI
    extensionUI.mount();

    // Initialize UI immediately, the observer will wait for the element
    initializeUI();
  },
});
