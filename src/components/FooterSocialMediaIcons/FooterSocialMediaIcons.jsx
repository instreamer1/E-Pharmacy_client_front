import css from './FooterSocialMediaIcons.module.css'


const FooterSocialMediaIcons = () => {
    return (
      <ul>
        <li>
          <a href="https://www.facebook.com/goITclub/" target="_blank" rel="noopener noreferrer">
            <img src="/path/to/facebook.svg" alt="Facebook" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/goitclub/" target="_blank" rel="noopener noreferrer">
            <img src="/path/to/instagram.svg" alt="Instagram" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/c/GoIT" target="_blank" rel="noopener noreferrer">
            <img src="/path/to/youtube.svg" alt="YouTube" />
          </a>
        </li>
      </ul>
    );
  };

  export default FooterSocialMediaIcons