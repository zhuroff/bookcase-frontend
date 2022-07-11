import { Routes, Route } from 'react-router-dom'
import { useRouter } from '../hooks/useRouter'

export const AdminRoutes = () => {
  const routes = useRouter()

  return (
    <Routes>
      {
        routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))
      }
      {/* <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Navigate to="/" />} /> */}
      {/* <Route path="/admin/profile" element={ <Profile /> }/>
      <Route path="/admin/companies" element={ <ManagementCompany /> } />
      <Route path="/admin/companies/:company" element={ <HousingCompany /> } />
      <Route path="/admin/companies/:company/meetings" element={ <HousingCompany /> }/>
      <Route path="/admin/companies/:company/meetings/:meeting" element={ <Meeting /> }>
        <Route path="resolutions" element={ <Resolutions /> } />
        <Route path="participants" element={ <Participants /> } />
      </Route>
      <Route path="/admin/companies/:company/meetings/:meeting/participants/:participant" element={ <Participant /> } />
      <Route path="*" element={ <Page404 /> } /> */}
    </Routes>
  )
}
