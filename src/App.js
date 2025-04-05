/* global gapi */
import logo from './img/Outfit_Odyssey.webp';
import outfitExample from './img/outfit-example.png'
import './styles/App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [keyWords,setKeyWords] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isGapiReady, setIsGapiReady] = useState(false);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleKeyWordsChange = (e) => {
    setKeyWords(e.target.value);
  };

  // Инициализация gapi
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
      if (typeof gapi !== 'undefined') {
        gapi.load('client', () => {
          loadClient();
          console.log('API loaded successfully')
          setIsGapiReady(true);
        });
      }
    };

    script.onerror = () => setError('Failed to load Google API');
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  // Загрузка клиента Google API
  const loadClient = async () => {
    try {
      await gapi.client.setApiKey("AIzaSyCYIu0bX9jfTkWbPpv1KH37vMCHaasw5-A");
      await gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest");
    } catch (err) {
      setError('Error loading Google API client');
      console.error(err);
    }
  };

  // Выполнение поиска
  const handleSearch = async () => {
    console.log('searching...')
    if (!isGapiReady) return;

    setLoading(true);
    setError(null);

    try {
      const response = await gapi.client.search.cse.list({
        cx: "b62a35661c1294a02",
        q: keyWords,
        searchType: "image",
        ...(selectedColor && { imgDominantColor: selectedColor })

      });
      console.log(response)
      if (response.result.items) {
        setImages(response.result.items);
      } else {
        setImages([]);
        setError('No results found');
      }
    } catch (err) {
      setError('Error during search');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <header>
        <div className="container header-container">
          <div className="logo">
            <img src={logo} alt="Outfit Odyssey Logo" />
            <h1>Outfit Odyssey</h1>
          </div>
          <nav className="nav-menu">
            <a href="#" className="active">
              Home
            </a>
            <a href="#">Explore Styles</a>
            <a href="#">Color Palettes</a>
            <a href="#">Cultures</a>
            <a href="#">Seasons</a>
            <a href="#">About</a>
          </nav>
          <div className="nav-icons">
            <span />
            <div className="hamburger">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div>
          <div className="filter-section">
            <label htmlFor="imgDominantColor">Dominant Color:</label>
            <select
              id="imgDominantColor"
              value={selectedColor}
              onChange={handleColorChange}
              className="ng-valid ng-dirty ng-touched"
            >
              <option value="">Select dominant color</option>
              <option value="imgDominantColorUndefined">Undefined</option>
              <option value="black">Black</option>
              <option value="blue">Blue</option>
              <option value="brown">Brown</option>
              <option value="gray">Gray</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="purple">Purple</option>
              <option value="red">Red</option>
              <option value="teal">Teal</option>
              <option value="white">White</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
          <div>
            <input type="text" name="keywords" id="keywords" placeholder="Enter keywords" required
              value={keyWords}
              onChange={handleKeyWordsChange} />
          </div>
          <button onClick={loadClient}>Load Client</button>
          <button
            onClick={handleSearch}
            disabled={!isGapiReady || loading}
          >
            {loading ? 'Searching...' : 'Search Images'}
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        <div className="image-grid">
          {images.map((item, index) => (
            <div key={index} className="image-item">
              <img
                src={item.link}
                alt={item.title}
                onError={(e) => e.target.style.display = 'none'}
              />
              <p>{item.title}</p>
            </div>
          ))}
        </div>

        <section className="hero">
          <div className="container hero-content">
            <h2>DISCOVER YOUR STYLE JOURNEY</h2>
            <h1>Outfit Odyssey</h1>
            <p>
              Explore outfit inspirations from around the world, curated by culture,
              style, and color palettes
            </p>
            <a href="#" className="btn">
              START EXPLORING
            </a>
          </div>
        </section>
        <section className="container">
          <div className="section-title">
            <h2>Global Style Inspiration</h2>
          </div>
          <div className="filter-container">
            <div className="filter-categories">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Minimalist</button>
              <button className="filter-btn">Bohemian</button>
              <button className="filter-btn">Streetwear</button>
              <button className="filter-btn">Scandinavian</button>
              <button className="filter-btn">Japanese</button>
              <button className="filter-btn">West African</button>
              <button className="filter-btn">South Asian</button>
              <button className="filter-btn">Vintage</button>
            </div>
            <div className="color-filters">
              <div className="color-filter active" style={{ backgroundColor: "#000000" }} />
              <div className="color-filter" style={{ backgroundColor: "#FFFFFF", border: "1px solid #ddd" }} />
              <div className="color-filter" style={{ backgroundColor: "#8B4513" }} />
              <div className="color-filter" style={{ backgroundColor: "#0000FF" }} />
              <div className="color-filter" style={{ backgroundColor: "#FF0000" }} />
              <div className="color-filter" style={{ backgroundColor: "#FFFF00" }} />
              <div className="color-filter" style={{ backgroundColor: "#008000" }} />
              <div className="color-filter" style={{ backgroundColor: "#FFA500" }} />
              <div className="color-filter" style={{ backgroundColor: "#800080" }} />
            </div>
          </div>
          <div className="outfit-grid">
            {/* Outfit Card 1 */}
            <div className="outfit-card">
              <div className="outfit-img">
                <img
                  src={outfitExample}
                  alt="Minimalist Neutral Outfit"
                />
                <div className="outfit-overlay">
                  <div className="overlay-content">
                    <h3>Minimalist Layering Outfit</h3>
                    <p>Perfect for winter urban settings</p>
                  </div>
                </div>
                <div className="outfit-actions">
                  <div className="action-btn">↓</div>
                  <div className="action-btn">P</div>
                </div>
              </div>
              <div className="outfit-info">
                <h3 className="outfit-title">Minimalist Layering</h3>
                <p className="outfit-style">Scandinavian • Winter</p>
                <div className="outfit-colors">
                  <span className="outfit-color" style={{ backgroundColor: "#f0e4d7" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#4d4d4d" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#7b6b5f" }} />
                </div>
              </div>
            </div>
            {/* Outfit Card 2 */}
            <div className="outfit-card">
              <div className="outfit-img">
                <img src={outfitExample} alt="Streetwear Urban Outfit" />
                <div className="outfit-overlay">
                  <div className="overlay-content">
                    <h3>Urban Streetwear Ensemble</h3>
                    <p>Bold statement pieces for city life</p>
                  </div>
                </div>
                <div className="outfit-actions">
                  <div className="action-btn">↓</div>
                  <div className="action-btn">P</div>
                </div>
              </div>
              <div className="outfit-info">
                <h3 className="outfit-title">Urban Streetwear</h3>
                <p className="outfit-style">Streetwear • Fall</p>
                <div className="outfit-colors">
                  <span className="outfit-color" style={{ backgroundColor: "#000000" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#ff6b00" }} />
                </div>
              </div>
            </div>
            {/* Outfit Card 3 */}
            <div className="outfit-card">
              <div className="outfit-img">
                <img
                  src={outfitExample}
                  alt="Japanese Inspired Outfit"
                />
                <div className="outfit-overlay">
                  <div className="overlay-content">
                    <h3>Modern Japanese Inspired</h3>
                    <p>Contemporary take on traditional elements</p>
                  </div>
                </div>
                <div className="outfit-actions">
                  <div className="action-btn">↓</div>
                  <div className="action-btn">P</div>
                </div>
              </div>
              <div className="outfit-info">
                <h3 className="outfit-title">Japanese Fusion</h3>
                <p className="outfit-style">Japanese • Spring</p>
                <div className="outfit-colors">

                  <span className="outfit-color" style={{ backgroundColor: "#e5e5e5" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#000000" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#8d1c1c" }} />
                </div>
              </div>
            </div>
            {/* Outfit Card 4 */}
            <div className="outfit-card">
              <div className="outfit-img">
                <img src={outfitExample} alt="Bohemian Summer Outfit" />
                <div className="outfit-overlay">
                  <div className="overlay-content">
                    <h3>Bohemian Summer Flow</h3>
                    <p>Free-spirited summer style</p>
                  </div>
                </div>
                <div className="outfit-actions">
                  <div className="action-btn">↓</div>
                  <div className="action-btn">P</div>
                </div>
              </div>
              <div className="outfit-info">
                <h3 className="outfit-title">Summer Boho</h3>
                <p className="outfit-style">Bohemian • Summer</p>
                <div className="outfit-colors">

                  <span className="outfit-color" style={{ backgroundColor: "#f3e9dc" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#d17e50" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#7da880" }} />
                </div>
              </div>
            </div>
            {/* Outfit Card 5 */}
            <div className="outfit-card">
              <div className="outfit-img">
                <img
                  src={outfitExample}
                  alt="West African Inspired Outfit"
                />
                <div className="outfit-overlay">
                  <div className="overlay-content">
                    <h3>Ankara Fusion Look</h3>
                    <p>Contemporary take on traditional patterns</p>
                  </div>
                </div>
                <div className="outfit-actions">
                  <div className="action-btn">↓</div>
                  <div className="action-btn">P</div>
                </div>
              </div>
              <div className="outfit-info">
                <h3 className="outfit-title">Modern Ankara</h3>
                <p className="outfit-style">West African • All Seasons</p>
                <div className="outfit-colors">
                  <span className="outfit-color" style={{ backgroundColor: "#ffd700" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#1a7b37" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#0073cf" }} />
                </div>
              </div>
            </div>
            {/* Outfit Card 6 */}
            <div className="outfit-card">
              <div className="outfit-img">
                <img
                  src={outfitExample}
                  alt="South Asian Fusion Outfit"
                />
                <div className="outfit-overlay">
                  <div className="overlay-content">
                    <h3>Indo-Western Ensemble</h3>
                    <p>Blending traditional and modern elements</p>
                  </div>
                </div>
                <div className="outfit-actions">
                  <div className="action-btn">↓</div>
                  <div className="action-btn">P</div>
                </div>
              </div>
              <div className="outfit-info">
                <h3 className="outfit-title">Indo-Western</h3>
                <p className="outfit-style">South Asian • Festive</p>
                <div className="outfit-colors">
                  <span className="outfit-color" style={{ backgroundColor: "#d3a760" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#9c0e37" }} />
                  <span className="outfit-color" style={{ backgroundColor: "#1d4c72" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="load-more">
            <button className="load-more-btn">DISCOVER MORE</button>
          </div>
        </section>
        <section className="featured-section">
          <div className="container">
            <div className="section-title">
              <h2>Why Outfit Odyssey</h2>
            </div>
            <div className="featured-grid">
              <div className="featured-card">
                <div className="featured-icon">🌍</div>
                <h3 className="featured-title">Global Inspiration</h3>
                <p className="featured-text">
                  Discover outfit styles from cultures around the world, from
                  Scandinavian minimalism to vibrant West African patterns.
                </p>
              </div>
              <div className="featured-card">
                <div className="featured-icon">🎨</div>
                <h3 className="featured-title">Color Exploration</h3>
                <p className="featured-text">
                  Find outfits that match your preferred color palette, from earth
                  tones to bold primaries and everything in between.
                </p>
              </div>
              <div className="featured-card">
                <div className="featured-icon">💾</div>
                <h3 className="featured-title">Save &amp; Share</h3>
                <p className="featured-text">
                  Download outfit inspiration for later or save directly to your
                  Pinterest boards with a simple click.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Outfit Odyssey</h3>
              <p>
                Your global destination for outfit inspiration across cultures,
                styles, and color palettes.
              </p>
              <div className="social-links">
                <a href="#">FB</a>
                <a href="#">IG</a>
                <a href="#">PT</a>
                <a href="#">TW</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <a href="#">Home</a>
              <a href="#">Explore Styles</a>
              <a href="#">Color Palettes</a>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-section">
              <h3>Style Categories</h3>
              <a href="#">Minimalist</a>
              <a href="#">Bohemian</a>
              <a href="#">Streetwear</a>
              <a href="#">Scandinavian</a>
              <a href="#">Japanese</a>
              <a href="#">West African</a>
            </div>
            <div className="footer-section">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for new style inspiration.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <button>→</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Outfit Odyssey. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <div className="back-to-top">↑</div>
    </>

  );
}

export default App;
