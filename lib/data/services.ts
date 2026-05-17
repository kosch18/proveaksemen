import type { Service } from './types'

export const services: Service[] = [
  {
    id: 'svc-01',
    title: 'Contract Engineering',
    description:
      'We design embedded systems end-to-end — architecture, schematic capture, multi-layer PCB layout, firmware and BSP, plus manufacturing hand-off. Projects follow IEC 62443 for industrial cybersecurity and ISO 26262 where automotive functional safety applies. Engagements run on fixed-bid or time & material, whichever fits your programme.',
    icon: 'CircuitBoard',
  },
  {
    id: 'svc-02',
    title: 'Technical Support & Integration',
    description:
      'We help you drop Nordic Devices hardware into existing infrastructure: custom OS drivers, protocol bridges, joint bring-up sessions on your site. A dedicated support engineer is available during CET business hours; critical incidents are covered 24/7 under SLA.',
    icon: 'Headset',
  },
  {
    id: 'svc-03',
    title: 'Audit & Certification',
    description:
      'We review your existing embedded designs against IEC 61508, DNV GL, IECEx, CE/UKCA and other relevant standards. We prepare the technical file for notified bodies, accompany the testing campaign and help close every non-conformance. Our in-house EMC lab in Oslo handles pre-compliance work before the formal run.',
    icon: 'ShieldCheck',
  },
  {
    id: 'svc-04',
    title: 'Training & Workshops',
    description:
      'Practical, hands-on training for embedded teams: Zephyr RTOS, industrial protocols (CAN FD, EtherCAT, OPC UA), secure firmware development and hardware-in-the-loop testing. Delivered on-site at our Oslo lab, at your facility or remotely — and tailored to your team\'s current skill level.',
    icon: 'GraduationCap',
  },
]
