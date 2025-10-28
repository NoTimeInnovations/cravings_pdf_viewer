class CustomFooter extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          footer {
            background: #1a202c;
            color: white;
            padding: 2rem;
            text-align: center;
            margin-top: auto;
          }
          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: left;
          }
          .footer-section h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #f59e0b;
          }
          .footer-section ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .footer-section li {
            margin-bottom: 0.5rem;
          }
          .footer-section a {
            color: #e2e8f0;
            text-decoration: none;
            transition: color 0.2s;
          }
          .footer-section a:hover {
            color: #f59e0b;
          }
          .social-icons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }
          .social-icons a {
            color: white;
          }
          .copyright {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #2d3748;
            font-size: 0.875rem;
          }
          @media (max-width: 768px) {
            .footer-content {
              grid-template-columns: 1fr;
              text-align: center;
            }
            .social-icons {
              justify-content: center;
            }
          }
        </style>
        <footer>
          <div class="footer-content">
            <div class="footer-section">
              <h3>Gourmet Gallery</h3>
              <p>Experience culinary excellence with our carefully crafted menus and premium ingredients.</p>
              <div class="social-icons">
                <a href="#"><i data-feather="facebook"></i></a>
                <a href="#"><i data-feather="instagram"></i></a>
                <a href="#"><i data-feather="twitter"></i></a>
              </div>
            </div>
            <div class="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#">Menus</a></li>
                <li><a href="#">Reservations</a></li>
                <li><a href="#">Gallery</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>Contact</h3>
              <ul>
                <li><a href="#"><i data-feather="map-pin"></i> 123 Gourmet Street</a></li>
                <li><a href="#"><i data-feather="phone"></i> (123) 456-7890</a></li>
                <li><a href="#"><i data-feather="mail"></i> info@gourmetgallery.com</a></li>
              </ul>
            </div>
          </div>
          <div class="copyright">
            <p>&copy; ${new Date().getFullYear()} Gourmet Gallery. All rights reserved.</p>
          </div>
        </footer>
      `;
    }
  }
  customElements.define('custom-footer', CustomFooter);