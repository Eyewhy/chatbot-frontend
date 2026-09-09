export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/search',
      permanent: false,
    },
  };
}

export default function Home() {
  return null;
}
