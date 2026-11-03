import { useContent } from '../cms/ContentContext';
import { siteWhatsApp } from '../cms/utils';

export default function WhatsAppFloat() {
  const { content } = useContent();
  return (
    <a
      className="wa-float"
      href={siteWhatsApp(content)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title={content.shared?.whatsappCta || 'WhatsApp Now'}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 1C5.8 1 .8 6 0.8 12.3c0 2 .5 3.9 1.5 5.6L1 23l5.3-1.4c1.6.9 3.4 1.3 5.3 1.3h0c6.3 0 11.4-5.1 11.4-11.4 0-3-1.2-5.9-3.5-8zM12.1 21.1h0c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.1.8.8-3-.2-.3a9.4 9.4 0 0 1-1.4-5c0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.6 2.7a9.3 9.3 0 0 1 2.8 6.7c0 5.2-4.3 9.4-9.4 9.4zm5.4-7c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.3 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}
