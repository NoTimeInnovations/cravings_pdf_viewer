class CustomNavbar extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          nav {
            background: linear-gradient(135deg, #92400e 0%, #b45309 100%);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .logo { 
            color: white; 
            font-weight: bold; 
            font-size: 1.5rem;
            font-family: 'Playfair Display', serif;
          }
          ul { 
            display: flex; 
            gap: 2rem; 
            list-style: none; 
            margin: 0; 
            padding: 0; 
          }
          a { 
            color: white; 
            text-decoration: none; 
            transition: opacity 0.2s;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          a:hover { 
            opacity: 0.8; 
          }
          @media (max-width: 768px) {
            nav {
              flex-direction: column;
              padding: 1rem;
            }
            ul {
              margin-top: 1rem;
              gap: 1rem;
            }
          }
        </style>
        <nav>
          <div class="logo">Cravings</div>
        </nav>
      `;
    }
  }
  customElements.define('custom-navbar', CustomNavbar);