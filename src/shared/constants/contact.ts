/**
 * @fileoverview How to reach EPOCH. One source for the footer and the contact page.
 */

export const CONTACT = {
  email: 'operator@epoch.sh',
  phone: '+1 (704) 314-5262',
  phoneHref: 'tel:+17043145262',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/epoch-software-services/' },
    { label: 'GitHub', href: 'https://github.com/EPOCH-SOFTWARE' },
  ],
  offices: [
    {
      city: 'Charlotte, NC',
      address: ['11807 Park Road', 'Charlotte, NC 28226', 'United States'],
      mapHref: 'https://maps.google.com/maps?q=11807+Park+Road+Charlotte+NC+28226',
    },
    {
      city: 'Ahmedabad, India',
      address: [
        '414, Maruti Plaza',
        'Near Vijay Park Society',
        'Behind Ankur International School',
        'Krishnanagar, Ahmedabad',
        'Gujarat 382345, India',
      ],
      mapHref:
        'https://maps.google.com/maps?q=414+Maruti+Plaza+Krishnanagar+Ahmedabad+Gujarat+382345+India',
    },
  ],
} as const;
