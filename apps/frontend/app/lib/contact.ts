/** WhatsApp deep links use country code + number without + */
export const SUPPORT_PHONE_WHATSAPP_ID = '918650777709';

export const SUPPORT_PHONE_TEL_HREF = `tel:+${SUPPORT_PHONE_WHATSAPP_ID}`;

/** Human-readable grouping (India mobile) */
export const SUPPORT_PHONE_DISPLAY = '+91 8650777709';

export const SUPPORT_WHATSAPP_URL = `https://wa.me/${SUPPORT_PHONE_WHATSAPP_ID}`;

export function supportWhatsAppUrl(message?: string) {
  if (!message) return SUPPORT_WHATSAPP_URL;
  return `${SUPPORT_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
