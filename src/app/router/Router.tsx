import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../../layouts/Layout';
import { PodcastHome } from '../../pages/PodcastHome/PodcastHome';
import { PodcastDetail } from '../../pages/PodcasDetail/PodcastDetail';
import { EpisodeDetail } from '../../pages/PodcastEpisode/PodcastEpisode';
import { ROUTES } from '../config/constants';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<PodcastHome />} />
        <Route path={ROUTES.PODCAST_DETAIL} element={<PodcastDetail />} />
        <Route path={ROUTES.EPISODE_DETAIL} element={<EpisodeDetail />} />
      </Route>
    </Routes>
  );
};
