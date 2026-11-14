import floralCornerImg from '../assets/images/floral_corner_ivory_1794598746157.jpg';
import royalBotanicalFrameImg from '../assets/images/royal_botanical_frame_1794598747168.jpg';
import botanicalFloralSprayImg from '../assets/images/botanical_floral_spray_1794598747095.jpg';

export const EVENT_IMAGES = {
  floralCorner: floralCornerImg,
  royalBotanicalFrame: royalBotanicalFrameImg,
  botanicalFloralSpray: botanicalFloralSprayImg,
} as const;

export const EVENT_DETAILS = {
  bride: 'Pavithra',
  groom: 'Monish',
  coupleDisplay: 'Pavithra & Monish',
  eventTitle: 'Engagement Ceremony',
  calendarTitle: 'Engagement Ceremony – Pavithra & Monish',
  dateDisplay: 'Monday, November 16, 2026',
  shortDate: '16 November 2026',
  dotDate: '16.11.2026',
  timeDisplay: '6:30 PM onwards',
  timezone: 'Asia/Kolkata',
  timezoneAbbr: 'IST',
  // November 16, 2026, 6:30 PM IST (UTC+05:30)
  targetIsoIST: '2026-11-16T18:30:00+05:30',
  venueName: 'Sri Baalamurugan Thirumana Maaligai',
  venueShortAddress: 'Camp Road Junction, Selaiyur, Chennai - 600073.',
  venueFullAddress:
    'Camp Road Junction, Selaiyur, Chennai - 600073, Tamil Nadu, India.',
  venueFullWithTitle:
    'Sri Baalamurugan Thirumana Maaligai, Camp Road Junction, Selaiyur, Chennai - 600073, Tamil Nadu, India.',
  googleMapsShortUrl: 'https://maps.app.goo.gl/dnnh1dAEevqVnVR17?g_st=iw',
} as const;

export const ROMANTIC_QUOTES = [
  'Two souls, one promise, and a lifetime of beautiful tomorrows.',
  'Where two hearts meet, forever finds its beginning.',
  'Today, a promise. Tomorrow, a lifetime.',
] as const;

export type SceneId =
  | 'cover'
  | 'couple'
  | 'countdown'
  | 'celebration'
  | 'venue';

export const SCENES: ReadonlyArray<{ id: SceneId; label: string; index: string }> = [
  { id: 'cover', label: 'Cover', index: '01' },
  { id: 'couple', label: 'Couple', index: '02' },
  { id: 'celebration', label: 'Date Reveal', index: '03' },
  { id: 'countdown', label: 'Countdown', index: '04' },
  { id: 'venue', label: 'Venue', index: '05' },
];

export function buildGoogleCalendarUrl(): string {
  // 6:30 PM IST = 13:00 UTC; default 2-hour duration ends at 8:30 PM IST = 15:00 UTC
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT_DETAILS.calendarTitle,
    dates: '20261116T130000Z/20261116T150000Z',
    ctz: EVENT_DETAILS.timezone,
    details:
      'You are cordially invited to celebrate the Engagement Ceremony of Pavithra & Monish. Your blessings and presence will make this occasion complete.',
    location: EVENT_DETAILS.venueFullWithTitle,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(durationHours = 2): string {
  const startLocal = '20261116T183000';
  const endHour = 18 + durationHours;
  const endHourStr = String(endHour).padStart(2, '0');
  const endLocal = `20261116T${endHourStr}3000`;
  const uid = 'pavithra-monish-engagement-20261116@invitation';
  const dtStamp = '20261101T000000Z';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pavithra & Monish//Engagement Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Kolkata',
    'X-LIC-LOCATION:Asia/Kolkata',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=Asia/Kolkata:${startLocal}`,
    `DTEND;TZID=Asia/Kolkata:${endLocal}`,
    `SUMMARY:${EVENT_DETAILS.calendarTitle}`,
    `LOCATION:${EVENT_DETAILS.venueFullWithTitle}`,
    'DESCRIPTION:You are cordially invited to celebrate the Engagement Ceremony of Pavithra & Monish at 6:30 PM IST onwards.',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

export function downloadIcsInvitation(durationHours = 2): void {
  const content = buildIcsContent(durationHours);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pavithra-monish-engagement.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function buildGoogleMapsDirectionsUrl(): string {
  const destination = encodeURIComponent(EVENT_DETAILS.venueFullWithTitle);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export function buildGoogleMapsEmbedUrl(): string {
  const query = encodeURIComponent(EVENT_DETAILS.venueFullWithTitle);
  return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
