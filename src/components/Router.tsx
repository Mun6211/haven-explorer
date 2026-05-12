import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import HiddenGemsPage from '@/components/pages/HiddenGemsPage';
import HiddenGemDetailPage from '@/components/pages/HiddenGemDetailPage';
import FoodRecommendationsPage from '@/components/pages/FoodRecommendationsPage';
import FoodDetailPage from '@/components/pages/FoodDetailPage';
import GalleryPage from '@/components/pages/GalleryPage';
import BlogPage from '@/components/pages/BlogPage';
import BlogDetailPage from '@/components/pages/BlogDetailPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "hidden-gems",
        element: <HiddenGemsPage />,
        routeMetadata: {
          pageIdentifier: 'hidden-gems',
        },
      },
      {
        path: "hidden-gems/:id",
        element: <HiddenGemDetailPage />,
        routeMetadata: {
          pageIdentifier: 'hidden-gem-detail',
        },
      },
      {
        path: "food-recommendations",
        element: <FoodRecommendationsPage />,
        routeMetadata: {
          pageIdentifier: 'food-recommendations',
        },
      },
      {
        path: "food-recommendations/:id",
        element: <FoodDetailPage />,
        routeMetadata: {
          pageIdentifier: 'food-detail',
        },
      },
      {
        path: "gallery",
        element: <GalleryPage />,
        routeMetadata: {
          pageIdentifier: 'gallery',
        },
      },
      {
        path: "blog",
        element: <BlogPage />,
        routeMetadata: {
          pageIdentifier: 'blog',
        },
      },
      {
        path: "blog/:id",
        element: <BlogDetailPage />,
        routeMetadata: {
          pageIdentifier: 'blog-detail',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
