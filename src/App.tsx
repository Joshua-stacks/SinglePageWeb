import { useEffect, useState } from "react";
import WeeklyRotation from "./WeeklyRotation";
import "./App.css";

type Province =
  | "QC"
  | "ON"
  | "BC"
  | "AB"
  | "MB"
  | "SK"
  | "NS"
  | "NB"
  | "NL"
  | "PE";

interface TaxInfo {
  gst: number;
  pst: number;
  label: string;
}

const taxRates: Record<Province, TaxInfo> = {
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

function App() {
  const [price, setPrice] = useState<string>("");
  const [province, setProvince] = useState<Province>("QC");
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

    const { gst: gstRate, pst: pstRate } = taxRates[province];

    const gstAmount = amount * gstRate;
    const pstAmount = amount * pstRate;
    const totalWithTax = amount + gstAmount + pstAmount;

    setGst(gstAmount);
    setPst(pstAmount);
    setTotal(totalWithTax);
  }, [price, province]);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1>🧮 Tax Tools</h1>
        </div>
      </header>

      <section className="documents-section">
        <h2>📄 Documents</h2>
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
      </section>

      <div className="container">
        <h2>Canada Tax Calculator</h2>

        <label>
          Province:
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value as Province)}
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
              <strong>{taxRates[province].label}</strong>
            </p>
            <p>
              GST/HST: $
              {gst!.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            {taxRates[province].pst > 0 && (
              <p>
                PST/QST: $
                {pst!.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
            <p className="total">
              Total: $
              {total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        )}
      </div>
        <WeeklyRotation />
      <section>
        <h2>🛠️ Daily Tasks</h2>
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
      </section>

      <section>
        <h2>📦 Warranty + Purchase</h2>
        <ul>
          <li>
            <a href="https://form.jotform.com/250455957815265">KYC Form</a>
          </li>
          <li>
            <a href="https://booster2.richemont.com/">
              Richemont Warranty (Cartier, IWC, Panarai, Piaget, JLC, Baume &
              Mercier)
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
      </section>

      <section>
        <h2>💍 Inquiry + Purchases</h2>
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
      </section>
    </>
  );
}

export default App;
