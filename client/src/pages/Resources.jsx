import { CtaBand, PageHero } from '../components/ui';

const GOLDEN = [
  'Call 1930 and register on cybercrime.gov.in. Note the acknowledgement number.',
  'Call your bank’s fraud helpline; request hold/recall; email the same in writing.',
  'Preserve evidence: screenshots, URLs, phone numbers, UPI IDs, chats, call logs.',
  'Change passwords and enable 2FA; check for SIM-swap signs.',
  'List every transaction: date, time, amount, reference, beneficiary details.',
  'File the police complaint/FIR with the full document set.',
  'Do not engage further with the fraudster; do not pay “release fees”.',
  'Consult counsel on freeze confirmation, restitution, and follow-up strategy.',
];

const UNFREEZE = [
  'Bank communication regarding the freeze/lien',
  'Account statement covering the disputed period',
  'Freeze reference: police station/cyber cell, state, acknowledgement or FIR number',
  'KYC set (and business documents where applicable)',
  'Proof of underlying transaction: invoices, delivery, contracts, chats',
  'Tax records reflecting the transaction, where applicable',
  'Any prior representations and replies',
];

export default function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="First-hour checklists"
        lead="What to do in the first hours after fraud — and the documents that unlock account release."
      />
      <section className="section">
        <div className="container checklist-layout">
          <article className="checklist-card">
            <div className="checklist-card__head">
              <div className="eyebrow">Urgent response</div>
              <h2>The Golden-Hour Checklist</h2>
              <p>First response to cyber fraud — act in order.</p>
            </div>
            <ol className="list-check list-check--numbered">
              {GOLDEN.map((item, i) => (
                <li key={item}>
                  <span className="list-check__n">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="checklist-card">
            <div className="checklist-card__head">
              <div className="eyebrow">Prepare documents</div>
              <h2>Account Unfreeze Documents</h2>
              <p>What to assemble before escalation.</p>
            </div>
            <ul className="list-check">
              {UNFREEZE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      <CtaBand title="Need these applied to your matter?" text="Share your facts for a structured consultation." />
    </>
  );
}
