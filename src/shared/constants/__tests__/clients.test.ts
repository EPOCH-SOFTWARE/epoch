import { existsSync } from 'fs';
import { join } from 'path';
import { CASE_STUDIES } from '../clientData';
import { CLIENT_LOGOS } from '../content';

const PUBLIC_DIR = join(__dirname, '../../../../public');

describe('client logos', () => {
  it('includes the marquee clients', () => {
    const ids = CLIENT_LOGOS.map(client => client.id);
    expect(ids).toEqual(
      expect.arrayContaining(['hub-international', 'onesix-ai', 'inspira-financial'])
    );
  });

  it('points every logo at a file that exists', () => {
    for (const client of CLIENT_LOGOS) {
      if (client.logo) expect(existsSync(join(PUBLIC_DIR, client.logo))).toBe(true);
    }
  });
});

describe('case studies', () => {
  it('covers HUB International and Inspira Financial', () => {
    expect(CASE_STUDIES.map(study => study.id)).toEqual([
      'hub-international',
      'inspira-financial',
    ]);
  });

  it('never ships placeholder testimonials', () => {
    for (const study of CASE_STUDIES) {
      const text = JSON.stringify(study.testimonial ?? {});
      expect(text).not.toMatch(/\[[^\]]*\]/);
    }
  });

  it('only references images that exist', () => {
    for (const study of CASE_STUDIES) {
      const paths = JSON.stringify(study).match(/"\/[^"]+\.(png|jpe?g|svg|webp)"/g) ?? [];
      for (const quoted of paths) {
        expect(existsSync(join(PUBLIC_DIR, JSON.parse(quoted) as string))).toBe(true);
      }
    }
  });
});
