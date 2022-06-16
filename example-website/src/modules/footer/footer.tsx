import React from "react";

import { Button } from "antd";

import { Link } from "react-router-dom";

export class Footer extends React.Component {
  render() {
    return (
      <>
        <div className="footer">
          <Button type="text" className="footer-item copyright">
            © 2021 Christian Wallenwein
          </Button>

          <Link to="/privacy">
            <Button type="text" className="footer-item">
              Privacy Policy
            </Button>
          </Link>

          <Link to="/imprint">
            <Button type="text" className="footer-item">
              Imprint
            </Button>
          </Link>
          {/*<Link to="/terms"><Button type="text" className="footer-item">
        Terms
    </Button></Link>*/}
        </div>
      </>
    );
  }
}
