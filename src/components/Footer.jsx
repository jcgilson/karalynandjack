export default function Footer() {
  return (
    <footer className="footer">
      <video className="bg-media" src="/assets/video/footer.mp4" autoPlay muted loop playsInline />
      <p className="footer-script">grazie, ci vediamo in italia</p>
      <div className="footer-meta">
        <p>
          © 2027 <em>Karalyn &amp; Jack</em>
        </p>
        <p>
          <em>
            Site by{" "}
            <a href="https://coltond.com" target="_blank" rel="noopener noreferrer">
              Colton D – Design
            </a>
          </em>
        </p>
      </div>
    </footer>
  );
}
