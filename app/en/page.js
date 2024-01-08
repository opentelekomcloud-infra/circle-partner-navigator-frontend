import { redirect } from 'next/navigation'
  
export default function Redirect({ }) {
    // If this page is used, redirect to '/'
    redirect('/')
}