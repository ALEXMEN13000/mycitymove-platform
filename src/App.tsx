import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import ActivityDetails from '@/pages/ActivityDetails';
import { ActivityReviews } from '@/pages/ActivityReviews';
import { Header } from '@/components/Header';
import NotFound from '@/pages/NotFound';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ScrollToTop } from '@/components/ScrollToTop';

import Index from "@/pages/Index";
import Activities from "@/pages/Activities";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ClubLogin from "@/pages/ClubLogin";
import ClubRegister from "@/pages/ClubRegister";
import ResetPassword from "@/pages/ResetPassword";
import Favorites from "@/pages/Favorites";
import Calendar from "@/pages/Calendar";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import ClubDashboard from "@/pages/club/ClubDashboard";
import ClubActivities from "@/pages/club/Activities";
import NewActivity from "@/pages/club/NewActivity";
import ClubReviews from "@/pages/club/Reviews";
import Profile from "@/pages/club/Profile";
import Settings from "@/pages/club/Settings";
import Legal from "@/pages/club/Legal";
import Notifications from "@/pages/Notifications";
import UserReviews from "@/pages/Reviews";
import PersonalData from "@/pages/PersonalData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-background">
                <Header />
                <Routes>
                  {/* Routes publiques */}
                  <Route path="/" element={<Index />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/activity/:id" element={<ActivityDetails />} />
                  <Route path="/activity/:activityId/reviews" element={<ActivityReviews />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/club/login" element={<ClubLogin />} />
                  <Route path="/club/register" element={<ClubRegister />} />

                  {/* Routes protégées */}
                  <Route path="/dashboard" element={
                    <Navigate to="/reviews" replace />
                  } />
                  <Route path="/reviews" element={
                    <PrivateRoute userType="user">
                      <UserReviews />
                    </PrivateRoute>
                  } />
                  <Route path="/notifications" element={
                    <PrivateRoute userType="user">
                      <Notifications />
                    </PrivateRoute>
                  } />
                  <Route path="/change-password" element={
                    <PrivateRoute userType="user">
                      <ResetPassword />
                    </PrivateRoute>
                  } />
                  <Route path="/personal-data" element={
                    <PrivateRoute userType="user">
                      <PersonalData />
                    </PrivateRoute>
                  } />
                  <Route path="/reset-password" element={<ResetPassword />} />

                  {/* Routes protégées pour les clubs */}
                  <Route path="/club/dashboard" element={
                    <PrivateRoute userType="club">
                      <ClubDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/club/activities" element={
                    <PrivateRoute userType="club">
                      <ClubActivities />
                    </PrivateRoute>
                  } />
                  <Route path="/club/activities/new" element={
                    <PrivateRoute userType="club">
                      <NewActivity />
                    </PrivateRoute>
                  } />
                  <Route path="/club/reviews" element={
                    <PrivateRoute userType="club">
                      <ClubReviews />
                    </PrivateRoute>
                  } />
                  <Route path="/club/profile" element={
                    <PrivateRoute userType="club">
                      <Profile />
                    </PrivateRoute>
                  } />
                  <Route path="/club/settings" element={
                    <PrivateRoute userType="club">
                      <Settings />
                    </PrivateRoute>
                  } />
                  <Route path="/club/legal" element={
                    <PrivateRoute userType="club">
                      <Legal />
                    </PrivateRoute>
                  } />

                  {/* Routes protégées pour les membres */}
                  <Route path="/favorites" element={
                    <PrivateRoute>
                      <Favorites />
                    </PrivateRoute>
                  } />
                  <Route path="/calendar" element={
                    <PrivateRoute>
                      <Calendar />
                    </PrivateRoute>
                  } />
                  <Route path="/explore" element={
                    <Navigate to="/reviews" replace />
                  } />

                  {/* Redirections */}
                  <Route path="/club-login" element={<Navigate to="/club/login" replace />} />
                  <Route path="/club-register" element={<Navigate to="/club/register" replace />} />

                  {/* Route 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;