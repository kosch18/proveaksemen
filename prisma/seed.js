// @ts-check
'use strict'

const { PrismaClient, Department, Role, ItemStatus } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const EMPLOYEES = [
  { name: 'Erik Halvorsen',  role: 'CEO & Co-founder',              department: Department.MANAGEMENT,  bio: 'Former senior engineer at Kongsberg Gruppen with 15 years in avionics electronics. Co-founded Nordic Devices in 2014 with the conviction that industrial microcontrollers can be both reliable and energy-efficient. Leads strategic development and partnerships.',                                                                                                                imageUrl: '/images/team/person-1.jpg',  email: 'erik.halvorsen@nordicdevices.no',  order: 1 },
  { name: 'Astrid Viken',    role: 'CTO & Co-founder',              department: Department.ENGINEERING, bio: 'PhD in embedded systems from NTNU Trondheim. Specialises in RTOS development and low-level BSP drivers for ARM Cortex-M. Previously headed the firmware division at Kitron. Author of several patents in IoT power management.',                                                                                                                                             imageUrl: '/images/team/person-2.jpg',  email: 'astrid.viken@nordicdevices.no',    order: 2 },
  { name: 'Lars Bergström',  role: 'Head of Hardware Engineering',  department: Department.ENGINEERING, bio: 'PCB design specialist focused on high-speed interfaces — PCIe, USB 3.x, 10GbE. Previously at Elkem and Aker Solutions. Leads a team of seven hardware engineers responsible for all schematics and layout.',                                                                                                                                                              imageUrl: '/images/team/person-3.jpg',  email: 'lars.bergstrom@nordicdevices.no',  order: 3 },
  { name: 'Ingrid Solberg',  role: 'Lead Firmware Engineer',        department: Department.ENGINEERING, bio: 'Expert in embedded security and secure bootloaders. Holds IEC 61508 and ISO 26262 certifications for safety-critical software development. Has worked on maritime automation and Class IIb medical device projects.',                                                                                                                                                        imageUrl: '/images/team/person-4.jpg',  email: 'ingrid.solberg@nordicdevices.no',  order: 4 },
  { name: 'Tobias Moen',     role: 'Senior Embedded Systems Engineer', department: Department.ENGINEERING, bio: 'Develops real-time systems on Zephyr RTOS and FreeRTOS. Deep expertise in industrial communication protocols: CAN FD, Modbus RTU, PROFIBUS. Previously an embedded engineer at Siemens Energy Oslo.',                                                                                                                                                                  imageUrl: '/images/team/person-5.jpg',  email: 'tobias.moen@nordicdevices.no',     order: 5 },
  { name: 'Silje Andersen',  role: 'UX/Hardware Design Lead',       department: Department.DESIGN,      bio: 'Designs industrial interfaces and enclosure solutions for embedded electronics. Graduate of AHO (Oslo School of Architecture and Design). Red Dot Product Design finalist 2021.',                                                                                                                                                                                          imageUrl: '/images/team/person-6.jpg',  email: 'silje.andersen@nordicdevices.no',  order: 6 },
  { name: 'Henrik Dahl',     role: 'Product Designer',              department: Department.DESIGN,      bio: 'Responsible for product visual identity and technical documentation. Creates enclosure 3D models in Fusion 360 and prepares manufacturing specs for EMS partners in Poland and Estonia.',                                                                                                                                                                                  imageUrl: '/images/team/person-7.jpg',  email: 'henrik.dahl@nordicdevices.no',     order: 7 },
  { name: 'Camilla Holm',    role: 'VP of Sales',                   department: Department.SALES,       bio: 'Builds distributor networks across Scandinavia, the Baltics and Germany. Previously headed sales at Eaton Electrical Norway. Specialises in OEM customers in maritime automation and industrial automation.',                                                                                                                                                               imageUrl: '/images/team/person-8.jpg',  email: 'camilla.holm@nordicdevices.no',    order: 8 },
  { name: 'Jonas Eriksen',   role: 'Key Account Manager',           department: Department.SALES,       bio: 'Manages key corporate accounts in oil & gas and shipbuilding. Technical background enables deep dives into customer requirements and precise technical proposals. Based in Oslo, regularly visiting sites in Stavanger and Bergen.',                                                                                                                                          imageUrl: '/images/team/person-9.jpg',  email: 'jonas.eriksen@nordicdevices.no',   order: 9 },
  { name: 'Marte Lund',      role: 'CFO',                           department: Department.MANAGEMENT,  bio: 'Manages finance, budgeting and investor relations. MBA from NHH Norwegian School of Economics. Previously financial controller at Schibsted and Telenor. Led the company to operational break-even in 2017.',                                                                                                                                                               imageUrl: '/images/team/person-10.jpg', email: 'marte.lund@nordicdevices.no',      order: 10 },
]

const INVENTORY = [
  { name: 'Laptop Dell Latitude 5440',  category: 'PC',           status: ItemStatus.AVAILABLE,   location: 'Lager Hamar',         purchaseDate: '2024-08-15', valueNok: 14500 },
  { name: 'HP EliteDesk 800 G6',        category: 'Stasjonær PC', status: ItemStatus.RENTED,      location: 'Kunde - Oslo',         purchaseDate: '2023-11-20', valueNok: 9800  },
  { name: 'UniFi 24-port Switch',       category: 'Nettverk',     status: ItemStatus.AVAILABLE,   location: 'Lager Hamar',         purchaseDate: '2025-01-10', valueNok: 5200  },
  { name: 'UniFi Access Point U6-Lite', category: 'Nettverk',     status: ItemStatus.RENTED,      location: 'Kunde - Lillehammer', purchaseDate: '2024-06-05', valueNok: 1600  },
  { name: 'Lenovo ThinkPad T14',        category: 'PC',           status: ItemStatus.MAINTENANCE, location: 'Serviceverksted',     purchaseDate: '2023-09-12', valueNok: 13200 },
  { name: 'Samsung 27" Skjerm',         category: 'Tilbehør',     status: ItemStatus.AVAILABLE,   location: 'Lager Hamar',         purchaseDate: '2024-02-18', valueNok: 3200  },
  { name: 'Raspberry Pi 5',            category: 'Utvikling',    status: ItemStatus.RENTED,      location: 'Kunde - Elverum',     purchaseDate: '2025-02-01', valueNok: 900   },
  { name: 'Synology NAS DS220+',       category: 'Server',       status: ItemStatus.AVAILABLE,   location: 'Datasenter',          purchaseDate: '2023-05-30', valueNok: 4800  },
]

async function main() {
  console.log('Seeding database...\n')

  const passwordHash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where:  { email: 'admin@nordic.local' },
    update: {},
    create: { email: 'admin@nordic.local', password: passwordHash, name: 'Admin', role: Role.ADMIN },
  })
  console.log('User:     ' + admin.email + '  (role: ' + admin.role + ')')

  await prisma.employee.deleteMany()
  await prisma.employee.createMany({ data: EMPLOYEES })
  console.log('Employees: ' + EMPLOYEES.length + ' created')

  await prisma.inventoryItem.deleteMany()
  await prisma.inventoryItem.createMany({ data: INVENTORY })
  console.log('Inventory: ' + INVENTORY.length + ' created')

  console.log('\nSeed complete.')
  console.log('Login: admin@nordic.local / admin123')
}

main()
  .catch((e) => { console.error('Seed failed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
