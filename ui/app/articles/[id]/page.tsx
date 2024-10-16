// app/users/[id]/page.tsx

import { useParams } from 'next/navigation';

const UserPage = () => {
  const params = useParams();
  const { id } = params;  // Capture l'ID de l'URL dynamique

  return (
    <div>
      <h1>User Profile</h1>
      <p>Viewing profile for user ID: {id}</p>
    </div>
  );
};

export default UserPage;
