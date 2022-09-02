import "../styles/footer.css";

const Footer = () => {
  return (
    <footer id="sticky-footer" className="flex-shrink-0 py-4 text-white-50">
      <div className="container text-center">
        <small>Copyright {new Date().getFullYear()} &copy; Groupomania</small>
      </div>
    </footer>
  );
};

export default Footer;
