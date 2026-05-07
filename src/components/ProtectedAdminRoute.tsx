import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/auth'

interface ProtectedAdminRouteProps {
  children: ReactNode
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
