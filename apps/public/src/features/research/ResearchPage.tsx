import { useEffect } from 'react';
import { ResearchHero } from './ResearchHero';
import { ResearchPrograms } from './ResearchPrograms';
import { FeaturedProject } from './FeaturedProject';
import { ProjectArchive } from './ProjectArchive';
import { ResearchProcess } from './ResearchProcess';
import { LatestPublications } from './LatestPublications';
import { FieldImageSection } from './FieldImageSection';
import { ResearchCTA } from './ResearchCTA';

export function ResearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="research-page">
      <ResearchHero />
      <ResearchPrograms />
      <FeaturedProject />
      <ProjectArchive />
      <ResearchProcess />
      <LatestPublications />
      <FieldImageSection />
      <ResearchCTA />
    </div>
  );
}
