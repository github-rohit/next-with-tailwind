import type { NextPage } from 'next';

const PageHeading: NextPage = ({ children }) => {
  return (
    <h1 className="text-3xl font-bold mb-4 border-l-8 border-primary py-1 pl-2">
      {children}
    </h1>
  );
};

export default PageHeading;
