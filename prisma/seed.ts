import { PrismaClient, Department, Role, ItemStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ─── Seed data ────────────────────────────────────────────────────────────────

const EMPLOYEES: Array<{
  name: string
  role: string
  department: Department
  bio: string
  imageUrl: string
  email: string
  order: number
}> = [
  {
    name: 'Erik Halvorsen',
    role: 'CEO & Co-founder',
    department: Department.MANAGEMENT,
    bio: 'Former senior engineer at Kongsberg Gruppen with 15 years in avionics electronics. Co-founded Nordic Devices in 2014 with the conviction that industrial microcontrollers can be both reliable and energy-efficient. Leads strategic development and partnerships.',
    imageUrl: '/images/team/person-1.jpg',
    email: 'erik.halvorsen@nordicdevices.no',
    order: 1,
  },
  {
    name: 'Astrid Viken',
    role: 'CTO & Co-founder',
    department: Department.ENGINEERING,
    bio: 'PhD in embedded systems from NTNU Trondheim. Specialises in RTOS development and low-level BSP drivers for ARM Cortex-M. Previously headed the firmware division at Kitron. Author of several patents in IoT power management.',
    imageUrl: '/images/team/person-2.jpg',
    email: 'astrid.viken@nordicdevices.no',
    order: 2,
  },
  {
    name: 'Lars Bergström',
    role: 'Head of Hardware Engineering',
    department: Department.ENGINEERING,
    bio: 'PCB design specialist focused on high-speed interfaces — PCIe, USB 3.x, 10GbE. Previously at Elkem and Aker Solutions. Leads a team of seven hardware engineers responsible for all schematics and layout.',
    imageUrl: '/images/team/person-3.jpg',
    email: 'lars.bergstrom@nordicdevices.no',
    order: 3,
  },
  {
    name: 'Ingrid Solberg',
    role: 'Lead Firmware Engineer',
    department: Department.ENGINEERING,
    bio: 'Expert in embedded security and secure bootloaders. Holds IEC 61508 and ISO 26262 certifications for safety-critical software development. Has worked on maritime automation and Class IIb medical device projects.',
    imageUrl: '/images/team/person-4.jpg',
    email: 'ingrid.solberg@nordicdevices.no',
    order: 4,
  },
  {
    name: 'Tobias Moen',
    role: 'Senior Embedded Systems Engineer',
    department: Department.ENGINEERING,
    bio: 'Develops real-time systems on Zephyr RTOS and FreeRTOS. Deep expertise in industrial communication protocols: CAN FD, Modbus RTU, PROFIBUS. Previously an embedded engineer at Siemens Energy Oslo.',
    imageUrl: '/images/team/person-5.jpg',
    email: 'tobias.moen@nordicdevices.no',
    order: 5,
  },
  {
    name: 'Silje Andersen',
    role: 'UX/Hardware Design Lead',
    department: Department.DESIGN,
    bio: 'Designs industrial interfaces and enclosure solutions for embedded electronics. Graduate of AHO (Oslo School of Architecture and Design). Red Dot Product Design finalist 2021.',
    imageUrl: '/images/team/person-6.jpg',
    email: 'silje.andersen@nordicdevices.no',
    order: 6,
  },
  {
    name: 'Henrik Dahl',
    role: 'Product Designer',
    department: Department.DESIGN,
    bio: 'Responsible for product visual identity and technical documentation. Creates enclosure 3D models in Fusion 360 and prepares manufacturing specs for EMS partners in Poland and Estonia.',
    imageUrl: '/images/team/person-7.jpg',
    email: 'henrik.dahl@nordicdevices.no',
    order: 7,
  },
  {
    name: 'Camilla Holm',
    role: 'VP of Sales',
    department: Department.SALES,
    bio: 'Builds distributor networks across Scandinavia, the Baltics and Germany. Previously headed sales at Eaton Electrical Norway. Specialises in OEM customers in maritime automation and industrial automation.',
    imageUrl: '/images/team/person-8.jpg',
    email: 'camilla.holm@nordicdevices.no',
    order: 8,
  },
  {
    name: 'Jonas Eriksen',
    role: 'Key Account Manager',
    department: Department.SALES,
    bio: 'Manages key corporate accounts in oil & gas and shipbuilding. Technical background enables deep dives into customer requirements and precise technical proposals. Based in Oslo, regularly visiting sites in Stavanger and Bergen.',
    imageUrl: '/images/team/person-9.jpg',
    email: 'jonas.eriksen@nordicdevices.no',
    order: 9,
  },
  {
    name: 'Marte Lund',
    role: 'CFO',
    department: Department.MANAGEMENT,
    bio: 'Manages finance, budgeting and investor relations. MBA from NHH Norwegian School of Economics. Previously financial controller at Schibsted and Telenor. Led the company to operational break-even in 2017.',
    imageUrl: '/images/team/person-10.jpg',
    email: 'marte.lund@nordicdevices.no',
    order: 10,
  },
]

const PRODUCTS: Array<{
  slug: string
  name: string
  category: string
  shortDescription: string
  fullDescription: string
  imageUrl: string
  features: string[]
  specs: Array<{ label: string; value: string }>
  order: number
}> = [
  {
    slug: 'nd-mx1-gateway',
    name: 'ND-MX1 Industrial Gateway',
    category: 'Gateways',
    shortDescription: 'Industrial IoT gateway with CAN FD, Modbus and 5G for mission-critical applications.',
    fullDescription: 'ND-MX1 is the flagship Nordic Devices gateway for demanding industrial environments. It bridges up to eight independent fieldbus protocols into a single Ethernet connection and transmits data to the cloud via a built-in 5G modem. Designed for continuous operation at −40 to +85 °C, certified to DNV GL for maritime use and IEC 60945.',
    imageUrl: '/images/products/nd-mx1-gateway.jpg',
    features: [
      'Hardware isolation per fieldbus channel — one bus failure does not affect others',
      'Built-in Edge compute with 2.3 TOPS NPU for local data processing',
      'OTA firmware updates with digital signing and rollback',
      'MQTT, AMQP and OPC UA supported out of the box',
      'Hardware TPM 2.0 and Secure Boot',
      'Extended event log with 128 MB non-volatile memory',
    ],
    specs: [
      { label: 'Processor', value: 'NXP i.MX 8M Plus, 4× Cortex-A53 @ 1.8 GHz' },
      { label: 'RAM', value: '4 GB LPDDR4' },
      { label: 'Storage', value: '32 GB eMMC + microSD slot' },
      { label: 'Interfaces', value: 'CAN FD ×4, RS-485 ×4, Ethernet 1GbE ×2' },
      { label: 'Wireless', value: '5G NR Sub-6 GHz, Wi-Fi 6, BLE 5.3' },
      { label: 'Power', value: '9–36 V DC, <8 W typical' },
      { label: 'Temperature', value: '−40…+85 °C' },
      { label: 'Protection', value: 'IP67 (optional enclosure)' },
      { label: 'Certification', value: 'CE, DNV GL, IECEx Zone 2' },
      { label: 'Dimensions', value: '155 × 100 × 42 mm' },
    ],
    order: 1,
  },
  {
    slug: 'nd-cm4-compute',
    name: 'ND-CM4 Compute Module',
    category: 'Compute Modules',
    shortDescription: 'Industrial SO-DIMM compute module for embedding into OEM end devices.',
    fullDescription: 'ND-CM4 lets OEM manufacturers focus on application logic, delegating all computation to a proven module. Compatible with the Nordic Devices carrier board ecosystem and shipped with a Yocto Linux BSP plus full schematic documentation. Manufactured under contract at a Trondheim facility with 100% automated optical inspection.',
    imageUrl: '/images/products/nd-cm4-compute.jpg',
    features: [
      'Heterogeneous architecture: Linux for UI and networking, FreeRTOS on M4 core for deterministic control',
      'Ready-to-use BSP with drivers for all module peripherals',
      'Hardware memory protection (MPU) and isolated TrustZone domains',
      'Industrial temperature range without additional cooling',
      'Reference carrier board schematics and Gerber files included',
      '10-year minimum supply lifecycle',
    ],
    specs: [
      { label: 'Processor', value: 'STM32MP157F, Cortex-A7 @ 800 MHz + M4 @ 209 MHz' },
      { label: 'RAM', value: '1 GB DDR3L' },
      { label: 'Storage', value: '8 GB NAND Flash' },
      { label: 'Connector', value: '200-pin SO-DIMM' },
      { label: 'USB', value: 'USB 2.0 HS × 2' },
      { label: 'Display', value: 'MIPI DSI 2-lane, RGB888 parallel' },
      { label: 'Power', value: '3.3 / 1.8 V from carrier board' },
      { label: 'Temperature', value: '−40…+85 °C (Industrial)' },
      { label: 'OS', value: 'Yocto Linux 5.x, FreeRTOS on M4' },
      { label: 'Dimensions', value: '67.6 × 30 mm' },
    ],
    order: 2,
  },
  {
    slug: 'nd-pwr-48v',
    name: 'ND-PWR-48V Power Controller',
    category: 'Power Management',
    shortDescription: 'Intelligent 48 V power controller with real-time load monitoring and per-channel diagnostics.',
    fullDescription: 'ND-PWR-48V covers power distribution and protection in industrial racks and mobile installations. Supports four independent channels with programmable current thresholds, detailed consumption telemetry and CAN or RS-485 control. Particularly popular in maritime applications and energy storage systems.',
    imageUrl: '/images/products/nd-pwr-48v.jpg',
    features: [
      'Programmable current limiting curves to protect high-inrush loads',
      'Detailed telemetry: voltage, current, power and temperature per channel',
      'Supports cascading up to 16 devices on one bus',
      'Web interface via optional Ethernet adapter',
      'Real-time diagnostics with CAN notifications',
      'DIN-rail or flat-panel mounting',
    ],
    specs: [
      { label: 'Input voltage', value: '36–60 V DC' },
      { label: 'Channels', value: '4 independent, up to 20 A each' },
      { label: 'Current accuracy', value: '±0.5% FS' },
      { label: 'Control interface', value: 'CAN 2.0B, RS-485 Modbus RTU' },
      { label: 'Protection', value: 'OCP, OVP, UVP, OTP, reverse polarity' },
      { label: 'PWM frequency', value: '500 kHz' },
      { label: 'Efficiency', value: '≥96% at typical load' },
      { label: 'Event log', value: '10,000 entries in Flash' },
      { label: 'Temperature', value: '−30…+70 °C' },
      { label: 'Dimensions', value: '120 × 80 × 25 mm (DIN-rail)' },
    ],
    order: 3,
  },
  {
    slug: 'nd-sens-vibro',
    name: 'ND-SENS-Vibro Vibration Monitor',
    category: 'Sensors & Monitors',
    shortDescription: 'Wireless vibration and temperature monitor for predictive maintenance of industrial equipment.',
    fullDescription: 'ND-SENS-Vibro mounts directly on motors, pumps and gearboxes and transmits real-time vibration level, FFT spectrum and housing temperature data. An on-board ML algorithm detects anomalies and warns of impending failure before it occurs. Powered by a vibration energy harvester or a replaceable cell lasting up to 5 years.',
    imageUrl: '/images/products/nd-sens-vibro.jpg',
    features: [
      'Bearing fault detection by characteristic frequencies (BPFO, BPFI, BSF)',
      'Local FFT analysis — only processed features, not raw signals, are transmitted',
      'Self-learning anomaly detector adapts to the specific machine within 72 hours',
      'LoRaWAN integration with ND-MX1 Gateway without additional infrastructure',
      'Threshold and mode configuration via the Nordic Devices Connect mobile app',
      'Conformal coating for use in marine fog and condensation environments',
    ],
    specs: [
      { label: 'Accelerometer', value: '3-axis MEMS, ±16 g, 3200 Hz' },
      { label: 'Temperature', value: '−40…+125 °C, ±0.5 °C' },
      { label: 'Wireless', value: 'BLE 5.3, LoRaWAN Class C' },
      { label: 'Power', value: 'Vibration harvester or Li-SOCl₂ 3.6 V, 8 Ah' },
      { label: 'Battery life', value: 'Up to 5 years at 1 transmission/hour' },
      { label: 'Protection', value: 'IP68' },
      { label: 'Mounting', value: 'Magnetic or M8 threaded' },
      { label: 'FFT', value: 'Up to 3200 lines on-device' },
      { label: 'Temperature range', value: '−40…+85 °C' },
      { label: 'Dimensions', value: 'Ø42 × 28 mm' },
    ],
    order: 4,
  },
  {
    slug: 'nd-hmi-panel',
    name: 'ND-HMI-7 Operator Panel',
    category: 'HMI & Displays',
    shortDescription: '7-inch industrial operator panel with touchscreen and integrated PLC runtime.',
    fullDescription: 'ND-HMI-7 combines an operator interface and logic controller in one compact enclosure. The capacitive touchscreen retains sensitivity when used with gloves. The integrated PLC engine supports IEC 61131-3 programming (ST, LD, FBD). The anodised aluminium housing supports vertical and horizontal panel mounting.',
    imageUrl: '/images/products/nd-hmi-panel.jpg',
    features: [
      'Integrated CODESYS runtime for ST, LD and FBD programming',
      'Library of ready-made screen templates for typical industrial applications',
      'Remote control and monitoring via VNC and OPC UA',
      'Non-volatile data memory for state retention on power loss',
      'Simultaneous Modbus TCP/RTU Master and Slave support',
      'Protected USB port for project backup and software updates',
    ],
    specs: [
      { label: 'Display', value: '7" IPS, 1280×800, 1000 cd/m² (sunlight readable)' },
      { label: 'Touch', value: 'Capacitive, 10-point, glove-capable' },
      { label: 'Processor', value: 'NXP i.MX 6ULL, Cortex-A7 @ 900 MHz' },
      { label: 'RAM / Flash', value: '512 MB DDR3 / 4 GB eMMC' },
      { label: 'Interfaces', value: 'RS-485 ×2, CAN ×1, Ethernet 100M ×1, USB-A ×2' },
      { label: 'I/O', value: '8 DI / 8 DO (24 V PNP/NPN)' },
      { label: 'Power', value: '24 V DC ±20%' },
      { label: 'Mounting', value: 'Panel cut-out, IP65 front seal' },
      { label: 'OS', value: 'Embedded Linux, IEC 61131-3 runtime' },
      { label: 'Dimensions', value: '196 × 140 × 52 mm' },
    ],
    order: 5,
  },
  {
    slug: 'nd-io-expander',
    name: 'ND-IO-32 I/O Expander',
    category: 'I/O Modules',
    shortDescription: 'Modular 32-channel I/O expander with hot-swap support and per-channel diagnostics.',
    fullDescription: 'ND-IO-32 extends the I/O capabilities of Nordic Devices controllers or third-party PLCs by adding 32 configurable channels. Each channel is software-switched between digital input (24 V), digital output (2 A) or analogue input 4–20 mA. Supports hot-swap on a live bus without restarting the system.',
    imageUrl: '/images/products/nd-io-expander.jpg',
    features: [
      'Software configuration of each channel — no hardware jumpers',
      'Per-channel wire-break and short-circuit diagnostics',
      'Three fieldbus protocols selectable via firmware — no module replacement required',
      '125 µs scan cycle in EtherCAT mode for synchronous motion control',
      'Cascadable up to 64 modules on a single bus without additional repeaters',
      'Configuration via Nordic Devices Studio or standard EDS/XML file',
    ],
    specs: [
      { label: 'Channels', value: '32 configurable (DI / DO / AI)' },
      { label: 'Digital input', value: '24 V DC, IEC 61131-2 Type 1/3' },
      { label: 'Digital output', value: '24 V DC, 2 A, short-circuit protection' },
      { label: 'Analogue input', value: '4–20 mA, 16-bit, ±0.1% FS' },
      { label: 'Interface', value: 'EtherCAT, CANopen or Modbus TCP (firmware)' },
      { label: 'Cycle time', value: '125 µs (EtherCAT)' },
      { label: 'Hot-swap', value: 'Yes, no bus interruption' },
      { label: 'Diagnostics', value: 'Wire-break, short-circuit, overtemp per channel' },
      { label: 'Power', value: '24 V DC via connector or DIN-rail bus' },
      { label: 'Dimensions', value: '45 × 125 × 115 mm (1 DIN module wide)' },
    ],
    order: 6,
  },
]

const INVENTORY: Array<{
  name: string
  category: string
  status: ItemStatus
  location: string
  purchaseDate: string
  valueNok: number
}> = [
  { name: 'Laptop Dell Latitude 5440',   category: 'PC',           status: ItemStatus.AVAILABLE,   location: 'Lager Hamar',         purchaseDate: '2024-08-15', valueNok: 14500 },
  { name: 'HP EliteDesk 800 G6',         category: 'Stasjonær PC', status: ItemStatus.RENTED,       location: 'Kunde - Oslo',         purchaseDate: '2023-11-20', valueNok: 9800  },
  { name: 'UniFi 24-port Switch',        category: 'Nettverk',     status: ItemStatus.AVAILABLE,   location: 'Lager Hamar',         purchaseDate: '2025-01-10', valueNok: 5200  },
  { name: 'UniFi Access Point U6-Lite',  category: 'Nettverk',     status: ItemStatus.RENTED,       location: 'Kunde - Lillehammer', purchaseDate: '2024-06-05', valueNok: 1600  },
  { name: 'Lenovo ThinkPad T14',         category: 'PC',           status: ItemStatus.MAINTENANCE, location: 'Serviceverksted',     purchaseDate: '2023-09-12', valueNok: 13200 },
  { name: 'Samsung 27" Skjerm',          category: 'Tilbehør',     status: ItemStatus.AVAILABLE,   location: 'Lager Hamar',         purchaseDate: '2024-02-18', valueNok: 3200  },
  { name: 'Raspberry Pi 5',             category: 'Utvikling',    status: ItemStatus.RENTED,       location: 'Kunde - Elverum',     purchaseDate: '2025-02-01', valueNok: 900   },
  { name: 'Synology NAS DS220+',        category: 'Server',       status: ItemStatus.AVAILABLE,   location: 'Datasenter',          purchaseDate: '2023-05-30', valueNok: 4800  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding database...\n')

  // ── 1. Admin user ─────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where:  { email: 'admin@nordic.local' },
    update: {},
    create: {
      email:    'admin@nordic.local',
      password: passwordHash,
      name:     'Admin',
      role:     Role.ADMIN,
    },
  })
  console.log(`✓ User:     ${admin.email}  (role: ${admin.role})`)

  // ── 2. Employees (delete + recreate for idempotency) ──────────────────────
  await prisma.employee.deleteMany()
  await prisma.employee.createMany({ data: EMPLOYEES })
  console.log(`✓ Employees: ${EMPLOYEES.length} created`)

  // ── 3. Products (upsert by slug) ──────────────────────────────────────────
  let productCount = 0
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: {
        name:             p.name,
        category:         p.category,
        shortDescription: p.shortDescription,
        fullDescription:  p.fullDescription,
        imageUrl:         p.imageUrl,
        features:         p.features,
        specs:            p.specs,
        order:            p.order,
      },
      create: p,
    })
    productCount++
  }
  console.log(`✓ Products:  ${productCount} upserted`)

  // ── 4. Inventory (delete + recreate) ─────────────────────────────────────
  await prisma.inventoryItem.deleteMany()
  await prisma.inventoryItem.createMany({ data: INVENTORY })
  console.log(`✓ Inventory: ${INVENTORY.length} created`)

  console.log('\n✅ Seed complete.')
  console.log('   Login: admin@nordic.local / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
