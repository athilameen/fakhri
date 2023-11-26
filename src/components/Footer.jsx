
const Footer = () => {

    const getDate = new Date();
    const getYear =getDate.getFullYear();

  return (
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-xs-12 fakhri-footer">
                    <p className="copyright">© Copyright {getYear}, Fakhri Professionals&apos; Association, UAE </p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer