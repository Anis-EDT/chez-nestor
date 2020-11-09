import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h4>404 Page Not Found</h4>
      <Link to="/"> Retourner à l&apos;accueil</Link>
    </div>
  );
};

export default NotFoundPage;
