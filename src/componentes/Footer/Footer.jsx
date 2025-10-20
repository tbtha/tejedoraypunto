export function Footer() {
  return (
    <footer className="pt-4 border-bottom-dark mt-5">
      <div className="container">
        <hr className="my-4" />
        <div className="row">
          <div className="col text-center">
            <div className="col mt-3 text-center">
              <a href="https://www.instagram.com/tejedoraypunto/">
                <img src="/img/otros/icons8-instagram-30.png" alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/share/173dn2Z2mc/?mibextid=wwXIfr">
                <img src="/img/otros/icons8-facebook-30.png" alt="Facebook" />
              </a>
            </div>
            <p className="mt-3 mb-0">
              © 2020 | by <a href="https://tbtha.github.io/tbtha">tbtha.</a>
            </p>
          </div>
        </div>
        <hr className="my-4" />
      </div>
    </footer>
  );
}