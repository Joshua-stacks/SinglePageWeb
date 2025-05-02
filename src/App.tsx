import { useEffect, useState } from "react";
import WeeklyRotation from "./WeeklyRotation";
import MonthlyZones from "./MonthlyZones";
import Announcements from "./Announcements";
import "./App.css";

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="collapsible-section">
      <div className="collapsible-header" onClick={() => setOpen(!open)}>
        {title}
        <span className={`collapsible-icon ${open ? "open" : ""}`}>▶</span>
      </div>
      {open && <div className="collapsible-content">{children}</div>}
    </section>
  );
}

function App() {
  const [price, setPrice] = useState<string>("");
  const [province, setProvince] = useState("QC");
  const [gst, setGst] = useState<number | null>(null);
  const [pst, setPst] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const amount = parseFloat(price);
    if (isNaN(amount)) {
      setGst(null);
      setPst(null);
      setTotal(null);
      return;
    }

    const taxRates: any = {
      QC: { gst: 0.05, pst: 0.09975, label: "GST + QST" },
      ON: { gst: 0.13, pst: 0, label: "HST" },
      BC: { gst: 0.05, pst: 0.07, label: "GST + PST" },
      AB: { gst: 0.05, pst: 0, label: "GST only" },
      MB: { gst: 0.05, pst: 0.07, label: "GST + PST" },
      SK: { gst: 0.05, pst: 0.06, label: "GST + PST" },
      NS: { gst: 0.15, pst: 0, label: "HST" },
      NB: { gst: 0.15, pst: 0, label: "HST" },
      NL: { gst: 0.15, pst: 0, label: "HST" },
      PE: { gst: 0.15, pst: 0, label: "HST" },
    };

    const { gst: gstRate, pst: pstRate } = taxRates[province];
    const gstAmount = Math.round(amount * gstRate * 100) / 100;
    const pstAmount = Math.round(amount * pstRate * 100) / 100;
    const totalWithTax =
      Math.round((amount + gstAmount + pstAmount) * 100) / 100;

    setGst(gstAmount);
    setPst(pstAmount);
    setTotal(totalWithTax);
  }, [price, province]);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1>
            <svg
              width="24"
              height="32"
              viewBox="0 0 81 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <g clipPath="url(#clip1)">
                  <path
                    d="M21.6696 89.5918H0V111H21.6696V89.5918Z"
                    fill="#907843"
                  />
                  <path
                    d="M21.6696 60.3784H0V81.7866H21.6696V60.3784Z"
                    fill="#907843"
                  />
                  <path
                    d="M21.6696 31.165H0V52.5545H21.6696V31.165Z"
                    fill="#907843"
                  />
                  <path
                    d="M51.3347 89.5918H29.665V111H51.3347V89.5918Z"
                    fill="#907843"
                  />
                  <path
                    d="M51.3347 60.3784H29.665V81.7866H51.3347V60.3784Z"
                    fill="#907843"
                  />
                  <path
                    d="M81.0002 89.5918H59.3306V111H81.0002V89.5918Z"
                    fill="#907843"
                  />
                  <path
                    d="M81.0002 60.3784H59.3306V81.7866H81.0002V60.3784Z"
                    fill="#907843"
                  />
                  <path
                    d="M81.0002 31.165H59.3306V52.5545H81.0002V31.165Z"
                    fill="#907843"
                  />
                  <path
                    d="M0.151855 23.2094L10.8822 0L21.6126 23.2094H0.151855Z"
                    fill="#907843"
                  />
                  <path
                    d="M59.5391 23.2094L70.2504 0L80.9998 23.2094H59.5391Z"
                    fill="#907843"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="81" height="111" fill="white" />
                </clipPath>
                <clipPath id="clip1">
                  <rect width="81" height="111" fill="white" />
                </clipPath>
              </defs>
            </svg>
            The Chateau Hub
          </h1>
        </div>
      </header>

      <div style={{ display: "flex", gap: "20px" }}>

        <main style={{ flex: 1 }}>
          <Announcements />

          <CollapsibleSection title="📄 Documents">
            <ul>
              <li>
                <a href="/documents/WireCADFrench.docx" download>
                  Wire Transfer CAD Francais (.docx)
                </a>
              </li>
              <li>
                <a href="/documents/WireCADEnglish.docx" download>
                  Wire Transfer CAD English (.docx)
                </a>
              </li>
              <li>
                <a href="/documents/WireUSD.docx" download>
                  Wire Transfer USD (.docx)
                </a>
              </li>
            </ul>
          </CollapsibleSection>

          <section id="calculator" className="container">
            <h2>Canada Tax Calculator</h2>
            <label>
              Province:
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option value="QC">Quebec</option>
                <option value="ON">Ontario</option>
                <option value="BC">British Columbia</option>
                <option value="AB">Alberta</option>
                <option value="MB">Manitoba</option>
                <option value="SK">Saskatchewan</option>
                <option value="NS">Nova Scotia</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">Newfoundland & Labrador</option>
                <option value="PE">Prince Edward Island</option>
              </select>
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {total !== null && (
              <div className="result fade-in">
                <p>
                  <strong>{province}</strong>
                </p>
                <p>GST/HST: ${gst!.toFixed(2)}</p>
                {pst! > 0 && <p>PST/QST: ${pst!.toFixed(2)}</p>}
                <p className="total">Total: ${total!.toFixed(2)}</p>
              </div>
            )}
          </section>

          <CollapsibleSection title="📅 Weekly Rotation">
            <WeeklyRotation />
          </CollapsibleSection>

          <CollapsibleSection title="🗓️ Store Calendar">
            <div className="calendar-embed">
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FToronto&showPrint=0&showTitle=0&showTabs=0&showTz=0&src=MTVhMzNjYjVlZTA2MGY2YzI0ZWI1YmE1YTM2YmVjYjRkZWJhOTdhOTQ1ZTcwMmNlZTYxZWNmYmQ2MmI5MGE3NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MDZlYTlkZWYzODYwNDhiOTZhNTgyNjljOGQ5NDZkYTk1NDUyZmIxODIwMzVkNWNkNTVlMjU0MDA3ODFlMWVjMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NzhmOTQwMzY5ZGY3MDI0Yzc0OWI4YTFlY2ZjZGRlYjAyNTIzZDczM2FjNWY5ZWJmZjhjMmI2NWJkODBlNzJlOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23C0CA33&color=%23D81B60&color=%23F09300&color=%230B8043"
                style={{ borderWidth: 0, borderRadius: "12px" }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
                title="Château Calendar"
              ></iframe>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="🛠️ Daily Tasks">
            <ul>
              <li>
                <a href="https://form.jotform.com/231564559832262">
                  Inventory Adjustment form
                </a>
              </li>
              <li>
                <a href="https://submit.jotform.com/231506304261242">
                  Inventory Count
                </a>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="🗂️ Monthly Zone Assignments">
            <MonthlyZones />
          </CollapsibleSection>

          <CollapsibleSection title="📦 Warranty + Purchase">
            <ul>
              <li>
                <a href="https://form.jotform.com/250455957815265">KYC Form</a>
              </li>
              <li>
                <a href="https://booster2.richemont.com/">
                  Richemont Warranty (Cartier, IWC, etc.)
                </a>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/ca/app/%CF%89-warranty/id1476821827"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 Open Omega Warranty App
                </a>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="💍 Inquiry">
            <ul>
              <li>
                <a href="https://form.jotform.com/213426593347056">
                  Online Payment Request Form
                </a>
              </li>
              <li>
                <a href="https://form.jotform.com/91535549597271">
                  Sales Inquiry/Order Form
                </a>
              </li>
              <li>
                <a href="https://form.jotform.com/91545011606247">
                  Strap Inquiry/Order Form
                </a>
              </li>
              <li>
                <a href="https://form.jotform.com/222865958155065">
                  Rolex Request Form
                </a>
              </li>
              <li>
                <a href="https://form.jotform.com/232905181275254">
                  Engagement Ring Quote Request
                </a>
              </li>
            </ul>
          </CollapsibleSection>
        </main>
      </div>
    </>
  );
}

export default App;
