import ServicePage, {
  generateMetadata,
  generateStaticParams,
} from '../../../../../app/services/[id]/page';
import { SERVICES } from '../../../../shared/constants/services';
import { SERVICE_DETAIL_DATA } from '../../../../shared/constants/serviceData';

function paramsFor(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe('service detail route', () => {
  it('pre-renders a page for every service in the catalog', async () => {
    expect(await generateStaticParams()).toEqual(SERVICES.map(service => ({ id: service.id })));
  });

  it('titles the page without repeating the brand the root template adds', async () => {
    const metadata = await generateMetadata(paramsFor('ai-ml'));
    expect(metadata.title).toBe('AI & Machine Learning Development');
    expect(metadata.description).toBe(SERVICE_DETAIL_DATA['ai-ml'].metaDescription);
  });

  it('gives unknown services a not-found title', async () => {
    const metadata = await generateMetadata(paramsFor('blockchain'));
    expect(metadata.title).toBe('Service not found');
  });

  it('shows the not-found page for services EPOCH does not offer', async () => {
    await expect(ServicePage(paramsFor('blockchain'))).rejects.toThrow();
  });

  it('renders a page for a listed service', async () => {
    await expect(ServicePage(paramsFor('ai-ml'))).resolves.toBeTruthy();
  });
});
