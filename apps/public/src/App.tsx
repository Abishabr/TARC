import { NotFoundPage } from '@/components/NotFoundPage';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicAboutPage } from '@/features/about/PublicAboutPage';
import { PublicContactPage } from '@/features/contact/PublicContactPage';
import { PublicDirectorPage } from '@/features/director/PublicDirectorPage';
import { PublicEventsPage } from '@/features/events/PublicEventsPage';
import { PublicGalleryPage } from '@/features/gallery/PublicGalleryPage';
import { PublicHomePage } from '@/features/home/PublicHomePage';
import { PublicNewsPage } from '@/features/news/PublicNewsPage';
import { PublicPublicationsPage } from '@/features/publications/PublicPublicationsPage';
import { PublicResearchPage } from '@/features/research/PublicResearchPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
        <PublicHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PublicHomePage />} />
            <Route path="/research" element={<PublicResearchPage />} />
            <Route path="/publications" element={<PublicPublicationsPage />} />
            <Route path="/news" element={<PublicNewsPage />} />
            <Route path="/events" element={<PublicEventsPage />} />
            <Route path="/about" element={<PublicAboutPage />} />
            <Route path="/director" element={<PublicDirectorPage />} />
            <Route path="/gallery" element={<PublicGalleryPage />} />
            <Route path="/contact" element={<PublicContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <PublicFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
