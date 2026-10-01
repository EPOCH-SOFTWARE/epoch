import nextConfig from '../../../../next.config';
import { RETIRED_SERVICE_IDS, SERVICES, servicesInTier } from '../services';
import { SERVICE_DETAIL_DATA } from '../serviceData';

describe('service catalog', () => {
  it('leads with the AI tier', () => {
    expect(servicesInTier('ai').map(service => service.id)).toEqual([
      'ai-ml',
      'generative-ai',
      'data-analytics',
    ]);
  });

  it('groups the supporting engineering services in the second tier', () => {
    expect(servicesInTier('engineering').map(service => service.id)).toEqual([
      'custom-software',
      'cloud-computing',
      'devops',
      'mobile',
      'cybersecurity',
      'digital-transformation',
    ]);
  });

  it('has a detail page for every listed service', () => {
    for (const service of SERVICES) {
      expect(SERVICE_DETAIL_DATA).toHaveProperty(service.id);
    }
  });

  it('lists every detail page in the catalog', () => {
    const listed = new Set(SERVICES.map(service => service.id));
    for (const id of Object.keys(SERVICE_DETAIL_DATA)) {
      expect(listed.has(id)).toBe(true);
    }
  });

  it('no longer offers blockchain, IoT or AR/VR', () => {
    expect(RETIRED_SERVICE_IDS).toEqual(['iot', 'blockchain', 'arvr']);
    for (const id of RETIRED_SERVICE_IDS) {
      expect(SERVICE_DETAIL_DATA).not.toHaveProperty(id);
    }
  });
});

describe('retired service redirects', () => {
  it('permanently redirects each retired service page to the services index', async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    for (const id of RETIRED_SERVICE_IDS) {
      expect(redirects).toContainEqual({
        source: `/services/${id}`,
        destination: '/services',
        permanent: true,
      });
    }
  });
});
