import { redirect } from 'next/navigation'
  
export default function Redirect({ }) {
    // Click on 'Partner' link in breadcrumbs should redirect to home page
    redirect('/de')
}