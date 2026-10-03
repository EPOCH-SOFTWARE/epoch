import { SERVICE_TIERS, SERVICES } from '@/src/shared/constants/services';
import { SERVICE_DETAIL_DATA, type ServiceDetailData } from '@/src/shared/constants/serviceData';
import { CASE_STUDIES } from '@/src/shared/constants/clientData';
import { COMMITMENTS, CLIENT_LOGOS } from '@/src/shared/constants/content';
import { CONTACT } from '@/src/shared/constants/contact';
import tech from '@/src/data/techStackData.json';
export const DATA = {
  tiers: SERVICE_TIERS,
  services: SERVICES,
  serviceDetails: SERVICE_DETAIL_DATA as Record<string, ServiceDetailData>,
  caseStudies: CASE_STUDIES,
  clients: CLIENT_LOGOS,
  commitments: COMMITMENTS,
  contact: CONTACT,
  techStack: tech.techStack.map(group => ({
    category: group.category,
    technologies: group.technologies.map(item => item.name),
  })),
};
