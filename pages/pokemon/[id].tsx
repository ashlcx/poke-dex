import { useRouter } from "next/router";
import MainLayout from "../../components/layouts/mainLayout";

const pokemon = () => {
  const router = useRouter();

  const { id } = router.query;

  return <h1>Pokemon: {id}</h1>;
};

pokemon.layout = MainLayout;

export default pokemon;
