import type { CompanyData } from './types'

export const company: CompanyData = {
  name: 'Nordic Devices',
  tagline: 'Reliable embedded electronics for demanding environments',
  founded: 2014,
  headquarters: 'Oslo, Norway',

  mission:
    'We build embedded electronics that engineers can trust in the most critical applications — from offshore platforms to autonomous industrial installations. Reliability, energy efficiency and long-term support are not marketing terms here: they are acceptance criteria for every single product we ship.',

  vision:
    'To become the partner of choice for European OEMs who need industrial compute platforms with a predictable lifecycle. By 2030, we aim to keep the full production loop — from silicon to certified end device — inside Scandinavia.',

  description:
    'Nordic Devices was founded in 2014 by engineers Erik Halvorsen and Astrid Viken in Oslo. The company designs industrial compute modules, IoT gateways, power controllers and condition-monitoring sensors for maritime, oil & gas and factory automation. Every product is engineered and validated in our own Oslo lab, with series manufacturing handled by a long-standing partner facility in Trondheim. Today, more than 120 customers across 18 countries rely on Nordic Devices hardware in their daily operations.',

  stats: [
    { label: 'Founded',                value: '2014' },
    { label: 'Engineers & staff',      value: '47'   },
    { label: 'Customers in 18 countries', value: '120+' },
    { label: 'Products in portfolio',  value: '34'   },
    { label: 'Patents granted',        value: '8'    },
    { label: 'Annual revenue',         value: '€12M' },
  ],

  history: [
    { year: 2014, event: 'Erik Halvorsen and Astrid Viken found the company in a co-working space in Oslo Sentrum. The starting team is four engineers with a single goal: build embedded hardware that survives Norwegian winters and North Sea spray.' },
    { year: 2015, event: 'Launch of the first product — the ND-CM1 compute module based on STM32. First production contract is signed with a Norwegian shipyard for an engine-monitoring application.' },
    { year: 2016, event: 'Series production begins at the Trondheim partner facility. An in-house EMC lab is opened in Oslo. The company is awarded its first DNV GL type approval, opening the door to maritime customers.' },
    { year: 2017, event: 'Nordic Devices reaches operating break-even. Headcount grows to 20. First export sales outside Norway — to industrial customers in Germany and the Netherlands.' },
    { year: 2019, event: 'Launch of the ND-MX gateway line. A multi-year contract is signed with one of the largest North Sea platform operators. Annual revenue passes €5M.' },
    { year: 2021, event: 'Closes a €4M Series A round led by Norwegian fund Investinor. Opens a satellite office in Hamburg to support German customers locally.' },
    { year: 2022, event: 'Releases ND-SENS-Vibro and the Nordic Devices Connect cloud platform for condition monitoring. Wins the Nor-Shipping Innovation Award.' },
    { year: 2023, event: 'Catalogue expands to 34 active SKUs. New distributor agreements in the Baltic states and Poland. Team reaches 47 people.' },
    { year: 2024, event: 'Tenth anniversary. Launches the Long-Term Supply Programme: every new product is guaranteed a minimum 10-year production and support lifecycle.' },
  ],

  contact: {
    address: 'Schweigaards gate 34B',
    city:    'Oslo',
    country: 'Norway',
    email:   'contact@nordicdevices.no',
    phone:   '+47 22 00 12 34',
    mapUrl:  'https://maps.google.com/?q=Schweigaards+gate+34B,+Oslo',
  },

  socials: {
    linkedin: 'https://linkedin.com/company/nordic-devices',
    github:   'https://github.com/nordic-devices',
    twitter:  'https://twitter.com/nordicdevices',
  },
}
