import { Route, Routes } from 'react-router-dom';
import { ResearchPage } from './ResearchPage';
import { ResearchDetailPage } from './ResearchDetailPage';

export function ResearchRoutes() {
  return (
    <Routes>
      <Route index element={<ResearchPage />} />
      <Route path=":slug" element={<ResearchDetailPage />} />
    </Routes>
  );
}
