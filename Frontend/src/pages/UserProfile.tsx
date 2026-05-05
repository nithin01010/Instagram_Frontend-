import React from 'react'
import Profile from './Profile'
import { useParams } from 'react-router-dom';
import userData from '../features/auth/api/userData';

const UserProfile = () => {
    const { name } = useParams<{ name: string }>(); 
    const data = userData(name!);
  return (
    <Profile isowner={false} udata={data} />
  )
}

export default UserProfile