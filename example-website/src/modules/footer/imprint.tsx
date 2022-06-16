import { Back } from "./back";

export const Imprint = () => {
  return (
    <>
      <Back />
      <div className="legal">
        <h1> Imprint </h1>

        <p>
          {" "}
          <b> Name </b>
          <br />
          Christian Wallenwein{" "}
        </p>

        <p>
          {" "}
          <b> Address </b>
          <br />
          Willi-Graf Straße 17, Room 718 <br />
          80805 Munich <br />
          Germany{" "}
        </p>

        <p>
          {" "}
          <b> Contact </b>
          <br />
          Email:{" "}
          <a href="mailto:offsett.co@gmail.com"> offsett.co@gmail.com </a>{" "}
        </p>

        <p>
          {" "}
          <b> Dispute Resolution </b>
          <br />
          The EU Commission provides a platform for out-of-court online dispute
          resolution (ODR platform), which can be accessed at{" "}
          <a href="https://ec.europa.eu/consumers/odr">
            {" "}
            https://ec.europa.eu/consumers/odr
          </a>
          . We are willing to participate in dispute resolution proceedings at
          the following consumer arbitration boards:{" "}
        </p>

        <div
          style={{
            paddingLeft: "25px",
          }}
        >
          <p>
            Außergerichtliche Streitbeilegungsstelle für Verbraucher und
            Unternehmer e. V.
            <br />
            Gohliser Str. 6<br />
            04105 Leipzig
            <br />
            Germany
            <br />
            <a href="https://www.streitbeilegungsstelle.org">
              {" "}
              https://www.streitbeilegungsstelle.org{" "}
            </a>
          </p>

          <p>
            Universalschlichtungsstelle des Bundes - Zentrum für Schlichtung e.
            V.
            <br />
            Straßburger Str. 8<br />
            77694 Kehl
            <br />
            Germany
            <br />
            <a href="https://www.universalschlichtungsstelle.de">
              {" "}
              https://www.universalschlichtungsstelle.de{" "}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
